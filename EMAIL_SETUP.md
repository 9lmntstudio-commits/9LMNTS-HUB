# Email Setup Guide - Supabase Edge Function + Resend

## ✅ What We Changed

**Replaced EmailJS with Supabase Edge Function + Resend API**

- ❌ **Before:** EmailJS (domain whitelisting issues, 422 errors)
- ✅ **After:** Supabase Edge Function with Resend API (reliable, no CORS issues)

---

## 🚀 Setup Instructions

### Step 1: Get Resend API Key (Free Tier)

1. Go to **https://resend.com/signup**
2. Sign up for a free account (3,000 emails/month)
3. Verify your email address
4. Go to **API Keys** section
5. Click **Create API Key**
6. Copy the API key (starts with `re_...`)

### Step 2: Add Domain to Resend (Optional but Recommended)

**Option A: Use your own domain (9lmnts.com)**
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `9lmnts.com`
4. Add the DNS records shown to your domain registrar
5. Wait for verification (usually 5-15 minutes)
6. Update edge function line 87: `from: "9LMNTS Studio <noreply@9lmnts.com>"`

**Option B: Use Resend's free domain (for testing)**
- You can send from `onboarding@resend.dev` (100 emails/day limit)
- Update edge function line 87: `from: "9LMNTS Studio <onboarding@resend.dev>"`

### Step 3: Add API Key to Supabase

1. Go to **https://supabase.com/dashboard**
2. Select your project
3. Go to **Edge Functions** → **Secrets & Environment Variables**
4. Click **Add New Secret**
5. Name: `RESEND_API_KEY`
6. Value: Your Resend API key (paste the `re_...` key)
7. Click **Save**

### Step 4: Deploy Edge Function

Run this command to deploy your updated edge function:

```bash
npx supabase functions deploy server
```

Or via Supabase Dashboard:
1. Go to **Edge Functions**
2. Find `server` function
3. Click **Deploy** or wait for auto-deploy

---

## 🧪 Test Your Setup

1. Go to your website contact form
2. Submit a test inquiry
3. Check browser console for logs:
   - ✅ `Email sent successfully via Supabase Edge Function`
   - ✅ `Inquiry saved successfully`
   - ✅ `n8n webhook sent successfully`

4. Check your email (9lmntstudio@gmail.com) for the notification

---

## 🔍 Troubleshooting

### Error: "Email service not configured"
**Fix:** Add `RESEND_API_KEY` to Supabase Edge Function environment variables (see Step 3)

### Error: "Failed to send email" with 403
**Fix:** Verify your domain in Resend dashboard or use `onboarding@resend.dev`

### Error: "Invalid from address"
**Fix:** Update the `from` field in `/supabase/functions/server/index.tsx` line 87 to match your verified domain

### Check Logs
View Supabase Edge Function logs:
```bash
npx supabase functions logs server
```

Or in dashboard: **Edge Functions** → **server** → **Logs**

---

## 📊 Current Architecture

```
User submits form
    ↓
    ├─→ [1] Supabase Edge Function /send-email (Resend API) ✅ Primary
    ├─→ [2] Supabase KV Store /inquiries                    ✅ Backup
    ├─→ [3] n8n Webhook (no-cors mode)                      ✅ Automation
    └─→ [4] Supabase Direct Client Save                     ✅ Fallback
```

**Benefits:**
- ✅ No CORS issues
- ✅ No domain whitelisting required
- ✅ Reliable email delivery
- ✅ Multiple backup systems
- ✅ Full control over email templates
- ✅ Free tier: 3,000 emails/month

---

## 💡 Next Steps (Optional)

1. **Customize Email Templates** - Edit the email message format in:
   - `src/app/components/StartProjectPage.tsx` (line ~530)
   - `src/app/components/ServicesPage.tsx` (line ~275)

2. **Add Email Notifications to n8n**
   - Your n8n webhook already receives all form data
   - You can trigger additional email notifications from n8n

3. **View All Inquiries**
   - GET endpoint available at: `${SERVER_URL}/inquiries`
   - Returns all saved inquiries from KV store

4. **Monitor Email Delivery**
   - Log in to Resend dashboard to see email delivery stats
   - View bounces, opens (if tracking enabled), etc.

---

## 🆘 Need Help?

- **Resend Docs:** https://resend.com/docs
- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions
- **Check Logs:** Browser console + Supabase Edge Function logs
