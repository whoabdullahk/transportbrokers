import { AdminLayout } from "@/components/admin-layout";
import {
  useAdminListRateConfirmations,
  useAdminCreateRateConfirmation,
  useAdminUpdateRateConfirmation,
  useAdminDeleteRateConfirmation,
  getAdminListRateConfirmationsQueryKey,
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
  Plus, Pencil, Trash2, Loader2, FileText, Hash, Building2,
  Route, Package, DollarSign, Save, MessageSquare, Printer, RotateCcw, AlertCircle, Mail,
  Download, Search, TrendingUp, Truck, CheckCircle2, X
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
import type { RateConfirmation } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { jsPDF } from "jspdf";

const DEFAULT_SPECIAL_INSTRUCTIONS = `***Driver must accept MacroPoint and track for the duration of this load. Any failure to do so will result in a minimum of a $250 fine, deducted from the settlement of this load. Any delivery date and time, other than what is listed on the Rate Agreement, will result in a minimum of a $200 fine, deducted from the settlement of the load. Repair receipts must accompany any breakdowns in transit or carrier will be fined $200 if delivery date and time on this Rate Agreement is not met. That fine will be deducted from the settlement of this shipment ...

***goldstartranposrtationinc.com MUST BE NOTIFIED 3 HOURS PRIOR TO DELIVERY APPOINTMENT IF THE DRIVER WILL BE LATE. ANY LATE OR MISSED DELIVERIES MAY RESULT IN LONG DWELL TIMES AND/OR LAYOVER(S) UNTIL NEXT AVAILABLE APPOINTMENT IS SCHEDULED.`;

const DEFAULT_REMARKS = `Please submit ALL pages of the POD with a receiver signature within 72 hours of delivery. ***CARRIERS MUST REPORT DETENTION 1 HOUR PRIOR TO OCCURANCE AND MUST SUBMIT LUMPER RECEIPT WITHIN 24-48 HOURS OF DELIVERY IF THERE IS ONE. FAILURE TO DO SO WILL RESULT IN NON-PAYMENT OF CHARGES.***

Failure to notify Gold Star Transportation, Inc. within 1HR of occurrence results in time starting 1 HR from time of Email. Arrival and Departure times to be clearly written on BOL by shipper/receiver. Please Email to brandontaylor@goldstartranposrtationinc.com within 24HRS for payment.`;

const rcSchema = z.object({
  proNumber: z.string().optional(),
  daysDedicatedLane: z.string().optional(),
  rcDateTime: z.string().min(1, "Required"),
  fromCompany: z.string().min(1, "Required"),
  fromPhone: z.string().optional(),
  fromEmail: z.string().optional(),
  carrierName: z.string().min(1, "Required"),
  carrierPhone: z.string().optional(),
  carrierEmail: z.string().optional(),
  mcNumber: z.string().optional(),
  dotNumber: z.string().optional(),
  driverName: z.string().optional(),
  truckNumber: z.string().optional(),
  trailerNumber: z.string().optional(),
  driverCell: z.string().optional(),
  miles: z.string().optional(),
  sizeType: z.string().optional(),
  pieces: z.string().optional(),
  description: z.string().optional(),
  weightLbs: z.string().optional(),
  hotLoad: z.string().optional(),
  lineHaulRate: z.string().optional(),
  totalRateUsd: z.string().optional(),
  outboundPickupAddress: z.string().optional(),
  outboundDeliveryAddress: z.string().optional(),
  outboundHours: z.string().optional(),
  outboundPhoneContact: z.string().optional(),
  outboundAppointmentDate: z.string().optional(),
  outboundAppointmentTime: z.string().optional(),
  outboundPieces: z.string().optional(),
  outboundWeight: z.string().optional(),
  dispatchNotes: z.string().optional(),
  returnPickupAddress: z.string().optional(),
  returnDeliveryAddress: z.string().optional(),
  returnHours: z.string().optional(),
  returnPhoneContact: z.string().optional(),
  returnAppointmentDate: z.string().optional(),
  returnAppointmentTime: z.string().optional(),
  returnPieces: z.string().optional(),
  returnWeight: z.string().optional(),
  specialInstructions: z.string().optional(),
  remarks: z.string().optional(),
});

type RcFormValues = z.infer<typeof rcSchema>;

function nowLocalDateTime(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const EMPTY_FORM_VALUES: RcFormValues = {
  proNumber: "",
  daysDedicatedLane: "",
  rcDateTime: nowLocalDateTime(),
  fromCompany: "GOLD STAR TRANSPORTATION, INC.",
  fromPhone: "+1 (913) 298-1729",
  fromEmail: "brandontaylor@goldstartranposrtationinc.com",
  carrierName: "",
  carrierPhone: "",
  carrierEmail: "",
  mcNumber: "",
  dotNumber: "",
  driverName: "",
  truckNumber: "",
  trailerNumber: "",
  driverCell: "",
  miles: "",
  sizeType: "",
  pieces: "",
  description: "",
  weightLbs: "",
  hotLoad: "no",
  lineHaulRate: "",
  totalRateUsd: "",
  outboundPickupAddress: "",
  outboundDeliveryAddress: "",
  outboundHours: "",
  outboundPhoneContact: "",
  outboundAppointmentDate: "",
  outboundAppointmentTime: "",
  outboundPieces: "",
  outboundWeight: "",
  dispatchNotes: "",
  returnPickupAddress: "",
  returnDeliveryAddress: "",
  returnHours: "",
  returnPhoneContact: "",
  returnAppointmentDate: "",
  returnAppointmentTime: "",
  returnPieces: "",
  returnWeight: "",
  specialInstructions: DEFAULT_SPECIAL_INSTRUCTIONS,
  remarks: DEFAULT_REMARKS,
};

function numOrUndefined(value?: string): number | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function toPayload(values: RcFormValues) {
  return {
    proNumber: values.proNumber || undefined,
    daysDedicatedLane: values.daysDedicatedLane || undefined,
    rcDateTime: new Date(values.rcDateTime).toISOString(),
    fromCompany: values.fromCompany,
    fromPhone: values.fromPhone || undefined,
    fromEmail: values.fromEmail || undefined,
    carrierName: values.carrierName,
    carrierPhone: values.carrierPhone || undefined,
    carrierEmail: values.carrierEmail || undefined,
    mcNumber: values.mcNumber || undefined,
    dotNumber: values.dotNumber || undefined,
    driverName: values.driverName || undefined,
    truckNumber: values.truckNumber || undefined,
    trailerNumber: values.trailerNumber || undefined,
    driverCell: values.driverCell || undefined,
    miles: numOrUndefined(values.miles),
    sizeType: values.sizeType || undefined,
    pieces: numOrUndefined(values.pieces),
    description: values.description || undefined,
    weightLbs: numOrUndefined(values.weightLbs),
    hotLoad: values.hotLoad === "yes",
    lineHaulRate: numOrUndefined(values.lineHaulRate),
    totalRateUsd: numOrUndefined(values.totalRateUsd),
    outboundPickupAddress: values.outboundPickupAddress || undefined,
    outboundDeliveryAddress: values.outboundDeliveryAddress || undefined,
    outboundHours: values.outboundHours || undefined,
    outboundPhoneContact: values.outboundPhoneContact || undefined,
    outboundAppointmentDate: values.outboundAppointmentDate || undefined,
    outboundAppointmentTime: values.outboundAppointmentTime || undefined,
    outboundPieces: numOrUndefined(values.outboundPieces),
    outboundWeight: numOrUndefined(values.outboundWeight),
    dispatchNotes: values.dispatchNotes || undefined,
    returnPickupAddress: values.returnPickupAddress || undefined,
    returnDeliveryAddress: values.returnDeliveryAddress || undefined,
    returnHours: values.returnHours || undefined,
    returnPhoneContact: values.returnPhoneContact || undefined,
    returnAppointmentDate: values.returnAppointmentDate || undefined,
    returnAppointmentTime: values.returnAppointmentTime || undefined,
    returnPieces: numOrUndefined(values.returnPieces),
    returnWeight: numOrUndefined(values.returnWeight),
    specialInstructions: values.specialInstructions || undefined,
    remarks: values.remarks || undefined,
  };
}

function fromRateConfirmation(rc: RateConfirmation): RcFormValues {
  return {
    proNumber: rc.proNumber ?? "",
    daysDedicatedLane: rc.daysDedicatedLane ?? "",
    rcDateTime: rc.rcDateTime.slice(0, 16),
    fromCompany: rc.fromCompany,
    fromPhone: rc.fromPhone ?? "",
    fromEmail: rc.fromEmail ?? "",
    carrierName: rc.carrierName,
    carrierPhone: rc.carrierPhone ?? "",
    carrierEmail: rc.carrierEmail ?? "",
    mcNumber: rc.mcNumber ?? "",
    dotNumber: rc.dotNumber ?? "",
    driverName: rc.driverName ?? "",
    truckNumber: rc.truckNumber ?? "",
    trailerNumber: rc.trailerNumber ?? "",
    driverCell: rc.driverCell ?? "",
    miles: rc.miles != null ? String(rc.miles) : "",
    sizeType: rc.sizeType ?? "",
    pieces: rc.pieces != null ? String(rc.pieces) : "",
    description: rc.description ?? "",
    weightLbs: rc.weightLbs != null ? String(rc.weightLbs) : "",
    hotLoad: rc.hotLoad ? "yes" : "no",
    lineHaulRate: rc.lineHaulRate != null ? String(rc.lineHaulRate) : "",
    totalRateUsd: rc.totalRateUsd != null ? String(rc.totalRateUsd) : "",
    outboundPickupAddress: rc.outboundPickupAddress ?? "",
    outboundDeliveryAddress: rc.outboundDeliveryAddress ?? "",
    outboundHours: rc.outboundHours ?? "",
    outboundPhoneContact: rc.outboundPhoneContact ?? "",
    outboundAppointmentDate: rc.outboundAppointmentDate ?? "",
    outboundAppointmentTime: rc.outboundAppointmentTime ?? "",
    outboundPieces: rc.outboundPieces != null ? String(rc.outboundPieces) : "",
    outboundWeight: rc.outboundWeight != null ? String(rc.outboundWeight) : "",
    dispatchNotes: rc.dispatchNotes ?? "",
    returnPickupAddress: rc.returnPickupAddress ?? "",
    returnDeliveryAddress: rc.returnDeliveryAddress ?? "",
    returnHours: rc.returnHours ?? "",
    returnPhoneContact: rc.returnPhoneContact ?? "",
    returnAppointmentDate: rc.returnAppointmentDate ?? "",
    returnAppointmentTime: rc.returnAppointmentTime ?? "",
    returnPieces: rc.returnPieces != null ? String(rc.returnPieces) : "",
    returnWeight: rc.returnWeight != null ? String(rc.returnWeight) : "",
    specialInstructions: rc.specialInstructions ?? "",
    remarks: rc.remarks ?? "",
  };
}

function formatCurrency(value: number | null) {
  if (value == null) return "--";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function SectionHeader({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-6 first:pt-0">
      <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
      <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{children}</span>
      <div className="flex-1 h-px bg-white/15" />
    </div>
  );
}

const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

function RateConfirmationFormFields({ form }: { form: UseFormReturn<RcFormValues> }) {
  return (
    <div className="space-y-6">
      <SectionHeader icon={Hash}>Header Information</SectionHeader>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="daysDedicatedLane" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Days of Lanes</FormLabel>
            <FormControl><Input {...field} placeholder="e.g. Mon, Wed, Fri" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="proNumber" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>PRO #</FormLabel>
            <FormControl><Input {...field} className="font-mono" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="rcDateTime" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Date & Time (EST)</FormLabel>
            <FormControl><Input type="datetime-local" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="fromCompany" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>From</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="fromPhone" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Phone</FormLabel>
            <FormControl><Input {...field} placeholder="+1 (913) 298-1729" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="fromEmail" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Email</FormLabel>
            <FormControl><Input {...field} placeholder="brandontaylor@goldstartranposrtationinc.com" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={Building2}>Carrier Information</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={form.control} name="carrierName" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Carrier Name</FormLabel>
            <FormControl><Input {...field} placeholder="Carrier name" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="carrierPhone" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Phone</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="carrierEmail" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Carrier Email</FormLabel>
            <FormControl><Input {...field} type="email" placeholder="carrier@example.com" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mcNumber" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>MC #</FormLabel>
            <FormControl><Input {...field} className="font-mono" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="dotNumber" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>DOT #</FormLabel>
            <FormControl><Input {...field} className="font-mono" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="driverName" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Driver Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="driverCell" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Driver Cell #</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="truckNumber" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Truck #</FormLabel>
            <FormControl><Input {...field} className="font-mono" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="trailerNumber" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Trailer #</FormLabel>
            <FormControl><Input {...field} className="font-mono" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={Package}>Load Details</SectionHeader>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="miles" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Miles</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="sizeType" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Size & Type</FormLabel>
            <FormControl><Input {...field} placeholder="e.g. 53 VAN" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="pieces" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Pieces</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Description</FormLabel>
            <FormControl><Input {...field} placeholder="Freight" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="weightLbs" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Weight (lbs)</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="hotLoad" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Hot Load</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Yes / No" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={DollarSign}>Rate Information</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={form.control} name="lineHaulRate" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Line Haul Rate ($)</FormLabel>
            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="totalRateUsd" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Total Rate USD ($)</FormLabel>
            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={Route}>Outbound Route</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={form.control} name="outboundPickupAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Pickup Address</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="outboundDeliveryAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Delivery Address</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={form.control} name="outboundHours" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Hours</FormLabel>
            <FormControl><Input {...field} placeholder="0800-1100" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="outboundPhoneContact" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Phone / Contact</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="outboundAppointmentDate" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Appointment Date</FormLabel>
            <FormControl><Input type="date" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="outboundAppointmentTime" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Appointment Time</FormLabel>
            <FormControl><Input type="time" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="outboundPieces" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Pieces</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="outboundWeight" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Weight</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <FormField control={form.control} name="dispatchNotes" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Dispatch Notes</FormLabel>
          <FormControl><Textarea {...field} className="resize-none min-h-[100px]" /></FormControl>
          <FormMessage />
        </FormItem>
      )} />

      <SectionHeader icon={RotateCcw}>Return Route</SectionHeader>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={form.control} name="returnPickupAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Pickup Address</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="returnDeliveryAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Delivery Address</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={form.control} name="returnHours" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Hours</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="returnPhoneContact" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Phone / Contact</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="returnAppointmentDate" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Appointment Date</FormLabel>
            <FormControl><Input type="date" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="returnAppointmentTime" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Appointment Time</FormLabel>
            <FormControl><Input type="time" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="returnPieces" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Pieces</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField control={form.control} name="returnWeight" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Weight</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <SectionHeader icon={AlertCircle}>Special Instructions & Requirements</SectionHeader>
      <FormField control={form.control} name="specialInstructions" render={({ field }) => (
        <FormItem>
          <FormControl><Textarea {...field} className="resize-none min-h-[140px]" /></FormControl>
          <FormMessage />
        </FormItem>
      )} />

      <SectionHeader icon={MessageSquare}>Remarks</SectionHeader>
      <FormField control={form.control} name="remarks" render={({ field }) => (
        <FormItem>
          <FormControl><Textarea {...field} className="resize-none min-h-[120px]" /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
function generateRcPDF(values: RcFormValues): string {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const margin = 36;
  const PW = W - margin * 2;

  const rcDate = values.rcDateTime
    ? new Date(values.rcDateTime).toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: '2-digit' }) + " " + new Date(values.rcDateTime).toLocaleTimeString("en-US", { hour12: false }) + " (EST)"
    : new Date().toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: '2-digit' }) + " 10:47:00 (EST)";

  const rcDateSimple = values.rcDateTime
    ? new Date(values.rcDateTime).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const docId = "2026" + String(Math.floor(10000000 + Math.random() * 90000000));

  const drawHeader = (pageNumber: number) => {
    // Top border line
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.line(margin, 36, W - margin, 36);

    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Gold Star Transportation, Inc. - Rate Confirmation", margin, 28);
    doc.text(`PRO #: ${values.proNumber || "—"}`, W - margin, 28, { align: "right" });
  };

  const drawFooter = (pageNumber: number) => {
    // Bottom border line
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.line(margin, H - 36, W - margin, H - 36);

    doc.setTextColor(120);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Confirmation Date: ${rcDate}`, margin, H - 24);
    doc.text("Gold Star Transportation, Inc.", W - margin, H - 24, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`${pageNumber}/5`, W - margin, H - 12, { align: "right" });
  };

  const drawSectionBar = (title: string, yPos: number) => {
    doc.setFillColor(43, 43, 43);
    doc.rect(margin, yPos, PW, 16, "F");
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(title.toUpperCase(), W / 2, yPos + 11, { align: "center" });
    return yPos + 16;
  };

  const drawParagraphs = (text: string, x: number, startY: number, width: number, lineHeight = 11, fontSize = 7.5) => {
    let currY = startY;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(50);
    const lines = doc.splitTextToSize(text, width);
    lines.forEach((line: string) => {
      doc.text(line, x, currY);
      currY += lineHeight;
    });
    return currY;
  };

  // ==========================================
  // PAGE 1: Core Details, Stops, Notes
  // ==========================================
  drawHeader(1);

  // Logo: 3D Faceted Gold Star Brand Mark
  const starCx = margin + 24;
  const starCy = 78;
  const starR = 14;
  const starInnerR = starR * 0.42;
  for (let i = 0; i < 5; i++) {
    const aOuter = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const aInnerLeft = -Math.PI / 2 + ((i - 0.5) * 2 * Math.PI) / 5;
    const aInnerRight = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / 5;
    const ox = starCx + starR * Math.cos(aOuter);
    const oy = starCy + starR * Math.sin(aOuter);
    const ilx = starCx + starInnerR * Math.cos(aInnerLeft);
    const ily = starCy + starInnerR * Math.sin(aInnerLeft);
    const irx = starCx + starInnerR * Math.cos(aInnerRight);
    const iry = starCy + starInnerR * Math.sin(aInnerRight);

    doc.setFillColor(255, 222, 115);
    doc.triangle(starCx, starCy, ox, oy, ilx, ily, "F");
    doc.setFillColor(184, 134, 11);
    doc.triangle(starCx, starCy, ox, oy, irx, iry, "F");
  }
  doc.setFillColor(255, 248, 208);
  doc.circle(starCx, starCy, starR * 0.12, "F");

  // Company Name Centered
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Gold Star Transportation, Inc.", W / 2, 70, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80);
  doc.text("9424 REEDS ROAD", W / 2, 81, { align: "center" });
  doc.text("OVERLAND PARK, KS 66207", W / 2, 91, { align: "center" });

  // Rounded gray bars
  let y = 104;
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, PW, 16, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0);
  doc.text(`PRO #: ${values.proNumber || "—"}`, W / 2, y + 11, { align: "center" });

  y += 20;
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, PW, 16, 4, 4, "F");
  doc.text(values.daysDedicatedLane || "—", W / 2, y + 11, { align: "center" });

  // FROM vs DATE & TIME boxes
  y += 24;
  const boxW = (PW - 12) / 2;
  const boxH = 70;

  // Left Box
  doc.setDrawColor(220);
  doc.setLineWidth(1);
  doc.rect(margin, y, boxW, boxH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0);
  doc.text("FROM", margin + 8, y + 12);
  doc.text("Gold Star Transportation, Inc.", margin + 8, y + 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(80);
  doc.text("9424 REEDS ROAD\nOVERLAND PARK, KS 66207\nbrandontaylor@goldstartranposrtationinc.com", margin + 8, y + 34);

  // Right Box
  doc.rect(margin + boxW + 12, y, boxW, boxH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0);
  doc.text("DATE & TIME", margin + boxW + 20, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80);
  doc.text(rcDate, margin + boxW + 20, y + 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0);
  doc.text("Rate Confirmation", margin + boxW + 20, y + 42);

  // CARRIER INFORMATION Section
  y += boxH + 12;
  y = drawSectionBar("CARRIER INFORMATION", y);

  const drawRow = (label1: string, val1: string | undefined | null, label2: string, val2: string | undefined | null) => {
    doc.setDrawColor(220);
    doc.rect(margin, y, PW, 16);
    const colW = PW / 4;

    // Label 1 background
    doc.setFillColor(248, 248, 248);
    doc.rect(margin, y, colW, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(80);
    doc.text(label1, margin + 8, y + 11);

    // Value 1
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(0);
    doc.text(val1 || "—", margin + colW + 8, y + 11);

    // Label 2 background
    doc.setFillColor(248, 248, 248);
    doc.rect(margin + colW * 2, y, colW, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(80);
    doc.text(label2, margin + colW * 2 + 8, y + 11);

    // Value 2
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(0);
    doc.text(val2 || "—", margin + colW * 3 + 8, y + 11);
    y += 16;
  };

  drawRow("Carrier Name", values.carrierName, "MC #", values.mcNumber);
  drawRow("Phone", values.carrierPhone, "DOT #", values.dotNumber);
  drawRow("Driver Name", values.driverName, "Driver Cell #", values.driverCell);
  drawRow("Truck #", values.truckNumber, "Trailer #", values.trailerNumber);

  // LOAD DETAILS Section
  y += 4;
  y = drawSectionBar("LOAD DETAILS", y);
  drawRow("Miles", values.miles ? String(values.miles) : "", "Size & Type", values.sizeType);
  drawRow("Pieces", values.pieces ? String(values.pieces) : "", "Weight", values.weightLbs ? `${values.weightLbs} lbs` : "");

  // Description full width row
  doc.rect(margin, y, PW, 16);
  doc.setFillColor(248, 248, 248);
  doc.rect(margin, y, PW / 4, 16, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(80);
  doc.text("Description", margin + 8, y + 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(0);
  doc.text(values.description || "—", margin + (PW / 4) + 8, y + 11);
  y += 16;

  const totalRateStr = values.totalRateUsd ? `$${Number(values.totalRateUsd).toFixed(2)}` : "$";
  drawRow("Hot Load", values.hotLoad === "yes" ? "Yes" : "No", "Total Rate", totalRateStr);

  // STOPS Section
  y += 4;
  y = drawSectionBar("STOPS", y);

  // Table header
  doc.setFillColor(43, 43, 43);
  doc.rect(margin, y, PW, 14, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("Stop", margin + 4, y + 10);
  doc.text("Pickup Address", margin + 70, y + 10);
  doc.text("Delivery Address", margin + 175, y + 10);
  doc.text("Appointment", margin + 280, y + 10);
  doc.text("Hours", margin + 375, y + 10);
  doc.text("Contact", margin + 420, y + 10);
  doc.text("Pieces", margin + 480, y + 10);
  doc.text("Weight", margin + 510, y + 10);
  y += 14;

  const drawStopRow = (
    label: string,
    pickup: string | undefined | null,
    delivery: string | undefined | null,
    apptDate: string | undefined | null,
    apptTime: string | undefined | null,
    hours: string | undefined | null,
    contact: string | undefined | null,
    pieces: string | undefined | null,
    weight: string | undefined | null
  ) => {
    doc.setDrawColor(220);
    doc.rect(margin, y, PW, 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(0);
    doc.text(label, margin + 4, y + 11);
    doc.text(pickup || "—", margin + 70, y + 11);
    doc.text(delivery || "—", margin + 175, y + 11);
    doc.text(apptDate ? `${apptDate} ${apptTime || ""}` : "—", margin + 280, y + 11);
    doc.text(hours || "—", margin + 375, y + 11);
    doc.text(contact || "—", margin + 420, y + 11);
    doc.text(pieces || "—", margin + 480, y + 11);
    doc.text(weight || "—", margin + 510, y + 11);
    y += 16;
  };

  drawStopRow("Outbound Route", values.outboundPickupAddress, values.outboundDeliveryAddress, values.outboundAppointmentDate, values.outboundAppointmentTime, values.outboundHours, values.outboundPhoneContact, values.outboundPieces ? String(values.outboundPieces) : "", values.outboundWeight ? `${values.outboundWeight} lbs` : "");
  drawStopRow("Return Route", values.returnPickupAddress, values.returnDeliveryAddress, values.returnAppointmentDate, values.returnAppointmentTime, values.returnHours, values.returnPhoneContact, values.returnPieces ? String(values.returnPieces) : "", values.returnWeight ? `${values.returnWeight} lbs` : "");

  // DISPATCH NOTES Section
  y += 4;
  y = drawSectionBar("DISPATCH NOTES", y);
  doc.rect(margin, y, PW, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(values.dispatchNotes || "—", margin + 8, y + 14);

  drawFooter(1);

  // ==========================================
  // PAGE 2: Special Instructions
  // ==========================================
  doc.addPage();
  drawHeader(2);
  y = 55;

  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, PW, 16, 4, 4, "F");

  y += 24;
  y = drawSectionBar("SPECIAL INSTRUCTIONS", y);

  const specText = values.specialInstructions || DEFAULT_SPECIAL_INSTRUCTIONS;
  const specLines = doc.splitTextToSize(specText, PW - 20);
  const specBoxH = specLines.length * 11 + 20;

  doc.setFillColor(254, 249, 195); // soft yellow bg
  doc.rect(margin, y, PW, specBoxH, "F");
  doc.setDrawColor(212, 175, 55);
  doc.rect(margin, y, PW, specBoxH);

  drawParagraphs(specText, margin + 10, y + 15, PW - 20, 11, 7.5);
  y += specBoxH + 40;

  // Signatures on Page 2
  doc.setDrawColor(0);
  doc.setLineWidth(1);
  doc.line(margin, y + 40, margin + 220, y + 40);
  doc.line(W - margin - 220, y + 40, W - margin, y + 40);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Carrier Signature", margin + 110, y + 52, { align: "center" });
  doc.text("Gold Star Transportation, Inc. Representative", W - margin - 110, y + 52, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(`Date: ${rcDateSimple}`, margin + 110, y + 64, { align: "center" });
  doc.text(`Doc ID: ${docId}`, W - margin - 110, y + 64, { align: "center" });

  y += 90;
  // Invoice callout bar
  doc.setFillColor(254, 249, 195);
  doc.roundedRect(margin, y, PW, 32, 6, 6, "F");
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin, y, PW, 32, 6, 6, "D");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(120, 90, 0);
  doc.text(`PRO # ${values.proNumber || "—"} must appear on all Invoices`, W / 2, y + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text("Send Carrier Bills to the Address Above", W / 2, y + 24, { align: "center" });

  drawFooter(2);

  // ==========================================
  // PAGE 3: Remarks & Payment Options
  // ==========================================
  doc.addPage();
  drawHeader(3);
  y = 55;

  // Company Name Centered
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Gold Star Transportation, Inc.", W / 2, y + 15, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80);
  doc.text("9424 REEDS ROAD\nOVERLAND PARK, KS 66207", W / 2, y + 26, { align: "center" });

  y += 50;
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, PW, 16, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0);
  doc.text(`PRO #: ${values.proNumber || "—"}`, W / 2, y + 11, { align: "center" });

  y += 24;
  // FROM vs CARRIER boxes
  doc.setDrawColor(220);
  doc.rect(margin, y, boxW, boxH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("FROM", margin + 8, y + 12);
  doc.text("Gold Star Transportation, Inc.", margin + 8, y + 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("9424 REEDS ROAD\nOVERLAND PARK, KS 66207\nbrandontaylor@goldstartranposrtationinc.com", margin + 8, y + 34);

  doc.rect(margin + boxW + 12, y, boxW, boxH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("CARRIER", margin + boxW + 20, y + 12);
  doc.text(values.carrierName || "—", margin + boxW + 20, y + 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(`${values.carrierPhone || ""}\nMC # ${values.mcNumber || ""}\nDOT ${values.dotNumber || ""}`, margin + boxW + 20, y + 34);

  // REMARKS Section
  y += boxH + 12;
  y = drawSectionBar("REMARKS", y);
  const remarkText = values.remarks || DEFAULT_REMARKS;
  const remarkLines = doc.splitTextToSize(remarkText, PW - 20);
  const remarkBoxH = remarkLines.length * 11 + 20;

  doc.setFillColor(254, 249, 195);
  doc.rect(margin, y, PW, remarkBoxH, "F");
  doc.setDrawColor(212, 175, 55);
  doc.rect(margin, y, PW, remarkBoxH);

  drawParagraphs(remarkText, margin + 10, y + 15, PW - 20, 11, 7.5);
  y += remarkBoxH + 30;

  // PAYMENT OPTIONS Section
  y = drawSectionBar("PAYMENT OPTIONS", y);
  const paymentText = `Invoicing, document collection, and payment for all completed loads will be processed by our team.
Please email your invoice and all supporting documents (legible POD/BOL, lumper receipts, etc.) to: brandontaylor@goldstartranposrtationinc.com. All payments will be made in U.S. Dollars unless approved in writing by Gold Star Transportation, Inc. in advance of the shipment.
Payment Methods & Timing:
ACH Direct Deposit: Payment will be deposited directly into the carrier's bank account within 12-24 hours after receipt and approval of all required and legible paperwork.
Check Payment: Payment will be issued by check after receipt and approval of all required paperwork and mailed to the carrier's registered address.
Standard Contractual Pay: Payment will be made in accordance with contractual pay terms if selected.`;

  const paymentLines = doc.splitTextToSize(paymentText, PW - 20);
  const paymentBoxH = paymentLines.length * 10.5 + 20;

  doc.setFillColor(239, 246, 255); // soft blue bg
  doc.rect(margin, y, PW, paymentBoxH, "F");
  doc.setDrawColor(191, 219, 254);
  doc.rect(margin, y, PW, paymentBoxH);

  drawParagraphs(paymentText, margin + 10, y + 14, PW - 20, 10.5, 7);

  drawFooter(3);

  // ==========================================
  // PAGE 4: Supporting Docs, MMCA Supplement
  // ==========================================
  doc.addPage();
  drawHeader(4);
  y = 55;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0);
  doc.text("•  BOL\n•  Packing slips\n•  Lumper receipts (if applicable)", margin + 15, y + 15);

  doc.setFont("helvetica", "bold");
  doc.text("Please email all supporting documents to:", margin, y + 55);
  doc.setTextColor(120, 90, 0);
  doc.text("brandontaylor@goldstartranposrtationinc.com", margin, y + 68);

  y += 85;
  y = drawSectionBar("Gold Star Transportation, Inc. MASTER MOTOR CARRIER AGREEMENT SUPPLEMENT", y);

  const supplementText = `THIS LOAD CONFIRMATION IS SUBJECT TO THE CONDITIONS OF THE MASTER MOTOR CARRIER AGREEMENT PREVIOUSLY EXECUTED BETWEEN OUR COMPANIES AND THIS ESTABLISHES A SUPPLEMENT TO THE TERMS OF THAT AGREEMENT. WE AGREE TO PAY THE RATES AND CHARGES SHOWN AND NO DIFFERENT TARIFF, RATE, OR SCHEDULE OF RATES APPLIES. THIS LOAD CONFIRMATION IS INCLUSIVE OF ALL CHARGES UNLESS ORAL AND WRITTEN FAX/EMAIL OBJECTIONS ARE MADE TO ITS TERMS, WITHIN TWENTY FOUR (24) HOURS OF RECEIPT OR PRIOR TO WORK BEING INITIATED, WHICHEVER IS EARLIER.

Additional Terms:
1. Service and Rate Stipulation: This rate is reliant upon successful and on-time completion of all load terms as fixed on this supplement. Shipper may reduce the rate if carrier fails to complete any shipment terms and conditions or if the load picks up or delivers after originally scheduled date and time.
2. Seal Integrity, Food Safety & Temperature: Only authorized personnel can remove seals upon arrival to the destination site unless required by in-transit inspections. If a seal is broken in-transit, it must be communicated immediately to the broker. Failure by carrier to maintain seal integrity throughout the trip may result in a claim.
3. Accessorial Charges/OS&D: Accessorial charges must be authorized and approved prior to or at time of occurrence. Pre-approval of detention and layover is strictly required. All overage, shortage, and damage must be reported immediately.
4. Exclusive Use of Trailer: Unless otherwise agreed, carrier's motor vehicle equipment shall be dedicated to exclusive use while transporting freight pursuant to this Rate Confirmation.
5. Cargo Insurance Stipulation: Carrier will provide cargo insurance coverage sufficient to cover the loss or damage of any commodities carried. Carrier's cargo insurance policy must not exclude coverage of any commodities carried.`;

  const supplementLines = doc.splitTextToSize(supplementText, PW - 20);
  const supplementBoxH = supplementLines.length * 9.5 + 40;

  doc.setFillColor(255, 255, 255);
  doc.rect(margin, y, PW, supplementBoxH);
  doc.setDrawColor(200);
  doc.rect(margin, y, PW, supplementBoxH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(120, 90, 0);
  doc.text("Gold Star Transportation, Inc. MASTER MOTOR CARRIER AGREEMENT SUPPLEMENT AND CARRIER LOAD CONFIRMATION CONDITIONS", W / 2, y + 15, { align: "center" });

  drawParagraphs(supplementText, margin + 10, y + 30, PW - 20, 9.5, 6.8);

  drawFooter(4);

  // ==========================================
  // PAGE 5: Driver Loaded, Signatures, Footer callout
  // ==========================================
  doc.addPage();
  drawHeader(5);
  y = 55;

  const driverText = "If BOL is marked Driver Count/Pieces at shipper, driver must confirm the correct amount was loaded BEFORE signing/leaving\nfacility. Call a Representative of Gold Star Transportation, Inc. if shipper will not recount or if there is an error. Customer will\nfile claim if driver signs for incorrect number of cases shipped.";
  const driverLines = doc.splitTextToSize(driverText, PW - 16);
  const driverBoxH = driverLines.length * 11 + 16;

  doc.setFillColor(248, 248, 248);
  doc.rect(margin, y, PW, driverBoxH, "F");
  doc.setDrawColor(220);
  doc.rect(margin, y, PW, driverBoxH);

  drawParagraphs(driverText, margin + 8, y + 12, PW - 16, 11, 8);

  y += driverBoxH + 40;
  doc.setDrawColor(0);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + 220, y);
  doc.line(W - margin - 220, y, W - margin, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Carrier Signature", margin + 110, y + 12, { align: "center" });
  doc.text("Gold Star Transportation, Inc.", W - margin - 110, y + 12, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(values.carrierName || "—", margin + 110, y + 24, { align: "center" });
  doc.text(`Date: ${rcDateSimple}`, margin + 110, y + 34, { align: "center" });
  doc.text(`Date: ${rcDateSimple}`, W - margin - 110, y + 24, { align: "center" });

  y += 70;
  // Bottom callout
  doc.setFillColor(254, 249, 195);
  doc.roundedRect(margin, y, PW, 40, 6, 6, "F");
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin, y, PW, 40, 6, 6, "D");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(120, 90, 0);
  doc.text(`PRO # ${values.proNumber || "—"} must appear on all Invoices`, W / 2, y + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text("Send Carrier Bills to: 9424 REEDS ROAD, OVERLAND PARK, KS 66207", W / 2, y + 24, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text(`Doc ID: ${docId}`, W / 2, y + 33, { align: "center" });

  drawFooter(5);

  const base64 = doc.output("datauristring").split(",")[1];
  return base64;
}

export default function AdminRateConfirmations() {
  const { data: rateConfirmations, isLoading } = useAdminListRateConfirmations();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRc, setEditingRc] = useState<RateConfirmation | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onSendEmail = async (rc: RateConfirmation) => {
    const carrierEmail = rc.carrierEmail;
    if (!carrierEmail) {
      toast({
        title: "No carrier email",
        description: "Please edit this rate confirmation and add a carrier email address first.",
        variant: "destructive",
      });
      return;
    }

    setSendingEmailId(rc.id);
    try {
      const pdfBase64 = generateRcPDF(fromRateConfirmation(rc));
      const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/admin/rate-confirmations/${rc.id}/send-email`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("admin_token")
            ? { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
            : {}),
        },
        body: JSON.stringify({ pdfBase64, toEmail: carrierEmail }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        toast({
          title: "Email Sent!",
          description: data.message || `Rate confirmation sent to ${carrierEmail}`,
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          title: "Failed to send email",
          description: err.error || `Server error (${res.status})`,
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Network error",
        description: e.message || "Could not connect to server",
        variant: "destructive",
      });
    } finally {
      setSendingEmailId(null);
    }
  };

  const createMutation = useAdminCreateRateConfirmation();
  const updateMutation = useAdminUpdateRateConfirmation();
  const deleteMutation = useAdminDeleteRateConfirmation();

  const createForm = useForm<RcFormValues>({
    resolver: zodResolver(rcSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  const editForm = useForm<RcFormValues>({
    resolver: zodResolver(rcSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  const onCreateSubmit = (values: RcFormValues) => {
    const pdfBase64 = generateRcPDF(values);
    createMutation.mutate({ data: { ...toPayload(values), pdfBase64 } as any }, {
      onSuccess: (created: any) => {
        queryClient.invalidateQueries({ queryKey: getAdminListRateConfirmationsQueryKey() });
        setIsCreateOpen(false);
        createForm.reset({ ...EMPTY_FORM_VALUES, rcDateTime: nowLocalDateTime() });
        if (values.carrierEmail && created?.emailSent === false) {
          toast({
            title: "Rate confirmation saved, but email failed",
            description: created?.emailWarning || "Could not send email to carrier. You can retry with the mail button.",
            variant: "destructive",
          });
        } else if (values.carrierEmail && created?.emailSent) {
          toast({
            title: "Rate confirmation created & emailed!",
            description: created?.emailWarning
              ? created.emailWarning
              : `Sent to ${values.carrierEmail} (copy sent to your inbox)`,
          });
        } else {
          toast({ title: "Rate confirmation created successfully" });
        }
      },
      onError: () => toast({ title: "Failed to create rate confirmation", variant: "destructive" }),
    });
  };

  const openEdit = (rc: RateConfirmation) => {
    editForm.reset(fromRateConfirmation(rc));
    setEditingRc(rc);
  };

  const onEditSubmit = (values: RcFormValues) => {
    if (!editingRc) return;
    updateMutation.mutate({ id: editingRc.id, data: toPayload(values) }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListRateConfirmationsQueryKey() });
        setEditingRc(null);
        toast({ title: "Rate confirmation updated successfully" });
      },
      onError: () => toast({ title: "Failed to update rate confirmation", variant: "destructive" }),
    });
  };

  const onDelete = (id: number) => {
    deleteMutation.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListRateConfirmationsQueryKey() });
        toast({ title: "Rate confirmation deleted successfully" });
      },
      onError: () => toast({ title: "Failed to delete rate confirmation", variant: "destructive" }),
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const total = rateConfirmations?.length ?? 0;
  const dispatched = rateConfirmations?.filter((rc) => Boolean(rc.proNumber || rc.driverName)).length ?? 0;
  const totalRevenue = rateConfirmations?.reduce((acc, rc) => acc + (rc.totalRateUsd || 0), 0) ?? 0;
  const avgRate = total > 0 ? totalRevenue / total : 0;

  const filteredRateConfirmations = (rateConfirmations ?? []).filter((rc) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (rc.proNumber && rc.proNumber.toLowerCase().includes(q)) ||
      (rc.carrierName && rc.carrierName.toLowerCase().includes(q)) ||
      (rc.driverName && rc.driverName.toLowerCase().includes(q)) ||
      (rc.truckNumber && rc.truckNumber.toLowerCase().includes(q)) ||
      (rc.carrierEmail && rc.carrierEmail.toLowerCase().includes(q)) ||
      (rc.outboundDeliveryAddress && rc.outboundDeliveryAddress.toLowerCase().includes(q)) ||
      (rc.outboundPickupAddress && rc.outboundPickupAddress.toLowerCase().includes(q))
    );
  });

  const onDownloadPdf = (rc: RateConfirmation) => {
    try {
      const base64 = generateRcPDF(fromRateConfirmation(rc));
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Rate-Confirmation-${rc.proNumber || rc.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: "PDF Generated", description: `Downloaded Rate-Confirmation-${rc.proNumber || rc.id}.pdf` });
    } catch (e: any) {
      toast({ title: "Failed to generate PDF", description: e.message || "Unknown error", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#F4C542]/5 border border-[#D4AF37]/30 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <FileText className="w-6 h-6 text-[#D4AF37]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Rate Confirmations</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">Carrier contracts, automated rate sheets & dispatch billing</p>
            </div>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) createForm.reset({ ...EMPTY_FORM_VALUES, rcDateTime: nowLocalDateTime() });
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4C542] hover:opacity-95 text-[#0B1220] font-bold rounded-xl shadow-lg shadow-[#D4AF37]/15">
                <Plus className="w-4 h-4 mr-2" />
                New Rate Confirmation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[960px] max-h-[85vh] overflow-y-auto bg-[#12151c] border-white/10 text-white shadow-2xl">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">Carrier Agreement Dispatch</span>
                </div>
                <DialogTitle className="text-xl font-bold text-white">Create New Rate Confirmation</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-400">Complete all dispatch fields to generate a binding rate confirmation agreement.</p>
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-6 py-2">
                  <RateConfirmationFormFields form={createForm} />
                  <DialogFooter className="pt-4 border-t border-white/10">
                    <Button type="button" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-[#D4AF37] hover:bg-[#F4C542] text-[#0B1220] font-bold w-full sm:w-auto" disabled={createMutation.isPending}>
                      {createMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save Rate Confirmation
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* 4 Top KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#0E131F]/80 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Total Rate Cons</span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{total}</div>
            <p className="text-[11px] text-muted-foreground mt-1">Lifetime generated agreements</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0E131F]/80 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Dispatched Units</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{dispatched}</div>
            <p className="text-[11px] text-muted-foreground mt-1">Assigned power units & drivers</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0E131F]/80 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Gross Freight Booked</span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-mono">{formatCurrency(totalRevenue)}</div>
            <p className="text-[11px] text-muted-foreground mt-1">Dispatched carrier revenue</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0E131F]/80 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Average Rate</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{formatCurrency(avgRate)}</div>
            <p className="text-[11px] text-muted-foreground mt-1">Average per contracted load</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by PRO #, Carrier, Driver, Truck, Route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/20 placeholder:text-muted-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-xs text-muted-foreground font-mono self-center sm:self-auto">
            Showing <span className="text-white font-bold">{filteredRateConfirmations.length}</span> of <span className="text-white font-bold">{total}</span> rate confirmations
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0E131F]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          <Table>
            <TableHeader className="bg-white/[0.02] border-b border-white/10">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">PRO #</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Carrier & Contact</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Driver & Unit</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Equipment / Route</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Total Rate</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Date</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#D4AF37]" />
                    <p className="text-xs text-muted-foreground mt-2 font-mono">Loading rate confirmations...</p>
                  </TableCell>
                </TableRow>
              ) : filteredRateConfirmations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FileText className="w-8 h-8 text-white/20" />
                      <p className="text-sm font-medium">No rate confirmations found</p>
                      <p className="text-xs text-white/40">Try adjusting your search criteria or create a new confirmation</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRateConfirmations.map((rc) => (
                  <TableRow key={rc.id} className="border-white/5 hover:bg-white/[0.04] transition-colors group">
                    <TableCell className="font-mono font-bold text-white">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                        {rc.proNumber || `RC-${rc.id}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-white text-sm">{rc.carrierName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        {rc.carrierEmail && <span>{rc.carrierEmail}</span>}
                        {rc.carrierPhone && <span>• {rc.carrierPhone}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-200">{rc.driverName || "—"}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">
                        {rc.truckNumber ? `Truck: ${rc.truckNumber}` : ""} {rc.trailerNumber ? `| Trl: ${rc.trailerNumber}` : ""}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-mono text-gray-300">
                        {rc.sizeType || "Dry Van"} {rc.miles ? `• ${rc.miles} mi` : ""}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px] mt-0.5">
                        {rc.outboundDeliveryAddress ? `To: ${rc.outboundDeliveryAddress}` : "Standard Corridor"}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-bold text-[#D4AF37] text-sm">
                      {formatCurrency(rc.totalRateUsd)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">
                      {rc.rcDateTime.slice(0, 10)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Direct PDF Download */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-[#D4AF37] hover:bg-white/5"
                          title="Download PDF"
                          onClick={() => onDownloadPdf(rc)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>

                        {/* Email Carrier */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-[#D4AF37] hover:bg-white/5"
                          title={rc.carrierEmail ? `Email to ${rc.carrierEmail}` : "No carrier email"}
                          disabled={sendingEmailId === rc.id}
                          onClick={() => onSendEmail(rc)}
                        >
                          {sendingEmailId === rc.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                          ) : (
                            <Mail className="w-4 h-4" />
                          )}
                        </Button>

                        {/* Print View */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-[#D4AF37] hover:bg-white/5"
                          title="Print Rate Confirmation"
                          onClick={() => setLocation(`/rate-confirmations/${rc.id}/print`)}
                        >
                          <Printer className="w-4 h-4" />
                        </Button>

                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-[#D4AF37] hover:bg-white/5"
                          title="Edit"
                          onClick={() => openEdit(rc)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-white/5"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#12151c] border-white/10 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Rate Confirmation</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to permanently delete rate confirmation {rc.proNumber ? `#${rc.proNumber}` : `#${rc.id}`}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(rc.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold"
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

      {/* Edit Dialog */}
      <Dialog open={!!editingRc} onOpenChange={(open) => !open && setEditingRc(null)}>
        <DialogContent className="sm:max-w-[960px] max-h-[85vh] overflow-y-auto bg-[#12151c] border-white/10 text-white shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">Modify Carrier Agreement</span>
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              Edit Rate Confirmation {editingRc?.proNumber ? `#${editingRc.proNumber}` : ""}
            </DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6 py-2">
              <RateConfirmationFormFields form={editForm} />
              <DialogFooter className="pt-4 border-t border-white/10">
                <Button type="button" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setEditingRc(null)}>Cancel</Button>
                <Button type="submit" className="bg-[#D4AF37] hover:bg-[#F4C542] text-[#0B1220] font-bold w-full sm:w-auto" disabled={updateMutation.isPending}>
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
