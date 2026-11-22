# GTS TV portal (gtstv.live)

Next.js app: member signup/login, free 24-hour trial, paid plans (manual Venmo / Apple Cash), admin dashboard,
reseller and support forms. Database: Supabase schema `gts` (see `gts-schema.sql`).

Environment variables (set in Vercel): SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY,
ADMIN_EMAILS, ADMIN_EMAIL, PUSHOVER_APP_TOKEN (or PUSHOVER_API_TOKEN), PUSHOVER_USER_KEY, RESEND_API_KEY, EMAIL_FROM,
and for the IPTV panel: NXT_API_TOKEN, NXT_PANEL_DNS, IPTV_PANEL_USER, IPTV_PANEL_PASS, NXT_PACKAGE_MAP.
