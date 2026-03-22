const campuses = [
  { id: "medi-caps", name: "Medi-Caps University", emailPlaceholder: "student@medicaps.ac.in", emailDomain: "medicaps.ac.in" },
  { id: "ips", name: "IPS University", emailPlaceholder: "student@ips.in", emailDomain: "ips.in" },
  { id: "acropolis", name: "Acropolis University", emailPlaceholder: "student@acropolis.in", emailDomain: "acropolis.in" },
  { id: "sage", name: "Sage University", emailPlaceholder: "student@sage.in", emailDomain: "sage.in" }
];

const vendors = [
  { id: "vendor-1", name: "Food Court", campusId: "medi-caps", cuisine: "American", imageId: "vendor-1" },
  { id: "vendor-2", name: "Canteen", campusId: "medi-caps", cuisine: "Italian", imageId: "vendor-2" },
  { id: "vendor-3", name: "Mintoo", campusId: "medi-caps", cuisine: "Healthy", imageId: "vendor-3" }
];

const menuItems = {
  "vendor-1": [
    { id: "item-1", name: "Classic Burger", price: 899, imageId: "menu-burger", description: "A juicy beef patty with cheese, lettuce, tomato, and our special sauce." },
    { id: "item-2", name: "Fries", price: 349, imageId: "menu-fries", description: "Crispy golden fries, lightly salted." },
    { id: "item-3", name: "Chocolate Shake", price: 499, imageId: "menu-shake", description: "A rich and creamy chocolate milkshake." }
  ],
  "vendor-2": [
    { id: "item-4", name: "Pepperoni Slice", price: 450, imageId: "menu-pizza", description: "A classic slice with zesty pepperoni and mozzarella." },
    { id: "item-5", name: "Cheese Slice", price: 400, imageId: "menu-pizza", description: "A simple, delicious slice with our signature cheese blend." },
    { id: "item-6", name: "Garlic Knots", price: 500, imageId: "menu-knots", description: "Warm, buttery garlic knots served with marinara sauce." }
  ],
  "vendor-3": [
    { id: "item-7", name: "Caesar Salad", price: 950, imageId: "menu-salad", description: "Crisp romaine, parmesan, croutons, and Caesar dressing." },
    { id: "item-8", name: "Chicken Wrap", price: 1050, imageId: "menu-wrap", description: "Grilled chicken, lettuce, tomato, and ranch in a flour tortilla." }
  ]
};

const orders = [
  {
    id: "xyz123",
    date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "In Progress",
    total: 1455.8,
    pickupTime: "11:30 AM",
    items: [
      { id: "item-1", name: "Classic Burger", quantity: 1 },
      { id: "item-2", name: "Fries", quantity: 1 }
    ]
  },
  {
    id: "abc789",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "Picked Up",
    total: 950,
    pickupTime: "Yesterday 1:00 PM",
    items: [
      { id: "item-7", name: "Caesar Salad", quantity: 1 }
    ]
  },
  {
    id: "def456",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Picked Up",
    total: 1300,
    pickupTime: "2 days ago 4:15 PM",
    items: [
      { id: "item-4", name: "Pepperoni Slice", quantity: 2 },
      { id: "item-6", name: "Garlic Knots", quantity: 1 }
    ]
  }
];

const kdsOrders = {
  "10:30 AM": {
    orderId: "A1B2",
    status: "In Progress",
    items: [
      { name: "Classic Burger", quantity: 2 },
      { name: "Fries", quantity: 1 },
      { name: "Chocolate Shake", quantity: 1 }
    ]
  },
  "10:45 AM": {
    orderId: "C3D4",
    status: "Pending",
    items: [
      { name: "Pepperoni Slice", quantity: 4 },
      { name: "Garlic Knots", quantity: 2 }
    ]
  },
  "11:00 AM": {
    orderId: "E5F6",
    status: "Pending",
    items: [
      { name: "Caesar Salad", quantity: 1 },
      { name: "Classic Burger", quantity: 1 },
      { name: "Fries", quantity: 1 }
    ]
  }
};

const vendorDashboard = {
  stats: [
    { title: "Today's Revenue", value: "₹12500.00", icon: "DollarSign", change: "+12.5%" },
    { title: "Today's Orders", value: "82", icon: "Package", change: "+5.1%" },
    { title: "New Customers", value: "12", icon: "Users", change: "+2" },
    { title: "Avg. Prep Time", value: "8m 15s", icon: "Activity", change: "-30s" }
  ],
  recentOrders: [
    { id: "ORD001", customer: "Jane Doe", total: "₹225.00", status: "Picked Up" },
    { id: "ORD002", customer: "John Smith", total: "₹150.00", status: "In Progress" },
    { id: "ORD003", customer: "Sam Wilson", total: "₹89.90", status: "Pending" }
  ]
};

const vendorAccounts = [
  { email: "foodcourt@campuspreorder.com", password: "Vendor@123", vendorId: "vendor-1", displayName: "Food Court Manager" },
  { email: "canteen@campuspreorder.com", password: "Vendor@123", vendorId: "vendor-2", displayName: "Canteen Manager" },
  { email: "mintoo@campuspreorder.com", password: "Vendor@123", vendorId: "vendor-3", displayName: "Mintoo Manager" }
];

module.exports = {
  campuses,
  vendors,
  menuItems,
  orders,
  kdsOrders,
  vendorDashboard,
  vendorAccounts
};
