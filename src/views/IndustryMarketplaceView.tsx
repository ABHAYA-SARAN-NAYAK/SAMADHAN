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
    <div className="space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE6DE]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] border border-[#3D9970]/30 text-xs font-bold text-[#2E7D52] mb-1.5">
            <Coins className="w-3.5 h-3.5 text-[#F57C00]" />
            CORPORATE CSR & INDUSTRY CO-CREATION MARKETPLACE
          </div>
          <h2 className="font-display font-bold text-3xl text-[#1C1410]">
            Research-Ready Civic Challenges
          </h2>
          <p className="text-sm text-[#7A6355] mt-0.5">
            Direct Section 135 DPE Schedule VII CSR funding towards university-engineered grassroots solutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'marketplace'
                ? 'bg-[#1C1410] text-white shadow-xs'
                : 'bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE]'
            }`}
          >
            Explore Marketplace
          </button>
          <button
            onClick={() => setActiveTab('my_partnerships')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'my_partnerships'
                ? 'bg-[#1C1410] text-white shadow-xs'
                : 'bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE]'
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded-2xl border border-[#EDE6DE] text-xs shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A6355] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search challenges by keyword..."
                className="w-full pl-9 pr-3 py-2 bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl text-[#1C1410] placeholder-[#7A6355]/60 outline-none focus:border-[#F57C00]"
              />
            </div>

            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl px-3 py-2 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
            >
              <option value="all">All CSR Domains (10)</option>
              {JHARKHAND_DOMAINS.map(d => (
                <option key={d.key} value={d.key}>
                  {d.icon} {d.name}
                </option>
              ))}
            </select>

            <div className="flex items-center justify-end text-xs text-[#7A6355] px-2 font-mono">
              <span>Matching Challenges: <strong className="text-[#F57C00]">{filteredProblems.length}</strong></span>
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
                  className="p-5 rounded-2xl bg-white border border-[#EDE6DE] hover:border-[#F57C00] transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                        Schedule VII Eligible
                      </span>
                      <span className="text-xs font-mono font-bold text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded-full">
                        Urgency: {p.aiOutput.urgencyScore}/100
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">{domainMeta?.icon}</span>
                        <span className="text-xs font-bold text-[#F57C00] uppercase tracking-wider">
                          {domainMeta?.name}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#1C1410] group-hover:text-[#F57C00] transition-colors leading-snug">
                        {p.title}
                      </h4>
                    </div>

                    <p className="text-xs text-[#7A6355] line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Matched University info */}
                    <div className="p-3 bg-[#FDF9F4] rounded-xl border border-[#EDE6DE] text-xs space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#7A6355]">Lead University:</span>
                        <span className="font-bold text-[#1C1410]">
                          {p.assignedUniversity?.name || 'NIT Jamshedpur'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#7A6355]">Location:</span>
                        <span className="font-bold text-[#2E7D52]">
                          {p.location.district} District
                        </span>
                      </div>
                    </div>

                    {/* Funding Target */}
                    <div className="pt-2 border-t border-[#EDE6DE] flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#7A6355] block">Target CSR Grant</span>
                        <span className="font-mono font-bold text-base text-[#1C1410]">
                          ₹{(targetFunding / 100000).toFixed(1)} Lakhs
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                        47 Citizens Impacted
                      </span>
                    </div>
                  </div>

                  <button
                    id={`btn-pledge-${p.problemId}`}
                    onClick={() => setSelectedProblemForCSR(p)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:-translate-y-0.5"
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
          <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider block">
                  Corporate CSR Portfolio
                </span>
                <h3 className="font-display font-bold text-2xl text-[#1C1410]">
                  Tata Steel Foundation Impact Allocations
                </h3>
              </div>
              <button
                onClick={() => alert('Downloading DPE Section 135 CSR Compliance Audit Package (PDF)...')}
                className="px-4 py-2 rounded-xl bg-[#E8F5EE] hover:bg-[#D1EBE0] text-[#2E7D52] border border-[#3D9970]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#F57C00]" />
                <span>Export DPE CSR Audit Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE]">
                <span className="text-xs text-[#7A6355] block">Total CSR Committed</span>
                <span className="font-mono font-bold text-2xl text-[#D4600A]">₹14.5 Lakhs</span>
              </div>
              <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE]">
                <span className="text-xs text-[#7A6355] block">Active Deployments</span>
                <span className="font-mono font-bold text-2xl text-[#2E7D52]">2 Initiatives</span>
              </div>
              <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE]">
                <span className="text-xs text-[#7A6355] block">Beneficiaries Verified</span>
                <span className="font-mono font-bold text-2xl text-[#1C1410]">18,400+ Citizens</span>
              </div>
            </div>

            {/* List of active sponsorships */}
            <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1C1410]">
                    Garhwa High-Fluoride Deep-Borewell Remediation
                  </h4>
                  <p className="text-xs text-[#7A6355] mt-0.5">
                    University Partner: NIT Jamshedpur • District: Garhwa (Meral Block)
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-[#2E7D52] block">₹7,50,000 CSR Grant</span>
                  <span className="text-xs text-[#7A6355]">Schedule VII - Clean Drinking Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Express CSR Interest Modal */}
      {selectedProblemForCSR && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 max-w-lg w-full shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider">
                  CSR Sponsorship Declaration
                </span>
                <h3 className="font-display font-bold text-2xl text-[#1C1410] mt-1">
                  Partner on {selectedProblemForCSR.problemId}
                </h3>
                <p className="text-xs text-[#7A6355]">
                  {selectedProblemForCSR.title} • {selectedProblemForCSR.location.district}
                </p>
              </div>
              <button
                onClick={() => setSelectedProblemForCSR(null)}
                className="p-1 rounded-lg text-[#7A6355] hover:text-[#1C1410] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {pledgeSuccess ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#2E7D52] mx-auto animate-bounce" />
                <h4 className="font-display font-bold text-xl text-[#1C1410]">CSR Commitment Registered!</h4>
                <p className="text-xs text-[#7A6355]">
                  University team and state coordinators have been notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPledge} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-xs font-bold text-[#4A3728] block mb-1">Corporate Entity</label>
                  <select
                    value={corporateName}
                    onChange={e => setCorporateName(e.target.value)}
                    className="w-full bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl p-2.5 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
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
                    <label className="text-xs font-bold text-[#4A3728] block mb-1">CSR Grant Pledge (₹)</label>
                    <input
                      type="number"
                      value={pledgeAmount}
                      onChange={e => setPledgeAmount(Number(e.target.value))}
                      className="w-full bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl p-2.5 text-[#1C1410] font-mono font-bold outline-none focus:border-[#F57C00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#4A3728] block mb-1">Partnership Mode</label>
                    <select
                      value={partnershipMode}
                      onChange={e => setPartnershipMode(e.target.value)}
                      className="w-full bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl p-2.5 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
                    >
                      <option value="CSR Grant Co-Funding">CSR Grant Co-Funding</option>
                      <option value="Mentorship & Lab Hardware">Mentorship & Lab Hardware</option>
                      <option value="Co-Creation & Co-Build">Co-Creation & Co-Build</option>
                      <option value="Scale License & Tech Transfer">Scale License & Tech Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#4A3728] block mb-1">Authorizing CSR Official</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={e => setContactPerson(e.target.value)}
                    className="w-full bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl p-2.5 text-[#1C1410] font-medium outline-none focus:border-[#F57C00]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE6DE]">
                  <button
                    type="button"
                    onClick={() => setSelectedProblemForCSR(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#7A6355] hover:text-[#1C1410] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
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
