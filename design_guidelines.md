# LoginSentinel Design Guidelines

## Design Approach
**System**: Modern Developer Tool Aesthetic (Linear + Stripe Dashboard hybrid)
**Justification**: Security/analytics platform requiring clarity, precision, and trust. Function-over-form with clean data visualization.

**Key Principles**:
- Clarity in data presentation
- Trust through professional restraint
- Technical credibility via precise execution
- Performance monitoring requires scannable layouts

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, technical, excellent at small sizes
- **Headings**: Font weights 600-700, sizes: text-2xl (dashboard titles), text-lg (section headers)
- **Body**: Font weight 400-500, sizes: text-sm (primary), text-xs (metadata/labels)
- **Code/Metrics**: Font weight 500, tabular numbers for data alignment

## Layout System
**Spacing Units**: Tailwind 2, 4, 6, 8, 12, 16 (p-4, gap-6, mb-8, etc.)
**Grid Strategy**: 
- Dashboard: Single column mobile, adaptive desktop (not forced multi-column)
- Analytics Cards: 2-3 column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Data Tables: Full-width responsive tables with horizontal scroll

## Component Library

### Authentication Pages
**Login/Register Forms**:
- Centered card layout (max-w-md mx-auto)
- Minimal branding (logo + tagline)
- Form inputs with labels above, helper text below
- Primary CTA button (full width on mobile)
- Link to alternate action (subtle, text-sm)

### Dashboard Layout
**Navigation**: 
- Left sidebar (w-64) with collapsible mobile menu
- Logo at top, nav links with icons (Heroicons), user profile at bottom
- Active state: subtle background, medium font weight

**Main Content Area**:
- Header bar: page title (text-2xl font-semibold) + action buttons (right-aligned)
- Content padding: p-6 md:p-8

### Data Visualization Cards
**Metric Cards** (for KPIs):
- White background, border, rounded corners (rounded-lg border)
- Padding: p-6
- Layout: Label (text-sm text-gray-600), Value (text-3xl font-bold), Change indicator (text-xs with arrow icon)
- Grid arrangement: 2-4 cards per row on desktop

**Chart Containers**:
- Larger card format (p-6)
- Header: title + time range selector
- Chart area with axis labels (text-xs)
- Use recharts or similar library for visualizations

**Risk Score Display**:
- Prominent circular progress indicator or gauge
- Color zones: green (low risk), yellow (medium), red (high) - but NO color specifications in code
- Numeric score (large, bold) + risk level label

### Data Tables
**Login Attempts / Anomaly Logs**:
- Striped rows for scannability
- Column headers: uppercase text-xs font-medium
- Cell padding: px-6 py-4
- Sortable headers with icon indicators
- Status badges (rounded-full px-3 py-1 text-xs)

### Real-time Feed
**Activity Stream**:
- Timeline layout with left border
- Timestamp (text-xs, relative time)
- Event description (text-sm)
- Associated metadata (IP, location) in muted text
- Icon indicators for event types

### Admin Analytics Panel
**Performance Stats Section**:
- Tabbed interface for different metric categories
- Large number displays (text-4xl) for latency/throughput
- Sparkline charts for trends
- Benchmark comparison indicators

**Anomaly Detection Metrics**:
- Detection rate displayed prominently (90% accuracy)
- Confusion matrix or accuracy chart
- Recent anomalies list with risk scores

## Form Elements
- Input fields: border, rounded-md, px-4 py-2, focus ring
- Labels: text-sm font-medium, mb-2
- Error states: red border + error message (text-xs)
- Success states: green border + checkmark icon

## Navigation Patterns
- Breadcrumbs for deep navigation (text-sm with separator icons)
- Tab navigation for content sections (border-b with active underline)
- Dropdown menus for user actions (absolute positioned, shadow-lg)

## Responsive Behavior
- Sidebar: Full height desktop, hamburger menu mobile
- Cards: Stack to single column on mobile
- Tables: Horizontal scroll container on mobile
- Dashboard: Reduce padding on mobile (p-4 instead of p-8)

## Icons
**Library**: Heroicons (via CDN)
**Usage**: 
- Navigation icons (h-5 w-5)
- Status indicators (h-4 w-4)
- Action buttons (h-5 w-5)
- Large feature icons (h-8 w-8)

## Animations
**Minimal Use Only**:
- Page transitions: Fade in content (opacity transition)
- Data updates: Brief highlight flash on changed values
- Loading states: Skeleton screens or subtle pulse animation
- NO scroll-triggered animations, NO decorative motion

## Images
**No hero images required** - this is a functional dashboard application.
**Icon/Logo**: Simple, technical logomark in header/sidebar
**Empty States**: Minimal illustrations for "no data" states (optional, can use text + icon)