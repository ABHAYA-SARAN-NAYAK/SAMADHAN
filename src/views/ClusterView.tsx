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
    <div className="space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE6DE]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF0E0] border border-[#F57C00]/30 text-xs font-bold text-[#D4600A] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" />
            SEMANTIC DEDUPLICATION & CLUSTERING ENGINE
          </div>
          <h2 className="font-display font-bold text-3xl text-[#1C1410]">
            Aggregated Problem Hotspots
          </h2>
          <p className="text-sm text-[#7A6355] mt-0.5">
            AI merges duplicate individual grievances into high-impact systemic challenges across Jharkhand.
          </p>
        </div>

        <div className="text-xs bg-white px-4 py-2.5 rounded-2xl border border-[#EDE6DE] text-[#7A6355] shadow-2xs">
          Active Clusters: <strong className="text-[#2E7D52] font-mono">{clusters.length}</strong> • Aggregated Reports:{' '}
          <strong className="text-[#D4600A] font-mono">
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
                    ? 'bg-[#FEF0E0] border-[#F57C00] shadow-sm ring-2 ring-[#F57C00]/20'
                    : 'bg-white border-[#EDE6DE] hover:border-[#BFB0A3]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{domainMeta?.icon || '💧'}</span>
                    <div>
                      <span className="text-xs font-bold text-[#F57C00] uppercase tracking-wider block">
                        {domainMeta?.name}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#1C1410] leading-snug">
                        {c.title}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      c.urgencyAverage >= 80 ? 'bg-[#FCE8E6] text-[#C5221F]' : 'bg-[#FEF0E0] text-[#D4600A]'
                    }`}
                  >
                    Urgency {c.urgencyAverage}/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-[#FDF9F4] rounded-xl border border-[#EDE6DE]">
                    <span className="text-xs text-[#7A6355] block">Reports Merged</span>
                    <span className="font-mono font-bold text-sm text-[#D4600A]">{c.problemCount} Reports</span>
                  </div>
                  <div className="p-2.5 bg-[#FDF9F4] rounded-xl border border-[#EDE6DE]">
                    <span className="text-xs text-[#7A6355] block">Villages Affected</span>
                    <span className="font-mono font-bold text-sm text-[#1C1410]">{c.villagesAffected.length} Panchayats</span>
                  </div>
                  <div className="p-2.5 bg-[#FDF9F4] rounded-xl border border-[#EDE6DE]">
                    <span className="text-xs text-[#7A6355] block">Estimated Pop</span>
                    <span className="font-mono font-bold text-sm text-[#2E7D52]">
                      {c.estimatedAffectedPop?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EDE6DE] text-[#7A6355]">
                  <span className="flex items-center gap-1 font-medium text-[#1C1410]">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                    {c.district} District
                  </span>
                  <span className="text-xs font-bold text-[#2E7D52] flex items-center gap-1">
                    <span>Inspect Cluster Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Deep-Dive (6 cols) */}
        <div className="lg:col-span-6">
          {selectedCluster ? (
            <div className="bg-white border border-[#EDE6DE] rounded-[24px] p-6 shadow-sm space-y-5 sticky top-20">
              <div>
                <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider block">
                  Systemic Challenge Specification
                </span>
                <h3 className="font-display font-bold text-2xl text-[#1C1410] mt-1 leading-snug">
                  {selectedCluster.title}
                </h3>
                <p className="text-xs text-[#4A3728] mt-2 bg-[#FDF9F4] p-3.5 rounded-xl border border-[#EDE6DE] leading-relaxed">
                  {selectedCluster.representativeProblemDescription}
                </p>
              </div>

              {/* Geographic Reach */}
              <div className="p-4 rounded-2xl bg-[#FDF9F4] border border-[#EDE6DE] space-y-2">
                <span className="text-xs font-bold text-[#7A6355] uppercase block">
                  Affected Gram Panchayats & Villages in {selectedCluster.district}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCluster.villagesAffected.map(v => (
                    <span
                      key={v}
                      className="text-xs font-semibold bg-white text-[#2E7D52] px-2.5 py-1 rounded-lg border border-[#EDE6DE] shadow-2xs"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deduplication Benefit Explainer */}
              <div className="p-4 rounded-2xl bg-[#FEF0E0]/60 border border-[#F57C00]/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4600A]" />
                  <h4 className="font-display font-bold text-sm text-[#1C1410]">
                    1 Unified Deployment = {selectedCluster.problemCount} Problems Solved
                  </h4>
                </div>
                <p className="text-xs text-[#7A6355] leading-relaxed">
                  Instead of funding 47 isolated repairs, the platform routes a modular filtration blueprint to NIT Jamshedpur with ₹7.5L Tata Steel CSR co-funding, simultaneously updating all {selectedCluster.problemCount} citizen tracking numbers.
                </p>
              </div>

              {/* Action Button */}
              <button
                id="btn-dispatch-cluster"
                onClick={() =>
                  onDispatchClusterProject(selectedCluster.id, 'NIT Jamshedpur')
                }
                className="w-full py-3 px-4 rounded-xl bg-[#F57C00] hover:bg-[#D4600A] text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Launch Master Project for {selectedCluster.problemCount} Aggregated Submissions</span>
              </button>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-[24px] border border-[#EDE6DE] text-[#7A6355]">
              Select a cluster
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
