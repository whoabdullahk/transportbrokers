import { AdminLayout } from "@/components/admin-layout";
import { useAdminListLoads, useAdminListLeads } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Truck,
  Inbox,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Package,
  FileText,
  Users,
  Compass
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: loadsRaw, isLoading: loadsLoading } = useAdminListLoads();
  const { data: leadsRaw, isLoading: leadsLoading } = useAdminListLeads();

  const loads = Array.isArray(loadsRaw) ? loadsRaw : [];
  const leads = Array.isArray(leadsRaw) ? leadsRaw : [];

  // Loads calculations
  const totalLoads = loads.length;
  const inTransitCount = loads.filter(
    (l) => l.status.toLowerCase().includes("transit") || l.status.toLowerCase().includes("dispatched")
  ).length;
  const deliveredCount = loads.filter((l) => l.status.toLowerCase().includes("delivered")).length;
  const pendingCount = loads.filter(
    (l) => l.status.toLowerCase().includes("pending") || l.status.toLowerCase().includes("booked")
  ).length;
  const exceptionCount = loads.filter(
    (l) => l.status.toLowerCase().includes("exception") || l.status.toLowerCase().includes("delay")
  ).length;

  // Leads calculations
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status.toLowerCase() === "new").length;
  const contactedLeadsCount = leads.filter((l) => l.status.toLowerCase() === "contacted").length;

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("delivered")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (s.includes("transit") || s.includes("dispatched")) {
      return "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/25";
    }
    if (s.includes("exception") || s.includes("delay")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
    if (s.includes("new")) {
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
    return "bg-neutral-500/10 text-neutral-300 border-neutral-500/20";
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Dashboard Top Hero Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Operations Executive Console</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">System Telemetry &amp; Overview</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Real-time monitoring of commercial loads, rate confirmations, and inbound shipper requests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/loads">
              <Button className="bg-[#D4AF37] hover:bg-[#F4C542] text-[#0b0d11] font-bold text-xs rounded-xl shadow-md cursor-pointer">
                <Plus className="w-4 h-4 mr-1.5" /> New Load
              </Button>
            </Link>
            <Link href="/rate-confirmations">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white font-semibold text-xs rounded-xl cursor-pointer">
                <FileText className="w-4 h-4 mr-1.5 text-[#D4AF37]" /> Create Rate Con
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Primary KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Loads */}
          <Card className="bg-[#12151c] border-white/10 shadow-lg hover:border-[#D4AF37]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Total Loads
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <Truck className="h-4 w-4 text-[#D4AF37]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white font-mono">{totalLoads}</div>
              <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1.5">
                <span className="text-[#D4AF37] font-semibold">{inTransitCount} active</span> in transit
              </p>
            </CardContent>
          </Card>

          {/* Active in Transit */}
          <Card className="bg-[#12151c] border-white/10 shadow-lg hover:border-emerald-500/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Active Transit
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Compass className="h-4 w-4 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-emerald-400 font-mono">{inTransitCount}</div>
              <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1.5">
                <span className="text-emerald-400 font-semibold">{deliveredCount}</span> delivered this cycle
              </p>
            </CardContent>
          </Card>

          {/* Exception Alerts */}
          <Card className="bg-[#12151c] border-white/10 shadow-lg hover:border-rose-500/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Action Alerts
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-rose-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-black font-mono ${exceptionCount > 0 ? "text-rose-400" : "text-white"}`}>
                {exceptionCount}
              </div>
              <p className="text-xs text-neutral-400 mt-1.5">
                {exceptionCount > 0 ? "Requiring immediate dispatch attention" : "Zero active corridor exceptions"}
              </p>
            </CardContent>
          </Card>

          {/* Total Leads / Inquiries */}
          <Card className="bg-[#12151c] border-white/10 shadow-lg hover:border-cyan-500/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Shipper Inquiries
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Inbox className="h-4 w-4 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white font-mono">{totalLeads}</div>
              <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1.5">
                <span className="text-cyan-400 font-semibold">{newLeadsCount} new</span> uncontacted inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Operations Matrix */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Loads Card */}
          <Card className="bg-[#12151c] border-white/10 shadow-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
              <div>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#D4AF37]" />
                  <span>Recent Active Loads</span>
                </CardTitle>
                <p className="text-xs text-neutral-400 mt-0.5">Real-time status of latest tracking dispatches.</p>
              </div>
              <Link
                href="/loads"
                className="text-xs font-mono font-bold uppercase text-[#D4AF37] hover:text-[#F4C542] flex items-center gap-1 transition-colors"
              >
                <span>View All ({totalLoads})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {loads?.slice(0, 5).map((load) => (
                  <div
                    key={load.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-black/30 hover:border-[#D4AF37]/30 transition-all duration-200"
                  >
                    <div className="flex flex-col min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white tracking-wider">
                          {load.trackingId}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-medium truncate max-w-[140px]">
                          {load.carrierName}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 truncate mt-0.5">
                        {load.outboundRoute || "Corridor TBD"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-md border font-semibold ${getStatusBadge(
                          load.status
                        )}`}
                      >
                        {load.status}
                      </span>
                    </div>
                  </div>
                ))}

                {(!loads || loads.length === 0) && (
                  <div className="text-center py-10 text-neutral-500 text-xs font-mono uppercase tracking-wider">
                    No active loads recorded in system.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Leads Card */}
          <Card className="bg-[#12151c] border-white/10 shadow-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
              <div>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-cyan-400" />
                  <span>Recent Shipper Leads</span>
                </CardTitle>
                <p className="text-xs text-neutral-400 mt-0.5">Latest contact &amp; freight inquiries submitted.</p>
              </div>
              <Link
                href="/leads"
                className="text-xs font-mono font-bold uppercase text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>View All ({totalLeads})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {leads?.slice(0, 5).map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-black/30 hover:border-cyan-500/30 transition-all duration-200"
                  >
                    <div className="flex flex-col min-w-0 pr-3">
                      <span className="font-semibold text-sm text-white truncate">{lead.fullName}</span>
                      <span className="text-xs text-neutral-400 truncate mt-0.5">
                        {lead.companyName ? `${lead.companyName} • ` : ""}
                        {lead.subject || "Freight Inquiry"}
                      </span>
                    </div>

                    <div className="shrink-0">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-md border font-semibold ${getStatusBadge(
                          lead.status || "New"
                        )}`}
                      >
                        {lead.status || "New"}
                      </span>
                    </div>
                  </div>
                ))}

                {(!leads || leads.length === 0) && (
                  <div className="text-center py-10 text-neutral-500 text-xs font-mono uppercase tracking-wider">
                    No leads currently recorded.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
