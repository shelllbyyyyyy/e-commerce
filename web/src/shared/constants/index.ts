export interface IReview {
  rating: string;
  name: string;
  comment: string;
}

export const reviews: IReview[] = [
  {
    rating: "⭐⭐⭐⭐⭐",
    name: "Sarah. M ✅",
    comment: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
  },
  {
    rating: "⭐⭐⭐⭐⭐",
    name: "Alex. K ✅",
    comment: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”`,
  },
  {
    rating: "⭐⭐⭐⭐⭐",
    name: "James. L ✅",
    comment: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”`,
  },
];

export interface IFooter {
  title: string;
  link1: string;
  href1: string;
  link2: string;
  href2: string;
  link3: string;
  href3: string;
  link4: string;
  href4: string;
}

export const footers: IFooter[] = [
  {
    title: "COMPANY",
    link1: "About",
    href1: "/about",
    link2: "Feature",
    href2: "/feature",
    link3: "Works",
    href3: "/works",
    link4: "Carrer",
    href4: "/carrer",
  },
  {
    title: "HELP",
    link1: "Customer Support",
    href1: "/customer-support",
    link2: "Delivery Details",
    href2: "/delivery-details",
    link3: "Terms & Conditions",
    href3: "/terms-&-conditions",
    link4: "Privacy Policy",
    href4: "/privacy-policy",
  },
  {
    title: "FAQ",
    link1: "Account",
    href1: "/account",
    link2: "Manage Deliveries",
    href2: "/manage-deliveies",
    link3: "Orders",
    href3: "/orders",
    link4: "Payments",
    href4: "/payments",
  },
  {
    title: "RESOURCES",
    link1: "Free eBooks",
    href1: "/free-ebooks",
    link2: "Development Tutorial",
    href2: "/development-tutorial",
    link3: "How to Blog",
    href3: "/how-to-blog",
    link4: "youtube Plyalist",
    href4: "/youtube-playlist",
  },
];

export interface IBadge {
  imageUrl: string;
}

export const badges: IBadge[] = [
  {
    imageUrl: "/assets/badge/visa.svg",
  },
  {
    imageUrl: "/assets/badge/mastercard.svg",
  },
  {
    imageUrl: "/assets/badge/paypal.svg",
  },
  {
    imageUrl: "/assets/badge/ipay.svg",
  },
  {
    imageUrl: "/assets/badge/gpay.svg",
  },
];
