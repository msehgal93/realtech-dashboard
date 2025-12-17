# RealTech CRM Platform

RealTech is a multi-tenant SaaS CRM platform designed for sales teams. It features lead management, appointment scheduling, AI-powered script generation, and more.

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ai-generator/   # AI Script Generator Tool
│   │   ├── auth/           # Login/Signup pages
│   │   ├── automation/     # Task Automation Dashboard
│   │   ├── calendar/       # Appointment Calendar
│   │   ├── dashboard/      # Main Dashboard Widgets
│   │   ├── layout/         # Sidebar & Main Layout
│   │   ├── leads/          # Lead Management
│   │   ├── recordings/     # Call Recordings & Transcripts
│   │   ├── scripts/        # Call Script Editor
│   │   ├── settings/       # User & App Settings
│   │   ├── support/        # Support Hub
│   │   ├── templates/      # Email Templates
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React Contexts (Tenant, Auth)
│   ├── lib/                # Utilities & API clients
│   └── App.tsx             # Main Router
├── backend-service/        # Python FastAPI Microservice
├── prisma/                 # Database Schema
└── public/                 # Static Assets
```

## Key Features

- **Multi-Tenancy:** Built-in tenant context isolation.
- **AI Script Generator:** Python-based microservice for generating sales scripts.
- **Lead Management:** Kanban-style tracking with SLA alerts.
- **Automation:** Task automation sessions with time tracking.
- **Billing:** Stripe subscription integration boilerplate.

## Getting Started

See [INSTALL.md](./INSTALL.md) for detailed installation and startup instructions.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
