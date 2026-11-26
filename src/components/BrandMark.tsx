import Link from "next/link";

export function BrandMark({
  href = "/",
  light = false,
  compact = false,
  className = "",
}: {
  href?: string;
  light?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`inline-flex flex-col items-center leading-none ${className}`} aria-label="ZAZZU Cosmetics home">
      <span
        className={`font-serif ${compact ? "text-[26px]" : "text-[34px]"} tracking-[0.14em] ${light ? "text-[#FAF6F2]" : "text-cocoa"}`}
        style={{ fontWeight: 500, letterSpacing: "0.12em" }}
      >
        ZAZZU
      </span>
      <span className={`mt-1 flex w-full items-center gap-1.5 ${light ? "text-[#E8D5C4]" : "text-[#8A6C4E]"}`}>
        <span className="h-px flex-1 bg-current opacity-50" />
        <span className="text-[7px] font-semibold tracking-[0.42em]" style={{ letterSpacing: "0.38em" }}>COSMETICS</span>
        <span className="h-px flex-1 bg-current opacity-50" />
      </span>
    </Link>
  );
}
