import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/site/Icon";

/* ------------------------------------------------------------------ company */

export const company = {
  name: { ar: "شركة كهرمان العالمية المحدودة", en: "Khryman International Co. Ltd." } as L,
  short: { ar: "كهرمان العالمية", en: "Khryman International" } as L,
  former: { ar: "أعمال عقال للتجارة", en: "Ogal Trading Business" } as L,
  founded: 2017,
  tagline: { ar: "تنوّعٌ في الاستثمار… وثقةٌ في الإنجاز", en: "Diversified investments. Trusted delivery." } as L,
};

export const contact = {
  address: {
    ar: "السودان – أم درمان – شارع العرضة – شرق كبري ود البشير",
    en: "Al-Arda Street, East of Wad Al-Bashir Bridge, Omdurman, Sudan",
  } as L,
  phones: ["0912325729", "0912292615", "0912545931"],
  email: "tarig.ogal@gmail.com",
  /** WhatsApp number in international format (Sudan +249). */
  whatsapp: "249912325729",
  mapQuery: "Wad Al Bashir Bridge, Omdurman, Sudan",
};

/** Local Sudanese number (09…) → tel: link with +249. */
export function telHref(phone: string) {
  return `tel:+249${phone.replace(/^0/, "")}`;
}

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* ------------------------------------------------------------------ sectors */

export interface Sector {
  slug: string;
  number: string;
  icon: IconName;
  name: L;
  tagline: L;
  summary: L;
  body: L[];
  services: L[];
  image: string;
  gallery: string[];
  /** Part of the original business (Ogal Trading) since 2017. */
  since2017: boolean;
}

