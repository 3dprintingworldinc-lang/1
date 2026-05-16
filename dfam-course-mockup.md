# Production-Ready DfAM: Designing Additive Parts for Industrial Performance
## Interactive Course Platform — Mockup & Build Specification

> Working title: **From Function to Implementation**
> Audience: Industrial, manufacturing, and process engineers inside production companies
> Format: Self-paced enterprise course, 8 modules + capstone, ~14–18 learner hours
> Positioning: Manufacturing transformation course — not a hobby 3D printing course

---

## 1. Product Vision

### What the platform feels like
The course platform should feel like a **manufacturing engineering tool**, not a MOOC. Imagine a cross between a CAD product workspace (SolidWorks, Fusion), a production analytics dashboard (Power BI, Tableau), and a modern enterprise learning system (Degreed, Cornerstone).

Visual language:
- Industrial dark-mode default with a brushed-steel/graphite neutral palette
- Engineering blueprint accents (grid backgrounds, isometric line work, callout annotations)
- Data-forward — every screen has at least one chart, scorecard, or matrix
- Diagrams over decorations: section-view illustrations, build-orientation isometrics, load-path overlays
- Typography: a technical sans (Inter, IBM Plex Sans) for body, a monospaced face (JetBrains Mono, IBM Plex Mono) for parameters, tolerances, and material codes

### How the learner experiences it
Each learner has the identity of an **engineer evaluating real AM opportunities** in their own facility — not a student watching videos. The course frames every lesson around a working artifact: a scorecard being filled in, a matrix being completed, a redesign being justified, a business case being built.

The platform is built around three repeating beats:
1. **Reframe** — short conceptual lesson that reshapes mental model
2. **Decide** — interactive decision tool (sort, score, select, evaluate)
3. **Apply** — produce a deliverable that flows into the capstone proposal

By the end of the course, the learner has not just watched lessons — they have authored a real proposal for an AM part candidate inside their own facility, scored, designed, validated, and costed.

### Differentiating principles
- "Function-first" thinking is reinforced on every screen
- Every exercise produces a downloadable, reusable workplace artifact
- All exercises auto-route into the Capstone workspace
- Designed for engineering managers to defend findings to executives

---

## 2. Site Map / Course Architecture

```
DfAM Platform (root)
│
├── Public
│   ├── /                              Course Landing Page
│   ├── /overview                      Course thesis & framework
│   ├── /curriculum                    Module previews
│   ├── /for-teams                     Corporate / enterprise plans
│   ├── /case-studies                  Industrial DfAM success stories
│   └── /login   /sso
│
├── Learner App  (post-login)
│   ├── /dashboard                     My Learning Home
│   ├── /path                          Course path / progress map
│   │
│   ├── /module/1  The DfAM Mindset
│   ├── /module/2  Finding the Right Applications
│   ├── /module/3  AM Processes and Materials
│   ├── /module/4  Designing for AM Performance
│   ├── /module/5  Designing for Industrial Use Cases
│   ├── /module/6  Testing, Validation, and Risk
│   ├── /module/7  Costing and Business Case
│   ├── /module/8  Capstone: From Part to Proposal
│   │
│   │   Each module:
│   │   ├── overview
│   │   ├── lesson/[id]
│   │   ├── knowledge-check
│   │   ├── exercise
│   │   └── debrief
│   │
│   ├── /capstone                      Capstone workspace
│   │   ├── /select-part
│   │   ├── /problem
│   │   ├── /opportunity
│   │   ├── /process-material
│   │   ├── /redesign
│   │   ├── /benefits
│   │   ├── /risks
│   │   ├── /validation
│   │   ├── /business-case
│   │   ├── /implementation
│   │   └── /submit
│   │
│   ├── /toolkit                       Downloadable tools & templates
│   │   ├── opportunity-scorecard
│   │   ├── process-material-matrix
│   │   ├── design-checklist
│   │   ├── validation-template
│   │   ├── business-case-template
│   │   └── capstone-presentation
│   │
│   ├── /library                       Reference: processes, materials,
│   │                                  glossary, failure modes
│   ├── /community                     Discussions / peer review
│   ├── /certificates                  Earned credentials
│   └── /profile  /settings
│
└── Admin / Corporate App
    ├── /admin/dashboard               Cohort overview
    ├── /admin/learners                Roster + progress
    ├── /admin/cohorts                 Cohort + license mgmt
    ├── /admin/capstones               Capstone submissions queue
    ├── /admin/reports                 Engagement, completion, ROI rollup
    ├── /admin/skills-map              Org skill gap heatmap
    ├── /admin/branding                White-label / logo / palette
    └── /admin/integrations            SSO, LMS export (xAPI/SCORM), HRIS
```

---

## 3. Course Landing Page Mockup

