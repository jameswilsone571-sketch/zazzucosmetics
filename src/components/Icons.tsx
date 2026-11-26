type IconProps = { className?: string; strokeWidth?: number };

const base = (className = "h-5 w-5", strokeWidth = 1.6) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

export const Instagram = ({ className }: IconProps) => (
  <svg {...base(className)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
);
export const TikTok = ({ className }: IconProps) => (
  <svg {...base(className)}><path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46" /><path d="M14 3c.6 3 2.4 4.8 5.5 5" /></svg>
);
export const Facebook = ({ className }: IconProps) => (
  <svg {...base(className)}><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" /></svg>
);
export const Pinterest = ({ className }: IconProps) => (
  <svg {...base(className)}><circle cx="12" cy="12" r="9" /><path d="M10 17l1.7-6.1c.4-1.4 2.6-1.2 2.6.3 0 1.3-.9 2.2-2 2.2h-.9" /><path d="M9.4 12.3c-.5 2 .1 4.7 1.6 5.5" /></svg>
);
export const Search = ({ className }: IconProps) => (<svg {...base(className)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const User = ({ className }: IconProps) => (<svg {...base(className)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></svg>);
export const Heart = ({ className, filled }: IconProps & { filled?: boolean }) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"}><path d="M20.8 8.6c0 4.3-8.8 10-8.8 10S3.2 12.9 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8z" /></svg>
);
export const Bag = ({ className }: IconProps) => (<svg {...base(className)}><path d="M5 8h14l-1 13H6L5 8z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>);
export const Menu = ({ className }: IconProps) => (<svg {...base(className)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Close = ({ className }: IconProps) => (<svg {...base(className)}><path d="M5 5l14 14M19 5 5 19" /></svg>);
export const ArrowRight = ({ className }: IconProps) => (<svg {...base(className)}><path d="M4 12h16M14 6l6 6-6 6" /></svg>);
export const ArrowLeft = ({ className }: IconProps) => (<svg {...base(className)}><path d="M20 12H4M10 6l-6 6 6 6" /></svg>);
export const ChevronDown = ({ className }: IconProps) => (<svg {...base(className)}><path d="m6 9 6 6 6-6" /></svg>);
export const Star = ({ className, filled }: IconProps & { filled?: boolean }) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9L12 3z" /></svg>
);
export const Sparkle = ({ className }: IconProps) => (<svg {...base(className)}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z" /></svg>);
export const Check = ({ className }: IconProps) => (<svg {...base(className)}><path d="m4 12 5 5L20 6" /></svg>);
export const Shield = ({ className }: IconProps) => (<svg {...base(className)}><path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></svg>);
export const Truck = ({ className }: IconProps) => (<svg {...base(className)}><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17.5" cy="18" r="2" /></svg>);
export const Return = ({ className }: IconProps) => (<svg {...base(className)}><path d="M4 9a8 8 0 1 1-.5 5" /><path d="M4 4v5h5" /></svg>);
export const Leaf = ({ className }: IconProps) => (<svg {...base(className)}><path d="M20 4C11 4 5 8 5 15a5 5 0 0 0 5 5c7 0 10-6 10-16z" /><path d="M4 21c3-6 7-9 12-11" /></svg>);
export const PaletteIcon = ({ className }: IconProps) => (<svg {...base(className)}><circle cx="12" cy="12" r="9" /><circle cx="8" cy="9" r="1" fill="currentColor" /><circle cx="13" cy="8" r="1" fill="currentColor" /><circle cx="16.5" cy="12" r="1" fill="currentColor" /><circle cx="9.5" cy="15.5" r="1" fill="currentColor" /></svg>);
export const Plus = ({ className }: IconProps) => (<svg {...base(className)}><path d="M12 5v14M5 12h14" /></svg>);
export const Minus = ({ className }: IconProps) => (<svg {...base(className)}><path d="M5 12h14" /></svg>);
export const Filter = ({ className }: IconProps) => (<svg {...base(className)}><path d="M4 6h16M7 12h10M10 18h4" /></svg>);
export const Copy = ({ className }: IconProps) => (<svg {...base(className)}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>);
export const Monitor = ({ className }: IconProps) => (<svg {...base(className)}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M9 21h6M12 17v4" /></svg>);
export const Phone = ({ className }: IconProps) => (<svg {...base(className)}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>);
export const Trash = ({ className }: IconProps) => (<svg {...base(className)}><path d="M4 7h16M10 4h4M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>);
export const Lock = ({ className }: IconProps) => (<svg {...base(className)}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>);
export const MapPin = ({ className }: IconProps) => (<svg {...base(className)}><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const Package = ({ className }: IconProps) => (<svg {...base(className)}><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /></svg>);
