import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { BOT_RESPONSES, CHATBOT_DEFAULT_RESPONSE } from '../constants';
import type { ChatMessage } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm your Decision Log assistant. Ask me anything about capturing, tracking, or auditing decisions.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    // Simulate AI typing and delayed reply
    setTimeout(() => {
      let botText = CHATBOT_DEFAULT_RESPONSE;

      // Find keywords matching constants keys
      for (const key of Object.keys(BOT_RESPONSES)) {
        if (query.includes(key)) {
          botText = BOT_RESPONSES[key];
          break;
        }
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-gradient-to-r from-royal-violet-600 to-mauve-magic-500 hover:from-royal-violet-500 hover:to-mauve-magic-400 text-white shadow-xl shadow-royal-violet-950/30 cursor-pointer active:scale-95 transition-all duration-300"
        aria-label="Toggle assistant chat"
      >
        <div className="absolute -inset-1.5 bg-gradient-to-r from-royal-violet-500 to-mauve-magic-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Pulsating badge indicator */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mauve-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-mauve-magic-500 border border-dark-amethyst-500"></span>
        </span>
        
        {isOpen ? <X className="h-6 w-6 relative z-10" /> : <MessageSquare className="h-6 w-6 relative z-10" />}
      </button>

      {/* Chat Window Panel */}
      <div
        className={`
          absolute bottom-20 right-0 w-[350px] sm:w-[380px] h-[480px] rounded-2xl border border-indigo-ink-500/30 
          bg-dark-amethyst-500/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-75 opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-violet-midnight-500 to-indigo-ink-500 border-b border-indigo-ink-500/20 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-royal-violet-600/30 border border-royal-violet-500/30 text-mauve-magic-500">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                Decision Log AI
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </h4>
              <p className="text-[10px] text-mauve-600">Typically replies instantly</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-mauve-600 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 text-left">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div key={msg.id} className={`flex gap-2.5 max-w-[85%] ${isBot ? '' : 'ml-auto flex-row-reverse'}`}>
                {/* Avatar */}
                <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isBot 
                    ? 'bg-royal-violet-500/20 text-mauve-magic-500 border border-royal-violet-500/30' 
                    : 'bg-gradient-to-r from-mauve-magic-500 to-mauve-500 text-dark-amethyst-100 shadow-sm'
                }`}>
                  {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                {/* Bubble */}
                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    isBot 
                      ? 'bg-violet-midnight-500/60 border border-indigo-ink-500/10 text-mauve-900 rounded-tl-none' 
                      : 'bg-royal-violet-600 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-mauve-600/70 block px-1 text-right">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2.5 max-w-[85%]">
              <div className="h-7 w-7 rounded-full bg-royal-violet-500/20 text-mauve-magic-500 border border-royal-violet-500/30 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-none bg-violet-midnight-500/60 border border-indigo-ink-500/10 flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-mauve-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 bg-mauve-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 bg-mauve-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-violet-midnight-500/30 border-t border-indigo-ink-500/15 flex gap-2">
          <input
            type="text"
            placeholder="Ask about 'trial' or 'pricing'..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            className="flex-grow px-3.5 py-2 rounded-xl bg-violet-midnight-500/50 border border-indigo-ink-500/30 text-white placeholder-mauve-600/50 focus:outline-none focus:border-royal-violet-500 text-xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-xl bg-royal-violet-600 hover:bg-royal-violet-500 text-white transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
