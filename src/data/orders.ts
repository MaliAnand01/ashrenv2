export type WhatsAppOrderStatus =
  | "NEW"
  | "CONTACTED"
  | "CONFIRMED"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";

export interface WhatsAppOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: WhatsAppOrderStatus;
  createdAt: string;
  notes?: string;
  wholesaleIntent?: boolean;
}

export const INITIAL_WHATSAPP_ORDERS: WhatsAppOrder[] = [
  {
    id: "ord-101",
    orderNumber: "WA-84920",
    customerName: "Kabir Singhania",
    phone: "+91 98201 45821",
    city: "Mumbai, MH",
    productId: "prod-01",
    productName: "ASHREN Phantom 4K Ultra-Gimbal Drone",
    productSku: "ASH-DRN-4K90",
    quantity: 12,
    unitPrice: 38500,
    totalAmount: 462000,
    status: "NEW",
    createdAt: "10 mins ago",
    notes: "Wholesale inquiry for film production studio equipment batch.",
    wholesaleIntent: true,
  },
  {
    id: "ord-102",
    orderNumber: "WA-84919",
    customerName: "Ananya Deshmukh",
    phone: "+91 97112 88402",
    city: "Jaipur, RJ",
    productId: "prod-05",
    productName: "ASHREN Royal Heritage 22K Kundan Choker",
    productSku: "ASH-JWL-ROY7",
    quantity: 2,
    unitPrice: 155000,
    totalAmount: 310000,
    status: "CONTACTED",
    createdAt: "35 mins ago",
    notes: "Bridal trousseau showroom reservation with hallmarking paperwork.",
    wholesaleIntent: true,
  },
  {
    id: "ord-103",
    orderNumber: "WA-84918",
    customerName: "Aditya Verma",
    phone: "+91 99882 14320",
    city: "Bengaluru, KA",
    productId: "prod-02",
    productName: "ASHREN Titan-Pro Wireless Hall-Effect Controller",
    productSku: "ASH-CTL-T800",
    quantity: 50,
    unitPrice: 5200,
    totalAmount: 260000,
    status: "CONFIRMED",
    createdAt: "2 hours ago",
    notes: "Esports tournament lounge fleet order.",
    wholesaleIntent: true,
  },
  {
    id: "ord-104",
    orderNumber: "WA-84917",
    customerName: "Meenakshi Sundaram",
    phone: "+91 94451 90211",
    city: "Chennai, TN",
    productId: "prod-06",
    productName: "ASHREN Imperial Crimson Silk Anarkali Ensemble",
    productSku: "ASH-CTR-ANR9",
    quantity: 6,
    unitPrice: 48000,
    totalAmount: 288000,
    status: "PROCESSING",
    createdAt: "4 hours ago",
    notes: "High-end boutique stock order for upcoming festive trunk show.",
    wholesaleIntent: true,
  },
  {
    id: "ord-105",
    orderNumber: "WA-84916",
    customerName: "Rohan Kapoor",
    phone: "+91 98114 62109",
    city: "New Delhi, DL",
    productId: "prod-03",
    productName: "ASHREN Apex Studio Hybrid ANC Headphones",
    productSku: "ASH-AUD-APX1",
    quantity: 20,
    unitPrice: 13900,
    totalAmount: 278000,
    status: "COMPLETED",
    createdAt: "Yesterday",
    notes: "Dispatch confirmed via BlueDart Priority Cargo.",
    wholesaleIntent: true,
  },
  {
    id: "ord-106",
    orderNumber: "WA-84915",
    customerName: "Sanjay Patel",
    phone: "+91 98250 77123",
    city: "Ahmedabad, GJ",
    productId: "prod-07",
    productName: "ASHREN Matrix 4K Dual-Screen Action Camera",
    productSku: "ASH-CAM-MTX4",
    quantity: 15,
    unitPrice: 16500,
    totalAmount: 247500,
    status: "COMPLETED",
    createdAt: "2 days ago",
    notes: "Payment settled via RTGS. Invoice sent.",
    wholesaleIntent: true,
  },
];
