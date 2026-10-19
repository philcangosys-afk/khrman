import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang, usePageTitle } from "@/lib/i18n";
import { getSector, integrated, sectors } from "@/lib/khryman-content";
import { Icon } from "@/components/site/Icon";
import { ArrowIcon, CTABand, PageHero, Reveal, SectionHeader } from "@/components/site/blocks";

const TITLE = { ar: "قطاعاتنا", en: "Our sectors" };

function SectorGrid() {
  const { t } = useLang();
  return (
    <section className="bg-sand-100 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={{ ar: "ثمانية قطاعات", en: "Eight sectors" }}
            title={{ ar: "اختر القطاع الذي يهمّك", en: "Choose the sector you need" }}
            intro={{
              ar: "كل قطاع يُدار بفريق متخصص، وجميعها تعمل معاً لتقدّم لك حلاً متكاملاً.",
              en: "Each sector is run by a specialised team — and they all work together to give you one integrated solution.",
            }}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <Reveal key={sector.slug} delay={(index % 3) * 90}>
              <Link
                to={`/sectors/${sector.slug}`}
                className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-[2rem] bg-plum-950 text-white shadow-lg shadow-plum-950/10"
              >
                <img
                  src={sector.image}
                  alt={t(sector.name)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/45 to-plum-950/35 transition-colors duration-500 group-hover:via-plum-900/60" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-plum-950/55 text-gold-300 ring-1 ring-white/20 backdrop-blur">
                    <Icon name={sector.icon} size={24} />
                  </span>
                  <span className="text-sm font-extrabold text-white/70" dir="ltr">
                    {sector.number}
                  </span>
                </div>
                <div className="relative p-7">
                  {sector.since2017 && (
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-extrabold text-plum-950">
                      <Icon name="calendar" size={13} />
                      {t({ ar: "منذ 2017", en: "Since 2017" })}
                    </span>
                  )}
                  <h3 className="text-2xl font-black">{t(sector.name)}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-white/80">{t(sector.summary)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-300">
                    {t({ ar: "اكتشف القطاع", en: "Discover" })}
                    <ArrowIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={180}>
            <Link
              to="/contact"
              className="group flex h-full min-h-[380px] flex-col justify-between rounded-[2rem] border-2 border-dashed border-plum-300 bg-white p-8 transition-colors hover:border-plum-700 hover:bg-plum-50"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-plum-950">
                <Icon name="handshake" size={26} />
              </span>
              <div>
                <h3 className="text-2xl font-black text-plum-900">
                  {t({ ar: "مشروعك يجمع أكثر من قطاع؟", en: "Your project spans several sectors?" })}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70">
                  {t({
                    ar: "هنا تكمن قوتنا. حدّثنا عن فكرتك وسنصمم لك حلاً متكاملاً من جهة واحدة.",
                    en: "That’s our strength. Tell us your idea and we’ll design one integrated solution.",
                  })}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-plum-700">
                  {t({ ar: "تواصل معنا", en: "Contact us" })}
                  <ArrowIcon size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Integrated() {
  const { t } = useLang();
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            center
            eyebrow={{ ar: "حلول متكاملة", en: "Integrated solutions" }}
            title={{ ar: "عندما تعمل قطاعاتنا معاً", en: "When our sectors work together" }}
            intro={{
              ar: "أمثلة على كيف نجمع خبرات أكثر من قطاع في مشروع واحد لنوفر عليك الوقت والتكلفة.",
              en: "Examples of how we combine several sectors in a single project to save you time and cost.",
            }}
          />
        </Reveal>
        <div className="mt-14 space-y-6">
          {integrated.map((item, index) => (
            <Reveal key={index}>
              <article
                className={cn(
                  "grid overflow-hidden rounded-[2rem] bg-sand-100 md:grid-cols-2",
                  index % 2 === 1 && "md:[&>*:first-child]:order-2",
                )}
              >
                <img src={item.image} alt={t(item.title)} loading="lazy" className="aspect-[16/10] h-full w-full object-cover md:aspect-auto md:min-h-[320px]" />
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="text-5xl font-black text-plum-200">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-2xl font-extrabold text-plum-900 sm:text-3xl">{t(item.title)}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink/70">{t(item.text)}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {item.sectors.map((slug, i) => {
                      const sector = getSector(slug);
                      if (!sector) return null;
                      return (
                        <span key={slug} className="inline-flex items-center gap-2">
                          {i > 0 && <Icon name="plus" size={14} className="text-gold-500" />}
                          <Link
                            to={`/sectors/${slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-plum-800 ring-1 ring-plum-100 transition-colors hover:bg-plum-700 hover:text-white"
                          >
                            <Icon name={sector.icon} size={16} />
                            {t(sector.name)}
                          </Link>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Sectors() {
  usePageTitle(TITLE);
  return (
    <>
      <PageHero
        image="/images/aerial.jpg"
        title={{ ar: "قطاعات متنوعة… وخبرة متكاملة", en: "Diverse sectors, integrated expertise" }}
        subtitle={{
          ar: "من الذهب والتعدين إلى الزراعة والطاقة والإنشاءات والتجارة — ثمانية قطاعات تخدم السودان ومستقبله.",
          en: "From gold and mining to agriculture, energy, construction and trade — eight sectors serving Sudan and its future.",
        }}
        crumbs={[{ label: { ar: "الرئيسية", en: "Home" }, to: "/" }, { label: TITLE }]}
      />
      <SectorGrid />
      <Integrated />
      <CTABand />
    </>
  );
}
