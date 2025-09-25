export interface ImagesUpload {
  file: File;
  folder: string;
}

export interface ImagesByFolderSucces {
  resources: Images[];
}

export interface Images {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  access_mode: string;
  url: string;
  secure_url: string;
}

export interface UploadImageSucces {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  image_metadata: ImageMetadata;
  illustration_score: number;
  semi_transparent: boolean;
  grayscale: boolean;
  quality_analysis: QualityAnalysis;
  original_filename: string;
}

export interface ImageMetadata {
  XResolution: string;
  YResolution: string;
  ResolutionUnit: string;
  UserComment: string;
  ExifImageWidth: string;
  ExifImageHeight: string;
  XMPToolkit: string;
  PixelsPerUnitX: string;
  PixelsPerUnitY: string;
  PixelUnits: string;
  ProfileDescription: string;
  Colorspace: string;
  DPI: string;
}

export interface QualityAnalysis {
  focus: number;
}