export const sectors: Sector[] = [
  {
    slug: "gold-mining",
    number: "01",
    icon: "gem",
    name: { ar: "الذهب والتعدين", en: "Gold & Mining" },
    tagline: { ar: "ثروةٌ من باطن الأرض", en: "Wealth from the earth" },
    summary: {
      ar: "استكشاف وتعدين ومعالجة وتجارة الذهب والمعادن، بأساليب آمنة ومسؤولة بيئياً.",
      en: "Exploration, mining, processing and trading of gold and minerals — safely and responsibly.",
    },
    body: [
      {
        ar: "يمتلك السودان ثروات معدنية ضخمة يتصدرها الذهب، وتعمل كهرمان في هذا القطاع الحيوي عبر أعمال الاستكشاف والتعدين والمعالجة وتجارة الذهب.",
        en: "Sudan holds vast mineral wealth, led by gold. Khryman works across this vital sector — from exploration and mining to processing and gold trading.",
      },
      {
        ar: "نعتمد على كوادر فنية مؤهلة ومعدات حديثة، ونلتزم بمعايير السلامة المهنية والحفاظ على البيئة في كل مرحلة من مراحل العمل.",
        en: "We rely on qualified technical teams and modern equipment, with full commitment to occupational safety and environmental protection at every stage.",
      },
    ],
    services: [
      { ar: "الاستكشاف والتنقيب عن الذهب والمعادن", en: "Gold and mineral exploration" },
      { ar: "أعمال التعدين واستخراج الخام", en: "Mining and ore extraction" },
      { ar: "معالجة الخام واستخلاص الذهب", en: "Ore processing and gold recovery" },
      { ar: "تجارة الذهب وتسويقه", en: "Gold trading and marketing" },
      { ar: "توفير معدات وآليات التعدين", en: "Supply of mining equipment and machinery" },
    ],
    image: "/images/gold.jpg",
    gallery: ["/images/gold-2.jpg"],
    since2017: false,
  },
  {
    slug: "agriculture",
    number: "02",
    icon: "sprout",
    name: { ar: "الزراعة", en: "Agriculture" },
    tagline: { ar: "خيرُ الأرض لأمنٍ غذائي مستدام", en: "Cultivating sustainable food security" },
    summary: {
      ar: "مشاريع زراعية حديثة بأنظمة ري متطورة وميكنة زراعية، لإنتاج محاصيل عالية الجودة.",
      en: "Modern farming projects with advanced irrigation and mechanisation for high-quality crops.",
    },
    body: [
      {
        ar: "الزراعة من أول الأنشطة التي انطلقنا بها منذ عام 2017. نستثمر في الأراضي الزراعية الخصبة بالسودان عبر مشاريع حديثة تعتمد على أنظمة الري المتطورة والميكنة الزراعية.",
        en: "Agriculture is one of the first activities we started with in 2017. We invest in Sudan’s fertile land through modern projects built on advanced irrigation and mechanisation.",
      },
      {
        ar: "هدفنا إنتاج محاصيل عالية الجودة تلبي احتياجات السوق المحلي وتفتح آفاق التصدير، مع الاستفادة من الطاقة الشمسية في تشغيل منظومات الري.",
        en: "Our goal is high-quality produce for the local market and for export — increasingly powered by solar irrigation systems.",
      },
    ],
    services: [
      { ar: "زراعة المحاصيل الحقلية والبستانية", en: "Field and horticultural crops" },
      { ar: "استصلاح الأراضي وتجهيزها", en: "Land reclamation and preparation" },
      { ar: "أنظمة الري الحديثة (المحوري والتنقيط)", en: "Modern irrigation (center-pivot & drip)" },
      { ar: "توفير البذور والأسمدة والمعدات الزراعية", en: "Seeds, fertilisers and farm equipment" },
      { ar: "تسويق المنتجات الزراعية وتصديرها", en: "Marketing and export of produce" },
    ],
    image: "/images/agriculture.jpg",
    gallery: ["/images/agriculture-2.jpg", "/images/pivot-solar.jpg"],
    since2017: true,
  },
  {
    slug: "livestock",
    number: "03",
    icon: "cow",
    name: { ar: "الإنتاج الحيواني", en: "Livestock Production" },
    tagline: { ar: "ثروةٌ حيوانية بمعايير حديثة", en: "Livestock wealth, modern standards" },
    summary: {
      ar: "تربية وتسمين، إنتاج الألبان واللحوم والأعلاف، ورعاية بيطرية متكاملة.",
      en: "Breeding and fattening, dairy, meat and feed production, with full veterinary care.",
    },
    body: [
      {
        ar: "نعمل على تطوير الإنتاج الحيواني وفق أسس علمية حديثة، من التربية والتسمين إلى الرعاية البيطرية وإنتاج الأعلاف.",
        en: "We develop livestock production on modern scientific foundations — from breeding and fattening to veterinary care and feed.",
      },
      {
        ar: "نسعى إلى رفع جودة الثروة الحيوانية السودانية وتعزيز فرص تصديرها إلى الأسواق الإقليمية.",
        en: "We aim to raise the quality of Sudan’s livestock and expand its export opportunities in regional markets.",
      },
    ],
    services: [
      { ar: "تربية وتسمين الأبقار والأغنام", en: "Cattle and sheep breeding and fattening" },
      { ar: "إنتاج الألبان واللحوم", en: "Dairy and meat production" },
      { ar: "إنتاج الأعلاف وتوفيرها", en: "Animal feed production and supply" },
      { ar: "الرعاية البيطرية والصحة الحيوانية", en: "Veterinary care and animal health" },
      { ar: "تصدير الماشية واللحوم", en: "Livestock and meat export" },
    ],
    image: "/images/livestock.jpg",
    gallery: ["/images/livestock-2.jpg"],
    since2017: false,
  },
  {
    slug: "import-export",
    number: "04",
    icon: "ship",
    name: { ar: "الاستيراد والتصدير", en: "Import & Export" },
    tagline: { ar: "جسرٌ بين السودان والعالم", en: "Bridging Sudan and the world" },
    summary: {
      ar: "نستورد ما يحتاجه السوق من سلع ومعدات، ونصدّر المنتجات السودانية المميزة.",
      en: "Importing the goods and equipment the market needs, exporting distinctive Sudanese products.",
    },
    body: [
      {
        ar: "نربط السودان بالأسواق الإقليمية والعالمية عبر شبكة من الشركاء والموردين الموثوقين.",
        en: "We connect Sudan with regional and global markets through a network of trusted partners and suppliers.",
      },
      {
        ar: "نستورد ما يحتاجه السوق المحلي من معدات وآليات ومواد بناء وأجهزة، ونصدّر المحاصيل الزراعية والثروة الحيوانية بكفاءة وموثوقية، مع خدمات التخليص والخدمات اللوجستية.",
        en: "We import equipment, machinery, building materials and appliances, and export crops and livestock efficiently — with customs clearance and logistics support.",
      },
    ],
    services: [
      { ar: "استيراد المعدات والآليات ومواد البناء", en: "Equipment, machinery and building materials" },
      { ar: "استيراد الأجهزة الكهربائية ومستلزمات الطاقة الشمسية", en: "Electrical appliances and solar supplies" },
      { ar: "تصدير المحاصيل الزراعية والثروة الحيوانية", en: "Export of crops and livestock" },
      { ar: "التخليص الجمركي والخدمات اللوجستية", en: "Customs clearance and logistics" },
      { ar: "التوريدات العامة", en: "General supplies" },
    ],
    image: "/images/trade.jpg",
    gallery: ["/images/trade-2.jpg"],
    since2017: false,
  },
  {
    slug: "electrical-appliances",
    number: "05",
    icon: "plug",
    name: { ar: "الأجهزة الكهربائية", en: "Electrical Appliances" },
    tagline: { ar: "أجهزةٌ موثوقة لكل منزل ومشروع", en: "Reliable appliances for every home and project" },
    summary: {
      ar: "تشكيلة واسعة من الأجهزة الكهربائية والمنزلية، بيع بالجملة والتجزئة مع التركيب والصيانة.",
      en: "A wide range of electrical and home appliances — wholesale, retail, installation and service.",
    },
    body: [
      {
        ar: "تجارة الأجهزة الكهربائية هي النشاط الذي بدأت به مسيرتنا عام 2017 تحت اسم «أعمال عقال للتجارة»، وما زالت من أهم أنشطتنا.",
        en: "Electrical appliances is where our journey began in 2017 as “Ogal Trading Business” — and it remains one of our core activities.",
      },
      {
        ar: "نوفّر تشكيلة واسعة من الأجهزة الكهربائية والمنزلية من علامات تجارية موثوقة، مع خدمات البيع بالجملة والتجزئة والتركيب وخدمات ما بعد البيع.",
        en: "We offer a wide range of electrical and home appliances from trusted brands, with wholesale and retail sales, installation and after-sales service.",
      },
    ],
    services: [
      { ar: "الأجهزة المنزلية: ثلاجات، غسالات، مكيفات، شاشات", en: "Home appliances: fridges, washers, ACs, TVs" },
      { ar: "الأجهزة والمعدات الكهربائية للمشاريع", en: "Electrical equipment for projects" },
      { ar: "البيع بالجملة والتجزئة", en: "Wholesale and retail" },
      { ar: "التركيب والصيانة", en: "Installation and maintenance" },
      { ar: "الضمان وخدمات ما بعد البيع", en: "Warranty and after-sales service" },
    ],
    image: "/images/appliances.jpg",
    gallery: ["/images/appliances-2.jpg"],
    since2017: true,
  },
  {
    slug: "solar-energy",
    number: "06",
    icon: "sun",
    name: { ar: "الطاقة الشمسية", en: "Solar Energy" },
    tagline: { ar: "طاقةٌ نظيفة من شمس السودان", en: "Clean power from Sudan’s sun" },
    summary: {
      ar: "حلول طاقة شمسية متكاملة للمنازل والمزارع والمؤسسات، من التصميم إلى التركيب والصيانة.",
      en: "Complete solar solutions for homes, farms and institutions — from design to installation and service.",
    },
    body: [
      {
        ar: "الطاقة الشمسية من الأنشطة التي رافقتنا منذ البداية عام 2017. نقدّم حلولاً متكاملة للمنازل والمزارع والمؤسسات والمشاريع الكبرى.",
        en: "Solar energy has been with us since the beginning in 2017. We deliver complete solutions for homes, farms, institutions and large projects.",
      },
      {
        ar: "نبدأ بدراسة الاحتياج والتصميم، ثم التوريد والتركيب والصيانة، لنوفر طاقة نظيفة ونخفض تكاليف التشغيل على المدى الطويل.",
        en: "We start with a needs study and design, then supply, installation and maintenance — for clean power and lower long-term operating costs.",
      },
    ],
    services: [
      { ar: "تصميم وتركيب أنظمة الطاقة الشمسية", en: "Solar system design and installation" },
      { ar: "منظومات الري بالطاقة الشمسية للمزارع", en: "Solar-powered irrigation for farms" },
      { ar: "توريد الألواح والبطاريات والعاكسات", en: "Panels, batteries and inverters" },
      { ar: "محطات طاقة شمسية للمؤسسات والمشاريع", en: "Solar plants for institutions and projects" },
      { ar: "الصيانة والدعم الفني", en: "Maintenance and technical support" },
    ],
    image: "/images/solar.jpg",
    gallery: ["/images/solar-2.jpg", "/images/pivot-solar.jpg"],
    since2017: true,
  },
  {
    slug: "construction",
    number: "07",
    icon: "hardhat",
    name: { ar: "الإنشاءات والمقاولات", en: "Construction & Contracting" },
    tagline: { ar: "نبني البنية التحتية للمستقبل", en: "Building tomorrow’s infrastructure" },
    summary: {
      ar: "تصميم وتنفيذ المباني، الطرق والجسور، وشبكات الصرف الصحي بمعايير هندسية عالية.",
      en: "Building design and construction, roads and bridges, and sewage networks to high engineering standards.",
    },
    body: [
      {
        ar: "نقدّم خدمات هندسية ومقاولات متكاملة تشمل تصميم المباني وتنفيذها، وإنشاء الطرق والجسور، وتنفيذ شبكات الصرف الصحي وتصريف مياه الأمطار.",
        en: "We provide integrated engineering and contracting services: building design and construction, roads and bridges, and sewage and stormwater networks.",
      },
      {
        ar: "نعمل بكوادر هندسية مؤهلة ومعدات حديثة، مع إدارة احترافية للمشاريع والتزام صارم بمعايير الجودة والسلامة والجداول الزمنية.",
        en: "Our qualified engineers and modern equipment are backed by professional project management and strict quality, safety and schedule standards.",
      },
    ],
    services: [
      { ar: "التصميم المعماري والإنشائي للمباني", en: "Architectural and structural design" },
      { ar: "تنفيذ المباني السكنية والتجارية والحكومية", en: "Residential, commercial and public buildings" },
      { ar: "إنشاء الطرق والجسور", en: "Roads and bridges" },
      { ar: "شبكات الصرف الصحي وتصريف مياه الأمطار", en: "Sewage and stormwater networks" },
      { ar: "أعمال البنية التحتية والحفريات", en: "Infrastructure and earthworks" },
      { ar: "إدارة المشاريع والإشراف الهندسي", en: "Project management and supervision" },
    ],
    image: "/images/construction.jpg",
    gallery: ["/images/construction-2.jpg", "/images/sewage.jpg"],
    since2017: false,
  },
  {
    slug: "manufacturing",
    number: "08",
    icon: "factory",
    name: { ar: "التصنيع", en: "Manufacturing" },
    tagline: { ar: "قيمةٌ مضافة لمواردنا الوطنية", en: "Adding value to national resources" },
    summary: {
      ar: "تحويل المواد الخام والمنتجات الزراعية والحيوانية إلى منتجات نهائية بجودة تنافسية.",
      en: "Turning raw materials and farm and livestock products into competitive finished goods.",
    },
    body: [
      {
        ar: "نسعى إلى تعظيم القيمة المضافة للموارد السودانية عبر مشاريع تصنيع وتحويل حديثة.",
        en: "We aim to maximise the added value of Sudanese resources through modern manufacturing and processing.",
      },
      {
        ar: "نحوّل المواد الخام والمنتجات الزراعية والحيوانية إلى منتجات نهائية بجودة تنافسية، بما يدعم الصناعة الوطنية ويخلق فرص عمل جديدة.",
        en: "We turn raw materials and agricultural and livestock products into competitive finished goods — supporting national industry and creating jobs.",
      },
    ],
    services: [
      { ar: "التصنيع الغذائي وتعبئة المنتجات الزراعية", en: "Food processing and packaging" },
      { ar: "تصنيع الأعلاف", en: "Animal feed manufacturing" },
      { ar: "تصنيع مواد البناء", en: "Building materials manufacturing" },
      { ar: "التجميع والتصنيع الخفيف", en: "Assembly and light manufacturing" },
      { ar: "التعبئة والتغليف", en: "Packing and packaging" },
    ],
    image: "/images/manufacturing.jpg",
    gallery: ["/images/manufacturing-2.jpg"],
    since2017: false,
  },
];

