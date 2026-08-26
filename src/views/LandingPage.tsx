import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  Users,
  Compass,
  Lightbulb,
  Radio,
  FileCheck,
  Coins,
  Send,
  Layers,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { JHARKHAND_DOMAINS } from '../data/constants';
import { UserRole } from '../types';

interface LandingPageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'citizen' | 'university' | 'industry'>('citizen');
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  const pipelineSteps = [
    { num: '01', title: 'Submit', desc: 'Voice, text or photo from 32,600+ villages', icon: Send },
    { num: '02', title: 'Classify', desc: 'AI auto-tags domain & detects semantic clusters', icon: Layers },
    { num: '03', title: 'Route', desc: 'Smart algorithm matches with top faculty department', icon: Compass },
    { num: '04', title: 'Solve', desc: 'University team builds field-tested prototype', icon: Lightbulb },
    { num: '05', title: 'Fund', desc: 'Industry CSR co-funds hardware & deployment', icon: Coins },
    { num: '06', title: 'Deploy', desc: 'Solution commissioned at panchayat level', icon: FileCheck },
    { num: '07', title: 'Track', desc: 'Citizen rates resolution & students earn ABC credits', icon: ShieldCheck }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A3328] border border-[#4CAF75]/30 text-xs font-mono text-[#6DC98D] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F57C00] animate-ping" />
            <span className="font-semibold">JHARKHAND INNOVATION PLATFORM • PS 26043</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#F0EDE6] mb-6">
            <span className="text-[#F57C00] block mb-1">समाधान</span>
            Where Problems Find Solutions
          </h1>

          <p className="font-body text-lg sm:text-xl text-[#8FA89E] leading-relaxed max-w-2xl mb-8">
            A digital bridge connecting citizens, universities, and industry — transforming Jharkhand's grassroots societal challenges into real, funded, and deployed technical solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <button
              id="hero-btn-submit"
              onClick={() => onNavigate('citizen_submit', 'CITIZEN')}
              className="px-6 py-3 rounded-full bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-sm transition-all shadow-lg shadow-[#F57C00]/20 hover:scale-102 flex items-center gap-2 cursor-pointer"
            >
              <span>Report a Problem in Your Community</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-uni"
              onClick={() => onNavigate('university_inbox', 'UNIVERSITY')}
              className="px-5 py-3 rounded-full bg-[#112318] hover:bg-[#1A3328] text-[#9EDDB4] border border-[#4CAF75]/30 hover:border-[#4CAF75] font-medium text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#4CAF75]" />
              <span>Are you a University? →</span>
            </button>

            <button
              id="hero-btn-industry"
              onClick={() => onNavigate('industry_marketplace', 'INDUSTRY')}
              className="px-5 py-3 rounded-full bg-[#112318] hover:bg-[#1A3328] text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20 hover:border-[#4CAF75]/40 font-medium text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#60A5FA]" />
              <span>Industry & CSR Partner? →</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#4CAF75]/15 max-w-xl">
            <div>
              <span className="block font-mono font-bold text-2xl text-[#F0EDE6]">32,600+</span>
              <span className="text-xs text-[#8FA89E]">Villages Mapped</span>
            </div>
            <div>
              <span className="block font-mono font-bold text-2xl text-[#4CAF75]">12</span>
              <span className="text-xs text-[#8FA89E]">Partner Universities</span>
            </div>
            <div>
              <span className="block font-mono font-bold text-2xl text-[#FF9A30]">₹1,280 Cr</span>
              <span className="text-xs text-[#8FA89E]">DPE Policy CSR Pool</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Horizontal Pipeline */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-[#F57C00] uppercase tracking-wider">End-to-End Delivery</span>
            <h2 className="font-display font-bold text-2xl text-[#F0EDE6]">The SAMADHAN Innovation Lifecycle</h2>
          </div>
          <p className="text-xs text-[#8FA89E] max-w-md">
            From grassroots voice note to university lab prototype, CSR grant, and panchayat commissioning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {pipelineSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative bg-[#112318] border border-[#4CAF75]/20 hover:border-[#4CAF75]/60 rounded-2xl p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4CAF75]/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#F57C00] bg-[#F57C00]/10 px-2 py-0.5 rounded">
                      {s.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#4CAF75] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-[#F0EDE6] mb-1">{s.title}</h3>
                  <p className="text-[11px] text-[#8FA89E] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10 Problem Domains Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#4CAF75] uppercase tracking-wider">Societal Challenges</span>
            <h2 className="font-display font-bold text-2xl text-[#F0EDE6]">10 Priority Domains for Jharkhand</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {JHARKHAND_DOMAINS.map((domain) => (
            <div
              key={domain.key}
              onMouseEnter={() => setHoveredDomain(domain.key)}
              onMouseLeave={() => setHoveredDomain(null)}
              className="bg-[#112318] border border-[#4CAF75]/15 hover:border-[#4CAF75]/40 rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{domain.icon}</span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${domain.badgeClass}`}>
                    {domain.name}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm text-[#F0EDE6]">{domain.name}</h3>
                <p className="text-[11px] text-[#8FA89E] font-medium">{domain.hindiName}</p>
                <div className="mt-2.5 pt-2 border-t border-[#4CAF75]/10">
                  <span className="text-[10px] font-mono text-[#FF9A30] block mb-1">Jharkhand Ground Reality:</span>
                  <p className="text-[11px] text-[#8FA89E] leading-snug">{domain.jharkhandStat}</p>
                </div>
              </div>

              {hoveredDomain === domain.key && (
                <div className="mt-3 pt-2 border-t border-[#4CAF75]/20 text-[10px] text-[#9EDDB4] italic animate-in fade-in">
                  e.g. {domain.sampleProblems[0]}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works by Stakeholder Persona (3 Tabs) */}
      <section className="bg-[#112318] border border-[#4CAF75]/25 rounded-3xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono text-[#F57C00] uppercase tracking-wider">Stakeholder Portals</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F0EDE6] mt-1">How SAMADHAN Works</h2>
          <div className="flex justify-center gap-2 mt-4 p-1 bg-[#0A1A14] rounded-full max-w-md mx-auto border border-[#4CAF75]/20">
            {(['citizen', 'university', 'industry'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-[#F57C00] text-[#0A1A14] shadow-md'
                    : 'text-[#8FA89E] hover:text-[#F0EDE6]'
                }`}
              >
                For {tab}s
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === 'citizen' && (
            <>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#F57C00]/20 text-[#FF9A30] font-mono font-bold text-sm flex items-center justify-center mb-3">1</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Voice or Text Submission</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Record a 1-minute voice note in Hindi, Santali, or Nagpuri. AI transcribes and tags GPS coordinates automatically.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#4CAF75]/20 text-[#6DC98D] font-mono font-bold text-sm flex items-center justify-center mb-3">2</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Live SMS Updates</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Receive SMS milestones whenever a university team is assigned, testing starts, and hardware is installed on-ground.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] font-mono font-bold text-sm flex items-center justify-center mb-3">3</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Citizen Rating & Signoff</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  You give final 1-5 star verification. University students only receive academic credits once the community confirms success.
                </p>
              </div>
            </>
          )}

          {activeTab === 'university' && (
            <>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#F57C00]/20 text-[#FF9A30] font-mono font-bold text-sm flex items-center justify-center mb-3">1</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Department Match Inbox</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Civic challenges matched directly to departmental expertise (Civil, Environmental, Bioengineering, Agriculture).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#4CAF75]/20 text-[#6DC98D] font-mono font-bold text-sm flex items-center justify-center mb-3">2</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Capstone & Lab Deployment</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Form interdisciplinary student teams under faculty mentorship. Access industry CSR grants for fabrication.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] font-mono font-bold text-sm flex items-center justify-center mb-3">3</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">ABC Impact Passport</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Verified social innovation outcomes integrate directly into UGC's Academic Bank of Credits (ABC) for students.
                </p>
              </div>
            </>
          )}

          {activeTab === 'industry' && (
            <>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#F57C00]/20 text-[#FF9A30] font-mono font-bold text-sm flex items-center justify-center mb-3">1</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Pre-Validated CSR Marketplace</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Browse research-ready, clustered problems categorized under DPE Schedule VII CSR guidelines.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#4CAF75]/20 text-[#6DC98D] font-mono font-bold text-sm flex items-center justify-center mb-3">2</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Direct University Co-Building</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Partner with premier institutes (NIT JSR, BIT Mesra, IIT ISM) with transparent milestone fund release.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20">
                <span className="w-8 h-8 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] font-mono font-bold text-sm flex items-center justify-center mb-3">3</span>
                <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-1">Audit-Ready Impact Reports</h3>
                <p className="text-xs text-[#8FA89E] leading-relaxed">
                  Auto-generate compliant statutory CSR impact documentation with geo-tagged photos and beneficiary ratings.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-[#4CAF75]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA89E]">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-[#F0EDE6]">SAMADHAN</span>
          <span>• Smart India Hackathon (SIH) 2026</span>
          <span className="font-mono text-[#F57C00]">PS ID: 26043</span>
        </div>
        <p className="text-center sm:text-right">
          Department of Higher & Technical Education, Government of Jharkhand
        </p>
      </footer>
    </div>
  );
};
