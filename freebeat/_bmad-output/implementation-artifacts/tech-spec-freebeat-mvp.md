# Tech-Spec: Freebeat MVP - AI Music Video Generator Frontend

**Created:** 2024-12-30
**Status:** Ready for Development
**Timeline:** 2 days (aggressive MVP)

---

## Overview

### Problem Statement

Need a polished MVP frontend demo for "freebeat" - an AI-powered music video generator. Users upload audio and the AI generates music videos. This is a **demo/showcase project** - no real API integration, but the UI must look production-ready and impressive.

### Solution

Build a pixel-perfect clone of the freebeat UI (reference screenshots provided) with:
- Real audio waveform visualization and trimming
- Magic UI / 21st.dev animated components for premium feel
- Smooth micro-interactions and scroll animations
- Complete 5-step creation wizard flow
- Responsive design (desktop-first, mobile-friendly)

### Scope

**In Scope:**
- Landing page with style selection
- Music browser (mock data, trending tracks)
- Real audio waveform trimmer (wavesurfer.js)
- Creation prompt interface
- Mock generation flow with loading states
- Sidebar navigation with all sections
- Top Charts display
- User authentication UI (Better Auth already integrated)
- Dark theme with purple/cyan gradient aesthetics
- Extensive use of Magic UI animated components
- Framer Motion scroll/page animations

**Out of Scope:**
- Real AI video generation API
- Server-side audio processing
- Video playback/results (mock only)
- Payment/subscription system
- Real music library integration
- Edit mode (Create only for MVP)

---

## Context for Development

### Codebase Patterns

**Existing Stack:**
- React 19.2.3 + TanStack Router (file-based routing)
- TanStack Start (SSR) + React Query
- Convex backend + Better Auth (already integrated)
- Tailwind CSS v4 + shadcn/ui + Base UI
- lucide-react icons
- Dark mode enabled by default

**Key Files:**
- `apps/web/src/routes/` - File-based routing
- `apps/web/src/components/` - Shared components
- `apps/web/src/components/ui/` - UI primitives
- `apps/web/src/lib/utils.ts` - `cn()` utility
- `apps/web/src/index.css` - CSS variables, theme

**Patterns to Follow:**
- Use `cn()` for class merging
- Components in `components/` folder
- Routes in `routes/` folder
- Use existing Button, Card, Input components as base
- Extend CSS variables for new colors

### Files to Reference

```
apps/web/src/
├── routes/
│   ├── __root.tsx          # Root layout (has auth provider)
│   ├── index.tsx           # Current home (will replace)
│   └── dashboard.tsx       # Auth example (reference)
├── components/
│   ├── header.tsx          # Current header (will replace)
│   ├── sign-in-form.tsx    # Auth forms (keep)
│   ├── sign-up-form.tsx
│   └── ui/                 # Existing UI components
├── lib/
│   ├── utils.ts            # cn() utility
│   ├── auth-client.ts      # Better Auth client
│   └── auth-server.ts
└── index.css               # Theme variables
```

### Technical Decisions

1. **State Management:** React Context for wizard state (selected style, audio file, trim points, prompt)
2. **Audio Waveform:** wavesurfer.js with regions plugin for trim selection
3. **Animations:** Framer Motion for page transitions, scroll animations, micro-interactions
4. **Magic UI Components:** Copy relevant components from magicui.design / 21st.dev
5. **Mock Data:** JSON files for trending songs, charts data
6. **File Handling:** Client-side only, use File API and URL.createObjectURL()

---

## Design System

### Color Palette (extend existing CSS variables)

```css
/* Add to index.css */
.dark {
  /* Existing variables... */

  /* Freebeat brand colors */
  --freebeat-purple: oklch(0.55 0.25 285);      /* #8B5CF6 violet */
  --freebeat-cyan: oklch(0.7 0.15 195);         /* #06B6D4 cyan */
  --freebeat-pink: oklch(0.65 0.25 330);        /* #EC4899 pink */
  --freebeat-glow: oklch(0.55 0.25 285 / 30%); /* purple glow */

  /* Gradients */
  --gradient-purple-cyan: linear-gradient(135deg, var(--freebeat-purple), var(--freebeat-cyan));
  --gradient-dark: linear-gradient(180deg, oklch(0.15 0.01 285), oklch(0.1 0 0));
}
```

