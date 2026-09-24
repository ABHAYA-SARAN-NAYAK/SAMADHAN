import React, { useState } from 'react';
import {
  FileText,
  Building2,
  Star,
  MapPin,
  MessageSquare,
  Compass
} from 'lucide-react';
import { Problem, ProblemStatus } from '../types';
import { JHARKHAND_DOMAINS } from '../data/constants';
import { JharkhandGoogleMap } from '../components/JharkhandGoogleMap';

interface CitizenDashboardViewProps {
  problems: Problem[];
  onRateProblem: (problemId: string, rating: number, feedback: string) => void;
  onNavigateSubmit: () => void;
}

export const CitizenDashboardView: React.FC<CitizenDashboardViewProps> = ({
  problems,
  onRateProblem,
  onNavigateSubmit
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'map'>('submissions');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(problems[0] || null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  const filteredProblems = problems.filter(p => {
    if (statusFilter === 'active') return p.status !== 'resolved';
    if (statusFilter === 'resolved') return p.status === 'resolved' || p.status === 'deployed';
    return true;
  });

  const statusSteps: Array<{ key: ProblemStatus; label: string }> = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'assigned', label: 'Assigned to University' },
    { key: 'in_progress', label: 'In Progress (Lab/Field)' },
    { key: 'deployed', label: 'Deployed in Village' },
    { key: 'resolved', label: 'Citizen Verified' }
  ];

  const getStepIndex = (st: ProblemStatus) => {
    switch (st) {
      case 'submitted': return 0;
      case 'under_review': return 1;
      case 'assigned': return 2;
      case 'in_progress': return 3;
      case 'deployed': return 4;
      case 'resolved': return 5;
      default: return 0;
    }
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblem) return;
    onRateProblem(selectedProblem.id, ratingVal, feedbackText);
    setRatingSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EDE6DE] text-left">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
            Citizen Grievance & Tracking Portal
          </span>
          <h2 className="font-display font-bold text-3xl text-[#1C1410] mt-1">
            My Submissions & Community Outcomes
          </h2>
          <p className="text-sm text-[#7A6355] mt-0.5">
            Track university milestone progress, explore grassroots Google Map telemetry, and certify village solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Submissions vs Map switcher */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#EDE6DE] text-xs shadow-xs">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-[#3D9970] text-white shadow-xs'
                  : 'text-[#4A3728] hover:text-[#1C1410]'
              }`}
            >
              My Reports ({problems.length})
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#F57C00] text-white shadow-xs'
                  : 'text-[#4A3728] hover:text-[#1C1410]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Community Map</span>
            </button>
          </div>

          <button
            onClick={onNavigateSubmit}
            className="px-5 py-2.5 rounded-full bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Report Problem</span>
          </button>
        </div>
      </div>

      {/* Community Google Map Tab */}
      {activeTab === 'map' && (
        <div className="space-y-4 animate-in fade-in text-left">
          <div>
            <h3 className="font-display font-bold text-2xl text-[#1C1410]">
              Grassroots Google Map Telemetry
            </h3>
            <p className="text-sm text-[#7A6355] mt-0.5">
              Explore reported civic issues, university deployments, and active field testing across Jharkhand.
            </p>
          </div>
          <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-2 shadow-sm overflow-hidden">
            <JharkhandGoogleMap
              problems={problems}
              onSelectProblem={(p) => {
                setSelectedProblem(p);
                setActiveTab('submissions');
              }}
              height="580px"
            />
          </div>
        </div>
      )}

      {/* Main Grid: Left list, Right Detail */}
      {activeTab === 'submissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in text-left">
          {/* Left Column: Problem List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#EDE6DE] text-xs shadow-xs">
              {(['all', 'active', 'resolved'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`flex-1 py-1.5 px-3 rounded-full capitalize font-bold transition-all cursor-pointer ${
                    statusFilter === tab
                      ? 'bg-[#1C1410] text-white shadow-xs'
                      : 'text-[#7A6355] hover:text-[#1C1410]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Cards List */}
            <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
              {filteredProblems.length > 0 ? (
                filteredProblems.map(p => {
                  const isSelected = selectedProblem?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      id={`problem-card-${p.problemId}`}
                      onClick={() => {
                        setSelectedProblem(p);
                        setRatingSubmitted(false);
                      }}
                      className={`p-4 rounded-[18px] border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#F57C00] shadow-md ring-2 ring-[#F57C00]/20'
                          : 'bg-white border-[#EDE6DE] hover:border-[#BFB0A3] shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-[#F57C00] bg-[#FEF0E0] px-2.5 py-0.5 rounded-full border border-[#F57C00]/20">
                          {p.problemId}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                            p.status === 'resolved' || p.status === 'deployed'
                              ? 'bg-[#E8F5EE] text-[#2E7D52] border border-[#3D9970]/30'
                              : p.status === 'assigned' || p.status === 'in_progress'
                              ? 'bg-[#FEF0E0] text-[#D4600A] border border-[#F57C00]/30'
                              : 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#1D4ED8]/20'
                          }`}
                        >
                          {p.status.replace('_', ' ')}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-sm text-[#1C1410] line-clamp-2 leading-snug">
                        {p.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-[#7A6355] mt-3 pt-2.5 border-t border-[#EDE6DE]">
                        <span className="flex items-center gap-1 truncate max-w-[160px] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                          {p.location.district}
                        </span>
                        <span className="font-mono">{new Date(p.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white rounded-[20px] border border-[#EDE6DE]">
                  <FileText className="w-8 h-8 text-[#7A6355]/40 mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#1C1410]">No submissions in this category</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Problem Detail & Stepper (7 cols) */}
          <div className="lg:col-span-7">
            {selectedProblem ? (
              <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-7 shadow-sm space-y-6 animate-in fade-in">
                {/* Header Info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#F57C00] bg-[#FEF0E0] px-3 py-0.5 rounded-full border border-[#F57C00]/30">
                        {selectedProblem.problemId}
                      </span>
                      <span className="text-xs font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                        {JHARKHAND_DOMAINS.find(d => d.key === selectedProblem.aiOutput.domain)?.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#7A6355]">
                      Reported {new Date(selectedProblem.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#1C1410] mt-2 leading-snug">
                    {selectedProblem.title}
                  </h3>
                  <p className="text-sm text-[#4A3728] mt-3 leading-relaxed bg-[#FDF9F4] p-4 rounded-2xl border border-[#EDE6DE]">
                    {selectedProblem.description}
                  </p>
                </div>

                {/* Status Progress Stepper */}
                <div className="p-5 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider block text-[#F57C00]">
                    Platform Lifecycle Progress
                  </span>

                  <div className="space-y-3.5">
                    {statusSteps.map((st, idx) => {
                      const currentIdx = getStepIndex(selectedProblem.status);
                      const isDone = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={st.key} className="flex items-start gap-3.5">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                                isDone
                                  ? 'bg-[#3D9970] text-white shadow-xs'
                                  : 'bg-white text-[#7A6355] border border-[#EDE6DE]'
                              }`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            {idx < statusSteps.length - 1 && (
                              <div
                                className={`w-0.5 h-6 my-0.5 ${
                                  idx < currentIdx ? 'bg-[#3D9970]' : 'bg-[#EDE6DE]'
                                }`}
                              />
                            )}
                          </div>

                          <div className="pt-0.5">
                            <span
                              className={`font-bold text-xs block ${
                                isCurrent
                                  ? 'text-[#F57C00]'
                                  : isDone
                                  ? 'text-[#1C1410]'
                                  : 'text-[#7A6355]'
                              }`}
                            >
                              {st.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[11px] text-[#7A6355] block font-medium">
                                Active stage • Updates dispatched via SMS (Nagrik portal sync)
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* University Working On It Card */}
                {selectedProblem.assignedUniversity ? (
                  <div className="p-5 rounded-2xl bg-white border border-[#EDE6DE] shadow-xs space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider block text-[#3D9970]">
                      Assigned Execution Partner
                    </span>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-display font-bold text-base text-[#1C1410]">
                          {selectedProblem.assignedUniversity.name}
                        </h4>
                        <p className="text-xs text-[#7A6355] mt-0.5">
                          Dept: {selectedProblem.assignedUniversity.department} • Faculty Lead: {selectedProblem.assignedUniversity.leadFaculty}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-3 py-1 rounded-full">
                        Field Active
                      </span>
                    </div>

                    {selectedProblem.fundingAmount && (
                      <div className="pt-3 border-t border-[#EDE6DE] flex items-center justify-between text-xs">
                        <span className="text-[#7A6355] font-semibold">CSR Co-Sponsorship:</span>
                        <span className="font-mono font-bold text-[#D4600A]">
                          ₹{selectedProblem.fundingAmount.toLocaleString('en-IN')} (Tata Steel CSR)
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] text-xs text-[#7A6355]">
                    Matching algorithm is evaluating relevant university departments...
                  </div>
                )}

                {/* 5-Star Citizen Rating Panel */}
                {(selectedProblem.status === 'deployed' || selectedProblem.status === 'resolved' || selectedProblem.citizenRating) && (
                  <div className="p-6 rounded-2xl bg-[#FEF0E0]/50 border-2 border-[#F57C00]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D4600A] uppercase tracking-wider flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-[#F57C00] text-[#F57C00]" />
                        Citizen Solution Verification
                      </span>
                      {selectedProblem.citizenRating && (
                        <span className="text-xs font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                          Rated {selectedProblem.citizenRating}/5 Stars
                        </span>
                      )}
                    </div>

                    {selectedProblem.citizenFeedback ? (
                      <div className="p-4 bg-white rounded-xl text-xs text-[#1C1410] italic border border-[#EDE6DE]">
                        "{selectedProblem.citizenFeedback}"
                      </div>
                    ) : (
                      <form onSubmit={handleRatingSubmit} className="space-y-3">
                        <p className="text-xs text-[#7A6355]">
                          Has the technical solution resolved the problem in your village? Rate the quality:
                        </p>

                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setRatingVal(s)}
                              className={`p-2 rounded-xl text-xl transition-transform hover:scale-110 cursor-pointer ${
                                s <= ratingVal ? 'text-[#F57C00]' : 'text-[#BFB0A3]'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                          <span className="text-xs font-mono font-bold text-[#1C1410] ml-2">
                            {ratingVal} of 5 Stars
                          </span>
                        </div>

                        <textarea
                          value={feedbackText}
                          onChange={e => setFeedbackText(e.target.value)}
                          placeholder="Write your feedback for the university students and district collectorate..."
                          rows={2}
                          className="w-full bg-white border border-[#EDE6DE] rounded-xl p-3 text-xs text-[#1C1410] focus:border-[#F57C00] outline-none"
                        />

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                        >
                          Submit Citizen Verification
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 bg-white rounded-[24px] border border-[#EDE6DE] text-center text-[#7A6355]">
                Select a submission to inspect progress
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

