import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  HelpCircle,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your CareConnect AI Assistant. How can I help you today?', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqs = {
    'how to share records': 'You can share records by clicking "Share Access" on your dashboard. This generates a 6-digit PIN and a QR code for your doctor.',
    'is my data safe': 'Yes, CareConnect uses end-to-end encryption. Your medical records are stored securely and only accessible via explicit authorization.',
    'how to upload reports': 'Go to the "My Reports" section and click "Upload Report". You can upload PDFs or images of your medical documents.',
    'who can see my data': 'Only you and the doctors you explicitly share your 6-digit access code or QR code with can see your data. Access expires automatically.',
    'emergency profile': 'Your emergency profile contains critical info like blood group and allergies, which can be life-saving during emergencies.'
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input, time: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let botResponse = "I'm still learning! For specific medical advice, please consult your doctor. I can help with FAQs like 'How to share records' or 'Security'.";
      
      const lowerInput = input.toLowerCase();
      for (const [key, value] of Object.entries(faqs)) {
        if (lowerInput.includes(key)) {
          botResponse = value;
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse, time: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {isOpen ? (
        <div className="chatbot-container" style={{ 
          width: '320px', 
          height: '540px', 
          background: '#ffffff', 
          borderRadius: '24px', 
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '1.5rem', 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between'
          }}>
            <div className="flex items-center gap-3">
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px' }}>
                <Bot size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>CareConnect AI</h4>
                <div className="flex items-center gap-1">
                  <div style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }} />
                  <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Always online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: 'auto' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                gap: '0.75rem',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: msg.role === 'user' ? 'var(--primary-glow)' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: msg.role === 'user' ? 'var(--primary)' : 'var(--text-secondary)',
                  flexShrink: 0
                }}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div style={{ 
                  padding: '0.875rem 1rem', 
                  borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: msg.role === 'user' ? 'var(--primary)' : '#f1f5f9',
                  color: msg.role === 'user' ? 'white' : '#1e293b',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  border: msg.role === 'bot' ? '1px solid #e2e8f0' : 'none'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', padding: '12px' }}>
                <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Buttons */}
          <div style={{ padding: '0 1.5rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem' }} className="no-scrollbar">
            <button onClick={() => setInput('How to share records?')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '12px' }}>
              <Sparkles size={10} /> Sharing
            </button>
            <button onClick={() => setInput('Is my data safe?')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '12px' }}>
              <ShieldCheck size={10} /> Security
            </button>
            <button onClick={() => setInput('How to upload reports?')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '12px' }}>
              <HelpCircle size={10} /> Uploads
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.75rem', background: '#ffffff' }}>
            <input 
              type="text" 
              placeholder="Ask me anything..."
              style={{ 
                flex: 1,
                fontSize: '0.875rem', 
                height: '44px',
                padding: '0 1rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                outline: 'none',
                transition: 'all 0.2s ease',
                color: '#1e293b'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid var(--primary)';
                e.target.style.background = '#ffffff';
                e.target.style.boxShadow = '0 0 0 4px var(--primary-light)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid #e2e8f0';
                e.target.style.background = '#f8fafc';
                e.target.style.boxShadow = 'none';
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '44px', 
                height: '44px', 
                padding: 0,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="btn btn-primary" 
          style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
            padding: 0
          }}
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
