// LOA Agent - Working Version
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
    const pathParts = path.replace('/.netlify/functions/loa-agent', '').split('/').filter(Boolean);
    
    console.log(`🤖 LOA Agent API: ${httpMethod} ${pathParts.join('/')}`);

    // Emergency endpoint
    if (pathParts[0] === 'emergency' && httpMethod === 'POST') {
      const emergencyData = JSON.parse(body);
      const projectId = `nye_${Date.now()}`;
      
      const response = {
        success: true,
        projectId,
        message: `Emergency deployment started for ${emergencyData.clientName}`,
        eta: '3 hours',
        priority: 'CRITICAL',
        client: emergencyData.clientName,
        email: emergencyData.email,
        service: 'NYE Platform',
        budget: emergencyData.budget || 1500,
        deadline: emergencyData.deadline || '3 hours',
        status: 'emergency',
        createdAt: new Date().toISOString()
      };
      
      console.log(`✅ Emergency project created: ${projectId}`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response)
      };
    }

    // New client endpoint
    if (pathParts[0] === 'new-client' && httpMethod === 'POST') {
      const clientData = JSON.parse(body);
      const projectId = `proj_${Date.now()}`;
      
      const response = {
        success: true,
        projectId,
        message: `Project created for ${clientData.name}`,
        nextStep: 'Design phase started',
        client: clientData.name,
        email: clientData.email,
        service: clientData.service,
        budget: clientData.budget,
        deadline: clientData.deadline,
        status: 'onboarding',
        createdAt: new Date().toISOString(),
        timeline: {
          'Phase 1 - Design': '25% of time',
          'Phase 2 - Development': '60% of time',
          'Phase 3 - Deployment': '15% of time',
          'Total': clientData.deadline
        }
      };
      
      console.log(`✅ New client project created: ${projectId}`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response)
      };
    }

    // Projects endpoint
    if (pathParts[0] === 'projects' && httpMethod === 'GET') {
      const projects = [
        {
          id: 'sample_1',
          client: 'Sample Client',
          service: 'NYE Platform',
          status: 'completed',
          createdAt: new Date().toISOString()
        }
      ];
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ projects })
      };
    }

    // Status endpoint
    if (pathParts[0] === 'status' && httpMethod === 'GET') {
      const status = {
        agentSystem: 'OPERATIONAL',
        version: '1.0.0',
        uptime: new Date().toISOString(),
        capabilities: [
          'Emergency NYE deployment',
          'New client onboarding',
          'Project management',
          'Automated workflows'
        ]
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(status)
      };
    }

    // Default: 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        error: 'Endpoint not found',
        availableEndpoints: [
          'POST /emergency',
          'POST /new-client',
          'GET /projects',
          'GET /status'
        ]
      })
    };

  } catch (error) {
    console.error('❌ LOA Agent Error:', error);
    
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
