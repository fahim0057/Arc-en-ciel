import { authClient } from "./auth-client";
import { API_URL } from "./api";

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

// Browser-side fetch that attaches the logged-in user's JWT.
export async function authFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new ApiError("Please log in to continue.", 401);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(body?.message ?? "Something went wrong.", res.status, body?.errors);
  }
  return body as T;
}