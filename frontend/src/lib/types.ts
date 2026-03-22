export type Campus = {
  id: string;
  name: string;
  emailPlaceholder: string;
};

export type Vendor = {
  id: string;
  name: string;
  campusId: string;
  cuisine: string;
  imageId: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  description: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'In Progress' | 'Picked Up' | 'Cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
  pickupTime: string;
};

export type KdsOrder = {
  orderId: string;
  status: string;
  items: {
    name: string;
    quantity: number;
  }[];
};

export type VendorDashboardStatsItem = {
  title: string;
  value: string;
  icon: 'DollarSign' | 'Package' | 'Users' | 'Activity';
  change: string;
};

export type VendorDashboardData = {
  stats: VendorDashboardStatsItem[];
  recentOrders: {
    id: string;
    customer: string;
    total: string;
    status: string;
  }[];
};

export type PickupTimesResponse = {
  suggestedPickupTimes: string[];
};
