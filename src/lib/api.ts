type ApiOptions = {
  method?: string;
  body?: Record<string, unknown> | FormData | null;
  headers?: Record<string, string>;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const normalizeApiBaseUrl = (baseUrl: string) => {
  return baseUrl.replace(/\/+$/, "");
};

const buildApiUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const baseUrl = normalizeApiBaseUrl(API_BASE_URL);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  let normalizedBasePath = "";

  try {
    normalizedBasePath = new URL(baseUrl).pathname.replace(/\/+$/, "");
  } catch {
    normalizedBasePath = baseUrl
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/\/+$/, "");
  }

  // Prevent accidental /api/api/... calls when env already ends with /api.
  if (normalizedBasePath === "/api" && normalizedPath.startsWith("/api/")) {
    return `${baseUrl}${normalizedPath.slice(4)}`;
  }

  if (normalizedBasePath === "/api" && normalizedPath === "/api") {
    return baseUrl;
  }

  return `${baseUrl}${normalizedPath}`;
};

const normalizeMongoIds = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeMongoIds(item)) as T;
  }

  if (value && typeof value === "object") {
    const source = value as Record<string, unknown>;
    const normalized: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(source)) {
      normalized[key] = normalizeMongoIds(item);
    }

    if (source._id != null && normalized.id == null) {
      normalized.id = String(source._id);
    }

    return normalized as T;
  }

  return value;
};

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

  try {
    const response = await fetch(buildApiUrl(path), {
      method: options.method || "GET",
      headers,
      body: requestBody,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        data && typeof data.message === "string" ? data.message : "";

      if (response.status === 403) {
        throw new Error(
          message ||
            "Access Denied: Admin access required or your account does not have permission",
        );
      } else if (response.status === 401) {
        throw new Error(message || "Unauthorized: Please login again");
      } else if (response.status === 404) {
        throw new Error(
          message ||
            `Not Found: The requested resource was not found at ${path}`,
        );
      }
      throw new Error(
        message || `Request failed with status ${response.status}`,
      );
    }

    return normalizeMongoIds(data) as T;
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "Network Error: Could not connect to server. Make sure the server is running at " +
          API_BASE_URL,
      );
    }
    throw error;
  }
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

export const getCategories = async <T>() => apiRequest<T>("/api/categories");

export const getBlogs = async <T>() => apiRequest<T>("/api/blogs");

export const getBlogBySlug = async <T>(slug: string) =>
  apiRequest<T>(`/api/blogs/${slug}`);

export const getFAQs = async <T>() => apiRequest<T>("/api/faqs");

export const getFAQsByCategory = async <T>(category: string) =>
  apiRequest<T>(`/api/faqs/category/${category}`);
