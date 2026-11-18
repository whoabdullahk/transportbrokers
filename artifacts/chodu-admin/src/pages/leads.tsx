import { AdminLayout } from "@/components/admin-layout";
import {
  useAdminListLeads,
  useAdminUpdateLead,
  getAdminListLeadsQueryKey
} from "@workspace/api-client-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Loader2,
  Mail,
  Phone,
  Building,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Inbox,
  UserCheck,
  Clock,
  Sparkles
} from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@workspace/api-client-react";
import { format } from "date-fns";

export default function AdminLeads() {
  const { data: leads, isLoading } = useAdminListLeads();
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const updateMutation = useAdminUpdateLead();

  const [editStatus, setEditStatus] = useState<string>("");
  const [editNotes, setEditNotes] = useState<string>("");

  const filteredLeads = leads?.filter((l) =>
    l.fullName.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    (l.companyName && l.companyName.toLowerCase().includes(search.toLowerCase())) ||
    (l.subject && l.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status || "New");
    setEditNotes(lead.notes || "");
  };

  const handleSaveLead = () => {
    if (!selectedLead) return;
    updateMutation.mutate(
      {
        id: selectedLead.id,
        data: { status: editStatus, notes: editNotes }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getAdminListLeadsQueryKey() });
          toast({ title: "Lead updated successfully" });
          setSelectedLead({ ...selectedLead, status: editStatus, notes: editNotes });
        },
        onError: () => toast({ title: "Failed to update lead", variant: "destructive" })
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
      case "contacted":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "won":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "lost":
        return "text-neutral-400 bg-white/5 border-white/10";
      default:
        return "text-neutral-300 bg-white/5 border-white/10";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Inbound CRM Records</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Shipper &amp; Carrier Leads</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Manage quotes, carrier inquiries, and general dispatch consultation requests.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-[#12151c] border border-white/10 rounded-2xl px-3 py-1.5 w-full max-w-md shadow-sm">
            <Search className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
            <Input
              placeholder="Search by name, email, company, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9 text-xs text-white placeholder:text-neutral-500 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-neutral-400 hover:text-white px-2 font-mono"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <span>SHOWING:</span>
            <span className="font-bold text-white px-2 py-1 rounded-md bg-white/5 border border-white/10">
              {filteredLeads?.length || 0} of {leads?.length || 0} Records
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-white/10 bg-[#12151c] overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Date</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Contact</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Subject / Company</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Service Needed</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Status</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400 text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#D4AF37]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mt-2">
                      Loading Leads...
                    </span>
                  </TableCell>
                </TableRow>
              ) : filteredLeads?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-neutral-400 text-xs font-mono uppercase tracking-wider">
                    No matching leads found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads?.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="border-white/5 hover:bg-white/[0.03] transition-colors group cursor-pointer"
                    onClick={() => openLeadDetails(lead)}
                  >
                    <TableCell className="text-xs font-mono text-neutral-400 whitespace-nowrap">
                      {format(new Date(lead.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                          {lead.fullName}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">{lead.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs max-w-[220px]">
                      <div className="font-medium text-neutral-200 truncate">{lead.subject || "Contact Request"}</div>
                      {lead.companyName && (
                        <div className="text-[11px] text-neutral-400 truncate">{lead.companyName}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-300 max-w-[180px] truncate">
                      {lead.serviceInterested || "General Inquiry"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-md border font-semibold ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all rounded-lg"
                      >
                        View <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Slide-over Inspection Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent className="bg-[#101319] border-l-white/10 sm:max-w-[620px] w-full overflow-y-auto p-0 flex flex-col text-white">
          {selectedLead && (
            <>
              {/* Sheet Header */}
              <div className="p-6 border-b border-white/10 bg-black/40">
                <SheetHeader className="text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-md border font-bold ${getStatusColor(
                        selectedLead.status
                      )}`}
                    >
                      {selectedLead.status}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {format(new Date(selectedLead.createdAt), "MMM d, yyyy h:mm a")}
                    </span>
                  </div>

                  <SheetTitle className="text-xl font-bold text-white">
                    {selectedLead.subject || "Contact Request"}
                  </SheetTitle>

                  <SheetDescription className="text-xs text-neutral-400 mt-1">
                    {selectedLead.serviceInterested && (
                      <span className="inline-block bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25 px-3 py-1 rounded-full text-xs font-medium">
                        Target Service: {selectedLead.serviceInterested}
                      </span>
                    )}
                  </SheetDescription>
                </SheetHeader>
              </div>

              {/* Sheet Body */}
              <div className="p-6 flex-1 space-y-6">
                {/* Contact Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Full Name</div>
                    <div className="font-bold text-sm text-white">{selectedLead.fullName}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Company</div>
                    <div className="font-bold text-sm text-white">{selectedLead.companyName || "Independent"}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Email Address</div>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="font-medium text-xs font-mono text-[#D4AF37] hover:underline break-all"
                    >
                      {selectedLead.email}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Phone</div>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="font-medium text-xs font-mono text-[#D4AF37] hover:underline"
                    >
                      {selectedLead.phone || "N/A"}
                    </a>
                  </div>
                </div>

                {/* Inquiry Message */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold border-b border-white/10 pb-2">
                    Inquiry Message Body
                  </h4>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed font-sans">
                    {selectedLead.message}
                  </div>
                </div>

                {/* Lead Status & Notes Management */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold border-b border-white/10 pb-2">
                    Lead Management Desk
                  </h4>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Update CRM Status
                      </label>
                      <Select value={editStatus} onValueChange={setEditStatus}>
                        <SelectTrigger className="bg-black/40 border-white/10 h-11 rounded-xl text-xs text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#12151c] border-white/10 text-white">
                          <SelectItem value="New">New (Uncontacted)</SelectItem>
                          <SelectItem value="Contacted">Contacted</SelectItem>
                          <SelectItem value="Won">Won (Onboarded)</SelectItem>
                          <SelectItem value="Lost">Lost / Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Internal Dispatch Notes
                      </label>
                      <Textarea
                        placeholder="Add notes, follow-up callbacks, or carrier equipment details..."
                        className="min-h-[110px] bg-black/40 border-white/10 rounded-xl resize-none text-xs text-white placeholder:text-neutral-500"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleSaveLead}
                      className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#F5D061] hover:from-[#e5bd3d] hover:to-[#ffd86b] text-[#090b0e] font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg cursor-pointer"
                      disabled={
                        updateMutation.isPending ||
                        (editStatus === selectedLead.status && editNotes === (selectedLead.notes || ""))
                      }
                    >
                      {updateMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      )}
                      Save Lead Updates
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}
