import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  Compass,
  Lightbulb,
  FileCheck,
  Coins,
  Send,
  Layers,
  CheckCircle2,
  UserCheck,
  Sparkles,
  MapPin
} from 'lucide-react';
import { JHARKHAND_DOMAINS, DOMAIN_BADGE_STYLES, DOMAIN_ACCENT_COLORS } from '../data/constants';
import { UserRole } from '../types';

interface LandingPageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'citizen' | 'university' | 'industry'>('citizen');

  const pipelineSteps = [
    { num: 1, title: 'Submit', status: 'completed', desc: 'Voice, text or photo from 32,600+ villages', icon: Send },
    { num: 2, title: 'Classify', status: 'completed', desc: 'AI auto-tags domain & detects semantic clusters', icon: Layers },
    { num: 3, title: 'Route', status: 'active', desc: 'Smart algorithm matches with faculty department', icon: Compass },
    { num: 4, title: 'Solve', status: 'upcoming', desc: 'University team builds field-tested prototype', icon: Lightbulb },
    { num: 5, title: 'Fund', status: 'upcoming', desc: 'Industry CSR co-funds hardware & deployment', icon: Coins },
    { num: 6, title: 'Deploy', status: 'upcoming', desc: 'Solution commissioned at panchayat level', icon: FileCheck },
    { num: 7, title: 'Track', status: 'upcoming', desc: 'Citizen rates resolution & students earn ABC credits', icon: ShieldCheck }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 lg:pt-16 lg:pb-16 bg-[#F7F4EF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#F57C00] font-body bg-[#FEF0E0] px-3.5 py-1.5 rounded-full border border-[#F57C00]/20">
                JHARKHAND SOCIETAL INNOVATION PLATFORM • PS 26043
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[60px] leading-[1.05] text-[#1C1410] tracking-tight">
              Where Jharkhand's Problems<br />
              <span className="text-[#D4600A]">Find Their Solutions</span>
            </h1>

            <p className="font-body text-[17px] leading-[1.7] text-[#7A6355] max-w-xl">
              A digital bridge connecting citizens, universities, and industry — transforming Jharkhand's grassroots societal challenges into real, funded, and deployed technical solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-btn-submit"
                onClick={() => onNavigate('citizen_submit', 'CITIZEN')}
                className="px-7 py-3 rounded-full bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Report a Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-btn-uni"
                onClick={() => onNavigate('university_inbox', 'UNIVERSITY')}
                className="px-7 py-3 rounded-full bg-transparent border-[1.5px] border-[#3D9970] text-[#2E7D52] hover:bg-[#E8F5EE] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <Building2 className="w-4 h-4" />
                <span>For Universities</span>
              </button>
            </div>
          </div>

          {/* Right Column Abstract SVG Map Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-[24px] bg-[#FDF9F4] border border-[#EDE6DE] p-6 shadow-sm flex items-center justify-center overflow-hidden">
              {/* Stylized geometric Jharkhand map with connecting nodes */}
              <svg viewBox="0 0 400 360" className="w-full h-full">
                {/* Background soft mesh */}
                <defs>
                  <linearGradient id="warmLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F57C00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3D9970" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* State outline polygon */}
                <polygon
                  points="90,40 180,30 290,60 360,120 370,220 310,310 210,340 120,310 50,220 40,120"
                  fill="#F0EBE3"
                  stroke="#BFB0A3"
                  strokeWidth="1.5"
                />

                {/* Routing Lines between districts */}
                <line x1="80" y1="90" x2="190" y2="170" stroke="url(#warmLine)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="190" y1="170" x2="310" y2="140" stroke="url(#warmLine)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="190" y1="170" x2="280" y2="260" stroke="url(#warmLine)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="100" y1="240" x2="190" y2="170" stroke="url(#warmLine)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="280" y1="80" x2="190" y2="170" stroke="url(#warmLine)" strokeWidth="2" strokeDasharray="4 4" />

                {/* Nodes with Saffron & Forest Green */}
                {/* Garhwa / Palamu */}
                <circle cx="80" cy="90" r="7" fill="#F57C00" />
                <circle cx="80" cy="90" r="14" fill="#F57C00" fillOpacity="0.2" />
                <text x="75" y="70" fill="#4A3728" fontSize="10" fontWeight="bold" fontFamily="Plus Jakarta Sans">Garhwa</text>

                {/* Ranchi (Center Hub) */}
                <circle cx="190" cy="170" r="10" fill="#D4600A" />
                <circle cx="190" cy="170" r="20" fill="#D4600A" fillOpacity="0.15" />
                <text x="165" y="150" fill="#1C1410" fontSize="11" fontWeight="bold" fontFamily="Plus Jakarta Sans">Ranchi (Hub)</text>

                {/* Dhanbad / Bokaro */}
                <circle cx="280" cy="80" r="7" fill="#3D9970" />
                <circle cx="280" cy="80" r="14" fill="#3D9970" fillOpacity="0.2" />
                <text x="270" y="65" fill="#4A3728" fontSize="10" fontWeight="bold" fontFamily="Plus Jakarta Sans">Dhanbad</text>

                {/* Deoghar */}
                <circle cx="310" cy="140" r="6" fill="#F57C00" />
                <text x="315" y="145" fill="#4A3728" fontSize="10" fontWeight="bold" fontFamily="Plus Jakarta Sans">Deoghar</text>

                {/* Jamshedpur */}
                <circle cx="280" cy="260" r="8" fill="#3D9970" />
                <circle cx="280" cy="260" r="16" fill="#3D9970" fillOpacity="0.2" />
                <text x="270" y="290" fill="#4A3728" fontSize="10" fontWeight="bold" fontFamily="Plus Jakarta Sans">Jamshedpur</text>

                {/* Gumla / Simdega */}
                <circle cx="100" cy="240" r="6" fill="#3D9970" />
                <text x="85" y="260" fill="#4A3728" fontSize="10" fontWeight="bold" fontFamily="Plus Jakarta Sans">Gumla</text>
              </svg>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#EDE6DE] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C1410]">Live AI Routing Mesh</span>
                <span className="font-mono text-[#D4600A] font-bold">24 Districts Linked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Pill Strip */}
        <div className="mt-12 bg-[#FDF9F4] border border-[#EDE6DE] rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-[#F57C00]" />
            </div>
            <div>
              <span className="block font-mono font-semibold text-[32px] leading-none text-[#D4600A]">32,600+</span>
              <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">Villages Mapped</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] border border-[#3D9970]/20 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-[#2E7D52]" />
            </div>
            <div>
              <span className="block font-mono font-semibold text-[32px] leading-none text-[#2E7D52]">12</span>
              <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">Partner Universities</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/20 flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6 text-[#D4600A]" />
            </div>
            <div>
              <span className="block font-mono font-semibold text-[32px] leading-none text-[#D4600A]">₹1,280 Cr</span>
              <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">CSR Investment Pool</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Signature Pipeline Strip */}
      <section className="bg-[#F0EBE3] rounded-[24px] p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
            End-to-End Delivery
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1C1410]">
            The SAMADHAN Innovation Lifecycle
          </h2>
          <p className="text-sm sm:text-[15px] text-[#7A6355]">
            From grassroots voice note to university lab prototype, CSR grant, and panchayat commissioning.
          </p>
        </div>

        {/* Horizontal Strip */}
        <div className="bg-[#FEF0E0] border border-[#EDE6DE] rounded-2xl p-6 shadow-sm overflow-x-auto">
          <div className="min-w-[760px] flex items-center justify-between relative">
            {pipelineSteps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div key={step.num} className="flex-1 flex flex-col items-center text-center relative px-2">
                  {/* Connecting Line */}
                  {idx < pipelineSteps.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-full h-0.5 border-t-2 border-dashed border-[#BFB0A3] -z-0" />
                  )}

                  {/* Step Circle */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                      isActive
                        ? 'bg-[#F57C00] text-white ring-4 ring-[#F57C00]/20'
                        : isCompleted
                        ? 'bg-[#3D9970] text-white'
                        : 'bg-[#EDE6DE] text-[#BFB0A3]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>

                  <span
                    className={`text-xs font-bold mt-2 ${
                      isActive ? 'text-[#D4600A]' : isCompleted ? 'text-[#1C1410]' : 'text-[#7A6355]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[11px] text-[#7A6355] mt-0.5 leading-tight max-w-[100px]">
                    {step.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 Problem Domains Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
            Societal Challenges
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1C1410]">
            10 Priority Domains for Jharkhand
          </h2>
          <p className="text-sm sm:text-[15px] text-[#7A6355]">
            Targeted civic domains mapped to district ground realities and university research departments.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {JHARKHAND_DOMAINS.map((domain) => {
            const badge = DOMAIN_BADGE_STYLES[domain.key] || { bg: 'bg-[#F0EBE3]', text: 'text-[#4A3728]', border: 'border-[#EDE6DE]' };
            const accentColor = DOMAIN_ACCENT_COLORS[domain.key] || '#D4600A';

            return (
              <div
                key={domain.key}
                className="bg-white border border-[#EDE6DE] hover:border-[#BFB0A3] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-150 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs"
                      style={{ backgroundColor: `${accentColor}15` }}
                    >
                      <span>{domain.icon}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badge.bg} ${badge.text}`}>
                      {domain.name.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#1C1410] group-hover:text-[#D4600A] transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-[#7A6355] font-medium mt-0.5">{domain.hindiName}</p>

                  <div className="mt-3 pt-2.5 border-t border-[#EDE6DE]">
                    <span className="text-[10px] font-mono text-[#D4600A] font-semibold block mb-0.5">
                      Ground Reality:
                    </span>
                    <p className="text-xs text-[#4A3728] leading-snug">
                      {domain.jharkhandStat}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works by Stakeholder Persona (3 Tabs) */}
      <section className="bg-white border border-[#EDE6DE] rounded-[24px] p-8 sm:p-10 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
            Stakeholder Portals
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1C1410]">
            How SAMADHAN Works
          </h2>

          {/* Pill Tabs */}
          <div className="inline-flex p-1 bg-[#F0EBE3] rounded-full border border-[#EDE6DE] mt-2">
            {(['citizen', 'university', 'industry'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 px-5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#F57C00] text-white shadow-sm'
                    : 'text-[#4A3728] hover:text-[#1C1410]'
                }`}
              >
                For {tab}s
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {activeTab === 'citizen' && (
            <>
              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/20 flex items-center justify-center font-mono font-bold text-base text-[#D4600A]">
                  1
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Voice or Text Submission</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Record 1-min voice note in Hindi, Santali, or Nagpuri.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Automatic GPS block and panchayat pinpointing.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Instant problem ID & SMS receipt acknowledgment.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('citizen_submit', 'CITIZEN')}
                  className="mt-2 text-xs font-bold text-[#D4600A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Submit issue now</span> →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] border border-[#3D9970]/20 flex items-center justify-center font-mono font-bold text-base text-[#2E7D52]">
                  2
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Live SMS Tracking</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Alerted when university department takes the challenge.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Notified when CSR partner approves hardware pledge.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Live dispatch tracking of on-ground installation.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('citizen_dashboard', 'CITIZEN')}
                  className="mt-2 text-xs font-bold text-[#2E7D52] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View grievance tracker</span> →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#1D4ED8]/20 flex items-center justify-center font-mono font-bold text-base text-[#1D4ED8]">
                  3
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Citizen Signoff & Rating</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Rate the field solution 1 to 5 stars upon completion.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Students receive academic credits only after signoff.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Permanent tamper-proof resolution certificate.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('citizen_dashboard', 'CITIZEN')}
                  className="mt-2 text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Check status</span> →
                </button>
              </div>
            </>
          )}

          {activeTab === 'university' && (
            <>
              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/20 flex items-center justify-center font-mono font-bold text-base text-[#D4600A]">
                  1
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Department Inbox</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Pre-clustered challenges tailored to departmental labs.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Real field telemetry and village contact points.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('university_inbox', 'UNIVERSITY')}
                  className="mt-2 text-xs font-bold text-[#D4600A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open capstone inbox</span> →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] border border-[#3D9970]/20 flex items-center justify-center font-mono font-bold text-base text-[#2E7D52]">
                  2
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Lab Prototype to Field</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Multi-student capstone teams with faculty mentorship.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Access CSR prototype fabrication grants.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('university_projects', 'UNIVERSITY')}
                  className="mt-2 text-xs font-bold text-[#2E7D52] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View active projects</span> →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#1D4ED8]/20 flex items-center justify-center font-mono font-bold text-base text-[#1D4ED8]">
                  3
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">UGC ABC Credits</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Verified social innovation credits in Academic Bank of Credits.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Download verifiable Impact Passport PDF credential.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('student_passport', 'UNIVERSITY')}
                  className="mt-2 text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Impact Passport</span> →
                </button>
              </div>
            </>
          )}

          {activeTab === 'industry' && (
            <>
              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF0E0] border border-[#F57C00]/20 flex items-center justify-center font-mono font-bold text-base text-[#D4600A]">
                  1
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Schedule VII Catalog</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Browse pre-vetted problems categorized by CSR eligibility.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('industry_marketplace', 'INDUSTRY')}
                  className="mt-2 text-xs font-bold text-[#D4600A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore marketplace</span> →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] border border-[#3D9970]/20 flex items-center justify-center font-mono font-bold text-base text-[#2E7D52]">
                  2
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Milestone Co-Funding</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Tranche disbursement tied to verified lab & field milestones.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('industry_bounties', 'INDUSTRY')}
                  className="mt-2 text-xs font-bold text-[#2E7D52] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Manage pledges</span> →
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#1D4ED8]/20 flex items-center justify-center font-mono font-bold text-base text-[#1D4ED8]">
                  3
                </div>
                <h3 className="font-display font-bold text-lg text-[#1C1410]">Statutory Tax Audit</h3>
                <div className="space-y-2 text-xs text-[#4A3728]">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#3D9970] shrink-0" />
                    <span>Export Section 135 tax-compliant impact documentation.</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('industry_bounties', 'INDUSTRY')}
                  className="mt-2 text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Download audit packs</span> →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-[#EDE6DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6355]">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-[#1C1410]">SAMADHAN</span>
          <span>• Smart India Hackathon (SIH) 2026</span>
          <span className="font-mono text-[#D4600A] font-semibold">PS ID: 26043</span>
        </div>
        <p className="text-center sm:text-right">
          Department of Higher & Technical Education, Government of Jharkhand
        </p>
      </footer>
    </div>
  );
};

