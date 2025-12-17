import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Mail, Save, Copy } from "lucide-react";

interface Template {
  id: string;
  name: string;
  subject: string;
  tags: string[];
  body: string;
  lastModified: string;
}

const MOCK_TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Introductory Email",
    subject: "Introduction: {{user.company}} x {{lead.company}}",
    tags: ["Outbound", "Cold"],
    body: "Hi {{lead.name}},\n\nI hope this email finds you well. I'm reaching out because...",
    lastModified: "2 hours ago",
  },
  {
    id: "2",
    name: "Meeting Follow-up",
    subject: "Great speaking with you today",
    tags: ["Follow-up", "Meeting"],
    body: "Hi {{lead.name}},\n\nThanks for taking the time to chat today. As promised, here are the resources...",
    lastModified: "1 day ago",
  },
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Editor state
  const [editorBody, setEditorBody] = useState("");
  const [editorName, setEditorName] = useState("");
  const [editorSubject, setEditorSubject] = useState("");

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setEditorBody(template.body);
    setEditorName(template.name);
    setEditorSubject(template.subject);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedTemplate(null);
    setEditorBody("");
    setEditorName("");
    setEditorSubject("");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? {
        ...t,
        name: editorName,
        subject: editorSubject,
        body: editorBody,
        lastModified: "Just now"
      } : t));
    } else {
      const newTemplate: Template = {
        id: Math.random().toString(36).substr(2, 9),
        name: editorName || "Untitled Template",
        subject: editorSubject,
        tags: [],
        body: editorBody,
        lastModified: "Just now"
      };
      setTemplates([newTemplate, ...templates]);
    }
    setIsEditing(false);
  };

  const insertVariable = (variable: string) => {
    setEditorBody(prev => prev + ` {{${variable}}} `);
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Email Templates</h2>
          <p className="text-muted-foreground">Create and manage email templates for your team.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Sidebar List */}
        <Card className="col-span-4 flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleEdit(template)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedTemplate?.id === template.id 
                      ? "bg-primary/5 border-primary" 
                      : "hover:bg-muted border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium truncate">{template.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{template.lastModified}</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mb-1 truncate">
                    Sub: {template.subject}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {template.body}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map(tag => (
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
              <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    value={editorName}
                    onChange={(e) => setEditorName(e.target.value)}
                    className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 px-0 w-1/2"
                    placeholder="Template Name"
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
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground w-16">Subject:</span>
                  <Input
                    value={editorSubject}
                    onChange={(e) => setEditorSubject(e.target.value)}
                    className="flex-1 h-9"
                    placeholder="Email Subject Line"
                  />
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
              </div>

              <div className="flex-1 p-4">
                <Textarea
                  value={editorBody}
                  onChange={(e) => setEditorBody(e.target.value)}
                  className="h-full resize-none border-none shadow-none focus-visible:ring-0 text-base p-0 font-mono"
                  placeholder="Hi {{lead.name}}..."
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <Mail className="h-16 w-16 mb-4 opacity-20" />
              <p>Select a template to edit or create a new one</p>
            </div>
          )}
        </Card>
      </div>
      </div>
    </MainLayout>
  );
}
