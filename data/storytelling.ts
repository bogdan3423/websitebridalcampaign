export type StoryMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  position?: string;
};

export type StoryStep = {
  title: string;
  copy: string;
  media: StoryMedia;
};

export type StoryChapterData = {
  id: string;
  number: string;
  label: string;
  title: [string, string];
  intro: string;
  closing: [string, string];
  tone: "light" | "dark";
  visualMode: "editorial" | "vertical";
  steps: readonly StoryStep[];
};

const portfolio = (filename: string) =>
  `/images/portfolio/${filename}.webp`;

export const photoStory: StoryChapterData = {
  id: "photo",
  number: "01",
  label: "Photo",
  title: ["Tu alegi rochiile.", "Noi construim imaginea."],
  intro:
    "Selectăm modelele din showroom pe care vrei să le promovăm și organizăm producția în jurul lor.",
  closing: [
    "Salonul nu trebuie să coordoneze mai mulți furnizori.",
    "Noi venim cu echipa completă.",
  ],
  tone: "light",
  visualMode: "editorial",
  steps: [
    {
      title: "Model",
      copy: "Venim cu modelul potrivit pentru colecție.",
      media: {
        type: "image",
        src: portfolio("IRI_4834"),
        alt: "Modelă brunetă într-o rochie de mireasă din satin, fotografiată pe trepte",
        position: "center 28%",
      },
    },
    {
      title: "Makeup",
      copy: "Venim cu makeup artist și construim look-ul în jurul rochiilor alese.",
      media: {
        type: "image",
        src: portfolio("IRI_4994"),
        alt: "Portret editorial al unei modele blonde într-un interior elegant",
        position: "center 22%",
      },
    },
    {
      title: "Hair",
      copy: "Venim cu hairstylist și păstrăm aceeași direcție vizuală pe întreaga producție.",
      media: {
        type: "image",
        src: portfolio("paulabridal-41"),
        alt: "Portret al unei modele brunete purtând voal și rochie de mireasă",
        position: "center 20%",
      },
    },
    {
      title: "Studio sau locație",
      copy: "Coordonăm shooting-ul în studio sau într-o locație potrivită conceptului.",
      media: {
        type: "image",
        src: portfolio("IRI_5372"),
        alt: "Modelă blondă prezentând o rochie de mireasă într-un interior clasic",
        position: "center 26%",
      },
    },
    {
      title: "Fotografie editorială",
      copy: "Facem cadre principale, full-body, spate, trenă, corset, material și close-up-uri.",
      media: {
        type: "image",
        src: portfolio("IRI_4993"),
        alt: "Modelă brunetă prezentând din spate o rochie de mireasă lungă",
        position: "center 24%",
      },
    },
  ],
};

export const videoStory: StoryChapterData = {
  id: "video",
  number: "02",
  label: "Marketing video",
  title: ["Nu facem doar Reels.", "Construim formate care au un rol."],
  intro:
    "Fiecare tip de video prezintă colecția dintr-un unghi diferit: imagine, educare, engagement sau programare.",
  closing: ["Un singur shooting.", "Mai multe tipuri de conținut."],
  tone: "dark",
  visualMode: "vertical",
  steps: [
    {
      title: "Presenter",
      copy: "Actorul, consultantul sau owner-ul prezintă colecția și răspunde întrebărilor pe care miresele le au înainte de probă.",
      media: { type: "image", src: portfolio("IRI_4994"), alt: "Cadru editorial potrivit pentru un video cu prezentator", position: "center 20%" },
    },
    {
      title: "Model + rochie",
      copy: "Cadre cinematice cu modelul purtând rochia: mers, mișcare, voal și cadre principale.",
      media: { type: "image", src: portfolio("IRI_4834"), alt: "Modelă purtând o rochie de mireasă din satin în mișcare", position: "center 28%" },
    },
    {
      title: "Detail",
      copy: "Corset, dantelă, trenă, broderii, texturi și detalii care nu se văd într-un cadru general.",
      media: { type: "image", src: portfolio("IRI_4750"), alt: "Detaliu editorial al unei rochii de mireasă din satin", position: "center 32%" },
    },
    {
      title: "Educational",
      copy: "Sfaturi pentru mirese, diferențe între croieli și conținut care poziționează salonul ca expert.",
      media: { type: "image", src: portfolio("paulabridal-41"), alt: "Portret bridal pentru un format video educațional", position: "center 20%" },
    },
    {
      title: "Showroom / location",
      copy: "Prezentăm atmosfera salonului sau a locației, nu doar rochia.",
      media: { type: "image", src: portfolio("IRI_5372"), alt: "Rochie de mireasă prezentată într-un interior clasic", position: "center 26%" },
    },
    {
      title: "Comparison",
      copy: "Rochia A sau B, princess sau mermaid, satin sau dantelă.",
      media: { type: "image", src: portfolio("IRI_4993"), alt: "Cadru din spate pentru compararea detaliilor unei rochii", position: "center 24%" },
    },
    {
      title: "Trend / social-first",
      copy: "POV, tranziții și formate construite pentru social media.",
      media: { type: "image", src: portfolio("paulabridal-35"), alt: "Cadru bridal dinamic potrivit pentru social media", position: "center 24%" },
    },
    {
      title: "Sales / CTA",
      copy: "Colecții noi, disponibilitate și invitații către programarea unei probe.",
      media: { type: "image", src: portfolio("IRI_4834"), alt: "Cadru principal de campanie pentru promovarea unei colecții", position: "center 28%" },
    },
    {
      title: "BTS",
      copy: "Makeup, hair, pregătirea modelului și atmosfera din ziua producției.",
      media: { type: "image", src: portfolio("paulabridal-41"), alt: "Portret bridal din pregătirea unei producții", position: "center 20%" },
    },
  ],
};

export const socialFormats = [
  ["Reel", "Rochia în mișcare și formate verticale care opresc scroll-ul."],
  ["Carousel", "O poveste vizuală construită din mai multe cadre."],
  ["Close-up", "Material, corset, dantelă, broderii și texturi."],
  ["Dress spotlight", "O rochie prezentată clar, din toate unghiurile importante."],
  ["Story", "Cadre rapide, întrebări și invitații către programare."],
  ["BTS", "O privire în culisele zilei de producție."],
  ["Educational", "Sfaturi simple care ajută mireasa să aleagă."],
  ["Sales post", "Colecții noi, disponibilitate și un pas clar către probă."],
] as const;

export const socialWorkflow = [
  ["Captions", "Scriem textele."],
  ["CTA-uri", "Construim mesajele care duc spre programare."],
  ["Programare", "Organizăm calendarul."],
  ["Publicare", "Postăm conținutul."],
  ["Cross-posting", "Adaptăm și distribuim pe Instagram, Facebook și TikTok, unde are sens."],
] as const;

export const editorialSteps = [
  ["Copertă", "Numele salonului și colecția devin începutul editorialului."],
  ["Dress spotlight", "Fiecare rochie primește propriul moment editorial."],
  ["Details", "Close-up-uri cu materialul, corsetul și trena."],
  ["Brand story", "O secțiune simplă despre salon și felul în care își alege colecțiile."],
  ["Call to appointment", "Editorialul se încheie cu o invitație clară către programarea unei probe."],
] as const;