export function getSector(slug: string | undefined) {
  return sectors.find((sector) => sector.slug === slug);
}

/* ------------------------------------------------------------------ home */

export const heroSlides: { image: string; label: L }[] = [
  { image: "/images/hero-nile.jpg", label: { ar: "الزراعة والطاقة", en: "Agriculture & energy" } },
  { image: "/images/gold.jpg", label: { ar: "الذهب والتعدين", en: "Gold & mining" } },
  { image: "/images/solar.jpg", label: { ar: "الطاقة الشمسية", en: "Solar energy" } },
  { image: "/images/construction.jpg", label: { ar: "الإنشاءات", en: "Construction" } },
  { image: "/images/trade.jpg", label: { ar: "الاستيراد والتصدير", en: "Import & export" } },
];

export const about = {
  lead: {
    ar: "كهرمان العالمية شركة سودانية متعددة الأنشطة، مقرها أم درمان. بدأت مسيرتها عام 2017، وتعمل اليوم في ثمانية قطاعات حيوية تبدأ من باطن الأرض بالذهب والتعدين، وتمتد إلى الزراعة والإنتاج الحيواني والطاقة الشمسية والأجهزة الكهربائية، وصولاً إلى الإنشاءات والتصنيع والتجارة الدولية.",
    en: "Khryman International is a Sudanese multi-sector company based in Omdurman. Our journey began in 2017, and today we work across eight vital sectors — from gold and mining, to agriculture, livestock, solar energy and electrical appliances, and on to construction, manufacturing and international trade.",
  } as L,
  second: {
    ar: "نعمل بفرق متخصصة وشبكة شراكات موثوقة لنقدّم لعملائنا حلولاً متكاملة بجودة عالية والتزام تام بالمواعيد — من استشارة واحدة إلى مشروع متكامل.",
    en: "Specialised teams and a trusted partner network let us deliver integrated, high-quality solutions on time — from a single consultation to a complete project.",
  } as L,
  points: [
    { ar: "ثمانية قطاعات متكاملة تحت مظلة واحدة", en: "Eight integrated sectors under one roof" },
    { ar: "خبرة عملية في السوق السوداني منذ 2017", en: "Hands-on experience in the Sudanese market since 2017" },
    { ar: "شبكة شركاء وموردين محليين ودوليين", en: "A network of local and international partners" },
  ] as L[],
};

