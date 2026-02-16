# CheflyApp Full-Stack UI/UX Blueprint (Mobile + Web + Admin)

## 1) Product Vision and Experience Principles

CheflyApp is a marketplace for booking verified personal chefs at home. The end-to-end design must feel premium, fast, and safe for three personas:

- **Customer (User panel)**: discover chefs, book quickly, track live, review transparently.
- **Chef (Chef panel)**: onboard securely, accept/manage orders confidently, get paid reliably.
- **Operator (Admin panel)**: maintain quality, resolve disputes, control content and growth levers.

Design principles:

1. **Minimalist clarity**: clean surfaces, one primary action per screen, reduced cognitive load.
2. **Trust-first UX**: verification badges, transparent pricing, clear cancellation/refund rules.
3. **Momentum-driven flows**: multi-step forms with progress bars, inline help, undo/edit controls.
4. **Accessible by default**: WCAG 2.2 AA, keyboard support on web, voice-over labels on mobile.
5. **Consistent cross-platform patterns**: same IA and visual language on mobile and web.

---

## 2) Design System Foundations

### 2.1 Brand Color Tokens

- **Primary / Tomato**: `#FF6347`
- **Secondary / Green**: `#4CAF50`
- **Accent / Gold**: `#FFD700`
- **Light Background**: `#F8F8F8`
- **Dark Surface/Base**: `#1E1E1E`

Extended semantic tokens:

- Success: `#4CAF50`
- Warning: `#F5A623`
- Error: `#E53935`
- Info: `#2196F3`
- Light text primary: `#1E1E1E`
- Dark text primary: `#F8F8F8`
- Divider light: `#E7E7E7`
- Divider dark: `#2F2F2F`

### 2.2 Light and Dark Theme Rules

- **Light mode**: page background `#F8F8F8`, cards white-ish, subtle dual shadows for neumorphism.
- **Dark mode**: page background `#1E1E1E`, elevated cards `#252525–#2A2A2A`, glow accents reduced.
- Persist theme per user profile; allow quick toggle in top nav and settings.

### 2.3 Typography and Spacing

- Font family: modern sans-serif (`Inter`, `SF Pro`, fallback `system-ui`).
- Heading scale: 24–32px (H1/H2), 20–24px (H3).
- Body text: 16–18px.
- Caption/meta: 12–14px.
- Spacing system: 8 / 12 / 16 / 20 / 24 px.
- Radius: 8px (inputs), 10px (buttons), 12px (cards/modal).

### 2.4 Components and Motion

- **Cards**: rounded, neumorphic with subtle inner+outer shadow.
- **Buttons**: primary filled tomato, secondary outlined, tertiary text.
- **Inputs**: floating labels, inline validation and helper text.
- **Skeleton loaders**: chef cards, order timeline, list rows, map panel placeholders.
- **Micro-interactions**:
  - button press scale: 0.98 → 1.0,
  - hover shadow lift on web,
  - swipe transitions in onboarding/order wizard,
  - toast entry bottom-up (220ms),
  - shimmer skeleton (1.2s loop).

### 2.5 Accessibility Checklist

- Color contrast at least 4.5:1 for normal text.
- Focus-visible ring on all actionable controls (web).
- Touch targets minimum 44x44 px.
- Screen reader labels for icons, maps, badges, charts.
- Captions/subtitles for video intros.
- “Reduce motion” setting support.
- Form errors announced with ARIA live regions (web) and spoken feedback (mobile).

---

## 3) Information Architecture (IA)

### 3.1 User Panel IA

- Onboarding
- Authentication
- Home / Dashboard
- Search + Filters
- Chef Profile
- Order Wizard
- Real-time Tracking
- Notifications
- Reviews
- Wallet / Payments
- Subscription + Loyalty
- Profile + Settings

### 3.2 Chef Panel IA

- Onboarding + Verification
- Orders Inbox
- Today Schedule
- Active Order Tracking
- Ingredients Checklist
- Earnings + Payouts
- Ratings & Feedback
- Profile + Availability + Pricing

### 3.3 Admin Panel IA (Web)

- Analytics Dashboard
- Users Management
- Chefs Management + Verification
- Orders Monitoring
- Payments/Disputes
- Content Management
- Subscription/Loyalty Config
- Localization & Theme
- Audit Logs / Role Permissions

---

## 4) User Panel – Full Screen-by-Screen UX (Mobile + Web)

## 4.1 Onboarding and Registration

### Screen U1: Welcome Carousel (3–5 cards)

