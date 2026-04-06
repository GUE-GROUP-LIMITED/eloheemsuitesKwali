export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  images: string[];
}

export const rooms: Room[] = [
  {
    "id": "royal-room",
    "name": "Events Hall",
    "type": "EVENT_SPACE",
    "price": 0,
    "description": "A versatile event space for all occasions. Pricing available on request.",
    "images": [
      "/images/conference_hall.jpeg",
      "/images/conference_hall2.jpeg",
      "/images/conference_hall3.jpeg"
    ]
  },
  {
    "id": "queens-kings-room",
    "name": "Queens & Kings Room",
    "type": "QUEENS_KINGS",
    "price": 35000,
    "description": "Spacious and elegant, perfect for couples. Rate: ₦35,000 (Total with VAT).",
    "images": [
      "/images/Kings&Queens_special/kings-queens-1.jpeg",
      "/images/Kings&Queens_special/kings-queens-2.jpeg",
      "/images/Kings&Queens_special/kings-queens-3.jpeg",
      "/images/Kings&Queens_special/kings-queens-4.jpeg"
    ]
  },
  {
    "id": "executive-luxury-room",
    "name": "Executive Luxury Suite",
    "type": "EXECUTIVE_LUXURY",
    "price": 38000,
    "description": "Ultimate luxury with premium features. Rate: ₦38,000 (Total with VAT).",
    "images": [
      "/images/executive_suites_images/executive-suite-1.jpeg",
      "/images/executive_suites_images/executive-suite-2.jpeg",
      "/images/executive_suites_images/executive-suite-3.jpeg",
      "/images/executive_suites_images/executive-suite-4.jpeg",
      "/images/executive_suites_images/executive-suite-5.jpeg"
    ]
  },
  {
    "id": "golden-hall",
    "name": "Golden Hall",
    "type": "GOLDEN_HALL",
    "price": 107500,
    "description": "Host events for 40-70 guests. Rental: ₦107,500 (with VAT).",
    "images": [
      "/images/conference_hall.jpeg",
      "/images/conference_hall2.jpeg",
      "/images/conference_hall3.jpeg"
    ]
  },
  {
    "id": "reception-ground",
    "name": "Reception Ground",
    "type": "RECEPTION_GROUND",
    "price": 161250,
    "description": "Ideal for large gatherings of 500-800. Rental: ₦161,250 (with VAT).",
    "images": [
      "/images/reception.jpeg",
      "/images/conference_hall.jpeg",
      "/images/conference_hall2.jpeg"
    ]
  }
];
