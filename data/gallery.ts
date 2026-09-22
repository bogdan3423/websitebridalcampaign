const portfolioSelection = [
  {
    filename: "rochie-mireasa-satin-pe-trepte",
    alt: "Modelă brunetă purtând o rochie de mireasă din satin, așezată pe trepte",
  },
  {
    filename: "portret-modela-blonda-editorial",
    alt: "Portret editorial al unei modele blonde într-un interior elegant",
  },
  {
    filename: "modela-bruneta-voal-editorial",
    alt: "Portret al unei modele brunete purtând voal și rochie de mireasă",
  },
  {
    filename: "rochie-mireasa-vazuta-din-spate",
    alt: "Modelă brunetă prezentând din spate o rochie de mireasă lungă",
  },
  {
    filename: "rochie-mireasa-interior-clasic",
    alt: "Modelă blondă prezentând o rochie de mireasă într-un interior clasic",
  },
  {
    filename: "modela-rochie-mireasa-voal-trepte",
    alt: "Modelă brunetă cu voal lung fotografiată pe treptele unui interior elegant",
  },
] as const;

export const gallery = portfolioSelection.map((photo, index) => ({
  src: `/images/portfolio/${photo.filename}.webp`,
  alt: photo.alt,
  label: `${String(index + 1).padStart(2, "0")} / Portofoliu`,
  className: "gallery-tall",
}));

export const heroImage = {
  src: "/images/portfolio/model-rochie-mireasa-satin-editorial.webp",
  alt: "Modelă brunetă într-o rochie de mireasă din satin, fotografiată pe trepte",
};

export const heroSecondaryImage = {
  src: "/images/portfolio/modela-rochie-alba-manusi-editorial.webp",
  alt: "Modelă blondă într-o rochie albă și mănuși, fotografiată într-un interior elegant",
};

// Nouă poziții pentru previzualizarea feedului, bazate pe selecția de mai sus.
export const feedImages = [0, 1, 2, 3, 4, 5, 0, 2, 4] as const;