export const story = {
  title: { ar: "من «عقال» إلى «كهرمان»", en: "From Ogal to Khryman" } as L,
  lead: {
    ar: "بدأت رحلتنا عام 2017 تحت اسم «أعمال عقال للتجارة»، فرسّخنا حضورنا في تجارة الأجهزة الكهربائية وحلول الطاقة الشمسية والزراعة، وكسبنا ثقة عملائنا بالجودة والالتزام. واليوم ننطلق بثوبٍ جديد واسمٍ جديد: «كهرمان العالمية»؛ نحمل الخبرة نفسها والقيم ذاتها إلى قطاعات أوسع.",
    en: "Our journey began in 2017 as “Ogal Trading Business”, building a strong presence in electrical appliances, solar energy and agriculture, and earning our clients’ trust through quality and commitment. Today we step forward with a new look and a new name — Khryman International — carrying the same expertise and values into wider sectors.",
  } as L,
  quote: {
    ar: "«عقال» الأصلُ والخبرة… و«كهرمان» الهويةُ والطموح",
    en: "Ogal: our roots and experience. Khryman: our identity and ambition.",
  } as L,
  originalSlugs: ["electrical-appliances", "solar-energy", "agriculture"],
  milestones: [
    {
      when: { ar: "2017", en: "2017" },
      title: { ar: "البداية: أعمال عقال للتجارة", en: "The beginning: Ogal Trading Business" },
      text: {
        ar: "انطلقت الشركة في أم درمان بثلاثة أنشطة أساسية: الأجهزة الكهربائية، والطاقة الشمسية، والزراعة.",
        en: "The business started in Omdurman with three core activities: electrical appliances, solar energy and agriculture.",
      },
    },
    {
      when: { ar: "سنوات النمو", en: "Years of growth" },
      title: { ar: "نمو وتوسّع وثقة", en: "Growth, expansion and trust" },
      text: {
        ar: "خبرة متراكمة في السوق السوداني، وشبكة موردين وشركاء محليين ودوليين، وقاعدة عملاء تثق في جودة خدماتنا.",
        en: "Accumulated experience in the Sudanese market, a network of local and international suppliers and partners, and a loyal client base.",
      },
    },
    {
      when: { ar: "اليوم", en: "Today" },
      title: { ar: "كهرمان العالمية: ثوبٌ جديد", en: "Khryman International: a new identity" },
      text: {
        ar: "هوية جديدة واسم جديد، وثمانية قطاعات تشمل الذهب والتعدين والإنتاج الحيواني والإنشاءات والتصنيع والتجارة الدولية.",
        en: "A new name and identity, and eight sectors including gold and mining, livestock, construction, manufacturing and international trade.",
      },
    },
  ] as { when: L; title: L; text: L }[],
  nameMeaning: {
    ar: "الكهرمان حجرٌ كريم ذهبي اللون، يتكوّن ببطء عبر ملايين السنين. اخترناه اسماً لأنه يجمع ما نؤمن به: قيمةٌ ثمينة، وأصالةٌ راسخة، وطاقةٌ لا تنطفئ.",
    en: "Amber — “kahraman” in Arabic — is a golden gemstone formed slowly over millions of years. We chose it because it holds what we believe in: precious value, deep-rooted authenticity and lasting energy.",
  } as L,
  logoMeaning: {
    ar: "ثلاثة أهلّة متداخلة ترمز لتكامل قطاعاتنا وحركتها المستمرة، ورأس الذئب في المركز رمزٌ للقوة والقيادة وروح الفريق.",
    en: "Three interlocking crescents stand for our integrated sectors in constant motion; the wolf at the centre stands for strength, leadership and team spirit.",
  } as L,
};

