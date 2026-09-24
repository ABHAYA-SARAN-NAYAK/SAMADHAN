import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { SmsLogModal } from './components/SmsLogModal';
import { SelectPortalGateway } from './views/SelectPortalGateway';
import { CitizenSubmitView } from './views/CitizenSubmitView';
import { CitizenDashboardView } from './views/CitizenDashboardView';
import { UniversityDashboardView } from './views/UniversityDashboardView';
import { IndustryMarketplaceView } from './views/IndustryMarketplaceView';
import { GovernmentCommandView } from './views/GovernmentCommandView';
import { AdminProblemEngineView } from './views/AdminProblemEngineView';
import { ClusterView } from './views/ClusterView';
import { StudentPassportView } from './views/StudentPassportView';
import { Problem, Project, ProblemCluster, University, AppNotification, UserRole } from './types';
import { INITIAL_PROBLEMS, INITIAL_PROJECTS, INITIAL_CLUSTERS, JHARKHAND_UNIVERSITIES } from './data/constants';

export default function App() {
  // Navigation & Role State (Default to Portal Selector Gateway)
  const [currentRole, setCurrentRole] = useState<UserRole>('CITIZEN');
  const [activeView, setActiveView] = useState<string>('select_portal');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // App Data State (Synced with Backend / Memory fallback)
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [clusters, setClusters] = useState<ProblemCluster[]>(INITIAL_CLUSTERS);
  const [universities, setUniversities] = useState<University[]>(JHARKHAND_UNIVERSITIES);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      recipient: 'CITIZEN',
      title: 'SMS Sent: Problem Registered',
      body: 'आपका मुद्दा दर्ज कर लिया गया है। ID: JH-2026-00142. समाधान टीम सक्रिय है।',
      type: 'sms',
      timestamp: new Date().toISOString(),
      read: false,
      meta: { problemId: 'JH-2026-00142', recipientPhone: '+91 94311 88204' }
    },
    {
      id: 'notif-2',
      recipient: 'UNIVERSITY',
      title: 'New High-Urgency Match: Garhwa Water',
      body: 'NIT Jamshedpur Civil & Env department matched with 96% confidence.',
      type: 'in_app',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      meta: { problemId: 'JH-2026-00142' }
    }
  ]);

  const [isSmsLogOpen, setIsSmsLogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch initial data from backend API
  const refreshData = async () => {
    try {
      const [probRes, projRes, clustRes, notifRes] = await Promise.all([
        fetch('/api/problems'),
        fetch('/api/projects'),
        fetch('/api/clusters'),
        fetch('/api/notifications')
      ]);

      if (probRes.ok) {
        const probData = await probRes.json();
        if (probData.data) setProblems(probData.data);
      }
      if (projRes.ok) {
        const projData = await projRes.json();
        if (projData.data) setProjects(projData.data);
      }
      if (clustRes.ok) {
        const clustData = await clustRes.json();
        if (clustData.data) setClusters(clustData.data);
      }
      if (notifRes.ok) {
        const notifData = await notifRes.json();
        if (notifData.data) setNotifications(notifData.data);
      }
    } catch (err) {
      console.warn('Using local fallback state:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handle portal selection from gateway
  const handleSelectPortalRole = (role: UserRole, initialView?: string) => {
    setCurrentRole(role);
    if (initialView) {
      setActiveView(initialView);
    } else {
      switch (role) {
        case 'CITIZEN':
          setActiveView('citizen_submit');
          break;
        case 'GOVT_ADMIN':
          setActiveView('govt_dashboard');
          break;
        case 'UNIVERSITY':
          setActiveView('university_inbox');
          break;
        case 'INDUSTRY':
          setActiveView('industry_marketplace');
          break;
      }
    }
  };

  // Handle citizen submission
  const handleCitizenSubmitSuccess = (newProblem: Problem) => {
    setProblems(prev => [newProblem, ...prev]);
    showToast(`Registered ${newProblem.problemId}! SMS sent to ${newProblem.submittedBy.phone}`);
    refreshData();
  };

  // Handle assigning problem to university
  const handleAssignToUniversity = async (problemId: string, universityId: string, facultyName: string) => {
    try {
      const uni = universities.find(u => u.id === universityId) || universities[0];
      const res = await fetch(`/api/problems/${problemId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityId,
          universityName: uni.name,
          department: uni.departments[0] || 'Civil & Environmental Engineering',
          facultyLead: facultyName
        })
      });
      if (res.ok) {
        showToast(`Problem assigned to ${uni.name}! Capstone team formed.`);
        refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle accepting problem in university portal
  const handleAcceptProblem = async (problemId: string, projectTitle: string, facultyLead: string) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId,
          title: projectTitle,
          facultyLead,
          universityName: 'NIT Jamshedpur',
          department: 'Civil & Environmental Engineering'
        })
      });
      if (res.ok) {
        showToast(`Project formed! Milestone tracker initialized.`);
        refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle completing a milestone
  const handleCompleteMilestone = async (projectId: string, milestoneId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/milestones/${milestoneId}/complete`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast(`Milestone completed! Live SMS milestone sent to citizen.`);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle advance stage
  const handleAdvanceProjectStage = async (projectId: string, nextStatus: any) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        showToast(`Project status updated to ${nextStatus}!`);
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle CSR Pledge
  const handlePledgeFunding = async (problemId: string, company: string, amount: number, mode: string) => {
    try {
      const res = await fetch(`/api/problems/${problemId}/csr-pledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, amount, mode })
      });
      if (res.ok) {
        showToast(`₹${(amount / 100000).toFixed(1)}L CSR Pledge committed by ${company}!`);
        confetti({ particleCount: 80, spread: 60 });
        refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Citizen 5-Star Rating
  const handleRateProblem = async (problemId: string, rating: number, feedback: string) => {
    try {
      const res = await fetch(`/api/problems/${problemId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, feedback })
      });
      if (res.ok) {
        showToast(`Thank you! 5★ Citizen Verification logged. +4 ABC credits awarded to students!`);
        confetti({ particleCount: 120, spread: 80 });
        refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1410] font-sans antialiased selection:bg-[#FEF0E0] selection:text-[#D4600A] flex flex-col">
      {/* Top Navigation Bar with Role-Scoped Links & Portal Selector Button */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={role => {
          setCurrentRole(role);
          if (role === 'CITIZEN') setActiveView('citizen_submit');
          if (role === 'GOVT_ADMIN') setActiveView('govt_dashboard');
          if (role === 'UNIVERSITY') setActiveView('university_inbox');
          if (role === 'INDUSTRY') setActiveView('industry_marketplace');
        }}
        activeView={activeView}
        onSelectView={view => setActiveView(view)}
        notifications={notifications}
        onOpenSmsLog={() => setIsSmsLogOpen(true)}
      />

      {/* Main Content Area strictly isolated by active role/view */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1C1410] border border-[#F57C00]/40 text-[#FDF9F4] p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-up max-w-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D9970] animate-ping" />
            <p className="text-xs font-semibold leading-snug">{toastMessage}</p>
          </div>
        )}

        {/* 1. Portal Gateway (Role Select Page) */}
        {activeView === 'select_portal' && (
          <SelectPortalGateway onSelectRole={handleSelectPortalRole} />
        )}

        {/* 2. CITIZEN PORTAL VIEWS */}
        {activeView === 'citizen_submit' && (
          <CitizenSubmitView
            onSubmitSuccess={handleCitizenSubmitSuccess}
            onNavigateToDashboard={() => setActiveView('citizen_dashboard')}
          />
        )}

        {activeView === 'citizen_dashboard' && (
          <CitizenDashboardView
            problems={problems}
            onRateProblem={handleRateProblem}
            onNavigateSubmit={() => setActiveView('citizen_submit')}
          />
        )}

        {/* 3. GOVERNMENT / ADMIN PORTAL VIEWS */}
        {activeView === 'govt_dashboard' && (
          <GovernmentCommandView
            problems={problems}
            projects={projects}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={d => setSelectedDistrict(d)}
            onSelectProblem={() => setActiveView('admin_problems')}
          />
        )}

        {activeView === 'admin_problems' && (
          <AdminProblemEngineView
            problems={problems}
            universities={universities}
            onAssignToUniversity={handleAssignToUniversity}
            onUpdateStatus={(id, st) => {
              setProblems(prev => prev.map(p => p.id === id ? { ...p, status: st } : p));
              showToast(`Status updated to ${st}`);
            }}
          />
        )}

        {activeView === 'admin_clusters' && (
          <ClusterView
            clusters={clusters}
            problems={problems}
            onDispatchClusterProject={(clusterId, uniName) => {
              showToast(`Dispatched unified Master Project to ${uniName}!`);
              confetti({ particleCount: 70, spread: 60 });
              setActiveView('university_inbox');
              setCurrentRole('UNIVERSITY');
            }}
          />
        )}

        {/* 4. UNIVERSITY PORTAL VIEWS */}
        {activeView === 'university_inbox' && (
          <UniversityDashboardView
            projects={projects}
            inboxProblems={problems.filter(p => p.status === 'submitted' || p.status === 'under_review' || p.status === 'assigned')}
            universities={universities}
            onAcceptProblem={handleAcceptProblem}
            onCompleteMilestone={handleCompleteMilestone}
            onAdvanceProjectStage={handleAdvanceProjectStage}
            onNavigatePassport={() => setActiveView('student_passport')}
          />
        )}

        {activeView === 'university_projects' && (
          <UniversityDashboardView
            projects={projects}
            inboxProblems={problems.filter(p => p.status === 'submitted' || p.status === 'under_review' || p.status === 'assigned')}
            universities={universities}
            onAcceptProblem={handleAcceptProblem}
            onCompleteMilestone={handleCompleteMilestone}
            onAdvanceProjectStage={handleAdvanceProjectStage}
            onNavigatePassport={() => setActiveView('student_passport')}
          />
        )}

        {activeView === 'student_passport' && (
          <StudentPassportView />
        )}

        {/* 5. INDUSTRY / CSR PORTAL VIEWS */}
        {activeView === 'industry_marketplace' && (
          <IndustryMarketplaceView
            problems={problems}
            projects={projects}
            onPledgeFunding={handlePledgeFunding}
          />
        )}

        {activeView === 'industry_bounties' && (
          <IndustryMarketplaceView
            problems={problems}
            projects={projects}
            onPledgeFunding={handlePledgeFunding}
          />
        )}
      </main>

      {/* Simulated SMS Dispatch Log Modal */}
      <SmsLogModal
        isOpen={isSmsLogOpen}
        onClose={() => setIsSmsLogOpen(false)}
        notifications={notifications.filter(n => n.type === 'sms')}
      />
    </div>
  );
}

