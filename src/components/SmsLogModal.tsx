import React from 'react';
import { Radio, X, CheckCheck, Smartphone, Sparkles } from 'lucide-react';
import { AppNotification } from '../types';

interface SmsLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
}

export const SmsLogModal: React.FC<SmsLogModalProps> = ({
  isOpen,
  onClose,
  notifications
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#112318] border border-[#4CAF75]/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4CAF75]/20 border border-[#4CAF75]/40 flex items-center justify-center text-[#4CAF75]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#F0EDE6]">
                Govt SMS Gateway Dispatch Logs
              </h3>
              <p className="text-[11px] text-[#8FA89E]">
                Simulated Twilio / NIC SMS alerts to rural citizens across Jharkhand
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8FA89E] hover:text-[#F0EDE6] hover:bg-[#1A3328]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SMS Phone Screen Simulation */}
        <div className="bg-[#0A1A14] border border-[#4CAF75]/30 rounded-2xl p-4 max-h-[420px] overflow-y-auto space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              className="p-3 bg-[#112318] rounded-xl border border-[#4CAF75]/20 space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8FA89E]">
                <span className="flex items-center gap-1 text-[#6DC98D]">
                  <Smartphone className="w-3 h-3" />
                  To: {n.meta?.recipientPhone || '+91 94311 88204'}
                </span>
                <span className="flex items-center gap-1 text-[#4CAF75]">
                  <CheckCheck className="w-3.5 h-3.5" /> Delivered
                </span>
              </div>

              <p className="text-[#F0EDE6] font-medium leading-relaxed">
                {n.body}
              </p>

              <div className="flex items-center justify-between text-[10px] text-[#556B62] pt-1">
                <span>Sender: JH-SAMADHAN-GOV</span>
                <span>{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4CAF75] hover:bg-[#6DC98D] text-[#0A1A14] font-semibold text-xs transition-colors"
          >
            Close Logs
          </button>
        </div>
      </div>
    </div>
  );
};
