import 'server-only';

import type {
  Campus,
  KdsOrder,
  MenuItem,
  Order,
  PickupTimesResponse,
  Vendor,
  VendorDashboardData,
} from '@/lib/types';

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getCampuses() {
  return apiFetch<Campus[]>('/api/campuses');
}

export function getVendors() {
  return apiFetch<Vendor[]>('/api/vendors');
}

export function getVendor(vendorId: string) {
  return apiFetch<Vendor>(`/api/vendors/${vendorId}`);
}

export function getVendorMenu(vendorId: string) {
  return apiFetch<MenuItem[]>(`/api/vendors/${vendorId}/menu`);
}

export function getOrders() {
  return apiFetch<Order[]>('/api/orders');
}

export function getOrder(orderId: string) {
  return apiFetch<Order>(`/api/orders/${orderId}`);
}

export function getVendorDashboard() {
  return apiFetch<VendorDashboardData>('/api/vendor-admin/dashboard');
}

export function getKdsOrders() {
  return apiFetch<Record<string, KdsOrder>>('/api/vendor-admin/kds');
}

export function getPickupTimes(payload: {
  vendorId: string;
  menuItems: string[];
  currentTime: string;
}) {
  return apiFetch<PickupTimesResponse>('/api/pickup-times', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
