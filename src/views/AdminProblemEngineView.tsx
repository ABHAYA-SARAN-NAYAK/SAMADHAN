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
    <div className="space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE6DE]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8E6] border border-[#C5221F]/30 text-xs font-bold text-[#C5221F] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5221F] animate-ping" />
            AI PROBLEM TRIAGE ENGINE
          </div>
          <h2 className="font-display font-bold text-3xl text-[#1C1410]">
            Statewide War-Room Ingestion Feed
          </h2>
          <p className="text-sm text-[#7A6355] mt-0.5">
            Review automated severity scoring, deduplication clusters, and dispatch to state universities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-white px-4 py-2 rounded-xl border border-[#EDE6DE] text-[#7A6355] shadow-2xs">
            Total Live Feed: <strong className="text-[#1C1410] font-mono">{problems.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-[#EDE6DE] text-xs shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#7A6355] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, village..."
            className="w-full pl-9 pr-3 py-2 bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl text-[#1C1410] placeholder-[#7A6355]/60 outline-none focus:border-[#F57C00]"
          />
        </div>

        <select
          value={selectedDomain}
          onChange={e => setSelectedDomain(e.target.value)}
          className="bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl px-3 py-2 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
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
          className="bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl px-3 py-2 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
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
          className="bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl px-3 py-2 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
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
        <div className="lg:col-span-7 bg-white border border-[#EDE6DE] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FDF9F4] text-[#7A6355] font-bold text-xs uppercase border-b border-[#EDE6DE]">
                <tr>
                  <th className="p-3.5">ID & Urgency</th>
                  <th className="p-3.5">Domain</th>
                  <th className="p-3.5">District</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE6DE]">
                {filteredProblems.map(p => {
                  const isSelected = selectedProblem?.id === p.id;
                  const urgency = p.aiOutput.urgencyScore;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProblem(p)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FEF0E0]' : 'hover:bg-[#FDF9F4]'
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              urgency >= 80 ? 'bg-[#C5221F] animate-ping' : urgency >= 65 ? 'bg-[#F57C00]' : 'bg-[#3D9970]'
                            }`}
                          />
                          <div>
                            <span className="font-mono font-bold text-[#D4600A] block">
                              {p.problemId}
                            </span>
                            <span className="text-[11px] text-[#7A6355] font-mono">
                              Score: {urgency}/100
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-[#1C1410] block truncate max-w-[130px]">
                          {JHARKHAND_DOMAINS.find(d => d.key === p.aiOutput.domain)?.name || p.aiOutput.domain}
                        </span>
                      </td>

                      <td className="p-3.5 text-[#7A6355]">
                        <span className="block font-bold text-[#1C1410]">{p.location.district}</span>
                        <span className="text-xs block truncate max-w-[100px]">{p.location.block || 'Rural'}</span>
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full capitalize ${
                            p.status === 'resolved' || p.status === 'deployed'
                              ? 'bg-[#E8F5EE] text-[#2E7D52]'
                              : p.status === 'assigned'
                              ? 'bg-[#E0F2FE] text-[#0369A1]'
                              : 'bg-[#FEF0E0] text-[#D4600A]'
                          }`}
                        >
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMatching(p);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
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
            <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-5 shadow-sm space-y-5 sticky top-20">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded border border-[#F57C00]/20">
                    {selectedProblem.problemId}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#1C1410] mt-1.5 leading-snug">
                    {selectedProblem.title}
                  </h3>
                  <p className="text-xs text-[#7A6355] flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                    {selectedProblem.location.village}, {selectedProblem.location.panchayat}, {selectedProblem.location.district}
                  </p>
                </div>
              </div>

              {/* AI Diagnostic Report */}
              <div className="p-4 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2E7D52] uppercase flex items-center gap-1">
                    <BrainCircuit className="w-4 h-4 text-[#F57C00]" /> Gemini Diagnostic Engine
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1C1410] bg-white px-2 py-0.5 rounded border border-[#EDE6DE]">
                    Conf: {Math.round(selectedProblem.aiOutput.confidence * 100)}%
                  </span>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE6DE]">
                    <span className="text-xs text-[#7A6355] block">Urgency</span>
                    <span className="font-mono font-bold text-base text-[#C5221F]">
                      {selectedProblem.aiOutput.urgencyScore}/100
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE6DE]">
                    <span className="text-xs text-[#7A6355] block">Solvability</span>
                    <span className="font-mono font-bold text-base text-[#0369A1]">
                      {selectedProblem.aiOutput.solvabilityScore}/100
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE6DE]">
                    <span className="text-xs text-[#7A6355] block">Composite</span>
                    <span className="font-mono font-bold text-base text-[#2E7D52]">
                      {selectedProblem.aiOutput.compositeScore}/100
                    </span>
                  </div>
                </div>

                {/* Severity Justification */}
                {selectedProblem.aiOutput.severityReason && (
                  <p className="text-xs text-[#4A3728] italic bg-white p-3 rounded-xl border border-[#EDE6DE] leading-relaxed">
                    "{selectedProblem.aiOutput.severityReason}"
                  </p>
                )}

                {/* Cluster Tag */}
                {selectedProblem.aiOutput.clusterGroupId && (
                  <div className="p-2.5 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/30 text-xs font-semibold text-[#D4600A]">
                    Part of clustered compound issue in {selectedProblem.location.district}
                  </div>
                )}
              </div>

              {/* Citizen Original Text */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#7A6355] uppercase block">
                  Reported Grievance:
                </span>
                <p className="text-xs text-[#1C1410] bg-[#FDF9F4] p-3.5 rounded-xl border border-[#EDE6DE] leading-relaxed">
                  {selectedProblem.description}
                </p>
              </div>

              {/* Actions Grid */}
              <div className="pt-2 border-t border-[#EDE6DE] flex flex-col gap-2">
                <button
                  id="btn-route-uni"
                  onClick={() => handleOpenMatching(selectedProblem)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Approve & Route to University Engineering Cell</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => onUpdateStatus(selectedProblem.id, 'under_review')}
                    className="py-2 px-3 rounded-xl bg-white hover:bg-[#FDF9F4] text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE] font-bold transition-colors cursor-pointer"
                  >
                    Flag for Verification
                  </button>
                  <button
                    onClick={() => onUpdateStatus(selectedProblem.id, 'resolved')}
                    className="py-2 px-3 rounded-xl bg-[#E8F5EE] hover:bg-[#D1EBE0] text-[#2E7D52] border border-[#3D9970]/30 transition-colors font-bold cursor-pointer"
                  >
                    Mark Deployed / Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-[24px] border border-[#EDE6DE] text-[#7A6355] text-xs">
              Select a row in the problem feed to diagnose
            </div>
          )}
        </div>
      </div>

      {/* University Matching Modal */}
      {showMatchModal && selectedProblem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 max-w-xl w-full shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider block">
                  Smart Routing Algorithm
                </span>
                <h3 className="font-display font-bold text-2xl text-[#1C1410] mt-0.5">
                  Recommend University for {selectedProblem.problemId}
                </h3>
                <p className="text-xs text-[#7A6355]">
                  Domain: {selectedProblem.aiOutput.domain} • District: {selectedProblem.location.district}
                </p>
              </div>
              <button
                onClick={() => setShowMatchModal(false)}
                className="p-1 rounded-lg text-[#7A6355] hover:text-[#1C1410] cursor-pointer"
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
                    className="p-4 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] hover:border-[#F57C00] transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded border border-[#F57C00]/20">
                            Rank #{idx + 1}
                          </span>
                          <h4 className="font-display font-bold text-base text-[#1C1410]">{rec.name}</h4>
                        </div>
                        <p className="text-xs text-[#7A6355] mt-0.5">Location: {rec.city}, Jharkhand</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                        {rec.matchScore}% Match
                      </span>
                    </div>

                    {/* Reasons */}
                    <div className="space-y-1">
                      {rec.reasons.map((r: string, rIdx: number) => (
                        <div key={rIdx} className="text-xs text-[#2E7D52] flex items-center gap-1.5 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
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
                      className="w-full py-2.5 px-4 rounded-xl bg-[#3D9970] hover:bg-[#2E7D52] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Assign & Create Capstone Project</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#7A6355]">
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
