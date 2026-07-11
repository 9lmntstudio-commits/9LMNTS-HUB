import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-662c70dc/health", (c) => {
  return c.json({ status: "ok" });
});

// ════════════════════════════════════════════════════════════════
// INQUIRY ENDPOINTS
// ════════════════════════════════════════════════════════════════

// Save inquiry to KV store
app.post("/make-server-662c70dc/inquiries", async (c) => {
  try {
    const body = await c.req.json();
    const timestamp = new Date().toISOString();
    const inquiryId = `inquiry_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;

    // Save to KV store
    await kv.set(inquiryId, {
      ...body,
      id: inquiryId,
      created_at: timestamp,
      status: "new",
    });

    console.log(`✅ Saved inquiry: ${inquiryId}`);

    return c.json({
      success: true,
      id: inquiryId,
      message: "Inquiry saved successfully"
    });
  } catch (error) {
    console.error("❌ Error saving inquiry:", error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ════════════════════════════════════════════════════════════════
// TICKET / TRANSFER ENDPOINTS
// ════════════════════════════════════════════════════════════════

// Log pending e-Transfer ticket
app.post("/make-server-662c70dc/tickets", async (c) => {
  try {
    const body = await c.req.json();
    const timestamp = new Date().toISOString();
    const ticketId = body.id || `ticket_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;

    // Save to KV store
    await kv.set(`ticket_${ticketId}`, {
      ...body,
      id: ticketId,
      created_at: timestamp,
      status: "pending_verification",
    });

    console.log(`✅ Saved pending ticket: ${ticketId}`);

    return c.json({
      success: true,
      id: ticketId,
      message: "Ticket logged successfully"
    });
  } catch (error) {
    console.error("❌ Error saving ticket:", error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// Get all inquiries (with optional prefix filter)
app.get("/make-server-662c70dc/inquiries", async (c) => {
  try {
    const inquiries = await kv.getByPrefix("inquiry_");
    return c.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    console.error("❌ Error fetching inquiries:", error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ════════════════════════════════════════════════════════════════
// ADMIN ENDPOINTS
// ════════════════════════════════════════════════════════════════

app.get("/make-server-662c70dc/admin/users", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    return c.json({ success: true, users: users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.user_metadata?.name || u.email?.split('@')[0] || "User",
      role: u.user_metadata?.role || "user",
      created_at: u.created_at
    })) });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ════════════════════════════════════════════════════════════════
// CRM ENDPOINTS (CLIENTS)
// ════════════════════════════════════════════════════════════════

app.get("/make-server-662c70dc/clients", async (c) => {
  try {
    const clients = await kv.getByPrefix("client_");
    return c.json({ success: true, clients });
  } catch (error) {
    console.error("❌ Error fetching clients:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post("/make-server-662c70dc/clients", async (c) => {
  try {
    const body = await c.req.json();
    const timestamp = new Date().toISOString();
    const clientId = `client_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(clientId, { ...body, id: clientId, created_at: timestamp });
    return c.json({ success: true, id: clientId });
  } catch (error) {
    console.error("❌ Error creating client:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.put("/make-server-662c70dc/clients/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    await kv.set(id, body);
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error updating client:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.delete("/make-server-662c70dc/clients/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.mdel([id]);
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting client:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ════════════════════════════════════════════════════════════════
// CRM ENDPOINTS (PROJECTS)
// ════════════════════════════════════════════════════════════════

app.get("/make-server-662c70dc/projects", async (c) => {
  try {
    const projects = await kv.getByPrefix("project_");
    return c.json({ success: true, projects });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post("/make-server-662c70dc/projects", async (c) => {
  try {
    const body = await c.req.json();
    const timestamp = new Date().toISOString();
    const projectId = `project_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(projectId, { ...body, id: projectId, created_at: timestamp });
    return c.json({ success: true, id: projectId });
  } catch (error) {
    console.error("❌ Error creating project:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.delete("/make-server-662c70dc/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.mdel([id]);
    return c.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ════════════════════════════════════════════════════════════════
// CRM ENDPOINTS (TICKETS)
// ════════════════════════════════════════════════════════════════

app.get("/make-server-662c70dc/tickets", async (c) => {
  try {
    const tickets = await kv.getByPrefix("ticket_");
    return c.json({ success: true, tickets });
  } catch (error) {
    console.error("❌ Error fetching tickets:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ════════════════════════════════════════════════════════════════
// EMAIL ENDPOINT (using Resend API)
// ════════════════════════════════════════════════════════════════

app.post("/make-server-662c70dc/send-email", async (c) => {
  try {
    const { to, subject, message, replyTo } = await c.req.json();

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.warn("⚠️ RESEND_API_KEY not configured - email not sent");
      return c.json({
        success: false,
        error: "Email service not configured. Please add RESEND_API_KEY to environment variables."
      }, 500);
    }

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "9LMNTS Studio <noreply@9lmnts.com>", // Must be your verified domain
        to: [to],
        reply_to: replyTo || to,
        subject: subject,
        html: `<pre style="font-family: monospace; white-space: pre-wrap;">${message}</pre>`,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Resend API error:", result);
      return c.json({
        success: false,
        error: result.message || "Failed to send email",
        details: result
      }, response.status);
    }

    console.log("✅ Email sent successfully:", result.id);

    return c.json({
      success: true,
      emailId: result.id,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

Deno.serve(app.fetch);