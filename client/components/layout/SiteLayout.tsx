import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang, type L } from "@/lib/i18n";
import { company, contact, sectors, telHref, whatsappHref } from "@/lib/khryman-content";
import { Lockup } from "@/components/brand/Logo";
import { Icon } from "@/components/site/Icon";
import { ArrowIcon, buttonStyles } from "@/components/site/blocks";

const navItems: { to: string; label: L }[] = [
  { to: "/", label: { ar: "الرئيسية", en: "Home" } },
  { to: "/about", label: { ar: "من نحن", en: "About" } },
  { to: "/sectors", label: { ar: "قطاعاتنا", en: "Sectors" } },
  { to: "/contact", label: { ar: "تواصل معنا", en: "Contact" } },
];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function LanguageToggle({ solid, className, compact = false }: { solid: boolean; className?: string; compact?: boolean }) {
  const { lang, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors",
        solid
          ? "border-plum-200 text-plum-800 hover:border-plum-700 hover:bg-plum-50"
          : "border-white/30 text-white hover:border-gold-400 hover:text-gold-300",
        className,
      )}
    >
      <Icon name="globe" size={18} />
      <span lang={lang === "ar" ? "en" : "ar"}>{lang === "ar" ? (compact ? "EN" : "English") : compact ? "عربي" : "العربية"}</span>
    </button>
  );
}

function AnnouncementBar() {
  const { t } = useLang();
  return (
    <div className="bg-plum-950 text-white/85">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-2 px-5 text-[13px] sm:px-8">
        <Icon name="sparkles" size={15} className="shrink-0 text-gold-400" />
        <p className="truncate">
          <span className="hidden sm:inline">
            {t({
              ar: "«أعمال عقال للتجارة» أصبحت «كهرمان العالمية» — نفس الثقة، بهوية جديدة.",
              en: "“Ogal Trading Business” is now “Khryman International” — the same trust, a new identity.",
            })}
          </span>
          <span className="sm:hidden">
            {t({ ar: "«عقال» أصبحت «كهرمان العالمية»", en: "Ogal is now Khryman International" })}
          </span>
        </p>
        <Link to="/about#story" className="inline-flex shrink-0 items-center gap-1 font-bold text-gold-300 hover:text-gold-200">
          {t({ ar: "قصتنا", en: "Our story" })}
          <ArrowIcon size={14} />
        </Link>
      </div>
    </div>
  );
}

