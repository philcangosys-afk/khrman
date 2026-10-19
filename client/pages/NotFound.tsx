import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang, usePageTitle } from "@/lib/i18n";
import { sectors } from "@/lib/khryman-content";
import { Icon } from "@/components/site/Icon";
import { ArrowIcon, buttonStyles } from "@/components/site/blocks";

export default function NotFound() {
  const { t } = useLang();
  const location = useLocation();
  usePageTitle({ ar: "الصفحة غير موجودة", en: "Page not found" });

  useEffect(() => {
    console.error("404: page not found:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="kh-dots relative isolate flex min-h-[90vh] items-center overflow-hidden bg-plum-950 pb-20 pt-40 text-white">
      <img
        src="/brand/emblem.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 top-1/2 -z-10 w-[560px] -translate-y-1/2 opacity-[0.06] grayscale invert"
      />
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <p className="text-[7rem] font-black leading-none text-gold-400 sm:text-[10rem]" dir="ltr">
          404
        </p>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">{t({ ar: "عذراً، هذه الصفحة غير موجودة", en: "Sorry, this page doesn’t exist" })}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
          {t({
            ar: "ربما تم نقل الصفحة أو أن الرابط غير صحيح. يمكنك العودة للرئيسية أو زيارة أحد قطاعاتنا.",
            en: "The page may have moved or the link is incorrect. Head back home or visit one of our sectors.",
          })}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/" className={buttonStyles.gold}>
            <Icon name="home" size={18} />
            {t({ ar: "العودة للرئيسية", en: "Back to home" })}
          </Link>
          <Link to="/contact" className={buttonStyles.outlineLight}>
            {t({ ar: "تواصل معنا", en: "Contact us" })}
            <ArrowIcon />
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              to={`/sectors/${sector.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/20"
            >
              <Icon name={sector.icon} size={15} className="text-gold-300" />
              {t(sector.name)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
