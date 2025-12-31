const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  try {
    const { httpMethod, path, body } = event;
    const pathParts = path.replace('/.netlify/functions/event-os-api', '').split('/').filter(Boolean);
    
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }

    // Route handling
    if (pathParts[0] === 'vote' && httpMethod === 'POST') {
      // Handle voting for Event OS platforms
      const { platform, userId, voteType } = JSON.parse(body);
      
      const { data, error } = await supabase
        .from('votes')
        .insert([{ platform, user_id: userId, vote_type: voteType }]);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data })
      };
    }

    if (pathParts[0] === 'votes' && httpMethod === 'GET') {
      // Get votes for a platform
      const platform = event.queryStringParameters.platform;
      
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('platform', platform);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data })
      };
    }

    if (pathParts[0] === 'events' && httpMethod === 'POST') {
      // Create new event
      const eventData = JSON.parse(body);
      
      const { data, error } = await supabase
        .from('events')
        .insert([eventData]);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data })
      };
    }

    if (pathParts[0] === 'events' && httpMethod === 'GET') {
      // Get events
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