### Section A — Hero
- **Eyebrow:** ENTERPRISE TRAINING · ADDITIVE MANUFACTURING
- **Headline:** "DfAM is not about making parts printable. It is about making parts perform."
- **Subheadline:** A production-grade course that teaches industrial engineers to identify, design, validate, and justify additive manufacturing applications inside real factories.
- **Primary CTA:** **Start the Course →**
- **Secondary CTA:** Request a Cohort for Your Team
- **Trust strip:** Logos of aerospace, automotive, energy, medical device, and contract manufacturer companies
- Background motif: subtle isometric of a topology-optimized bracket overlaid with a load-path heatmap

### Section B — The Core Thesis
**Headline:** Material creates potential. Design determines performance.

Two-column visual:
- Left: PEEK bracket, badly oriented, cracked at a layer line. Caption: "Wrong design. PEEK fails."
- Right: PLA bracket, oriented along load path, ribbed and consolidated. Caption: "Right design. PLA performs."

Body copy: "A PEEK part can fail before a PLA part if the design ignores how additive manufacturing actually works. This course teaches you to design function, material, geometry, and process together."

### Section C — Who This Is For
Three audience cards:
1. **Industrial & Manufacturing Engineers** — Identify and qualify AM candidates on your production floor.
2. **Process & Quality Engineers** — Validate, document, and de-risk additive parts for production use.
3. **Engineering Managers** — Build the business case to bring AM into your organization.

### Section D — The Course Framework
Visual: a 6-step horizontal flow with icons —
**Function → Material → Process → Geometry → Validation → Business Case**

Tagline under each step. The flow animates as you scroll.

### Section E — What You'll Build
Tiled grid of deliverables:
- DfAM Opportunity Scorecard
- Process & Material Selection Matrix
- DfAM Design Checklist
- Validation Plan
- AM Business Case
- Capstone Proposal — *"a defensible AM proposal you could actually take to your VP of Operations"*

### Section F — Curriculum
Accordion of all 8 modules. Each row:
- Module number + title
- Key question
- Duration
- Deliverable tag
- "Preview module" link

### Section G — Outcomes
**Headline:** After this course, you can answer six questions every additive program lives or dies by.
1. Is this a good AM candidate?
2. What function does the part need to perform?
3. What material/process combination fits the application?
4. How does the design need to change for AM?
5. What risks need to be tested or validated?
6. Does the business case justify implementation?

### Section H — Capstone Spotlight
**Headline:** From Part to Proposal.
Visual: animated walkthrough of a learner's capstone — part selection → redesign → cost model → final exported PDF proposal.

### Section I — For Teams / Enterprise
**Headline:** Train your engineering organization to think in additive.
- Cohort licensing
- Admin dashboards & progress reporting
- SCORM / xAPI / SSO
- Capstone projects tailored to your facility
- CTA: **Talk to Enterprise**

### Section J — FAQ
- Do I need CAD experience?
- Do I need access to a 3D printer?
- Is this for metals, polymers, or both?
- How long does the course take?
- Does my company get reporting?
- Can our parts be the capstone?

### Section K — Final CTA
- **Headline:** Stop printing parts. Start designing performance.
- **CTA:** Enroll Now / Request a Team Demo

---

## 4. Learner Dashboard Mockup

Route: `/dashboard`. Default landing after login.

### Top region — Identity & status bar
- Avatar, name, role, company, cohort
- Streak indicator (e.g. "5-day learning streak")
- Hours invested, est. hours remaining

### Hero card — "Continue where you left off"
- Module 3, Lesson 2 — *Mechanical Behavior of SLS Nylon*
- Progress bar at 38%
- **Resume Lesson →**

### Course path tracker
Visual: horizontal node map with 8 module nodes + capstone node.
- Green = complete
- Blue pulse = current
- Grey = locked
- Hover reveals tooltip with module summary

### Capstone status card
- Sub-stages with check states: Part selected · Problem framed · Opportunity defined · Process/material chosen · Redesign sketched · Validation drafted · Business case ✓ · Ready to submit
- Big CTA: **Open Capstone Workspace →**

### Toolkit tray
Horizontal scroll of all six downloadable tools, each with status:
- *Filled in* / *Not started* / *Auto-synced to capstone*
- Download icon, "Open in workspace" icon

### Assignments & due dates (if cohort-licensed)
List with module name, due date, status. Color-coded urgency.

### Recommended Library reading
3 cards driven by current module context (e.g. "Anisotropy in FDM nylon", "Stress concentration cheat sheet").

### Cohort feed
- Peer activity (capstone submitted by teammate, new discussion in Module 4)
- Manager announcements
- Optional — togglable for individual learners

### Side rail — Quick Actions
- Jump to current lesson
- Open Toolkit
- Request feedback on capstone draft
- Book office hours (if enabled)

---

## 5. Module Page Template

Every module uses the same reusable structure so learners orient instantly.

