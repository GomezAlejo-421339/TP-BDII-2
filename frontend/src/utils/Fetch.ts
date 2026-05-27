const BASE_URL = 'http://localhost:8080';

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  // Ensure we send JSON and accept JSON responses by default
  const defaultHeaders: HeadersInit = {
    'Accept': 'application/json',
    // If a body is present and Content-Type not set, assume JSON
    ...(options.body && !('Content-Type' in (options.headers || {}))
      ? { 'Content-Type': 'application/json' }
      : {}),
  };

  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...defaultHeaders,
    },
  });

  if (!response.ok) {
    // Try to extract error message from response body
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // ignore JSON parse errors
    }
    throw new Error(errorMessage);
  }

  // If no content (e.g., 204 No Content), return undefined
  const contentType = response.headers.get('Content-Type') || '';
  if (response.status === 204 || !contentType.includes('application/json')) {
    return undefined as unknown as T;
  }

  // Parse JSON response; callers provide expected type T
  const data = (await response.json()) as T;
  return data;
}
