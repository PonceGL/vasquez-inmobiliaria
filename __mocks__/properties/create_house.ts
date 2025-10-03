export const mockDataHouse = {
  propertyType: "casa" as const,
  title: "Casa PARMA 4A",
  description:
    "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
  price: { value: 253560, currency: "MXN" },
  transactionType: "venta" as const,
  location: {
    coordinates: [-98.112986, 19.047353],
    address: "Girasol, Bugambilias, 72993 Casa Blanca, Pue.",
    city: "Puebla",
    state: "Puebla",
    zipCode: "72993",
  },
  mainImage: "68d7001f7e5a6e478f0984d0",
  images: [
    "68d700297e5a6e478f0984d2",
    "68d700317e5a6e478f0984d4",
    "68d7003d7e5a6e478f0984d6",
  ],
  agent: "68d6feed7e5a6e478f0984be",
  floors: 2,
  bedrooms: 2,
  bathrooms: 1,
  garageSpaces: 1,
  constructionSqMeters: 120,
  status: "active" as const,
  preservation: "nueva" as const,
};

export const mockCreatePropertyDto = {
  title: "Casa PARMA 4A",
  description:
    "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
  price: { value: 253560, currency: "MXN" },
  transactionType: "venta",
  location: {
    coordinates: [-98.112986, 19.047353],
    address: "Girasol, Bugambilias, 72993 Casa Blanca, Pue.",
    city: "Puebla",
    state: "Puebla",
    zipCode: "72993",
  },
  mainImage: "68d7001f7e5a6e478f0984d0",
  images: [
    "68d700297e5a6e478f0984d2",
    "68d700317e5a6e478f0984d4",
    "68d7003d7e5a6e478f0984d6",
  ],
  agent: "68d6feed7e5a6e478f0984be",
  status: "active",
  draft: true,
  hidePrice: false,
  propertyType: "casa",
  constructionSqMeters: 120,
  floors: 2,
  bedrooms: 2,
  bathrooms: 1,
  garageSpaces: 1,
  features: [],
  preservation: "nueva",
  age: 0,
  plotSize: 0,
};

export const mockGetUSerById = (id: string) => {
  return {
    _id: id,
    name: "PonceGL",
    email: "ponce@dev.com",
    role: "admin",
    verified: true,
    createdAt: "2025-09-26T21:00:29.392Z",
    updatedAt: "2025-09-26T21:00:29.392Z",
    __v: 0,
  };
};

export const mockGetImageById = (id: string) => {
  return {
    _id: id,
    url: "http://res.cloudinary.com/duibtuerj/image/upload/v1758920734/dev-vasquez-inmobiliaria/home-2/ovfp6qfbcsmuh611u509.png",
    asset_id: "e77dc925e92e3adcd5a38d5b002e0b5b",
    public_id: "dev-vasquez-inmobiliaria/home-2/ovfp6qfbcsmuh611u509",
    folder: "dev-vasquez-inmobiliaria/home-2",
    alt: "descripcion de la imagen 5",
    width: 788,
    height: 616,
    createdAt: "2025-09-26T21:05:35.969Z",
    updatedAt: "2025-09-26T21:05:35.969Z",
    __v: 0,
  };
};

export const mockZodError = [
  {
    code: "invalid_value" as const,
    values: ["venta", "renta"],
    path: ["transactionType"],
    message: 'Invalid option: expected one of "venta"|"renta"',
  },
  {
    expected: "object" as const,
    code: "invalid_type" as const,
    path: ["location"],
    message: "Invalid input: expected object, received undefined",
  },
  {
    expected: "string" as const,
    code: "invalid_type" as const,
    path: ["mainImage"],
    message: "El ID de la imagen principal no es válida.",
  },
  {
    expected: "array" as const,
    code: "invalid_type" as const,
    path: ["images"],
    message: "Invalid input: expected array, received undefined",
  },
  {
    expected: "string" as const,
    code: "invalid_type" as const,
    path: ["agent"],
    message: "Invalid input: expected string, received undefined",
  },
  {
    code: "invalid_value" as const,
    values: ["active", "process", "sold"],
    path: ["status"],
    message: 'Invalid option: expected one of "active"|"process"|"sold"',
  },
  {
    expected: "number" as const,
    code: "invalid_type" as const,
    path: ["constructionSqMeters"],
    message: "Invalid input: expected number, received undefined",
  },
  {
    expected: "number" as const,
    code: "invalid_type" as const,
    path: ["floors"],
    message: "Invalid input: expected number, received undefined",
  },
  {
    expected: "number" as const,
    code: "invalid_type" as const,
    path: ["bedrooms"],
    message: "Invalid input: expected number, received undefined",
  },
  {
    expected: "number" as const,
    code: "invalid_type" as const,
    path: ["bathrooms"],
    message: "Invalid input: expected number, received undefined",
  },
  {
    expected: "string" as const,
    code: "invalid_type" as const,
    path: ["preservation"],
    message: "Invalid input: expected string, received undefined",
  },
];
