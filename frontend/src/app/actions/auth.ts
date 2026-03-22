'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { normalizeBaseUrl } from '@/lib/env';

type LoginState = {
  error?: string;
};

const apiBaseUrl = normalizeBaseUrl(process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL);

async function parseError(response: Response) {
  try {
    const data = await response.json() as { message?: string };
    return data.message || 'Login failed. Please try again.';
  } catch {
    return 'Login failed. Please try again.';
  }
}

export async function studentLoginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const campusId = String(formData.get('campusId') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!campusId || !email || !password) {
    return { error: 'Select your campus and fill in both email and password to continue.' };
  }

  const response = await fetch(`${apiBaseUrl}/api/auth/student-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ campusId, email, password }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return { error: await parseError(response) };
  }

  const payload = await response.json() as { user: { campusId: string; email: string; role: string } };
  const cookieStore = await cookies();
  cookieStore.set('student-session', JSON.stringify(payload.user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  redirect('/dashboard');
}

export async function vendorLoginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Enter your vendor email and password to continue.' };
  }

  const response = await fetch(`${apiBaseUrl}/api/auth/vendor-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return { error: await parseError(response) };
  }

  const payload = await response.json() as { user: { email: string; vendorId: string; role: string } };
  const cookieStore = await cookies();
  cookieStore.set('vendor-session', JSON.stringify(payload.user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  redirect('/vendor-admin/dashboard');
}
