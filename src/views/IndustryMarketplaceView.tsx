import React, { useState } from 'react';
import {
  Briefcase,
  Coins,
  CheckCircle2,
  Building2,
  Sparkles,
  Search,
  Filter,
  FileCheck,
  Award,
  Layers,
  MapPin,
  TrendingUp,
  X,
  Download
} from 'lucide-react';
import { Problem, Project, ProblemDomain } from '../types';
import { JHARKHAND_DOMAINS } from '../data/constants';

interface IndustryMarketplaceViewProps {
  problems: Problem[];
  projects: Project[];
  onPledgeFunding: (problemId: string, company: string, amount: number, mode: string) => void;
}

export const IndustryMarketplaceView: React.FC<IndustryMarketplaceViewProps> = ({
  problems,
  projects,
  onPledgeFunding
}) => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my_partnerships'>('marketplace');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Express Interest Modal State
  const [selectedProblemForCSR, setSelectedProblemForCSR] = useState<Problem | null>(null);
  const [corporateName, setCorporateName] = useState('Tata Steel Foundation');
  const [contactPerson, setContactPerson] = useState('Sourav Mukherjee (Head of CSR)');
  const [pledgeAmount, setPledgeAmount] = useState<number>(750000);
  const [partnershipMode, setPartnershipMode] = useState<string>('CSR Grant Co-Funding');
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  const filteredProblems = problems.filter(p => {
    if (selectedDomain !== 'all' && p.aiOutput.domain !== selectedDomain) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConfirmPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblemForCSR) return;
    onPledgeFunding(
      selectedProblemForCSR.id,
      corporateName,
      pledgeAmount,
      partnershipMode
    );
    setPledgeSuccess(true);
    setTimeout(() => {
      setSelectedProblemForCSR(null);
      setPledgeSuccess(false);
      setActiveTab('my_partnerships');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4CAF75]/15">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#60A5FA]/15 border border-[#60A5FA]/30 text-xs font-mono text-[#60A5FA] mb-1 font-semibold">
            <Coins className="w-3 h-3" />
            CORPORATE CSR & INDUSTRY CO-CREATION MARKETPLACE
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#F0EDE6]">
            Research-Ready Civic Challenges
          </h2>
          <p className="text-xs text-[#8FA89E]">
            Direct Section 135 DPE Schedule VII CSR funding towards university-engineered grassroots solutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'marketplace'
                ? 'bg-[#F57C00] text-[#0A1A14] shadow-md'
                : 'bg-[#112318] text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20'
            }`}
          >
            Explore Marketplace
          </button>
          <button
            onClick={() => setActiveTab('my_partnerships')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'my_partnerships'
                ? 'bg-[#F57C00] text-[#0A1A14] shadow-md'
                : 'bg-[#112318] text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20'
            }`}
          >
            My CSR Partnerships
          </button>
        </div>
      </div>

      {/* TAB 1: Marketplace Grid */}
      {activeTab === 'marketplace' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#112318] p-3 rounded-2xl border border-[#4CAF75]/20 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8FA89E] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search challenges by keyword..."
                className="w-full pl-8 pr-3 py-2 bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl text-[#F0EDE6] placeholder-[#556B62] outline-none"
              />
            </div>

            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl px-3 py-2 text-[#F0EDE6] outline-none"
            >
              <option value="all">All CSR Domains (10)</option>
              {JHARKHAND_DOMAINS.map(d => (
                <option key={d.key} value={d.key}>
                  {d.icon} {d.name}
                </option>
              ))}
            </select>

            <div className="flex items-center justify-end text-xs text-[#8FA89E]">
              <span>Matching Challenges: <strong className="text-[#4CAF75]">{filteredProblems.length}</strong></span>
            </div>
          </div>

          {/* Pinterest/Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProblems.map(p => {
              const domainMeta = JHARKHAND_DOMAINS.find(d => d.key === p.aiOutput.domain);
              const targetFunding = p.fundingAmount || 500000;

              return (
                <div
                  key={p.id}
                  id={`marketplace-card-${p.problemId}`}
                  className="p-5 rounded-2xl bg-[#112318] border border-[#4CAF75]/20 hover:border-[#4CAF75]/60 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#60A5FA] bg-[#60A5FA]/15 px-2.5 py-0.5 rounded-full border border-[#60A5FA]/30">
                        Schedule VII Eligible
                      </span>
                      <span className="text-xs font-mono font-bold text-[#FF9A30]">
                        Urgency: {p.aiOutput.urgencyScore}/100
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm">{domainMeta?.icon}</span>
                        <span className="text-[10px] font-mono text-[#F57C00] uppercase font-bold">
                          {domainMeta?.name}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#F0EDE6] group-hover:text-[#60A5FA] transition-colors leading-snug">
                        {p.title}
                      </h4>
                    </div>

                    <p className="text-xs text-[#8FA89E] line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Matched University info */}
                    <div className="p-2.5 bg-[#0A1A14] rounded-xl border border-[#4CAF75]/15 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8FA89E]">Lead University:</span>
                        <span className="font-semibold text-[#F0EDE6]">
                          {p.assignedUniversity?.name || 'NIT Jamshedpur'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8FA89E]">Location:</span>
                        <span className="font-medium text-[#9EDDB4]">
                          {p.location.district} District
                        </span>
                      </div>
                    </div>

                    {/* Funding Target */}
                    <div className="pt-2 border-t border-[#4CAF75]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#8FA89E] block">Target CSR Grant</span>
                        <span className="font-mono font-bold text-sm text-[#4CAF75]">
                          ₹{(targetFunding / 100000).toFixed(1)} Lakhs
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8FA89E] bg-[#1A3328] px-2 py-1 rounded">
                        47 Citizens Impacted
                      </span>
                    </div>
                  </div>

                  <button
                    id={`btn-pledge-${p.problemId}`}
                    onClick={() => setSelectedProblemForCSR(p)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#60A5FA] hover:bg-[#93C5FD] text-[#0A1A14] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Express CSR Interest / Co-Fund</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: My CSR Partnerships & DPE Report */}
      {activeTab === 'my_partnerships' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-[#112318] border border-[#4CAF75]/25 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-[#F57C00] uppercase tracking-wider font-bold">
                  Corporate CSR Portfolio
                </span>
                <h3 className="font-display font-bold text-xl text-[#F0EDE6]">
                  Tata Steel Foundation Impact Allocations
                </h3>
              </div>
              <button
                onClick={() => alert('Downloading DPE Section 135 CSR Compliance Audit Package (PDF)...')}
                className="px-4 py-2 rounded-xl bg-[#1A3328] hover:bg-[#1A3328]/80 text-[#9EDDB4] border border-[#4CAF75]/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#F57C00]" />
                <span>Export DPE CSR Audit Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/15">
                <span className="text-[10px] font-mono text-[#8FA89E] block">Total CSR Committed</span>
                <span className="font-mono font-extrabold text-2xl text-[#FF9A30]">₹14.5 Lakhs</span>
              </div>
              <div className="p-3.5 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/15">
                <span className="text-[10px] font-mono text-[#8FA89E] block">Active Deployments</span>
                <span className="font-mono font-extrabold text-2xl text-[#4CAF75]">2 Initiatives</span>
              </div>
              <div className="p-3.5 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/15">
                <span className="text-[10px] font-mono text-[#8FA89E] block">Beneficiaries Verified</span>
                <span className="font-mono font-extrabold text-2xl text-[#60A5FA]">18,400+ Citizens</span>
              </div>
            </div>

            {/* List of active sponsorships */}
            <div className="p-4 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-[#F0EDE6]">
                    Garhwa High-Fluoride Deep-Borewell Remediation
                  </h4>
                  <p className="text-[11px] text-[#8FA89E]">
                    University Partner: NIT Jamshedpur • District: Garhwa (Meral Block)
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-xs text-[#4CAF75] block">₹7,50,000 CSR Grant</span>
                  <span className="text-[10px] text-[#8FA89E]">Schedule VII - Clean Drinking Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Express CSR Interest Modal */}
      {selectedProblemForCSR && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112318] border border-[#4CAF75]/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#60A5FA] uppercase font-bold">
                  CSR Sponsorship Declaration
                </span>
                <h3 className="font-display font-bold text-xl text-[#F0EDE6] mt-1">
                  Partner on {selectedProblemForCSR.problemId}
                </h3>
                <p className="text-xs text-[#8FA89E]">
                  {selectedProblemForCSR.title} • {selectedProblemForCSR.location.district}
                </p>
              </div>
              <button
                onClick={() => setSelectedProblemForCSR(null)}
                className="p-1 rounded-lg text-[#8FA89E] hover:text-[#F0EDE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {pledgeSuccess ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#4CAF75] mx-auto animate-bounce" />
                <h4 className="font-display font-bold text-lg text-[#F0EDE6]">CSR Commitment Registered!</h4>
                <p className="text-xs text-[#8FA89E]">
                  University team and state coordinators have been notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPledge} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-[11px] font-mono text-[#8FA89E] block mb-1">Corporate Entity</label>
                  <select
                    value={corporateName}
                    onChange={e => setCorporateName(e.target.value)}
                    className="w-full bg-[#0A1A14] border border-[#4CAF75]/30 rounded-xl p-2.5 text-[#F0EDE6] outline-none"
                  >
                    <option value="Tata Steel Foundation">Tata Steel Foundation</option>
                    <option value="Steel Authority of India Ltd (SAIL)">Steel Authority of India Ltd (SAIL)</option>
                    <option value="Central Coalfields Limited (CCL)">Central Coalfields Limited (CCL)</option>
                    <option value="Adani Power Jharkhand">Adani Power Jharkhand</option>
                    <option value="Jindal Steel & Power (JSPL)">Jindal Steel & Power (JSPL)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-[#8FA89E] block mb-1">CSR Grant Pledge (₹)</label>
                    <input
                      type="number"
                      value={pledgeAmount}
                      onChange={e => setPledgeAmount(Number(e.target.value))}
                      className="w-full bg-[#0A1A14] border border-[#4CAF75]/30 rounded-xl p-2.5 text-[#F0EDE6] font-mono font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#8FA89E] block mb-1">Partnership Mode</label>
                    <select
                      value={partnershipMode}
                      onChange={e => setPartnershipMode(e.target.value)}
                      className="w-full bg-[#0A1A14] border border-[#4CAF75]/30 rounded-xl p-2.5 text-[#F0EDE6] outline-none"
                    >
                      <option value="CSR Grant Co-Funding">CSR Grant Co-Funding</option>
                      <option value="Mentorship & Lab Hardware">Mentorship & Lab Hardware</option>
                      <option value="Co-Creation & Co-Build">Co-Creation & Co-Build</option>
                      <option value="Scale License & Tech Transfer">Scale License & Tech Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#8FA89E] block mb-1">Authorizing CSR Official</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={e => setContactPerson(e.target.value)}
                    className="w-full bg-[#0A1A14] border border-[#4CAF75]/30 rounded-xl p-2.5 text-[#F0EDE6] outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#4CAF75]/15">
                  <button
                    type="button"
                    onClick={() => setSelectedProblemForCSR(null)}
                    className="px-4 py-2 rounded-xl text-xs text-[#8FA89E] hover:text-[#F0EDE6]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#60A5FA] hover:bg-[#93C5FD] text-[#0A1A14] font-semibold text-xs transition-all shadow-md cursor-pointer"
                  >
                    Confirm CSR Sponsorship
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
