import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang, usePageTitle } from "@/lib/i18n";
import { about, company, goals, mission, sectors, story, values, vision } from "@/lib/khryman-content";
import { Icon } from "@/components/site/Icon";
import { LogoChip } from "@/components/brand/Logo";
import { ArrowIcon, CTABand, Eyebrow, PageHero, Reveal, SectionHeader, buttonStyles } from "@/components/site/blocks";

const TITLE = { ar: "من نحن", en: "About us" };

/* ---------------------------------------------------------------- intro */

function Intro() {
  const { t } = useLang();
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <Reveal>
          <Eyebrow>{t({ ar: "تعرّف علينا", en: "Get to know us" })}</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-plum-900 text-balance sm:text-4xl">
            {t(company.name)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">{t(about.lead)}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">{t(about.second)}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: "calendar" as const, label: { ar: "التأسيس", en: "Founded" }, value: { ar: "2017", en: "2017" } },
              { icon: "pin" as const, label: { ar: "المقر", en: "Headquarters" }, value: { ar: "أم درمان", en: "Omdurman" } },
              { icon: "layers" as const, label: { ar: "القطاعات", en: "Sectors" }, value: { ar: "8 قطاعات", en: "8 sectors" } },
            ].map((fact) => (
              <div key={fact.icon} className="flex items-center gap-3 rounded-2xl bg-sand-100 px-4 py-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-plum-700 text-gold-300">
                  <Icon name={fact.icon} size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-semibold text-ink/55">{t(fact.label)}</span>
                  <span className="block text-base font-extrabold text-plum-900">{t(fact.value)}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/aerial.jpg"
              alt=""
              loading="lazy"
              className="col-span-2 aspect-[16/9] w-full rounded-[1.75rem] object-cover shadow-xl shadow-plum-950/15"
            />
            <img src="/images/partnership.jpg" alt="" loading="lazy" className="aspect-square w-full rounded-[1.5rem] object-cover" />
            <div className="flex aspect-square flex-col justify-between rounded-[1.5rem] bg-plum-700 p-6 text-white">
              <Icon name="sparkles" size={30} className="text-gold-300" />
              <p className="text-lg font-extrabold leading-snug">{t(company.tagline)}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- story timeline */

function StoryTimeline() {
  const { t } = useLang();
  return (
    <section id="story" className="relative scroll-mt-24 overflow-hidden bg-sand-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader eyebrow={{ ar: "قصتنا", en: "Our story" }} title={story.title} intro={story.lead} />
            <figure className="mt-10 rounded-3xl border-s-4 border-gold-500 bg-white p-7 shadow-sm">
              <Icon name="sparkles" size={26} className="text-gold-500" />
              <blockquote className="mt-3 text-xl font-extrabold leading-relaxed text-plum-900">{t(story.quote)}</blockquote>
            </figure>
          </Reveal>

          <ol className="relative space-y-6 ps-10 sm:ps-14">
            <span aria-hidden="true" className="absolute inset-y-4 start-[15px] w-0.5 bg-gradient-to-b from-gold-500 via-plum-300 to-plum-700 sm:start-[23px]" />
            {story.milestones.map((milestone, index) => {
              const last = index === story.milestones.length - 1;
              return (
                <Reveal key={index} delay={index * 120}>
                  <li className="relative">
                    <span
                      className={cn(
                        "absolute -start-10 top-7 inline-flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-sand-100 sm:-start-14 sm:h-12 sm:w-12",
                        last ? "bg-plum-700 text-gold-300" : "bg-gold-500 text-plum-950",
                      )}
                    >
                      <Icon name={index === 0 ? "sprout" : last ? "sparkles" : "trending"} size={18} />
                    </span>
                    <div
                      className={cn(
                        "rounded-3xl p-7 sm:p-8",
                        last ? "bg-gradient-to-br from-plum-700 to-plum-900 text-white shadow-xl shadow-plum-700/25" : "bg-white shadow-sm",
                      )}
                    >
                      <span className={cn("text-sm font-extrabold", last ? "text-gold-300" : "text-gold-600")}>{t(milestone.when)}</span>
                      <h3 className={cn("mt-1 text-2xl font-extrabold", last ? "text-white" : "text-plum-900")}>{t(milestone.title)}</h3>
                      <p className={cn("mt-3 leading-relaxed", last ? "text-white/80" : "text-ink/70")}>{t(milestone.text)}</p>
                      {index === 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {sectors
                            .filter((sector) => story.originalSlugs.includes(sector.slug))
                            .map((sector) => (
                              <Link
                                key={sector.slug}
                                to={`/sectors/${sector.slug}`}
                                className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-sm font-bold text-plum-900 ring-1 ring-gold-200 transition-colors hover:bg-gold-100"
                              >
                                <Icon name={sector.icon} size={16} className="text-gold-600" />
                                {t(sector.name)}
                              </Link>
                            ))}
                        </div>
                      )}
                      {last && (
                        <div className="mt-5 flex items-center gap-3">
                          <LogoChip size={52} />
                          <span className="font-extrabold">{t(company.short)}</span>
                        </div>
                      )}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- identity */

function Identity() {
  const { t } = useLang();
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            center
            eyebrow={{ ar: "هويتنا", en: "Our identity" }}
            title={{ ar: "اسمٌ يحمل قيمة… وشعارٌ يحمل معنى", en: "A name with value, a mark with meaning" }}
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-400 to-gold-600 p-9 text-plum-950">
              <span aria-hidden="true" className="absolute -end-10 -top-10 h-48 w-48 rounded-full bg-white/20" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-plum-950 text-gold-300">
                <Icon name="gem" size={26} />
              </span>
              <h3 className="relative mt-6 text-2xl font-black">{t({ ar: "لماذا «كهرمان»؟", en: "Why “Khryman”?" })}</h3>
              <p className="relative mt-3 text-lg font-semibold leading-relaxed text-plum-950/85">{t(story.nameMeaning)}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-plum-950 p-9 text-white">
              <img
                src="/brand/emblem.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -end-12 w-64 opacity-[0.08] grayscale invert"
              />
              <LogoChip size={56} className="relative" />
              <h3 className="relative mt-6 text-2xl font-black">{t({ ar: "معنى الشعار", en: "Our emblem" })}</h3>
              <p className="relative mt-3 text-lg leading-relaxed text-white/80">{t(story.logoMeaning)}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- vision & mission */

function VisionMission() {
  const { t } = useLang();
  const items = [
    { icon: "eye" as const, title: { ar: "رؤيتنا", en: "Our vision" }, text: vision },
    { icon: "target" as const, title: { ar: "رسالتنا", en: "Our mission" }, text: mission },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-plum-900 py-24 text-white lg:py-28">
      <img src="/images/hero-nile.jpg" alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-plum-950/80 to-plum-900/95" />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={index} delay={index * 120}>
            <div className="h-full rounded-[2rem] border border-white/15 bg-white/[0.06] p-9 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-plum-950">
                  <Icon name={item.icon} size={26} />
                </span>
                <h2 className="text-3xl font-black">{t(item.title)}</h2>
              </div>
              <p className="mt-6 text-lg leading-loose text-white/85">{t(item.text)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- values */

function Values() {
  const { t } = useLang();
  return (
    <section className="bg-sand-100 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={{ ar: "قيمنا", en: "Our values" }}
            title={{ ar: "مبادئ نعمل بها كل يوم", en: "Principles we work by every day" }}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={index} delay={(index % 3) * 100}>
              <div className="group flex h-full items-start gap-5 rounded-3xl bg-white p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-plum-950/10">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-plum-50 text-plum-700 transition-colors duration-300 group-hover:bg-plum-700 group-hover:text-gold-300">
                  <Icon name={value.icon} size={26} />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-plum-900">{t(value.name)}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/70">{t(value.text)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- goals */

function Goals() {
  const { t } = useLang();
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="relative">
          <img
            src="/images/construction-2.jpg"
            alt=""
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-plum-950/20"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
            <p className="text-sm font-bold text-gold-600">{t({ ar: "طموحنا", en: "Our ambition" })}</p>
            <p className="mt-1 text-lg font-extrabold leading-snug text-plum-900">
              {t({ ar: "قيمةٌ مضافة للسودان في كل قطاع نعمل فيه", en: "Added value for Sudan in every sector we serve" })}
            </p>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeader eyebrow={{ ar: "أهدافنا", en: "Our goals" }} title={{ ar: "إلى أين نتجه", en: "Where we are heading" }} />
          </Reveal>
          <ol className="mt-10 space-y-4">
            {goals.map((goal, index) => (
              <Reveal key={index} delay={index * 70}>
                <li className="flex items-start gap-5 rounded-2xl border border-sand-200 p-5 transition-colors hover:border-plum-200 hover:bg-plum-50/50">
                  <span className="text-3xl font-black leading-none text-gold-500">
                    0{index + 1}
                  </span>
                  <p className="pt-1 text-[17px] font-semibold leading-relaxed text-plum-900">{t(goal)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- sectors strip */

function SectorsStrip() {
  const { t } = useLang();
  return (
    <section className="bg-sand-100 pb-24 pt-4">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[2rem] bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-plum-900">{t({ ar: "تعرّف على قطاعاتنا الثمانية", en: "Explore our eight sectors" })}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <Link
                    key={sector.slug}
                    to={`/sectors/${sector.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-1.5 text-sm font-bold text-plum-800 transition-colors hover:bg-plum-700 hover:text-white"
                  >
                    <Icon name={sector.icon} size={16} />
                    {t(sector.name)}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/sectors" className={cn(buttonStyles.purple, "shrink-0")}>
              {t({ ar: "كل القطاعات", en: "All sectors" })}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- page */

export default function About() {
  const { t } = useLang();
  usePageTitle(TITLE);
  return (
    <>
      <PageHero
        image="/images/team.jpg"
        title={{ ar: "شركة سودانية… بطموحٍ عالمي", en: "A Sudanese company with global ambition" }}
        subtitle={{
          ar: "تعرّف على كهرمان العالمية: قصتنا منذ 2017، رؤيتنا ورسالتنا، والقيم التي نعمل بها.",
          en: "Meet Khryman International: our story since 2017, our vision and mission, and the values we work by.",
        }}
        crumbs={[{ label: { ar: "الرئيسية", en: "Home" }, to: "/" }, { label: TITLE }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#story" className={buttonStyles.gold}>
            {t({ ar: "قصتنا", en: "Our story" })}
            <Icon name="chevronDown" size={18} />
          </a>
        </div>
      </PageHero>
      <Intro />
      <StoryTimeline />
      <Identity />
      <VisionMission />
      <Values />
      <Goals />
      <SectorsStrip />
      <CTABand image="/images/aerial.jpg" />
    </>
  );
}
