export const mockCreateImageDto = {
  alt: "A beautiful landscape",
  asset_id: "asset_123456",
  public_id: "public_456789",
  folder: "test_folder/landscapes",
  url: "http://res.cloudinary.com/test/image/fetch/landscapes/test.jpg",
  width: 800,
  height: 600,
};

export const mockCreateImageFromFormDataDto = {
  file: new File(["image content"], "test-image.jpg", { type: "image/jpeg" }),
  alt: "A beautiful landscape",
  folder: "landscapes",
};

export const mockCloudinaryResponse = {
  asset_id: "asset_123456",
  public_id: "public_456789",
  folder: "test_folder/landscapes",
  url: "http://res.cloudinary.com/test/image/fetch/landscapes/test.jpg",
  width: 800,
  height: 600,
};

export const mockUpdateImageDto = {
  alt: "Updated beautiful landscape",
};

export const mockZodImageError = [
  {
    code: "invalid_type" as const,
    path: ["file"],
    message: "El archivo es requerido.",
  },
  {
    code: "too_small" as const,
    path: ["alt"],
    message: "El texto alternativo es requerido.",
  },
];
