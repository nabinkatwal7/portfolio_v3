# Security & Performance Guide

## Security Improvements

### 1. Security Headers

All security headers are configured in `next.config.ts`:

- **Strict-Transport-Security**: Enforces HTTPS
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-XSS-Protection**: XSS protection
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features
- **Content-Security-Policy**: Controls resource loading

### 2. Input Validation

All user inputs are validated and sanitized using `lib/validation.ts`:

- Name validation (alphanumeric, spaces, hyphens, apostrophes)
- Message validation (length limits, sanitization)
- Slug validation (lowercase alphanumeric with hyphens)
- URL validation (http/https protocols)

### 3. Rate Limiting

Rate limiting implemented for guestbook entries:

- 5 requests per minute per IP address
- Prevents spam and abuse
- Uses in-memory storage (consider Redis for production)

### 4. Environment Variables

Sensitive keys moved to environment variables:

- Cloudflare Turnstile site key: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- All database credentials in `.env.local` (not committed)
- See `.env.example` for required variables

### 5. Error Handling

- Error boundaries prevent crashes
- User-friendly error messages
- No sensitive information leaked in errors

## Performance Improvements

### 1. Static Generation & Revalidation

Replaced `force-dynamic` with ISR (Incremental Static Regeneration):

- Home: Revalidates every hour
- Blog listing: Revalidates every 5 minutes
- Blog posts: Revalidate every 10 minutes
- Projects: Revalidates every hour
- Guestbook: Revalidates every 30 seconds
- Watchlogs: Revalidates every hour

### 2. Image Optimization

- Next.js Image component with AVIF/WebP support
- Proper sizing and lazy loading
- Priority loading for above-the-fold images

### 3. Code Splitting

- Dynamic imports for heavy components (CodeEditor)
- Optimized package imports (framer-motion, react-icons)
- Suspense boundaries for async components

### 4. Rendering Fixes

- Fixed PageTransition hydration issues
- Added Suspense boundaries for async data
- Error boundaries prevent white screens
- Loading states for better UX

### 5. Next.js Optimizations

- SWC minification enabled
- Compression enabled
- React Strict Mode enabled
- Removed `powered-by` header

## Setup Instructions

1. **Copy environment variables:**

   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values in `.env.local`:**

   - Supabase credentials
   - Site URL for production
   - Admin password
   - Cloudflare Turnstile key (optional)

3. **Never commit `.env.local`** - it's already in `.gitignore`

## Production Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Use strong `ADMIN_PASSWORD`
- [ ] Enable Cloudflare Turnstile for additional bot protection
- [ ] Consider Redis for rate limiting in production
- [ ] Set up monitoring and error tracking (e.g., Sentry)
- [ ] Review CSP headers and adjust if needed
- [ ] Test all forms with validation
- [ ] Verify security headers with securityheaders.com

## Monitoring

Monitor these metrics:

- Page load times
- Error rates
- Rate limit hits
- Failed authentication attempts
- Database query performance