export const vision = {
  ar: "أن نكون مجموعةً سودانيةً رائدة متعددة الأنشطة، تُسهم في بناء اقتصادٍ مستدام، والشريكَ الأول الموثوق في قطاعات التعدين والزراعة والطاقة والبنية التحتية في السودان والمنطقة.",
  en: "To be a leading Sudanese multi-sector group that contributes to a sustainable economy, and the most trusted partner in mining, agriculture, energy and infrastructure in Sudan and the region.",
} as L;

export const mission = {
  ar: "نلتزم بتقديم منتجات وخدمات وحلول متكاملة بأعلى معايير الجودة والسلامة، عبر استثمار الموارد الوطنية بمسؤولية، وتوظيف التقنيات الحديثة، وبناء شراكات طويلة الأمد تحقق قيمةً مضافة لعملائنا ومجتمعنا ووطننا.",
  en: "We are committed to delivering integrated products, services and solutions to the highest standards of quality and safety — by investing national resources responsibly, adopting modern technologies and building long-term partnerships that create added value for our clients, our community and our country.",
} as L;

export const values: { icon: IconName; name: L; text: L }[] = [
  {
    icon: "shield",
    name: { ar: "النزاهة والشفافية", en: "Integrity & transparency" },
    text: { ar: "تعاملٌ واضح وصادق مع عملائنا وشركائنا.", en: "Clear, honest dealings with clients and partners." },
  },
  {
    icon: "award",
    name: { ar: "الجودة والإتقان", en: "Quality & excellence" },
    text: { ar: "نتقن ما نقدّمه في كل منتج وخدمة.", en: "Excellence in every product and service." },
  },
  {
    icon: "clock",
    name: { ar: "الالتزام بالمواعيد", en: "Commitment to deadlines" },
    text: { ar: "نحترم الوقت ونسلّم في الموعد.", en: "We respect time and deliver on schedule." },
  },
  {
    icon: "leaf",
    name: { ar: "السلامة والاستدامة", en: "Safety & sustainability" },
    text: { ar: "نحمي فرقنا وبيئتنا في كل مشروع.", en: "Protecting our people and environment." },
  },
  {
    icon: "bulb",
    name: { ar: "الابتكار والتطوير", en: "Innovation & development" },
    text: { ar: "نتبنّى التقنيات والحلول الحديثة.", en: "Embracing modern technology and solutions." },
  },
  {
    icon: "users",
    name: { ar: "الشراكة وخدمة العملاء", en: "Partnership & client focus" },
    text: { ar: "علاقات طويلة الأمد مبنية على الثقة.", en: "Long-term relationships built on trust." },
  },
];

