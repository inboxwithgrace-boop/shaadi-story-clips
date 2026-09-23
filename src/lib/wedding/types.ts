export type PhotoSlotId =
  | "bride"
  | "groom"
  | "couple1"
  | "couple2"
  | "family"
  | string;

export interface WeddingPhoto {
  id: PhotoSlotId;
  label: string;
  dataUrl: string;
}

export type PackageId = "standard" | "premium";

export type OrderStatus =
  | "Pending"
  | "Payment Pending"
  | "Paid"
  | "Rendering"
  | "Ready"
  | "Delivered";

export const ORDER_STATUSES: OrderStatus[] = [
  "Pending",
  "Payment Pending",
  "Paid",
  "Rendering",
  "Ready",
  "Delivered",
];

export interface WeddingProject {
  id: string;
  orderId?: string;
  customerName?: string;
  brideName: string;
  groomName: string;
  brideNickname?: string;
  groomNickname?: string;
  weddingDate: string;
  weddingTime?: string;
  venue: string;
  city: string;
  hashtag?: string;
  brideParents?: string;
  groomParents?: string;
  otherFamily?: string;
  story: {
    howWeMet?: string;
    ourStory?: string;
    specialMessage?: string;
  };
  photos: WeddingPhoto[];
  music: string;
  template: string;
  package: PackageId;
  orderStatus: OrderStatus;
  /** Mock rendering state — no real MP4 exists until a render backend is connected. */
  render: {
    state: "not_started" | "queued" | "rendering" | "ready" | "failed";
    videoUrl: string | null;
  };
  createdAt: string;
  isDemo?: boolean;
}

export interface PackageDef {
  id: PackageId;
  name: string;
  price: number;
  maxPhotos: number;
  features: string[];
}

export const PACKAGES: PackageDef[] = [
  {
    id: "standard",
    name: "Standard",
    price: 499,
    maxPhotos: 6,
    features: [
      "1 wedding video template",
      "Up to 6 photos",
      "Names and wedding details",
      "Background music",
      "HD video",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    maxPhotos: 12,
    features: [
      "Premium template",
      "Up to 12 photos",
      "Couple story",
      "Family details",
      "Premium animations",
      "HD video",
    ],
  },
];

export const getPackage = (id: PackageId): PackageDef =>
  PACKAGES.find((p) => p.id === id) ?? (PACKAGES[0] as PackageDef);
