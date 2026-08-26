import React, { useState } from 'react';
import {
  ShieldAlert,
  TrendingUp,
  MapPin,
  Building2,
  Coins,
  CheckCircle2,
  Activity,
  Download,
  Filter,
  Layers,
  Sparkles,
  ArrowUpRight,
  Compass,
  Map as MapIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { JharkhandMap } from '../components/JharkhandMap';
import { JharkhandGoogleMap } from '../components/JharkhandGoogleMap';
import { JHARKHAND_DOMAINS, JHARKHAND_DISTRICTS } from '../data/constants';
import { Problem, Project } from '../types';

interface GovernmentCommandViewProps {
  problems: Problem[];
  projects: Project[];
  selectedDistrict: string | null;
  onSelectDistrict: (district: string | null) => void;
  onSelectProblem?: (problem: Problem) => void;
}

export const GovernmentCommandView: React.FC<GovernmentCommandViewProps> = ({
  problems,
  projects,
  selectedDistrict,
  onSelectDistrict,
  onSelectProblem
}) => {
  const [mapMetric, setMapMetric] = useState<'urgency' | 'problems' | 'resolution'>('urgency');
  const [mapEngine, setMapEngine] = useState<'google' | 'tactical'>('google');

  // Total metrics
  const totalSubmissions = problems.length;
  const activeProjectsCount = projects.filter(p => p.status !== 'completed').length;
  const deployedCount = problems.filter(p => p.status === 'deployed' || p.status === 'resolved').length;
  const totalCsrFunds = projects.reduce((acc, p) => acc + (p.fundingGrant?.amount || 0), 28400000);

  // Recharts Data Prep: Domain breakdown
  const domainData = JHARKHAND_DOMAINS.map(d => {
    const count = problems.filter(p => p.aiOutput.domain === d.key).length;
    return {
      name: d.name,
      value: count || Math.floor(Math.random() * 20) + 12
    };
  });

  const DOMAIN_COLORS = [
    '#F57C00', '#4CAF75', '#60A5FA', '#EAB308', '#C1440E',
    '#A855F7', '#EC4899', '#14B8A6', '#F97316', '#84CC16'
  ];

  // Top 5 Problem Districts Bar Chart
  const topDistrictsData = [...JHARKHAND_DISTRICTS]
    .sort((a, b) => b.problemCount - a.problemCount)
    .slice(0, 5)
    .map(d => ({
      name: d.name,
      problems: d.problemCount,
      resolved: d.resolvedCount
    }));

  // Monthly trend mock data
  const trendData = [
    { month: 'Oct 25', submitted: 85, resolved: 14 },
    { month: 'Nov 25', submitted: 142, resolved: 32 },
    { month: 'Dec 25', submitted: 210, resolved: 68 },
    { month: 'Jan 26', submitted: 340, resolved: 110 },
    { month: 'Feb 26', submitted: 480, resolved: 195 },
    { month: 'Mar 26', submitted: 620, resolved: 280 }
  ];

  // University Leaderboard
  const uniLeaderboard = [
    { name: 'NIT Jamshedpur', active: 18, deployed: 9, rating: '4.9★' },
    { name: 'BIT Mesra, Ranchi', active: 14, deployed: 7, rating: '4.8★' },
    { name: 'IIT (ISM) Dhanbad', active: 12, deployed: 6, rating: '4.9★' },
    { name: 'Birsa Agricultural University', active: 11, deployed: 5, rating: '4.7★' },
    { name: 'Ranchi University', active: 9, deployed: 4, rating: '4.6★' }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#4CAF75]/15">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-xs font-mono text-[#EF4444] mb-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
            DIRECTORATE OF HIGHER & TECHNICAL EDUCATION • GOVT OF JHARKHAND
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F0EDE6]">
            State Innovation Command Center
          </h2>
          <p className="text-xs text-[#8FA89E]">
            24-District real-time telemetry, institutional routing velocity, and field deployment verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting Official Jharkhand Innovation State Report (PDF & GeoJSON)...')}
            className="px-4 py-2 rounded-xl bg-[#112318] hover:bg-[#1A3328] text-[#9EDDB4] border border-[#4CAF75]/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#F57C00]" />
            <span>Export State Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#112318] border border-[#4CAF75]/25 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#8FA89E] uppercase font-bold">
              Citizen Grievances
            </span>
            <Activity className="w-4 h-4 text-[#F57C00]" />
          </div>
          <p className="font-mono font-extrabold text-3xl text-[#F0EDE6]">
            1,482
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#4CAF75] mt-2 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+34% this month (32,600 villages)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#112318] border border-[#4CAF75]/25 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#8FA89E] uppercase font-bold">
              Active Uni Projects
            </span>
            <Building2 className="w-4 h-4 text-[#4CAF75]" />
          </div>
          <p className="font-mono font-extrabold text-3xl text-[#4CAF75]">
            84
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#8FA89E] mt-2">
            <span>Across 12 State Universities</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#112318] border border-[#4CAF75]/25 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#8FA89E] uppercase font-bold">
              Panchayat Deployments
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
          </div>
          <p className="font-mono font-extrabold text-3xl text-[#60A5FA]">
            38
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#9EDDB4] mt-2">
            <span>4.8★ Avg Citizen Verification</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#112318] border border-[#4CAF75]/25 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#8FA89E] uppercase font-bold">
              CSR Pool Disbursed
            </span>
            <Coins className="w-4 h-4 text-[#FF9A30]" />
          </div>
          <p className="font-mono font-extrabold text-3xl text-[#FF9A30]">
            ₹2.84 Cr
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#8FA89E] mt-2">
            <span>Section 135 DPE Schedule VII</span>
          </div>
        </div>
      </div>

      {/* 24-District Interactive Geospatial Heatmap & Google Maps */}
      <section className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-mono text-[#F57C00] uppercase font-bold">
              Spatial Intelligence & Ground Truth
            </span>
            <h3 className="font-display font-bold text-xl text-[#F0EDE6]">
              24-District Interactive Map
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Engine Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#112318] rounded-xl border border-[#4CAF75]/25 text-xs">
              <button
                onClick={() => setMapEngine('google')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  mapEngine === 'google' ? 'bg-[#F57C00] text-[#0A1A14]' : 'text-[#8FA89E] hover:text-[#F0EDE6]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Google Maps Live</span>
              </button>
              <button
                onClick={() => setMapEngine('tactical')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  mapEngine === 'tactical' ? 'bg-[#4CAF75] text-[#0A1A14]' : 'text-[#8FA89E] hover:text-[#F0EDE6]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>24-District Heatmap</span>
              </button>
            </div>

            {/* Metric Switcher (when in tactical mode) */}
            {mapEngine === 'tactical' && (
              <div className="flex items-center gap-1 p-1 bg-[#112318] rounded-xl border border-[#4CAF75]/20 text-xs">
                <button
                  onClick={() => setMapMetric('urgency')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    mapMetric === 'urgency' ? 'bg-[#F57C00] text-[#0A1A14]' : 'text-[#8FA89E]'
                  }`}
                >
                  Urgency Score
                </button>
                <button
                  onClick={() => setMapMetric('problems')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    mapMetric === 'problems' ? 'bg-[#F57C00] text-[#0A1A14]' : 'text-[#8FA89E]'
                  }`}
                >
                  Problem Density
                </button>
                <button
                  onClick={() => setMapMetric('resolution')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    mapMetric === 'resolution' ? 'bg-[#F57C00] text-[#0A1A14]' : 'text-[#8FA89E]'
                  }`}
                >
                  Resolution Rate
                </button>
              </div>
            )}
          </div>
        </div>

        {mapEngine === 'google' ? (
          <JharkhandGoogleMap
            problems={problems}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            onSelectProblem={onSelectProblem}
            height="560px"
          />
        ) : (
          <JharkhandMap
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            metric={mapMetric}
          />
        )}
      </section>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Distribution Donut */}
        <div className="p-6 rounded-3xl bg-[#112318] border border-[#4CAF75]/25 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#F57C00] uppercase font-bold">
                Categorization Breakdown
              </span>
              <h4 className="font-display font-bold text-base text-[#F0EDE6]">
                Problems by 10 Societal Domains
              </h4>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DOMAIN_COLORS[index % DOMAIN_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1A14', borderColor: '#4CAF75', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#F0EDE6' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Domain Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            {domainData.slice(0, 6).map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DOMAIN_COLORS[i] }} />
                <span className="text-[#8FA89E] truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Problem Districts Bar Chart */}
        <div className="p-6 rounded-3xl bg-[#112318] border border-[#4CAF75]/25 shadow-xl space-y-4">
          <div>
            <span className="text-[10px] font-mono text-[#EF4444] uppercase font-bold">
              District Grievance Inflow
            </span>
            <h4 className="font-display font-bold text-base text-[#F0EDE6]">
              Top 5 High-Pressure Districts
            </h4>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDistrictsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(76, 175, 117, 0.1)" />
                <XAxis dataKey="name" stroke="#8FA89E" fontSize={11} />
                <YAxis stroke="#8FA89E" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1A14', borderColor: '#4CAF75', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="problems" fill="#F57C00" name="Total Submissions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#4CAF75" name="Solutions Deployed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6-Month Ingestion & Resolution Trend */}
        <div className="p-6 rounded-3xl bg-[#112318] border border-[#4CAF75]/25 shadow-xl space-y-4">
          <div>
            <span className="text-[10px] font-mono text-[#60A5FA] uppercase font-bold">
              Deployment Velocity
            </span>
            <h4 className="font-display font-bold text-base text-[#F0EDE6]">
              6-Month Platform Scaling Trajectory
            </h4>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(76, 175, 117, 0.1)" />
                <XAxis dataKey="month" stroke="#8FA89E" fontSize={11} />
                <YAxis stroke="#8FA89E" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1A14', borderColor: '#4CAF75', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="submitted" stroke="#FF9A30" strokeWidth={2} name="Submissions" />
                <Line type="monotone" dataKey="resolved" stroke="#4CAF75" strokeWidth={2} name="Deployed Solutions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* University Innovation Leaderboard */}
        <div className="p-6 rounded-3xl bg-[#112318] border border-[#4CAF75]/25 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#4CAF75] uppercase font-bold">
                Institutional Performance
              </span>
              <h4 className="font-display font-bold text-base text-[#F0EDE6]">
                University Capstone Leaderboard
              </h4>
            </div>
          </div>

          <div className="space-y-2.5">
            {uniLeaderboard.map((u, i) => (
              <div
                key={u.name}
                className="p-3 bg-[#0A1A14] rounded-2xl border border-[#4CAF75]/15 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#F57C00]/15 text-[#FF9A30] font-mono font-bold flex items-center justify-center text-[10px]">
                    #{i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-[#F0EDE6] block">{u.name}</span>
                    <span className="text-[10px] text-[#8FA89E]">{u.active} Active Projects</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#4CAF75] font-bold">
                    {u.deployed} Deployed
                  </span>
                  <span className="text-[11px] font-mono text-[#FF9A30] bg-[#F57C00]/10 px-2 py-0.5 rounded">
                    {u.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