export const goals: L[] = [
  {
    ar: "تطوير قطاع الذهب والتعدين وفق أحدث الأساليب الآمنة والصديقة للبيئة.",
    en: "Develop gold and mining using modern, safe and environmentally responsible methods.",
  },
  {
    ar: "المساهمة في تحقيق الأمن الغذائي عبر مشاريع زراعية وحيوانية حديثة.",
    en: "Contribute to food security through modern agricultural and livestock projects.",
  },
  {
    ar: "نشر حلول الطاقة الشمسية لتوفير طاقة نظيفة ومستدامة بتكلفة مناسبة.",
    en: "Expand solar solutions that deliver clean, sustainable and affordable power.",
  },
  {
    ar: "تنفيذ مشاريع المباني والبنية التحتية بمعايير هندسية عالية.",
    en: "Deliver building and infrastructure projects to high engineering standards.",
  },
  {
    ar: "تعزيز التجارة عبر الاستيراد والتصدير وتوفير السلع والأجهزة بجودة وأسعار منافسة.",
    en: "Strengthen trade by importing and exporting quality goods at competitive prices.",
  },
  {
    ar: "دعم الصناعة الوطنية وخلق فرص عمل للكفاءات السودانية.",
    en: "Support national industry and create jobs for Sudanese talent.",
  },
];

