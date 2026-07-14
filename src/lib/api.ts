type ApiOptions = {
  method?: string;
  body?: Record<string, unknown> | FormData | null;
  headers?: Record<string, string>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("eventsphere_token");
};

export const apiRequest = async <T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> => {
  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isFormData = options.body instanceof FormData;
  if (!isFormData && options.body) {
    headers["Content-Type"] = "application/json";
  }

  const requestBody: BodyInit | undefined =
    options.body == null
      ? undefined
      : isFormData
        ? (options.body as FormData)
        : JSON.stringify(options.body);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: requestBody,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
};

export const persistAuth = (token: string, user: unknown) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("eventsphere_token", token);
  window.localStorage.setItem("eventsphere_user", JSON.stringify(user));
};

export const clearAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("eventsphere_token");
  window.localStorage.removeItem("eventsphere_user");
};

export const getStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = window.localStorage.getItem("eventsphere_user");
  return user ? JSON.parse(user) : null;
};

export const getEvents = async <T>() => apiRequest<T>("/api/events");

