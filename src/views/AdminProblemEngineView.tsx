import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  X,
  Sparkles,
  Layers,
  ChevronRight,
  Send,
  MapPin,
  Clock,
  Check
} from 'lucide-react';
import { Problem, University } from '../types';
import { JHARKHAND_DOMAINS, JHARKHAND_DISTRICTS } from '../data/constants';

interface AdminProblemEngineViewProps {
  problems: Problem[];
  universities: University[];
  onAssignToUniversity: (problemId: string, universityId: string, facultyName: string) => void;
  onUpdateStatus: (problemId: string, status: any) => void;
}

export const AdminProblemEngineView: React.FC<AdminProblemEngineViewProps> = ({
  problems,
  universities,
  onAssignToUniversity,
  onUpdateStatus
}) => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(problems[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Match Recommendations State
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<any[]>([]);

  const filteredProblems = problems.filter(p => {
    if (selectedDomain !== 'all' && p.aiOutput.domain !== selectedDomain) return false;
    if (selectedDistrict !== 'all' && p.location.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.problemId.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenMatching = async (problem: Problem) => {
    setSelectedProblem(problem);
    setIsMatching(true);
    setShowMatchModal(true);

    try {
      const res = await fetch('/api/ai/match-university', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: problem.aiOutput.domain,
          district: problem.location.district,
          urgencyScore: problem.aiOutput.urgencyScore
        })
      });
      const data = await res.json();
      if (data.data?.recommendations) {
        setMatchResults(data.data.recommendations);
      }
    } catch (err) {
      console.error('Error fetching university matches:', err);
    } finally {
      setIsMatching(false);
    }
  };

  const handleConfirmAssignment = (uniId: string, facultyName: string) => {
    if (!selectedProblem) return;
    onAssignToUniversity(selectedProblem.id, uniId, facultyName);
    setShowMatchModal(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4CAF75]/15">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs font-mono text-[#EF4444] mb-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping" />
            AI PROBLEM TRIAGE ENGINE
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#F0EDE6]">
            Statewide War-Room Ingestion Feed
          </h2>
          <p className="text-xs text-[#8FA89E]">
            Review automated severity scoring, deduplication clusters, and dispatch to state universities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8FA89E] bg-[#112318] px-3 py-1.5 rounded-xl border border-[#4CAF75]/20">
            Total Live Feed: <strong className="text-[#F0EDE6]">{problems.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#112318] p-3.5 rounded-2xl border border-[#4CAF75]/20 text-xs">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8FA89E] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, village..."
            className="w-full pl-8 pr-3 py-2 bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl text-[#F0EDE6] placeholder-[#556B62] outline-none"
          />
        </div>

        <select
          value={selectedDomain}
          onChange={e => setSelectedDomain(e.target.value)}
          className="bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl px-3 py-2 text-[#F0EDE6] outline-none"
        >
          <option value="all">All Domains (10)</option>
          {JHARKHAND_DOMAINS.map(d => (
            <option key={d.key} value={d.key}>
              {d.icon} {d.name}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={e => setSelectedDistrict(e.target.value)}
          className="bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl px-3 py-2 text-[#F0EDE6] outline-none"
        >
          <option value="all">All 24 Districts</option>
          {JHARKHAND_DISTRICTS.map(d => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl px-3 py-2 text-[#F0EDE6] outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="assigned">Assigned to Uni</option>
          <option value="in_progress">In Progress</option>
          <option value="deployed">Deployed</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Main Table + Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Problems Table Feed (7 cols) */}
        <div className="lg:col-span-7 bg-[#112318] border border-[#4CAF75]/20 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A1A14] text-[#8FA89E] font-mono text-[10px] uppercase border-b border-[#4CAF75]/20">
                <tr>
                  <th className="p-3">ID & Urgency</th>
                  <th className="p-3">Domain</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4CAF75]/10">
                {filteredProblems.map(p => {
                  const isSelected = selectedProblem?.id === p.id;
                  const urgency = p.aiOutput.urgencyScore;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProblem(p)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#1A3328]/80' : 'hover:bg-[#1A3328]/40'
                      }`}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              urgency >= 80 ? 'bg-[#EF4444] animate-urgent-pulse' : urgency >= 65 ? 'bg-[#F57C00]' : 'bg-[#4CAF75]'
                            }`}
                          />
                          <div>
                            <span className="font-mono font-bold text-[#FF9A30] block">
                              {p.problemId}
                            </span>
                            <span className="text-[10px] text-[#8FA89E] font-mono">
                              Score: {urgency}/100
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="font-medium text-[#F0EDE6] block truncate max-w-[130px]">
                          {JHARKHAND_DOMAINS.find(d => d.key === p.aiOutput.domain)?.name || p.aiOutput.domain}
                        </span>
                      </td>

                      <td className="p-3 text-[#8FA89E]">
                        <span className="block font-medium text-[#F0EDE6]">{p.location.district}</span>
                        <span className="text-[10px] block truncate max-w-[100px]">{p.location.block || 'Rural'}</span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full capitalize ${
                            p.status === 'resolved' || p.status === 'deployed'
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : p.status === 'assigned'
                              ? 'bg-blue-500/15 text-blue-400'
                              : 'bg-amber-500/15 text-amber-400'
                          }`}
                        >
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMatching(p);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-[11px] transition-colors"
                        >
                          Route
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Detail Panel (5 cols) */}
        <div className="lg:col-span-5">
          {selectedProblem ? (
            <div className="bg-[#112318] border border-[#4CAF75]/30 rounded-3xl p-5 shadow-xl space-y-5 sticky top-20">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF9A30] bg-[#F57C00]/15 px-2 py-0.5 rounded">
                    {selectedProblem.problemId}
                  </span>
                  <h3 className="font-display font-extrabold text-base text-[#F0EDE6] mt-1.5 leading-snug">
                    {selectedProblem.title}
                  </h3>
                  <p className="text-xs text-[#8FA89E] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                    {selectedProblem.location.village}, {selectedProblem.location.panchayat}, {selectedProblem.location.district}
                  </p>
                </div>
              </div>

              {/* AI Diagnostic Report */}
              <div className="p-4 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#6DC98D] uppercase font-bold flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 text-[#F57C00]" /> Gemini Diagnostic Engine
                  </span>
                  <span className="text-[11px] font-mono text-[#F0EDE6] bg-[#112318] px-2 py-0.5 rounded">
                    Conf: {Math.round(selectedProblem.aiOutput.confidence * 100)}%
                  </span>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-[#112318] rounded-xl border border-[#4CAF75]/15">
                    <span className="text-[10px] text-[#8FA89E] block">Urgency</span>
                    <span className="font-mono font-bold text-sm text-[#EF4444]">
                      {selectedProblem.aiOutput.urgencyScore}/100
                    </span>
                  </div>
                  <div className="p-2 bg-[#112318] rounded-xl border border-[#4CAF75]/15">
                    <span className="text-[10px] text-[#8FA89E] block">Solvability</span>
                    <span className="font-mono font-bold text-sm text-[#60A5FA]">
                      {selectedProblem.aiOutput.solvabilityScore}/100
                    </span>
                  </div>
                  <div className="p-2 bg-[#112318] rounded-xl border border-[#4CAF75]/15">
                    <span className="text-[10px] text-[#8FA89E] block">Composite</span>
                    <span className="font-mono font-bold text-sm text-[#4CAF75]">
                      {selectedProblem.aiOutput.compositeScore}/100
                    </span>
                  </div>
                </div>

                {/* Severity Justification */}
                {selectedProblem.aiOutput.severityReason && (
                  <p className="text-[11px] text-[#9EDDB4] italic bg-[#112318] p-2.5 rounded-xl border border-[#4CAF75]/10">
                    "{selectedProblem.aiOutput.severityReason}"
                  </p>
                )}

                {/* Cluster Tag */}
                {selectedProblem.aiOutput.clusterGroupId && (
                  <div className="p-2.5 rounded-xl bg-[#F57C00]/10 border border-[#F57C00]/30 text-xs text-[#FF9A30]">
                    Part of clustered compound issue in {selectedProblem.location.district}
                  </div>
                )}
              </div>

              {/* Citizen Original Text */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#8FA89E] uppercase block">
                  Reported Grievance:
                </span>
                <p className="text-xs text-[#F0EDE6] bg-[#0A1A14] p-3 rounded-xl border border-[#4CAF75]/15 leading-relaxed">
                  {selectedProblem.description}
                </p>
              </div>

              {/* Actions Grid */}
              <div className="pt-2 border-t border-[#4CAF75]/15 flex flex-col gap-2">
                <button
                  id="btn-route-uni"
                  onClick={() => handleOpenMatching(selectedProblem)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Approve & Route to University Engineering Cell</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => onUpdateStatus(selectedProblem.id, 'under_review')}
                    className="py-2 px-3 rounded-xl bg-[#1A3328] hover:bg-[#1A3328]/80 text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20 transition-colors"
                  >
                    Flag for Verification
                  </button>
                  <button
                    onClick={() => onUpdateStatus(selectedProblem.id, 'resolved')}
                    className="py-2 px-3 rounded-xl bg-[#4CAF75]/20 hover:bg-[#4CAF75]/30 text-[#6DC98D] border border-[#4CAF75]/30 transition-colors font-semibold"
                  >
                    Mark Deployed / Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#112318] rounded-3xl border border-[#4CAF75]/15 text-[#8FA89E] text-xs">
              Select a row in the problem feed to diagnose
            </div>
          )}
        </div>
      </div>

      {/* University Matching Modal */}
      {showMatchModal && selectedProblem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112318] border border-[#4CAF75]/40 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#F57C00] uppercase font-semibold">
                  Smart Routing Algorithm
                </span>
                <h3 className="font-display font-bold text-xl text-[#F0EDE6] mt-0.5">
                  Recommend University for {selectedProblem.problemId}
                </h3>
                <p className="text-xs text-[#8FA89E]">
                  Domain: {selectedProblem.aiOutput.domain} • District: {selectedProblem.location.district}
                </p>
              </div>
              <button
                onClick={() => setShowMatchModal(false)}
                className="p-1 rounded-lg text-[#8FA89E] hover:text-[#F0EDE6] hover:bg-[#1A3328]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recommendations List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {matchResults.length > 0 ? (
                matchResults.map((rec, idx) => (
                  <div
                    key={rec.universityId}
                    className="p-4 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/25 hover:border-[#4CAF75] transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#F57C00] bg-[#F57C00]/10 px-2 py-0.5 rounded">
                            Rank #{idx + 1}
                          </span>
                          <h4 className="font-display font-bold text-sm text-[#F0EDE6]">{rec.name}</h4>
                        </div>
                        <p className="text-[11px] text-[#8FA89E] mt-0.5">Location: {rec.city}, Jharkhand</p>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-[#4CAF75] bg-[#4CAF75]/15 px-2.5 py-1 rounded-full">
                        {rec.matchScore}% Match
                      </span>
                    </div>

                    {/* Reasons */}
                    <div className="space-y-1">
                      {rec.reasons.map((r: string, rIdx: number) => (
                        <div key={rIdx} className="text-[11px] text-[#9EDDB4] flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#4CAF75] shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <button
                      id={`btn-assign-${rec.universityId}`}
                      onClick={() =>
                        handleConfirmAssignment(
                          rec.universityId,
                          rec.availableFaculty[0] || 'Lead Faculty Professor'
                        )
                      }
                      className="w-full py-2 px-4 rounded-xl bg-[#4CAF75] hover:bg-[#6DC98D] text-[#0A1A14] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Assign & Create Capstone Project</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#8FA89E]">
                  Calculating optimal university faculty alignments...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
