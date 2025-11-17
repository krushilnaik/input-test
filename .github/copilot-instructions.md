# AI Coding Agent Instructions

This is a React 19 + TypeScript + Vite project featuring advanced animations, custom markdown rendering, and a drawer-based UI architecture.

## Architecture Overview

**Routing & State Management**

- Uses TanStack Router (`@tanstack/react-router`) with file-based routing in `src/routes/`
- Route tree is auto-generated in `src/routeTree.gen.ts` by `@tanstack/router-vite-plugin`
- Global state managed via Zustand stores in `src/stores/` (e.g., `actionPanelStore.ts`, `sidebarStore.ts`, `overviewStore.ts`)
- The `AnimationContext` (`src/contexts/AnimationContext.tsx`) tracks animation states globally using session storage

**UI Component Structure**

- `src/routes/__root.tsx`: Root layout with conditional input display based on route
- `src/components/drawers/Drawer.tsx`: Reusable resizable drawer component that updates global `sidebarStore` width
- Drawer width state is maintained in rem units and synced with Zustand store for responsive layout adjustments
- Path alias `@/` maps to `src/` (configured in `vite.config.ts`)

**Animation System**

- Heavy use of GSAP for complex animations (see `src/hooks/useBorderAnimation.ts`, `useSendButtonAnimation.ts`)
- `useViewTransitionPause` hook preserves GSAP animations during View Transitions API usage
- Border animations use SVG paths with GSAP timeline sequences
- Animation state tracked via refs to prevent duplicate animations (`hasStartedRef`, `isResizingRef`)

**Custom Markdown Rendering**

- `src/components/markdown/MarkdownRenderer.tsx` uses `react-markdown` with custom plugins:
  - `remark-directive`: Enables custom directive syntax (`::: component-name`)
  - Custom plugins in `src/components/markdown/plugins/`: `charts.ts`, `molecules.ts`, `status.ts`
- `createRemarkDirective` utility (`src/components/markdown/utils/directives.ts`) transforms directives into custom HTML tags
- Chart directives (`::: chart-pie`, `::: chart-bar`, etc.) render Nivo charts via `ChartRenderer.tsx`
- Molecule system in `src/components/markdown/molecules/` maps custom tags to React components (see `molecules/index.tsx`)

**Data Attribute Observer Pattern**

- `useDataAttributeObserver` hook (`src/hooks/useDataAttributeObserver.ts`) uses MutationObserver to watch data attributes
- Used for cross-component communication (e.g., Navigation watching overlay state via `data-state` attribute)
- Drawer components expose state via `data-width` attributes

## Development Workflow

**Commands**

```bash
yarn dev              # Start dev server (Vite)
yarn build            # TypeScript check + production build
yarn lint             # Run ESLint
yarn lint:fix         # Auto-fix ESLint issues
yarn format           # Format with Prettier
yarn format:check     # Check Prettier formatting
yarn preview          # Preview production build
```

**Adding Routes**

- Create new route file in `src/routes/` (e.g., `about.tsx`)
- Export `Route` using `createFileRoute` or `createRootRoute`
- Route tree regenerates automatically via Vite plugin

**Adding Custom Markdown Components**

1. Create remark plugin in `src/components/markdown/plugins/` using `createRemarkDirective`
2. Define directive-to-tag mapping (e.g., `{ "my-component": "mycomponent" }`)
3. Register component in `src/components/markdown/molecules/index.tsx`
4. Create renderer component in `src/components/markdown/molecules/others/` or `charts/`

## Project-Specific Conventions

**Component Patterns**

- Use default exports for page components and drawers
- Named exports for reusable atoms and utilities
- Props interfaces inline for simple components, separate `interface` for complex ones
- Use `PropsWithChildren` type for wrapper components

**Animation Best Practices**

- Always use refs for animation targets (`useRef<HTMLElement>(null)`)
- Store GSAP timelines in refs to enable cleanup (`timelineRef.current?.kill()`)
- Wrap animation logic in `useCallback` when passing to child components
- Use `useViewTransitionPause` in components with GSAP animations

**State Management**

- Zustand stores use single state object with action methods
- Store hooks use selectors for optimal re-renders: `useStore((state) => state.count)`
- Drawer width state stored as rem string (`"20rem"`) for CSS compatibility
- Session storage for persistent animation states across page refreshes

**Styling**

- Tailwind CSS for all styling (config in `tailwind.config.js`)
- Custom CSS for complex animations in `src/animations/` directory
- Dark theme default (gray-900 background, white/gray-300 text)
- Responsive breakpoints: `md:` (768px), `lg:` (1024px)

**File Organization**

- `src/atoms/`: Small, reusable components (icons, shimmer effects)
- `src/components/`: Larger feature components
- `src/hooks/`: Custom React hooks
- `src/stores/`: Zustand stores
- `src/utils/`: Pure utility functions
- `src/constants/`: Shared constants (sizes, colors, etc.)

## Key Integration Points

**TanStack Router + View Transitions**

- `TransitionLink.tsx` component wraps navigation with View Transitions API
- GSAP animations preserved during transitions via `useViewTransitionPause`

**Nivo Charts + Markdown**

- Chart data passed as JSON string via `data` prop
- `cols` attribute controls grid column span (1-12)
- Charts grouped in `<chartrow>` wrapper for grid layout

**Drawer System**

- Drawers positioned absolutely with fixed top/right positioning
- Width changes propagate to root layout via Zustand store
- Main content area width calculated as `calc(100vw - ${drawerWidth})`
- Mouse drag resize implemented with `isResizingRef` and global event listeners

## Common Pitfalls

- Don't call GSAP animations in render phase—use `useLayoutEffect` or `useGSAP` hook
- Markdown directive names must be lowercase (e.g., `piechart`, not `PieChart`)
- Drawer `id` prop must match CSS class for open/close animations
- View Transition API only available in Chromium browsers—feature detect with `document.startViewTransition`
- Route tree is auto-generated—never edit `routeTree.gen.ts` manually
