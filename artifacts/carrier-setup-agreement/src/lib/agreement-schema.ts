import { z } from "zod";

export const carrierSchema = z.object({
  carrierName: z.string().trim().min(1, "Carrier name is required").max(100),
  companyName: z.string().trim().max(120),
  mcNumber: z.string().trim().max(20).regex(/^[A-Za-z0-9-]*$/, "Letters, numbers and dashes only"),
  dotNumber: z.string().trim().min(1, "DOT number is required").max(12).regex(/^\d+$/, "Digits only"),
  licenseNumber: z.string().trim().min(1, "Driving license number is required").max(30),
  truckNumber: z.string().trim().max(30),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20).regex(/^[0-9+()\-\s.]+$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
});

export const executionSchema = z.object({
  signature: z.string().trim().min(2, "Signature is required").max(100),
  printName: z.string().trim().min(2, "Print your legal name").max(100),
  date: z.string().min(1, "Date is required"),
  agreed: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

export type CarrierInfo = z.infer<typeof carrierSchema>;
export type ExecutionInfo = { signature: string; printName: string; date: string; agreed: boolean };
