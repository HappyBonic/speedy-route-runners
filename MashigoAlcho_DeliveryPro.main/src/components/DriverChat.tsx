
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: string;
  sender: 'customer' | 'driver';
  message: string;
  timestamp: Date;
}

interface DriverChatProps {
  deliveryId: string;
  driverName: string;
  onClose: () => void;
}

const DriverChat = ({ deliveryId, driverName, onClose }: DriverChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'driver',
      message: `Hi! I'm ${driverName}, your driver. I'm on my way to collect your order.`,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      sender: 'driver',
      message: 'I should be there in about 20 minutes. Any special instructions for delivery?',
      timestamp: new Date(Date.now() - 240000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate driver response
    setTimeout(() => {
      const responses = [
        "Thanks for letting me know!",
        "Got it, will be there soon!",
        "Perfect, see you shortly!",
        "No problem at all!",
        "On my way!"
      ];
      
      const driverResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'driver',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, driverResponse]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-ZA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-white flex items-center text-lg">
          <MessageCircle className="mr-2 h-5 w-5 text-green-500" />
          Chat with {driverName}
        </CardTitle>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto space-y-3 bg-gray-700 p-3 rounded">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'customer'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-600 text-gray-200'
                }`}
              >
                <p>{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'customer' ? 'text-red-200' : 'text-gray-400'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button
            onClick={sendMessage}
            className="bg-red-600 hover:bg-red-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverChat;