- Hero illustrations/video snippets.
- Messages: “Book verified chefs”, “Live track in real time”, “Pay securely”.
- CTA: **Get Started**; secondary **Sign in**.
- Language toggle visible (`AZ | EN | RU`) top-right.
- Swipe gestures with pager dots + progress animation.

### Screen U2: Account Type + Social Entry

- Email/password fields.
- Social auth buttons: Google, Apple, Facebook.
- Terms + privacy checkbox (required).
- Inline validation for format and password strength meter.

### Screen U3: Profile Setup

- Upload avatar (camera/gallery on mobile, drag-drop on web).
- Fields: full name, phone, date of birth (optional), location permission prompt.
- Progress bar at top: step 2/4.

### Screen U4: Dietary Preferences

- Select chips: Vegetarian, Vegan, Halal, Keto, Gluten-Free, Allergy tags.
- Custom meal preferences free text.
- Multi-select with clear-all and saved presets.

### Screen U5: Notification & Location Permissions

- Explain benefit cards before system prompts.
- “Allow now” and “Maybe later” options.

### Screen U6: Onboarding Complete

- Confirmation animation.
- CTA: **Explore chefs**.

## 4.2 Dashboard/Home

### Screen U7: Home Dashboard

Top section:

- Greeting + profile avatar.
- Search bar with voice icon + filter button.

Main modules:

1. **Featured chefs carousel**: photo/video cover, rating, cuisines, verified badge.
2. **Cuisine categories row**: Azerbaijani, Asian, European, Vegan, Keto.
3. **Promo banners**: discounts, subscription offers, loyalty campaigns.
4. **Quick order card**: “Need dinner tonight?” fast booking CTA.
5. **Recommended for you** list from preferences/history.

### Filter Drawer / Modal

- Price range slider.
- Rating minimum (stars).
- Availability (Now, Today, Custom date).
- Distance radius.
- Ingredient mode preference.
- Reset + Apply buttons.

## 4.3 Chef Profile and Booking Decision

### Screen U8: Chef Profile Detail

- Large hero media (image/video) + parallax collapse.
- Core info: chef name, verified badge, rating count, years experience.
- Bio and specialties.
- Sample dishes gallery.
- Pricing cards:
  - hourly,
  - per meal package,
  - add-ons (dessert, table setup).
- Availability calendar strip.
- Ingredient options:
  - chef brings ingredients,
  - use home ingredients.
- Reviews preview + “See all”.
- Sticky bottom CTA: **Order Now**.

### Screen U9: Reviews List

- Star histogram.
- Sort tabs: Most recent, Highest, With photos.
- Review card with user badge, date, tags, optional photo.

## 4.4 Order Wizard (Multi-step)

Shared layout:

- Horizontal progress indicator (6 steps).
- Step title + short explanation.
- Back, next, and edit previous choices.

### Screen U10: Step 1 – Choose Meal

- Meal templates + custom request input.
- Serving count selector.
- Dietary filter badges.

### Screen U11: Step 2 – Choose Chef

- Pre-selected from profile or compare list.
- Compare cards (price, rating, ETA).

### Screen U12: Step 3 – Date/Time

- Calendar + time slots.
- ASAP option if available.

### Screen U13: Step 4 – Ingredients Option

- Toggle:
  - Chef provides ingredients (price update shown).
  - User provides ingredients (checklist generated).

### Screen U14: Step 5 – Payment

- Methods: saved card, Stripe, PayPal, Apple Pay/Google Pay where supported.
- Promo code input.
- Loyalty points redeem switch.

### Screen U15: Step 6 – Summary & Confirm

- Full order summary, cancellation policy, taxes/fees breakdown.
- Confirm button with loading state and idempotent retry.
- Success modal + order ID + “Track Order”.

## 4.5 Real-time Tracking and Notifications

### Screen U16: Live Tracking

- Mapbox/Google Maps view.
- Chef location marker + destination.
- ETA pill and status timeline:
  - Confirmed → On the way → Arrived → Cooking → Meal ready → Completed.
- Contact options: chat/call.
- Safety/share live status option.

### Screen U17: Notification Center

- Segmented tabs: Orders, Promotions, System.
- Real-time push/in-app list with unread badge.
- Notification settings deep-link.

## 4.6 Reviews, History, Profile, Settings

### Screen U18: Rate Your Experience

- 1–5 stars + quick tags (Taste, Hygiene, Punctuality).
- Comment field.
- Photo upload (optional).
- Submit success toast.

### Screen U19: Order History

- Cards by status: Completed, Cancelled, Upcoming.
- Reorder action.
- Download receipt.