### Typography

- **Font:** Inter (already configured)
- **Headings:** Bold, tracking tight
- **Body:** Regular weight

### Component Styling

- **Cards:** Glassmorphism with subtle border, backdrop blur
- **Buttons:** Gradient backgrounds, shimmer effects on primary actions
- **Inputs:** Dark backgrounds with subtle borders, focus glow

---

## Implementation Plan

### File Structure (Final)

```
apps/web/src/
├── routes/
│   ├── __root.tsx              # Updated root layout
│   ├── index.tsx               # Landing/home page
│   └── create/
│       ├── index.tsx           # Style selection (step 1)
│       ├── music.tsx           # Music selection (step 2)
│       ├── trim.tsx            # Audio trimmer (step 3)
│       ├── prompt.tsx          # Creation prompt (step 4)
│       └── generating.tsx      # Loading/result (step 5)
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx         # Main sidebar navigation
│   │   ├── header.tsx          # Top header bar
│   │   └── app-shell.tsx       # Layout wrapper
│   ├── create/
│   │   ├── style-card.tsx      # Singing/Storytelling/Automatic cards
│   │   ├── music-browser.tsx   # Trending songs list
│   │   ├── music-card.tsx      # Individual song card
│   │   ├── audio-trimmer.tsx   # Waveform + region selector
│   │   ├── prompt-input.tsx    # Creation prompt textarea
│   │   └── generation-loader.tsx # Animated loading state
│   ├── home/
│   │   ├── top-charts.tsx      # Charts section
│   │   ├── chart-card.tsx      # Individual chart song
│   │   └── tutorials.tsx       # Tutorial video thumbnails
│   ├── ui/
│   │   ├── ... (existing)
│   │   ├── shimmer-button.tsx  # Magic UI
│   │   ├── spotlight-card.tsx  # Magic UI
│   │   ├── animated-beam.tsx   # Magic UI
│   │   ├── meteors.tsx         # Magic UI
│   │   ├── marquee.tsx         # Magic UI
│   │   └── ripple.tsx          # Magic UI
│   └── shared/
│       ├── credits-badge.tsx   # Lightning bolt + credits
│       ├── user-avatar.tsx     # Profile avatar
│       └── logo.tsx            # Freebeat logo
├── context/
│   └── create-wizard-context.tsx  # Wizard state management
├── hooks/
│   ├── use-audio-waveform.ts   # wavesurfer.js hook
│   └── use-scroll-animation.ts # Scroll-triggered animations
├── data/
│   ├── mock-songs.ts           # Trending songs data
│   └── mock-charts.ts          # Top charts data
└── lib/
    ├── utils.ts                # Existing
    └── constants.ts            # App constants
```

### Tasks

#### Phase 1: Foundation (Day 1 Morning)

- [ ] **T1.1:** Install dependencies
  ```bash
  cd apps/web
  bun add framer-motion wavesurfer.js @wavesurfer/react
  ```

- [ ] **T1.2:** Add Magic UI components to `components/ui/`
  - shimmer-button.tsx
  - spotlight-card.tsx
  - meteors.tsx
  - marquee.tsx
  - ripple.tsx
  - animated-gradient-text.tsx

- [ ] **T1.3:** Extend CSS variables in `index.css` with freebeat colors

- [ ] **T1.4:** Create app shell layout
  - `components/layout/app-shell.tsx` - Main layout wrapper
  - `components/layout/sidebar.tsx` - Collapsible sidebar
  - `components/layout/header.tsx` - Top bar with logo, mode dropdown, credits, Discord CTA

- [ ] **T1.5:** Update `__root.tsx` to use new app shell

#### Phase 2: Home Page (Day 1 Afternoon)

