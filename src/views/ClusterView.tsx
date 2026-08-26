import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Users,
  MapPin,
  Building2,
  CheckCircle2,
  Radio,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { ProblemCluster, Problem } from '../types';
import { JHARKHAND_DOMAINS } from '../data/constants';

interface ClusterViewProps {
  clusters: ProblemCluster[];
  problems: Problem[];
  onDispatchClusterProject: (clusterId: string, universityName: string) => void;
}

export const ClusterView: React.FC<ClusterViewProps> = ({
  clusters,
  problems,
  onDispatchClusterProject
}) => {
  const [selectedCluster, setSelectedCluster] = useState<ProblemCluster | null>(clusters[0] || null);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4CAF75]/15">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F57C00]/15 border border-[#F57C00]/30 text-xs font-mono text-[#FF9A30] mb-1 font-semibold">
            <Sparkles className="w-3 h-3 text-[#F57C00]" />
            SEMANTIC DEDUPLICATION & CLUSTERING ENGINE
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#F0EDE6]">
            Aggregated Problem Hotspots
          </h2>
          <p className="text-xs text-[#8FA89E]">
            AI merges duplicate individual grievances into high-impact systemic challenges across Jharkhand.
          </p>
        </div>

        <div className="text-xs font-mono bg-[#112318] px-3.5 py-2 rounded-xl border border-[#4CAF75]/20 text-[#8FA89E]">
          Active Clusters: <strong className="text-[#4CAF75]">{clusters.length}</strong> • Aggregated Reports:{' '}
          <strong className="text-[#FF9A30]">
            {clusters.reduce((acc, c) => acc + c.problemCount, 0)}
          </strong>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cluster Cards List (6 cols) */}
        <div className="lg:col-span-6 space-y-3.5">
          {clusters.map(c => {
            const isSelected = selectedCluster?.id === c.id;
            const domainMeta = JHARKHAND_DOMAINS.find(d => d.key === c.domain);

            return (
              <div
                key={c.id}
                id={`cluster-card-${c.id}`}
                onClick={() => setSelectedCluster(c)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-[#1A3328] border-[#4CAF75] shadow-lg shadow-[#4CAF75]/20 ring-1 ring-[#4CAF75]'
                    : 'bg-[#112318] border-[#4CAF75]/15 hover:border-[#4CAF75]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{domainMeta?.icon || '💧'}</span>
                    <div>
                      <span className="text-[10px] font-mono text-[#F57C00] uppercase font-bold">
                        {domainMeta?.name}
                      </span>
                      <h3 className="font-display font-bold text-sm text-[#F0EDE6] leading-snug">
                        {c.title}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      c.urgencyAverage >= 80 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    Urgency {c.urgencyAverage}/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-[#0A1A14] rounded-xl border border-[#4CAF75]/15">
                    <span className="text-[10px] text-[#8FA89E] block">Reports Merged</span>
                    <span className="font-mono font-bold text-sm text-[#FF9A30]">{c.problemCount} Reports</span>
                  </div>
                  <div className="p-2 bg-[#0A1A14] rounded-xl border border-[#4CAF75]/15">
                    <span className="text-[10px] text-[#8FA89E] block">Villages Affected</span>
                    <span className="font-mono font-bold text-sm text-[#F0EDE6]">{c.villagesAffected.length} Panchayats</span>
                  </div>
                  <div className="p-2 bg-[#0A1A14] rounded-xl border border-[#4CAF75]/15">
                    <span className="text-[10px] text-[#8FA89E] block">Estimated Pop</span>
                    <span className="font-mono font-bold text-sm text-[#4CAF75]">
                      {c.estimatedAffectedPop?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#4CAF75]/10 text-[#8FA89E]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F57C00]" />
                    {c.district} District
                  </span>
                  <span className="text-[11px] text-[#6DC98D] flex items-center gap-1">
                    <span>Inspect Cluster Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Deep-Dive (6 cols) */}
        <div className="lg:col-span-6">
          {selectedCluster ? (
            <div className="bg-[#112318] border border-[#4CAF75]/30 rounded-3xl p-6 shadow-xl space-y-5 sticky top-20">
              <div>
                <span className="text-xs font-mono text-[#F57C00] uppercase tracking-wider font-semibold">
                  Systemic Challenge Specification
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#F0EDE6] mt-1 leading-snug">
                  {selectedCluster.title}
                </h3>
                <p className="text-xs text-[#8FA89E] mt-2 bg-[#0A1A14] p-3 rounded-xl border border-[#4CAF75]/15 leading-relaxed">
                  {selectedCluster.representativeProblemDescription}
                </p>
              </div>

              {/* Geographic Reach */}
              <div className="p-4 rounded-2xl bg-[#0A1A14] border border-[#4CAF75]/20 space-y-2">
                <span className="text-[10px] font-mono text-[#8FA89E] uppercase block font-semibold">
                  Affected Gram Panchayats & Villages in {selectedCluster.district}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCluster.villagesAffected.map(v => (
                    <span
                      key={v}
                      className="text-xs font-medium bg-[#1A3328] text-[#9EDDB4] px-2.5 py-1 rounded-lg border border-[#4CAF75]/20"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deduplication Benefit Explainer */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A3328] to-[#0A1A14] border border-[#4CAF75]/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF9A30]" />
                  <h4 className="font-display font-bold text-xs text-[#F0EDE6]">
                    1 Unified Deployment = {selectedCluster.problemCount} Problems Solved
                  </h4>
                </div>
                <p className="text-[11px] text-[#8FA89E] leading-relaxed">
                  Instead of funding 47 isolated repairs, the platform routes a modular filtration blueprint to NIT Jamshedpur with ₹7.5L Tata Steel CSR co-funding, simultaneously updating all {selectedCluster.problemCount} citizen tracking numbers.
                </p>
              </div>

              {/* Action Button */}
              <button
                id="btn-dispatch-cluster"
                onClick={() =>
                  onDispatchClusterProject(selectedCluster.id, 'NIT Jamshedpur')
                }
                className="w-full py-3 px-4 rounded-xl bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Launch Master Project for {selectedCluster.problemCount} Aggregated Submissions</span>
              </button>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#112318] rounded-3xl border border-[#4CAF75]/15 text-[#8FA89E]">
              Select a cluster
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
