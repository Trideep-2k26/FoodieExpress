import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  products: any[];
  categories: any[];
}

const ChatBot: React.FC<ChatBotProps> = ({ products, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your FoodieExpress assistant. I can help you with menu recommendations, nutritional information, pricing, and answer any questions about our restaurant. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const generateRestaurantContext = () => {
    const menuData = products.map(product => ({
      name: product.name,
      price: `₹${product.price}`,
      category: product.category,
      rating: product.rating,
      description: product.description,
      popular: product.popular || false
    }));

    const categoryData = categories.map(cat => ({
      name: cat.name,
      id: cat.id
    }));

    return `
You are an AI assistant for FoodieExpress, a premium food ordering restaurant. Here's our complete menu and restaurant information:

RESTAURANT INFO:
- Name: FoodieExpress
- Type: Premium food ordering service with affordable pricing
- Location: 123 Food Street, Gourmet District, Mumbai, Maharashtra 400001
- Phone: +91 98765 43210
- Email: hello@foodieexpress.com
- Hours: Mon-Thu: 10AM-11PM, Fri-Sat: 10AM-12AM, Sun: 11AM-10PM
- Established: 2020
- Speciality: Premium ingredients and exceptional service at affordable prices
- GST: 27AABCU9603R1ZX

MENU CATEGORIES:
${categoryData.map(cat => `- ${cat.name} (${cat.id})`).join('\n')}

COMPLETE MENU (All items under ₹500):
${menuData.map(item => `
${item.name} - ${item.price}
Category: ${item.category}
Rating: ${item.rating}/5
Description: ${item.description}
${item.popular ? 'POPULAR ITEM ⭐' : ''}
`).join('\n')}

PRICING CONTEXT:
- Budget-friendly drinks: ₹79-₹99 (fresh juices, coffee, cola)
- Affordable salads & desserts: ₹179-₹259 (caesar salad, cheesecake, tiramisu)
- Value burgers & pasta: ₹219-₹349 (classic cheeseburger, carbonara, lasagna)
- Premium pizzas & sushi: ₹329-₹459 (all specialty items under ₹500)
- Complete meals possible under ₹500 for individuals
- Family combos can be suggested within budget ranges

DIETARY INFORMATION:
- Vegetarian options available in all categories
- Fresh ingredients sourced daily
- Customization available for most items
- Allergen information available upon request
- Healthy options like quinoa bowls and fresh salads

SPECIAL FEATURES:
- All items priced affordably under ₹500
- No compromise on quality despite affordable pricing
- Student-friendly pricing
- Great value for money
- Perfect for budget-conscious food lovers

INSTRUCTIONS:
- Be helpful, friendly, and knowledgeable about our menu
- Emphasize our affordable pricing while maintaining quality
- Provide specific recommendations based on customer preferences and budget
- Answer questions about ingredients, pricing, ratings, and categories
- Help customers find items that match their dietary needs or preferences
- Provide information about popular items and chef recommendations
- Be conversational and engaging
- If asked about items not on our menu, politely explain we don't have them but suggest similar alternatives
- Always maintain a professional yet friendly tone
- Help with order suggestions and combinations
- Provide nutritional guidance when possible based on ingredients mentioned in descriptions
- Suggest complementary items (e.g., drinks with meals, desserts after main courses)
- Help customers stay within their budget if they mention price constraints
- Recommend popular items and explain why they're customer favorites
- Highlight the value proposition - premium quality at affordable prices

Remember: You represent FoodieExpress and should always be helpful in assisting customers with their food ordering experience. Be proactive in making suggestions and creating a delightful customer service experience while emphasizing our commitment to quality food at affordable prices.
`;
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const context = generateRestaurantContext();
      const prompt = `${context}\n\nCustomer Question: ${inputText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const plainText = text.replace(/\*\*(.*?)\*\*/g, '$1'); // ✅ remove markdown bold

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: plainText,
        isUser: false,
        timestamp: new Date(),
      };


      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment or contact our support team at +91 98765 43210 for immediate assistance.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                  <Bot className="w-6 h-6" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">FoodieExpress Assistant</h3>
                  <p className="text-xs text-blue-100">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}>
                      {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                      message.isUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white text-gray-600 border-2 border-gray-200">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white text-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm">Wait🤤</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about our menu, recommendations..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all duration-200"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Ask about menu, prices, recommendations
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;