# Supabase Backend Architecture - 9LMNTS Studio

## 🏗️ Current Architecture Overview

Your 9LMNTS Studio website uses **Supabase as the primary backend**, providing:

- ✅ **Authentication** - User login/signup with JWT tokens
- ✅ **Database** - PostgreSQL with KV store for inquiries
- ✅ **Edge Functions** - Serverless API endpoints (Deno runtime)
- ✅ **Real-time** - WebSocket connections for live updates
- ✅ **Storage** - File uploads and asset management

---

## 📊 Current Supabase Components

### 1. **Edge Functions** (`/supabase/functions/server/`)

Your main server edge function provides these endpoints:

```
GET  /make-server-662c70dc/health           - Health check
POST /make-server-662c70dc/inquiries        - Save form submissions
GET  /make-server-662c70dc/inquiries        - Retrieve all inquiries
POST /make-server-662c70dc/send-email      - Send emails via Resend
```

**Key Features:**
- ✅ Full CORS support
- ✅ Request/response logging
- ✅ Error handling with detailed messages
- ✅ Integration with Resend API for emails

### 2. **Database Tables**

**Current:**
- `kv_store_662c70dc` - Key-value store for inquiries and form data

**Potential Tables You Could Add:**
- `users` - Extended user profiles
- `projects` - Client project tracking
- `project_inquiries` - Structured inquiry data
- `tickets` - Support/ticketing system
- `events` - EventOS event management
- `battles` - Battle event tracking

### 3. **Authentication System**

