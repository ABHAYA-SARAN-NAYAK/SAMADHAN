import React, { useState } from 'react';
import { JHARKHAND_DISTRICTS, JHARKHAND_DOMAINS } from '../data/constants';
import { MapPin, AlertTriangle, CheckCircle, TrendingUp, Filter } from 'lucide-react';

interface JharkhandMapProps {
  selectedDistrict: string | null;
  onSelectDistrict: (districtName: string | null) => void;
  metric?: 'problems' | 'urgency' | 'resolution';
}

// Spatial grid coordinates and SVG layout approximations for 24 Jharkhand districts
// (Preserves exact geographical topology: NW Garhwa/Palamu -> North Chatra/Hazaribagh/Koderma/Giridih -> East Santhal Pargana -> South Kolhan -> Central Ranchi)
const DISTRICT_MAP_COORDS: Record<string, { x: number; y: number; w: number; h: number; path: string }> = {
  Garhwa: {
    x: 40,
    y: 60,
    w: 80,
    h: 90,
    path: 'M 40,75 L 75,50 L 105,70 L 95,130 L 50,140 Z'
  },
  Palamu: {
    x: 90,
    y: 100,
    w: 90,
    h: 80,
    path: 'M 95,75 L 150,80 L 165,145 L 110,155 L 95,130 Z'
  },
  Chatra: {
    x: 160,
    y: 70,
    w: 80,
    h: 80,
    path: 'M 155,75 L 220,65 L 235,130 L 175,145 L 160,80 Z'
  },
  Hazaribagh: {
    x: 230,
    y: 90,
    w: 85,
    h: 85,
    path: 'M 225,65 L 290,80 L 305,150 L 240,155 L 230,130 Z'
  },
  Koderma: {
    x: 280,
    y: 40,
    w: 70,
    h: 60,
    path: 'M 285,45 L 340,40 L 350,95 L 290,95 Z'
  },
  Giridih: {
    x: 340,
    y: 70,
    w: 95,
    h: 85,
    path: 'M 345,45 L 420,65 L 430,135 L 355,140 L 345,95 Z'
  },
  Deoghar: {
    x: 420,
    y: 60,
    w: 75,
    h: 75,
    path: 'M 425,65 L 485,55 L 495,115 L 435,135 Z'
  },
  Dumka: {
    x: 490,
    y: 80,
    w: 80,
    h: 85,
    path: 'M 490,60 L 560,75 L 565,145 L 500,150 L 490,115 Z'
  },
  Godda: {
    x: 520,
    y: 35,
    w: 75,
    h: 65,
    path: 'M 515,40 L 580,30 L 590,90 L 530,95 Z'
  },
  Sahebganj: {
    x: 580,
    y: 20,
    w: 80,
    h: 65,
    path: 'M 580,30 L 645,20 L 655,80 L 590,90 Z'
  },
  Pakur: {
    x: 580,
    y: 80,
    w: 75,
    h: 70,
    path: 'M 585,85 L 650,80 L 640,150 L 575,145 Z'
  },
  Jamtara: {
    x: 440,
    y: 135,
    w: 70,
    h: 60,
    path: 'M 435,135 L 500,145 L 490,195 L 430,185 Z'
  },
  Dhanbad: {
    x: 370,
    y: 145,
    w: 75,
    h: 65,
    path: 'M 360,145 L 430,140 L 420,200 L 355,195 Z'
  },
  Bokaro: {
    x: 300,
    y: 160,
    w: 75,
    h: 65,
    path: 'M 305,155 L 365,150 L 355,210 L 295,205 Z'
  },
  Ramgarh: {
    x: 270,
    y: 170,
    w: 60,
    h: 55,
    path: 'M 270,165 L 310,160 L 305,215 L 265,210 Z'
  },
  Latehar: {
    x: 120,
    y: 155,
    w: 80,
    h: 80,
    path: 'M 115,155 L 185,150 L 195,220 L 130,225 Z'
  },
  Lohardaga: {
    x: 160,
    y: 210,
    w: 60,
    h: 55,
    path: 'M 160,210 L 210,205 L 205,255 L 155,250 Z'
  },
  Ranchi: {
    x: 220,
    y: 200,
    w: 90,
    h: 75,
    path: 'M 215,205 L 295,200 L 285,270 L 210,265 Z'
  },
  Gumla: {
    x: 120,
    y: 235,
    w: 85,
    h: 80,
    path: 'M 125,230 L 195,235 L 185,310 L 115,300 Z'
  },
  Khunti: {
    x: 220,
    y: 270,
    w: 70,
    h: 65,
    path: 'M 215,265 L 280,260 L 270,325 L 210,320 Z'
  },
  Simdega: {
    x: 120,
    y: 310,
    w: 85,
    h: 80,
    path: 'M 120,305 L 190,315 L 180,380 L 110,370 Z'
  },
  'West Singhbhum': {
    x: 210,
    y: 330,
    w: 110,
    h: 90,
    path: 'M 205,325 L 295,320 L 285,410 L 195,400 Z'
  },
  'Seraikela-Kharsawan': {
    x: 285,
    y: 270,
    w: 85,
    h: 70,
    path: 'M 285,265 L 360,260 L 350,330 L 280,325 Z'
  },
  'East Singhbhum': {
    x: 350,
    y: 280,
    w: 85,
    h: 80,
    path: 'M 355,265 L 425,275 L 415,350 L 345,340 Z'
  }
};

