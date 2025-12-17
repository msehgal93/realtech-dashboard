import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, FileText, Save } from "lucide-react";

interface Script {
  id: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  lastModified: string;
}

const MOCK_SCRIPTS: Script[] = [
  {
    id: "1",
    title: "Cold Call - Real Estate Agent",
    category: "Outbound",
    tags: ["Cold Call", "Real Estate"],
    content: "Hi {{lead.name}}, this is {{user.name}} from RealTech. I noticed you're managing a large portfolio of properties...",
    lastModified: "2 hours ago",
  },
  {
    id: "2",
    title: "Product Demo Follow-up",
    category: "Follow-up",
    tags: ["Email", "Demo"],
    content: "Hi {{lead.name}}, thanks for your time today. As discussed, here are the key points we covered...",
    lastModified: "1 day ago",
  },
  {
    id: "3",
    title: "Objection Handling - Price",
    category: "Objection",
    tags: ["Negotiation", "Price"],
    content: "I understand that budget is a concern. However, if we look at the ROI...",
    lastModified: "3 days ago",
  },
];

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<Script[]>(MOCK_SCRIPTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Editor state
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");

  const handleEdit = (script: Script) => {
    setSelectedScript(script);
    setEditorContent(script.content);
    setEditorTitle(script.title);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedScript(null);
    setEditorContent("");
    setEditorTitle("");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedScript) {
      // Update existing
      setScripts(scripts.map(s => s.id === selectedScript.id ? {
        ...s,
        title: editorTitle,
        content: editorContent,
        lastModified: "Just now"
      } : s));
    } else {
      // Create new
      const newScript: Script = {
        id: Math.random().toString(36).substr(2, 9),
        title: editorTitle || "Untitled Script",
        category: "General",
        tags: [],
        content: editorContent,
        lastModified: "Just now"
      };
      setScripts([newScript, ...scripts]);
    }
    setIsEditing(false);
  };

  const insertVariable = (variable: string) => {
    setEditorContent(prev => prev + ` {{${variable}}} `);
  };

  const filteredScripts = scripts.filter(script => 
    script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Call Scripts</h2>
          <p className="text-muted-foreground">Manage your sales scripts and templates.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create Script
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Sidebar List */}
        <Card className="col-span-4 flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scripts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {filteredScripts.map((script) => (
                <div
                  key={script.id}
                  onClick={() => handleEdit(script)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedScript?.id === script.id 
                      ? "bg-primary/5 border-primary" 
                      : "hover:bg-muted border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium truncate">{script.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{script.lastModified}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {script.content}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {script.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Editor Area */}
        <Card className="col-span-8 flex flex-col h-full">
          {isEditing ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <Input
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 px-0 w-1/2"
                  placeholder="Script Title"
                />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
              </div>
              
              <div className="p-2 bg-muted/30 border-b flex gap-2 overflow-x-auto">
                <Button variant="ghost" size="sm" onClick={() => insertVariable("lead.name")}>
                  + Lead Name
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertVariable("lead.company")}>
                  + Company
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertVariable("user.name")}>
                  + My Name
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertVariable("product.name")}>
                  + Product
                </Button>
              </div>

              <div className="flex-1 p-4">
                <Textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="h-full resize-none border-none shadow-none focus-visible:ring-0 text-base p-0"
                  placeholder="Start writing your script..."
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <FileText className="h-16 w-16 mb-4 opacity-20" />
              <p>Select a script to edit or create a new one</p>
            </div>
          )}
        </Card>
      </div>
      </div>
    </MainLayout>
  );
}
