// LOA Orchestrator Netlify Function
const LOAMaster = require('../ai-agents/loa-master');
const GitHubAgent = require('../ai-agents/github-agent');
const ZapierWorkflows = require('../ai-agents/zapier-workflows');

// Initialize agents
const loa = new LOAMaster();
const githubAgent = new GitHubAgent(process.env.GITHUB_TOKEN);
const zapier = new ZapierWorkflows();

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
