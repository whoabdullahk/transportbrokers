interface BrandLogoProps {
  size?: number;
  dark?: boolean;
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({
  size = 40,
  dark = false,
  className = "",
  showText = true,
}: BrandLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="adminNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E1B38" />
            <stop offset="50%" stopColor="#0A1428" />
            <stop offset="100%" stopColor="#050B16" />
          </linearGradient>
          <linearGradient id="adminGoldL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0A8" />
            <stop offset="35%" stopColor="#F5D061" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="adminGoldD" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5B232" />
            <stop offset="50%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#7A5200" />
          </linearGradient>
          <linearGradient id="adminGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE885" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#946C0B" />
          </linearGradient>
        </defs>

        {/* Shield Backing */}
        <path
          d="M100 12 L176 46 L176 124 L100 188 L24 124 L24 46 Z"
          fill="url(#adminNavy)"
          stroke="url(#adminGoldRing)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M100 24 L164 53 L164 118 L100 174 L36 118 L36 53 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeLinejoin="round"
        />

        {/* Chevrons */}
        <path d="M28 100 L44 88 L52 94 L36 106 Z" fill="#D4AF37" opacity="0.6" />
        <path d="M172 100 L156 88 L148 94 L164 106 Z" fill="#D4AF37" opacity="0.6" />

        {/* Faceted 5-point Star */}
        <g>
          <polygon points="100,100 100,38 84.8,81.9" fill="url(#adminGoldL)" />
          <polygon points="100,100 100,38 115.2,81.9" fill="url(#adminGoldD)" />

          <polygon points="100,100 159,80.9 115.2,81.9" fill="url(#adminGoldL)" />
          <polygon points="100,100 159,80.9 124.2,107.7" fill="url(#adminGoldD)" />

          <polygon points="100,100 136.4,150.3 124.2,107.7" fill="url(#adminGoldL)" />
          <polygon points="100,100 136.4,150.3 100,124.8" fill="url(#adminGoldD)" />

          <polygon points="100,100 63.6,150.3 100,124.8" fill="url(#adminGoldL)" />
          <polygon points="100,100 63.6,150.3 75.8,107.7" fill="url(#adminGoldD)" />

          <polygon points="100,100 41,80.9 75.8,107.7" fill="url(#adminGoldL)" />
          <polygon points="100,100 41,80.9 84.8,81.9" fill="url(#adminGoldD)" />

          <circle cx="100" cy="100" r="4.5" fill="#FFF9D2" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col justify-center select-none">
          <span
            className={`font-black tracking-tight leading-none uppercase font-sans ${
              dark ? "text-white" : "text-[#0B132B]"
            }`}
            style={{ fontSize: size * 0.42 }}
          >
            GOLD STAR
          </span>
          <span
            className="font-bold tracking-widest leading-none uppercase font-sans mt-0.5 text-[#D4AF37]"
            style={{ fontSize: size * 0.22, letterSpacing: "0.22em" }}
          >
            TRANSPORTATION, INC.
          </span>
        </div>
      )}
    </div>
  );
}
