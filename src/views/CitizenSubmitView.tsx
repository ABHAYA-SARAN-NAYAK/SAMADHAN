import React, { useState, useRef } from 'react';
import {
  Mic,
  MicOff,
  Type,
  Camera,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Share2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Upload,
  Volume2
} from 'lucide-react';
import { JHARKHAND_DOMAINS, JHARKHAND_DISTRICTS } from '../data/constants';
import { ProblemDomain, Problem } from '../types';
import { JharkhandGoogleMap } from '../components/JharkhandGoogleMap';

interface CitizenSubmitViewProps {
  onSubmitSuccess: (newProblem: Problem) => void;
  onNavigateToDashboard: () => void;
}

export const CitizenSubmitView: React.FC<CitizenSubmitViewProps> = ({
  onSubmitSuccess,
  onNavigateToDashboard
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'photo'>('voice');

  // Form State
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<ProblemDomain>('water_resources');
  const [district, setDistrict] = useState('Garhwa');
  const [block, setBlock] = useState('Meral');
  const [panchayat, setPanchayat] = useState('Bhoura');
  const [village, setVillage] = useState('Bhoura Tola 2');
  const [addressText, setAddressText] = useState('');
  const [reporterName, setReporterName] = useState('Rameshwar Mahto');
  const [reporterPhone, setReporterPhone] = useState('+91 94311 88204');
  const [selectedLanguage, setSelectedLanguage] = useState<'hi' | 'en' | 'sa' | 'nagpuri'>('hi');
  const [mediaList] = useState<Array<{ type: 'image' | 'video' | 'audio'; url: string; caption?: string; tags?: string[] }>>([
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=800&q=80',
      caption: 'Borewell handpump water in Bhoura village showing yellow-red rust sediment'
    }
  ]);
  const [consentChecked, setConsentChecked] = useState(true);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceWave, setVoiceWave] = useState<number[]>([20, 40, 60, 30, 80, 50, 90, 40, 70, 30]);
  const timerRef = useRef<any>(null);

  // AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiOutput, setAiOutput] = useState<any>(null);
  const [submittedProblem, setSubmittedProblem] = useState<Problem | null>(null);

  // Available blocks for selected district
  const currentDistrictInfo = JHARKHAND_DISTRICTS.find(d => d.name === district) || JHARKHAND_DISTRICTS[0];

  // Load sample voice transcript demo presets
  const sampleVoicePresets = [
    {
      label: 'Garhwa Water Crisis (Demo Flow)',
      text: 'हमारे गांव भंवरा (मेराल ब्लॉक, गढ़वा) में 14 हैंडपंप का पानी बहुत खारा और लाल आ रहा है। पीने से बच्चों के दांत पीले हो रहे हैं और बड़ों को जोड़ों में भयंकर दर्द है। पुराना फिल्टर 3 साल से बंद है। कृपया मदद करें।',
      lang: 'hi' as const,
      dist: 'Garhwa',
      blk: 'Meral',
      panch: 'Bhoura'
    },
    {
      label: 'Gumla Tomato Cold Storage',
      text: 'Bishunpur mandi me tamatar aur mirchi ki bumper harvest hui hai par cold storage na hone se 40% fasal sad rahi hai. Hum log ₹3 kilo bechne ko majboor hain.',
      lang: 'hi' as const,
      dist: 'Gumla',
      blk: 'Bishunpur',
      panch: 'Bishunpur Khas'
    },
    {
      label: 'Dhanbad Jharia Coal Dust',
      text: 'In Kusunda near Jharia, heavy dry fly ash from open mine pits is causing respiratory illness in children and elders.',
      lang: 'en' as const,
      dist: 'Dhanbad',
      blk: 'Jharia',
      panch: 'Kusunda'
    }
  ];

  // Voice recording simulation
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => {
        if (prev >= 60) {
          handleStopRecording();
          return 60;
        }
        return prev + 1;
      });
      setVoiceWave(Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20));
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!description) {
      setDescription(sampleVoicePresets[0].text);
    }
  };

  const handleSelectPreset = (preset: typeof sampleVoicePresets[0]) => {
    setDescription(preset.text);
    setSelectedLanguage(preset.lang);
    setDistrict(preset.dist);
    setBlock(preset.blk);
    setPanchayat(preset.panch);
  };

  // Trigger AI Classification & Extraction
  const triggerAiAnalysis = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/process-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: description,
          language: selectedLanguage,
          district,
          block,
          mediaUrls: mediaList.map(m => m.url)
        })
      });
      const data = await res.json();
      if (data.data) {
        setAiOutput(data.data);
        setTitle(data.data.autoTitle || title || 'Community issue in ' + district);
        setSelectedDomain(data.data.domain || 'water_resources');
      }
    } catch (err) {
      console.error('AI analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Auto-run AI when moving from Step 1 to Step 2
  const handleProceedToStep2 = async () => {
    await triggerAiAnalysis();
    setStep(2);
  };

  // Submit to Backend
  const handleFinalSubmit = async () => {
    setIsAnalyzing(true);
    try {
      const payload = {
        title: title || aiOutput?.autoTitle || `Civic issue in ${district}`,
        description,
        voiceTranscript: inputMode === 'voice' ? description : undefined,
        originalLanguage: selectedLanguage,
        translatedDescription: aiOutput?.translatedDescription || description,
        submittedBy: {
          name: reporterName,
          phone: reporterPhone,
          role: 'CITIZEN'
        },
        location: {
          district,
          block,
          panchayat,
          village,
          coordinates: {
            lat: currentDistrictInfo.lat,
            lng: currentDistrictInfo.lng
          },
          addressText: addressText || `${village}, ${panchayat}, ${block}, ${district}`
        },
        media: mediaList,
        aiOutput: aiOutput || {
          domain: selectedDomain,
          confidence: 0.95,
          urgencyScore: 88,
          solvabilityScore: 80,
          fundabilityScore: 75,
          compositeScore: 82,
          tags: [district, block, 'civic problem']
        }
      };

      const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.data) {
        setSubmittedProblem(result.data);
        onSubmitSuccess(result.data);
        setStep(5);
      }
    } catch (err) {
      console.error('Failed to submit problem:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // GPS Auto-fill simulation
  const handleUseGps = () => {
    setDistrict('Garhwa');
    setBlock('Meral');
    setPanchayat('Bhoura');
    setVillage('Bhoura Tola 2');
    setAddressText('GPS Lat: 24.162° N, Lng: 83.824° E (Accuracy: ±4m)');
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 text-left">
      {/* Stepper Header (Steps 1 to 4) */}
      {step <= 4 && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#7A6355] mb-2">
            <span>
              STEP {step} OF 4: {step === 1 ? 'REPORT INPUT' : step === 2 ? 'AI DIAGNOSIS' : step === 3 ? 'LOCATION TAGGING' : 'VERIFICATION'}
            </span>
            <span className="text-[#F57C00] font-mono font-bold">{step * 25}% Complete</span>
          </div>
          <div className="w-full h-2 bg-[#EDE6DE] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F57C00] transition-all duration-300 rounded-full"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Choose Submission Method */}
      {step === 1 && (
        <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
              Citizen Reporting Interface
            </span>
            <h2 className="font-display font-bold text-3xl text-[#1C1410] mt-1">
              Report a Problem in Your Community
            </h2>
            <p className="text-sm text-[#7A6355] mt-1">
              Share what is broken, polluted, or lacking in your village. Speak in your own language or type.
            </p>
          </div>

          {/* Quick Presets for Demo */}
          <div className="p-4 bg-[#FDF9F4] rounded-[18px] border border-[#EDE6DE]">
            <span className="text-xs font-bold text-[#D4600A] block mb-2">
              ⚡ Quick Demo Sample Presets (Click to Auto-fill):
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleVoicePresets.map((p, i) => (
                <button
                  key={i}
                  id={`preset-${i}`}
                  onClick={() => handleSelectPreset(p)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white text-[#1C1410] border border-[#EDE6DE] hover:border-[#F57C00] hover:text-[#F57C00] transition-colors text-left flex items-center gap-1.5 cursor-pointer shadow-xs font-medium"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Method Switcher */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#F7F4EF] rounded-2xl border border-[#EDE6DE]">
            <button
              onClick={() => setInputMode('voice')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                inputMode === 'voice'
                  ? 'bg-white text-[#1C1410] shadow-sm border border-[#EDE6DE]'
                  : 'text-[#7A6355] hover:text-[#1C1410]'
              }`}
            >
              <Mic className="w-4 h-4 text-[#F57C00]" />
              <span>Voice Note</span>
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                inputMode === 'text'
                  ? 'bg-white text-[#1C1410] shadow-sm border border-[#EDE6DE]'
                  : 'text-[#7A6355] hover:text-[#1C1410]'
              }`}
            >
              <Type className="w-4 h-4 text-[#3D9970]" />
              <span>Type Text</span>
            </button>
            <button
              onClick={() => setInputMode('photo')}
              className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                inputMode === 'photo'
                  ? 'bg-white text-[#1C1410] shadow-sm border border-[#EDE6DE]'
                  : 'text-[#7A6355] hover:text-[#1C1410]'
              }`}
            >
              <Camera className="w-4 h-4 text-[#F57C00]" />
              <span>Photo / Proof</span>
            </button>
          </div>

          {/* Voice Recording Box */}
          {inputMode === 'voice' && (
            <div className="p-6 rounded-[20px] bg-[#FDF9F4] border border-[#EDE6DE] text-center space-y-4">
              <div className="flex items-center justify-center">
                <button
                  id="btn-mic-toggle"
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                    isRecording
                      ? 'bg-[#EF4444] text-white scale-110 animate-pulse'
                      : 'bg-[#F57C00] text-white hover:bg-[#D4600A] hover:scale-105'
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>

              <div>
                <p className="font-display font-bold text-base text-[#1C1410]">
                  {isRecording ? `Recording... 00:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}` : 'Tap Mic to Speak in Hindi, Santali, Mundari or Nagpuri'}
                </p>
                <p className="text-xs text-[#7A6355] mt-0.5">
                  Automatic Whisper / Gemini AI speech transcription & translation to English
                </p>
              </div>

              {/* Audio Waveform visualization */}
              {isRecording && (
                <div className="flex items-center justify-center gap-1.5 h-12 pt-2">
                  {voiceWave.map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-[#3D9970] rounded-full transition-all duration-150"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              )}

              {/* Transcription Preview Textarea */}
              <div className="text-left mt-4">
                <label className="text-xs font-bold text-[#4A3728] block mb-1">
                  Transcribed Text (Editable):
                </label>
                <textarea
                  id="textarea-voice-transcript"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Your speech transcript will appear here automatically..."
                  rows={3}
                  className="w-full bg-white border border-[#EDE6DE] rounded-xl p-3 text-xs text-[#1C1410] placeholder-[#7A6355]/60 focus:border-[#F57C00] outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Text Input Box */}
          {inputMode === 'text' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4A3728] block">
                Detailed Problem Description (Hindi or English):
              </label>
              <textarea
                id="textarea-text-input"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what is broken, which village, how many families are affected, and what emergency is taking place..."
                rows={5}
                className="w-full bg-white border border-[#EDE6DE] rounded-2xl p-4 text-xs text-[#1C1410] placeholder-[#7A6355]/60 focus:border-[#F57C00] outline-none leading-relaxed"
              />
            </div>
          )}

          {/* Photo & Video Box */}
          {inputMode === 'photo' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#EDE6DE] rounded-2xl p-6 text-center bg-[#FDF9F4] hover:border-[#F57C00] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-[#F57C00] mx-auto mb-2" />
                <p className="text-xs font-bold text-[#1C1410]">Attached Proof / Evidence</p>
                <p className="text-[11px] text-[#7A6355] mt-0.5">JPG, PNG, or video from the field site</p>
              </div>

              {mediaList.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE]">
                  <img
                    src={mediaList[0].url}
                    alt="Proof"
                    className="w-16 h-16 rounded-xl object-cover border border-[#EDE6DE]"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-[#1C1410] block">Field Photo: Meral Borewell</span>
                    <span className="text-[11px] text-[#7A6355]">Tags: broken handpump, red rust sediment</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                    Attached
                  </span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#4A3728] block">Brief Description of Photo:</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Explain what the photo shows..."
                  rows={3}
                  className="w-full bg-white border border-[#EDE6DE] rounded-xl p-3 text-xs text-[#1C1410] outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 1 Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDE6DE]">
            <span className="text-xs text-[#7A6355] font-mono">
              {description.length} characters entered
            </span>
            <button
              id="btn-step1-next"
              disabled={!description.trim() || isAnalyzing}
              onClick={handleProceedToStep2}
              className="px-6 py-2.5 rounded-full bg-[#F57C00] hover:bg-[#D4600A] disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>AI Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Diagnose with AI Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AI Diagnosis & Domain Classification */}
      {step === 2 && (
        <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
              Step 2 • AI Engine Diagnosis
            </span>
            <h2 className="font-display font-bold text-3xl text-[#1C1410] mt-1">
              Classify & Validate Problem
            </h2>
            <p className="text-sm text-[#7A6355] mt-1">
              Gemini has analyzed the symptoms and suggested priority domain categorization.
            </p>
          </div>

          {/* AI Diagnosis Result Card */}
          {aiOutput && (
            <div className="p-5 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2E7D52] bg-[#E8F5EE] px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> AI Confidence: {Math.round(aiOutput.confidence * 100)}%
                </span>
                <span className="text-xs font-mono font-bold text-[#D4600A] bg-[#FEF0E0] px-3 py-1 rounded-full border border-[#F57C00]/20">
                  Urgency Score: {aiOutput.urgencyScore}/100
                </span>
              </div>

              {/* Auto Title */}
              <div>
                <label className="text-xs font-bold text-[#4A3728] block mb-1">
                  Auto-Generated Problem Title (Editable):
                </label>
                <input
                  id="input-problem-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-white border border-[#EDE6DE] rounded-xl p-3 text-xs text-[#1C1410] font-semibold outline-none focus:border-[#F57C00]"
                />
              </div>

              {/* English Translation if Hindi/Tribal language was used */}
              {aiOutput.translatedDescription && aiOutput.translatedDescription !== description && (
                <div className="p-3.5 rounded-xl bg-white border border-[#EDE6DE] text-xs">
                  <span className="text-[11px] font-bold text-[#7A6355] block mb-0.5">
                    English Translation (for University Reviewers):
                  </span>
                  <p className="text-[#1C1410] text-xs italic leading-relaxed">
                    "{aiOutput.translatedDescription}"
                  </p>
                </div>
              )}

              {/* Deduplication Cluster Notice */}
              {aiOutput.clusterGroupId && (
                <div className="p-3 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/30 text-xs flex items-center gap-2 text-[#D4600A]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#F57C00]" />
                  <span className="text-xs font-medium">
                    Semantic match detected: Aggregated into cluster with 47 similar Garhwa water reports!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Domain Chips Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#4A3728] block">
              Confirm Primary Domain:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {JHARKHAND_DOMAINS.map(d => {
                const isSelected = selectedDomain === d.key;
                return (
                  <button
                    key={d.key}
                    onClick={() => setSelectedDomain(d.key)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FEF0E0] border-[#F57C00] text-[#1C1410] shadow-xs ring-2 ring-[#F57C00]/20'
                        : 'bg-white border-[#EDE6DE] text-[#4A3728] hover:border-[#BFB0A3]'
                    }`}
                  >
                    <span className="text-xl mb-1">{d.icon}</span>
                    <span className="font-bold text-xs block leading-tight">{d.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDE6DE]">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-full bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              id="btn-step2-next"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-full bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
            >
              <span>Confirm Location</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Location Cascading & Map Pin */}
      {step === 3 && (
        <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
                Step 3 • Administrative Tagging
              </span>
              <h2 className="font-display font-bold text-3xl text-[#1C1410] mt-1">
                Where is this Happening?
              </h2>
              <p className="text-sm text-[#7A6355] mt-1">
                Select your District, Block, Panchayat, and local landmark.
              </p>
            </div>
            <button
              onClick={handleUseGps}
              className="px-3.5 py-2 rounded-full bg-[#E8F5EE] hover:bg-[#D1EBE0] border border-[#3D9970]/30 text-xs font-bold text-[#2E7D52] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
              <span>Use My GPS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-bold text-[#4A3728] block mb-1">1. District</label>
              <select
                id="select-district"
                value={district}
                onChange={e => {
                  setDistrict(e.target.value);
                  const distObj = JHARKHAND_DISTRICTS.find(d => d.name === e.target.value);
                  if (distObj && distObj.blocks.length > 0) {
                    setBlock(distObj.blocks[0]);
                  }
                }}
                className="w-full bg-white border border-[#EDE6DE] rounded-xl p-2.5 text-xs text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
              >
                {JHARKHAND_DISTRICTS.map(d => (
                  <option key={d.name} value={d.name}>
                    {d.name} ({d.headquarters})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#4A3728] block mb-1">2. Block / Taluk</label>
              <select
                id="select-block"
                value={block}
                onChange={e => setBlock(e.target.value)}
                className="w-full bg-white border border-[#EDE6DE] rounded-xl p-2.5 text-xs text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
              >
                {currentDistrictInfo.blocks.map(b => (
                  <option key={b} value={b}>
                    {b} Block
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#4A3728] block mb-1">3. Gram Panchayat</label>
              <input
                type="text"
                value={panchayat}
                onChange={e => setPanchayat(e.target.value)}
                placeholder="e.g. Bhoura / Mahuadanr"
                className="w-full bg-white border border-[#EDE6DE] rounded-xl p-2.5 text-xs text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#4A3728] block mb-1">4. Village / Tola</label>
              <input
                type="text"
                value={village}
                onChange={e => setVillage(e.target.value)}
                placeholder="e.g. Bhoura Tola 2 / Near Mandir"
                className="w-full bg-white border border-[#EDE6DE] rounded-xl p-2.5 text-xs text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
              />
            </div>
          </div>

          {/* Interactive Google Map Pin Picker */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#F57C00] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pin Precise Site Location on Google Maps:</span>
              </label>
              <span className="text-xs font-mono text-[#7A6355]">
                Lat: {currentDistrictInfo.lat.toFixed(3)}°, Lng: {currentDistrictInfo.lng.toFixed(3)}°
              </span>
            </div>
            <div className="border border-[#EDE6DE] rounded-[18px] overflow-hidden">
              <JharkhandGoogleMap
                problems={[]}
                isPickerMode={true}
                height="280px"
                initialCenter={{ lat: currentDistrictInfo.lat, lng: currentDistrictInfo.lng }}
                initialZoom={9}
                onPickLocation={(coords) => {
                  if (coords.district) {
                    setDistrict(coords.district);
                    const distObj = JHARKHAND_DISTRICTS.find(d => d.name === coords.district);
                    if (distObj && distObj.blocks.length > 0) {
                      setBlock(distObj.blocks[0]);
                    }
                  }
                  setAddressText(`Pin GPS: ${coords.lat.toFixed(4)}° N, ${coords.lng.toFixed(4)}° E (Auto-geocoded)`);
                }}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-xs font-bold text-[#4A3728] block mb-1">Reporter Name</label>
              <input
                type="text"
                value={reporterName}
                onChange={e => setReporterName(e.target.value)}
                className="w-full bg-white border border-[#EDE6DE] rounded-lg p-2 text-[#1C1410] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#4A3728] block mb-1">Mobile for SMS Updates</label>
              <input
                type="text"
                value={reporterPhone}
                onChange={e => setReporterPhone(e.target.value)}
                className="w-full bg-white border border-[#EDE6DE] rounded-lg p-2 text-[#1C1410] outline-none font-mono"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDE6DE]">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-full bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              id="btn-step3-next"
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-full bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
            >
              <span>Review Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Confirm & Submit */}
      {step === 4 && (
        <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
              Step 4 • Final Confirmation
            </span>
            <h2 className="font-display font-bold text-3xl text-[#1C1410] mt-1">
              Verify Community Submission
            </h2>
            <p className="text-sm text-[#7A6355] mt-1">
              Your submission will be registered in the state database and matched to university engineering departments.
            </p>
          </div>

          {/* Summary Card */}
          <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#F57C00] bg-[#FEF0E0] px-2.5 py-0.5 rounded-full uppercase">
                  {JHARKHAND_DOMAINS.find(d => d.key === selectedDomain)?.name}
                </span>
                <h3 className="font-display font-bold text-lg text-[#1C1410] mt-2">{title}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#D4600A] bg-[#FEF0E0] px-3 py-1 rounded-full border border-[#F57C00]/20">
                Urgency: {aiOutput?.urgencyScore || 85}/100
              </span>
            </div>

            <p className="text-xs text-[#4A3728] leading-relaxed line-clamp-3">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-[#EDE6DE]">
              <div>
                <span className="text-[#7A6355] text-xs font-medium block">Location:</span>
                <span className="font-bold text-[#1C1410]">{village}, {panchayat}, {block}, {district}</span>
              </div>
              <div>
                <span className="text-[#7A6355] text-xs font-medium block">SMS Notifications to:</span>
                <span className="font-mono font-bold text-[#2E7D52]">{reporterName} ({reporterPhone})</span>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#EDE6DE] text-xs text-[#4A3728] cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={e => setConsentChecked(e.target.checked)}
              className="mt-0.5 accent-[#F57C00] w-4 h-4"
            />
            <span>
              I confirm this is a genuine community problem in Jharkhand and authorize SAMADHAN to share details with matched university research cells and CSR foundations.
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDE6DE]">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-full bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              id="btn-final-submit"
              disabled={!consentChecked || isAnalyzing}
              onClick={handleFinalSubmit}
              className="px-8 py-3 rounded-full bg-[#F57C00] hover:bg-[#D4600A] disabled:opacity-50 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Problem</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Success & Monospace Problem ID Display */}
      {step === 5 && submittedProblem && (
        <div className="bg-white border border-[#EDE6DE] rounded-[28px] p-6 sm:p-10 shadow-sm space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EE] text-[#3D9970] flex items-center justify-center mx-auto ring-8 ring-[#E8F5EE]/50">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#2E7D52] uppercase tracking-wider block">
              Registration Successful
            </span>
            <h2 className="font-display font-bold text-3xl text-[#1C1410] mt-1">
              Problem ID Generated
            </h2>
            <p className="text-sm text-[#7A6355] mt-1 max-w-md mx-auto">
              Your issue is registered in Jharkhand's innovation dispatch pipeline. SMS confirmation has been dispatched.
            </p>
          </div>

          {/* Monospace Problem ID Box */}
          <div className="p-5 rounded-2xl bg-[#FDF9F4] border-2 border-[#F57C00]/40 max-w-sm mx-auto shadow-xs">
            <span className="text-xs font-bold text-[#7A6355] block mb-1">Permanent Tracking Reference</span>
            <span className="font-mono font-bold text-3xl text-[#F57C00] tracking-wider block">
              {submittedProblem.problemId}
            </span>
          </div>

          <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE] max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#7A6355] font-medium">Assigned Classification:</span>
              <span className="font-bold text-[#1C1410]">{submittedProblem.aiOutput.domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6355] font-medium">Location:</span>
              <span className="font-bold text-[#1C1410]">{submittedProblem.location.panchayat}, {submittedProblem.location.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A6355] font-medium">Next Action:</span>
              <span className="text-[#2E7D52] font-bold">Smart routing to University department</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://api.whatsapp.com/send?text=I%20have%20reported%20a%20community%20problem%20on%20SAMADHAN%20Jharkhand:%20ID%20${submittedProblem.problemId}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs transition-transform hover:scale-105 flex items-center gap-2 shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              id="btn-track-status"
              onClick={onNavigateToDashboard}
              className="px-7 py-3 rounded-full bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
            >
              <span>Track Live Status →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
