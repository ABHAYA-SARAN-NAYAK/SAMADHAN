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
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-[#112318] border border-[#4CAF75]/25 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#4CAF75]/20 border border-[#4CAF75]/40 flex items-center justify-center text-[#4CAF75]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F57C00] uppercase tracking-wider font-bold">
              Higher & Technical Education Portal
            </span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#F0EDE6]">
              {activeUniversityName} Innovation Cell
            </h2>
            <p className="text-xs text-[#8FA89E]">
              Jharkhand Academic Capstone & Grassroots Research Network
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'inbox'
                ? 'bg-[#F57C00] text-[#0A1A14] shadow-md'
                : 'bg-[#0A1A14] text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20'
            }`}
          >
            Matched Inbox ({inboxProblems.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-[#F57C00] text-[#0A1A14] shadow-md'
                : 'bg-[#0A1A14] text-[#8FA89E] hover:text-[#F0EDE6] border border-[#4CAF75]/20'
            }`}
          >
            Active Projects ({projects.length})
          </button>
          <button
            onClick={onNavigatePassport}
            className="px-3.5 py-2 rounded-xl bg-[#1A3328] hover:bg-[#1A3328]/80 text-[#9EDDB4] border border-[#4CAF75]/30 text-xs font-semibold transition-all flex items-center gap-1.5"
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
            <h3 className="font-display font-bold text-lg text-[#F0EDE6]">
              Department-Matched Societal Challenges
            </h3>
            <span className="text-xs font-mono text-[#8FA89E]">
              Algorithmic matching based on lab specializations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inboxProblems.map(prob => {
              const domainMeta = JHARKHAND_DOMAINS.find(d => d.key === prob.aiOutput.domain);
              return (
                <div
                  key={prob.id}
                  className="p-5 rounded-2xl bg-[#112318] border border-[#4CAF75]/20 hover:border-[#4CAF75]/60 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#FF9A30] bg-[#F57C00]/10 px-2 py-0.5 rounded">
                        {prob.problemId}
                      </span>
                      <span className="text-[10px] font-mono text-[#4CAF75] bg-[#4CAF75]/15 px-2 py-0.5 rounded-full font-bold">
                        Urgency: {prob.aiOutput.urgencyScore}/100
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-[#F0EDE6] group-hover:text-[#FF9A30] transition-colors leading-snug">
                      {prob.title}
                    </h4>

                    <p className="text-xs text-[#8FA89E] line-clamp-3 leading-relaxed">
                      {prob.description}
                    </p>

                    <div className="pt-2 border-t border-[#4CAF75]/10 flex items-center justify-between text-[11px] text-[#8FA89E]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#F57C00]" />
                        {prob.location.district} ({prob.location.block || 'Rural'})
                      </span>
                      <span className="text-[10px] font-mono text-[#6DC98D]">
                        {domainMeta?.name}
                      </span>
                    </div>
                  </div>

                  <button
                    id={`btn-accept-${prob.problemId}`}
                    onClick={() => handleOpenAccept(prob)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#4CAF75] hover:bg-[#6DC98D] text-[#0A1A14] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
            <h3 className="font-display font-bold text-base text-[#F0EDE6] mb-2">
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
                        ? 'bg-[#1A3328] border-[#4CAF75] shadow-lg shadow-[#4CAF75]/20 ring-1 ring-[#4CAF75]'
                        : 'bg-[#112318] border-[#4CAF75]/15 hover:border-[#4CAF75]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#FF9A30] bg-[#F57C00]/10 px-2 py-0.5 rounded">
                        {proj.projectId}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                          proj.status === 'completed' || proj.status === 'deployed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xs text-[#F0EDE6] leading-snug">
                      {proj.title}
                    </h4>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-[#8FA89E]">
                        <span>Milestones</span>
                        <span>{completedMilestones} / {proj.milestones.length} ({progressPct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0A1A14] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4CAF75] transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#8FA89E] pt-1">
                      <span>Lead: {proj.facultyLead}</span>
                      {proj.fundingGrant?.amount && (
                        <span className="font-mono text-[#FF9A30] font-semibold">
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
              <div className="bg-[#112318] border border-[#4CAF75]/30 rounded-3xl p-6 shadow-xl space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#FF9A30] bg-[#F57C00]/15 px-2 py-0.5 rounded">
                      {selectedProject.projectId}
                    </span>
                    <span className="text-xs font-mono text-[#6DC98D] bg-[#4CAF75]/15 px-2.5 py-0.5 rounded">
                      Target: {new Date(selectedProject.targetCompletionDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-[#F0EDE6] leading-snug">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-[#8FA89E] mt-2 bg-[#0A1A14] p-3 rounded-xl border border-[#4CAF75]/15 leading-relaxed">
                    {selectedProject.abstract}
                  </p>
                </div>

                {/* Team Roster Card */}
                <div className="p-4 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#F57C00] uppercase font-bold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> University Innovation Team
                    </span>
                    <span className="text-[10px] font-mono text-[#8FA89E]">
                      {selectedProject.studentTeam.length} Student Engineers
                    </span>
                  </div>

                  <div className="text-xs text-[#F0EDE6]">
                    <span className="text-[#8FA89E] text-[11px] block mb-0.5">Faculty Lead Mentor:</span>
                    <span className="font-semibold">{selectedProject.facultyLead} (Dept of Civil & Env)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedProject.studentTeam.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-[#112318] rounded-xl border border-[#4CAF75]/15 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-[#F0EDE6] block">{s.name}</span>
                          <span className="text-[10px] text-[#8FA89E]">{s.role}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#4CAF75] bg-[#4CAF75]/15 px-1.5 py-0.5 rounded">
                          +{s.creditsEarned || 4} ABC
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#4CAF75] uppercase font-bold">
                      Milestone Execution Tracker
                    </span>
                    <span className="text-[11px] text-[#8FA89E]">
                      Completing milestone triggers live citizen SMS dispatch
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedProject.milestones.map((m, idx) => (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          m.completed
                            ? 'bg-[#1A3328]/70 border-[#4CAF75]/40 text-[#F0EDE6]'
                            : 'bg-[#0A1A14] border-[#4CAF75]/15 text-[#8FA89E]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold mt-0.5 ${
                              m.completed
                                ? 'bg-[#4CAF75] text-[#0A1A14]'
                                : 'bg-[#112318] text-[#556B62] border border-[#4CAF75]/30'
                            }`}
                          >
                            {m.completed ? '✓' : idx + 1}
                          </div>
                          <div>
                            <span className="font-semibold text-xs text-[#F0EDE6] block">
                              {m.title}
                            </span>
                            <span className="text-[11px] text-[#8FA89E] block">
                              {m.description}
                            </span>
                          </div>
                        </div>

                        {!m.completed ? (
                          <button
                            id={`btn-complete-milestone-${m.id}`}
                            onClick={() => onCompleteMilestone(selectedProject.id, m.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                          >
                            Mark Complete
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-[#4CAF75] bg-[#4CAF75]/15 px-2 py-0.5 rounded shrink-0">
                            Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage Advancement */}
                <div className="pt-3 border-t border-[#4CAF75]/15 flex items-center justify-between">
                  <span className="text-xs text-[#8FA89E]">
                    Current Status: <strong className="text-[#F0EDE6] uppercase">{selectedProject.status}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {selectedProject.status !== 'deployed' && selectedProject.status !== 'completed' && (
                      <button
                        onClick={() => onAdvanceProjectStage(selectedProject.id, 'deployed')}
                        className="px-4 py-2 rounded-xl bg-[#4CAF75] hover:bg-[#6DC98D] text-[#0A1A14] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Deploy to Field Site</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#112318] rounded-3xl border border-[#4CAF75]/15 text-[#8FA89E] text-xs">
                Select a project from the left roster to view engineering milestones
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accept Problem Modal */}
      {problemToAccept && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#112318] border border-[#4CAF75]/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div>
              <span className="text-xs font-mono text-[#F57C00] uppercase font-bold">
                Project Formation Protocol
              </span>
              <h3 className="font-display font-bold text-xl text-[#F0EDE6] mt-1">
                Accept {problemToAccept.problemId}
              </h3>
              <p className="text-xs text-[#8FA89E]">
                Create a formal university capstone research project for {problemToAccept.location.district}.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-mono text-[#8FA89E] block mb-1">
                  Capstone Project Title:
                </label>
                <input
                  type="text"
                  value={projectTitleInput}
                  onChange={e => setProjectTitleInput(e.target.value)}
                  className="w-full bg-[#0A1A14] border border-[#4CAF75]/30 rounded-xl p-2.5 text-[#F0EDE6] font-semibold outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8FA89E] block mb-1">
                  Assigned Faculty Lead:
                </label>
                <input
                  type="text"
                  value={facultyLeadInput}
                  onChange={e => setFacultyLeadInput(e.target.value)}
                  className="w-full bg-[#0A1A14] border border-[#4CAF75]/30 rounded-xl p-2.5 text-[#F0EDE6] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#4CAF75]/15">
              <button
                onClick={() => setProblemToAccept(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#8FA89E] hover:text-[#F0EDE6]"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-accept-project"
                onClick={handleConfirmAccept}
                className="px-5 py-2 rounded-xl bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-all shadow-md cursor-pointer"
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
