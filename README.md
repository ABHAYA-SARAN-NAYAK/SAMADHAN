# 🏛️ SAMADHAN (समाधान)
### Unified Civic Intelligence, Problem Engine & Multi-Stakeholder Governance Platform

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License" />
</p>

---

## 📖 Overview

**SAMADHAN** is a civic intelligence and grievance governance ecosystem connecting citizens, municipal authorities, universities, and industrial CSR partners into a single operational loop.

The platform eliminates repetitive manual triage by utilizing an automated **Problem Engine** to cluster localized complaints, integrate district-level geospatial mapping across Jharkhand, track verified student micro-projects, and facilitate private-sector CSR problem solving.

---

## 🏛️ System Portals & Architecture

| Portal / View | Target Audience | Primary Functions |
| :--- | :--- | :--- |
| **Portal Gateway** | All Stakeholders | Central authentication and role-based routing hub to direct users into authorized views. |
| **Citizen Portal & Submit** | Citizens & Residents | File geo-tagged grievances, capture location data, upload media evidence, and track real-time resolution status. |
| **Government Command Center** | Municipal Commissioners & Officers | Real-time departmental metrics, district overviews, SLA tracking, and resolution delegation. |
| **Admin Problem Engine** | System Operators | Ingests unorganized reports, groups duplicates or regional issues, and scores algorithmic priority. |
| **University Dashboard & Passport** | Universities, Faculty & Students | Converts civic infrastructure issues into verified student micro-internships and capstone projects. |
| **Industry Marketplace** | Corporate Partners & Vendors | Open bidding and sponsorship channel for corporate CSR initiatives and public-private partnerships (PPP). |

---

## 🗺️ Core Capabilities

- **District Geospatial Visualizer**: Interactive district vector map and Google Maps interface specifically mapped to districts across Jharkhand.
- **Smart Problem Clustering**: Automatically groups micro-complaints occurring in geographic proximity into singular actionable macro-tickets.
- **SMS & Dispatch Simulation**: Live modal interface (`SmsLogModal`) for auditing citizen alert dispatches and OTP verification notifications.
- **Demo Flow Controller**: Integrated walkthrough bar (`DemoFlowBar`) to seamlessly navigate between Citizen, Government, University, and Industry viewpoints without manual re-authentication.

---

## 📂 Project Structure

```text
SAMADHAN/
├── .env.example                       # Environment variables template
├── .gitignore                         # Git exclusion rules
├── bun.lock                           # Bun lockfile
├── index.html                         # Vite application entry HTML
├── package.json                       # Scripts and project dependencies
├── server.ts                          # Backend application server / API handler
├── tsconfig.json                      # TypeScript root compiler configuration
├── vite.config.ts                     # Vite build and dev-server configuration
├── assets/                            # Brand assets and guidelines
└── src/
    ├── main.tsx                       # React application bootstrap
    ├── App.tsx                        # Master layout, navigation, and view switcher
    ├── index.css                      # Tailwind styling and theme tokens
    ├── types.ts                       # Strongly-typed models and contracts
    ├── components/
    │   ├── DemoFlowBar.tsx            # Demonstration flow controller
    │   ├── JharkhandGoogleMap.tsx     # Google Maps integration with coordinate markers
    │   ├── JharkhandMap.tsx           # SVG/vector interactive district map
    │   ├── Navbar.tsx                 # Universal header and active portal selector
    │   └── SmsLogModal.tsx            # Live notification and SMS audit modal
    ├── data/
    │   └── constants.ts               # District geometries, mock data, and metadata
    └── views/
        ├── AdminProblemEngineView.tsx # Algorithmic issue triage & cluster management
        ├── CitizenDashboardView.tsx   # Citizen ticket tracking & historical reports
        ├── CitizenSubmitView.tsx      # Grievance reporting form with geo-coordinates
        ├── ClusterView.tsx            # Geospatial problem cluster inspection
        ├── GovernmentCommandView.tsx  # Executive analytics, heatmaps, and resolution KPIs
        ├── IndustryMarketplaceView.tsx# Corporate CSR matching & tender allocation
        ├── LandingPage.tsx            # Public landing page and initiative overview
        ├── SelectPortalGateway.tsx    # Role selection & portal dispatch screen
        ├── StudentPassportView.tsx    # Student civic credit log & verified credentials
        └── UniversityDashboardView.tsx# Academic institutional project oversight

🛠️ Tech Stack
Frontend: React 18, TypeScript, Tailwind CSS

Icons: Lucide React

Geographic Services: Google Maps JavaScript API, Custom SVG District Geometries

Build Tool: Vite

Runtime & Package Manager: Bun (compatible with Node.js 18+)

Server: TypeScript server (server.ts)

🚀 Setup & Installation Guide
1. Prerequisites
Ensure you have one of the following installed:

Bun (Recommended, version 1.0.0 or higher)

Node.js (v18.0.0 or higher) & npm

2. Clone the Repository
Bash
git clone [https://github.com/abhaya-saran-nayak/samadhan.git](https://github.com/abhaya-saran-nayak/samadhan.git)
cd samadhan
3. Configure Environment Variables
Create your .env file from the example template:

Bash
cp .env.example .env
Set the required environment keys in .env:

Code snippet
# Application Port
PORT=3000

# Google Maps API Key (Optional for vector map, required for Google Maps view)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Backend / API Base URL (if applicable)
VITE_API_BASE_URL=http://localhost:3000
4. Install Dependencies
Using Bun:

Bash
bun install
Using npm:

Bash
npm install
5. Run the Application
Start the Vite Development Server:
Bash
# Using Bun
bun run dev

# Using npm
npm run dev
Open your browser and navigate to http://localhost:5173.

Start the Server (if running backend services):
Bash
# Using Bun
bun run server.ts

# Using npm
npx ts-node server.ts
6. Production Build
To build the project for production:

Bash
bun run build
# or
npm run build
To preview the production build locally:

Bash
bun run preview
# or
npm run preview
🧪 Demonstration & Presentation Walkthrough
Use the Demo Flow Bar pinned at the bottom of the interface to step through the system lifecycle:

Citizen Portal (CitizenSubmitView): Submit a test grievance with categories, coordinates, and photo attachments.

Issue Triage (AdminProblemEngineView / ClusterView): View how nearby complaints are automatically clustered into single administrative tickets.

Government Command (GovernmentCommandView): Review district performance metrics, SLA heatmaps, and reassign departmental tickets.

Academic Integration (UniversityDashboardView / StudentPassportView): Convert open civic issues into student micro-internships and view verifiable student passports.

Private Sector Bidding (IndustryMarketplaceView): Track CSR and industry sponsorship flows for civic infrastructure projects.

Notification Logs (SmsLogModal): Click the SMS icon in the navigation bar to inspect real-time mock SMS dispatches.

📄 License
This project is open-source and licensed under the MIT License.
