import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang, usePageTitle } from "@/lib/i18n";
import {
  about,
  company,
  heroSlides,
  processSteps,
  sectors,
  story,
  whyUs,
} from "@/lib/khryman-content";
import { Icon } from "@/components/site/Icon";
import { LogoChip } from "@/components/brand/Logo";
import {
  ArrowIcon,
  CTABand,
  Counter,
  Eyebrow,
  Reveal,
  SectionHeader,
  buttonStyles,
} from "@/components/site/blocks";

const SLIDE_MS = 6500;

/* ---------------------------------------------------------------- hero */

function Hero() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-plum-950 text-white h-[100svh] max-h-[960px]">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-out",
            index === active ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={index !== active}
        >
          <img
            src={slide.image}
            alt=""
            className={cn("h-full w-full object-cover", index === active && "kh-kenburns")}
          />
        </div>
      ))}
      <div className="kh-hero-overlay absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-28 pt-36 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/10 px-4 py-2 text-sm font-semibold text-gold-200 backdrop-blur">
              <Icon name="pin" size={16} />
              {t({ ar: "منذ 2017 · أم درمان، السودان", en: "Since 2017 · Omdurman, Sudan" })}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-7 text-[2.6rem] font-black leading-[1.15] text-balance sm:text-6xl lg:text-7xl">
              {t({ ar: "نستثمر في ثروات السودان", en: "Investing in Sudan’s wealth," })}
              <span className="mt-2 block text-gold-400">{t({ ar: "ونبني مستقبله", en: "building its future." })}</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {t({
                ar: "كهرمان العالمية مجموعة سودانية متعددة الأنشطة: الذهب والتعدين، الزراعة، الإنتاج الحيواني، الطاقة الشمسية، الأجهزة الكهربائية، الإنشاءات، التصنيع، والاستيراد والتصدير — تحت مظلة واحدة.",
                en: "Khryman International is a Sudanese multi-sector group: gold & mining, agriculture, livestock, solar energy, electrical appliances, construction, manufacturing and trade — under one roof.",
              })}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/sectors" className={buttonStyles.gold}>
                {t({ ar: "اكتشف قطاعاتنا", en: "Explore our sectors" })}
                <ArrowIcon />
              </Link>
              <Link to="/about#story" className={buttonStyles.outlineLight}>
                {t({ ar: "قصتنا: من عقال إلى كهرمان", en: "Our story: Ogal → Khryman" })}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* slide navigation */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
          <div className="hidden grid-cols-5 gap-4 md:grid">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActive(index)}
                className="group text-start"
                aria-label={t(slide.label)}
                aria-current={index === active}
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/20">
                  {index === active && (
                    <span
                      key={`${active}-progress`}
                      className="kh-progress block h-full w-full bg-gold-400"
                      style={{ animationDuration: `${SLIDE_MS}ms` }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "mt-3 block text-sm font-bold transition-colors",
                    index === active ? "text-white" : "text-white/55 group-hover:text-white/85",
                  )}
                >
                  <span className="me-2 text-gold-400">0{index + 1}</span>
                  {t(slide.label)}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-2 md:hidden">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActive(index)}
                aria-label={t(slide.label)}
                className={cn("h-2 rounded-full transition-all", index === active ? "w-8 bg-gold-400" : "w-2 bg-white/40")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- marquee */

function SectorMarquee() {
  const { t } = useLang();
  const items = [...sectors, ...sectors];
  return (
    <div className="overflow-hidden bg-gold-500 py-4 text-plum-950" aria-hidden="true">
      <div dir="ltr" className="kh-marquee flex w-max gap-12">
        {items.map((sector, index) => (
          <span key={index} className="inline-flex items-center gap-3 whitespace-nowrap text-lg font-extrabold">
            <Icon name={sector.icon} size={22} className="text-plum-800" />
            {t(sector.name)}
            <span className="ms-9 h-2 w-2 rotate-45 bg-plum-800/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- about */

function AboutIntro() {
  const { t } = useLang();
  const years = new Date().getFullYear() - company.founded;
  const stats = [
    { node: <Counter to={company.founded} from={1990} />, label: { ar: "سنة الانطلاق", en: "Year founded" } },
    { node: <Counter to={8} />, label: { ar: "قطاعات أعمال", en: "Business sectors" } },
    { node: <Counter to={years} prefix="+" />, label: { ar: "سنوات من الخبرة", en: "Years of experience" } },
    { node: <Counter to={3} />, label: { ar: "أنشطة انطلقنا بها", en: "Founding activities" } },
  ];
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-[2rem] shadow-2xl shadow-plum-950/20">
            <img src="/images/about-hq.jpg" alt={t({ ar: "مقر شركة كهرمان", en: "Khryman offices" })} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-10 end-0 w-[55%] overflow-hidden rounded-[1.5rem] border-[10px] border-white shadow-2xl shadow-plum-950/20">
            <img src="/images/team.jpg" alt={t({ ar: "فريق العمل", en: "Our team" })} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -top-6 end-[8%] flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gold-500 text-plum-950 shadow-xl shadow-gold-500/30 ring-8 ring-white">
            <span className="text-xs font-bold">{t({ ar: "منذ عام", en: "Since" })}</span>
            <span className="text-3xl font-black leading-none" dir="ltr">
              2017
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{t({ ar: "من نحن", en: "Who we are" })}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-plum-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              {t({ ar: "مجموعة سودانية متعددة الأنشطة… بثقة تمتد منذ 2017", en: "A Sudanese multi-sector group, trusted since 2017" })}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">{t(about.lead)}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">{t(about.second)}</p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3">
              {about.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-[17px] font-semibold text-plum-900">
                  <Icon name="checkCircle" size={24} className="shrink-0 text-gold-500" />
                  {t(point)}
                </li>
              ))}
            </ul>
            <Link to="/about" className={cn(buttonStyles.purple, "mt-10")}>
              {t({ ar: "اعرف المزيد عنّا", en: "More about us" })}
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-plum-700 text-white shadow-xl shadow-plum-700/20 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-9 text-center",
                  index % 2 === 1 && "border-s border-white/15",
                  index >= 2 && "border-t border-white/15 lg:border-t-0",
                  index === 2 && "lg:border-s",
                )}
              >
                <span className="text-4xl font-black text-gold-300 sm:text-5xl">{stat.node}</span>
                <span className="text-[15px] font-semibold text-white/85">{t(stat.label)}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- sector explorer */

function SectorExplorer() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const sector = sectors[active];

  return (
    <section id="sectors" className="scroll-mt-24 bg-sand-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={{ ar: "مجالات أعمالنا", en: "What we do" }}
            title={{ ar: "ثمانية قطاعات… رؤية واحدة", en: "Eight sectors, one vision" }}
            intro={{
              ar: "قطاعات متكاملة تغطي سلسلة القيمة كاملة؛ من الموارد الطبيعية وإنتاج الغذاء، إلى الطاقة والبنية التحتية والصناعة والتجارة.",
              en: "Complementary sectors covering the full value chain — from natural resources and food, to energy, infrastructure, industry and trade.",
            }}
            action={
              <Link to="/sectors" className={buttonStyles.outlineDark}>
                {t({ ar: "كل القطاعات", en: "All sectors" })}
                <ArrowIcon />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* tabs */}
          <div
            role="tablist"
            aria-label={t({ ar: "القطاعات", en: "Sectors" })}
            className="kh-no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {sectors.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={cn(
                  "group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-start transition-all duration-300 lg:w-full lg:py-3.5",
                  index === active
                    ? "border-plum-700 bg-plum-700 text-white shadow-lg shadow-plum-700/25"
                    : "border-transparent bg-white text-plum-900 hover:border-plum-200",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                    index === active ? "bg-white/15 text-gold-300" : "bg-plum-50 text-plum-700",
                  )}
                >
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="whitespace-nowrap text-[15px] font-bold lg:whitespace-normal">{t(item.name)}</span>
                <span
                  className={cn(
                    "ms-auto hidden text-xs font-bold lg:inline",
                    index === active ? "text-gold-300" : "text-plum-300",
                  )}
                >
                  {item.number}
                </span>
              </button>
            ))}
          </div>

          {/* panel */}
          <div key={sector.slug} className="kh-fade-up overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-plum-950/10">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={sector.image} alt={t(sector.name)} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <span className="text-sm font-bold text-gold-300" dir="ltr">
                    {sector.number} / 08
                  </span>
                  <h3 className="mt-1 text-3xl font-black text-white sm:text-4xl">{t(sector.name)}</h3>
                  <p className="mt-1 text-base font-semibold text-white/80">{t(sector.tagline)}</p>
                </div>
                {sector.since2017 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-1.5 text-sm font-bold text-plum-950">
                    <Icon name="calendar" size={15} />
                    {t({ ar: "من أنشطتنا منذ 2017", en: "Part of our story since 2017" })}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="text-[17px] leading-relaxed text-ink/75">{t(sector.summary)}</p>
                <Link to={`/sectors/${sector.slug}`} className={cn(buttonStyles.purple, "mt-6")}>
                  {t({ ar: "تفاصيل القطاع", en: "Sector details" })}
                  <ArrowIcon />
                </Link>
              </div>
              <ul className="space-y-3">
                {sector.services.slice(0, 5).map((service, index) => (
                  <li key={index} className="flex items-start gap-3 text-[15px] font-semibold text-plum-900">
                    <Icon name="check" size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-gold-500" />
                    {t(service)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- story */

function StoryTeaser() {
  const { t } = useLang();
  const original = sectors.filter((sector) => story.originalSlugs.includes(sector.slug));
  return (
    <section className="kh-dots relative overflow-hidden bg-plum-950 py-24 text-white lg:py-32">
      <img
        src="/brand/emblem.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 top-1/2 w-[520px] -translate-y-1/2 opacity-[0.06] grayscale invert"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader light eyebrow={{ ar: "قصتنا", en: "Our story" }} title={story.title} intro={story.lead} />
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1.25fr]">
          <Reveal className="flex">
            <div className="flex w-full flex-col rounded-[2rem] border border-white/15 bg-white/[0.04] p-8">
              <span className="text-6xl font-black text-gold-400">
                2017
              </span>
              <span className="mt-3 text-sm font-bold text-white/60">{t({ ar: "البداية", en: "The beginning" })}</span>
              <h3 className="mt-1 text-2xl font-extrabold">{t(company.former)}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {original.map((sector) => (
                  <li key={sector.slug} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">
                    <Icon name={sector.icon} size={16} className="text-gold-300" />
                    {t(sector.name)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 py-2 lg:px-2">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-plum-950 shadow-lg shadow-gold-500/30">
                <Icon name="arrow" size={28} className="rotate-90 lg:hidden" />
                <ArrowIcon size={28} className="hidden lg:block" />
              </span>
              <span className="text-center text-sm font-bold text-gold-300">
                {t({ ar: "نمو · توسّع · ثقة", en: "Growth · expansion · trust" })}
              </span>
            </div>
          </Reveal>

          <Reveal delay={240} className="flex">
            <div className="flex w-full flex-col rounded-[2rem] bg-gradient-to-br from-plum-700 to-plum-800 p-8 ring-1 ring-gold-500/50">
              <div className="flex items-center gap-4">
                <LogoChip size={64} />
                <div>
                  <span className="text-sm font-bold text-gold-300">{t({ ar: "اليوم · ثوبٌ جديد", en: "Today · a new identity" })}</span>
                  <h3 className="text-2xl font-extrabold">{t(company.short)}</h3>
                </div>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {sectors.map((sector) => {
                  const isOriginal = story.originalSlugs.includes(sector.slug);
                  return (
                    <li
                      key={sector.slug}
                      className={cn(
                        "rounded-xl px-2 py-2.5 text-center text-[13px] font-bold leading-snug",
                        isOriginal ? "bg-gold-500 text-plum-950" : "bg-white/10 text-white",
                      )}
                    >
                      {t(sector.name)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center gap-6 text-center">
            <p className="text-2xl font-extrabold text-gold-200 sm:text-3xl">{t(story.quote)}</p>
            <Link to="/about#story" className={buttonStyles.outlineLight}>
              {t({ ar: "اقرأ قصتنا كاملة", en: "Read our full story" })}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- why us */

function WhyUs() {
  const { t } = useLang();
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            center
            eyebrow={{ ar: "لماذا كهرمان؟", en: "Why Khryman?" }}
            title={{ ar: "شريكٌ واحد… وحلولٌ متكاملة", en: "One partner. Integrated solutions." }}
            intro={{
              ar: "نجمع الخبرة والتنوع والالتزام لنكون الشريك الذي تعتمد عليه في مشروعك.",
              en: "Experience, breadth and commitment — the partner you can rely on for your project.",
            }}
          />
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, index) => (
            <Reveal key={index} delay={(index % 3) * 100}>
              <div className="group h-full rounded-3xl border border-sand-200 bg-sand-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-plum-200 hover:bg-white hover:shadow-xl hover:shadow-plum-950/10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-plum-700 text-gold-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} size={26} />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-plum-900">{t(item.name)}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{t(item.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- process */

function Process() {
  const { t } = useLang();
  return (
    <section className="bg-sand-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={{ ar: "كيف نعمل", en: "How we work" }}
            title={{ ar: "من الفكرة إلى التشغيل", en: "From idea to operation" }}
            intro={{
              ar: "منهجية واضحة من أربع مراحل نتبعها في كل مشروع، لنضمن الجودة والشفافية من البداية حتى ما بعد التسليم.",
              en: "A clear four-stage method we follow on every project — quality and transparency from day one to after handover.",
            }}
          />
        </Reveal>
        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden="true" className="absolute inset-x-[12%] top-16 hidden h-0.5 bg-gradient-to-r from-gold-400 via-plum-300 to-gold-400 lg:block" />
          {processSteps.map((step, index) => (
            <Reveal key={index} delay={index * 120}>
              <li className="relative h-full rounded-3xl bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-plum-700 text-gold-300 ring-8 ring-sand-100">
                    <Icon name={step.icon} size={26} />
                  </span>
                  <span className="text-5xl font-black text-plum-100">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-plum-900">{t(step.title)}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{t(step.text)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- page */

export default function Index() {
  usePageTitle(null);
  return (
    <>
      <Hero />
      <SectorMarquee />
      <AboutIntro />
      <SectorExplorer />
      <StoryTeaser />
      <WhyUs />
      <Process />
      <CTABand />
    </>
  );
}
