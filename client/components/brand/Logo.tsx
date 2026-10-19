import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

/** The Khryman emblem (purple + amber), from /public/brand/emblem.svg */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/emblem.svg"
      alt=""
      width={483}
      height={468}
      className={cn("h-10 w-auto", className)}
      draggable={false}
    />
  );
}

/** Emblem on a white disc — keeps the purple logo readable on any background. */
export function LogoChip({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-white shadow-sm", className)}
      style={{ width: size, height: size }}
    >
      <img src="/brand/emblem.svg" alt="" width={483} height={468} className="w-[74%]" draggable={false} />
    </span>
  );
}

/** Emblem + bilingual company name. */
export function Lockup({ light = false, className }: { light?: boolean; className?: string }) {
  const { isAr } = useLang();
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
        <img src="/brand/emblem.svg" alt="" width={483} height={468} className="w-[74%]" draggable={false} />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-extrabold",
            isAr ? "text-lg" : "text-[15px] tracking-wide",
            light ? "text-white" : "text-plum-800",
          )}
        >
          {isAr ? "كهرمان العالمية" : "Khryman International"}
        </span>
        <span
          className={cn(
            "font-semibold",
            isAr ? "text-[10.5px] tracking-[0.2em]" : "text-[12px]",
            light ? "text-gold-300" : "text-gold-600",
          )}
        >
          {isAr ? "KHRYMAN INTERNATIONAL" : "كهرمان العالمية"}
        </span>
      </span>
    </span>
  );
}