export const whyUs: { icon: IconName; name: L; text: L }[] = [
  {
    icon: "layers",
    name: { ar: "تنوّعٌ وتكامل", en: "Diversity & integration" },
    text: {
      ar: "أنشطة متعددة تحت مظلة واحدة تمنحك حلاً متكاملاً بدل التعامل مع عدة جهات.",
      en: "Many activities under one roof — one integrated solution instead of several suppliers.",
    },
  },
  {
    icon: "compass",
    name: { ar: "معرفةٌ بالسوق", en: "Market knowledge" },
    text: {
      ar: "خبرة عملية في السوق السوداني منذ عام 2017.",
      en: "Hands-on experience in the Sudanese market since 2017.",
    },
  },
  {
    icon: "users",
    name: { ar: "كوادر وشراكات", en: "Talent & partnerships" },
    text: {
      ar: "فرق مؤهلة وشبكة موردين وشركاء موثوقين محلياً ودولياً.",
      en: "Qualified teams and a trusted local and international network.",
    },
  },
  {
    icon: "award",
    name: { ar: "جودةٌ والتزام", en: "Quality & commitment" },
    text: {
      ar: "معايير جودة عالية واحترام صارم للمواعيد.",
      en: "High quality standards and strict respect for deadlines.",
    },
  },
  {
    icon: "tag",
    name: { ar: "أسعارٌ تنافسية", en: "Competitive pricing" },
    text: {
      ar: "حلول مرنة تناسب احتياجات عملائنا وميزانياتهم.",
      en: "Flexible solutions that fit our clients’ needs and budgets.",
    },
  },
  {
    icon: "handshake",
    name: { ar: "مسؤوليةٌ مجتمعية", en: "Social responsibility" },
    text: {
      ar: "نعمل بمسؤولية تجاه المجتمع والبيئة ونستثمر في الكفاءات الوطنية.",
      en: "Responsible toward society and the environment, investing in local talent.",
    },
  },
];

