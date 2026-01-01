// Simple LOA Status Function
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'LOA Agent System is OPERATIONAL',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: [
        'POST /emergency',
        'POST /new-client',
        'GET /projects',
        'GET /status'
      ]
    })
  };
};
