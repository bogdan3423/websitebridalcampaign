const portfolioSelection = [
  {
    filename: "IRI_4750",
    alt: "Modelă brunetă purtând o rochie de mireasă din satin, așezată pe trepte",
  },
  {
    filename: "IRI_4994",
    alt: "Portret editorial al unei modele blonde într-un interior elegant",
  },
  {
    filename: "paulabridal-41",
    alt: "Portret al unei modele brunete purtând voal și rochie de mireasă",
  },
  {
    filename: "IRI_4993",
    alt: "Modelă brunetă prezentând din spate o rochie de mireasă lungă",
  },
  {
    filename: "IRI_5372",
    alt: "Modelă blondă prezentând o rochie de mireasă într-un interior clasic",
  },
  {
    filename: "paulabridal-35",
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
  src: "/images/portfolio/IRI_4834.webp",
  alt: "Modelă brunetă într-o rochie de mireasă din satin, fotografiată pe trepte",
};

export const heroSecondaryImage = {
  src: "/images/portfolio/IRI_5172.webp",
  alt: "Modelă blondă într-o rochie albă și mănuși, fotografiată într-un interior elegant",
};

// Nouă poziții pentru previzualizarea feedului, bazate pe selecția de mai sus.
export const feedImages = [0, 1, 2, 3, 4, 5, 0, 2, 4] as const;
