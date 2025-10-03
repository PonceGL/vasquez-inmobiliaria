export const mockDataOther = {
  propertyType: "otro" as const,
  title: "Cabaña",
  description:
    "Lorem Ipsum es simplemente el texto de relleno de las imprentas",
  price: {
    value: 546500,
    currency: "MXN",
  },
  transactionType: "venta" as const,
  location: {
    coordinates: [-98.275, 19.0185],
    address: "Blvd. de las Cascadas 789, Parque Querétaro, Cascatta",
    city: "San Andrés Cholula",
    state: "Puebla",
    zipCode: "72830",
  },
  mainImage: "68d700497e5a6e478f0984d8",
  images: [
    "68d700527e5a6e478f0984da",
    "68d7005b7e5a6e478f0984dc",
    "68d700657e5a6e478f0984de",
  ],
  plotSize: 5000,
  frontageMeters: 25,
  depthMeters: 20,
  topography: "irregular" as const,
  hasServices: false,
  agent: "68d6feed7e5a6e478f0984be",
  status: "active" as const,
};

export const mockCreateOtherDTO = {
  title: "Cabaña",
  description:
    "Lorem Ipsum es simplemente el texto de relleno de las imprentas",
  price: { value: 546500, currency: "MXN" },
  transactionType: "venta" as const,
  location: {
    coordinates: [-98.275, 19.0185],
    address: "Blvd. de las Cascadas 789, Parque Querétaro, Cascatta",
    city: "San Andrés Cholula",
    state: "Puebla",
    zipCode: "72830",
  },
  mainImage: "68d700497e5a6e478f0984d8",
  images: [
    "68d700527e5a6e478f0984da",
    "68d7005b7e5a6e478f0984dc",
    "68d700657e5a6e478f0984de",
  ],
  agent: "68d6feed7e5a6e478f0984be",
  status: "active" as const,
  draft: true,
  hidePrice: false,
  propertyType: "otro" as const,
  frontageMeters: 25,
  depthMeters: 20,
  topography: "irregular" as const,
  hasServices: false,
  plotSize: 5000,
};
