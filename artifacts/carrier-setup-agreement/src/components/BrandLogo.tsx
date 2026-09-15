export default function BrandLogo({ size = 48, dark = false }: { size?: number; dark?: boolean }) {
  const color = dark ? '#FFFFFF' : '#000000';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TRANSPORT BROKERS INC."
    >
      {/* Minimalist Geometric Architectural Monogram */}
      <rect x="3" y="4" width="34" height="7" rx="0.5" fill={color} />
      <rect x="3" y="4" width="7.5" height="32" rx="0.5" fill={color} />
      <rect x="15" y="16.5" width="17" height="6.5" rx="0.5" fill={color} />
      <rect x="24.5" y="16.5" width="7.5" height="19.5" rx="0.5" fill={color} />
      <rect x="3" y="29" width="29" height="7" rx="0.5" fill={color} />
    </svg>
  );
}