```
[Module N] — [Title]
─────────────────────────────────────────
Key question:  [single sentence]
Duration:      ~Xh    Deliverable: [tool]
Progress:      ████░░░░░  4 of 7 sections

1.  Module Brief  (5 min)
    - Why this module exists
    - What learners will produce
    - How it connects to the capstone

2.  Concept Lessons  (2–4 short lessons)
    Each lesson:
       ► Video micro-lecture (3–6 min)
       ► Annotated visual / diagram
       ► "What this changes" callout
       ► Inline reflection prompt

3.  Decision Tool  (interactive)
    A live calculator, sorter, matrix, or builder

4.  Knowledge Check  (3–6 questions)
    Mixed: multiple choice, ranking, drag-match,
    scenario judgment

5.  Practical Exercise
    Produces a downloadable artifact

6.  Debrief & Worked Example
    Compare learner's answer to expert version

7.  Capstone Hand-off
    "Send your output to the capstone workspace?"
    → routes the artifact to the right capstone tab
```

Persistent UI elements on every module page:
- Left rail: lesson outline with completion ticks
- Right rail: glossary lookup, quick notes, "ask the cohort"
- Top: breadcrumb (Course → Module → Lesson)
- Bottom: Prev / Next, plus "Save & exit"

---

## 6. Detailed Interactive Module Mockups

### Module 1 — The DfAM Mindset

- **Learning objective:** Reframe AM from "a way to print parts" into "a way to design function."
- **Opening scenario:** Two CAD viewers side-by-side. A PEEK bracket fractured along a layer line. A PLA bracket of the same external envelope, reoriented and ribbed, holding the full load. Voice-over: *"Same load. Same envelope. Opposite outcomes. Material did not decide this — design did."*
- **Interactive elements:**
  - 3D viewer toggle: "Print this part" view vs. "Design for additive" view
  - Mindset slider: drag your current thinking on five axes (material-first ↔ function-first, single part ↔ system, etc.) and the system mirrors it back
  - Annotated diagram: "Why companies fail with AM" — five failure patterns, click each for a one-screen explainer
- **Knowledge check examples:**
  1. *Multiple choice:* A part is failing at the build-plate interface under cyclic load. The team blames the material. What is the most likely real cause? (Orientation / Material grade / Print temperature / Infill %)
  2. *Ranking:* Rank these inputs in order of impact on AM part performance: material → orientation → wall strategy → load-path alignment → post-process.
  3. *Scenario:* A buyer says "we tried PEEK and it cracked, so additive doesn't work for us." Write the one diagnostic question you'd ask first.
- **Exercise — "Same envelope, two designs":** Learners are given the same functional spec (bracket, 200 N cyclic load, 60 °C, vibration). They drag-build two versions: one using a high-performance material with weak design, one using a basic material with DfAM design. The platform scores anticipated performance using a simplified model.
- **Downloadable tool:** *Mindset Reframe Worksheet* (preparatory; primes Scorecard logic in Module 2).
- **Completion requirement:** Pass knowledge check (≥75%) and submit the two-design comparison.

### Module 2 — Finding the Right Applications

- **Learning objective:** Identify high-value AM opportunities and reject low-value ones.
- **Opening scenario:** A "facility walk" — an animated factory floor with hotspots: a CNC fixture room, a maintenance crib, a quality lab, an assembly cell. Click a hotspot to reveal a candidate part with a hidden cost-of-status-quo.
- **Interactive elements:**
  - **Drag-and-drop sorter:** 20 candidate parts → four bins (Poor / Possible / Strong / Strategic candidate).
  - **Opportunity radar chart:** as learners score a part, a radar plot fills in across 12 criteria.
  - **Hidden-cost reveal:** click a part to see the downtime, inventory, and tooling cost the status quo silently incurs.
- **Knowledge check examples:**
  1. Which of these is the strongest indicator of an AM opportunity? (Part is metal / Part is low-volume and complex / Part is small / Part is decorative)
  2. *True/false:* "If a part is cheap to machine, it is rarely a strong AM candidate." (True — with nuance)
  3. *Drag-match:* Match each pain (long lead time, expensive tooling, downtime risk, customization, supply-chain fragility) to its strongest AM value lever.
- **Exercise — AM Candidate Sorting:** Score 6 real-world parts using the Opportunity Scorecard. System produces a heatmap and ranked recommendation.
- **Downloadable tool:** **DfAM Opportunity Scorecard.**
- **Completion requirement:** Score and rank all 6 sample parts; one of the learner's own facility parts must be entered (this seeds the capstone).

### Module 3 — Understanding AM Processes and Materials

- **Learning objective:** Make process-aware design decisions by matching application requirements to AM process families and materials.
- **Opening scenario:** A side-by-side benchmark: the same coupon produced by FDM, SLS, MJF, SLA, and Metal LPBF. Hover any coupon to see strength curves, thermal behavior, accuracy, and cost-per-part.
- **Interactive elements:**
  - **Process family explorer** — clickable tiles for FDM/FFF, SLA/DLP, SLS, MJF, Material Jetting, Binder Jetting, Metal LPBF, DED. Each opens a one-page profile: how it works, strengths, limits, materials, typical post-processing.
  - **Material class library** — engineering thermoplastics, photopolymers, elastomers, composites, tool steels, Ti, Al, Ni, Cu.
  - **Process/Material Selection Matrix builder** — drop requirements (max temp, min UTS, tolerance band, surface, qualification difficulty, volume), and the matrix highlights green/yellow/red cells.
  - **Anisotropy explorer** — orient a tensile coupon in the build volume and watch the UTS curve shift.
