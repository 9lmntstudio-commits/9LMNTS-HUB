# API Setup Guide for 9LMNTS Studio LOA System

This guide provides step-by-step instructions for setting up all required APIs and services for the Lead Orchestrator Agent (LOA) system.

## Table of Contents
1. [Supabase Setup](#1-supabase-setup)
2. [DeepSeek API Setup](#2-deepseek-api-setup)
3. [Gemini (Google AI Studio) Setup](#3-gemini-google-ai-studio-setup)
4. [Qwen API Setup](#4-qwen-api-setup)
5. [CrewAI Setup](#5-crewai-setup)
6. [N8N Setup](#6-n8n-setup)
7. [Zapier Setup](#7-zapier-setup)
8. [Notion Setup](#8-notion-setup)
9. [Slack Setup](#9-slack-setup)
10. [Google Workspace Setup](#10-google-workspace-setup)
11. [Environment Variables Configuration](#11-environment-variables-configuration)

---

## 1. Supabase Setup

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Verify your email address

### Step 2: Create a New Project
1. Click "New Project"
2. Enter project name: `9lmnts-studio-loa`
3. Choose database password (save this securely)
4. Select region closest to you
5. Click "Create new project"
6. Wait for project to be ready (2-3 minutes)

### Step 3: Get Project ID and API Keys
1. Go to your project dashboard
2. Click "Settings" → "API"
3. Copy the following values:
   - **Project URL**: `https://[project-id].supabase.co`
   - **Project ID**: The `[project-id]` part from the URL
   - **anon public key**: Found under "Project API keys"
   - **service_role key**: Found under "Project API keys" (keep secret!)

### Step 4: Set Up Database Schema
Run these SQL queries in the Supabase SQL Editor:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  agents_assigned JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}'
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 1,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Agent logs table
CREATE TABLE agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_type TEXT NOT NULL,
  action TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  status TEXT DEFAULT 'completed'
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed)
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tasks FOR SELECT USING (true);
CREATE POLICY "Public read access" ON agent_logs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON clients FOR SELECT USING (true);
```

---

## 2. DeepSeek API Setup

### Step 1: Create DeepSeek Account
1. Go to https://platform.deepseek.com
2. Click "Sign Up"
3. Register with email or GitHub
4. Verify your email address

### Step 2: Get API Key
1. Go to https://platform.deepseek.com/api_keys
2. Click "Create API Key"
3. Name your key: `9lmnts-studio-loa`
4. Copy the API key (save securely - you won't see it again)

### Step 3: Check API Usage
1. Go to https://platform.deepseek.com/usage
2. Monitor your API credits and usage
3. DeepSeek offers free tier with limited requests

### Step 4: Test API
```bash
curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

---

## 3. Gemini (Google AI Studio) Setup

### Step 1: Create Google AI Studio Account
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Accept the terms of service

### Step 2: Get API Key
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Select "Create API key in new project"
4. Copy the API key (starts with `AIza`)

### Step 3: Enable Gemini API
1. Go to https://console.cloud.google.com
2. Select your project
3. Search for "Gemini API"
4. Click "Enable"
5. Wait for API to be enabled

### Step 4: Test API
```bash
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts":[{"text":"Hello"}]}]
  }'
```

---

## 4. Qwen API Setup

### Step 1: Create Alibaba Cloud Account
1. Go to https://www.alibabacloud.com
2. Click "Free Account"
3. Register with email
4. Complete identity verification

### Step 2: Activate Qwen Service
1. Go to https://www.alibabacloud.com/product/qwen
2. Click "Free Trial" or "Buy Now"
3. Select the free tier if available
4. Complete the activation process

### Step 3: Get API Key
1. Go to https://ram.console.aliyun.com/manage/ak
2. Create an AccessKey pair
3. Save the AccessKey ID and AccessKey Secret securely

### Step 4: Configure Qwen API
1. Go to https://dashscope.console.aliyun.com
2. Select "API-KEY Management"
3. Create a new API key
4. Copy the API key for use in your application

### Step 5: Test API
```bash
curl https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation \
  -H "Authorization: Bearer YOUR_QWEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-turbo",
    "input": {"prompt": "Hello"}
  }'
```

---

## 5. CrewAI Setup

### Step 1: Install Python
1. Download Python from https://python.org/downloads
2. Install Python 3.10 or higher
3. Check installation: `python --version`

### Step 2: Create Virtual Environment
```bash
# Navigate to your project directory
cd 9LMNTS-HUB

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### Step 3: Install CrewAI
```bash
pip install crewai crewai-tools langchain-openai langchain-community
```

### Step 4: Create CrewAI Configuration
Create a file `crew_config.py`:

```python
from crewai import Agent, Task, Crew
import os
from langchain_openai import ChatOpenAI

# Configure LLM
llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY")
)

# Define LOA Agent
loa_agent = Agent(
    role="Lead Orchestrator",
    goal="Coordinate all agency operations and manage project workflows",
    backstory="""You are the Lead Orchestrator Agent (LOA) for 9LMNTS Studio,
    responsible for coordinating all development, design, and automation tasks
    across the agency's integrated platform ecosystem.""",
    verbose=True,
    llm=llm
)

# Define Development Agent
dev_agent = Agent(
    role="Development Specialist",
    goal="Handle all development tasks including Git operations and deployment",
    backstory="""You are a development specialist with expertise in modern web
    technologies, Git workflows, and deployment automation.""",
    verbose=True,
    llm=llm
)

# Define Design Agent
design_agent = Agent(
    role="Design Specialist",
    goal="Manage design systems and Figma integrations",
    backstory="""You are a design specialist with expertise in UI/UX design,
    design systems, and Figma API integration.""",
    verbose=True,
    llm=llm
)

# Create a sample task
coordination_task = Task(
    description="Coordinate a new client onboarding workflow",
    expected_output="A detailed onboarding plan with agent assignments",
    agent=loa_agent
)

# Create the crew
crew = Crew(
    agents=[loa_agent, dev_agent, design_agent],
    tasks=[coordination_task],
    verbose=True
)

# Execute the crew
if __name__ == "__main__":
    result = crew.kickoff()
    print(result)
```

### Step 5: Test CrewAI
```bash
python crew_config.py
```

---

## 6. N8N Setup

### Step 1: Create N8N Account
1. Go to https://n8n.io
2. Click "Get Started"
3. Choose your deployment option:
   - **Cloud**: Sign up for n8n.cloud (easiest, paid)
   - **Self-hosted**: Install on your own server (free, requires setup)
4. Complete registration

### Step 2: Set Up N8N Instance

**Option A: Cloud (Recommended for beginners)**
1. After signing up, you'll get a workspace URL
2. Access your n8n dashboard
3. Skip to Step 3

**Option B: Self-hosted (Free)**
```bash
# Using Docker (recommended)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or using npm
npm install n8n -g
n8n start
```

### Step 3: Create API Credentials
1. Go to Settings → API
2. Click "Create API Key"
3. Name it: `9lmnts-studio-loa`
4. Copy the API key (save securely)

### Step 4: Create Webhook Endpoint
1. Create a new workflow in n8n
2. Add a "Webhook" node as the trigger
3. Set HTTP method: POST
4. Set path: `/9lmnts-loa`
5. Copy the webhook URL: `https://your-n8n-instance.com/webhook/9lmnts-loa`

### Step 5: Test N8N Webhook
```bash
curl -X POST https://your-n8n-instance.com/webhook/9lmnts-loa \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

---

## 7. Zapier Setup

### Step 1: Create Zapier Account
1. Go to https://zapier.com
2. Click "Sign Up"
3. Register with email, Google, or other provider
4. Choose the free tier to start

### Step 2: Create Zap
1. Click "Create Zap"
2. Name your Zap: `9lmnts-studio-loa-integration`

### Step 3: Set Up Trigger
1. Choose trigger app (e.g., Gmail, Slack, etc.)
2. Select trigger event (e.g., "New Email")
3. Connect your account
4. Test the trigger

### Step 4: Set Up Action
1. Choose action app (e.g., Slack, Google Sheets, etc.)
2. Select action event (e.g., "Send Channel Message")
3. Connect your account
4. Map data from trigger to action
5. Test the action

### Step 5: Get API Key
1. Go to https://zapier.com/app/dashboard
2. Click "Developer Tools"
3. Generate API key for programmatic access

### Step 6: Test Zapier Integration
```bash
curl https://zapier.com/api/v1/zaps \
  -H "Authorization: Bearer YOUR_ZAPIER_API_KEY"
```

---

## 8. Notion Setup

### Step 1: Create Notion Account
1. Go to https://www.notion.so
2. Click "Get Notion Free"
3. Sign up with email or Google
4. Verify your email address

### Step 2: Create Integration
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it: `9lmnts-studio-loa`
4. Select associated workspace
5. Copy the "Internal Integration Token" (save securely)

### Step 3: Create Database
1. Create a new page in Notion
2. Add a database: "LOA Projects"
3. Add columns:
   - Project Name (Title)
   - Status (Select)
   - Client (Text)
   - Assigned Agents (Multi-select)
   - Created Date (Date)
   - Priority (Select)

### Step 4: Share Database with Integration
1. Click the database menu (⋮)
2. Select "Add connections"
3. Find and select your integration
4. Click "Confirm"

### Step 5: Get Database ID
1. Open the database in Notion
2. Copy the URL
3. Database ID is the 32-character string after `/` and before `?`

### Step 6: Test Notion API
```bash
curl https://api.notion.com/v1/databases/YOUR_DATABASE_ID \
  -H "Authorization: Bearer YOUR_NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28"
```

---

## 9. Slack Setup

### Step 1: Create Slack Workspace
1. Go to https://slack.com
2. Click "Create a new workspace"
3. Enter workspace name: `9lmnts-studio`
4. Add team members

### Step 2: Create Slack App
1. Go to https://api.slack.com/apps
2. Click "Create New App"
3. Choose "From scratch"
4. App name: `9lmnts-studio-loa`
5. Select your workspace
6. Click "Create App"

### Step 3: Configure App Permissions
1. Go to "OAuth & Permissions"
2. Add these scopes:
   - **Bot Token Scopes**:
     - `chat:write` - Send messages
     - `channels:read` - Read channel info
     - `channels:join` - Join channels
     - `files:write` - Upload files
     - `users:read` - Read user info

### Step 4: Install App to Workspace
1. Scroll to "OAuth Tokens for Your Workspace"
2. Click "Install to Workspace"
3. Review permissions and click "Allow"
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`)
5. Copy the **Signing Secret** from "Basic Information"

### Step 5: Create Channels
1. Create channels for LOA operations:
   - `#loa-coordination`
   - `#loa-development`
   - `#loa-design`
   - `#loa-notifications`

### Step 6: Invite Bot to Channels
1. Go to each channel
2. Type `/invite @9lmnts-studio-loa`
3. Add the bot to all relevant channels

### Step 7: Test Slack Integration
```bash
curl -X POST https://slack.com/api/chat.postMessage \
  -H "Authorization: Bearer xoxb-YOUR-BOT-TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "#loa-coordination",
    "text": "LOA System Test Message"
  }'
```

---

## 10. Google Workspace Setup

### Step 1: Create Google Workspace Account
1. Go to https://workspace.google.com
2. Click "Get Started"
3. Choose plan:
   - **Business Starter** (free trial available)
   - **Business Standard** (recommended for LOA system)
4. Complete domain setup or use `your-domain.com`

### Step 2: Enable Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create new project: `9lmnts-studio-loa`
3. Enable required APIs:
   - Gmail API
   - Google Drive API
   - Google Calendar API
   - Google Sheets API

### Step 3: Create Service Account
1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Service account name: `9lmnts-studio-loa`
4. Click "Create and Continue"
5. Skip permissions (set later)
6. Click "Done"

### Step 4: Generate Service Account Key
1. Click on the service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Key type: JSON
5. Download and save the JSON file securely

### Step 5: Enable Domain-Wide Delegation
1. Go to Google Admin Console: https://admin.google.com
2. Navigate to Security → API Controls → Domain-wide Delegation
3. Click "Manage Domain-wide Delegation"
4. Add client ID from your service account JSON
5. Add these scopes:
   ```
   https://www.googleapis.com/auth/gmail.modify
   https://www.googleapis.com/auth/drive
   https://www.googleapis.com/auth/calendar
   https://www.googleapis.com/auth/spreadsheets
   ```

### Step 6: Configure Gmail API
1. Enable Gmail API in Google Cloud Console
2. Set up Gmail push notifications for real-time email processing
3. Create Gmail filters to route LOA-related emails

### Step 7: Set Up Google Drive Integration
1. Create shared drive: `9lmnts-studio-loa`
2. Create folder structure:
   - `/projects`
   - `/clients`
   - `/assets`
   - `/documentation`
3. Share with service account

### Step 8: Configure Google Calendar
1. Create calendar: `9lmnts-studio-loa`
2. Share with team members
3. Set up event types:
   - Project Kickoff
   - Design Review
   - Deployment
   - Client Meeting

### Step 9: Test Google Workspace Integration
```python
# Test Gmail API
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/gmail.modify']
credentials = service_account.Credentials.from_service_account_file(
    'service-account.json', scopes=SCOPES)
service = build('gmail', 'v1', credentials=credentials)

# Test Drive API
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/drive']
credentials = service_account.Credentials.from_service_account_file(
    'service-account.json', scopes=SCOPES)
service = build('drive', 'v3', credentials=credentials)
```

---

## 11. Environment Variables Configuration

### Step 1: Create .env.local File
Create a file named `.env.local` in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI APIs
DEEPSEEK_API_KEY=your-deepseek-api-key
GEMINI_API_KEY=your-gemini-api-key
QWEN_API_KEY=your-qwen-api-key
OPENAI_API_KEY=your-openai-api-key

# N8N Configuration
N8N_API_KEY=your-n8n-api-key
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/9lmnts-loa
N8N_INSTANCE_URL=https://your-n8n-instance.com

# Zapier Configuration
ZAPIER_API_KEY=your-zapier-api-key

# Notion Configuration
NOTION_TOKEN=your-notion-integration-token
NOTION_DATABASE_ID=your-database-id

# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
SLACK_WORKSPACE=9lmnts-studio

# Google Workspace Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_PATH=./service-account.json
GOOGLE_DOMAIN=your-domain.com

# GitHub Configuration
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_REPO=9lmntstudio-commits/9LMNTS-HUB
GITHUB_USERNAME=your-username

# Netlify Configuration
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
NETLIFY_SITE_ID=your-netlify-site-id
```

### Step 2: Update TypeScript to Read Environment Variables
Your existing `utils/supabase/info.ts` is already configured correctly:

```typescript
export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? '';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';
```

### Step 3: Add Type Definitions
Create `src/env.d.ts`:

```typescript
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PROJECT_ID: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 12. Security Best Practices

### Never Commit API Keys
1. Add `.env.local` to `.gitignore`:
```
.env.local
.env.*.local
```

2. Use environment-specific files:
   - `.env.local` for local development
   - `.env.production` for production

### Store Secrets Securely
1. Use Netlify environment variables for production
2. Use Supabase Edge Functions for server-side secrets
3. Never expose service role keys in client-side code

### Rotate Keys Regularly
1. Set calendar reminders to rotate API keys every 90 days
2. Monitor usage for suspicious activity
3. Revoke unused keys immediately

---

## 13. Testing Checklist

### Supabase
- [ ] Can connect to database
- [ ] Can read/write to projects table
- [ ] Can read/write to tasks table
- [ ] Row Level Security is working

### DeepSeek
- [ ] API key is valid
- [ ] Can make successful API calls
- [ ] Response format is correct

### Gemini
- [ ] API key is valid
- [ ] Can make successful API calls
- [ ] Response format is correct

### Qwen
- [ ] Access keys are valid
- [ ] Can make successful API calls
- [ ] Response format is correct

### CrewAI
- [ ] Python environment is set up
- [ ] All dependencies are installed
- [ ] Can create and run agents
- [ ] Can execute tasks

### N8N
- [ ] Webhook URL is accessible
- [ ] Can trigger workflows via webhook
- [ ] API key is valid
- [ ] Workflows execute successfully

### Zapier
- [ ] Can create and test Zaps
- [ ] API key is valid
- [ ] Triggers fire correctly
- [ ] Actions execute successfully

### Notion
- [ ] Integration token is valid
- [ ] Database is shared with integration
- [ ] Can read/write to database
- [ ] Database ID is correct

### Slack
- [ ] Bot is installed to workspace
- [ ] Bot token is valid
- [ ] Bot can send messages
- [ ] Bot is added to required channels

### Google Workspace
- [ ] Service account is created
- [ ] Domain-wide delegation is enabled
- [ ] APIs are enabled (Gmail, Drive, Calendar)
- [ ] Can access Gmail, Drive, Calendar

---

## 14. Troubleshooting

### Common Issues

**Supabase Connection Failed**
- Check project URL format: `https://[project-id].supabase.co`
- Verify API key is correct (anon key, not service role)
- Check Row Level Security policies

**DeepSeek API Error**
- Verify API key is correct
- Check if you have available credits
- Ensure you're using the correct endpoint

**Gemini API Error**
- Verify API key format (starts with `AIza`)
- Check if Gemini API is enabled in Google Cloud Console
- Ensure you're using the correct model name

**Qwen API Error**
- Verify AccessKey ID and Secret are correct
- Check if Qwen service is activated
- Ensure you're using the correct endpoint

**CrewAI Installation Error**
- Ensure Python 3.10+ is installed
- Try upgrading pip: `pip install --upgrade pip`
- Install dependencies one at a time to identify the issue

**N8N Webhook Error**
- Check webhook URL is correct
- Verify N8N instance is running
- Check firewall settings

**Zapier Integration Error**
- Verify API key is valid
- Check Zap is turned on
- Test trigger and action separately

**Notion API Error**
- Verify integration token is valid
- Check database is shared with integration
- Ensure database ID is correct

**Slack Bot Error**
- Verify bot token starts with `xoxb-`
- Check bot is installed to workspace
- Ensure bot is added to channels
- Verify scopes are correct

**Google Workspace Error**
- Verify service account email is correct
- Check domain-wide delegation is enabled
- Ensure APIs are enabled in Google Cloud Console
- Verify credentials file path is correct

---

## 15. Next Steps

After completing all setups:
1. Test each API individually
2. Create a simple integration test
3. Set up monitoring and logging
4. Document your specific configurations
5. Share credentials securely with your team

---

## Support Resources

- **Supabase**: https://supabase.com/docs
- **DeepSeek**: https://platform.deepseek.com/docs
- **Gemini**: https://ai.google.dev/docs
- **Qwen**: https://help.aliyun.com/zh/dashscope
- **CrewAI**: https://docs.crewai.com
- **N8N**: https://docs.n8n.io
- **Zapier**: https://zapier.com/docs
- **Notion**: https://developers.notion.com
- **Slack**: https://api.slack.com/docs
- **Google Workspace**: https://developers.google.com/workspace
- **Netlify Env Vars**: https://docs.netlify.com/environment-variables