### Screen U20: Subscription & Loyalty

- Weekly/monthly plans comparison.
- Active plan card.
- Points wallet, tiers, rewards catalog.
- Apply points on next order toggle.

### Screen U21: Profile & Settings

- Personal details.
- Saved addresses.
- Payment methods management.
- Theme toggle (light/dark/system).
- Language selector (AZ/EN/RU).
- Currency selector.
- Privacy, security, delete account.

---

## 5) Chef Panel – Full Screen-by-Screen UX (Mobile + Web)

## 5.1 Chef Onboarding and Verification

### Screen C1: Welcome + Value Proposition

- Earnings potential snapshot.
- “Start verification” CTA.

### Screen C2: Identity and Profile Setup

- Profile photo/video intro upload.
- Full legal name, contact, address.
- ID document upload front/back.
- Liveness check integration optional.

### Screen C3: Professional Credentials

- Certifications upload.
- Cuisine specialties multi-select.
- Years experience.

### Screen C4: Service Configuration

- Pricing setup (hourly/package/add-ons).
- Service radius.
- Ingredient policy options.

### Screen C5: Availability Schedule

- Weekly calendar with slots.
- Vacation mode toggle.

### Screen C6: Verification Status

- Pending/approved/rejected states.
- Next actions and support contact.

## 5.2 Chef Dashboard and Operations

### Screen C7: Chef Home Dashboard

- New order alerts.
- Today’s schedule timeline.
- Earnings today/week/month cards.
- Pending actions list.

### Screen C8: Incoming Order Detail

- Customer profile summary.
- Address/map.
- Meal details + dietary restrictions.
- Accept / Reject buttons with countdown.

### Screen C9: Active Order Workspace

- Step tracker: accepted → en route → arrived → cooking → complete.
- Cooking instructions.
- Ingredient checklist interactive.
- Note-taking area.

### Screen C10: Order History & Analytics

- Completed/cancelled tabs.
- Revenue graphs.
- Average ratings trend.
- Peak demand hours insights.

### Screen C11: Chef Ratings and Reviews

- Public rating summary.
- Review response capability.

### Screen C12: Payout Settings

- Bank/PayPal/Stripe connect.
- Payout schedule.
- Transaction history and invoices.

### Screen C13: Chef Profile Management

- Edit bio, media, specialties.
- Request verified badge renewal/update.
- Availability and pricing quick edits.

---

## 6) Admin Panel – Full Screen-by-Screen UX (Web)

## 6.1 Admin Dashboard

### Screen A1: Platform Overview

- KPI cards: total users, active chefs, active orders, GMV, net revenue.
- Trend charts by day/week/month.
- Geo heatmap for demand.
- Alerts widget (failed payments, dispute spikes).

## 6.2 User & Chef Management

### Screen A2: Users List + CRUD

- Search, filters, status tags.
- User detail drawer.
- Suspend/reactivate controls.

### Screen A3: Chefs List + Verification Queue

- Queue by status (pending/review/approved/rejected).
- Document preview modal.
- Approve/reject with reason template.

### Screen A4: Ratings Oversight

- Flagged review queue.
- Moderate/remove abuse.
- Audit trail.

## 6.3 Orders, Payments, Disputes

### Screen A5: Orders Monitor

- Global order table with real-time status.
- Drill-down timeline and logs.

### Screen A6: Payments Console

- Payment status, refunds, chargebacks.
- Provider reconciliation status.

### Screen A7: Dispute Resolution

- Case management board.
- Evidence attachments.
- Decision outcomes with SLA timers.

## 6.4 Content, Growth, and Config

### Screen A8: Content Management

- Banners CRUD.
- Promo code campaigns.
- Notification templates and pushes.

### Screen A9: Subscription/Loyalty Management

- Plan builder (weekly/monthly).
- Points earn/redeem rules.
- Reward catalog control.

### Screen A10: Localization & Theming

- Translation key manager (AZ/EN/RU).
- Theme token overrides.

### Screen A11: Reporting & Export

- CSV/PDF export wizard.
- Saved reports and schedules.

---

## 7) Common Modals, Dialogs, and Toasts

Required UX states across app:

- Confirm order placement modal.
- Cancel order modal (reason required).
- Payment success modal.
- Payment failure modal with retry and fallback method.
- Session timeout modal.
- Network error snackbar with retry.
- Unsaved changes confirmation dialog.
- Permission rationale modal for location/camera/notifications.

Toast patterns:

