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
      badgeBg: 'bg-[#FEF0E0]',
      badgeText: 'text-[#D4600A]',
      accentBar: 'bg-[#F57C00]',
      buttonBg: 'bg-[#F57C00] hover:bg-[#D4600A] text-white',
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
      title: 'Government Command',
      hindiTitle: 'सरकारी कमांड सेंटर',
      desc: '24-District real-time Google Map telemetry, AI problem engine & scoring, university allocation, and DPE state audit reports.',
      icon: ShieldAlert,
      badge: 'State Administration',
      badgeBg: 'bg-[#FEF2F2]',
      badgeText: 'text-[#DC2626]',
      accentBar: 'bg-[#DC2626]',
      buttonBg: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
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
      title: 'University & Academia',
      hindiTitle: 'विश्वविद्यालय एवं शोध पोर्टल',
      desc: 'AI-matched capstone problem inbox, lab R&D and field milestone updater, and UGC Academic Bank of Credits (ABC) ledger.',
      icon: Building2,
      badge: 'Faculty & Students',
      badgeBg: 'bg-[#E8F5EE]',
      badgeText: 'text-[#2E7D52]',
      accentBar: 'bg-[#3D9970]',
      buttonBg: 'bg-[#3D9970] hover:bg-[#2E7D52] text-white',
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
      title: 'Industry & CSR Partner',
      hindiTitle: 'उद्योग एवं सीएसआर मार्केटप्लेस',
      desc: 'Discover pre-validated Schedule VII CSR challenges, pledge milestone funding, co-build with top universities, and export tax audits.',
      icon: Briefcase,
      badge: 'Corporate CSR & PSUs',
      badgeBg: 'bg-[#EFF6FF]',
      badgeText: 'text-[#1D4ED8]',
      accentBar: 'bg-[#1D4ED8]',
      buttonBg: 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white',
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
    <div className="max-w-[1280px] mx-auto py-10 px-4 space-y-12 pb-24">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF0E0] border border-[#F57C00]/30 text-xs font-bold text-[#D4600A] shadow-sm uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#F57C00] animate-pulse" />
          <span>JHARKHAND INNOVATION & ACTION ALLIANCE • SIH 2026</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#1C1410] tracking-tight">
          Select Your Portal
        </h1>
        <p className="text-base sm:text-lg text-[#7A6355] leading-relaxed">
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
              className="relative bg-white border border-[#EDE6DE] hover:border-[#BFB0A3] rounded-[24px] p-7 shadow-[0_1px_3px_rgba(28,20,16,0.06),0_4px_12px_rgba(28,20,16,0.04)] hover:shadow-[0_4px_16px_rgba(28,20,16,0.10),0_8px_32px_rgba(28,20,16,0.06)] transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group overflow-hidden"
            >
              {/* Left Accent Bar */}
              <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${r.accentBar}`} />

              <div className="pl-2">
                {/* Header Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${r.badgeBg} ${r.badgeText}`}>
                    {r.badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#1C1410]" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#1C1410] group-hover:text-[#D4600A] transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs font-semibold text-[#7A6355] mt-0.5">{r.hindiTitle}</p>
                <p className="text-sm text-[#4A3728] leading-relaxed mt-2.5 mb-5">
                  {r.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-[#EDE6DE] mb-6">
                  <span className="text-[11px] font-bold text-[#7A6355] uppercase tracking-wider block">
                    Portal Capabilities:
                  </span>
                  {r.features.map((f, i) => {
                    const FIcon = f.icon;
                    return (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#4A3728]">
                        <FIcon className="w-4 h-4 text-[#3D9970] shrink-0" />
                        <span className="font-medium">{f.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enter Button */}
              <div className="pl-2">
                <button
                  onClick={() => onSelectRole(r.id, r.initialView)}
                  className={`w-full py-3 px-6 rounded-full ${r.buttonBg} font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:-translate-y-0.5`}
                >
                  <span>Enter {r.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* State Metric Footnote */}
      <div className="p-6 bg-white border border-[#EDE6DE] rounded-[24px] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center shadow-sm">
        <div>
          <span className="block font-mono font-semibold text-3xl text-[#1C1410]">24 / 24</span>
          <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">Districts Covered</span>
        </div>
        <div>
          <span className="block font-mono font-semibold text-3xl text-[#2E7D52]">12</span>
          <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">Premier Universities</span>
        </div>
        <div>
          <span className="block font-mono font-semibold text-3xl text-[#1D4ED8]">32,600+</span>
          <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">Gram Panchayats</span>
        </div>
        <div>
          <span className="block font-mono font-semibold text-3xl text-[#D4600A]">₹1,280 Cr</span>
          <span className="text-xs font-bold text-[#7A6355] uppercase tracking-wider mt-1 block">CSR Investment Pool</span>
        </div>
      </div>
    </div>
  );
};