export const processSteps: { icon: IconName; title: L; text: L }[] = [
  {
    icon: "message",
    title: { ar: "استشارة وفهم الاحتياج", en: "Consultation" },
    text: {
      ar: "نستمع إليك ونفهم متطلبات مشروعك وأهدافه وميزانيته.",
      en: "We listen and understand your project’s needs, goals and budget.",
    },
  },
  {
    icon: "ruler",
    title: { ar: "دراسة وتصميم الحل", en: "Study & design" },
    text: {
      ar: "نقدّم دراسة فنية وعرضاً واضحاً بالحل الأنسب والتكلفة والمدة.",
      en: "A technical study and a clear proposal: the right solution, cost and timeline.",
    },
  },
  {
    icon: "wrench",
    title: { ar: "التوريد والتنفيذ", en: "Supply & delivery" },
    text: {
      ar: "ننفّذ بفرقنا وشركائنا وفق معايير الجودة والسلامة والجدول المتفق عليه.",
      en: "Our teams and partners deliver to agreed quality, safety and schedule.",
    },
  },
  {
    icon: "headset",
    title: { ar: "المتابعة والدعم", en: "Follow-up & support" },
    text: {
      ar: "نبقى معك بعد التسليم بالصيانة والدعم الفني وخدمات ما بعد البيع.",
      en: "We stay with you after handover: maintenance, support and after-sales service.",
    },
  },
];

export const integrated: { title: L; text: L; sectors: string[]; image: string }[] = [
  {
    title: { ar: "ري زراعي بالطاقة الشمسية", en: "Solar-powered irrigation" },
    text: {
      ar: "نصمم أنظمة الري ونشغّلها بالطاقة الشمسية لخفض تكلفة الوقود وضمان استمرار الإنتاج.",
      en: "Irrigation systems designed and powered by solar energy — lower fuel costs, steady production.",
    },
    sectors: ["agriculture", "solar-energy"],
    image: "/images/pivot-solar.jpg",
  },
  {
    title: { ar: "من المزرعة إلى المصنع", en: "From farm to factory" },
    text: {
      ar: "نربط الإنتاج الزراعي والحيواني بالتصنيع والتعبئة لرفع القيمة المضافة.",
      en: "Linking crop and livestock production to processing and packaging for more added value.",
    },
    sectors: ["agriculture", "livestock", "manufacturing"],
    image: "/images/manufacturing-2.jpg",
  },
  {
    title: { ar: "توريد متكامل للمشاريع", en: "Complete project supply" },
    text: {
      ar: "نستورد المعدات ومواد البناء والأجهزة الكهربائية ونوصلها إلى مواقع مشاريعك.",
      en: "Importing equipment, building materials and appliances, delivered to your project sites.",
    },
    sectors: ["import-export", "construction", "electrical-appliances"],
    image: "/images/trade-2.jpg",
  },
];
