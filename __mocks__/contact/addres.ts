export const mockCreateAddress = {
  name: "Test Address",
  street: "Test Street",
  exteriorNumber: "123",
  neighborhood: "Test Neighborhood",
  postalCode: "00000",
  municipality: "Test Municipality",
  state: "Test State",
  country: "Test Country",
  location: {
    coordinates: [-98.0, 19.0] as number[],
  },
};

export const mockAddress = {
  _id: "test-id-123",
  name: "Test Address",
  street: "Test Street",
  exteriorNumber: "123",
  neighborhood: "Test Neighborhood",
  postalCode: "00000",
  municipality: "Test Municipality",
  state: "Test State",
  country: "Test Country",
  location: {
    coordinates: [-98.0, 19.0],
  },
  isMain: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

export const mockCreateAddressDto = {
  name: mockAddress.name,
  street: mockAddress.street,
  exteriorNumber: mockAddress.exteriorNumber,
  neighborhood: mockAddress.neighborhood,
  postalCode: mockAddress.postalCode,
  municipality: mockAddress.municipality,
  state: mockAddress.state,
  country: mockAddress.country,
  location: { coordinates: mockAddress.location.coordinates },
};

export const mockUpdateAddressDto = {
  location: { coordinates: [-98.275, 19.0185] },
  _id: "68e40714e7ac50b32225a17d",
  name: "Principal",
  street: "Carretera Xalapa-Veracruz",
  exteriorNumber: "345 B",
  neighborhood: "El Lencero",
  postalCode: "91640",
  municipality: "Emiliano Zapata",
  state: "Veracruz",
  country: "México",
  isMain: false,
  createdAt: "2025-10-06T18:14:44.940Z",
  updatedAt: "2025-10-06T18:32:20.582Z",
  __v: 0,
};