- **Knowledge check examples:**
  1. A part must survive 180 °C continuous service, accept threaded fasteners, and tolerate fuel exposure. Choose the strongest process/material pair.
  2. *Drag-match:* Match each process to its dominant limit (support structures, powder removal, residual stress, layer adhesion, layer step).
  3. *Scenario:* A team chose SLA for a fuel-line bracket. Identify two failure modes they likely overlooked.
- **Exercise — Selection Matrix:** For 3 application specs, complete the Process/Material Matrix and write a two-sentence justification for each pick.
- **Downloadable tool:** **Process and Material Selection Matrix.**
- **Completion requirement:** Submit one matrix that maps to the learner's capstone part.

### Module 4 — Designing for AM Performance

- **Learning objective:** Apply core DfAM design principles so material and process can deliver their full potential.
- **Opening scenario:** Animated load-path overlay. A bracket rotates through three orientations in the build chamber; for each orientation, the load path crosses or aligns with the layer plane. The von Mises hot spot moves accordingly.
- **Interactive elements:**
  - **Orientation studio** — rotate a part in a build chamber and watch four readouts live-update: anisotropy risk, support volume, surface quality on critical faces, build time.
  - **Wall strategy panel** — slider for shell thickness, infill density, gyroid/honeycomb/lattice toggle; predicted stiffness updates.
  - **Stress concentration heatmap** — draw a fillet radius; watch the stress concentration factor fall.
  - **Topology optimization reveal** — toggle between original solid part, TO result, and DfAM-cleaned manufacturable result.
  - **Part consolidation animator** — collapses a 7-part assembly into one printed component, with weight, fastener, and tolerance-stack savings.
- **Knowledge check examples:**
  1. A flexure must take cyclic load. Which orientation is wrong and why? (3-image picker.)
  2. *True/false:* "Adding a lattice always lowers part weight without lowering performance." (False — clarify.)
  3. *Scenario:* A printed bracket is failing at a sharp internal corner. List two design changes before a material change.
- **Exercise — Redesign Sprint:** Learners are handed a CAD of a poorly designed bracket. They edit orientation, wall, fillets, supports, and consolidation choices in a guided in-browser config. The system scores the new design against a target.
- **Downloadable tool:** **DfAM Design Checklist.**
- **Completion requirement:** Submit redesign decisions with rationales for orientation, wall, supports, stress concentration, and inspection access.

### Module 5 — Designing for Industrial Use Cases

- **Learning objective:** Translate DfAM into the specific application classes a factory actually uses.
- **Opening scenario:** Walk through a virtual factory floor. Five zones light up: jigs/fixtures, EOAT, assembly aids, maintenance/MRO, ergonomic tools. Each zone has a "before / after AM" toggle that flips the part shown.
- **Interactive elements:**
  - **Application class cards** — flip cards revealing typical materials, processes, lead-time wins, and pitfalls.
  - **Factory opportunity map builder** — drag-and-drop AM candidates onto a facility plan; system colors zones by potential value.
  - **Bridge production decision tree** — when does additive bridge to injection molding vs. stay as the production process?
- **Knowledge check examples:**
  1. A weld fixture is breaking weekly. Which application class is this and which AM process is most appropriate?
  2. *Drag-match:* Match each application class to its dominant value lever (downtime, customization, complexity, weight, time-to-fixture).
  3. *Scenario:* An EOAT gripper is too heavy and slowing cycle time. Outline two AM-based design moves.
- **Exercise — Factory AM Opportunity Map:** Learners load a sample facility (or upload their own floorplan). Place 6+ candidate AM applications, score each, and produce a ranked roadmap.
- **Downloadable tool:** *Factory AM Opportunity Map* (companion artifact to the Scorecard).
- **Completion requirement:** Submit a facility map with at least 6 candidates and one chosen "first deployment."

### Module 6 — Testing, Validation, and Risk

- **Learning objective:** Build a defensible validation plan that proves an AM part is ready for production.
- **Opening scenario:** A printed coolant manifold is sitting on a quality bench. A QE asks: "How do we know this is good?" The screen shows three answers — "we printed it carefully," "we tested one," "we have a plan." Only one is acceptable.
- **Interactive elements:**
  - **Criticality classifier** — answer a 4-question wizard and the system places the part on a A / B / C criticality tier with required documentation depth.
  - **Failure mode card deck** — pull failure mode cards (layer delamination, residual stress warping, porosity, support-induced surface defect, post-process dimensional change, UV degradation) and rate likelihood × severity.
  - **Validation plan builder** — drag inspection methods (CMM, CT, dye-pen, leak, fatigue, thermal cycling, accelerated aging) into a plan and the system flags missing coverage.
