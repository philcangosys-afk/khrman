import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang, type L } from "@/lib/i18n";
import { contact, telHref, whatsappHref } from "@/lib/khryman-content";
import { Icon } from "@/components/site/Icon";

/* ---------------------------------------------------------------- Reveal */

function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1, ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

export function Reveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- Counter */

export function Counter({
  to,
  from = 0,
  duration = 1600,
  prefix = "",
  suffix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------- headings */

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-bold",
        light ? "text-gold-300" : "text-gold-600",
      )}
    >
      <span className={cn("h-0.5 w-8 rounded-full", light ? "bg-gold-400" : "bg-gold-500")} />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
  className,
  action,
}: {
  eyebrow: L;
  title: L;
  intro?: L;
  light?: boolean;
  center?: boolean;
  className?: string;
  action?: ReactNode;
}) {
  const { t } = useLang();
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", center && "mx-auto")}>
        <Eyebrow light={light}>{t(eyebrow)}</Eyebrow>
        <h2
          className={cn(
            "mt-4 text-3xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-[2.75rem]",
            light ? "text-white" : "text-plum-900",
          )}
        >
          {t(title)}
        </h2>
        {intro && (
          <p className={cn("mt-4 text-lg leading-relaxed text-pretty", light ? "text-white/75" : "text-ink/70")}>
            {t(intro)}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------- buttons */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2";

export const buttonStyles = {
  gold: cn(buttonBase, "bg-gold-500 text-plum-950 shadow-lg shadow-gold-500/25 hover:-translate-y-0.5 hover:bg-gold-400"),
  purple: cn(buttonBase, "bg-plum-700 text-white shadow-lg shadow-plum-700/25 hover:-translate-y-0.5 hover:bg-plum-600"),
  outlineLight: cn(buttonBase, "border border-white/35 text-white hover:border-gold-400 hover:text-gold-300"),
  outlineDark: cn(buttonBase, "border border-plum-200 text-plum-800 hover:border-plum-700 hover:bg-plum-50"),
  whatsapp: cn(buttonBase, "bg-[#1FAF5A] text-white shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-[#19994E]"),
};

export function ArrowIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return <Icon name="arrow" size={size} className={cn("rtl:-scale-x-100", className)} />;
}

/* ---------------------------------------------------------------- page hero */

export interface Crumb {
  label: L;
  to?: string;
}

export function PageHero({
  image,
  title,
  subtitle,
  crumbs,
  children,
  imagePosition = "center",
}: {
  image: string;
  title: L;
  subtitle?: L;
  crumbs: Crumb[];
  children?: ReactNode;
  imagePosition?: string;
}) {
  const { t } = useLang();
  return (
    <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-plum-950 pb-14 pt-40 text-white md:min-h-[520px]">
      <img
        src={image}
        alt=""
        className="kh-kenburns absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="kh-hero-overlay absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70">
          {crumbs.map((crumb, index) => (
            <span key={index} className="inline-flex items-center gap-2">
              {index > 0 && <Icon name="chevronRight" size={14} className="rtl:-scale-x-100 text-gold-400" />}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-gold-300">
                  {t(crumb.label)}
                </Link>
              ) : (
                <span className="text-white">{t(crumb.label)}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-balance sm:text-5xl lg:text-6xl">{t(title)}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty">{t(subtitle)}</p>}
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- CTA band */

export function CTABand({ image = "/images/pivot-solar.jpg" }: { image?: string }) {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-plum-950 py-24 text-white">
      <img src={image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-plum-950/90 via-plum-900/85 to-plum-950/95" />
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow light>{t({ ar: "لنبدأ العمل معاً", en: "Let’s work together" })}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black leading-tight text-balance sm:text-5xl">
            {t({ ar: "هل لديك مشروع أو استفسار؟", en: "Have a project or a question?" })}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {t({
              ar: "فريقنا جاهز لمساعدتك في اختيار الحل المناسب في أي من قطاعاتنا الثمانية. تواصل معنا الآن وسنعود إليك في أقرب وقت.",
              en: "Our team is ready to help you choose the right solution in any of our eight sectors. Reach out and we’ll get back to you shortly.",
            })}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappHref(t({ ar: "مرحباً كهرمان، أود الاستفسار عن خدماتكم.", en: "Hello Khryman, I’d like to ask about your services." }))}
              target="_blank"
              rel="noreferrer"
              className={buttonStyles.whatsapp}
            >
              <Icon name="whatsapp" size={20} />
              {t({ ar: "راسلنا على واتساب", en: "Chat on WhatsApp" })}
            </a>
            <a href={telHref(contact.phones[0])} className={buttonStyles.outlineLight}>
              <Icon name="phone" size={18} />
              <span dir="ltr">{contact.phones[0]}</span>
            </a>
            <Link to="/contact" className={buttonStyles.gold}>
              {t({ ar: "أرسل رسالة", en: "Send a message" })}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
