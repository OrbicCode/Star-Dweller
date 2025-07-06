# Star Dweller 🚀

Star Dweller is a space-themed personal dashboard app designed to keep you productive while keeping up with everything cosmic. Built with a mobile-first approach, it features widgets such as a To-Do list, Space News, SpaceX launch dates, all styled with a sleek night-sky palette. This project challenges me to continue learning new technologies (Jest, TypeScript) on the fly while leveraging my existing skills, aiming to create a standout portfolio piece for my developer journey.

## Table of Contents

- [Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Installation](#-installation)
- [Project Roadmap](#-project-roadmap)
- [Future Features](#-future-features)
- [About Me](#-about-me)

## 🌌 Demo

- Hosted on Vercel: [Demo](https://stardweller.vercel.app/dashboard)
- Check out my project plan and mockups in [Figma](https://www.figma.com/board/21TMmNKdjrhxi0D2awQo8W/personal-dashboard?t=3lGg2O0gkLgF0Ptb-1)

## ✨ Features

- Space-Themed Widgets:

  - To-Do: Manage tasks
  - Weather: Current conditions
  - Space News: Top 3 headlines from SpaceFlightNews
  - Next SpaceX Launch: Upcoming launch details
  - Who’s in Space?: Current astronauts on the ISS via Open Notify.
  - ISS Location: Current ISS location - displayed on a map

- Responsive Design:

  - Mobile: Vertical stack
  - Tablet: 2 column grid
  - Desktop: 3 column grid

- Night Sky Theme: Dark blue gradient cards and NASA photo of the day background

## 🛠️ Tech Stack

- Frontend: Next.js, TypeScript

- APIs:

  - NASA (Photo of the Day)
  - Open Notify (ISS location, Astronauts)
  - RocketLaunch.Live (SpaceX launch times)
  - SpaceFlightNews (Space News)
  - OpenWeather (Weather)

- Tools:

  - Figma: UI design and project plan (user stories, MVPs, sprints)
  - Notion: Daily standups to be Agile
  - GitHub Issues: Task tracking
  - GitHub Actions/Husky: Pull request/pre-commit checks
  - Jest/Playwright: TDD approach with Unit Tests and end-to-end tests
  - Vercel: Deployment

- Database: Supabase: For user auth, preferences, and tasks

## 🔧 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/OrbicCode/Star-Dweller.git
   cd cosmic-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **API Keys needed:**
   - NASA API: Get your free key at [NASA API Portal](https://api.nasa.gov/)
   - OpenWeatherMapAPI: Get your free key at [OpenWeatherMapAPI](https://openweathermap.org/api)
   - Supabase: Create a project at [Supabase](https://supabase.com/)

4. **Set up the database**
   
   Set up your Supabase database tables by running the SQL scripts in the `database` folder or follow the setup instructions in the Supabase dashboard.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run lint` - Run ESLint

## 📆 Project Roadmap

- Sprint 1: Project plan in Figma, UI design.
- Sprint 2: Next.js/TypeScript setup, Supabase, Husky, Jest/Playwright, Login UI.
- Sprint 3: Header, To-Do list, NASA photo background.
- Sprint 4: SpaceX, Who’s in Space widgets.
- Sprint 5: Space News, Weather, Mars Rover, ISS location.
- Sprint 6: Final polish, Vercel deployment, documentation.

## ⏳ Future Features

- Drag and Drop functionality for the widgets
- User location-specific weather

## 👨‍💻 About Me

I’m a budding developer passionate about building innovative, visually appealing apps. This project is my hands-on learning journey, pushing me to master TypeScript and TDD while refining my skills in responsive design, Next.js, API integration and agile development. Connect with me on [LinkedIn](https://www.linkedin.com/in/james-o-kane-orbiccode/) to follow my progress!
