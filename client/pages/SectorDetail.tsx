import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang, usePageTitle } from "@/lib/i18n";
import { contact, getSector, integrated, sectors, telHref, whatsappHref } from "@/lib/khryman-content";
import { Icon } from "@/components/site/Icon";
import { ArrowIcon, CTABand, PageHero, Reveal, buttonStyles } from "@/components/site/blocks";
import NotFound from "./NotFound";

export default function SectorDetail() {
  const { slug } = useParams();
  const sector = getSector(slug);
  if (!sector) return <NotFound />;
  return <SectorPage key={sector.slug} slug={sector.slug} />;
}

function SectorPage({ slug }: { slug: string }) {
  const { t } = useLang();
  const sector = getSector(slug)!;
  const index = sectors.indexOf(sector);
  const prev = sectors[(index - 1 + sectors.length) % sectors.length];
  const next = sectors[(index + 1) % sectors.length];
  const images = [sector.image, ...sector.gallery];
  const [activeImage, setActiveImage] = useState(0);
  const related = integrated.filter((item) => item.sectors.includes(sector.slug));

  usePageTitle(sector.name);

  const waMessage = t({
    ar: `مرحباً كهرمان، أود الاستفسار عن خدمات قطاع ${sector.name.ar}.`,
    en: `Hello Khryman, I’d like to ask about your ${sector.name.en} services.`,
  });

  return (
    <>
      <PageHero
        image={sector.image}
        title={sector.name}
        subtitle={sector.tagline}
        crumbs={[
          { label: { ar: "الرئيسية", en: "Home" }, to: "/" },
          { label: { ar: "قطاعاتنا", en: "Our sectors" }, to: "/sectors" },
          { label: sector.name },
        ]}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
            <Icon name={sector.icon} size={18} className="text-gold-300" />
            <span dir="ltr">{sector.number} / 08</span>
          </span>
          {sector.since2017 && (
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-extrabold text-plum-950">
              <Icon name="calendar" size={16} />
              {t({ ar: "من أنشطتنا الأصلية منذ 2017", en: "One of our original activities since 2017" })}
            </span>
          )}
        </div>
      </PageHero>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* main */}
          <div className="min-w-0">
            <Reveal>
              <p className="text-2xl font-extrabold leading-relaxed text-plum-900">{t(sector.summary)}</p>
              {sector.body.map((paragraph, i) => (
                <p key={i} className="mt-5 text-lg leading-loose text-ink/75">
                  {t(paragraph)}
                </p>
              ))}
            </Reveal>

            {/* gallery */}
            <Reveal className="mt-12">
              <div className="overflow-hidden rounded-[2rem] bg-sand-100">
                <img
                  key={images[activeImage]}
                  src={images[activeImage]}
                  alt={t(sector.name)}
                  className="kh-fade-up aspect-[16/9] w-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {images.map((image, i) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`${t({ ar: "صورة", en: "Image" })} ${i + 1}`}
                      className={cn(
                        "overflow-hidden rounded-2xl ring-2 ring-offset-2 transition-all",
                        i === activeImage ? "ring-gold-500" : "opacity-60 ring-transparent hover:opacity-100",
                      )}
                    >
                      <img src={image} alt="" loading="lazy" className="h-20 w-28 object-cover sm:h-24 sm:w-36" />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>

            {/* services */}
            <Reveal className="mt-14">
              <h2 className="text-2xl font-extrabold text-plum-900 sm:text-3xl">{t({ ar: "خدماتنا في هذا القطاع", en: "Our services in this sector" })}</h2>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {sector.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-4 rounded-2xl border border-sand-200 bg-sand-50 p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-plum-700 text-sm font-extrabold text-gold-300" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1.5 text-[16px] font-bold leading-relaxed text-plum-900">{t(service)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {related.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="text-2xl font-extrabold text-plum-900 sm:text-3xl">{t({ ar: "حلول متكاملة مع قطاعات أخرى", en: "Integrated with other sectors" })}</h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {related.map((item, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl bg-plum-950 text-white">
                      <img src={item.image} alt="" loading="lazy" className="aspect-[16/8] w-full object-cover opacity-90" />
                      <div className="p-5">
                        <h3 className="text-lg font-extrabold">{t(item.title)}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/75">{t(item.text)}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.sectors
                            .filter((s) => s !== sector.slug)
                            .map((s) => {
                              const other = getSector(s);
                              return other ? (
                                <Link
                                  key={s}
                                  to={`/sectors/${s}`}
                                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-gold-200 hover:bg-white/20"
                                >
                                  + {t(other.name)}
                                </Link>
                              ) : null;
                            })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] bg-plum-700 p-7 text-white shadow-xl shadow-plum-700/25">
              <Icon name="headset" size={30} className="text-gold-300" />
              <h2 className="mt-4 text-xl font-extrabold">{t({ ar: "تحدّث مع فريق القطاع", en: "Talk to the sector team" })}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {t({
                  ar: "احصل على استشارة أو عرض سعر مخصص لمشروعك.",
                  en: "Get advice or a tailored quotation for your project.",
                })}
              </p>
              <div className="mt-6 space-y-3">
                <a href={whatsappHref(waMessage)} target="_blank" rel="noreferrer" className={cn(buttonStyles.whatsapp, "w-full")}>
                  <Icon name="whatsapp" size={20} />
                  {t({ ar: "واتساب", en: "WhatsApp" })}
                </a>
                <a href={telHref(contact.phones[0])} className={cn(buttonStyles.outlineLight, "w-full")}>
                  <Icon name="phone" size={18} />
                  <span dir="ltr">{contact.phones[0]}</span>
                </a>
                <Link to="/contact" className={cn(buttonStyles.gold, "w-full")}>
                  {t({ ar: "طلب عرض سعر", en: "Request a quote" })}
                </Link>
              </div>
            </div>

            <nav aria-label={t({ ar: "القطاعات الأخرى", en: "Other sectors" })} className="rounded-[1.75rem] border border-sand-200 bg-sand-50 p-4">
              <p className="px-3 pb-2 pt-1 text-sm font-extrabold text-ink/55">{t({ ar: "كل القطاعات", en: "All sectors" })}</p>
              <ul>
                {sectors.map((item) => {
                  const current = item.slug === sector.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        to={`/sectors/${item.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-bold transition-colors",
                          current ? "bg-plum-700 text-white" : "text-plum-900 hover:bg-white",
                        )}
                      >
                        <Icon name={item.icon} size={18} className={current ? "text-gold-300" : "text-plum-500"} />
                        {t(item.name)}
                        {current && <Icon name="chevronRight" size={16} className="ms-auto rtl:-scale-x-100" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      {/* prev / next */}
      <nav className="border-t border-sand-200 bg-sand-50">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
          {[
            { item: prev, label: { ar: "القطاع السابق", en: "Previous sector" }, align: "start" },
            { item: next, label: { ar: "القطاع التالي", en: "Next sector" }, align: "end" },
          ].map(({ item, label, align }) => (
            <Link
              key={align}
              to={`/sectors/${item.slug}`}
              className={cn(
                "group flex items-center gap-5 px-5 py-8 transition-colors hover:bg-white sm:px-8",
                align === "end" && "border-t border-sand-200 sm:flex-row-reverse sm:border-s sm:border-t-0 sm:text-end",
              )}
            >
              <ArrowIcon
                className={cn(
                  "shrink-0 text-plum-400 transition-colors group-hover:text-plum-700",
                  align === "start" && "rotate-180",
                )}
              />
              <img src={item.image} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-gold-600">{t(label)}</span>
                <span className="block text-xl font-extrabold text-plum-900">{t(item.name)}</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CTABand image={sector.gallery[0] ?? sector.image} />
    </>
  );
}
