import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Smile, Settings } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
    },
    {
      text: "Salut ! J'ai une question concernant votre service.",
      isUser: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: inputValue, isUser: true }]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Merci pour votre message ! Je suis en train de traiter votre demande.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <Card className="flex flex-col h-screen border-0 rounded-none sm:h-[calc(100vh-40px)] sm:m-5 sm:rounded-lg sm:border">
        <Tabs defaultValue="chat" className="flex flex-col h-full">
          <CardHeader className="px-4 pb-0 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
          </CardHeader>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col data-[state=inactive]:hidden"
          >
            <ChatInterface
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
              messagesEndRef={messagesEndRef as any}
            />
          </TabsContent>

          <TabsContent
            value="settings"
            className="flex-1 data-[state=inactive]:hidden"
          >
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  messagesEndRef,
}) => {
  return (
    <>
      {/* Chat header */}
      <div className="px-4 py-2 border-b">
        <CardTitle className="text-lg">Assistant virtuel</CardTitle>
        <CardDescription>Disponible 24/7 pour vous aider</CardDescription>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } gap-2`}
            >
              {!message.isUser && (
                <Avatar className="h-8 w-8 bg-primary">
                  <div className="text-xs font-medium text-primary-foreground">
                    AI
                  </div>
                </Avatar>
              )}

              <div
                className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg break-words ${
                  message.isUser
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                }`}
              >
                {message.text}
              </div>

              {message.isUser && (
                <Avatar className="h-8 w-8 bg-secondary">
                  <div className="text-xs font-medium text-secondary-foreground">
                    You
                  </div>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Smile className="h-5 w-5" />
          </Button>

          <Input
            type="text"
            placeholder="Écrivez votre message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />

          <Button
            size="icon"
            onClick={handleSendMessage}
            className="rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

const SettingsTab = () => {
  return (
    <CardContent className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3 pb-6">
          <Settings className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Paramètres du chatbot</h2>
          <p className="text-center text-muted-foreground">
            Personnalisez l'expérience du chat selon vos préférences
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Mode sombre</Label>
              <p className="text-sm text-muted-foreground">
                Activer le thème sombre pour réduire la fatigue oculaire
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications pour les nouveaux messages
              </p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sounds">Sons</Label>
              <p className="text-sm text-muted-foreground">
                Activer les sons pour les notifications
              </p>
            </div>
            <Switch id="sounds" />
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default Chat;
