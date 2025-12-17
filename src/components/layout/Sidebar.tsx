import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Mic,
  Mail,
  Zap,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Leads", href: "/dashboard/leads" },
    { icon: Calendar, label: "Appointments", href: "/dashboard/appointments" },
    { icon: FileText, label: "Call Scripts", href: "/dashboard/scripts" },
    { icon: Mic, label: "Recordings", href: "/dashboard/recordings" },
    { icon: Mail, label: "Email Templates", href: "/dashboard/email-templates" },
    { icon: Zap, label: "Automation", href: "/dashboard/automation" },
    { icon: Sparkles, label: "AI Tool", href: "/dashboard/ai-tool" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
  ];

  return (
    <div className={cn("pb-12 w-[240px] border-r bg-card h-screen fixed left-0 top-0 z-30", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-bold tracking-tight font-display text-primary">
            RealTech
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start font-medium",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 px-3 w-full">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={() => navigate("/login")}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
