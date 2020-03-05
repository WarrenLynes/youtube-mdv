export interface Photo {
  id: string;
  productUrl?: string;
  baseUrl?: string;
  mimeType?: string;
  mediaMetadata?: { creationTime: string; width: string; height: string; photo: any;};
  creationTime?: string;
  width?: string;
  height?: string;
  photo?: any;
  filename?: string;
}

export const emptyPhoto = {
  id: "",
  productUrl: "",
  baseUrl: "",
  mimeType: "",
  creationTime: "",
  width: "",
  height: "",
  photo: {},
  filename: "",
};