- Success (green) for completed actions.
- Warning (gold) for partial issues.
- Error (red) for failures.
- Undo CTA where destructive (e.g., remove payment method).

---

## 8) Responsive Strategy

### Breakpoints

- Mobile: 320–767
- Tablet: 768–1023
- Desktop: 1024+

### Layout rules

- Mobile: bottom tab navigation for user/chef apps.
- Web: side nav + top action bar.
- Admin: dense data tables on desktop, stacked cards on narrow widths.
- Keep wizard steps vertical on mobile and horizontal on web.

---

## 9) End-to-End State Design

Global states for every async module:

1. **Idle**
2. **Loading (skeleton/shimmer)**
3. **Success**
4. **Empty state** with education CTA
5. **Error** with retry action and support link
6. **Offline mode** (cache read + queued writes where possible)

Order-specific reliability:

- Idempotency key for order confirmation.
- Retry queue for payment callbacks.
- Timeout fallback if live tracking disconnects.

---

## 10) Technical Architecture (Full-Stack)

## 10.1 Frontend

- **Mobile**: React Native (recommended) or Flutter.
- **Web user/chef/admin**: React.js + TypeScript.
- State layer: Redux Toolkit / Zustand + React Query.
- UI layer: token-based design system + reusable component library.

## 10.2 Backend

- **Option A**: Node.js + Express + TypeScript.
- **Option B**: Django REST Framework.
- REST + WebSocket gateway for real-time updates.
- JWT auth with refresh tokens; OAuth 2.0 for social login.

## 10.3 Data Layer

- PostgreSQL (core transactions) + Redis (cache/queues).
- Optional Firebase for rapid realtime/notification prototypes.
- Blob/media offload to Cloudinary.

## 10.4 Integrations

- Payments: Stripe + PayPal abstraction layer.
- Maps: Google Maps or Mapbox.
- Push: Firebase Cloud Messaging.
- Analytics: product events + warehouse sink (BigQuery/Snowflake optional).

## 10.5 Suggested Service Modules

- Auth Service
- User Profile Service
- Chef Verification Service
- Catalog/Discovery Service
- Order Orchestration Service
- Payment Service
- Notification Service
- Review & Trust Service
- Subscription & Loyalty Service
- Admin Governance Service

---

## 11) Core Data Models (High-Level)

- `User`: id, role, profile, locale, currency, dietaryPreferences, loyaltyBalance
- `Chef`: id, profile, specialties, verificationStatus, pricing, availability, ratingStats
- `Order`: id, userId, chefId, mealConfig, schedule, ingredientMode, status, totals
- `Payment`: id, orderId, provider, status, amount, currency, failureReason
- `Review`: id, orderId, reviewerId, revieweeId, stars, comment, mediaUrls
- `SubscriptionPlan`: id, cadence, price, benefits
- `LoyaltyTransaction`: id, userId, points, reason, relatedOrderId
- `Notification`: id, recipientId, channel, type, payload, readAt

---

## 12) Multi-language and Multi-currency UX

- Locales: **AZ**, **EN**, **RU** from first launch and settings.
- Store all strings in i18n keys; no hardcoded UI text.
- Currency auto-detect by region with manual override.
- Date/time and number formats per locale.
- Ensure longer RU strings fit with dynamic containers.

---

## 13) Security, Privacy, and Compliance UX

- Explicit consent for location and notifications.
- PII masking in admin tables by default.
- Secure payment tokenization (no raw card storage).
- Device/session management in settings.
- Fraud/risk checks for suspicious bookings and payouts.
- Audit logs for admin actions.

---

## 14) Delivery Roadmap (Recommended)

### Phase 1 (MVP)

- User onboarding/auth
- Chef onboarding/verification
- Search + chef profile + order wizard
- Basic payment + push + order tracking
- Admin minimal dashboard + user/chef/order management

### Phase 2

- Subscription + loyalty
- Enhanced analytics
- Disputes and moderation tools
- Advanced localization controls

### Phase 3

- AI meal planning assistance
- Dynamic pricing recommendations
- Gamification expansions and referral loops

---

## 15) QA and Acceptance Criteria Highlights

- Critical path success rate: onboarding → booking → payment → completion ≥ 98%.
- Real-time tracking update latency target < 3 seconds median.
- Lighthouse accessibility score (web) ≥ 90.
- Crash-free sessions (mobile) ≥ 99.5%.
- Localization coverage for AZ/EN/RU at 100% before release.

This blueprint is implementation-ready for product design, engineering planning, and sprint slicing across mobile, web, and admin experiences.
