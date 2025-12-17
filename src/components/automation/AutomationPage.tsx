import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Clock, CheckCircle2, AlertCircle, Zap } from "lucide-react";

export default function AutomationPage() {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          // Auto-stop after 8 hours (28800 seconds)
          if (prev >= 28800) {
            setIsActive(false);
            return prev;
          }
          return prev + 1;
        });
        
        // Simulate task completion
        if (Math.random() > 0.9) {
          setTasksCompleted(prev => prev + 1);
          setProgress(prev => (prev + 2) % 100);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsActive(true);
  const handleStop = () => setIsActive(false);

  return (
    <MainLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Automation</h2>
          <p className="text-muted-foreground">Manage your AI agent sessions and automated workflows.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-green-500 hover:bg-green-600" : ""}>
            {isActive ? "Session Active" : "Session Inactive"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Control Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Session Control</CardTitle>
            <CardDescription>Start or stop the AI agent. Sessions auto-stop after 8 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="text-7xl font-mono font-bold tracking-wider text-primary">
                {formatTime(elapsedTime)}
              </div>
              <div className="flex gap-4">
                {!isActive ? (
                  <Button size="lg" className="w-32 bg-green-600 hover:bg-green-700" onClick={handleStart}>
                    <Play className="mr-2 h-5 w-5" /> Start
                  </Button>
                ) : (
                  <Button size="lg" variant="destructive" className="w-32" onClick={handleStop}>
                    <Square className="mr-2 h-5 w-5 fill-current" /> Stop
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Task Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center pt-2">
                {isActive ? "Processing leads and updating CRM records..." : "Waiting to start..."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tasksCompleted}</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Session Limit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8h 00m</div>
              <p className="text-xs text-muted-foreground mt-1">Daily safety limit</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                <Zap className="h-4 w-4" /> Efficiency Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">94%</div>
              <p className="text-xs text-primary/80 mt-1">High performance</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Lead Qualification Completed</p>
                  <p className="text-sm text-muted-foreground">Processed 50 leads from "Web Form" source.</p>
                  <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </MainLayout>
  );
}
