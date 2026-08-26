import React from 'react';
import {
  Mic,
  BrainCircuit,
  Building2,
  Coins,
  MapPin,
  Award,
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';
import { UserRole } from '../types';

interface DemoFlowBarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeView: string;
  onSelectView: (view: string) => void;
  onFastForward: () => void;
  onReset: () => void;
}

export const DemoFlowBar: React.FC<DemoFlowBarProps> = ({
  currentRole,
  onSelectRole,
  activeView,
  onSelectView,
  onFastForward,
  onReset
}) => {
  const steps = [
    {
      id: 'step-1',
      number: '1',
      title: 'Citizen Submit',
      sub: 'Garhwa Water',
      icon: Mic,
      role: 'CITIZEN' as UserRole,
      view: 'citizen_submit'
    },
    {
      id: 'step-2',
      number: '2',
      title: 'AI Deduplication',
      sub: '47 Reports Cluster',
      icon: BrainCircuit,
      role: 'GOVT_ADMIN' as UserRole,
      view: 'admin_clusters'
    },
    {
      id: 'step-3',
      number: '3',
      title: 'University Match',
      sub: 'NIT Jamshedpur',
      icon: Building2,
      role: 'UNIVERSITY' as UserRole,
      view: 'university_inbox'
    },
    {
      id: 'step-4',
      number: '4',
      title: 'CSR Co-Funding',
      sub: 'Tata Steel ₹7.5L',
      icon: Coins,
      role: 'INDUSTRY' as UserRole,
      view: 'industry_marketplace'
    },
    {
      id: 'step-5',
      number: '5',
      title: 'Govt Heatmap',
      sub: '24-District Command',
      icon: MapPin,
      role: 'GOVT_ADMIN' as UserRole,
      view: 'govt_dashboard'
    },
    {
      id: 'step-6',
      number: '6',
      title: 'Impact Passport',
      sub: '+4 ABC Credits',
      icon: Award,
      role: 'UNIVERSITY' as UserRole,
      view: 'student_passport'
    },
    {
      id: 'step-7',
      number: '7',
      title: '90-Day Deploy & Rate',
      sub: 'Citizen 5★ Review',
      icon: Star,
      role: 'CITIZEN' as UserRole,
      view: 'citizen_dashboard'
    }
  ];

  return (
    <aside aria-label="Demo walkthrough" className="w-full bg-[#0D1F17] border-b border-[#4CAF75]/25 py-2.5 px-4 overflow-x-auto shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-w-[920px]">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-mono font-bold bg-[#F57C00]/20 text-[#FF9A30] px-2.5 py-1 rounded-full border border-[#F57C00]/40 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#FF9A30]" /> SIH Demo Loop
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-1 justify-center">
          {steps.map((s, idx) => {
            const isCurrent = activeView === s.view;
            return (
              <React.Fragment key={s.id}>
                <button
                  id={`demo-step-${idx + 1}`}
                  onClick={() => {
                    onSelectRole(s.role);
                    onSelectView(s.view);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs transition-all border ${
                    isCurrent
                      ? 'bg-[#1A3328] text-[#F0EDE6] border-[#4CAF75] shadow-md shadow-[#4CAF75]/15 ring-1 ring-[#4CAF75]'
                      : 'bg-[#112318]/70 text-[#8FA89E] border-[#4CAF75]/15 hover:border-[#4CAF75]/40 hover:text-[#F0EDE6]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isCurrent ? 'bg-[#F57C00] text-[#0A1A14]' : 'bg-[#1A3328] text-[#8FA89E]'
                    }`}
                  >
                    {s.number}
                  </span>
                  <div className="text-left leading-tight">
                    <span className="block font-semibold text-[11px]">{s.title}</span>
                    <span className="block text-[9px] text-[#8FA89E]">{s.sub}</span>
                  </div>
                </button>
                {idx < steps.length - 1 && <ChevronRight className="w-3 h-3 text-[#556B62] shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onFastForward}
            title="Instantly simulates 90-day progress, deployments, and 5-star rating"
            className="flex items-center gap-1 text-[11px] font-semibold bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] px-2.5 py-1 rounded-md transition-all shadow-sm"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Fast-Forward</span>
          </button>
          <button
            onClick={onReset}
            title="Reset to default prototype state"
            className="p-1 text-[#8FA89E] hover:text-[#F0EDE6] hover:bg-[#1A3328] rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
