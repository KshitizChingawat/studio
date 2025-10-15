
export const campuses = [
  { id: 'medi-caps', name: 'Medi-Caps University', emailPlaceholder: 'student@medicaps.ac.in' },
  { id: 'ips', name: 'IPS University', emailPlaceholder: 'student@ips.in' },
  { id: 'acropolis', name: 'Acropolis University', emailPlaceholder: 'student@acropolis.in' },
  { id: 'sage', name: 'Sage University', emailPlaceholder: 'student@sage.in' },
];

export const vendors = [
  { id: 'vendor-1', name: 'Food Court', campusId: 'uni-1', cuisine: 'American', imageId: 'vendor-1' },
  { id: 'vendor-2', name: 'Canteen', campusId: 'uni-1', cuisine: 'Italian', imageId: 'vendor-2' },
  { id: 'vendor-3', name: 'Mintoo', campusId: 'uni-1', cuisine: 'Healthy', imageId: 'vendor-3' },
  { id: 'vendor-4', name: 'CSB', campusId: 'uni-2', cuisine: 'Cafe', imageId: 'vendor-4' },
];

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  description: string;
};

export const menuItems: Record<string, MenuItem[]> = {
  'vendor-1': [
    { id: 'item-1', name: 'Classic Burger', price: 8.99, imageId: 'menu-burger', description: "A juicy beef patty with cheese, lettuce, tomato, and our special sauce." },
    { id: 'item-2', name: 'Fries', price: 3.49, imageId: 'menu-fries', description: "Crispy golden fries, lightly salted." },
    { id: 'item-3', name: 'Chocolate Shake', price: 4.99, imageId: 'menu-shake', description: "A rich and creamy chocolate milkshake." },
  ],
  'vendor-2': [
    { id: 'item-4', name: 'Pepperoni Slice', price: 4.50, imageId: 'menu-pizza', description: "A classic slice with zesty pepperoni and mozzarella." },
    { id: 'item-5', name: 'Cheese Slice', price: 4.00, imageId: 'menu-pizza', description: "A simple, delicious slice with our signature cheese blend." },
    { id: 'item-6', name: 'Garlic Knots', price: 5.00, imageId: 'menu-knots', description: "Warm, buttery garlic knots served with marinara sauce." },
  ],
   'vendor-3': [
    { id: 'item-7', name: 'Caesar Salad', price: 9.50, imageId: 'menu-salad', description: "Crisp romaine, parmesan, croutons, and Caesar dressing." },
    { id: 'item-8', name: 'Chicken Wrap', price: 10.50, imageId: 'menu-wrap', description: "Grilled chicken, lettuce, tomato, and ranch in a flour tortilla." },
  ],
   'vendor-4': [
    { id: 'item-9', name: 'Iced Latte', price: 4.75, imageId: 'menu-coffee', description: "Chilled espresso with milk, served over ice." },
    { id: 'item-10', name: 'Blueberry Muffin', price: 3.25, imageId: 'menu-muffin', description: "A fluffy muffin bursting with fresh blueberries." },
  ],
};


export const kdsOrders = {
  "10:30 AM": {
    orderId: "A1B2",
    status: "In Progress",
    items: [
      { name: "Classic Burger", quantity: 2 },
      { name: "Fries", quantity: 1 },
      { name: "Chocolate Shake", quantity: 1 },
    ],
  },
  "10:45 AM": {
    orderId: "C3D4",
    status: "Pending",
    items: [
      { name: "Pepperoni Slice", quantity: 4 },
      { name: "Garlic Knots", quantity: 2 },
    ],
  },
   "11:00 AM": {
    orderId: "E5F6",
    status: "Pending",
    items: [
      { name: "Caesar Salad", quantity: 1 },
      { name: "Classic Burger", quantity: 1 },
      { name: "Fries", quantity: 1 },
    ]
  }
};
