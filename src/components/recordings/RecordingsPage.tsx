import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Play, Pause, Trash2, RotateCcw, FileText, Download, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Recording {
  id: string;
  leadName: string;
  leadCompany: string;
  duration: string;
  date: string;
  transcript: string;
  isDeleted: boolean;
}

const MOCK_RECORDINGS: Recording[] = [
  {
    id: "1",
    leadName: "Sarah Chen",
    leadCompany: "TechFlow",
    duration: "45:20",
    date: "Today, 10:00 AM",
    transcript: "Speaker 1: Hi Sarah, thanks for joining... Speaker 2: Thanks for having me...",
    isDeleted: false,
  },
  {
    id: "2",
    leadName: "Mike Ross",
    leadCompany: "Pearson Specter",
    duration: "15:30",
    date: "Yesterday, 2:00 PM",
    transcript: "Speaker 1: I wanted to discuss the contract... Speaker 2: Sure, let's go over it...",
    isDeleted: false,
  },
  {
    id: "3",
    leadName: "Deleted Call",
    leadCompany: "Unknown",
    duration: "05:12",
    date: "2 days ago",
    transcript: "...",
    isDeleted: true,
  },
];

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>(MOCK_RECORDINGS);
  const [activeTab, setActiveTab] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);

  const filteredRecordings = recordings.filter(r => {
    if (activeTab === "bin") return r.isDeleted;
    return !r.isDeleted;
  });

  const handleDelete = (id: string) => {
    setRecordings(recordings.map(r => r.id === id ? { ...r, isDeleted: true } : r));
  };

  const handleRestore = (id: string) => {
    setRecordings(recordings.map(r => r.id === id ? { ...r, isDeleted: false } : r));
  };

  const handlePermanentDelete = (id: string) => {
    setRecordings(recordings.filter(r => r.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recordings</h2>
          <p className="text-muted-foreground">Review calls, transcripts, and insights.</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Recordings</TabsTrigger>
            <TabsTrigger value="bin">Recycle Bin</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search recordings..." className="pl-8" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          {/* List View */}
          <Card className={`${selectedRecording ? 'col-span-7' : 'col-span-12'} flex flex-col`}>
            <CardContent className="p-0 flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecordings.map((recording) => (
                    <TableRow 
                      key={recording.id} 
                      className={`cursor-pointer ${selectedRecording?.id === recording.id ? 'bg-muted/50' : ''}`}
                      onClick={() => setSelectedRecording(recording)}
                    >
                      <TableCell>
                        <div className="font-medium">{recording.leadName}</div>
                        <div className="text-xs text-muted-foreground">{recording.leadCompany}</div>
                      </TableCell>
                      <TableCell>{recording.date}</TableCell>
                      <TableCell>{recording.duration}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          {activeTab === "bin" ? (
                            <>
                              <Button variant="ghost" size="icon" onClick={() => handleRestore(recording.id)}>
                                <RotateCcw className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handlePermanentDelete(recording.id)}>
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedRecording(recording)}>
                                  <FileText className="mr-2 h-4 w-4" /> View Transcript
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" /> Download Audio
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(recording.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Player & Transcript View */}
          {selectedRecording && (
            <Card className="col-span-5 flex flex-col h-full border-l shadow-lg animate-in slide-in-from-right-10">
              <CardHeader className="border-b bg-muted/10 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{selectedRecording.leadName}</CardTitle>
                    <CardDescription>{selectedRecording.leadCompany} • {selectedRecording.date}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedRecording(null)}>
                    <span className="sr-only">Close</span>
                    ×
                  </Button>
                </div>
                
                {/* Audio Player Mock */}
                <div className="mt-6 bg-card border rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-4 mb-2">
                    <Button 
                      size="icon" 
                      className="h-8 w-8 rounded-full" 
                      onClick={() => setPlayingId(playingId === selectedRecording.id ? null : selectedRecording.id)}
                    >
                      {playingId === selectedRecording.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                    </Button>
                    <div className="flex-1">
                      <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      12:45 / {selectedRecording.duration}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 min-h-0 flex flex-col">
                <div className="p-4 border-b bg-muted/5">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Transcript
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                      ME
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">00:00</p>
                      <p className="text-sm">Hi Sarah, thanks for joining the call today. How are you?</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold shrink-0">
                      SC
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">00:05</p>
                      <p className="text-sm">I'm doing well, thanks for having me. Excited to see what you've built.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                      ME
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">00:12</p>
                      <p className="text-sm">Great! Let me share my screen and we can dive right into the demo.</p>
                    </div>
                  </div>
                  {/* Mock content filler */}
                  <div className="text-center py-8 text-muted-foreground text-sm italic">
                    -- End of transcript preview --
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>
    </div>
    </MainLayout>
  );
}
