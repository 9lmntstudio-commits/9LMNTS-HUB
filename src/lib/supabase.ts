import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Vote {
  id?: string;
  platform: string;
  user_id: string;
  vote_type: string;
  created_at?: string;
}

export interface Event {
  id?: string;
  title: string;
  platform: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  participants?: number;
  created_at?: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
  created_at?: string;
}

// API functions
export const api = {
  // Voting functions
  async vote(platform: string, userId: string, voteType: string) {
    const response = await fetch('/.netlify/functions/event-os-api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform, userId, voteType }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to vote');
    }
    
    return response.json();
  },

  async getVotes(platform: string) {
    const response = await fetch(`/.netlify/functions/event-os-api/votes?platform=${platform}`);
    
    if (!response.ok) {
      throw new Error('Failed to get votes');
    }
    
    return response.json();
  },

  // Event functions
  async createEvent(eventData: Partial<Event>) {
    const response = await fetch('/.netlify/functions/event-os-api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    
    return response.json();
  },

  async getEvents() {
    const response = await fetch('/.netlify/functions/event-os-api/events');
    
    if (!response.ok) {
      throw new Error('Failed to get events');
    }
    
    return response.json();
  }
};
