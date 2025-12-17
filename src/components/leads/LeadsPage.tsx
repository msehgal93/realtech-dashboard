import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search, Filter, Download, Upload, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const INITIAL_LEADS = [
  {
    id: "LEAD-1001",
    name: "Alice Johnson",
    company: "TechCorp Inc.",
    status: "New",
    value: "$12,000",
    lastContact: "2 hours ago",
    sla: "On Track",
  },
  {
    id: "LEAD-1002",
    name: "Bob Smith",
    company: "Global Solutions",
    status: "Contacted",
    value: "$8,500",
    lastContact: "1 day ago",
    sla: "Warning",
  },
  {
    id: "LEAD-1003",
    name: "Carol Williams",
    company: "Innovate LLC",
    status: "Qualified",
    value: "$25,000",
    lastContact: "3 days ago",
    sla: "On Track",
  },
  {
    id: "LEAD-1004",
    name: "David Brown",
    company: "Alpha Systems",
    status: "Proposal",
    value: "$45,000",
    lastContact: "5 hours ago",
    sla: "On Track",
  },
  {
    id: "LEAD-1005",
    name: "Eva Davis",
    company: "Beta Corp",
    status: "Negotiation",
    value: "$18,000",
    lastContact: "1 week ago",
    sla: "Breached",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(l => l !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleBulkDelete = () => {
    setLeads(leads.filter(l => !selectedLeads.includes(l.id)));
    setSelectedLeads([]);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-display">Leads</h2>
            <p className="text-muted-foreground">
              Manage your leads and track their progress.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {selectedLeads.length > 0 && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-5">
              <span className="text-sm text-muted-foreground mr-2">
                {selectedLeads.length} selected
              </span>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className={selectedLeads.includes(lead.id) ? "bg-muted/50" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => toggleSelectLead(lead.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{lead.id}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <Badge variant={
                      lead.status === "New" ? "default" :
                      lead.status === "Contacted" ? "secondary" :
                      lead.status === "Qualified" ? "outline" :
                      "secondary"
                    }>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.value}</TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell>
                    <Badge variant={
                      lead.sla === "On Track" ? "outline" :
                      lead.sla === "Warning" ? "secondary" : // Should be warning color
                      "destructive"
                    } className={
                      lead.sla === "On Track" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                      lead.sla === "Warning" ? "text-amber-600 border-amber-200 bg-amber-50" :
                      "animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    }>
                      {lead.sla}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit lead</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete lead</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
