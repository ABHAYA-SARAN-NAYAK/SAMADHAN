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
    <div className="max-w-4xl mx-auto space-y-6 pb-20 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE6DE]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] border border-[#3D9970]/30 text-xs font-bold text-[#2E7D52] mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F57C00]" />
            UGC ACADEMIC BANK OF CREDITS (ABC) INTEGRATED
          </div>
          <h2 className="font-display font-bold text-3xl text-[#1C1410]">
            Student Social Innovation Passport
          </h2>
          <p className="text-sm text-[#7A6355] mt-0.5">
            Tamper-evident verifiable credentials for grassroots societal engineering projects.
          </p>
        </div>

        <button
          onClick={() => alert('Downloading official Academic Bank of Credits Digital Certificate (PDF)...')}
          className="px-4 py-2 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download ABC Credential PDF</span>
        </button>
      </div>

      {/* Student Passport ID Card */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#EDE6DE] shadow-sm space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FEF0E0] border border-[#F57C00]/30 flex items-center justify-center text-xl font-bold font-display text-[#D4600A]">
              PS
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-[#1C1410]">
                {studentData.name}
              </h3>
              <p className="text-xs text-[#7A6355]">
                {studentData.university} • {studentData.department}
              </p>
              <span className="inline-block mt-1 font-mono text-xs font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                Roll: {studentData.rollNumber}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE] text-left sm:text-right w-full sm:w-auto">
            <span className="text-xs text-[#7A6355] uppercase block">
              Academic Bank of Credits
            </span>
            <span className="font-mono font-bold text-2xl text-[#D4600A] block">
              +{studentData.totalCreditsEarned} ABC Credits
            </span>
            <span className="text-xs font-mono text-[#2E7D52] font-semibold block mt-0.5">
              ID: {studentData.abcAccountId}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#EDE6DE] text-xs">
          <div>
            <span className="text-[#7A6355] text-xs uppercase block">Field Deployments</span>
            <span className="font-mono font-bold text-base text-[#1C1410]">2 Panchayats</span>
          </div>
          <div>
            <span className="text-[#7A6355] text-xs uppercase block">Citizens Impacted</span>
            <span className="font-mono font-bold text-base text-[#2E7D52]">22,600+</span>
          </div>
          <div>
            <span className="text-[#7A6355] text-xs uppercase block">Average Rating</span>
            <span className="font-mono font-bold text-base text-[#D4600A]">4.9 / 5.0 ★</span>
          </div>
          <div>
            <span className="text-[#7A6355] text-xs uppercase block">Verification Status</span>
            <span className="font-mono font-bold text-xs text-[#2E7D52] flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3D9970]" /> Dean Endorsed
            </span>
          </div>
        </div>
      </div>

      {/* Verified Capstone Credentials */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-[#1C1410] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#F57C00]" />
          <span>Stamped Project Endorsements</span>
        </h3>

        <div className="space-y-4">
          {studentData.verifiedProjects.map(proj => (
            <div
              key={proj.projectId}
              className="p-6 rounded-[24px] bg-white border border-[#EDE6DE] hover:border-[#F57C00] transition-all space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded border border-[#F57C00]/20">
                      {proj.projectId}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2 py-0.5 rounded-full capitalize">
                      {proj.domain.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#1C1410] leading-snug">
                    {proj.projectTitle}
                  </h4>
                  <p className="text-xs text-[#7A6355] flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                    {proj.location}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-[#E8F5EE] text-[#2E7D52] font-mono font-bold text-xs rounded-full border border-[#3D9970]/30">
                    +{proj.creditsAwarded} ABC Credits
                  </span>
                  <div className="flex items-center justify-end gap-1 text-xs text-[#D4600A] mt-1 font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#F57C00]" />
                    <span>{proj.citizenRating} Citizen Rating</span>
                  </div>
                </div>
              </div>

              {/* Endorsement Details */}
              <div className="p-3.5 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#7A6355] text-xs uppercase block">Student Project Role:</span>
                  <span className="font-bold text-[#1C1410]">{proj.role}</span>
                </div>
                <div>
                  <span className="text-[#7A6355] text-xs uppercase block">Faculty Mentor Endorsement:</span>
                  <span className="font-bold text-[#2E7D52] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3D9970]" /> {proj.facultyEndorser}
                  </span>
                </div>
              </div>

              {/* Hash Footer */}
              <div className="flex items-center justify-between text-xs font-mono text-[#7A6355] pt-2 border-t border-[#EDE6DE]">
                <span>Completed: {proj.completionDate}</span>
                <span className="text-[#2E7D52] font-semibold">Ledger Proof: {proj.verificationHash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
