import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Building2,
  Users,
  Star,
  Download,
  Share2,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowLeft,
  Filter,
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
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4CAF75]/15">
        <div>
          <span className="text-xs font-mono text-[#F57C00] uppercase tracking-wider">
            Citizen Grievance & Tracking Portal
          </span>
          <h2 className="font-display font-extrabold text-2xl text-[#F0EDE6] mt-0.5">
            My Submissions & Outcomes
          </h2>
          <p className="text-xs text-[#8FA89E]">
            Track university milestone progress, explore grassroots Google Map telemetry, and certify resolutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Submissions vs Map switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#112318] rounded-full border border-[#4CAF75]/25 text-xs">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                activeTab === 'submissions'
                  ? 'bg-[#4CAF75] text-[#0A1A14] shadow-md'
                  : 'text-[#8FA89E] hover:text-[#F0EDE6]'
              }`}
            >
              My Reports ({problems.length})
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'map'
                  ? 'bg-[#F57C00] text-[#0A1A14] shadow-md'
                  : 'text-[#8FA89E] hover:text-[#F0EDE6]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Community Map</span>
            </button>
          </div>

          <button
            onClick={onNavigateSubmit}
            className="px-4 py-2 rounded-full bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Report Problem</span>
          </button>
        </div>
      </div>

      {/* Community Google Map Tab */}
      {activeTab === 'map' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-[#F0EDE6]">
                Grassroots Google Map Telemetry
              </h3>
              <p className="text-xs text-[#8FA89E]">
                Explore reported civic issues, university deployments, and active field testing in Jharkhand.
              </p>
            </div>
          </div>
          <JharkhandGoogleMap
            problems={problems}
            onSelectProblem={(p) => {
              setSelectedProblem(p);
              setActiveTab('submissions');
            }}
            height="580px"
          />
        </div>
      )}

      {/* Main Grid: Left list, Right Detail */}
      {activeTab === 'submissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
        {/* Left Column: Problem List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#112318] rounded-xl border border-[#4CAF75]/20 text-xs">
            {(['all', 'active', 'resolved'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`flex-1 py-1 px-2.5 rounded-lg capitalize font-semibold transition-all ${
                  statusFilter === tab
                    ? 'bg-[#1A3328] text-[#F0EDE6] border border-[#4CAF75]/40 shadow-sm'
                    : 'text-[#8FA89E] hover:text-[#F0EDE6]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards List */}
          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredProblems.length > 0 ? (
              filteredProblems.map(p => {
                const isSelected = selectedProblem?.id === p.id;
                const domainMeta = JHARKHAND_DOMAINS.find(d => d.key === p.aiOutput?.domain);
                return (
                  <div
                    key={p.id}
                    id={`problem-card-${p.problemId}`}
                    onClick={() => {
                      setSelectedProblem(p);
                      setRatingSubmitted(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A3328] border-[#4CAF75] shadow-lg shadow-[#4CAF75]/15 ring-1 ring-[#4CAF75]'
                        : 'bg-[#112318] border-[#4CAF75]/15 hover:border-[#4CAF75]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-[#FF9A30] bg-[#F57C00]/10 px-2 py-0.5 rounded border border-[#F57C00]/20">
                        {p.problemId}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full capitalize ${
                          p.status === 'resolved' || p.status === 'deployed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : p.status === 'assigned' || p.status === 'in_progress'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {p.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xs text-[#F0EDE6] line-clamp-2 leading-snug">
                      {p.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-[#8FA89E] mt-2.5 pt-2 border-t border-[#4CAF75]/10">
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin className="w-3 h-3 text-[#F57C00]" />
                        {p.location.district}
                      </span>
                      <span>{new Date(p.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-[#112318] rounded-2xl border border-[#4CAF75]/15">
                <FileText className="w-8 h-8 text-[#4CAF75]/40 mx-auto mb-2" />
                <p className="text-xs font-semibold text-[#F0EDE6]">No submissions in this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Problem Detail & Stepper (7 cols) */}
        <div className="lg:col-span-7">
          {selectedProblem ? (
            <div className="bg-[#112318] border border-[#4CAF75]/30 rounded-3xl p-6 shadow-xl space-y-6 animate-in fade-in">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#FF9A30] bg-[#F57C00]/15 px-2.5 py-0.5 rounded border border-[#F57C00]/30">
                      {selectedProblem.problemId}
                    </span>
                    <span className="text-xs font-mono text-[#6DC98D] bg-[#4CAF75]/15 px-2 py-0.5 rounded">
                      {JHARKHAND_DOMAINS.find(d => d.key === selectedProblem.aiOutput.domain)?.name}
                    </span>
                  </div>
                  <span className="text-xs text-[#8FA89E]">
                    Reported {new Date(selectedProblem.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-lg text-[#F0EDE6] mt-1 leading-snug">
                  {selectedProblem.title}
                </h3>
                <p className="text-xs text-[#8FA89E] mt-2 leading-relaxed bg-[#0A1A14] p-3 rounded-xl border border-[#4CAF75]/15">
                  {selectedProblem.description}
                </p>
              </div>

              {/* Status Progress Stepper */}
              <div className="p-4 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20 space-y-3">
                <span className="text-[11px] font-mono text-[#F57C00] uppercase tracking-wider block font-semibold">
                  Platform Lifecycle Progress
                </span>

                <div className="space-y-3">
                  {statusSteps.map((st, idx) => {
                    const currentIdx = getStepIndex(selectedProblem.status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={st.key} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                              isDone
                                ? 'bg-[#4CAF75] text-[#0A1A14] ring-2 ring-[#4CAF75]/40'
                                : 'bg-[#1A3328] text-[#556B62] border border-[#4CAF75]/20'
                            }`}
                          >
                            {isDone ? '✓' : idx + 1}
                          </div>
                          {idx < statusSteps.length - 1 && (
                            <div
                              className={`w-0.5 h-6 my-0.5 ${
                                idx < currentIdx ? 'bg-[#4CAF75]' : 'bg-[#1A3328]'
                              }`}
                            />
                          )}
                        </div>

                        <div className="pt-0.5">
                          <span
                            className={`font-semibold text-xs block ${
                              isCurrent
                                ? 'text-[#FF9A30]'
                                : isDone
                                ? 'text-[#F0EDE6]'
                                : 'text-[#556B62]'
                            }`}
                          >
                            {st.label}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] text-[#8FA89E] block">
                              Active stage • Updates logged to SMS
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
                <div className="p-4 rounded-2xl bg-[#1A3328] border border-[#4CAF75]/30 space-y-2">
                  <span className="text-[10px] font-mono text-[#6DC98D] uppercase tracking-wider block">
                    Assigned Execution Partner
                  </span>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#F0EDE6]">
                        {selectedProblem.assignedUniversity.name}
                      </h4>
                      <p className="text-xs text-[#8FA89E]">
                        Dept: {selectedProblem.assignedUniversity.department} • Faculty Lead: {selectedProblem.assignedUniversity.leadFaculty}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#4CAF75] bg-[#4CAF75]/20 px-2 py-0.5 rounded">
                      Field Active
                    </span>
                  </div>

                  {selectedProblem.fundingAmount && (
                    <div className="pt-2 border-t border-[#4CAF75]/15 flex items-center justify-between text-xs">
                      <span className="text-[#8FA89E]">CSR Co-Sponsorship:</span>
                      <span className="font-mono font-bold text-[#FF9A30]">
                        ₹{selectedProblem.fundingAmount.toLocaleString('en-IN')} (Tata Steel CSR)
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/15 text-xs text-[#8FA89E]">
                  Matching algorithm is evaluating relevant university departments...
                </div>
              )}

              {/* 5-Star Citizen Rating Panel (when status is deployed or resolved) */}
              {(selectedProblem.status === 'deployed' || selectedProblem.status === 'resolved' || selectedProblem.citizenRating) && (
                <div className="p-5 rounded-2xl bg-[#0A1A14] border-2 border-[#F57C00]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FF9A30] uppercase flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-[#F57C00] text-[#F57C00]" />
                      Citizen Solution Verification
                    </span>
                    {selectedProblem.citizenRating && (
                      <span className="text-xs font-mono text-[#4CAF75]">
                        Rated {selectedProblem.citizenRating}/5 Stars
                      </span>
                    )}
                  </div>

                  {selectedProblem.citizenFeedback ? (
                    <div className="p-3 bg-[#112318] rounded-xl text-xs text-[#9EDDB4] italic">
                      "{selectedProblem.citizenFeedback}"
                    </div>
                  ) : (
                    <form onSubmit={handleRatingSubmit} className="space-y-3">
                      <p className="text-xs text-[#8FA89E]">
                        Has the water filtration / technical solution resolved the problem in your village? Rate the quality:
                      </p>

                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setRatingVal(s)}
                            className={`p-2 rounded-xl text-lg transition-transform hover:scale-110 ${
                              s <= ratingVal ? 'text-[#F57C00]' : 'text-[#556B62]'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="text-xs font-mono text-[#F0EDE6] ml-2">
                          {ratingVal} of 5 Stars
                        </span>
                      </div>

                      <textarea
                        value={feedbackText}
                        onChange={e => setFeedbackText(e.target.value)}
                        placeholder="Write your feedback for the university students and state collectors..."
                        rows={2}
                        className="w-full bg-[#112318] border border-[#4CAF75]/30 rounded-xl p-2.5 text-xs text-[#F0EDE6] outline-none"
                      />

                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-all shadow-md cursor-pointer"
                      >
                        Submit Citizen Verification
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-[#112318] rounded-3xl border border-[#4CAF75]/15 text-center text-[#8FA89E]">
              Select a submission to inspect progress
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
