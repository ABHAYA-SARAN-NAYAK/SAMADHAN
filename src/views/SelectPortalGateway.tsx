import React from 'react';
import {
  User,
  ShieldAlert,
  Building2,
  Briefcase,
  ArrowRight,
  MapPin,
  Sparkles,
  Mic,
  Coins,
  CheckCircle2,
  Layers,
  GraduationCap,
  FileCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { UserRole } from '../types';

interface SelectPortalGatewayProps {
  onSelectRole: (role: UserRole, initialView?: string) => void;
}

export const SelectPortalGateway: React.FC<SelectPortalGatewayProps> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'CITIZEN' as UserRole,
      title: 'Citizen Portal',
      hindiTitle: 'नागरिक सेवा पोर्टल',
      desc: 'Report grassroots issues via voice or camera, track live progress by SMS, view community Google Map, and verify deployments.',
      icon: User,
      badge: 'Grassroots & Community',
      badgeColor: 'bg-amber-500/15 text-[#FF9A30] border-amber-500/30',
      accentColor: 'from-[#F57C00]/20 to-[#C1440E]/10',
      borderColor: 'hover:border-[#F57C00]',
      buttonBg: 'bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14]',
      initialView: 'citizen_submit',
      features: [
        { icon: Mic, text: 'Voice in Hindi, Santali or Nagpuri with AI transcription' },
        { icon: MapPin, text: 'Google Maps GPS pinpointing to village & block' },
        { icon: Activity, text: 'Real-time SMS milestone dispatch & tracker' },
        { icon: CheckCircle2, text: '5-Star citizen verification & credit release' }
      ]
    },
    {
      id: 'GOVT_ADMIN' as UserRole,
      title: 'Government Command Portal',
      hindiTitle: 'सरकारी कमांड सेंटर',
      desc: '24-District real-time Google Map telemetry, AI problem engine & scoring, university allocation, and DPE state audit reports.',
      icon: ShieldAlert,
      badge: 'State Administration',
      badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30',
      accentColor: 'from-red-500/20 to-amber-500/10',
      borderColor: 'hover:border-red-400',
      buttonBg: 'bg-red-500 hover:bg-red-400 text-white',
      initialView: 'govt_dashboard',
      features: [
        { icon: MapPin, text: '24-District Google Maps Geospatial Intelligence' },
        { icon: Sparkles, text: 'AI Problem Engine auto-triage & urgency scoring' },
        { icon: Building2, text: '1-Click institutional assignment to universities' },
        { icon: FileCheck, text: 'State Innovation & DPE compliance PDF audit' }
      ]
    },
    {
      id: 'UNIVERSITY' as UserRole,
      title: 'University & Research Hub',
      hindiTitle: 'विश्वविद्यालय एवं शोध पोर्टल',
      desc: 'AI-matched capstone problem inbox, lab R&D and field milestone updater, and UGC Academic Bank of Credits (ABC) ledger.',
      icon: Building2,
      badge: 'Faculty & Students',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      accentColor: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'hover:border-[#4CAF75]',
      buttonBg: 'bg-[#4CAF75] hover:bg-[#6DC98D] text-[#0A1A14]',
      initialView: 'university_inbox',
      features: [
        { icon: Sparkles, text: 'Department-matched civic problem inbox' },
        { icon: Layers, text: 'Capstone milestone tracker & deployment logger' },
        { icon: GraduationCap, text: 'Impact Passport & UGC ABC credit endorsement' },
        { icon: Coins, text: 'Access CSR co-funding for prototype fabrication' }
      ]
    },
    {
      id: 'INDUSTRY' as UserRole,
      title: 'Industry & CSR Marketplace',
      hindiTitle: 'उद्योग एवं सीएसआर मार्केटप्लेस',
      desc: 'Discover pre-validated Schedule VII CSR challenges, pledge milestone funding, co-build with top universities, and export tax audits.',
      icon: Briefcase,
      badge: 'Corporate CSR & PSUs',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      accentColor: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'hover:border-blue-400',
      buttonBg: 'bg-blue-500 hover:bg-blue-400 text-white',
      initialView: 'industry_marketplace',
      features: [
        { icon: Coins, text: 'Pre-validated Schedule VII CSR project marketplace' },
        { icon: Building2, text: 'Direct co-building with NIT JSR, BIT & IIT ISM' },
        { icon: TrendingUp, text: 'Milestone-linked transparent grant release' },
        { icon: FileCheck, text: 'Section 135 tax audit & statutory impact packs' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12 pb-24">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A3328] border border-[#4CAF75]/30 text-xs font-mono text-[#6DC98D] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#F57C00] animate-ping" />
          <span>JHARKHAND INNOVATION & ACTION ALLIANCE • SIH 2026</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F0EDE6] tracking-tight">
          Select Your Portal
        </h1>
        <p className="text-sm sm:text-base text-[#8FA89E] leading-relaxed">
          SAMADHAN provides isolated, role-specific environments for every stakeholder. Choose your role below to enter your dedicated dashboard and tools.
        </p>
      </div>

      {/* 4 Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map(r => {
          const Icon = r.icon;
          return (
            <div
              key={r.id}
              id={`select-role-${r.id.toLowerCase()}`}
              className={`relative bg-[#112318] border border-[#4CAF75]/25 ${r.borderColor} rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group overflow-hidden`}
            >
              {/* Subtle top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${r.accentColor}`} />

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#F0EDE6]" />
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-[#F0EDE6] group-hover:text-[#FF9A30] transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs font-mono text-[#6DC98D] mt-0.5">{r.hindiTitle}</p>
                <p className="text-xs text-[#8FA89E] leading-relaxed mt-2.5 mb-5">
                  {r.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-4 border-t border-[#4CAF75]/15 mb-6">
                  <span className="text-[10px] font-mono text-[#8FA89E] uppercase tracking-wider block font-semibold">
                    Portal Capabilities:
                  </span>
                  {r.features.map((f, i) => {
                    const FIcon = f.icon;
                    return (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
                        <FIcon className="w-3.5 h-3.5 text-[#4CAF75] shrink-0" />
                        <span>{f.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enter Button */}
              <button
                onClick={() => onSelectRole(r.id, r.initialView)}
                className={`w-full py-3 px-4 rounded-xl ${r.buttonBg} font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer group-hover:scale-[1.02]`}
              >
                <span>Enter {r.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* State Metric Footnote */}
      <div className="p-6 bg-[#0A1A14] border border-[#4CAF75]/20 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="block font-mono font-extrabold text-2xl text-[#F0EDE6]">24 / 24</span>
          <span className="text-xs text-[#8FA89E]">Districts Covered</span>
        </div>
        <div>
          <span className="block font-mono font-extrabold text-2xl text-[#4CAF75]">12</span>
          <span className="text-xs text-[#8FA89E]">Premier Universities</span>
        </div>
        <div>
          <span className="block font-mono font-extrabold text-2xl text-[#60A5FA]">32,600+</span>
          <span className="text-xs text-[#8FA89E]">Gram Panchayats</span>
        </div>
        <div>
          <span className="block font-mono font-extrabold text-2xl text-[#FF9A30]">₹1,280 Cr</span>
          <span className="text-xs text-[#8FA89E]">CSR Investment Pool</span>
        </div>
      </div>
    </div>
  );
};
