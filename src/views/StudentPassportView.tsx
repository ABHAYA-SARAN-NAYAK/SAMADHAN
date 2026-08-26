import React from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  Share2,
  Building2,
  MapPin,
  Star,
  Sparkles,
  ShieldCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { StudentProfile } from '../types';

export const StudentPassportView: React.FC = () => {
  const studentData: StudentProfile = {
    id: 'stud-101',
    name: 'Priya Sharma',
    rollNumber: '2023UGCE042',
    university: 'NIT Jamshedpur',
    department: 'Civil & Environmental Engineering',
    abcAccountId: 'ABC-JH-2026-88412',
    totalCreditsEarned: 7,
    verifiedProjects: [
      {
        projectId: 'PROJ-JH-2026-001',
        projectTitle: 'Modular Zeolite & Activated Alumina Fluoride Filtration Unit',
        domain: 'water_resources',
        role: 'Hardware & Adsorption Lead',
        location: 'Bhoura Village, Meral Block, Garhwa District',
        beneficiariesCount: 18400,
        creditsAwarded: 4,
        facultyEndorser: 'Dr. Sanjay Kumar (Professor, Civil & Env)',
        citizenRating: 5.0,
        completionDate: '2026-02-18',
        verificationHash: '0x8f4c2e...b91a'
      },
      {
        projectId: 'PROJ-JH-2025-084',
        projectTitle: 'Solar Powered Biomass Pelletizer for Rice Husk Waste',
        domain: 'energy',
        role: 'Thermal Modeling & Field Assembly',
        location: 'Kusunda Panchayat, Dhanbad',
        beneficiariesCount: 4200,
        creditsAwarded: 3,
        facultyEndorser: 'Dr. R. K. Soren (HOD, Renewable Energy)',
        citizenRating: 4.8,
        completionDate: '2025-11-24',
        verificationHash: '0x3a9d1b...e72c'
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4CAF75]/15">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4CAF75]/15 border border-[#4CAF75]/30 text-xs font-mono text-[#6DC98D] mb-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            UGC ACADEMIC BANK OF CREDITS (ABC) INTEGRATED
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#F0EDE6]">
            Student Social Innovation Passport
          </h2>
          <p className="text-xs text-[#8FA89E]">
            Tamper-evident verifiable credentials for grassroots societal engineering projects.
          </p>
        </div>

        <button
          onClick={() => alert('Downloading official Academic Bank of Credits Digital Certificate (PDF)...')}
          className="px-4 py-2 rounded-xl bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download ABC Credential PDF</span>
        </button>
      </div>

      {/* Student Passport ID Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A3328] via-[#112318] to-[#0A1A14] border-2 border-[#4CAF75]/40 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Background Emblem */}
        <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
          <Award className="w-64 h-64 text-[#4CAF75]" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F57C00] to-[#C1440E] p-0.5 flex items-center justify-center shadow-xl">
              <div className="w-full h-full bg-[#0A1A14] rounded-[14px] flex items-center justify-center text-xl font-bold font-display text-[#FF9A30]">
                PS
              </div>
            </div>
            <div>
              <h3 className="font-display font-extrabold text-2xl text-[#F0EDE6]">
                {studentData.name}
              </h3>
              <p className="text-xs text-[#8FA89E]">
                {studentData.university} • {studentData.department}
              </p>
              <span className="inline-block mt-1 font-mono text-[11px] text-[#6DC98D] bg-[#4CAF75]/15 px-2 py-0.5 rounded">
                Roll: {studentData.rollNumber}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/25 text-right sm:text-right w-full sm:w-auto">
            <span className="text-[10px] font-mono text-[#8FA89E] uppercase block">
              Academic Bank of Credits
            </span>
            <span className="font-mono font-extrabold text-2xl text-[#FF9A30] block">
              +{studentData.totalCreditsEarned} ABC Credits
            </span>
            <span className="text-[10px] font-mono text-[#4CAF75] block mt-0.5">
              ID: {studentData.abcAccountId}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#4CAF75]/20 text-xs">
          <div>
            <span className="text-[#8FA89E] text-[10px] uppercase font-mono block">Field Deployments</span>
            <span className="font-mono font-bold text-base text-[#F0EDE6]">2 Panchayats</span>
          </div>
          <div>
            <span className="text-[#8FA89E] text-[10px] uppercase font-mono block">Citizens Impacted</span>
            <span className="font-mono font-bold text-base text-[#4CAF75]">22,600+</span>
          </div>
          <div>
            <span className="text-[#8FA89E] text-[10px] uppercase font-mono block">Average Rating</span>
            <span className="font-mono font-bold text-base text-[#FF9A30]">4.9 / 5.0 ★</span>
          </div>
          <div>
            <span className="text-[#8FA89E] text-[10px] uppercase font-mono block">Verification Status</span>
            <span className="font-mono font-bold text-xs text-[#6DC98D] flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF75]" /> Dean Endorsed
            </span>
          </div>
        </div>
      </div>

      {/* Verified Capstone Credentials */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-[#F0EDE6] flex items-center gap-2">
          <Award className="w-4 h-4 text-[#F57C00]" />
          <span>Stamped Project Endorsements</span>
        </h3>

        <div className="space-y-4">
          {studentData.verifiedProjects.map(proj => (
            <div
              key={proj.projectId}
              className="p-6 rounded-3xl bg-[#112318] border border-[#4CAF75]/30 hover:border-[#4CAF75] transition-all space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#FF9A30] bg-[#F57C00]/15 px-2 py-0.5 rounded">
                      {proj.projectId}
                    </span>
                    <span className="text-xs font-mono text-[#6DC98D] bg-[#4CAF75]/15 px-2 py-0.5 rounded capitalize">
                      {proj.domain.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-[#F0EDE6] leading-snug">
                    {proj.projectTitle}
                  </h4>
                  <p className="text-xs text-[#8FA89E] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                    {proj.location}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-[#4CAF75]/20 text-[#6DC98D] font-mono font-bold text-xs rounded-full border border-[#4CAF75]/40">
                    +{proj.creditsAwarded} ABC Credits
                  </span>
                  <div className="flex items-center justify-end gap-1 text-xs text-[#FF9A30] mt-1 font-mono">
                    <Star className="w-3.5 h-3.5 fill-[#FF9A30]" />
                    <span>{proj.citizenRating} Citizen Rating</span>
                  </div>
                </div>
              </div>

              {/* Endorsement Details */}
              <div className="p-3.5 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8FA89E] text-[10px] uppercase font-mono block">Student Project Role:</span>
                  <span className="font-semibold text-[#F0EDE6]">{proj.role}</span>
                </div>
                <div>
                  <span className="text-[#8FA89E] text-[10px] uppercase font-mono block">Faculty Mentor Endorsement:</span>
                  <span className="font-medium text-[#9EDDB4] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#4CAF75]" /> {proj.facultyEndorser}
                  </span>
                </div>
              </div>

              {/* Hash Footer */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8FA89E] pt-2 border-t border-[#4CAF75]/15">
                <span>Completed: {proj.completionDate}</span>
                <span className="text-[#6DC98D]">Ledger Proof: {proj.verificationHash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
