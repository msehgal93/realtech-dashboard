import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, Calendar as CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  client: string;
  type: "Demo" | "Follow-up" | "Closing" | "Discovery";
  status: "Scheduled" | "Completed" | "Cancelled";
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    title: "Product Demo with TechFlow",
    date: new Date(),
    time: "10:00 AM",
    duration: "45 min",
    client: "Sarah Chen",
    type: "Demo",
    status: "Scheduled",
  },
  {
    id: "2",
    title: "Contract Review",
    date: new Date(),
    time: "2:00 PM",
    duration: "30 min",
    client: "Mike Ross",
    type: "Closing",
    status: "Scheduled",
  },
  {
    id: "3",
    title: "Discovery Call",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "11:00 AM",
    duration: "30 min",
    client: "Jessica Pearson",
    type: "Discovery",
    status: "Scheduled",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [newAppt, setNewAppt] = useState({
    title: "",
    client: "",
    time: "",
    type: "Discovery",
  });

  const handleAddAppointment = () => {
    const appt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      title: newAppt.title,
      date: date || new Date(),
      time: newAppt.time,
      duration: "30 min",
      client: newAppt.client,
      type: newAppt.type as any,
      status: "Scheduled",
    };
    setAppointments([...appointments, appt]);
    setIsDialogOpen(false);
    setNewAppt({ title: "", client: "", time: "", type: "Discovery" });
  };

  const selectedDateAppointments = appointments.filter(
    (appt) => date && appt.date.toDateString() === date.toDateString()
  );

  return (
    <MainLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">Manage your schedule and upcoming meetings.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAppt.title}
                  onChange={(e) => setNewAppt({ ...newAppt, title: e.target.value })}
                  placeholder="e.g. Product Demo"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client Name</Label>
                <Input
                  id="client"
                  value={newAppt.client}
                  onChange={(e) => setNewAppt({ ...newAppt, client: e.target.value })}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppt.time}
                    onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newAppt.type}
                    onValueChange={(val) => setNewAppt({ ...newAppt, type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Discovery">Discovery</SelectItem>
                      <SelectItem value="Demo">Demo</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Closing">Closing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAppointment}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar View */}
        <Card className="md:col-span-4 lg:col-span-3">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>

        {/* List View */}
        <Card className="md:col-span-8 lg:col-span-9">
          <CardHeader>
            <CardTitle>
              {date ? format(date, "EEEE, MMMM do, yyyy") : "Select a date"}
            </CardTitle>
            <CardDescription>
              You have {selectedDateAppointments.length} appointments scheduled for this day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No appointments scheduled for this day.
                </div>
              ) : (
                selectedDateAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CalendarIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{appt.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {appt.time} ({appt.duration})
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {appt.client}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${appt.type === 'Demo' ? 'bg-blue-100 text-blue-700' :
                          appt.type === 'Closing' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                        {appt.type}
                      </span>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </MainLayout>
  );
}