- **Knowledge check examples:**
  1. A Tier-A part has no fatigue test in its plan. What is the right next action?
  2. *Drag-match:* Match failure modes to detection methods.
  3. *Scenario:* A Tier-C jig is being treated like a Tier-A flight part. Identify the cost of over-validation.
- **Exercise — Validation Plan:** Build a complete plan for one printed industrial component: function, criticality, failure modes, inspection, test, acceptance criteria, documentation, approval pathway.
- **Downloadable tool:** **Validation Planning Template.**
- **Completion requirement:** Submit a plan that the system flags as "coverage complete" across all 8 fields.

### Module 7 — Costing and Business Case

- **Learning objective:** Quantify and communicate AM value in the language executives approve budgets in.
- **Opening scenario:** A CFO slide: "What is the ROI?" The current state is a $42 fixture machined in 11 days, $3,800 each, 4 changeovers/year. The AM alternative is $980, 28 hours, in-house. The screen reveals not just cost-per-part but the hidden levers: downtime, inventory, labor, lead time, capacity.
- **Interactive elements:**
  - **Cost-per-part calculator** — material, machine time, labor, post-processing, scrap, amortization.
  - **Total value calculator** — adds downtime avoided, inventory carrying reduction, tooling cost avoided, lead-time value, performance gains, risk reduction.
  - **Lead-time slider** — drag from current 21 days to projected 3 days and see operational impact downstream.
  - **Executive one-slide builder** — produces the single slide a sponsor takes to a steering committee.
- **Knowledge check examples:**
  1. Which line is most often missing from a typical AM cost case? (cost-per-part / lead-time value / material cost / post-processing)
  2. *Scenario:* An AM part costs 1.4× the machined version per piece, but cuts unplanned downtime by 6 hours/year on a $2,800/hr line. Justify it.
  3. *Multiple choice:* Best ROI framing for a maintenance VP? (cost-per-part / downtime avoided / supply-chain resilience / weight savings)
- **Exercise — AM Business Case:** Build the full business case for the learner's chosen capstone part using the template.
- **Downloadable tool:** **AM Business Case Template.**
- **Completion requirement:** Submit a business case with at least three value levers quantified.

### Module 8 — Capstone: From Part to Proposal

- **Learning objective:** Integrate everything into a defensible proposal for a real AM opportunity.
- **Opening scenario:** A sponsor (VP of Operations) appears in a short video: *"You have 10 minutes. Convince me this is worth doing."*
- **Interactive elements:**
  - **Capstone workspace** — 10-step guided flow, each step pulling in earlier artifacts.
  - **Live proposal preview** — a polished PDF previews on the right as the learner fills in the left.
  - **Reviewer mode** — peer reviewers leave comments inline on the draft.
- **Knowledge check examples:** None — capstone is the assessment. A rubric is shown up front so learners know exactly how it is scored.
- **Exercise instructions:** *"Select a real part or application from your facility (or pick from our library). Carry it through the 10-step proposal. You must produce a deliverable a sponsor could approve."*
- **Downloadable tool:** **Capstone Presentation Template.**
- **Completion requirement:** Submit complete proposal; pass rubric (≥80% across all criteria) via instructor or peer review.

---

## 7. Capstone Project Experience

The capstone is a persistent workspace — not a single submission form. It is unlocked at Module 2 and accumulates outputs as the learner moves through the course.

### Capstone flow (10 stages)

| # | Stage | Inputs auto-pulled from | Learner adds |
|---|-------|------------------------|--------------|
| 1 | Part / application selected | Module 2 sorter | Part name, owner, facility, photo, CAD upload |
| 2 | Current problem | Module 2 hidden-cost reveal | Status-quo cost, lead time, downtime, pain narrative |
| 3 | AM opportunity | Module 2 + 5 | Value hypothesis (one paragraph) |
| 4 | Process / material selection | Module 3 matrix | Final pair + justification |
| 5 | DfAM redesign concept | Module 4 redesign sprint | Orientation, wall, supports, consolidation, lattices |
| 6 | Expected benefits | Module 7 calculators | Quantified value levers |
| 7 | Risks | Module 6 failure modes | Top 5 risks + mitigations |
| 8 | Validation plan | Module 6 template | Full plan |
| 9 | Business case | Module 7 template | Full case |
| 10 | Implementation recommendation | n/a | Sponsor, timeline, decision gate, next test |

### Capstone workspace UX
- Left rail: 10-stage progress tracker with check states and rubric weights
- Center: editing canvas — long-form fields, drag-to-reorder, embeds for CAD, charts, photos
- Right rail: live PDF preview, comment thread, rubric scorecard preview
- Top: "Sponsor view" button — flips into the read-only executive proposal view
- Submit button gates: rubric must show all 10 stages green

### Review modes
1. **Self-review** — built-in rubric checklist
2. **Peer review** — cohort members assigned to review n peers
3. **Instructor / SME review** — for paid enterprise tiers
4. **Sponsor review** (optional) — learner's actual manager can be invited to comment

