export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  detailedDescription?: string;
  imageUrl: string;
  images?: string[];
  ingredients?: string[];
}

export const products: Product[] = [
  {
    "id": "boite-3",
    "name": "BOÎTE DE 3",
    "price": 40,
    "description": "Boîte de 3 cookies délicieux.",
    "detailedDescription": "L'assortiment parfait pour une petite pause gourmande. Choisissez 3 de nos cookies artisanaux, cuits à la perfection pour un cœur fondant et des bords croustillants. Idéal à partager (ou à garder pour soi !).",
    "imageUrl": "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
    "images": [
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png"
    ],
    "ingredients": [
      "Farine de blé",
      "Beurre doux",
      "Sucre de canne",
      "Œufs frais",
      "Chocolat noir 70%",
      "Extrait de vanille",
      "Fleur de sel"
    ]
  },
  {
    "id": "boite-6",
    "name": "BOÎTE DE 6",
    "price": 70,
    "description": "Boîte de 6 cookies délicieux.",
    "detailedDescription": "Découvrez notre sélection signature de 6 cookies. Un mélange savoureux pour découvrir l'étendue de notre savoir-faire artisanal. Parfait pour les petites réunions ou les goûters en famille.",
    "imageUrl": "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
    "images": [
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png"
    ],
    "ingredients": [
      "Farine de blé",
      "Beurre doux",
      "Sucre de canne",
      "Œufs frais",
      "Chocolat noir 70%",
      "Extrait de vanille",
      "Fleur de sel",
      "Noisettes torréfiées"
    ]
  },
  {
    "id": "boite-9",
    "name": "BOÎTE DE 9",
    "price": 100,
    "description": "Boîte de 9 cookies délicieux.",
    "detailedDescription": "La boîte de 9 cookies est conçue pour les vrais amateurs. Une boîte généreuse remplie de nos meilleures créations, garantissant des sourires à chaque bouchée.",
    "imageUrl": "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
    "images": [
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png"
    ],
    "ingredients": [
      "Farine de blé",
      "Beurre doux",
      "Sucre de canne",
      "Œufs frais",
      "Chocolat noir 70%",
      "Extrait de vanille",
      "Fleur de sel",
      "Praliné",
      "Éclats de caramel"
    ]
  },
  {
    "id": "boite-12",
    "name": "BOÎTE DE 12",
    "price": 130,
    "description": "Boîte de 12 cookies délicieux.",
    "detailedDescription": "Le summum de la gourmandise ! Notre boîte de 12 cookies offre une expérience complète pour les grands événements, les anniversaires ou tout simplement pour les grands passionnés de nos douceurs.",
    "imageUrl": "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
    "images": [
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png"
    ],
    "ingredients": [
      "Farine de blé",
      "Beurre doux",
      "Sucre de canne",
      "Œufs frais",
      "Chocolat noir 70%",
      "Extrait de vanille",
      "Fleur de sel",
      "Noix de pécan",
      "Pépites de chocolat au lait"
    ]
  },
  {
    "name": "test",
    "price": 555,
    "description": "test",
    "detailedDescription": "test",
    "imageUrl": "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png",
    "images": [
      "https://i.postimg.cc/HkBMKZTZ/Capture-d-e-cran-2026-06-12-a-08-59-34.png"
    ],
    "ingredients": [
      "chocolat",
      "amour"
    ],
    "id": "moon-test"
  }
];