- [ ] **T2.1:** Create landing page (`routes/index.tsx`)
  - Style selection hero ("Which Style Fits Your Music?")
  - Three style cards with hover animations
  - Skip link

- [ ] **T2.2:** Create style cards (`components/create/style-card.tsx`)
  - Singing, Storytelling, Automatic options
  - Image backgrounds, icons, descriptions
  - Hover glow effect, click animation

- [ ] **T2.3:** Create Top Charts section (`components/home/top-charts.tsx`)
  - Tab filters (Billboard Hot 100, New Music Friday, etc.)
  - Horizontal scrollable song cards
  - Scroll-triggered fade-in animation

- [ ] **T2.4:** Create chart card (`components/home/chart-card.tsx`)
  - Rank badge, album art, remix count, title, artist
  - Hover scale effect

- [ ] **T2.5:** Create tutorials section (`components/home/tutorials.tsx`)
  - Video thumbnail cards with play button overlay
  - Marquee auto-scroll animation

- [ ] **T2.6:** Create mock data files
  - `data/mock-songs.ts` - 20+ trending songs
  - `data/mock-charts.ts` - Chart categories and songs

#### Phase 3: Creation Wizard (Day 1 Evening - Day 2 Morning)

- [ ] **T3.1:** Create wizard context (`context/create-wizard-context.tsx`)
  ```typescript
  interface WizardState {
    style: 'singing' | 'storytelling' | 'automatic' | null;
    audioFile: File | null;
    audioUrl: string | null;
    trimStart: number;
    trimEnd: number;
    prompt: string;
    options: {
      character: string | null;
      lyrics: boolean;
      style: string | null;
      removeWatermark: boolean;
      mode: 'fast' | 'expert';
      visibility: 'public' | 'private';
    };
  }
  ```

- [ ] **T3.2:** Create music selection page (`routes/create/music.tsx`)
  - Modal-style overlay
  - Tabs: Trending / Used Tracks
  - Search input
  - Song list with duration
  - Upload button (MP3, WAV, FLAC, AAC)
  - SoundCloud URL input
  - Skip button

- [ ] **T3.3:** Create music browser (`components/create/music-browser.tsx`)
  - Song list with album art, title, artist, duration
  - Click to select
  - Search filtering

- [ ] **T3.4:** Create audio trimmer page (`routes/create/trim.tsx`)
  - Selected song display
  - Waveform visualization
  - Region selection for trim
  - Duration preset dropdown (15s, 30s, 60s)
  - Play/pause controls
  - Cancel/Confirm buttons

- [ ] **T3.5:** Create audio trimmer component (`components/create/audio-trimmer.tsx`)
  - wavesurfer.js integration
  - Regions plugin for selection
  - Custom styling to match design
  - Time display

- [ ] **T3.6:** Create waveform hook (`hooks/use-audio-waveform.ts`)
  - Initialize wavesurfer
  - Handle file loading
  - Region management
  - Playback controls

- [ ] **T3.7:** Create prompt page (`routes/create/prompt.tsx`)
  - "What do you want to create?" header
  - Selected style + song tags
  - Large textarea for vibe description
  - Enhancement options row:
    - Character picker
    - Lyrics toggle
    - Style picker
    - Remove watermark toggle
  - Mode toggle (Fast | Expert)
  - Auto button
  - Visibility dropdown (Public/Private)
  - Create button with credits cost

- [ ] **T3.8:** Create prompt input (`components/create/prompt-input.tsx`)
  - Expandable textarea
  - Placeholder text
  - Character count

#### Phase 4: Generation & Polish (Day 2 Afternoon)

- [ ] **T4.1:** Create generating page (`routes/create/generating.tsx`)
  - Animated loading state
  - Progress indication (fake)
  - Cancel button
  - Completion state with mock result

- [ ] **T4.2:** Create generation loader (`components/create/generation-loader.tsx`)
  - Animated orb/pulse effect
  - "Creating your video..." text
  - Estimated time (mock)

