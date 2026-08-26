import React, { useState, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  ControlPosition,
  MapControl
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Compass,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Search,
  Eye,
  Info
} from 'lucide-react';
import { JHARKHAND_DISTRICTS, JHARKHAND_DOMAINS, JHARKHAND_UNIVERSITIES } from '../data/constants';
import { Problem } from '../types';

interface JharkhandGoogleMapProps {
  problems: Problem[];
  selectedDistrict?: string | null;
  onSelectDistrict?: (district: string | null) => void;
  onSelectProblem?: (problem: Problem) => void;
  height?: string;
  isPickerMode?: boolean;
  onPickLocation?: (coords: { lat: number; lng: number; district?: string }) => void;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
}

// University coordinate lookup helper
const UNI_COORDS: Record<string, { lat: number; lng: number }> = {
  'uni-1': { lat: 22.7770, lng: 86.1441 }, // NIT Jamshedpur
  'uni-2': { lat: 23.4123, lng: 85.4399 }, // BIT Mesra Ranchi
  'uni-3': { lat: 23.8143, lng: 86.4412 }, // IIT (ISM) Dhanbad
  'uni-4': { lat: 23.7915, lng: 86.4300 }, // BIT Sindri Dhanbad
  'uni-5': { lat: 23.3700, lng: 85.3250 }, // Ranchi University
  'uni-6': { lat: 23.9920, lng: 85.3620 }  // VBU Hazaribagh
};

