/**
 * Input validation and sanitization utilities for security.
 */

/**
 * Sanitize string input by trimming and limiting length.
 */
export function sanitizeString(
  input: unknown,
  maxLength: number = 1000
): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

/**
 * Validate and sanitize name input.
 */
export function validateName(name: unknown): { valid: boolean; value?: string; error?: string } {
  if (!name || typeof name !== "string") {
    return { valid: false, error: "Name is required" };
  }
  const sanitized = sanitizeString(name, 100);
  if (sanitized.length < 1) {
    return { valid: false, error: "Name cannot be empty" };
  }
  if (sanitized.length > 100) {
    return { valid: false, error: "Name is too long" };
  }
  // Allow letters, spaces, hyphens, apostrophes, and common unicode characters
  if (!/^[\p{L}\s\-'.,]+$/u.test(sanitized)) {
    return { valid: false, error: "Name contains invalid characters" };
  }
  return { valid: true, value: sanitized };
}

/**
 * Validate and sanitize message/text content.
 */
export function validateMessage(
  message: unknown,
  maxLength: number = 5000
): { valid: boolean; value?: string; error?: string } {
  if (!message || typeof message !== "string") {
    return { valid: false, error: "Message is required" };
  }
  const sanitized = sanitizeString(message, maxLength);
  if (sanitized.length < 1) {
    return { valid: false, error: "Message cannot be empty" };
  }
  if (sanitized.length > maxLength) {
    return { valid: false, error: `Message exceeds maximum length of ${maxLength} characters` };
  }
  return { valid: true, value: sanitized };
}

/**
 * Validate slug format (lowercase alphanumeric with hyphens).
 */
export function validateSlug(slug: unknown): { valid: boolean; value?: string; error?: string } {
  if (!slug || typeof slug !== "string") {
    return { valid: false, error: "Slug is required" };
  }
  const sanitized = slug.trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sanitized)) {
    return { valid: false, error: "Slug must be lowercase alphanumeric with hyphens" };
  }
  if (sanitized.length > 100) {
    return { valid: false, error: "Slug is too long" };
  }
  return { valid: true, value: sanitized };
}

/**
 * Validate URL format.
 */
export function validateUrl(url: unknown): { valid: boolean; value?: string; error?: string } {
  if (!url || typeof url !== "string") {
    return { valid: false, error: "URL is required" };
  }
  const sanitized = url.trim();
  try {
    const parsed = new URL(sanitized);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "URL must use http or https protocol" };
    }
    return { valid: true, value: sanitized };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

/**
 * Rate limiting helper (simple in-memory, consider Redis for production).
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetTime };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetTime,
  };
}

/**
 * Get client IP for rate limiting (works with Vercel and other platforms).
 */
export function getClientIp(headers: Headers): string {
  // Vercel
  const vercelIp = headers.get("x-vercel-forwarded-for") || headers.get("x-forwarded-for");
  if (vercelIp) {
    return vercelIp.split(",")[0].trim();
  }
  // Fallback
  return headers.get("x-real-ip") || "unknown";
}