export const JharkhandMap: React.FC<JharkhandMapProps> = ({
  selectedDistrict,
  onSelectDistrict,
  metric = 'urgency'
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const getDistrictColor = (districtName: string) => {
    const d = JHARKHAND_DISTRICTS.find(item => item.name === districtName);
    if (!d) return '#1A3328';

    if (metric === 'urgency') {
      if (d.urgencyAverage >= 80) return '#EF4444'; // Red
      if (d.urgencyAverage >= 68) return '#F57C00'; // Saffron
      if (d.urgencyAverage >= 58) return '#EAB308'; // Amber
      return '#4CAF75'; // Green
    } else if (metric === 'problems') {
      if (d.problemCount >= 55) return '#EF4444';
      if (d.problemCount >= 40) return '#F57C00';
      if (d.problemCount >= 30) return '#EAB308';
      return '#4CAF75';
    } else {
      const rate = d.resolvedCount / d.problemCount;
      if (rate >= 0.5) return '#4CAF75';
      if (rate >= 0.35) return '#EAB308';
      return '#EF4444';
    }
  };

  const activeDistrictInfo = JHARKHAND_DISTRICTS.find(
    d => d.name === (hoveredDistrict || selectedDistrict)
  );

  return (
    <div className="relative w-full bg-[#112318] border border-[#4CAF75]/25 rounded-2xl p-4 md:p-6 shadow-xl">
      {/* Map Header with Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#4CAF75]/15">
        <div>
          <h3 className="font-display font-bold text-base text-[#F0EDE6] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F57C00]" />
            <span>Jharkhand Geospatial Problem Density</span>
          </h3>
          <p className="text-xs text-[#8FA89E]">
            Real-time telemetry across 24 administrative districts • Click any district to inspect
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#8FA89E]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#EF4444]" />
            <span>Critical / High Density</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#F57C00]" />
            <span>Urgent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#EAB308]" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#4CAF75]" />
            <span>Managed / Low</span>
          </div>
        </div>
      </div>

      {/* Main SVG Grid & Interactive Map */}
      <div className="relative flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full lg:w-3/5 aspect-[16/11] max-w-[680px]">
          <svg
            viewBox="0 0 680 430"
            className="w-full h-full filter drop-shadow-lg select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background State Contour Outline */}
            <path
              d="M 30,65 L 140,40 L 260,35 L 360,35 L 480,25 L 650,15 L 665,90 L 650,160 L 510,195 L 440,210 L 430,280 L 420,360 L 350,355 L 290,420 L 180,410 L 100,380 L 105,300 L 35,150 Z"
              fill="none"
              stroke="#4CAF75"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />

            {/* Render each District Polygon */}
            {Object.entries(DISTRICT_MAP_COORDS).map(([name, geom]) => {
              const color = getDistrictColor(name);
              const isSelected = selectedDistrict === name;
              const isHovered = hoveredDistrict === name;
              const distData = JHARKHAND_DISTRICTS.find(d => d.name === name);

              // Center coordinates for label
              const centerX = geom.x + geom.w / 2;
              const centerY = geom.y + geom.h / 2;

              return (
                <g
                  key={name}
                  id={`map-district-${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredDistrict(name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => onSelectDistrict(selectedDistrict === name ? null : name)}
                >
                  <path
                    d={geom.path}
                    fill={color}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.45}
                    stroke={isSelected ? '#FF9A30' : isHovered ? '#F0EDE6' : 'rgba(76, 175, 117, 0.4)'}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                    className="transition-all duration-200"
                  />

                  {/* Pulsing indicator for top critical districts like Garhwa */}
                  {name === 'Garhwa' && (
                    <circle
                      cx={centerX - 5}
                      cy={centerY - 5}
                      r="6"
                      fill="#EF4444"
                      className="animate-ping"
                      opacity="0.75"
                    />
                  )}

                  {/* District Abbreviation/Label */}
                  <text
                    x={centerX}
                    y={centerY - 2}
                    textAnchor="middle"
                    fill="#F0EDE6"
                    fontSize="9"
                    fontWeight={isSelected || isHovered ? '700' : '600'}
                    className="pointer-events-none font-display tracking-tight"
                  >
                    {name.length > 9 ? name.substring(0, 7) + '.' : name}
                  </text>

                  {/* Problem count pill */}
                  <text
                    x={centerX}
                    y={centerY + 9}
                    textAnchor="middle"
                    fill={isHovered || isSelected ? '#FFFFFF' : '#8FA89E'}
                    fontSize="8"
                    fontFamily="monospace"
                    className="pointer-events-none"
                  >
                    {distData?.problemCount} probs
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* District Detail Card Sidebar */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between p-4 bg-[#0A1A14] border border-[#4CAF75]/20 rounded-xl">
          {activeDistrictInfo ? (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#F57C00] uppercase tracking-wider">
                    District Telemetry
                  </span>
                  <h4 className="font-display font-extrabold text-xl text-[#F0EDE6]">
                    {activeDistrictInfo.name}
                  </h4>
                  <p className="text-xs text-[#8FA89E]">HQ: {activeDistrictInfo.headquarters}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                      activeDistrictInfo.urgencyAverage >= 80
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    Urgency: {activeDistrictInfo.urgencyAverage}/100
                  </span>
                </div>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#112318] border border-[#4CAF75]/15">
                  <span className="text-[#8FA89E] text-[11px]">Total Submissions</span>
                  <p className="font-mono font-bold text-lg text-[#F0EDE6]">
                    {activeDistrictInfo.problemCount}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#112318] border border-[#4CAF75]/15">
                  <span className="text-[#8FA89E] text-[11px]">Solutions Deployed</span>
                  <p className="font-mono font-bold text-lg text-[#4CAF75]">
                    {activeDistrictInfo.resolvedCount} ({Math.round((activeDistrictInfo.resolvedCount / activeDistrictInfo.problemCount) * 100)}%)
                  </p>
                </div>
              </div>

              {/* Primary Domain Alert */}
              <div className="p-2.5 rounded-lg bg-[#1A3328] border border-[#4CAF75]/25 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {JHARKHAND_DOMAINS.find(d => d.key === activeDistrictInfo.topDomain)?.icon || '💧'}
                  </span>
                  <div>
                    <span className="text-[10px] text-[#8FA89E] block">Top Domain Pressure</span>
                    <span className="font-semibold text-xs text-[#F0EDE6]">
                      {JHARKHAND_DOMAINS.find(d => d.key === activeDistrictInfo.topDomain)?.name}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#6DC98D] bg-[#4CAF75]/15 px-2 py-0.5 rounded">
                  {activeDistrictInfo.blocks.length} Blocks
                </span>
              </div>

              {/* Key Blocks */}
              <div>
                <span className="text-[10px] font-mono text-[#8FA89E] uppercase block mb-1">
                  Key Administrative Blocks
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeDistrictInfo.blocks.map(b => (
                    <span
                      key={b}
                      className="text-[11px] bg-[#112318] text-[#8FA89E] px-2 py-0.5 rounded border border-[#4CAF75]/15"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Filter CTA */}
              <button
                id="btn-filter-district"
                onClick={() => onSelectDistrict(activeDistrictInfo.name)}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-[#F57C00] hover:bg-[#FF9A30] text-[#0A1A14] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>
                  {selectedDistrict === activeDistrictInfo.name
                    ? 'Clear District Filter'
                    : `View ${activeDistrictInfo.problemCount} Problems in ${activeDistrictInfo.name}`}
                </span>
              </button>
            </div>
          ) : (
            <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-4">
              <MapPin className="w-8 h-8 text-[#4CAF75]/40 mb-2 animate-bounce" />
              <h5 className="font-display font-semibold text-sm text-[#F0EDE6]">Hover or Tap a District</h5>
              <p className="text-xs text-[#8FA89E] mt-1 max-w-[220px]">
                Explore ground realities, problem clusters, and active university deployments across Jharkhand.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
