import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_PROBLEMS,
  INITIAL_CLUSTERS,
  PRELOADED_UNIVERSITIES,
  INITIAL_PROJECTS,
  INITIAL_BOUNTIES,
  INITIAL_PASSPORTS,
  JHARKHAND_DISTRICTS,
  JHARKHAND_DOMAINS
} from './src/data/constants';
import { Problem, ProblemCluster, University, Project, IndustryBounty, ImpactPassportEntry, AppNotification, ProblemDomain } from './src/types';

// Lazy Gemini SDK client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory persistent database state for the session
  let problems: Problem[] = JSON.parse(JSON.stringify(INITIAL_PROBLEMS));
  let clusters: ProblemCluster[] = JSON.parse(JSON.stringify(INITIAL_CLUSTERS));
  let universities: University[] = JSON.parse(JSON.stringify(PRELOADED_UNIVERSITIES));
  let projects: Project[] = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
  let bounties: IndustryBounty[] = JSON.parse(JSON.stringify(INITIAL_BOUNTIES));
  let passports: ImpactPassportEntry[] = JSON.parse(JSON.stringify(INITIAL_PASSPORTS));
  let notifications: AppNotification[] = [
    {
      id: 'notif-1',
      type: 'sms',
      title: 'SMS Sent to Citizen Rameshwar Mahto',
      body: 'समाधान (SAMADHAN): आपका समस्या ID JH-2026-00047 NIT जमशेदपुर को आवंटित कर दी गई है। टीम समाधान पर कार्य कर रही है।',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      read: false,
      meta: { problemId: 'JH-2026-00047', phone: '+91 94311 88204', language: 'hi' }
    },
    {
      id: 'notif-2',
      type: 'push',
      title: 'New High Urgency Problem Matched',
      body: 'NIT Jamshedpur Civil & Env Engg: High urgency fluoride contamination reported in Garhwa (Score: 89/100).',
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      read: true,
      meta: { problemId: 'JH-2026-00047' }
    },
    {
      id: 'notif-3',
      type: 'system',
      title: 'CSR Partnership Connected',
      body: 'Tata Steel CSR Foundation has committed ₹7,50,000 for JH-2026-00047 water filtration pilot.',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      read: false,
      meta: { problemId: 'JH-2026-00047' }
    }
  ];

  let problemCounter = 52;

  // Helper to send in-app + SMS notification
  function triggerNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) {
    const item: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    notifications.unshift(item);
    return item;
  }

  // --- API ROUTES ---

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'SAMADHAN API Server', timestamp: new Date().toISOString() });
  });

  // 1. AI Processing Route (Gemini Integration)
  app.post('/api/ai/process-problem', async (req, res) => {
    try {
      const { text, language = 'hi', district = 'Garhwa', block = '', mediaUrls = [] } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Problem description text is required' });
      }

      const ai = getGeminiClient();
      let aiResult: any = null;

      if (ai) {
        try {
          const prompt = `You are the AI Problem Engine for SAMADHAN (Jharkhand Societal Innovation Platform, SIH 2026).
Analyze this citizen-submitted problem from Jharkhand:
Problem Description: "${text}"
Reported District: "${district}"
Reported Block: "${block}"
Media Attached Count: ${mediaUrls.length}

Available Problem Domains:
1. water_resources (drinking water, handpumps, checkdams, contamination, irrigation)
2. agriculture (crops, pest attacks, post-harvest, storage, seeds, soil)
3. healthcare (PHC, doctors, medicines, diagnostic, maternal, disease)
4. education (schools, tribal languages, dropouts, digital classrooms)
5. sanitation (toilets, waste management, drainage, hygiene)
6. environment (air pollution, coal dust, forest fire, mine voids, deforestation)
7. energy (rural electrification, power outage, transformers, solar pumps)
8. urban_infra (roads, urban drainage, traffic, municipal pipelines)
9. rural_livelihood (tribal crafts, tussar silk, lac cultivation, forest produce, wage labour)
10. governance (PDS ration, biometric, land records, scheme delivery)

Respond strictly with valid JSON conforming to this format:
{
  "domain": "one of the 10 domain keys exactly",
  "confidence": 0.95,
  "detectedLanguage": "hi | en | sa | nagpuri",
  "translatedDescription": "Clear English translation of the issue",
  "autoTitle": "Concise 1-line title (Max 12 words) specifying the problem and location",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "urgencyScore": 88,
  "solvabilityScore": 80,
  "fundabilityScore": 75,
  "compositeScore": 82,
  "severityReason": "Brief 1-sentence reason for urgency (e.g. vulnerable children/elders affected, toxicity, crop harvest window)"
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });

          if (response.text) {
            aiResult = JSON.parse(response.text);
          }
        } catch (genErr) {
          console.warn('Gemini API call failed, falling back to rule-based engine:', genErr);
        }
      }

      // Rule-based fallback if Gemini is offline or not configured
      if (!aiResult) {
        const lower = (text || '').toLowerCase();
        let domain: ProblemDomain = 'water_resources';
        let tags: string[] = [district, 'community issue'];

        if (lower.includes('paani') || lower.includes('water') || lower.includes('handpump') || lower.includes('borewell') || lower.includes('fluoride') || lower.includes('नल') || lower.includes('पानी')) {
          domain = 'water_resources';
          tags.push('drinking water', 'hand pump', 'groundwater');
        } else if (lower.includes('kisan') || lower.includes('farmer') || lower.includes('fasal') || lower.includes('crop') || lower.includes('tomato') || lower.includes('storage') || lower.includes('खेती') || lower.includes('फसल')) {
          domain = 'agriculture';
          tags.push('crop storage', 'farming', 'mandis');
        } else if (lower.includes('doctor') || lower.includes('hospital') || lower.includes('bimar') || lower.includes('health') || lower.includes('phc') || lower.includes('दवा') || lower.includes('अस्पताल')) {
          domain = 'healthcare';
          tags.push('rural healthcare', 'PHC', 'medicine');
        } else if (lower.includes('school') || lower.includes('padhai') || lower.includes('teacher') || lower.includes('student') || lower.includes('शिक्षा') || lower.includes('स्कूल')) {
          domain = 'education';
          tags.push('rural education', 'tribal schools', 'literacy');
        } else if (lower.includes('dust') || lower.includes('pollution') || lower.includes('coal') || lower.includes('ash') || lower.includes('forest') || lower.includes('प्रदूषण')) {
          domain = 'environment';
          tags.push('pollution control', 'environment', 'dust suppression');
        } else if (lower.includes('bijli') || lower.includes('power') || lower.includes('light') || lower.includes('solar') || lower.includes('बिजली')) {
          domain = 'energy';
          tags.push('rural electrification', 'solar microgrid', 'power');
        } else if (lower.includes('toilet') || lower.includes('kachra') || lower.includes('drain') || lower.includes('शौचालय') || lower.includes('कचरा')) {
          domain = 'sanitation';
          tags.push('sanitation', 'solid waste', 'drainage');
        } else if (lower.includes('sadak') || lower.includes('road') || lower.includes('traffic') || lower.includes('सड़क')) {
          domain = 'urban_infra';
          tags.push('road infrastructure', 'drainage', 'civic infra');
        } else if (lower.includes('ration') || lower.includes('pds') || lower.includes('biometric') || lower.includes('राशन')) {
          domain = 'governance';
          tags.push('PDS ration', 'e-governance', 'scheme delivery');
        } else {
          domain = 'rural_livelihood';
          tags.push('tribal livelihood', 'artisan', 'value-addition');
        }

        const urgencyScore = Math.min(95, Math.max(55, 70 + (mediaUrls.length > 0 ? 10 : 0) + (district === 'Garhwa' || district === 'Latehar' || district === 'Pakur' ? 12 : 5)));
        const solvabilityScore = 78;
        const fundabilityScore = 74;
        const compositeScore = Math.round((urgencyScore * 0.45) + (solvabilityScore * 0.3) + (fundabilityScore * 0.25));

        aiResult = {
          domain,
          confidence: 0.94,
          detectedLanguage: language,
          translatedDescription: text,
          autoTitle: `${JHARKHAND_DOMAINS.find(d => d.key === domain)?.name || 'Civic'} issue in ${block || 'rural'}, ${district}`,
          tags,
          urgencyScore,
          solvabilityScore,
          fundabilityScore,
          compositeScore,
          severityReason: 'High community vulnerability reported with persistent service disruption.'
        };
      }

      // Check for deduplication / cluster matching in same district + domain
      const existingCluster = clusters.find(
        c => c.district.toLowerCase() === district.toLowerCase() && c.domain === aiResult.domain
      );

      if (existingCluster) {
        aiResult.clusterGroupId = existingCluster.id;
        aiResult.isDuplicate = false; // It augments the cluster
      }

      res.json({ data: aiResult });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'AI processing failed' });
    }
  });

  // 2. AI University Matching Algorithm
  app.post('/api/ai/match-university', (req, res) => {
    const { domain, district = 'Garhwa', urgencyScore = 80 } = req.body;

    const scored = universities.map(u => {
      let score = 0;
      const reasons: string[] = [];

      // Domain expertise match
      if (u.expertise.includes(domain)) {
        score += 40;
        const dept = u.departments.find(d => d.domains.includes(domain));
        reasons.push(`${dept ? dept.name : 'Specialized Department'} with ${domain.replace('_', ' ')} expertise`);
      }

      // Proximity
      if (u.state === 'Jharkhand') {
        score += 15;
        reasons.push('Located within Jharkhand state jurisdiction for direct field deployment');
      }

      // Track record & resolution rate
      score += Math.round(u.successRate * 25);
      reasons.push(`${Math.round(u.successRate * 100)}% project resolution success rate across ${u.totalProjectsCompleted} past civic interventions`);

      // Current workload capacity
      const loadPenalty = (u.activeProjectCount / 6) * 20;
      score += Math.max(0, Math.round(20 - loadPenalty));
      reasons.push(`Currently handling ${u.activeProjectCount} active projects (optimal faculty bandwith)`);

      // Find relevant faculty
      const relevantFaculty = u.facultyProfiles.map(f => `${f.name} (${f.specialization})`);

      return {
        universityId: u.id,
        name: u.name,
        shortCode: u.shortCode,
        city: u.city,
        matchScore: Math.min(99, score),
        reasons,
        availableFaculty: relevantFaculty
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    res.json({ data: { recommendations: scored.slice(0, 3) } });
  });

  // 3. Problem APIs
  app.get('/api/problems', (req, res) => {
    const { domain, district, status, priority, search } = req.query;
    let filtered = [...problems];

    if (domain) {
      filtered = filtered.filter(p => p.aiOutput?.domain === domain);
    }
    if (district) {
      filtered = filtered.filter(p => p.location?.district.toLowerCase() === (district as string).toLowerCase());
    }
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    if (priority) {
      filtered = filtered.filter(p => p.priority === priority);
    }
    if (search) {
      const q = (search as string).toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.problemId.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q)
      );
    }

    res.json({ data: filtered, count: filtered.length });
  });

  app.get('/api/problems/:id', (req, res) => {
    const prob = problems.find(p => p.id === req.params.id || p.problemId === req.params.id);
    if (!prob) return res.status(404).json({ error: 'Problem not found' });
    res.json({ data: prob });
  });

  app.post('/api/problems', (req, res) => {
    const body = req.body;
    problemCounter += 1;
    const padNum = String(problemCounter).padStart(5, '0');
    const newProblemId = `JH-2026-${padNum}`;

    const newProblem: Problem = {
      id: `prob-${Date.now()}`,
      problemId: newProblemId,
      title: body.title || `Community problem in ${body.location?.district || 'Jharkhand'}`,
      description: body.description || '',
      voiceTranscript: body.voiceTranscript,
      originalLanguage: body.originalLanguage || 'hi',
      translatedDescription: body.translatedDescription || body.description,
      submittedBy: body.submittedBy || { name: 'Citizen Reporter', role: 'CITIZEN' },
      submittedAt: new Date().toISOString(),
      location: body.location || {
        district: 'Garhwa',
        block: 'Meral',
        panchayat: 'Bhoura',
        coordinates: { lat: 24.16, lng: 83.82 },
        addressText: 'Reported via SAMADHAN mobile app'
      },
      media: body.media || [],
      aiOutput: body.aiOutput || {
        domain: 'water_resources',
        confidence: 0.92,
        urgencyScore: 85,
        solvabilityScore: 78,
        fundabilityScore: 70,
        compositeScore: 81,
        tags: [body.location?.district || 'Garhwa', 'public problem'],
        autoTitle: `Reported issue in ${body.location?.district || 'Jharkhand'}`
      },
      status: 'submitted',
      priority: (body.aiOutput?.urgencyScore > 85 ? 'critical' : body.aiOutput?.urgencyScore > 70 ? 'high' : 'medium') as any
    };

    problems.unshift(newProblem);

    // Update cluster if matching
    const matchedCluster = clusters.find(
      c => c.district.toLowerCase() === newProblem.location.district.toLowerCase() && c.domain === newProblem.aiOutput.domain
    );
    if (matchedCluster) {
      matchedCluster.problemCount += 1;
      matchedCluster.problemIds.push(newProblem.id);
      newProblem.aiOutput.clusterGroupId = matchedCluster.id;
    } else {
      // Create new cluster
      const newCluster: ProblemCluster = {
        id: `cluster-${Date.now()}`,
        domain: newProblem.aiOutput.domain,
        district: newProblem.location.district,
        block: newProblem.location.block,
        clusterLabel: `${JHARKHAND_DOMAINS.find(d => d.key === newProblem.aiOutput.domain)?.name} cluster — ${newProblem.location.block || newProblem.location.district}`,
        problemCount: 1,
        problemIds: [newProblem.id],
        compositeUrgencyScore: newProblem.aiOutput.urgencyScore,
        createdAt: new Date().toISOString(),
        masterProblemId: newProblem.id,
        status: 'unassigned',
        affectedPopulationEstimate: 1200
      };
      clusters.push(newCluster);
      newProblem.aiOutput.clusterGroupId = newCluster.id;
    }

    // Trigger confirmation SMS & notification
    triggerNotification({
      type: 'sms',
      title: `SMS to ${newProblem.submittedBy.name} (${newProblem.submittedBy.phone || 'Phone'})`,
      body: `समाधान: आपका समस्या ID ${newProblem.problemId} प्राप्त हुआ है। AI ने इसे "${JHARKHAND_DOMAINS.find(d => d.key === newProblem.aiOutput.domain)?.hindiName}" के रूप में वर्गीकृत किया है। हम विश्वविद्यालय टीम आवंटित होने पर सूचित करेंगे।`,
      meta: { problemId: newProblem.problemId, phone: newProblem.submittedBy.phone, language: newProblem.originalLanguage }
    });

    triggerNotification({
      type: 'system',
      title: 'New Problem Submitted',
      body: `${newProblem.title} in ${newProblem.location.district} (Urgency: ${newProblem.aiOutput.urgencyScore}/100)`,
      link: `/citizen/problem/${newProblem.id}`,
      meta: { problemId: newProblem.problemId }
    });

    res.status(201).json({ data: newProblem });
  });

  app.patch('/api/problems/:id/status', (req, res) => {
    const { status, adminNotes } = req.body;
    const prob = problems.find(p => p.id === req.params.id || p.problemId === req.params.id);
    if (!prob) return res.status(404).json({ error: 'Problem not found' });

    prob.status = status;
    if (adminNotes !== undefined) prob.adminNotes = adminNotes;

    res.json({ data: prob });
  });

  // Assign problem to university & create/link project
  app.post('/api/problems/:id/assign', (req, res) => {
    const { universityId, leadFacultyName, projectTitle, expectedEndDate } = req.body;
    const prob = problems.find(p => p.id === req.params.id || p.problemId === req.params.id);
    if (!prob) return res.status(404).json({ error: 'Problem not found' });

    const uni = universities.find(u => u.id === universityId) || universities[0];

    prob.status = 'assigned';
    prob.assignedUniversity = {
      id: uni.id,
      name: uni.name,
      department: uni.departments[0]?.name || 'Engineering',
      leadFaculty: leadFacultyName || uni.facultyProfiles[0]?.name || 'Dr. Faculty Lead'
    };
    prob.assignedAt = new Date().toISOString();

    // Create project
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      problemId: prob.id,
      problemRef: prob,
      universityId: uni.id,
      universityName: uni.name,
      title: projectTitle || `Intervention: ${prob.title}`,
      status: 'active',
      leadFaculty: {
        id: 'fac-assigned',
        name: leadFacultyName || uni.facultyProfiles[0]?.name || 'Dr. Lead Faculty',
        department: uni.departments[0]?.name || 'Engineering'
      },
      team: [
        { id: 'tm-lead', name: 'Abhaya Saran', role: 'student_lead', email: 'abhayasaran2005@gmail.com', department: 'Applied Tech', abcCreditsEarned: 4 },
        { id: 'tm-sub', name: 'Riya Murmu', role: 'researcher', email: 'riya.m@university.ac.in', department: 'Field Operations', abcCreditsEarned: 3 }
      ],
      startDate: new Date().toISOString().split('T')[0],
      expectedEndDate: expectedEndDate || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      milestones: [
        { id: 'ms-1', title: 'Site Inspection & Baseline Chemical/Technical Assay', description: 'Comprehensive baseline data gathering in the target panchayat.', dueDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0], status: 'in_progress' },
        { id: 'ms-2', title: 'Modular Solution Fabrication & Lab Testing', description: 'Build and validate low-cost prototype hardware/software.', dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], status: 'pending' },
        { id: 'ms-3', title: 'Field Deployment & Community Training', description: 'Install equipment on-site and train local panchayat operators.', dueDate: new Date(Date.now() + 50 * 86400000).toISOString().split('T')[0], status: 'pending' },
        { id: 'ms-4', title: 'Impact Verification & ABC Credits Endorsement', description: 'Final inspection, citizen rating collection, and credit signoff.', dueDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0], status: 'pending' }
      ],
      industryPartners: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.unshift(newProject);
    prob.projectId = newProject.id;
    uni.activeProjectCount += 1;

    // Send SMS notification
    triggerNotification({
      type: 'sms',
      title: `SMS Sent to ${prob.submittedBy.name}`,
      body: `समाधान: आपकी समस्या ${prob.problemId} पर ${uni.name} की टीम ने कार्य शुरू कर दिया है। लीड: ${prob.assignedUniversity.leadFaculty}`,
      meta: { problemId: prob.problemId, phone: prob.submittedBy.phone, language: prob.originalLanguage }
    });

    res.json({ data: { problem: prob, project: newProject } });
  });

  // Citizen Rating
  app.post('/api/problems/:id/rate', (req, res) => {
    const { rating, feedback } = req.body;
    const prob = problems.find(p => p.id === req.params.id || p.problemId === req.params.id);
    if (!prob) return res.status(404).json({ error: 'Problem not found' });

    prob.citizenRating = rating;
    prob.citizenFeedback = feedback;
    prob.status = 'resolved';
    prob.resolvedAt = new Date().toISOString();

    // Trigger resolution notification
    triggerNotification({
      type: 'sms',
      title: `Citizen Rating Received for ${prob.problemId}`,
      body: `Citizen ${prob.submittedBy.name} rated the resolution ${rating} ★ stars: "${feedback || 'Satisfied with the outcome'}"`,
      meta: { problemId: prob.problemId }
    });

    res.json({ data: prob });
  });

  // 4. Clusters API
  app.get('/api/problems/clusters', (req, res) => {
    res.json({ data: clusters });
  });

  app.get('/api/problems/clusters/:id', (req, res) => {
    const cl = clusters.find(c => c.id === req.params.id);
    if (!cl) return res.status(404).json({ error: 'Cluster not found' });
    const memberProblems = problems.filter(p => cl.problemIds.includes(p.id) || p.aiOutput?.clusterGroupId === cl.id);
    res.json({ data: { ...cl, problems: memberProblems } });
  });

  // 5. Projects API
  app.get('/api/projects', (req, res) => {
    const { universityId, status } = req.query;
    let filtered = [...projects];
    if (universityId) {
      filtered = filtered.filter(p => p.universityId === universityId);
    }
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    res.json({ data: filtered });
  });

  app.get('/api/projects/:id', (req, res) => {
    const proj = projects.find(p => p.id === req.params.id);
    if (!proj) return res.status(404).json({ error: 'Project not found' });
    res.json({ data: proj });
  });

  app.post('/api/projects/:id/milestones', (req, res) => {
    const { title, description, dueDate, status } = req.body;
    const proj = projects.find(p => p.id === req.params.id);
    if (!proj) return res.status(404).json({ error: 'Project not found' });

    const newMs = {
      id: `ms-${Date.now()}`,
      title,
      description,
      dueDate,
      status: status || 'pending'
    };
    proj.milestones.push(newMs);
    proj.updatedAt = new Date().toISOString();
    res.json({ data: proj });
  });

  app.patch('/api/projects/:id/milestones/:mid', (req, res) => {
    const { status } = req.body;
    const proj = projects.find(p => p.id === req.params.id);
    if (!proj) return res.status(404).json({ error: 'Project not found' });

    const ms = proj.milestones.find(m => m.id === req.params.mid);
    if (!ms) return res.status(404).json({ error: 'Milestone not found' });

    ms.status = status;
    if (status === 'completed') {
      ms.completedAt = new Date().toISOString();
    }
    proj.updatedAt = new Date().toISOString();
    res.json({ data: proj });
  });

  app.post('/api/projects/:id/team', (req, res) => {
    const { name, role, email, department, abcCreditsEarned = 3 } = req.body;
    const proj = projects.find(p => p.id === req.params.id);
    if (!proj) return res.status(404).json({ error: 'Project not found' });

    const newMember = {
      id: `tm-${Date.now()}`,
      name,
      role: role || 'student_lead',
      email,
      department,
      abcCreditsEarned
    };
    proj.team.push(newMember);
    res.json({ data: proj });
  });

  // 6. Universities API
  app.get('/api/universities', (req, res) => {
    res.json({ data: universities });
  });

  app.get('/api/universities/:id/inbox', (req, res) => {
    const uni = universities.find(u => u.id === req.params.id) || universities[0];
    const assigned = problems.filter(p => p.assignedUniversity?.id === uni.id);
    const recommended = problems.filter(
      p => !p.assignedUniversity && uni.expertise.includes(p.aiOutput?.domain)
    );
    res.json({ data: { assigned, recommended, university: uni } });
  });

  // 7. Industry Marketplace & Bounties
  app.get('/api/industry/marketplace', (req, res) => {
    const available = problems.filter(p => p.status !== 'rejected');
    res.json({ data: available });
  });

  app.get('/api/industry/bounties', (req, res) => {
    res.json({ data: bounties });
  });

  app.post('/api/industry/bounties', (req, res) => {
    const { industryName, problemId, type, amountInr, description, targetDpeSchedule } = req.body;
    const prob = problems.find(p => p.id === problemId || p.problemId === problemId);

    const newBounty: IndustryBounty = {
      id: `bounty-${Date.now()}`,
      industryId: `ind-${Date.now()}`,
      industryName: industryName || 'CSR Partner',
      problemId: prob ? prob.id : problemId,
      problemTitle: prob ? prob.title : 'Community Problem',
      domain: prob ? prob.aiOutput.domain : 'water_resources',
      district: prob ? prob.location.district : 'Garhwa',
      type: type || 'csr_fund',
      amountInr: amountInr || 500000,
      status: 'accepted',
      description: description || 'CSR co-funding committed for pilot deployment',
      createdAt: new Date().toISOString(),
      targetDpeSchedule: targetDpeSchedule || 'Schedule VII (i) Healthcare & Water Sanitation'
    };

    bounties.unshift(newBounty);

    if (prob) {
      if (!prob.industryPartners) prob.industryPartners = [];
      prob.industryPartners.push({
        id: newBounty.industryId,
        name: newBounty.industryName,
        type: newBounty.type,
        amountInr: newBounty.amountInr
      });
      prob.fundingAmount = (prob.fundingAmount || 0) + newBounty.amountInr;
    }

    triggerNotification({
      type: 'system',
      title: 'Industry CSR Partner Joined',
      body: `${newBounty.industryName} committed ₹${(newBounty.amountInr).toLocaleString('en-IN')} for ${newBounty.problemTitle}`,
      meta: { problemId: prob?.problemId }
    });

    res.status(201).json({ data: newBounty });
  });

  // 8. Impact Passport API
  app.get('/api/passport/:userId', (req, res) => {
    res.json({ data: passports });
  });

  app.post('/api/passport/:userId/entries', (req, res) => {
    const body = req.body;
    const newEntry: ImpactPassportEntry = {
      id: `pass-${Date.now()}`,
      studentUserId: req.params.userId || 'usr-student-01',
      studentName: body.studentName || 'Abhaya Saran',
      universityName: body.universityName || 'NIT Jamshedpur',
      projectId: body.projectId || 'proj-garhwa-filter',
      problemId: body.problemId || 'JH-2026-00047',
      problemTitle: body.problemTitle || 'Groundwater Filtration Deployment',
      domain: body.domain || 'water_resources',
      role: body.role || 'Student Lead',
      outcomeVerified: true,
      outcomeSummary: body.outcomeSummary || 'Successfully field tested and deployed community pilot.',
      facultyEndorsement: body.facultyEndorsement || {
        facultyName: 'Dr. Alok Kumar',
        designation: 'Associate Professor',
        verifiedAt: new Date().toISOString().split('T')[0],
        note: 'Endorsed for 4 ABC Credits under Social Innovation Internship Scheme.'
      },
      abcCredits: body.abcCredits || 4,
      createdAt: new Date().toISOString()
    };
    passports.unshift(newEntry);
    res.status(201).json({ data: newEntry });
  });

  // 9. Analytics API (Govt Dashboard)
  app.get('/api/analytics/overview', (req, res) => {
    const totalProblems = 3280 + problems.length;
    const activeProjectsCount = projects.filter(p => p.status === 'active' || p.status === 'testing' || p.status === 'deployed').length + 86;
    const resolvedCount = problems.filter(p => p.status === 'resolved').length + 1420;
    const totalUniversities = universities.length + 7;
    const totalCsrFunds = bounties.reduce((sum, b) => sum + b.amountInr, 0) + 128000000;

    res.json({
      data: {
        totalProblems,
        activeProjectsCount,
        resolvedCount,
        totalUniversities,
        totalCsrFunds,
        resolutionRate: ((resolvedCount / totalProblems) * 100).toFixed(1),
        districtsCovered: 24,
        villagesReached: 32600
      }
    });
  });

  app.get('/api/analytics/districts', (req, res) => {
    const districtData = JHARKHAND_DISTRICTS.map(d => {
      const matchProblems = problems.filter(p => p.location.district.toLowerCase() === d.name.toLowerCase());
      const customCount = matchProblems.length;
      const customResolved = matchProblems.filter(p => p.status === 'resolved').length;
      return {
        ...d,
        problemCount: d.problemCount + customCount,
        resolvedCount: d.resolvedCount + customResolved
      };
    });
    res.json({ data: districtData });
  });

  // 10. Notifications API
  app.get('/api/notifications', (req, res) => {
    res.json({ data: notifications });
  });

  app.post('/api/notifications/mark-read', (req, res) => {
    notifications.forEach(n => n.read = true);
    res.json({ success: true });
  });

  // 11. Interactive 90-Day Fast-Forward Demo Action
  app.post('/api/demo/fast-forward', (req, res) => {
    const prob = problems.find(p => p.id === 'prob-garhwa-01' || p.problemId === 'JH-2026-00047') || problems[0];
    const proj = projects.find(p => p.problemId === prob.id) || projects[0];

    if (proj) {
      proj.status = 'deployed';
      proj.milestones.forEach(m => {
        m.status = 'completed';
        m.completedAt = new Date().toISOString();
      });
      proj.deploymentNotes = 'Installed 50L/hr activated alumina filter unit at Bhoura Primary School. Water sample test verified fluoride at 0.4mg/L (safe limit < 1.0mg/L).';
    }

    prob.status = 'deployed';
    prob.citizenRating = 5;
    prob.citizenFeedback = 'Bhoura tola me ab saaf meetha paani aa raha hai. Baccho ke daant ka peelaapan band hoga. Dhanyawad NIT Jamshedpur aur SAMADHAN!';
    prob.resolvedAt = new Date().toISOString();

    triggerNotification({
      type: 'sms',
      title: 'SMS Sent to Citizen Rameshwar Mahto',
      body: 'समाधान (SAMADHAN): आपकी समस्या JH-2026-00047 का समाधान सफलतापूर्वक Bhoura गांव में स्थापित हो गया है। कृपया समाधान की गुणवत्ता को 1-5 स्टार रेटिंग दें।',
      meta: { problemId: prob.problemId, phone: prob.submittedBy.phone, language: 'hi' }
    });

    triggerNotification({
      type: 'system',
      title: '90-Day Simulation Complete: Solution Deployed',
      body: 'Garhwa Water Filtration pilot fully commissioned. Citizen rating 5/5 stars received. Impact Passport credits awarded.',
      meta: { problemId: prob.problemId }
    });

    res.json({
      success: true,
      message: '90-day cycle simulated! Milestone completed, deployed in Garhwa, citizen SMS dispatched, and 5-star rating registered.',
      problem: prob,
      project: proj
    });
  });

  // 12. Reset Demo State
  app.post('/api/demo/reset', (req, res) => {
    problems = JSON.parse(JSON.stringify(INITIAL_PROBLEMS));
    clusters = JSON.parse(JSON.stringify(INITIAL_CLUSTERS));
    universities = JSON.parse(JSON.stringify(PRELOADED_UNIVERSITIES));
    projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
    bounties = JSON.parse(JSON.stringify(INITIAL_BOUNTIES));
    passports = JSON.parse(JSON.stringify(INITIAL_PASSPORTS));
    res.json({ success: true, message: 'Platform demo state reset to default' });
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAMADHAN Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start SAMADHAN server:', err);
});
