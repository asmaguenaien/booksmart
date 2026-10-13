# BookSmart 📅

**A modern workspace discovery and booking interface.**

BookSmart is a responsive web application concept for exploring meeting rooms, coworking spaces, and event venues. Users can compare room capacities, amenities, hourly prices, and sample availability through an interactive interface.

[![CI](https://github.com/asmaguenaien/booksmart-workspace-booking/actions/workflows/ci.yml/badge.svg)](https://github.com/asmaguenaien/booksmart-workspace-booking/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

🔗 **Live Demo:** ((https://booksmart-dusky.vercel.app/))

> **Project status:** Frontend prototype. Availability data and chatbot responses are simulated. Real reservations and backend persistence are not implemented yet.

## ✨ Features

- **Workspace Catalog** — Explore meeting rooms, coworking spaces, and event venues.
- **Room Details** — View capacity, location, amenities, and hourly prices.
- **Availability Calendar** — Navigate between weeks and inspect sample time slots.
- **Booking Interaction** — Select a workspace and navigate to the availability calendar.
- **BookBot Assistant** — Interact with a rule-based chatbot for basic workspace and pricing questions.
- **Responsive UI** — Browse the interface on desktop and mobile devices.
- **Interactive Components** — Animated transitions, navigation, and notification feedback.

## 🛠️ Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui, Radix UI |
| **Routing & Data** | React Router, TanStack React Query |
| **Animations** | Framer Motion |
| **Dates** | date-fns |
| **Icons** | Lucide React |
| **Testing & Quality** | Vitest, Testing Library, ESLint, GitHub Actions |
| **Deployment** | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/asmaguenaien/booksmart-workspace-booking.git
cd booksmart-workspace-booking
npm install
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

```bash
npm run build
npm run preview
```

### Quality Checks

```bash
npm run lint
npm test
```

## 📁 Project Structure

```
src/
├── components/   # UI components (RoomCard, CalendarView, Chatbot, ...)
├── data/         # Sample workspace data (rooms.ts)
├── hooks/        # Custom hooks
├── pages/        # Pages (Index, NotFound)
└── lib/          # Utilities
```

## 📸 Screenshots

Screenshots of the workspace catalog, availability calendar, and BookBot assistant will be added here.

## 🗺️ Roadmap

- [ ] Integrate a persistent database for workspace and booking data.
- [ ] Implement real-time availability checks.
- [ ] Add user authentication and role-based access control.
- [ ] Implement booking creation, cancellation, and management.
- [ ] Connect BookBot to a genuine conversational AI service.
- [ ] Add automated tests for core user flows.

## 👩‍💻 Author

**Asma Guenaien**
Software Development | Web Technologies

- GitHub: [@asmaguenaien](https://github.com/asmaguenaien)

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

*Workspace photos are provided by [Unsplash](https://unsplash.com/).*
