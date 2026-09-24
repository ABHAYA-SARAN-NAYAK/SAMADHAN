import React, { useState } from 'react';
import {
  Building2,
  Users,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  Sparkles,
  ChevronRight,
  Plus,
  BookOpen,
  Award,
  ArrowRight,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Project, Problem, University, ProjectMilestone } from '../types';
import { JHARKHAND_DOMAINS } from '../data/constants';

interface UniversityDashboardViewProps {
  projects: Project[];
  inboxProblems: Problem[];
  universities: University[];
  activeUniversityName?: string;
  onAcceptProblem: (problemId: string, projectTitle: string, facultyLead: string) => void;
  onCompleteMilestone: (projectId: string, milestoneId: string) => void;
  onAdvanceProjectStage: (projectId: string, nextStatus: any) => void;
  onNavigatePassport: () => void;
}

export const UniversityDashboardView: React.FC<UniversityDashboardViewProps> = ({
  projects,
  inboxProblems,
  universities,
  activeUniversityName = 'NIT Jamshedpur',
  onAcceptProblem,
  onCompleteMilestone,
  onAdvanceProjectStage,
  onNavigatePassport
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'projects'>('inbox');
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);

  // Accept Problem Modal State
  const [problemToAccept, setProblemToAccept] = useState<Problem | null>(null);
  const [projectTitleInput, setProjectTitleInput] = useState('');
  const [facultyLeadInput, setFacultyLeadInput] = useState('Dr. Sanjay Kumar (Civil & Environmental)');

  const handleOpenAccept = (p: Problem) => {
    setProblemToAccept(p);
    setProjectTitleInput(`Low-Cost Filtration for ${p.location.village || p.location.district}`);
  };

  const handleConfirmAccept = () => {
    if (!problemToAccept) return;
    onAcceptProblem(problemToAccept.id, projectTitleInput, facultyLeadInput);
    setProblemToAccept(null);
    setActiveTab('projects');
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* Top Banner */}
      <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] border border-[#3D9970]/30 flex items-center justify-center text-[#2E7D52]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
              Higher & Technical Education Portal
            </span>
            <h2 className="font-display font-bold text-2xl text-[#1C1410]">
              {activeUniversityName} Innovation Cell
            </h2>
            <p className="text-xs text-[#7A6355]">
              Jharkhand Academic Capstone & Grassroots Research Network
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-[#1C1410] text-white shadow-xs'
                : 'bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE]'
            }`}
          >
            Matched Inbox ({inboxProblems.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#1C1410] text-white shadow-xs'
                : 'bg-white text-[#7A6355] hover:text-[#1C1410] border border-[#EDE6DE]'
            }`}
          >
            Active Projects ({projects.length})
          </button>
          <button
            onClick={onNavigatePassport}
            className="px-3.5 py-2 rounded-xl bg-[#E8F5EE] hover:bg-[#D1EBE0] text-[#2E7D52] border border-[#3D9970]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#F57C00]" />
            <span className="hidden md:inline">Impact Passport</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Matched Problem Inbox */}
      {activeTab === 'inbox' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-[#1C1410]">
              Department-Matched Societal Challenges
            </h3>
            <span className="text-xs text-[#7A6355]">
              Algorithmic matching based on lab specializations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inboxProblems.map(prob => {
              const domainMeta = JHARKHAND_DOMAINS.find(d => d.key === prob.aiOutput.domain);
              return (
                <div
                  key={prob.id}
                  className="p-5 rounded-2xl bg-white border border-[#EDE6DE] hover:border-[#F57C00] transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded border border-[#F57C00]/20">
                        {prob.problemId}
                      </span>
                      <span className="text-[11px] font-mono text-[#2E7D52] bg-[#E8F5EE] px-2 py-0.5 rounded-full font-bold">
                        Urgency: {prob.aiOutput.urgencyScore}/100
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-[#1C1410] group-hover:text-[#F57C00] transition-colors leading-snug">
                      {prob.title}
                    </h4>

                    <p className="text-xs text-[#7A6355] line-clamp-3 leading-relaxed">
                      {prob.description}
                    </p>

                    <div className="pt-2 border-t border-[#EDE6DE] flex items-center justify-between text-xs text-[#7A6355]">
                      <span className="flex items-center gap-1 font-medium text-[#1C1410]">
                        <MapPin className="w-3 h-3 text-[#F57C00]" />
                        {prob.location.district} ({prob.location.block || 'Rural'})
                      </span>
                      <span className="text-xs font-bold text-[#2E7D52]">
                        {domainMeta?.name}
                      </span>
                    </div>
                  </div>

                  <button
                    id={`btn-accept-${prob.problemId}`}
                    onClick={() => handleOpenAccept(prob)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#3D9970] hover:bg-[#2E7D52] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:-translate-y-0.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept Challenge & Form Capstone Team</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Active University Projects & Workspace */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Projects List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-display font-bold text-lg text-[#1C1410] mb-2">
              Assigned Capstone Projects ({projects.length})
            </h3>

            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {projects.map(proj => {
                const isSelected = selectedProject?.id === proj.id;
                const completedMilestones = proj.milestones.filter(m => m.completed).length;
                const progressPct = Math.round((completedMilestones / proj.milestones.length) * 100);

                return (
                  <div
                    key={proj.id}
                    id={`proj-card-${proj.id}`}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-[#FEF0E0] border-[#F57C00] shadow-sm ring-2 ring-[#F57C00]/20'
                        : 'bg-white border-[#EDE6DE] hover:border-[#BFB0A3]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#D4600A] bg-white px-2 py-0.5 rounded border border-[#EDE6DE]">
                        {proj.projectId}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                          proj.status === 'completed' || proj.status === 'deployed'
                            ? 'bg-[#E8F5EE] text-[#2E7D52]'
                            : 'bg-[#FEF0E0] text-[#D4600A]'
                        }`}
                      >
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-[#1C1410] leading-snug">
                      {proj.title}
                    </h4>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-[#7A6355]">
                        <span>Milestones</span>
                        <span className="font-bold">{completedMilestones} / {proj.milestones.length} ({progressPct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#EDE6DE] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#3D9970] transition-all rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#7A6355] pt-1">
                      <span className="truncate">Lead: {proj.facultyLead}</span>
                      {proj.fundingGrant?.amount && (
                        <span className="font-mono text-[#D4600A] font-bold">
                          ₹{(proj.fundingGrant.amount / 100000).toFixed(1)}L CSR
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Workspace Detail (7 cols) */}
          <div className="lg:col-span-7">
            {selectedProject ? (
              <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#D4600A] bg-[#FEF0E0] px-2 py-0.5 rounded border border-[#F57C00]/20">
                      {selectedProject.projectId}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                      Target: {new Date(selectedProject.targetCompletionDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#1C1410] leading-snug">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-[#4A3728] mt-2 bg-[#FDF9F4] p-3.5 rounded-xl border border-[#EDE6DE] leading-relaxed">
                    {selectedProject.abstract}
                  </p>
                </div>

                {/* Team Roster Card */}
                <div className="p-4 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> University Innovation Team
                    </span>
                    <span className="text-xs font-mono text-[#7A6355] font-bold">
                      {selectedProject.studentTeam.length} Student Engineers
                    </span>
                  </div>

                  <div className="text-xs text-[#1C1410]">
                    <span className="text-[#7A6355] text-xs block mb-0.5">Faculty Lead Mentor:</span>
                    <span className="font-bold">{selectedProject.facultyLead} (Dept of Civil & Env)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedProject.studentTeam.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white rounded-xl border border-[#EDE6DE] flex items-center justify-between text-xs shadow-2xs"
                      >
                        <div>
                          <span className="font-bold text-[#1C1410] block">{s.name}</span>
                          <span className="text-[11px] text-[#7A6355]">{s.role}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                          +{s.creditsEarned || 4} ABC
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2E7D52] uppercase tracking-wider">
                      Milestone Execution Tracker
                    </span>
                    <span className="text-xs text-[#7A6355]">
                      Completing milestone triggers live citizen SMS dispatch
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedProject.milestones.map((m, idx) => (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          m.completed
                            ? 'bg-[#E8F5EE]/60 border-[#3D9970]/30 text-[#1C1410]'
                            : 'bg-[#FDF9F4] border-[#EDE6DE] text-[#7A6355]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold mt-0.5 ${
                              m.completed
                                ? 'bg-[#3D9970] text-white'
                                : 'bg-white text-[#7A6355] border border-[#EDE6DE]'
                            }`}
                          >
                            {m.completed ? '✓' : idx + 1}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-[#1C1410] block">
                              {m.title}
                            </span>
                            <span className="text-xs text-[#7A6355] block">
                              {m.description}
                            </span>
                          </div>
                        </div>

                        {!m.completed ? (
                          <button
                            id={`btn-complete-milestone-${m.id}`}
                            onClick={() => onCompleteMilestone(selectedProject.id, m.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
                          >
                            Mark Complete
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono font-bold text-[#2E7D52] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full shrink-0">
                            Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage Advancement */}
                <div className="pt-3 border-t border-[#EDE6DE] flex items-center justify-between">
                  <span className="text-xs text-[#7A6355]">
                    Current Status: <strong className="text-[#1C1410] uppercase">{selectedProject.status}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {selectedProject.status !== 'deployed' && selectedProject.status !== 'completed' && (
                      <button
                        onClick={() => onAdvanceProjectStage(selectedProject.id, 'deployed')}
                        className="px-4 py-2 rounded-xl bg-[#3D9970] hover:bg-[#2E7D52] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Deploy to Field Site</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-[24px] border border-[#EDE6DE] text-[#7A6355] text-xs">
                Select a project from the left roster to view engineering milestones
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accept Problem Modal */}
      {problemToAccept && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 max-w-lg w-full shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div>
              <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider">
                Project Formation Protocol
              </span>
              <h3 className="font-display font-bold text-2xl text-[#1C1410] mt-1">
                Accept {problemToAccept.problemId}
              </h3>
              <p className="text-xs text-[#7A6355]">
                Create a formal university capstone research project for {problemToAccept.location.district}.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-bold text-[#4A3728] block mb-1">
                  Capstone Project Title:
                </label>
                <input
                  type="text"
                  value={projectTitleInput}
                  onChange={e => setProjectTitleInput(e.target.value)}
                  className="w-full bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl p-2.5 text-[#1C1410] font-semibold outline-none focus:border-[#F57C00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#4A3728] block mb-1">
                  Assigned Faculty Lead:
                </label>
                <input
                  type="text"
                  value={facultyLeadInput}
                  onChange={e => setFacultyLeadInput(e.target.value)}
                  className="w-full bg-[#FDF9F4] border border-[#EDE6DE] rounded-xl p-2.5 text-[#1C1410] outline-none focus:border-[#F57C00]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE6DE]">
              <button
                onClick={() => setProblemToAccept(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#7A6355] hover:text-[#1C1410] cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-accept-project"
                onClick={handleConfirmAccept}
                className="px-5 py-2 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                Confirm Project Acceptance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
