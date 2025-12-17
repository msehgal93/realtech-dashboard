# RealTech CRM Platform - Installation & Setup

## Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL (or Supabase/Neon)

## 1. Frontend Setup (React + Vite)

```bash
# Install dependencies
npm install

# Install UI components (shadcn/ui)
npx shadcn-ui@latest init
# (Already configured in this project)

# Install additional libraries
npm install @prisma/client @tanstack/react-query axios date-fns lucide-react react-hook-form zod recharts
```

## 2. Backend Setup (Python Microservice)

```bash
cd backend-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 3. Database Setup (Prisma)

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (requires DATABASE_URL in .env)
npx prisma db push
```

## 4. Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for authentication
- `STRIPE_SECRET_KEY`: Stripe API key
- `ML_API_URL`: URL for the Python microservice (default: http://localhost:8000)

## 5. Running the System

### Start the Frontend
```bash
npm run dev
```

### Start the Backend Microservice
```bash
cd backend-service
uvicorn main:app --reload --port 8000
```

The application will be available at `http://localhost:5173`.
