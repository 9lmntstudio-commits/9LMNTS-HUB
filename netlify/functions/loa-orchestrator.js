// LOA Orchestrator Netlify Function - Standalone Version
const { Octokit } = require("@octokit/rest");

// Initialize GitHub Agent
const githubAgent = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Simplified LOA Master for testing
class LOAMaster {
  constructor() {
    this.activeProjects = new Map();
  }

  async processRequest(request) {
    console.log(`🤖 LOA Processing: ${request.type}`);
    
    try {
      switch (request.type) {
        case 'new_client':
          return await this.handleNewClient(request.data);
        case 'nye_emergency':
          return await this.handleNYEEmergency(request.data);
        case 'project_update':
          return await this.handleProjectUpdate(request.data);
        case 'payment_received':
          return await this.handlePaymentReceived(request.data);
        default:
          throw new Error(`Unknown request type: ${request.type}`);
      }
    } catch (error) {
      console.error(`❌ LOA Error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async handleNYEEmergency(emergencyData) {
    const projectId = `nye_${Date.now()}`;
    
    console.log(`🚨 NYE Emergency: ${emergencyData.clientName}`);
    
    const project = {
      id: projectId,
      client: emergencyData.clientName,
      email: emergencyData.email,
      service: 'NYE Platform',
      budget: emergencyData.budget || 1500,
      deadline: emergencyData.deadline || '3 hours',
      status: 'emergency',
      priority: 'critical',
      createdAt: new Date().toISOString()
    };
    
    this.activeProjects.set(projectId, project);
    
    // Create GitHub repository
    try {
      const repoName = `${emergencyData.clientName.toLowerCase().replace(/\s+/g, '-')}-nye-platform`;
      const repo = await githubAgent.repos.createForAuthenticatedUser({
        name: repoName,
        description: `NYE Platform for ${emergencyData.clientName}`,
        private: true,
        auto_init: true
      });
      
      project.githubRepo = repo.html_url;
      console.log(`✅ Created repo: ${repo.html_url}`);
      
      return {
        success: true,
        projectId,
        message: `Emergency deployment started for ${emergencyData.clientName}`,
        eta: '3 hours',
        priority: 'CRITICAL',
        githubRepo: repo.html_url
      };
    } catch (error) {
      console.error('❌ GitHub repo creation failed:', error);
      return {
        success: true,
        projectId,
        message: `Emergency deployment started for ${emergencyData.clientName}`,
        eta: '3 hours',
        priority: 'CRITICAL',
        githubError: error.message
      };
    }
  }

  async handleNewClient(clientData) {
    const projectId = `proj_${Date.now()}`;
    
    console.log(`👋 New client: ${clientData.name}`);
    
    const project = {
      id: projectId,
      client: clientData.name,
      email: clientData.email,
      service: clientData.service,
      budget: clientData.budget,
      deadline: clientData.deadline,
      status: 'onboarding',
      createdAt: new Date().toISOString()
    };
    
    this.activeProjects.set(projectId, project);
    
    // Create GitHub repository
    try {
      const repoName = `${clientData.name.toLowerCase().replace(/\s+/g, '-')}-${clientData.service.toLowerCase().replace(/\s+/g, '-')}`;
      const repo = await githubAgent.repos.createForAuthenticatedUser({
        name: repoName,
        description: `${clientData.service} platform for ${clientData.name}`,
        private: true,
        auto_init: true
      });
      
      project.githubRepo = repo.html_url;
      console.log(`✅ Created repo: ${repo.html_url}`);
      
      return {
        success: true,
        projectId,
        message: `Project created for ${clientData.name}`,
        nextStep: 'Design phase started',
        timeline: this.generateTimeline(clientData.deadline),
        githubRepo: repo.html_url
      };
    } catch (error) {
      console.error('❌ GitHub repo creation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  generateTimeline(deadline) {
    return {
      'Phase 1 - Design': '25% of time',
      'Phase 2 - Development': '60% of time', 
      'Phase 3 - Deployment': '15% of time',
      'Total': deadline
    };
  }

  getProjectStatus(projectId) {
    const project = this.activeProjects.get(projectId);
    return project || { error: 'Project not found' };
  }

  getAllProjects() {
    return Array.from(this.activeProjects.values());
  }

  getAgentMetrics() {
    return {
      totalProjects: this.activeProjects.size,
      byStatus: this.getProjectCountsByStatus(),
      byAgent: this.getProjectCountsByAgent()
    };
  }

  getProjectCountsByStatus() {
    const counts = {};
    this.activeProjects.forEach(project => {
      counts[project.status] = (counts[project.status] || 0) + 1;
    });
    return counts;
  }

  getProjectCountsByAgent() {
    const counts = {};
    this.activeProjects.forEach(project => {
      if (project.currentAgent) {
        counts[project.currentAgent] = (counts[project.currentAgent] || 0) + 1;
      }
    });
    return counts;
  }
}

// Initialize LOA
const loa = new LOAMaster();

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, path, body } = event;
    const pathParts = path.replace('/.netlify/functions/loa-orchestrator', '').split('/').filter(Boolean);
    
    console.log(`🤖 LOA API: ${httpMethod} ${pathParts.join('/')}`);

    // Route: /process-request - Main orchestration endpoint
    if (pathParts[0] === 'process-request' && httpMethod === 'POST') {
      const requestData = JSON.parse(body);
      
      // Process request through LOA
      const result = await loa.processRequest(requestData);
      
      // If it's a new client, create GitHub repo
      if (requestData.type === 'new_client' && result.success) {
        try {
          const repo = await githubAgent.createProjectRepo(
            requestData.data.service,
            requestData.data.name,
            requestData.data.service
          );
          result.githubRepo = repo.html_url;
        } catch (githubError) {
          console.error('GitHub repo creation failed:', githubError);
          result.githubError = githubError.message;
        }
      }
      
      // Trigger Zapier workflow if needed
      if (requestData.type === 'payment_received') {
        await zapier.handlePaymentReceived(requestData.data);
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    }

    // Route: /project/:id - Get project status
    if (pathParts[0] === 'project' && httpMethod === 'GET') {
      const projectId = pathParts[1];
      const project = loa.getProjectStatus(projectId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(project)
      };
    }

    // Route: /projects - Get all projects
    if (pathParts[0] === 'projects' && httpMethod === 'GET') {
      const projects = loa.getAllProjects();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ projects })
      };
    }

    // Route: /metrics - Get agent performance
    if (pathParts[0] === 'metrics' && httpMethod === 'GET') {
      const metrics = loa.getAgentMetrics();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(metrics)
      };
    }

    // Route: /webhook/:type - Handle external webhooks
    if (pathParts[0] === 'webhook' && httpMethod === 'POST') {
      const webhookType = pathParts[1];
      const webhookData = JSON.parse(body);
      
      let result;
      switch (webhookType) {
        case 'payment':
          result = await loa.processRequest({
            type: 'payment_received',
            data: webhookData
          });
          break;
        case 'design-complete':
          result = await loa.processRequest({
            type: 'project_update',
            data: {
              projectId: webhookData.projectId,
              update: 'design_complete',
              designFiles: webhookData.files
            }
          });
          break;
        case 'development-complete':
          result = await loa.processRequest({
            type: 'project_update',
            data: {
              projectId: webhookData.projectId,
              update: 'development_complete',
              buildFiles: webhookData.files
            }
          });
          break;
        default:
          result = { success: false, error: 'Unknown webhook type' };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    }

    // Route: /emergency - Handle NYE emergencies
    if (pathParts[0] === 'emergency' && httpMethod === 'POST') {
      const emergencyData = JSON.parse(body);
      
      // Process as emergency
      const result = await loa.processRequest({
        type: 'nye_emergency',
        data: emergencyData
      });
      
      // Trigger emergency workflow
      if (result.success) {
        await zapier.handleNYEEmergency(emergencyData);
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    }

    // Route: /github/create-repo - Create GitHub repository
    if (pathParts[0] === 'github' && pathParts[1] === 'create-repo' && httpMethod === 'POST') {
      const { projectName, clientName, platformType } = JSON.parse(body);
      
      const repo = await githubAgent.createProjectRepo(projectName, clientName, platformType);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, repo })
      };
    }

    // Route: /zapier/trigger - Trigger Zapier workflow
    if (pathParts[0] === 'zapier' && pathParts[1] === 'trigger' && httpMethod === 'POST') {
      const { workflow, data } = JSON.parse(body);
      
      let result;
      switch (workflow) {
        case 'payment-received':
          result = await zapier.handlePaymentReceived(data);
          break;
        case 'design-complete':
          result = await zapier.handleDesignComplete(data);
          break;
        case 'code-push':
          result = await zapier.handleCodePush(data);
          break;
        case 'nye-emergency':
          result = await zapier.handleNYEEmergency(data);
          break;
        default:
          result = { success: false, error: 'Unknown workflow' };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      };
    }

    // Default: 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };

  } catch (error) {
    console.error('❌ LOA Orchestrator Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};