function SiteHeader() {
  const { t } = useLang();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300",
          scrolled ? "max-h-0" : "max-h-10",
        )}
      >
        <AnnouncementBar />
      </div>
      <div
        className={cn(
          "transition-all duration-300",
          solid
            ? "border-b border-plum-100 bg-white/95 shadow-[0_8px_30px_-12px_rgba(26,11,48,0.25)] backdrop-blur-md"
            : "border-b border-white/10 bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:gap-6">
          <Link to="/" aria-label={t(company.short)} className="shrink-0">
            <Lockup light={!solid} />
          </Link>

          <nav aria-label={t({ ar: "القائمة الرئيسية", en: "Main menu" })} className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.to === "/sectors" ? (
                <div key={item.to} className="group relative">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "inline-flex h-11 items-center gap-1 rounded-full px-4 text-[15px] font-bold transition-colors",
                        solid ? "text-ink/80 hover:text-plum-700" : "text-white/85 hover:text-gold-300",
                        isActive && (solid ? "text-plum-700" : "text-gold-300"),
                      )
                    }
                  >
                    {t(item.label)}
                    <Icon name="chevronDown" size={16} className="transition-transform group-hover:rotate-180" />
                  </NavLink>
                  <div className="invisible absolute start-1/2 top-full w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 rtl:translate-x-1/2">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-plum-100 bg-white p-3 shadow-2xl shadow-plum-950/15">
                      {sectors.map((sector) => (
                        <Link
                          key={sector.slug}
                          to={`/sectors/${sector.slug}`}
                          className="flex items-center gap-3 rounded-xl p-3 text-ink transition-colors hover:bg-plum-50"
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-plum-50 text-plum-700">
                            <Icon name={sector.icon} size={20} />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-[14px] font-bold text-plum-900">{t(sector.name)}</span>
                            <span className="text-[12px] text-ink/60">{t(sector.tagline)}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex h-11 items-center rounded-full px-4 text-[15px] font-bold transition-colors",
                      solid ? "text-ink/80 hover:text-plum-700" : "text-white/85 hover:text-gold-300",
                      isActive && (solid ? "text-plum-700" : "text-gold-300"),
                    )
                  }
                >
                  {t(item.label)}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle solid={solid} />
            <Link to="/contact" className={cn(buttonStyles.gold, "px-5 py-2.5 text-sm")}>
              {t({ ar: "اطلب استشارة", en: "Get a quote" })}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle solid={solid} compact className="h-10 gap-1.5 px-3 text-xs" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t({ ar: "فتح القائمة", en: "Open menu" })}
              aria-expanded={open}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                solid ? "text-plum-800 hover:bg-plum-50" : "text-white hover:bg-white/10",
              )}
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-plum-950 text-white transition-opacity duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <Lockup light />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t({ ar: "إغلاق القائمة", en: "Close menu" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
          >
            <Icon name="close" size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 pb-8">
          <ul className="flex flex-col border-t border-white/10">
            {navItems.map((item) => (
              <li key={item.to} className="border-b border-white/10">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn("flex items-center justify-between py-4 text-xl font-bold", isActive ? "text-gold-300" : "text-white")
                  }
                >
                  {t(item.label)}
                  <ArrowIcon className="text-gold-400" />
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-bold text-gold-300">{t({ ar: "قطاعاتنا", en: "Our sectors" })}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {sectors.map((sector) => (
              <li key={sector.slug}>
                <Link
                  to={`/sectors/${sector.slug}`}
                  className="flex items-center gap-2 rounded-xl bg-white/5 p-3 text-[14px] font-semibold text-white/90"
                >
                  <Icon name={sector.icon} size={18} className="shrink-0 text-gold-400" />
                  {t(sector.name)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={whatsappHref()} target="_blank" rel="noreferrer" className={buttonStyles.whatsapp}>
              <Icon name="whatsapp" size={20} />
              {t({ ar: "واتساب", en: "WhatsApp" })}
            </a>
            <a href={telHref(contact.phones[0])} className={buttonStyles.outlineLight}>
              <Icon name="phone" size={18} />
              <span dir="ltr">{contact.phones[0]}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-plum-950 text-white/75">
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
      <img
        src="/brand/emblem.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -end-24 w-[420px] opacity-[0.05] grayscale invert"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
        <div>
          <Lockup light />
          <p className="mt-6 max-w-sm leading-relaxed">
            {t({
              ar: "شركة سودانية متعددة الأنشطة تعمل في الذهب والتعدين والزراعة والإنتاج الحيواني والطاقة الشمسية والأجهزة الكهربائية والإنشاءات والتصنيع والتجارة.",
              en: "A Sudanese multi-sector company in gold & mining, agriculture, livestock, solar energy, electrical appliances, construction, manufacturing and trade.",
            })}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1.5 text-[13px] text-gold-200">
            <Icon name="calendar" size={15} />
            {t({ ar: "منذ 2017 · سابقاً «أعمال عقال للتجارة»", en: "Since 2017 · formerly “Ogal Trading Business”" })}
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">{t({ ar: "روابط سريعة", en: "Quick links" })}</h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-gold-300">
                  {t(item.label)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/about#story" className="hover:text-gold-300">
                {t({ ar: "قصتنا", en: "Our story" })}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">{t({ ar: "قطاعاتنا", en: "Our sectors" })}</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3">
            {sectors.map((sector) => (
              <li key={sector.slug}>
                <Link to={`/sectors/${sector.slug}`} className="hover:text-gold-300">
                  {t(sector.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">{t({ ar: "تواصل معنا", en: "Get in touch" })}</h3>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3">
              <Icon name="pin" size={20} className="mt-0.5 shrink-0 text-gold-400" />
              <span className="leading-relaxed">{t(contact.address)}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" size={20} className="mt-0.5 shrink-0 text-gold-400" />
              <span className="flex flex-col gap-1">
                {contact.phones.map((phone) => (
                  <a key={phone} href={telHref(phone)} dir="ltr" className="hover:text-gold-300 rtl:text-right">
                    {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" size={20} className="mt-0.5 shrink-0 text-gold-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-gold-300" dir="ltr">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[13px] text-white/55 sm:flex-row sm:px-8">
          <p>
            © {year} {t(company.name)}. {t({ ar: "جميع الحقوق محفوظة.", en: "All rights reserved." })}
          </p>
          <p>{t(company.tagline)}</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  const { t } = useLang();
  const scrolled = useScrolled(600);
  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t({ ar: "العودة للأعلى", en: "Back to top" })}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-plum-700 shadow-lg ring-1 ring-plum-100 transition-all duration-300",
          scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <Icon name="arrowUp" size={20} />
      </button>
      <a
        href={whatsappHref(t({ ar: "مرحباً كهرمان، أود الاستفسار عن خدماتكم.", en: "Hello Khryman, I’d like to ask about your services." }))}
        target="_blank"
        rel="noreferrer"
        aria-label={t({ ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" })}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1FAF5A] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105"
      >
        <Icon name="whatsapp" size={28} />
      </a>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [hash, pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink antialiased">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
