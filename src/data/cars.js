// src/data/cars.js
// Single source of truth for all car inventory

export const cars = [
  {
    id: "1",
    slug: "porsche-911-carrera-s",
    name: "Porsche 911 Carrera S",
    make: "Porsche",
    year: 2021,
    mileage: 14800,
    price: 119950,
    conditionScore: 9.4,
    status: "available", // available | reserved | sold
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
      "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=800&q=80",
    ],
    specs: {
      engine: "3.0L Twin-Turbo Flat-Six, 450 hp @ 6,500 rpm",
      transmission: "8-Speed PDK Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      topSpeed: "306 km/h",
      acceleration: "3.7s 0–100 km/h",
      fuelType: "Premium Petrol",
      colour: "GT Silver Metallic",
      interior: "Black/Bordeaux Red Full Leather",
    },
    history: {
      owners: 1,
      serviceHistory: "Full Porsche dealer service history. Last service May 2024.",
      condition: "Immaculate. No paint corrections, unmarked alloys, zero incident history.",
      warranty: "12-month mechanical warranty included. Extended plans available.",
    },
    vin: "WP0AB2A99MS242187",
    description: "One of the finest air-cooled-era successors available today. This 992 Carrera S has lived its entire life as a weekend driver — never tracked, never modified. Delivered new by Porsche Centre Johannesburg.",
  },
  {
    id: "2",
    slug: "bmw-m4-competition",
    name: "BMW M4 Competition",
    make: "BMW",
    year: 2022,
    mileage: 22300,
    price: 98500,
    conditionScore: 8.9,
    status: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1622189954776-5f1f0c52def1?w=800&q=80",
      "https://images.unsplash.com/photo-1617814076668-3349ad914c59?w=800&q=80",
    ],
    specs: {
      engine: "3.0L M TwinPower Turbo Inline-Six, 510 hp",
      transmission: "8-Speed M Steptronic",
      drivetrain: "Rear-Wheel Drive",
      topSpeed: "250 km/h (limited)",
      acceleration: "3.9s 0–100 km/h",
      fuelType: "Premium Petrol",
      colour: "Frozen Portimao Blue",
      interior: "Full Merino Leather, Kyalami Orange Stitching",
    },
    history: {
      owners: 1,
      serviceHistory: "Full BMW dealer service history.",
      condition: "Excellent. One minor stone chip on front bumper professionally repaired.",
      warranty: "12-month mechanical warranty included.",
    },
    vin: "WBS43AZ01NCK47831",
    description: "The G82 M4 Competition in Frozen Blue is among the most desirable colour combinations from the factory. This example has the optional M Carbon bucket seats and Carbon fibre interior trim.",
  },
  {
    id: "3",
    slug: "mercedes-amg-gt43",
    name: "Mercedes-AMG GT 43",
    make: "Mercedes-Benz",
    year: 2023,
    mileage: 8600,
    price: 134000,
    conditionScore: 9.8,
    status: "reserved",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    ],
    specs: {
      engine: "3.0L Inline-Six with EQ Boost, 367 hp",
      transmission: "9G-Tronic",
      drivetrain: "All-Wheel Drive",
      topSpeed: "270 km/h",
      acceleration: "4.9s 0–100 km/h",
      fuelType: "Premium Petrol",
      colour: "Obsidian Black",
      interior: "Nappa Leather, Burmester Sound",
    },
    history: {
      owners: 1,
      serviceHistory: "Full Mercedes dealer service history.",
      condition: "As-new. Paint protection film on front.",
      warranty: "12-month warranty. Balance of manufacturer warranty still applies.",
    },
    vin: "WDD2903071A053209",
    description: "Nearly new AMG GT 43 with every factory option ticked. Rear-biased AWD, burmester surround sound, head-up display, and the 21-inch AMG Night Package wheels. A car that does everything.",
  },
  {
    id: "4",
    slug: "audi-rs6-avant",
    name: "Audi RS6 Avant",
    make: "Audi",
    year: 2021,
    mileage: 31200,
    price: 109000,
    conditionScore: 8.7,
    status: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1614026480418-bd11fdb9fa06?w=800&q=80",
      "https://images.unsplash.com/photo-1563694983011-6f4d90358083?w=800&q=80",
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8 with mild hybrid, 600 hp",
      transmission: "8-Speed Tiptronic",
      drivetrain: "Quattro All-Wheel Drive",
      topSpeed: "250 km/h (limited)",
      acceleration: "3.6s 0–100 km/h",
      fuelType: "Premium Petrol",
      colour: "Nardo Grey",
      interior: "Sport Leather in Black / Rock Grey Contrast",
    },
    history: {
      owners: 2,
      serviceHistory: "Full Audi dealer service history.",
      condition: "Very good. Two small scratches on rear sill professionally corrected.",
      warranty: "12-month mechanical warranty.",
    },
    vin: "WAUZZZ4GXMN018821",
    description: "The estate car reimagined as a supercar. Nardo Grey is the definitive RS6 colour — anonymous yet menacing. This example has the Black Edition package with gloss black trim throughout.",
  },
  {
    id: "5",
    slug: "ferrari-california-t",
    name: "Ferrari California T",
    make: "Ferrari",
    year: 2019,
    mileage: 9400,
    price: 189000,
    conditionScore: 9.2,
    status: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80",
      "https://images.unsplash.com/photo-1610208897001-0e3b13b9c4d5?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    ],
    specs: {
      engine: "3.9L Twin-Turbo V8, 560 hp",
      transmission: "7-Speed F1 Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      topSpeed: "316 km/h",
      acceleration: "3.6s 0–100 km/h",
      fuelType: "Premium Petrol",
      colour: "Rosso Corsa",
      interior: "Beige/Black Leather with Prancing Horse headrests",
    },
    history: {
      owners: 1,
      serviceHistory: "Full Ferrari dealer service history. Serviced 2024.",
      condition: "Immaculate. Lifters installed. No modifications.",
      warranty: "12-month mechanical warranty. Ferrari Approved Programme eligible.",
    },
    vin: "ZFF77XJAXK0234892",
    description: "The grand tourer's grand tourer. Fewer than 10,000km and zero compromise. This California T wears Rosso Corsa over beige — the timeless combination. Hard-top convertible for year-round usability.",
  },
  {
    id: "6",
    slug: "range-rover-sport-svr",
    name: "Range Rover Sport SVR",
    make: "Land Rover",
    year: 2022,
    mileage: 19700,
    price: 142500,
    conditionScore: 9.0,
    status: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    ],
    specs: {
      engine: "5.0L Supercharged V8, 575 hp",
      transmission: "8-Speed Automatic",
      drivetrain: "All-Wheel Drive",
      topSpeed: "280 km/h",
      acceleration: "4.5s 0–100 km/h",
      fuelType: "Premium Petrol",
      colour: "Santorini Black",
      interior: "SVR Perforated Suedecloth/Leather, 23-Speaker Meridian",
    },
    history: {
      owners: 1,
      serviceHistory: "Full Land Rover dealer service history.",
      condition: "Excellent. Minor alloy kerbing on one wheel, professionally repaired.",
      warranty: "12-month mechanical warranty.",
    },
    vin: "SALLMMAU7NMA08413",
    description: "The SVR turns the Sport into something genuinely special. 575hp, a supercharged V8 soundtrack, and the ride height to tackle anything. Santorini Black is the least-spotted and most imposing finish.",
  },
];

// Spec blocks for the gauge / sticky panel sections
export const specBlocks = [
  {
    id: "engine",
    gauge: 0, // which gauge is active (0 = mileage, 1 = year, 2 = condition)
    label: "01 / Powertrain",
    title: "Engine & Drive",
    key: "engine",
  },
  {
    id: "interior",
    gauge: 2,
    label: "02 / Interior",
    title: "Cabin & Comfort",
    key: "interior",
  },
  {
    id: "history",
    gauge: 1,
    label: "03 / History",
    title: "Provenance",
    key: "history",
  },
  {
    id: "warranty",
    gauge: 2,
    label: "04 / Warranty",
    title: "Coverage",
    key: "warranty",
  },
];

export function getCarById(id) {
  return cars.find(c => c.id === id);
}

export function getRelatedCars(id, count = 3) {
  return cars.filter(c => c.id !== id).slice(0, count);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(km) {
  return new Intl.NumberFormat('en-ZA').format(km) + ' km';
}
