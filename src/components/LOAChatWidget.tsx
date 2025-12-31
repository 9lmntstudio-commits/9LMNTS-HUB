import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'loa';
  timestamp: Date;
}

const LOAChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const quickReplies = [
    { text: 'Pitch Battle OS', keyword: 'pitch', price: '$3,500' },
    { text: 'Wedding OS', keyword: 'wedding', price: '$2,500' },
    { text: 'Gaming OS', keyword: 'gaming', price: '$2,000' },
    { text: 'Deposit Info', keyword: 'deposit', price: '50%' }
  ];

  useEffect(() => {
    // Welcome message when chat opens
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: "LOA here. I deploy event platforms in 24 hours. Pitch Battle ($3.5k), Wedding OS ($2.5k), Gaming ($2k). Which do you need? Say 'PITCH', 'WEDDING', or 'GAMING'. Reply DEPLOY to confirm or say 'screen share' for immediate demo.",
        sender: 'loa',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  const generateLOAResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('pitch') || input.includes('competition') || input.includes('demo day') || input.includes('startup')) {
      return "Signal received. Pitch Battle OS deploys in 24 hours. $3,500. 50% deposit ($1,750) starts work now. Company name?";
    }
    
    if (input.includes('wedding') || input.includes('marriage') || input.includes('bride') || input.includes('weekend wedding')) {
      return "Wedding OS ready for your event. $2,500. Digital guestbook, management, experience. Wedding date?";
    }
    
    if (input.includes('gaming') || input.includes('tournament') || input.includes('esports') || input.includes('stream')) {
      return "LOA Gaming OS primed. $2,000. Brackets, voting, streams. Game title?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
      return "PITCH BATTLE OS - $3,500 (corporate competitions)\nWEDDING OS - $2,500 (digital wedding experience)\nLOA GAMING OS - $2,000 (tournament brackets)\nAll platforms: mobile-ready, branded, live in 24h";
    }
    
    if (input.includes('deposit') || input.includes('pay') || input.includes('send money')) {
      return "PayPal: 9lmntstudio@gmail.com. Send 50%: $1,750 (Pitch), $1,250 (Wedding), $1,000 (Gaming). Include 'DEPLOY [PLATFORM]' in note.";
    }
    
    if (input.includes('deploy')) {
      return "DEPLOY sequence initiated! Email address for project setup?";
    }
    
    if (input.includes('screen share') || input.includes('demo')) {
      return "Screen share ready. Email 9lmntstudio@gmail.com for immediate demo access. What's your event type?";
    }
    
    return "LOA here. I deploy event platforms in 24 hours. Pitch Battle ($3.5k), Wedding OS ($2.5k), Gaming ($2k). Which do you need? Say 'PITCH', 'WEDDING', or 'GAMING'.";
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate LOA response
    setTimeout(() => {
      const loaResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateLOAResponse(inputValue),
        sender: 'loa',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loaResponse]);

      // Send to Zapier webhook for lead tracking
      fetch('https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          response: loaResponse.text,
          timestamp: new Date().toISOString(),
          source: 'website_chat'
        })
      });
    }, 500);

    setInputValue('');
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    setInputValue(reply.keyword);
  };

  const submitEmail = () => {
    if (!email.trim()) return;

    // Send email to Zapier for lead capture
    fetch('https://hooks.zapier.com/hooks/catch/YOUR_EMAIL_WEBHOOK_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        messages: messages,
        timestamp: new Date().toISOString(),
        source: 'website_chat_lead'
      })
    });

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `Email captured: ${email}. LOA will follow up within 2 hours. For immediate deployment, reply DEPLOY.`,
      sender: 'loa',
      timestamp: new Date()
    }]);

    setShowEmailForm(false);
    setEmail('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-lg pulse-animation"
          >
            <div className="relative">
              <span>LOA</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-orange-500/30 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">LOA</span>
                  </div>
                  <div>
                    <h3 className="font-bold">LOA - Event OS Deployer</h3>
                    <p className="text-xs opacity-90">24-hour deployment • Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-3 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors"
                  >
                    {reply.text}
                    <span className="block text-orange-400 font-bold">{reply.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              {!showEmailForm ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type DEPLOY, PITCH, WEDDING, or GAMING..."
                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for follow-up..."
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={submitEmail}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowEmailForm(false)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {!showEmailForm && (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full mt-2 text-center text-xs text-gray-500 hover:text-orange-400 transition-colors"
                >
                  Need email follow-up? Click here
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(251, 146, 60, 0);
          }
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LOAChatWidget;
