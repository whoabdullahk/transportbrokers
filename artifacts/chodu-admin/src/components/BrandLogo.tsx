import { Truck } from "lucide-react";

export default function BrandLogo({ size = 48, dark = false }: { size?: number; dark?: boolean }) {
  const color = dark ? '#FFFFFF' : '#000000';
  return (
    <div className="flex items-center gap-2" style={{ color }}>
      <Truck size={size} strokeWidth={2.5} />
      <div className="flex flex-col justify-center">
        <span className="font-black leading-none" style={{ fontSize: size * 0.45 }}>TRANSPORT</span>
        <span className="font-bold leading-none tracking-widest" style={{ fontSize: size * 0.28, color: '#D4AF37' }}>BROKERS INC.</span>
      </div>
    </div>
  );
}
