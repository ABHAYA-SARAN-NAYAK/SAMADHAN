import React, { useState } from 'react';
import { UserRole, AppNotification } from '../types';
import {
  Bell,
  Sparkles,
  Building2,
  Briefcase,
  ShieldAlert,
  User,
  MessageSquare,
  Radio,
  Layers,
  ArrowLeftRight,
  Compass,
  FileCheck,
  GraduationCap,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeView: string;
  onSelectView: (view: string) => void;
  notifications: AppNotification[];
  onOpenSmsLog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  activeView,
  onSelectView,
  notifications,
  onOpenSmsLog
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleMeta: Record<UserRole, { label: string; icon: any; color: string; desc: string; badgeBg: string; badgeText: string }> = {
    CITIZEN: {
      label: 'Citizen Portal',
      icon: User,
      color: 'text-[#D4600A]',
      desc: 'Report & track local issues',
      badgeBg: 'bg-[#FEF0E0]',
      badgeText: 'text-[#D4600A]'
    },
    GOVT_ADMIN: {
      label: 'Govt Command',
      icon: ShieldAlert,
      color: 'text-[#DC2626]',
      desc: '24-District Google Map & AI engine',
      badgeBg: 'bg-[#FEF2F2]',
      badgeText: 'text-[#DC2626]'
    },
    UNIVERSITY: {
      label: 'University Portal',
      icon: Building2,
      color: 'text-[#2E7D52]',
      desc: 'Faculty & student capstones',
      badgeBg: 'bg-[#E8F5EE]',
      badgeText: 'text-[#2E7D52]'
    },
    INDUSTRY: {
      label: 'Industry & CSR',
      icon: Briefcase,
      color: 'text-[#1D4ED8]',
      desc: 'Schedule VII CSR co-funding',
      badgeBg: 'bg-[#EFF6FF]',
      badgeText: 'text-[#1D4ED8]'
    }
  };

  const getNavLinks = () => {
    switch (currentRole) {
      case 'CITIZEN':
        return [
          { id: 'citizen_submit', label: 'Report a Problem', icon: MessageSquare, primary: true },
          { id: 'citizen_dashboard', label: 'My Grievances & Map', icon: Compass }
        ];
      case 'GOVT_ADMIN':
        return [
          { id: 'govt_dashboard', label: 'State Heatmap & Command', icon: Compass },
          { id: 'admin_problems', label: 'AI Triage & Routing', icon: Sparkles },
          { id: 'admin_clusters', label: 'Deduplication Clusters', icon: Layers }
        ];
      case 'UNIVERSITY':
        return [
          { id: 'university_inbox', label: 'Problem Inbox', icon: Building2 },
          { id: 'university_projects', label: 'Active Projects', icon: Layers },
          { id: 'student_passport', label: 'Impact Passport', icon: GraduationCap }
        ];
      case 'INDUSTRY':
        return [
          { id: 'industry_marketplace', label: 'CSR Marketplace', icon: Briefcase },
          { id: 'industry_bounties', label: 'My Pledges & Impact', icon: FileCheck },
          { id: 'govt_dashboard', label: 'State Analytics', icon: Compass }
        ];
      default:
        return [];
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EDE6DE] px-4 lg:px-8 h-[68px] flex items-center transition-all">
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <div
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          onClick={() => onSelectView('select_portal')}
          title="Return to Portal Selector"
        >
          <div className="w-10 h-10 rounded-full bg-[#FEF0E0] border border-[#F57C00]/30 flex items-center justify-center shadow-sm">
            <span className="font-display font-bold text-xl text-[#D4600A]">सं</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-[28px] tracking-tight text-[#D4600A] leading-none">
                SAMADHAN
              </span>
              <span className="text-[10px] font-mono font-semibold bg-[#FEF0E0] text-[#D4600A] px-1.5 py-0.5 rounded border border-[#F57C00]/30">
                JHARKHAND
              </span>
            </div>
            <p className="text-[11px] text-[#7A6355] font-medium leading-tight mt-0.5">
              समाधान • Societal Innovation Network
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Links Scoped to Current Role */}
        <nav className="hidden md:flex items-center gap-1.5">
          {getNavLinks().map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => onSelectView(link.id)}
                className={`px-3.5 py-2 rounded-full text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#FEF0E0] text-[#D4600A] border-b-2 border-[#F57C00]'
                    : link.primary
                    ? 'bg-[#F57C00] text-white hover:bg-[#D4600A] shadow-sm'
                    : 'text-[#4A3728] hover:text-[#D4600A] hover:bg-[#F7F4EF]'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Switch Portal Button (Gateway Button) */}
          <button
            id="btn-switch-portal"
            onClick={() => onSelectView('select_portal')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F4EF] hover:bg-[#F0EBE3] border border-[#EDE6DE] text-[13px] font-semibold text-[#4A3728] transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
            title="Switch stakeholder portal"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#F57C00]" />
            <span className="hidden sm:inline">Select Portal</span>
          </button>

          {/* SMS logs launcher */}
          <button
            id="btn-sms-logs"
            onClick={onOpenSmsLog}
            className="flex items-center gap-1.5 text-[13px] text-[#7A6355] hover:text-[#1C1410] bg-[#FDF9F4] hover:bg-[#F0EBE3] border border-[#EDE6DE] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            title="View Live Citizen SMS Dispatch Logs"
          >
            <Radio className="w-3.5 h-3.5 text-[#3D9970]" />
            <span className="hidden lg:inline">SMS Logs</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="btn-notifications"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-full bg-[#FDF9F4] hover:bg-[#F0EBE3] text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#EDE6DE] rounded-2xl shadow-xl p-4 z-50 animate-fade-up">
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DE]">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#F57C00]" />
                    <h4 className="font-display font-bold text-base text-[#1C1410]">Live Activity Feed</h4>
                  </div>
                  <span className="text-[11px] font-mono bg-[#E8F5EE] text-[#2E7D52] px-2 py-0.5 rounded-full font-semibold">
                    {notifications.length} alerts
                  </span>
                </div>
                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-xl bg-[#FDF9F4] border border-[#EDE6DE] hover:border-[#BFB0A3] transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#1C1410]">{n.title}</span>
                        <span className="text-[10px] text-[#7A6355] whitespace-nowrap font-mono">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[#4A3728] mt-1 text-[12px] leading-relaxed">{n.body}</p>
                      {n.meta?.problemId && (
                        <span className="inline-block mt-1.5 font-mono text-[11px] text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded border border-[#F57C00]/20 font-medium">
                          {n.meta.problemId}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-[#EDE6DE] flex items-center justify-between">
                  <button
                    onClick={() => {
                      onOpenSmsLog();
                      setShowNotifMenu(false);
                    }}
                    className="text-xs text-[#2E7D52] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Radio className="w-3 h-3" /> View SMS Simulator
                  </button>
                  <button
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-[#7A6355] hover:text-[#1C1410]"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Current Active Persona Pill & Switcher */}
          <div className="relative">
            <button
              id="btn-role-switcher"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FDF9F4] border border-[#EDE6DE] text-xs font-semibold text-[#1C1410] shadow-sm transition-all cursor-pointer"
            >
              {React.createElement(roleMeta[currentRole].icon, {
                className: `w-3.5 h-3.5 ${roleMeta[currentRole].color}`
              })}
              <span className="hidden sm:inline font-bold">{roleMeta[currentRole].label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A6355]" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#EDE6DE] rounded-2xl shadow-xl p-2 z-50 animate-fade-up">
                <div className="px-3 py-2 border-b border-[#EDE6DE] flex items-center justify-between">
                  <p className="text-[11px] font-mono text-[#7A6355] uppercase tracking-wider font-semibold">Switch Portal</p>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onSelectView('select_portal');
                    }}
                    className="text-[10px] text-[#D4600A] hover:underline font-bold"
                  >
                    Gateway →
                  </button>
                </div>
                <div className="mt-1 space-y-1">
                  {(Object.keys(roleMeta) as UserRole[]).map((role) => {
                    const info = roleMeta[role];
                    const isSelected = currentRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => {
                          onSelectRole(role);
                          setShowRoleMenu(false);
                          if (role === 'CITIZEN') onSelectView('citizen_submit');
                          if (role === 'UNIVERSITY') onSelectView('university_inbox');
                          if (role === 'INDUSTRY') onSelectView('industry_marketplace');
                          if (role === 'GOVT_ADMIN') onSelectView('govt_dashboard');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 text-xs transition-colors cursor-pointer ${
                          isSelected ? `${info.badgeBg} border border-[#EDE6DE] text-[#1C1410]` : 'hover:bg-[#F7F4EF] text-[#7A6355]'
                        }`}
                      >
                        {React.createElement(info.icon, { className: `w-4 h-4 mt-0.5 ${info.color}` })}
                        <div>
                          <p className="font-bold text-[#1C1410]">{info.label}</p>
                          <p className="text-[11px] text-[#7A6355]">{info.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


