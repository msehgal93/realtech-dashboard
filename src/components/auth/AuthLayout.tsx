import React from "react";
import { Building2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[#0A1628] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3B82F620,transparent)]" />
        <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white mb-12">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
              <img src="/img/realtech-icon.png" className="h-7 w-7 object-contain" alt="RealTech CRM" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">RealTech CRM</span>
          </div>
          
          <h1 className="font-display text-4xl font-bold text-white leading-tight max-w-md">
            Let AI Manage your leads with precision and you focus on closing deals.
          </h1>
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="text-lg text-gray-300 font-medium">
              "RealTech has completely transformed how our sales team operates. The AI script generation is a game changer."
            </p>
            <footer className="text-sm text-gray-400">
              — Sarah Chen, VP of Sales at TechFlow
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
