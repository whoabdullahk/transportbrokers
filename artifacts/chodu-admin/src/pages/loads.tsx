import { AdminLayout } from "@/components/admin-layout";
import { useLocation } from "wouter";
import {
  useAdminListLoads,
  useAdminCreateLoad,
  useAdminUpdateLoad,
  useAdminDeleteLoad,
  getAdminListLoadsQueryKey
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
  Plus, Pencil, Trash2, Loader2, Truck, FileText, Hash, Building2,
  Route, Package, DollarSign, Paperclip, Save, Upload, Check, ExternalLink,
  Search, Filter, CheckCircle2, AlertCircle, Compass
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpload } from "@workspace/object-storage-web";
import type { Load } from "@workspace/api-client-react";

const loadSchema = z.object({
  trackingId: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  carrierName: z.string().min(1, "Required"),
  dot: z.string().optional(),
  truck: z.string().optional(),
  slotFeeStatus: z.string().optional(),
  tripsPerWeek: z.string().optional(),
  outboundRoute: z.string().optional(),
  returnRoute: z.string().optional(),
  pickupAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  milesPerSide: z.string().optional(),
  totalRoundTripMiles: z.string().optional(),
  commodity: z.string().optional(),
  outboundWeightLbs: z.string().optional(),
  backhaulWeightLbs: z.string().optional(),
  outboundRate: z.string().min(1, "Required"),
  startDate: z.string().min(1, "Required"),
  contractType: z.string().optional(),
  purpose: z.string().optional(),
  refundableStatus: z.string().optional(),
  appliesTowardContract: z.string().optional(),
});

type LoadFormValues = z.infer<typeof loadSchema>;

const STATUS_OPTIONS = ["Booked", "In Transit", "Delivered", "Cancelled"];

const EMPTY_FORM_VALUES: LoadFormValues = {
  trackingId: "",
  status: "Booked",
  carrierName: "",
  dot: "",
  truck: "",
  slotFeeStatus: "",
  tripsPerWeek: "",
  outboundRoute: "",
  returnRoute: "",
  pickupAddress: "",
  deliveryAddress: "",
  milesPerSide: "",
  totalRoundTripMiles: "",
  commodity: "",
  outboundWeightLbs: "",
  backhaulWeightLbs: "",
  outboundRate: "",
  startDate: "",
  contractType: "",
  purpose: "",
  refundableStatus: "",
  appliesTowardContract: "",
};

function numOrUndefined(value?: string): number | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function toPayload(values: LoadFormValues, billOfLadingPath: string | null) {
  return {
    trackingId: values.trackingId,
    status: values.status,
    carrierName: values.carrierName,
    dot: values.dot || undefined,
    truck: values.truck || undefined,
    slotFeeStatus: values.slotFeeStatus || undefined,
    tripsPerWeek: numOrUndefined(values.tripsPerWeek),
    outboundRoute: values.outboundRoute || undefined,
    returnRoute: values.returnRoute || undefined,
    pickupAddress: values.pickupAddress || undefined,
    deliveryAddress: values.deliveryAddress || undefined,
    milesPerSide: numOrUndefined(values.milesPerSide),
    totalRoundTripMiles: numOrUndefined(values.totalRoundTripMiles),
    commodity: values.commodity || undefined,
    outboundWeightLbs: numOrUndefined(values.outboundWeightLbs),
    backhaulWeightLbs: numOrUndefined(values.backhaulWeightLbs),
    outboundRate: Number(values.outboundRate),
    startDate: values.startDate,
    contractType: values.contractType || undefined,
    purpose: values.purpose || undefined,
    refundableStatus: values.refundableStatus || undefined,
    appliesTowardContract:
      values.appliesTowardContract === "yes" ? true :
        values.appliesTowardContract === "no" ? false : undefined,
    billOfLadingPath: billOfLadingPath || undefined,
  };
}

