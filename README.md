# 📊 Decision Log

A premium, minimalist React and Tailwind CSS application designed to record, audit, and analyze critical project decisions. It functions as an interactive repository of **Architecture Decision Records (ADRs)**, helping developers and stakeholders quickly understand:
* **What** was decided
* **Why** it was decided (motivations and rationale)
* **When** it happened (timeline tracking)
* **Whether** it is still active (active state status indicators)

---

## ✨ Features

### 1. Chronological Timeline Dashboard
* **Timeline View:** A strictly timeline-based view showing logs chronologically with dynamic category vertical color tags.
* **Hover Direct Shortcuts:** Hover over any card on the timeline to reveal direct **Pencil (Edit)** and **Trash (Delete)** buttons, executing actions instantly without opening the drawer view.

### 2. Multi-Dimensional Search & Filtering
* **Text Search:** Search terms filter visible fields only (Title, Category, Status, Owner, Role, Date, Rationale), ensuring hidden metadata details do not pollute results.
* **Horizontal Categories Track:** Category chips sit in a touch-friendly, swipeable horizontal scroll bar.
* **Segmented Status Controls:** Status options (All, Active, Proposed, Superseded, Deprecated) are organized as a clean segmented control bar.
* **Aware Calculations:** Category chips and status filter counts sync dynamically with active searches and options, ensuring count integrity.

### 3. Organized Typography & Colors Design System
* **Light Mode (Default):** Starts in a clean, default white layout with dark text for optimal readability.
* **Dark Mode:** Supports a sleek dark amethyst theme with cyber-purple glows.
* **Toggle Mechanism:** Easily toggled via a Sun/Moon switcher in the navigation header.
* **Linear Gradients Replaced:** Standardized on high-contrast solid primary themes instead of visual gradients for a structured look.

### 4. Portaled Drawers (100vh Fullscreen)
* **React Portals:** Modals and sliding form panels are rendered directly under `document.body` to prevent CSS parent clipping or transforms containment bugs.
* **Scroll-Lock:** Background document scrolling is frozen when details or create/edit form drawers are active. Inside the drawer, the forms and content are self-scrollable with static action footers.

### 5. Interactive Promotional & Assistant Widgets
* **Autofocus Chatbot:** Toggling the online AI Assistant slide-over automatically puts the cursor focus on the message entry box.
* **Autofocus Trial CTA:** Clicking the promotional banner's "Claim Trial" action link scrolls smoothly to the email registration box and focuses it.

---

## 🛠️ Technology Stack

* **React 19:** Component rendering, state hooks, and Portal integrations.
* **Vite:** High-performance, fast hot-reloading development server.
* **Tailwind CSS v4:** Theme engine customization using CSS custom properties for instant light/dark mode translations.
* **Lucide React:** Vector iconography set.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ProgrammerZain/decision_log.git
   cd decision_log
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
├── src/
│   ├── assets/          # Static design assets
│   ├── common/          # Reusable semantic blocks (Button, Card, Icons)
│   ├── components/      # UI elements (Hero, Navbar, Chatbot, DecisionLogDemo)
│   ├── constants/       # Mock databases and responses
│   ├── styles/
│   │   └── theme.css    # Centralized light/dark variable tokens
│   ├── types/           # Type declarations
│   ├── App.tsx          # App routing and theme state coordinator
│   ├── index.css        # Tailwind directives and utility classes
│   └── main.tsx         # App bootstrap anchor
```
