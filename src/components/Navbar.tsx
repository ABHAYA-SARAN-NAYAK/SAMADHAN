import React, { useState } from 'react';
import { UserRole, AppNotification } from '../types';
import {
  Bell,
  Sparkles,
  MapPin,
  Building2,
  Briefcase,
  ShieldAlert,
  User,
  CheckCircle2,
  MessageSquare,
  Radio,
  Layers,
  ArrowLeftRight,
  Compass,
  FileCheck,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeView: string;
  onSelectView: (view: string) => void;
  notifications: AppNotification[];
  onOpenSmsLog: () => void;
  onTriggerFastForward?: () => void;
  onResetDemo?: () => void;
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

  const roleMeta: Record<UserRole, { label: string; icon: any; color: string; desc: string; badge: string }> = {
    CITIZEN: {
      label: 'Citizen Portal',
      icon: User,
      color: 'text-amber-400',
      desc: 'Report & track local issues',
      badge: 'bg-amber-500/15 text-[#FF9A30] border-amber-500/30'
    },
    GOVT_ADMIN: {
      label: 'Govt Command',
      icon: ShieldAlert,
      color: 'text-red-400',
      desc: '24-District Google Map & AI engine',
      badge: 'bg-red-500/15 text-red-400 border-red-500/30'
    },
    UNIVERSITY: {
      label: 'University Portal',
      icon: Building2,
      color: 'text-emerald-400',
      desc: 'Faculty & student capstones',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    INDUSTRY: {
      label: 'Industry & CSR',
      icon: Briefcase,
      color: 'text-blue-400',
      desc: 'Schedule VII CSR co-funding',
      badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    }
  };

  const getNavLinks = () => {
    switch (currentRole) {
      case 'CITIZEN':
        return [
          { id: 'citizen_submit', label: 'Report Issue', icon: MessageSquare, primary: true },
          { id: 'citizen_dashboard', label: 'My Grievances & Google Map', icon: Compass }
        ];
      case 'GOVT_ADMIN':
        return [
          { id: 'govt_dashboard', label: '24-District Google Map & Command', icon: Compass },
          { id: 'admin_problems', label: 'AI Triage & Routing', icon: Sparkles },
          { id: 'admin_clusters', label: 'Deduplication Clusters', icon: Layers }
        ];
      case 'UNIVERSITY':
        return [
          { id: 'university_inbox', label: 'Capstone Inbox', icon: Building2 },
          { id: 'university_projects', label: 'Active Projects', icon: Layers },
          { id: 'student_passport', label: 'Impact Passport & Credits', icon: GraduationCap }
        ];
      case 'INDUSTRY':
        return [
          { id: 'industry_marketplace', label: 'CSR Marketplace', icon: Briefcase },
          { id: 'industry_bounties', label: 'My Pledges & Impact', icon: FileCheck },
          { id: 'govt_dashboard', label: 'State Heatmap Analytics', icon: Compass }
        ];
      default:
        return [];
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#112318]/95 backdrop-blur-md border-b border-[#4CAF75]/20 px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Wordmark */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          onClick={() => onSelectView('select_portal')}
          title="Return to Portal Selector"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F57C00] to-[#C1440E] p-0.5 shadow-lg shadow-[#F57C00]/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0A1A14] rounded-[9px] flex items-center justify-center">
              <span className="font-display font-extrabold text-lg text-[#FF9A30]">सं</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-[#F0EDE6] group-hover:text-[#FF9A30] transition-colors">
                SAMADHAN
              </span>
              <span className="text-[9px] font-mono font-bold bg-[#F57C00]/15 text-[#FF9A30] px-1.5 py-0.5 rounded border border-[#F57C00]/30">
                JHARKHAND
              </span>
            </div>
            <p className="text-[10px] text-[#8FA89E] font-medium leading-none">
              Societal Innovation Network
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Links Scoped to Current Role */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0A1A14]/80 p-1 rounded-full border border-[#4CAF75]/20">
          {getNavLinks().map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => onSelectView(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#F57C00] text-[#0A1A14] shadow-md shadow-[#F57C00]/20'
                    : link.primary
                    ? 'bg-[#4CAF75]/15 text-[#6DC98D] hover:bg-[#4CAF75]/25 border border-[#4CAF75]/30'
                    : 'text-[#8FA89E] hover:text-[#F0EDE6] hover:bg-[#1A3328]/60'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Switch Portal Button (Gateway Button) */}
          <button
            id="btn-switch-portal"
            onClick={() => onSelectView('select_portal')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A3328] hover:bg-[#1A3328]/90 border border-[#4CAF75]/30 text-xs font-semibold text-[#9EDDB4] transition-all cursor-pointer shadow-sm hover:scale-102"
            title="Switch stakeholder portal"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#F57C00]" />
            <span className="hidden sm:inline">Select Portal</span>
          </button>

          {/* SMS logs launcher */}
          <button
            id="btn-sms-logs"
            onClick={onOpenSmsLog}
            className="flex items-center gap-1.5 text-xs text-[#8FA89E] hover:text-[#F0EDE6] bg-[#1A3328] hover:bg-[#1A3328]/90 border border-[#4CAF75]/20 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            title="View Live Citizen SMS Dispatch Logs"
          >
            <Radio className="w-3.5 h-3.5 text-[#4CAF75]" />
            <span className="hidden lg:inline">SMS Logs</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="btn-notifications"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl bg-[#1A3328] hover:bg-[#1A3328]/80 text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-urgent-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#112318] border border-[#4CAF75]/30 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-[#4CAF75]/15">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#F57C00]" />
                    <h4 className="font-display font-bold text-sm text-[#F0EDE6]">Live Activity Feed</h4>
                  </div>
                  <span className="text-[11px] font-mono bg-[#4CAF75]/15 text-[#6DC98D] px-2 py-0.5 rounded-full">
                    {notifications.length} alerts
                  </span>
                </div>
                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-[#1A3328]/60 border border-[#4CAF75]/10 hover:border-[#4CAF75]/30 transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#F0EDE6]">{n.title}</span>
                        <span className="text-[10px] text-[#556B62] whitespace-nowrap">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[#8FA89E] mt-1 text-[11px] leading-relaxed">{n.body}</p>
                      {n.meta?.problemId && (
                        <span className="inline-block mt-1 font-mono text-[10px] text-[#FF9A30] bg-[#F57C00]/10 px-1.5 py-0.5 rounded">
                          {n.meta.problemId}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-[#4CAF75]/15 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onOpenSmsLog();
                      setShowNotifMenu(false);
                    }}
                    className="text-xs text-[#4CAF75] hover:underline flex items-center gap-1"
                  >
                    <Radio className="w-3 h-3" /> View SMS Simulator
                  </button>
                  <button
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-[#8FA89E] hover:text-[#F0EDE6]"
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1A3328] hover:bg-[#1A3328]/80 border border-[#4CAF75]/30 text-xs font-semibold text-[#F0EDE6] transition-all cursor-pointer"
            >
              {React.createElement(roleMeta[currentRole].icon, {
                className: `w-3.5 h-3.5 ${roleMeta[currentRole].color}`
              })}
              <span className="hidden sm:inline">{roleMeta[currentRole].label}</span>
              <span className="text-[10px] text-[#8FA89E]">▾</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#112318] border border-[#4CAF75]/30 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-[#4CAF75]/15 flex items-center justify-between">
                  <p className="text-[11px] font-mono text-[#8FA89E] uppercase tracking-wider">Switch Portal</p>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onSelectView('select_portal');
                    }}
                    className="text-[10px] text-[#F57C00] hover:underline font-mono"
                  >
                    Portal Gateway →
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
                          isSelected ? 'bg-[#4CAF75]/20 border border-[#4CAF75]/40 text-[#F0EDE6]' : 'hover:bg-[#1A3328] text-[#8FA89E]'
                        }`}
                      >
                        {React.createElement(info.icon, { className: `w-4 h-4 mt-0.5 ${info.color}` })}
                        <div>
                          <p className="font-semibold text-[#F0EDE6]">{info.label}</p>
                          <p className="text-[10px] text-[#8FA89E]">{info.desc}</p>
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