Your auth flow:
```typescript
// Signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password',
  options: {
    data: {
      name: 'User Name',
      role: 'user'
    }
  }
})

// Login
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure_password'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

**Current Roles:**
- `admin` - Full dashboard access
- `user` - Standard client access

---

## 🚀 How to Extend Your Backend

### Option 1: Add New Edge Function Endpoints

**Example: Add a `/projects` endpoint**

Edit `/supabase/functions/server/index.tsx`:

```typescript
// Create new project
app.post("/make-server-662c70dc/projects", async (c) => {
  try {
    const body = await c.req.json();
    const projectId = `project_${Date.now()}`;

    await kv.set(projectId, {
      ...body,
      id: projectId,
      status: "pending",
      created_at: new Date().toISOString()
    });

    return c.json({ success: true, id: projectId });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get all projects
app.get("/make-server-662c70dc/projects", async (c) => {
  try {
    const projects = await kv.getByPrefix("project_");
    return c.json({ success: true, projects });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get single project
app.get("/make-server-662c70dc/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const project = await kv.get(id);
    
    if (!project) {
      return c.json({ success: false, error: "Not found" }, 404);
    }
    
    return c.json({ success: true, project });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
```

### Option 2: Add Database Tables

**Create new tables via Supabase Dashboard:**

1. Go to **Database** → **Tables**
2. Click **New Table**
3. Define schema:

```sql
CREATE TABLE project_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service_type TEXT NOT NULL,
  project_name TEXT NOT NULL,
  timeline TEXT,
  budget TEXT,
  description TEXT,
  status TEXT DEFAULT 'new',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Row Level Security
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Anyone can create inquiry"
  ON project_inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Admins can view all
CREATE POLICY "Admins can view all"
  ON project_inquiries FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

**Then query from Edge Function:**

```typescript
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

app.post("/make-server-662c70dc/inquiries-db", async (c) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  const body = await c.req.json();
  
  const { data, error } = await supabase
    .from("project_inquiries")
    .insert([body])
    .select();

  if (error) {
    return c.json({ success: false, error: error.message }, 500);
  }

  return c.json({ success: true, data });
});
```

### Option 3: Add Supabase Storage

**For file uploads (logos, documents, etc.):**

```typescript
app.post("/make-server-662c70dc/upload", async (c) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  const formData = await c.req.formData();
  const file = formData.get("file");

  // Create bucket if doesn't exist
  const bucketName = "client-assets";
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === bucketName);

  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, {
      public: false
    });
  }

  // Upload file
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    return c.json({ success: false, error: error.message }, 500);
  }

  // Get signed URL (valid for 1 hour)
  const { data: signedUrl } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(fileName, 3600);

  return c.json({ 
    success: true, 
    url: signedUrl.signedUrl 
  });
});
```

---

## 🔐 Security Best Practices

### 1. **Environment Variables**

Store sensitive keys in Supabase Edge Function secrets:

```bash
# View secrets
npx supabase secrets list

# Set secret
npx supabase secrets set RESEND_API_KEY=re_...
npx supabase secrets set STRIPE_SECRET_KEY=sk_...
```

**Access in Edge Function:**
```typescript
const apiKey = Deno.env.get("RESEND_API_KEY");
```

### 2. **Row Level Security (RLS)**

Always enable RLS on tables:

```sql
-- Enable RLS
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Example policies
CREATE POLICY "Users see own data"
  ON your_table FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins see all"
  ON your_table FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
```

### 3. **API Key Protection**

- ✅ **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- ✅ Use `SUPABASE_ANON_KEY` for client-side calls
- ✅ Service role key should only be used in Edge Functions

---

## 🔄 Real-Time Features

### Enable Real-Time on Tables

```sql
-- Enable realtime
ALTER PUBLICATION supabase_realtime 
  ADD TABLE project_inquiries;
```

### Subscribe in Frontend

```typescript
const supabase = getSupabaseClient();

const channel = supabase
  .channel('inquiries')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'project_inquiries'
    },
    (payload) => {
      console.log('Change received!', payload);
      // Update UI in real-time
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

---

## 📦 Recommended Extensions

### 1. **Stripe Integration**

```typescript
app.post("/make-server-662c70dc/create-payment", async (c) => {
  const stripe = await import("npm:stripe@latest");
  const stripeClient = new stripe.default(
    Deno.env.get("STRIPE_SECRET_KEY")
  );

  const session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AI Brand Voice Service',
          },
          unit_amount: 250000, // $2,500
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://9lmnts.com/success',
    cancel_url: 'https://9lmnts.com/cancel',
  });

  return c.json({ url: session.url });
});
```

### 2. **OpenAI Integration**

```typescript
app.post("/make-server-662c70dc/ai-generate", async (c) => {
  const openai = await import("npm:openai");
  const client = new openai.default({
    apiKey: Deno.env.get("OPENAI_API_KEY")
  });

  const { prompt } = await c.req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return c.json({ 
    response: completion.choices[0].message.content 
  });
});
```

### 3. **Scheduled Functions (Cron)**

```typescript
// In a separate edge function file
Deno.cron("Send daily reports", "0 9 * * *", async () => {
  // Runs every day at 9 AM
  const inquiries = await kv.getByPrefix("inquiry_");
  const newToday = inquiries.filter(i => 
    new Date(i.created_at).toDateString() === new Date().toDateString()
  );
  
  // Send email summary
  await sendDailySummaryEmail(newToday);
});
```

---

## 🚀 Deployment

### Deploy Edge Functions

```bash
# Deploy all functions
npx supabase functions deploy

# Deploy specific function
npx supabase functions deploy server

# View logs
npx supabase functions logs server

# Follow live logs
npx supabase functions logs server --follow
```

### Test Locally

```bash
# Start local Supabase
npx supabase start

# Serve functions locally
npx supabase functions serve

# Test endpoint
curl http://localhost:54321/functions/v1/make-server-662c70dc/health
```

---

## 📊 Monitoring & Analytics

### View Edge Function Logs

**Via CLI:**
```bash
npx supabase functions logs server --limit 100
```

**Via Dashboard:**
1. Go to **Edge Functions** → **server**
2. Click **Logs** tab
3. View real-time execution logs

### Database Queries

```sql
-- View all inquiries
SELECT * FROM kv_store_662c70dc 
WHERE key LIKE 'inquiry_%' 
ORDER BY (value->>'created_at')::timestamp DESC;

-- Count by status
SELECT value->>'status' as status, COUNT(*) 
FROM kv_store_662c70dc 
WHERE key LIKE 'inquiry_%' 
GROUP BY value->>'status';
```

---

## 🎯 Next Steps

### Quick Wins
1. ✅ **Add Stripe payments** - Collect service payments directly
2. ✅ **Create admin API endpoints** - Manage inquiries from dashboard
3. ✅ **Enable real-time updates** - Live CRM notifications
4. ✅ **Add file uploads** - Client document management

### Long-term Goals
1. 🔄 **Build full CRM** - Project tracking, timelines, milestones
2. 🔄 **Client portal** - Let clients view project progress
3. 🔄 **Automated workflows** - Trigger actions on inquiry status changes
4. 🔄 **Analytics dashboard** - Track conversion rates, revenue

---

## 🆘 Common Issues & Solutions

### Issue: "Failed to fetch" when calling Edge Function

**Solution:** Check CORS configuration in edge function:
```typescript
app.use("/*", cors({
  origin: "*", // Or specify your domain
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
```

### Issue: "Row Level Security policy violation"

**Solution:** Either:
1. Add appropriate RLS policy
2. Use service role key in Edge Function (not anon key)

### Issue: "Edge Function timeout"

**Solution:** Edge functions have 150s timeout. For long operations:
1. Use background jobs
2. Break into smaller requests
3. Implement progress tracking

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Edge Functions Guide:** https://supabase.com/docs/guides/functions
- **Database Guide:** https://supabase.com/docs/guides/database
- **Auth Guide:** https://supabase.com/docs/guides/auth
- **Storage Guide:** https://supabase.com/docs/guides/storage

---

## 💡 Pro Tips

1. **Use TypeScript types:** Generate types from your database schema:
   ```bash
   npx supabase gen types typescript --local > src/types/database.ts
   ```

2. **Batch operations:** Use `kv.mset()` instead of multiple `kv.set()` calls

3. **Cache responses:** Store frequently accessed data in KV store

4. **Version your APIs:** Add `/v1/` to endpoint paths for future versioning

5. **Monitor costs:** Supabase free tier limits:
   - 500MB database
   - 1GB file storage
   - 2 million Edge Function invocations/month

---

**Your Supabase backend is ready to scale!** 🚀

All form submissions are already being saved, emails are being sent via edge functions, and you have authentication in place. Just extend the edge function with new endpoints as you need them.