function statusBadgeClasses(status: string) {
  switch (status) {
    case "Delivered":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "In Transit":
      return "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/25";
    case "Cancelled":
      return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    default:
      return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function SectionHeader({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-6 first:pt-0">
      <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
      <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{children}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function BillOfLadingField({
  billOfLadingPath,
  onUploaded,
}: {
  billOfLadingPath: string | null;
  onUploaded: (path: string) => void;
}) {
  const { toast } = useToast();
  const { uploadFile, isUploading } = useUpload({
    onSuccess: (res) => {
      onUploaded(res.objectPath);
      toast({ title: "Bill of lading uploaded" });
    },
    onError: () => toast({ title: "Failed to upload file", variant: "destructive" }),
  });

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
        Upload Bill of Lading (optional)
      </label>
      <label className="flex items-center gap-2.5 border border-dashed border-white/15 rounded-xl px-4 py-3 text-xs text-neutral-400 cursor-pointer hover:border-[#D4AF37]/50 hover:text-white transition-colors bg-black/40">
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
        ) : billOfLadingPath ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Upload className="w-4 h-4 text-[#D4AF37]" />
        )}
        <span>
          {isUploading ? "Uploading file..." : billOfLadingPath ? "File attached — click to replace" : "Click or drag to attach PDF, DOC, JPG, or PNG"}
        </span>
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          disabled={isUploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
        />
      </label>
      {billOfLadingPath && (
        <a
          href={`/api/storage${billOfLadingPath}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-mono"
        >
          <ExternalLink className="w-3.5 h-3.5" /> View current document
        </a>
      )}
    </div>
  );
}

function LoadFormFields({ form }: { form: UseFormReturn<LoadFormValues> }) {
  return (
    <div className="space-y-6">
      <SectionHeader icon={Hash}>Identification &amp; Status</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="trackingId" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Tracking ID</FormLabel>
            <FormControl><Input {...field} className="font-mono bg-black/40 border-white/10 rounded-xl" placeholder="E.g., GS-94281" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="status" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Load Status</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-black/40 border-white/10 rounded-xl">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#12151c] border-white/10 text-white">
                {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={Building2}>Carrier &amp; Equipment</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField control={form.control} name="carrierName" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Carrier Name</FormLabel>
            <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="Full carrier name" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="dot" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">USDOT #</FormLabel>
            <FormControl><Input {...field} className="font-mono bg-black/40 border-white/10 rounded-xl" placeholder="DOT number" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="truck" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Truck / Unit #</FormLabel>
            <FormControl><Input {...field} className="font-mono bg-black/40 border-white/10 rounded-xl" placeholder="TRK-9428" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="slotFeeStatus" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Slot Fee Status</FormLabel>
            <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="Verified / Paid" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="tripsPerWeek" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Trips Per Week</FormLabel>
            <FormControl><Input type="number" {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="5" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={Route}>Route &amp; Addresses</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="outboundRoute" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Outbound Route</FormLabel>
            <FormControl><Textarea {...field} className="resize-none bg-black/40 border-white/10 rounded-xl text-xs" placeholder="Overland Park, KS → Dallas, TX" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="returnRoute" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Return Route</FormLabel>
            <FormControl><Textarea {...field} className="resize-none bg-black/40 border-white/10 rounded-xl text-xs" placeholder="Dallas, TX → Overland Park, KS" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="pickupAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Pickup Facility Address</FormLabel>
            <FormControl><Textarea {...field} className="resize-none bg-black/40 border-white/10 rounded-xl text-xs" placeholder="Full origin facility address" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="deliveryAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Delivery Facility Address</FormLabel>
            <FormControl><Textarea {...field} className="resize-none bg-black/40 border-white/10 rounded-xl text-xs" placeholder="Full destination facility address" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="milesPerSide" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">One-Way Miles</FormLabel>
            <FormControl><Input type="number" {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="312" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="totalRoundTripMiles" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Total Round Trip Miles</FormLabel>
            <FormControl><Input type="number" {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="624" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={Package}>Commodity &amp; Weights</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField control={form.control} name="commodity" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Commodity Type</FormLabel>
            <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="Dry Goods / Palletized" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="outboundWeightLbs" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Outbound Weight (lbs)</FormLabel>
            <FormControl><Input type="number" {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="42000" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="backhaulWeightLbs" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Backhaul Weight (lbs)</FormLabel>
            <FormControl><Input type="number" {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="38000" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={DollarSign}>Rates &amp; Terms</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="outboundRate" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Total Rate ($ per trip)</FormLabel>
            <FormControl><Input type="number" {...field} className="bg-black/40 border-white/10 rounded-xl font-bold font-mono text-emerald-400" placeholder="2450" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="startDate" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Contract Start Date</FormLabel>
            <FormControl><Input type="date" {...field} className="bg-black/40 border-white/10 rounded-xl text-white" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField control={form.control} name="contractType" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Contract Type</FormLabel>
            <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="60-Day Dedicated" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="purpose" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Reservation Purpose</FormLabel>
            <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="Dedicated Lane" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="refundableStatus" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">Refundable Status</FormLabel>
            <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" placeholder="Yes / No" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  );
}

export default function AdminLoads() {
  const [, setLocation] = useLocation();
  const { data: loads, isLoading } = useAdminListLoads();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLoad, setEditingLoad] = useState<Load | null>(null);
  const [createBolPath, setCreateBolPath] = useState<string | null>(null);
  const [editBolPath, setEditBolPath] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMutation = useAdminCreateLoad();
  const updateMutation = useAdminUpdateLoad();
  const deleteMutation = useAdminDeleteLoad();

  const createForm = useForm<LoadFormValues>({
    resolver: zodResolver(loadSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  const editForm = useForm<LoadFormValues>({
    resolver: zodResolver(loadSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  const onCreateSubmit = (values: LoadFormValues) => {
    createMutation.mutate({ data: toPayload(values, createBolPath) }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListLoadsQueryKey() });
        setIsCreateOpen(false);
        createForm.reset(EMPTY_FORM_VALUES);
        setCreateBolPath(null);
        toast({ title: "Load created successfully" });
      },
      onError: (error: any) => {
        const message = error?.response?.status === 409 ? "That tracking ID is already in use" : "Failed to create load";
        toast({ title: message, variant: "destructive" });
      }
    });
  };

  const openEdit = (load: Load) => {
    editForm.reset({
      trackingId: load.trackingId,
      status: load.status,
      carrierName: load.carrierName,
      dot: load.dot ?? "",
      truck: load.truck ?? "",
      slotFeeStatus: load.slotFeeStatus ?? "",
      tripsPerWeek: load.tripsPerWeek != null ? String(load.tripsPerWeek) : "",
      outboundRoute: load.outboundRoute ?? "",
      returnRoute: load.returnRoute ?? "",
      pickupAddress: load.pickupAddress ?? "",
      deliveryAddress: load.deliveryAddress ?? "",
      milesPerSide: load.milesPerSide != null ? String(load.milesPerSide) : "",
      totalRoundTripMiles: load.totalRoundTripMiles != null ? String(load.totalRoundTripMiles) : "",
      commodity: load.commodity ?? "",
      outboundWeightLbs: load.outboundWeightLbs != null ? String(load.outboundWeightLbs) : "",
      backhaulWeightLbs: load.backhaulWeightLbs != null ? String(load.backhaulWeightLbs) : "",
      outboundRate: String(load.outboundRate),
      startDate: load.startDate.slice(0, 10),
      contractType: load.contractType ?? "",
      purpose: load.purpose ?? "",
      refundableStatus: load.refundableStatus ?? "",
      appliesTowardContract: load.appliesTowardContract === true ? "yes" : load.appliesTowardContract === false ? "no" : "",
    });
    setEditBolPath(load.billOfLadingPath ?? null);
    setEditingLoad(load);
  };

  const onEditSubmit = (values: LoadFormValues) => {
    if (!editingLoad) return;
    updateMutation.mutate({ id: editingLoad.id, data: toPayload(values, editBolPath) }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListLoadsQueryKey() });
        setEditingLoad(null);
        toast({ title: "Load updated successfully" });
      },
      onError: (error: any) => {
        const message = error?.response?.status === 409 ? "That tracking ID is already in use" : "Failed to update load";
        toast({ title: message, variant: "destructive" });
      }
    });
  };

  const onDelete = (id: number) => {
    deleteMutation.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListLoadsQueryKey() });
        toast({ title: "Load deleted successfully" });
      },
      onError: () => toast({ title: "Failed to delete load", variant: "destructive" })
    });
  };

  const filteredLoads = loads?.filter((load) => {
    const matchesSearch =
      load.trackingId.toLowerCase().includes(search.toLowerCase()) ||
      load.carrierName.toLowerCase().includes(search.toLowerCase()) ||
      (load.dot && load.dot.toLowerCase().includes(search.toLowerCase())) ||
      (load.truck && load.truck.toLowerCase().includes(search.toLowerCase())) ||
      (load.outboundRoute && load.outboundRoute.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      load.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalLoads = loads?.length ?? 0;
  const inTransitCount = loads?.filter((l) => l.status.toLowerCase().includes("transit")).length ?? 0;
  const deliveredCount = loads?.filter((l) => l.status.toLowerCase().includes("delivered")).length ?? 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Commercial Freight Operations</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Active Loads Management</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Real-time load manifests, driver dispatch status, and client BOL attachments.
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Dialog open={isCreateOpen} onOpenChange={(open) => {
              setIsCreateOpen(open);
              if (!open) {
                createForm.reset(EMPTY_FORM_VALUES);
                setCreateBolPath(null);
              }
            }}>
              <DialogTrigger asChild>
                <Button className="bg-[#D4AF37] hover:bg-[#F4C542] text-[#0B1220] font-bold rounded-xl text-xs shadow-md cursor-pointer flex-1 sm:flex-none">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Create Load
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[960px] max-h-[85vh] overflow-y-auto bg-[#12151c] border-white/10 text-white">
                <DialogHeader className="border-b border-white/5 pb-4">
                  <DialogTitle className="text-lg font-bold text-white">Create New Load Manifest</DialogTitle>
                </DialogHeader>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4 py-3">
                    <LoadFormFields form={createForm} />
                    <SectionHeader icon={Paperclip}>Documents &amp; Proof of Delivery</SectionHeader>
                    <BillOfLadingField billOfLadingPath={createBolPath} onUploaded={setCreateBolPath} />
                    <DialogFooter className="pt-4 border-t border-white/5">
                      <Button type="submit" className="bg-[#D4AF37] hover:bg-[#F4C542] text-black font-bold w-full sm:w-auto rounded-xl" disabled={createMutation.isPending}>
                        {createMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Load
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="rounded-xl border-white/10 hover:bg-white/5 text-white text-xs font-semibold flex-1 sm:flex-none cursor-pointer"
              onClick={() => setLocation("/rate-confirmations")}
            >
              <FileText className="w-4 h-4 mr-1.5 text-[#D4AF37]" />
              Rate Confirmations
            </Button>
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Total Active Manifests</span>
              <div className="text-2xl font-bold font-mono text-white">{totalLoads}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Dispatched in Transit</span>
              <div className="text-2xl font-bold font-mono text-[#D4AF37]">{inTransitCount}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Compass className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Successfully Delivered</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">{deliveredCount}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-[#12151c] border border-white/10 rounded-2xl px-3 py-1.5 w-full max-w-md shadow-sm">
            <Search className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
            <Input
              placeholder="Search Tracking ID, Carrier, Route, Unit #..."
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

          <div className="flex items-center space-x-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-[#12151c] border-white/10 h-10 rounded-xl text-xs text-neutral-200">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-[#12151c] border-white/10 text-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-xs font-mono text-neutral-400 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
              {filteredLoads?.length || 0} Loads
            </span>
          </div>
        </div>

        {/* Loads Table */}
        <div className="rounded-2xl border border-white/10 bg-[#12151c] overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Tracking ID</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Status</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Carrier</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">USDOT #</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Truck #</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Rate</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Start Date</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#D4AF37]" />
                  </TableCell>
                </TableRow>
              ) : filteredLoads?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-neutral-400 text-xs font-mono uppercase tracking-wider">
                    No loads found matching criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLoads?.map((load) => (
                  <TableRow key={load.id} className="border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <TableCell className="font-mono text-xs font-bold text-white">
                      #{load.trackingId}
                    </TableCell>
                    <TableCell>
                      <span className={`text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5 font-semibold ${statusBadgeClasses(load.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {load.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-white max-w-[160px] truncate">
                      {load.carrierName}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-400 font-mono">{load.dot || "--"}</TableCell>
                    <TableCell className="text-xs text-neutral-400 font-mono">{load.truck || "--"}</TableCell>
                    <TableCell className="text-xs font-mono font-bold text-emerald-400">{formatCurrency(load.outboundRate)}</TableCell>
                    <TableCell className="text-xs text-neutral-400 font-mono">{load.startDate.slice(0, 10)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-neutral-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                          onClick={() => openEdit(load)}
                          title="Edit Load"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete Load"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#12151c] border-white/10 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-lg font-bold text-white">Delete Load Manifest</AlertDialogTitle>
                              <AlertDialogDescription className="text-xs text-neutral-400 leading-relaxed">
                                Are you sure you want to delete load #{load.trackingId}? This will remove tracking status for the carrier.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="pt-2">
                              <AlertDialogCancel className="bg-transparent border-white/10 text-neutral-300 hover:bg-white/5">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(load.id)}
                                className="bg-rose-600 hover:bg-rose-500 text-white font-bold"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Load Dialog */}
      <Dialog open={!!editingLoad} onOpenChange={(open) => !open && setEditingLoad(null)}>
        <DialogContent className="sm:max-w-[960px] max-h-[85vh] overflow-y-auto bg-[#12151c] border-white/10 text-white">
          <DialogHeader className="border-b border-white/5 pb-4">
            <DialogTitle className="text-lg font-bold text-white">Edit Load Manifest: #{editingLoad?.trackingId}</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-3">
              <LoadFormFields form={editForm} />
              <SectionHeader icon={Paperclip}>Documents &amp; Proof of Delivery</SectionHeader>
              <BillOfLadingField billOfLadingPath={editBolPath} onUploaded={setEditBolPath} />
              <DialogFooter className="pt-4 border-t border-white/5 gap-2">
                <Button type="button" variant="outline" onClick={() => setEditingLoad(null)} className="border-white/10 text-neutral-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#D4AF37] hover:bg-[#F4C542] text-black font-bold rounded-xl" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
