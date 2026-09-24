import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  Coins,
  CheckCircle2,
  Activity,
  Download,
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

  // Recharts Data Prep: Domain breakdown
  const domainData = JHARKHAND_DOMAINS.map(d => {
    const count = problems.filter(p => p.aiOutput.domain === d.key).length;
    return {
      name: d.name,
      value: count || Math.floor(Math.random() * 20) + 12
    };
  });

  const DOMAIN_COLORS = [
    '#F57C00', '#3D9970', '#1D4ED8', '#D97706', '#C1440E',
    '#9333EA', '#DB2777', '#0D9488', '#EA580C', '#65A30D'
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
    <div className="space-y-8 pb-20 max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EDE6DE]">
        <div className="text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#DC2626]/20 text-xs font-bold text-[#DC2626] mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
            DIRECTORATE OF HIGHER & TECHNICAL EDUCATION • GOVT OF JHARKHAND
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1C1410]">
            State Innovation Command Center
          </h2>
          <p className="text-sm text-[#7A6355] mt-1">
            24-District real-time telemetry, institutional routing velocity, and field deployment verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting Official Jharkhand Innovation State Report (PDF & GeoJSON)...')}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FDF9F4] text-[#1C1410] border border-[#EDE6DE] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-[#F57C00]" />
            <span>Export State Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-[20px] bg-white border border-[#EDE6DE] shadow-sm relative overflow-hidden text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#7A6355] uppercase tracking-wider">
              Citizen Grievances
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEF0E0] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#F57C00]" />
            </div>
          </div>
          <p className="font-mono font-bold text-3xl text-[#1C1410]">
            1,482
          </p>
          <div className="flex items-center gap-1 text-xs text-[#2E7D52] mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+34% this month (32,600 villages)</span>
          </div>
        </div>

        <div className="p-6 rounded-[20px] bg-white border border-[#EDE6DE] shadow-sm relative overflow-hidden text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#7A6355] uppercase tracking-wider">
              Active Uni Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#2E7D52]" />
            </div>
          </div>
          <p className="font-mono font-bold text-3xl text-[#2E7D52]">
            84
          </p>
          <div className="flex items-center gap-1 text-xs text-[#7A6355] mt-2 font-medium">
            <span>Across 12 State Universities</span>
          </div>
        </div>

        <div className="p-6 rounded-[20px] bg-white border border-[#EDE6DE] shadow-sm relative overflow-hidden text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#7A6355] uppercase tracking-wider">
              Panchayat Deployments
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
            </div>
          </div>
          <p className="font-mono font-bold text-3xl text-[#1D4ED8]">
            38
          </p>
          <div className="flex items-center gap-1 text-xs text-[#2E7D52] mt-2 font-medium">
            <span>4.8★ Avg Citizen Verification</span>
          </div>
        </div>

        <div className="p-6 rounded-[20px] bg-white border border-[#EDE6DE] shadow-sm relative overflow-hidden text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#7A6355] uppercase tracking-wider">
              CSR Pool Disbursed
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEF0E0] flex items-center justify-center">
              <Coins className="w-4 h-4 text-[#D4600A]" />
            </div>
          </div>
          <p className="font-mono font-bold text-3xl text-[#D4600A]">
            ₹2.84 Cr
          </p>
          <div className="flex items-center gap-1 text-xs text-[#7A6355] mt-2 font-medium">
            <span>Section 135 DPE Schedule VII</span>
          </div>
        </div>
      </div>

      {/* 24-District Interactive Geospatial Heatmap & Google Maps */}
      <section className="space-y-4 text-left">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
              Spatial Intelligence & Ground Truth
            </span>
            <h3 className="font-display font-bold text-2xl text-[#1C1410]">
              24-District Interactive Map
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Engine Switcher */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#EDE6DE] text-xs shadow-xs">
              <button
                onClick={() => setMapEngine('google')}
                className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapEngine === 'google' ? 'bg-[#F57C00] text-white shadow-xs' : 'text-[#4A3728] hover:text-[#1C1410]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Google Maps Live</span>
              </button>
              <button
                onClick={() => setMapEngine('tactical')}
                className={`px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapEngine === 'tactical' ? 'bg-[#3D9970] text-white shadow-xs' : 'text-[#4A3728] hover:text-[#1C1410]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>24-District Heatmap</span>
              </button>
            </div>

            {/* Metric Switcher (when in tactical mode) */}
            {mapEngine === 'tactical' && (
              <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#EDE6DE] text-xs shadow-xs">
                <button
                  onClick={() => setMapMetric('urgency')}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    mapMetric === 'urgency' ? 'bg-[#F57C00] text-white' : 'text-[#7A6355]'
                  }`}
                >
                  Urgency Score
                </button>
                <button
                  onClick={() => setMapMetric('problems')}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    mapMetric === 'problems' ? 'bg-[#F57C00] text-white' : 'text-[#7A6355]'
                  }`}
                >
                  Problem Density
                </button>
                <button
                  onClick={() => setMapMetric('resolution')}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    mapMetric === 'resolution' ? 'bg-[#F57C00] text-white' : 'text-[#7A6355]'
                  }`}
                >
                  Resolution Rate
                </button>
              </div>
            )}
          </div>
        </div>

        {mapEngine === 'google' ? (
          <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-2 shadow-sm overflow-hidden">
            <JharkhandGoogleMap
              problems={problems}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={onSelectDistrict}
              onSelectProblem={onSelectProblem}
              height="560px"
            />
          </div>
        ) : (
          <JharkhandMap
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            metric={mapMetric}
          />
        )}
      </section>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        {/* Domain Distribution Donut */}
        <div className="p-7 rounded-[24px] bg-white border border-[#EDE6DE] shadow-sm space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00] block">
              Categorization Breakdown
            </span>
            <h4 className="font-display font-bold text-lg text-[#1C1410]">
              Problems by 10 Societal Domains
            </h4>
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
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDE6DE', borderRadius: '12px', fontSize: '12px', color: '#1C1410', boxShadow: '0 4px 12px rgba(28,20,16,0.08)' }}
                  itemStyle={{ color: '#1C1410', fontWeight: '600' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Domain Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {domainData.slice(0, 6).map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: DOMAIN_COLORS[i] }} />
                <span className="text-[#4A3728] truncate font-medium">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Problem Districts Bar Chart */}
        <div className="p-7 rounded-[24px] bg-white border border-[#EDE6DE] shadow-sm space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#DC2626] block">
              District Grievance Inflow
            </span>
            <h4 className="font-display font-bold text-lg text-[#1C1410]">
              Top 5 High-Pressure Districts
            </h4>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDistrictsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE6DE" />
                <XAxis dataKey="name" stroke="#7A6355" fontSize={11} tick={{ fill: '#7A6355' }} />
                <YAxis stroke="#7A6355" fontSize={11} tick={{ fill: '#7A6355' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDE6DE', borderRadius: '12px', fontSize: '12px', color: '#1C1410', boxShadow: '0 4px 12px rgba(28,20,16,0.08)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '600', color: '#4A3728' }} />
                <Bar dataKey="problems" fill="#F57C00" name="Total Submissions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#3D9970" name="Solutions Deployed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6-Month Ingestion & Resolution Trend */}
        <div className="p-7 rounded-[24px] bg-white border border-[#EDE6DE] shadow-sm space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1D4ED8] block">
              Deployment Velocity
            </span>
            <h4 className="font-display font-bold text-lg text-[#1C1410]">
              6-Month Platform Scaling Trajectory
            </h4>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE6DE" />
                <XAxis dataKey="month" stroke="#7A6355" fontSize={11} tick={{ fill: '#7A6355' }} />
                <YAxis stroke="#7A6355" fontSize={11} tick={{ fill: '#7A6355' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EDE6DE', borderRadius: '12px', fontSize: '12px', color: '#1C1410', boxShadow: '0 4px 12px rgba(28,20,16,0.08)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '600', color: '#4A3728' }} />
                <Line type="monotone" dataKey="submitted" stroke="#F57C00" strokeWidth={2.5} name="Submissions" dot={{ fill: '#F57C00', r: 4 }} />
                <Line type="monotone" dataKey="resolved" stroke="#3D9970" strokeWidth={2.5} name="Deployed Solutions" dot={{ fill: '#3D9970', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* University Innovation Leaderboard */}
        <div className="p-7 rounded-[24px] bg-white border border-[#EDE6DE] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#3D9970] block">
                Institutional Performance
              </span>
              <h4 className="font-display font-bold text-lg text-[#1C1410]">
                University Capstone Leaderboard
              </h4>
            </div>
          </div>

          <div className="space-y-2.5">
            {uniLeaderboard.map((u, i) => (
              <div
                key={u.name}
                className="p-3.5 bg-[#FDF9F4] rounded-2xl border border-[#EDE6DE] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FEF0E0] text-[#D4600A] font-mono font-bold flex items-center justify-center text-[11px]">
                    #{i + 1}
                  </span>
                  <div>
                    <span className="font-bold text-[#1C1410] block text-sm">{u.name}</span>
                    <span className="text-xs text-[#7A6355]">{u.active} Active Projects</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#2E7D52] font-bold text-xs bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                    {u.deployed} Deployed
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D4600A] bg-[#FEF0E0] px-2.5 py-1 rounded-full">
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