- [ ] **T4.3:** Add page transitions
  - Framer Motion AnimatePresence
  - Slide/fade transitions between wizard steps

- [ ] **T4.4:** Add scroll animations
  - Fade-in-up for sections
  - Stagger children animations
  - Parallax header background

- [ ] **T4.5:** Add micro-interactions
  - Button hover/active states
  - Card hover effects
  - Input focus animations
  - Loading shimmer effects

- [ ] **T4.6:** Responsive design pass
  - Sidebar → hamburger menu on mobile
  - Stack layouts for small screens
  - Touch-friendly tap targets
  - Bottom navigation for mobile create flow

#### Phase 5: Final Polish (Day 2 Evening)

- [ ] **T5.1:** Add meteors/particles background to hero
- [ ] **T5.2:** Add spotlight effect to style cards
- [ ] **T5.3:** Add shimmer to Create button
- [ ] **T5.4:** Test all flows end-to-end
- [ ] **T5.5:** Fix any responsive issues
- [ ] **T5.6:** Performance check (lazy load heavy components)

---

### Acceptance Criteria

- [ ] **AC1:** User can navigate from landing → style selection → music → trim → prompt → generating
- [ ] **AC2:** Audio waveform displays correctly for uploaded files with working region selection
- [ ] **AC3:** All Magic UI animations render smoothly (60fps)
- [ ] **AC4:** Sidebar collapses/expands with animation
- [ ] **AC5:** Top Charts section scrolls horizontally with visible songs
- [ ] **AC6:** Create button shows credits cost and triggers generation flow
- [ ] **AC7:** Responsive: usable on mobile devices (375px+)
- [ ] **AC8:** Dark theme matches reference screenshots (purple/cyan palette)
- [ ] **AC9:** Page transitions animate between wizard steps
- [ ] **AC10:** Scroll animations trigger on viewport entry

---

## Additional Context

### Dependencies to Install

```bash
bun add framer-motion wavesurfer.js @wavesurfer/react
```

### Magic UI Components to Copy

From magicui.design / 21st.dev, copy these components and adapt for Tailwind v4:

1. **Shimmer Button** - Primary action buttons
2. **Spotlight Card** - Style selection cards
3. **Meteors** - Background effect
4. **Marquee** - Tutorial thumbnails auto-scroll
5. **Ripple** - Click feedback
6. **Animated Gradient Text** - Hero headings

### Mock Data Structure

```typescript
// data/mock-songs.ts
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  albumArt: string; // URL or placeholder
  remixCount?: number;
}

export const trendingSongs: Song[] = [
  {
    id: '1',
    title: 'The Fate of Ophelia',
    artist: 'Taylor Swift',
    duration: 272,
    albumArt: '/mock/album-1.jpg',
    remixCount: 255
  },
  // ... more songs
];
```

### Waveform Styling

```typescript
// wavesurfer config
{
  waveColor: '#4B5563',      // gray-600
  progressColor: '#8B5CF6',  // freebeat-purple
  cursorColor: '#06B6D4',    // freebeat-cyan
  barWidth: 3,
  barRadius: 3,
  barGap: 2,
  height: 80,
  normalize: true,
}
```

### Testing Strategy

- Manual testing for all user flows
- Check animations on low-end devices
- Test audio upload with various file types
- Verify responsive breakpoints (375px, 768px, 1024px, 1440px)

### Notes

- **No real API calls** - All generation is mocked with timeouts
- **Audio stays client-side** - Use `URL.createObjectURL()` for uploaded files
- **Credits are display-only** - No real deduction system
- **User menu uses existing Better Auth** - Already integrated

---

## Quick Start for Developer

1. Read this spec completely
2. Install dependencies: `cd apps/web && bun add framer-motion wavesurfer.js @wavesurfer/react`
3. Start with T1.x tasks (foundation)
4. Work through phases sequentially
5. Test each component in isolation before integration
6. Reference screenshots frequently for pixel accuracy
7. Run `bun x ultracite fix` before committing

**Command to start dev:** `bun run dev:web`
