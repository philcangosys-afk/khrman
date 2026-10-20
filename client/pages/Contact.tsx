import { useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLang, usePageTitle } from "@/lib/i18n";
import { company, contact, sectors, telHref, whatsappHref } from "@/lib/khryman-content";
import { Icon, type IconName } from "@/components/site/Icon";
import { PageHero, Reveal, buttonStyles } from "@/components/site/blocks";

const TITLE = { ar: "تواصل معنا", en: "Contact us" };

type Channel = "whatsapp" | "email";

const fieldClass =
  "w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-plum-500 focus:bg-white focus:ring-4 focus:ring-plum-100";

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-plum-700 text-gold-300">
        <Icon name={icon} size={22} />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-extrabold text-ink/55">{title}</h3>
        <div className="mt-1 text-[16px] font-bold leading-relaxed text-plum-900">{children}</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<Channel | null>(null);
  const [channel, setChannel] = useState<Channel>("whatsapp");

  const sectorName = sectors.find((item) => item.slug === sector);

  function buildMessage() {
    const lines = [t({ ar: "مرحباً كهرمان العالمية،", en: "Hello Khryman International," }), ""];
    lines.push(`${t({ ar: "الاسم", en: "Name" })}: ${name}`);
    if (phone) lines.push(`${t({ ar: "الهاتف", en: "Phone" })}: ${phone}`);
    if (sectorName) lines.push(`${t({ ar: "القطاع", en: "Sector" })}: ${t(sectorName.name)}`);
    lines.push("", message);
    return lines.join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = buildMessage();
    if (channel === "whatsapp") {
      window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
    } else {
      const subject = t({ ar: "استفسار من الموقع", en: "Website enquiry" }) + (sectorName ? ` — ${t(sectorName.name)}` : "");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSent(channel);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-plum-950/10 sm:p-10">
      <h2 className="text-2xl font-extrabold text-plum-900 sm:text-3xl">{t({ ar: "أرسل لنا رسالة", en: "Send us a message" })}</h2>
      <p className="mt-2 text-ink/65">
        {t({
          ar: "املأ النموذج وسيتم تجهيز رسالتك تلقائياً لإرسالها عبر واتساب أو البريد الإلكتروني.",
          en: "Fill in the form and your message will be prepared for WhatsApp or email automatically.",
        })}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-plum-900">
            {t({ ar: "الاسم الكامل", en: "Full name" })} <span className="text-gold-600">*</span>
          </span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
            placeholder={t({ ar: "اكتب اسمك", en: "Your name" })}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-plum-900">{t({ ar: "رقم الهاتف", en: "Phone number" })}</span>
          <input
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={cn(fieldClass, "rtl:text-right")}
            placeholder="09xxxxxxxx"
            autoComplete="tel"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-bold text-plum-900">{t({ ar: "القطاع المطلوب", en: "Sector of interest" })}</span>
          <div className="relative">
            <select value={sector} onChange={(event) => setSector(event.target.value)} className={cn(fieldClass, "appearance-none pe-12")}>
              <option value="">{t({ ar: "استفسار عام", en: "General enquiry" })}</option>
              {sectors.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {t(item.name)}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={18} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-plum-500" />
          </div>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-bold text-plum-900">
            {t({ ar: "رسالتك", en: "Your message" })} <span className="text-gold-600">*</span>
          </span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={cn(fieldClass, "resize-y")}
            placeholder={t({ ar: "حدّثنا عن مشروعك أو استفسارك…", en: "Tell us about your project or question…" })}
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-plum-900">{t({ ar: "أرسل عبر", en: "Send via" })}</legend>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { id: "whatsapp", icon: "whatsapp", label: { ar: "واتساب", en: "WhatsApp" } },
              { id: "email", icon: "mail", label: { ar: "البريد", en: "Email" } },
            ] as const
          ).map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-[15px] font-bold transition-colors",
                channel === option.id ? "border-plum-700 bg-plum-50 text-plum-800" : "border-sand-200 text-ink/60 hover:border-plum-200",
              )}
            >
              <input
                type="radio"
                name="channel"
                value={option.id}
                checked={channel === option.id}
                onChange={() => setChannel(option.id)}
                className="sr-only"
              />
              <Icon name={option.icon} size={18} className={option.id === "whatsapp" && channel === option.id ? "text-[#1FAF5A]" : undefined} />
              {t(option.label)}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className={cn(channel === "whatsapp" ? buttonStyles.whatsapp : buttonStyles.purple, "mt-7 w-full py-4 text-base")}>
        <Icon name={channel === "whatsapp" ? "whatsapp" : "send"} size={20} className="rtl:-scale-x-100" />
        {t({ ar: "إرسال الرسالة", en: "Send message" })}
      </button>

      {sent && (
        <p role="status" className="mt-5 flex items-start gap-2 rounded-xl bg-gold-50 p-4 text-sm font-semibold text-plum-900 ring-1 ring-gold-200">
          <Icon name="checkCircle" size={20} className="shrink-0 text-gold-600" />
          {sent === "whatsapp"
            ? t({
                ar: "تم تجهيز رسالتك في واتساب — اضغط «إرسال» هناك لتصلنا.",
                en: "Your message is ready in WhatsApp — press “Send” there to reach us.",
              })
            : t({
                ar: "تم فتح برنامج البريد برسالتك — أرسلها من هناك لتصلنا.",
                en: "Your email app has opened with the message — send it from there to reach us.",
              })}
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  const { t } = useLang();
  usePageTitle(TITLE);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=14&output=embed`;

  return (
    <>
      <PageHero
        image="/images/partnership.jpg"
        title={{ ar: "يسعدنا تواصلك معنا", en: "We’d love to hear from you" }}
        subtitle={{
          ar: "استشارة، عرض سعر، أو شراكة جديدة — فريق كهرمان العالمية جاهز للرد على استفساراتك.",
          en: "A consultation, a quotation or a new partnership — the Khryman team is ready to help.",
        }}
        crumbs={[{ label: { ar: "الرئيسية", en: "Home" }, to: "/" }, { label: TITLE }]}
      />

      <section className="bg-sand-100 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Reveal>
              <a
                href={whatsappHref(t({ ar: "مرحباً كهرمان، أود الاستفسار عن خدماتكم.", en: "Hello Khryman, I’d like to ask about your services." }))}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-[#1FAF5A] p-6 text-white shadow-lg shadow-[#1FAF5A]/25 transition-transform hover:-translate-y-0.5"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <Icon name="whatsapp" size={26} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-bold text-white/80">{t({ ar: "أسرع طريقة للتواصل", en: "Fastest way to reach us" })}</span>
                  <span className="block text-lg font-extrabold">{t({ ar: "راسلنا على واتساب", en: "Chat with us on WhatsApp" })}</span>
                </span>
                <Icon name="arrowUpRight" size={22} className="shrink-0 rtl:-scale-x-100" />
              </a>
            </Reveal>
            <Reveal delay={80}>
              <InfoCard icon="phone" title={t({ ar: "اتصل بنا", en: "Call us" })}>
                <ul className="space-y-0.5">
                  {contact.phones.map((phone) => (
                    <li key={phone}>
                      <a href={telHref(phone)} dir="ltr" className="hover:text-gold-600">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </Reveal>
            <Reveal delay={160}>
              <InfoCard icon="mail" title={t({ ar: "البريد الإلكتروني للاستفسارات", en: "Inquiries email" })}>
                <a href={`mailto:${contact.email}`} className="break-all hover:text-gold-600" dir="ltr">
                  {contact.email}
                </a>
              </InfoCard>
            </Reveal>
            <Reveal delay={240}>
              <InfoCard icon="pin" title={t({ ar: "العنوان", en: "Address" })}>
                {t(contact.address)}
              </InfoCard>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="relative">
          <iframe
            title={t({ ar: "موقع كهرمان العالمية على الخريطة", en: "Khryman International on the map" })}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[440px] w-full border-0 grayscale-[30%]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center px-5 lg:justify-start lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <div className="pointer-events-auto flex max-w-sm items-center gap-4 rounded-2xl bg-white p-5 shadow-xl">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-plum-950">
                <Icon name="building" size={22} />
              </span>
              <div>
                <p className="font-extrabold text-plum-900">{t(company.short)}</p>
                <p className="text-sm leading-relaxed text-ink/65">{t(contact.address)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