### Final output
A polished, branded PDF + a 10-slide presentation deck, both auto-generated from the workspace. Optionally exported as a Word doc.

---

## 8. Corporate / Admin Experience

The admin app is targeted at L&D managers, engineering directors, and AM program leads.

### `/admin/dashboard`
- Headline metrics: enrolled, active 30d, modules completed, capstones submitted, avg time-to-completion, NPS
- Engagement curve (line) and module-by-module drop-off (funnel)
- Heatmap of cohort progress
- Quick links: invite learners, create cohort, generate report

### `/admin/learners`
Roster table:
- Name, role, facility, cohort, % complete, last active, capstone status, certificate status
- Filters: cohort, role, facility, status, manager
- Bulk actions: re-assign cohort, send nudge, export

### `/admin/cohorts`
- Cohort cards with start/end dates, learner count, completion %, capstone submissions
- Assignments & due dates editor
- Cohort-specific landing page (custom welcome, sponsor message)

### `/admin/capstones`
A capstone-review queue:
- Card per submission with part photo, learner, score, status (draft / submitted / under review / passed / revisions)
- One-click open in proposal viewer
- Rubric scoring panel
- Tagging by application class, process, material, facility — feeds the org's internal AM opportunity inventory

### `/admin/reports`
- Completion report (per cohort, per facility, per role)
- Skills delta — pre/post self-assessment
- Capstone aggregate report: how many candidates identified, total projected savings across all capstones (the program's ROI rollup)
- Export to CSV, PDF, xAPI to corporate LMS

### `/admin/skills-map`
Org skill heatmap:
- Rows: engineers
- Columns: DfAM competencies (mindset, sourcing, process selection, design, validation, business case)
- Cells: proficiency from pre/post checks and capstone rubric
- Identifies bench strength and gaps by facility

### `/admin/branding`
- Logo, color palette, custom welcome video
- White-labeled certificate template

### `/admin/integrations`
- SSO (Okta, Azure AD, Google)
- LMS export: SCORM 1.2, SCORM 2004, xAPI to Workday, Cornerstone, Degreed, SAP SuccessFactors
- HRIS sync for roster
- Webhooks (capstone submitted → Slack/Teams channel)

---

## 9. UI / UX Recommendations

### Layout
- Three-pane learner app: left nav (course path), center canvas (lesson/exercise), right rail (notes, glossary, AI assistant, capstone hand-off)
- Sticky top bar: breadcrumb, progress, save state, profile
- Collapsible rails for focus mode

### Navigation
- Persistent course path map accessible via `⌘ K` (or `Ctrl K`) quick switcher
- Keyboard nav: `J / K` to move between lesson sections, `?` opens shortcut help
- Anchor-based deep links to every lesson section and exercise step

### Visual style
- Default dark theme; light theme available
- Palette:
  - Graphite `#101418` / `#1A1F26` background
  - Steel `#2A323D` surface
  - Signal blue `#3A8DFF` primary
  - Signal amber `#F7B500` warning / decision
  - Signal green `#3DD68C` validation / pass
  - Signal red `#E5484D` risk / fail
  - Paper `#F5F7FA` for blueprint mode
- Iconography: precision line icons with 1.5 px stroke
- Charts: thin, monochromatic with one accent color per data series
- Imagery: isometric CAD, build-orientation diagrams, photographic part comparisons, no stock photos of generic hands-on-3D-printers

### Interaction types
- Drag-and-drop sorters
- Live calculators with sliders and steppers
- 3D viewers with build chamber, orientation, supports overlays
- Heatmap overlays (load path, stress, support volume)
- Decision trees with branching outcomes
- Comparison matrices with conditional formatting
- Inline annotations on CAD screenshots

### Dashboard ideas
- Personal "DfAM proficiency radar" updates as modules complete
- "Time to capstone" countdown band
- Pinned tools tray (drag your three most-used tools)
- Smart nudges: "You haven't selected a capstone part yet — pick one to unlock Module 3 exercise auto-fill."

### Accessibility
- WCAG 2.1 AA minimum
- Closed captioning + transcripts on all videos
- Color-blind-safe palette pair for status indicators
- Keyboard-first navigation throughout

---

## 10. Sample Screens (wireframes in words)

### Screen 1 — Course Landing Hero
Full-bleed dark canvas. Left half: eyebrow chip "ENTERPRISE TRAINING · ADDITIVE MANUFACTURING", H1 "DfAM is not about making parts printable. It is about making parts perform.", sub-headline two lines, two CTAs stacked (Start the Course / Request a Cohort), trust strip below with six muted enterprise logos. Right half: looping isometric of a topology-optimized bracket rotating, with load-path arrows fading in/out. Sticky transparent nav bar above with Overview / Curriculum / For Teams / Sign In.

### Screen 2 — Learner Dashboard
Three-column layout. Left rail (240 px): user identity card, course path tree with 8 module nodes + capstone node, toolkit shortcut. Center column: "Continue where you left off" hero card with a thumbnail and Resume button; under it, three cards in a row — Capstone status, Toolkit tray, Upcoming assignments; below, "Recommended reading" 3-up. Right rail (280 px): cohort feed, manager announcements, "Ask the cohort" entry. Top bar: search, command-K shortcut hint, notification bell, avatar.

### Screen 3 — Module Lesson (Module 4, Lesson 2 — Orientation & Anisotropy)
Top breadcrumb: Course / Module 4 / Lesson 2. Center canvas split 60/40: left side is a 3D build chamber with the bracket rotating; right side has four live readouts — Anisotropy risk (bar), Support volume (mm³), Critical-face surface quality (★), Build time (h). Below the viewer: a horizontal scrubber for orientation angle; an "Apply to capstone" button under the readout panel. Left rail: lesson outline (sections 1–6 with check states). Right rail: glossary panel scoped to anisotropy terms.

### Screen 4 — Module 2 Exercise (AM Candidate Sorting)
Top of screen: task brief "Sort each candidate into one of four bins." Center: 20 candidate cards in a holding tray, each card showing part thumbnail, current process, annual volume, complexity score. Below the tray: four large drop zones — Poor / Possible / Strong / Strategic. Right rail: live radar chart updating as each card is placed; underneath, a running "Top 3 strongest" leaderboard. Bottom bar: Save draft / Reset / Submit. Mobile responsive collapses tray to a horizontal scroll, drop zones to a vertical stack.

### Screen 5 — Module 3 Process/Material Matrix
Header: "Specify your requirements." Left panel: requirement sliders/inputs (max temp, min UTS, tolerance band, surface, qualification difficulty, annual volume). Center: a 9-column × 9-row matrix; columns are processes (FDM, SLA, SLS, MJF, Metal LPBF, Binder Jet, CNC, Injection mold, Cast); rows are criteria. Cells color from green to red live as inputs change. Right rail: "Recommended pair" surfaces with a confidence score and a one-sentence rationale; below, a "Send to capstone Step 4" button.

### Screen 6 — Module 6 Validation Plan Builder
Top: criticality classifier wizard result banner ("Tier A — critical to safety"). Center: a 4-column board (Failure modes / Inspection / Test / Acceptance), drag failure-mode cards into the first column and drop matching inspection/test/acceptance cards into the rows. Coverage gauge at top right shows "Coverage 70% — missing fatigue test on critical face." Right rail: documentation checklist with auto-checked items. Bottom: "Export plan" + "Send to capstone Step 8".

### Screen 7 — Capstone Workspace
Split layout. Left rail: 10-stage progress tree with rubric weights. Center: editor canvas for the current stage (e.g. Stage 6, Expected Benefits) with long-form fields and embedded mini-calculators inherited from Module 7. Right rail: live PDF preview of the full proposal, scroll-synced; below preview, comment thread with peer reviewer avatars; below that, rubric scoreboard. Top right: "Sponsor view" toggle flips center pane into a read-only executive layout.

### Screen 8 — Admin Cohort Dashboard
Top stat row: Enrolled · Active 30d · Modules completed · Capstones submitted · Avg time-to-completion · NPS. Below: two charts — engagement curve (line) and module drop-off (funnel). Below that: cohort heatmap (rows = learners, columns = modules, cell color = completion). Right rail: alerts ("3 learners inactive 14+ days"), capstone review queue summary, quick actions. Top bar tabs: Dashboard / Learners / Cohorts / Capstones / Reports / Skills Map / Settings.

---

## 11. Suggested Interactive Features

- **Candidate sorter** — drag-and-drop with bins (Module 2)
- **Opportunity Scorecard widget** — 12-criterion radar, score auto-rolls up (Module 2 / capstone)
- **Hidden-cost reveal cards** — flip cards exposing downtime/inventory/tooling cost (Module 2 / 7)
- **Process explorer tiles** — modal profiles per process (Module 3)
- **Material library lookup** — searchable, filterable cards (Module 3)
- **Selection matrix with conditional formatting** — green/yellow/red cells (Module 3)
- **3D build chamber viewer** — orientation, supports, layer slicing overlays (Module 4)
- **Anisotropy heatmap overlay** — von Mises and layer-direction visualizer (Module 4)
- **Wall-strategy / lattice slider** — predicted stiffness updates (Module 4)
- **Stress-concentration interactive** — drag fillet radius and watch Kt fall (Module 4)
- **Part-consolidation animator** — collapses an exploded assembly (Module 4)
- **Factory opportunity map** — drop pins on a floorplan (Module 5)
- **Bridge-production decision tree** — branching outcome with reasoning (Module 5)
- **Criticality classifier wizard** — 4-question logic flow (Module 6)
- **Failure-mode card deck** — likelihood × severity rating UI (Module 6)
- **Validation plan builder** — 4-column drag board with coverage gauge (Module 6)
- **Cost-per-part calculator** — line-itemized inputs and live totals (Module 7)
- **Total-value calculator** — multi-lever ROI roll-up (Module 7)
- **Executive one-slide generator** — auto-built sponsor slide (Module 7)
- **Live PDF preview** — proposal renders in real time (Capstone)
- **Peer-review threads** — inline comments anchored to proposal sections (Capstone)
- **Sponsor view toggle** — read-only executive layout (Capstone)
- **Command-K quick switcher** — jump to any lesson, tool, or capstone stage
- **AI assistant** (optional, gated) — context-aware copilot that can answer questions, summarize a process profile, or critique a redesign rationale; can be disabled per-tenant for IP-sensitive customers

---

## 12. Completion and Certificate Flow

### Completion criteria
A learner earns the certificate by meeting all of:
1. 100% of module knowledge checks passed at ≥75%
2. 8 of 8 module exercises submitted
3. Capstone submitted and scored ≥80% on rubric
4. Course feedback survey completed

### Rubric (capstone)
Six categories, each scored 1–5 (weight in parens):
- Application selection & framing (15%)
- Process & material justification (15%)
- DfAM design rigor (20%)
- Validation plan defensibility (15%)
- Business case quality (20%)
- Communication & executive readiness (15%)

### Certificate flow
1. Triggers automatically when rubric crosses threshold
2. Generates a PDF certificate (white-labeled to the enterprise tenant if configured)
3. Issues a verifiable digital credential (Open Badges 2.0 / 1EdTech) with a unique URL
4. Pushes the credential to LinkedIn (one-click "Add to profile")
5. Records completion event to corporate LMS via xAPI / SCORM
6. Notifies learner's manager (if cohort is manager-linked)
7. Adds learner to the alumni community and unlocks the post-course library

### Levels (optional roadmap)
- **DfAM Practitioner** — this course
- **DfAM Lead** — practitioner + 3 deployed capstones submitted to org library
- **DfAM Program Architect** — leadership track on portfolio strategy, KPIs, governance

---

## 13. Next Build Steps

A practical, ordered build plan you can hand to a team.

### Phase 0 — Pre-production (weeks 1–2)
- [ ] Lock the instructional outline (this document is the seed)
- [ ] Define learning objectives, assessment items, and rubric per module
- [ ] Build a visual identity kit (logo, palette, type, iconography, motion guidelines)
- [ ] Source or license a small CAD asset library (10–15 representative parts)
- [ ] Pick the LMS / platform substrate (build vs. buy: e.g. Thinkific Plus, LearnWorlds, Docebo, Open edX, or custom Next.js + Supabase)

### Phase 1 — Content production (weeks 3–10)
- [ ] **Slides:** 8 module decks (~25–40 slides each)
- [ ] **Video:** 30–40 micro-lectures (3–6 min each); intro + capstone "sponsor brief" film
- [ ] **Diagrams:** orientation, anisotropy, support strategy, lattices, stress concentration, consolidation, validation, ROI
- [ ] **3D assets:** at least one part per module rigged for the build-chamber viewer
- [ ] **Quiz bank:** 20–30 items per module (varied formats)
- [ ] **Worked examples:** expert solutions for each exercise (used in debriefs)

### Phase 2 — Tools & templates (weeks 4–10, parallel)
- [ ] DfAM Opportunity Scorecard — XLSX + web widget
- [ ] Process & Material Selection Matrix — XLSX + web widget
- [ ] DfAM Design Checklist — PDF + web widget
- [ ] Validation Planning Template — DOCX + web widget
- [ ] AM Business Case Template — XLSX + web widget
- [ ] Capstone Presentation Template — PPTX + Google Slides

### Phase 3 — UI prototype (weeks 6–12)
- [ ] Figma file: design tokens, components, 12 key screens (the 8 above + landing + admin)
- [ ] Clickable prototype for user testing with 5–8 target engineers
- [ ] Accessibility audit on prototype

### Phase 4 — LMS / platform build (weeks 10–22)
- [ ] Stand up authentication (SSO + email)
- [ ] Build module page template, lesson player, knowledge-check engine, exercise framework, capstone workspace
- [ ] Build the six interactive widgets (Scorecard, Matrix, Orientation Studio, Validation Builder, Cost Calculators, Capstone Workspace)
- [ ] Build admin app (roster, cohorts, capstone review, reports)
- [ ] Integrations: SSO, SCORM/xAPI export, HRIS, webhooks
- [ ] White-labeling and certificate generator

### Phase 5 — QA, pilot, launch (weeks 20–26)
- [ ] Internal QA pass + content review with an SME panel
- [ ] Pilot cohort (1 enterprise customer, 15–30 learners)
- [ ] Iterate on completion data, drop-off, capstone outcomes
- [ ] Public launch + enterprise sales enablement (one-pager, demo script, sample admin tour)

### Phase 6 — Post-launch (ongoing)
- [ ] Community / alumni forum
- [ ] Quarterly content refresh (new processes, materials, case studies)
- [ ] Capstone library — anonymized or shared org-internal
- [ ] Localization (DE, JA, ES) for global manufacturers

---

*End of mockup spec.*