export const JharkhandGoogleMap: React.FC<JharkhandGoogleMapProps> = ({
  problems = [],
  selectedDistrict = null,
  onSelectDistrict,
  onSelectProblem,
  height = '520px',
  isPickerMode = false,
  onPickLocation,
  initialCenter = { lat: 23.6102, lng: 85.2799 }, // Jharkhand center
  initialZoom = 8
}) => {
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';
  
  // Active selected marker for InfoWindow
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [activeUniversity, setActiveUniversity] = useState<any | null>(null);
  const [activeDistrict, setActiveDistrict] = useState<typeof JHARKHAND_DISTRICTS[0] | null>(null);
  
  // Custom pin location for picker mode
  const [pickedLocation, setPickedLocation] = useState<{ lat: number; lng: number }>(initialCenter);
  
  // Map filter states
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'critical' | 'deployed'>('all');
  const [layerType, setLayerType] = useState<'all' | 'problems' | 'universities'>('all');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');

  // Filtered problems based on criteria
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      if (selectedDistrict && p.location.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }
      if (domainFilter !== 'all' && p.aiOutput.domain !== domainFilter) {
        return false;
      }
      if (urgencyFilter === 'critical' && p.aiOutput.urgencyScore < 80) {
        return false;
      }
      if (urgencyFilter === 'deployed' && p.status !== 'deployed' && p.status !== 'resolved') {
        return false;
      }
      return true;
    });
  }, [problems, selectedDistrict, domainFilter, urgencyFilter]);

  // Handle map click for picker mode
  const handleMapClick = (e: any) => {
    if (isPickerMode && e.detail?.latLng) {
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      setPickedLocation({ lat, lng });

      // Find nearest district
      let nearestDist = 'Ranchi';
      let minDistance = Infinity;
      JHARKHAND_DISTRICTS.forEach(d => {
        const dist = Math.hypot(d.lat - lat, d.lng - lng);
        if (dist < minDistance) {
          minDistance = dist;
          nearestDist = d.name;
        }
      });

      onPickLocation?.({ lat, lng, district: nearestDist });
    }
  };

  // Marker pin styling helper
  const getProblemPinColor = (p: Problem) => {
    if (p.status === 'resolved' || p.status === 'deployed') return '#4CAF75'; // Green
    if (p.aiOutput.urgencyScore >= 80) return '#EF4444'; // Red
    if (p.aiOutput.urgencyScore >= 65) return '#F57C00'; // Orange
    return '#EAB308'; // Amber
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#4CAF75]/30 bg-[#0A1A14] shadow-2xl flex flex-col">
      {/* Top Map Action & Filter Bar */}
      <div className="p-3 bg-[#112318] border-b border-[#4CAF75]/20 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A1A14] border border-[#4CAF75]/25">
            <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
            <span className="font-display font-bold text-[#F0EDE6]">
              {isPickerMode ? 'Tap Map to Pin Exact Location' : 'Jharkhand 24-District Interactive Map'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#8FA89E] hidden sm:inline">
            {filteredProblems.length} live telemetry pins
          </span>
        </div>

        {/* Filters */}
        {!isPickerMode && (
          <div className="flex flex-wrap items-center gap-2">
            {/* District Selector */}
            <select
              value={selectedDistrict || ''}
              onChange={e => onSelectDistrict?.(e.target.value || null)}
              className="bg-[#0A1A14] text-[#F0EDE6] border border-[#4CAF75]/30 rounded-lg px-2.5 py-1 text-xs outline-none"
            >
              <option value="">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map(d => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.problemCount} issues)
                </option>
              ))}
            </select>

            {/* Domain Filter */}
            <select
              value={domainFilter}
              onChange={e => setDomainFilter(e.target.value)}
              className="bg-[#0A1A14] text-[#F0EDE6] border border-[#4CAF75]/30 rounded-lg px-2.5 py-1 text-xs outline-none"
            >
              <option value="all">All 10 Domains</option>
              {JHARKHAND_DOMAINS.map(d => (
                <option key={d.key} value={d.key}>
                  {d.icon} {d.name}
                </option>
              ))}
            </select>

            {/* Urgency Filter */}
            <div className="flex items-center bg-[#0A1A14] p-0.5 rounded-lg border border-[#4CAF75]/20">
              <button
                onClick={() => setUrgencyFilter('all')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  urgencyFilter === 'all' ? 'bg-[#F57C00] text-[#0A1A14]' : 'text-[#8FA89E]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setUrgencyFilter('critical')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  urgencyFilter === 'critical' ? 'bg-[#EF4444] text-white' : 'text-[#8FA89E]'
                }`}
              >
                Critical (80+)
              </button>
              <button
                onClick={() => setUrgencyFilter('deployed')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  urgencyFilter === 'deployed' ? 'bg-[#4CAF75] text-[#0A1A14]' : 'text-[#8FA89E]'
                }`}
              >
                Deployed
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Google Maps Viewport with APIProvider */}
      <div style={{ height, width: '100%' }} className="relative bg-[#0d1f16]">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={initialCenter}
            defaultZoom={initialZoom}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapType}
            onClick={handleMapClick}
            gestureHandling="greedy"
            disableDefaultUI={false}
            className="w-full h-full"
          >
            {/* 1. Picked Location Marker (in picker mode) */}
            {isPickerMode && (
              <AdvancedMarker
                position={pickedLocation}
                title="Selected Community Location"
              >
                <Pin
                  background="#F57C00"
                  glyphColor="#0A1A14"
                  borderColor="#FFFFFF"
                  scale={1.3}
                />
              </AdvancedMarker>
            )}

            {/* 2. Problem Markers */}
            {filteredProblems.map(p => {
              const coords = {
                lat: p.location.coordinates?.lat || 23.6102,
                lng: p.location.coordinates?.lng || 85.2799
              };
              const pinColor = getProblemPinColor(p);

              return (
                <AdvancedMarker
                  key={p.id}
                  position={coords}
                  title={p.title}
                  onClick={() => {
                    setActiveProblem(p);
                    setActiveUniversity(null);
                    setActiveDistrict(null);
                  }}
                >
                  <Pin
                    background={pinColor}
                    glyphColor="#FFFFFF"
                    borderColor="#0A1A14"
                    scale={p.aiOutput.urgencyScore >= 85 ? 1.2 : 1.0}
                  />
                </AdvancedMarker>
              );
            })}

            {/* 3. Partner Universities Markers */}
            {JHARKHAND_UNIVERSITIES.map(u => {
              const coords = UNI_COORDS[u.id] || { lat: 23.3441, lng: 85.3096 };
              return (
                <AdvancedMarker
                  key={u.id}
                  position={{ lat: coords.lat, lng: coords.lng }}
                  title={u.name}
                  onClick={() => {
                    setActiveUniversity(u);
                    setActiveProblem(null);
                    setActiveDistrict(null);
                  }}
                >
                  <Pin
                    background="#3B82F6"
                    glyphColor="#FFFFFF"
                    borderColor="#0A1A14"
                    scale={0.9}
                  />
                </AdvancedMarker>
              );
            })}

            {/* 4. Active Problem InfoWindow */}
            {activeProblem && (
              <InfoWindow
                position={{
                  lat: activeProblem.location.coordinates?.lat || 23.6102,
                  lng: activeProblem.location.coordinates?.lng || 85.2799
                }}
                onCloseClick={() => setActiveProblem(null)}
              >
                <div className="p-1 max-w-[260px] text-zinc-900">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                      {activeProblem.problemId}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white ${
                        activeProblem.aiOutput.urgencyScore >= 80 ? 'bg-red-600' : 'bg-amber-600'
                      }`}
                    >
                      Urgency: {activeProblem.aiOutput.urgencyScore}/100
                    </span>
                  </div>

                  <h4 className="font-bold text-xs leading-snug line-clamp-2 text-zinc-900">
                    {activeProblem.title}
                  </h4>

                  <p className="text-[11px] text-zinc-600 mt-1 line-clamp-2">
                    {activeProblem.description}
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-zinc-200 text-[10px] text-zinc-700 space-y-0.5">
                    <div>📍 {activeProblem.location.block}, {activeProblem.location.district}</div>
                    {activeProblem.assignedUniversity && (
                      <div className="text-emerald-700 font-semibold">
                        🏛️ {activeProblem.assignedUniversity.name}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      onSelectProblem?.(activeProblem);
                      setActiveProblem(null);
                    }}
                    className="w-full mt-2 py-1 px-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] transition-colors"
                  >
                    Inspect Problem →
                  </button>
                </div>
              </InfoWindow>
            )}

            {/* 5. Active University InfoWindow */}
            {activeUniversity && (
              <InfoWindow
                position={{ lat: activeUniversity.lat, lng: activeUniversity.lng }}
                onCloseClick={() => setActiveUniversity(null)}
              >
                <div className="p-1 max-w-[240px] text-zinc-900">
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">
                    Partner University Hub
                  </span>
                  <h4 className="font-bold text-xs mt-1 text-zinc-900">
                    {activeUniversity.name}
                  </h4>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    City: {activeUniversity.city} • {activeUniversity.activeProjectCount} Active Capstones
                  </p>
                  <div className="mt-1.5 text-[10px] text-zinc-500">
                    Expertise: {activeUniversity.departments.join(', ')}
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Map Footer Strip with Legend */}
      <div className="p-2.5 bg-[#112318] border-t border-[#4CAF75]/15 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#8FA89E]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span>Critical Grievance (80+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F57C00]" />
            <span>High Urgency (65-79)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF75]" />
            <span>Panchayat Deployed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span>Partner University</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-[#6DC98D]">
          <span>Google Maps Platform Grounded</span>
        </div>
      </div>
    </div>
  );
};
