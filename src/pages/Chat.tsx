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

const mockData = {
  Nom: "CALANDRE",
  Famille: null,
  Type: "CALANDRE BUANDERIE",
  "ID Équipement": "2F 120",
  "Référence constructeur": null,
  "Date d'installation": null,
  Notes: null,
  Secteur: "HDCER",
  Bâtiment: "Bâtiment Astoria",
  Adresse: "1 Chemin de la Liberté, 72527 Bordeaux",
  Niveau: null,
  Salle: null,
  "Cage d'escalier": null,
  "Opérationnel/HS": "Opérationnel",
  Validation: "Validé",
};

interface Equipment {
  Nom: string;
  Famille: string | null;
  Type: string;
  "ID Équipement": string;
  "Référence constructeur": string | null;
  "Date d'installation": string | null;
  Notes: string | null;
  Secteur: string;
  Bâtiment: string;
  Adresse: string;
  Niveau: string | null;
  Salle: string | null;
  "Cage d'escalier": string | null;
  "Opérationnel/HS": string;
  Validation: string;
}

const EquipmentCard = ({ equipment }: { equipment: Equipment }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{equipment.Nom}</h2>
      <p>
        <strong>Type:</strong> {equipment.Type}
      </p>
      <p>
        <strong>ID Équipement:</strong> {equipment["ID Équipement"]}
      </p>
      <p>
        <strong>Secteur:</strong> {equipment.Secteur}
      </p>
      <p>
        <strong>Bâtiment:</strong> {equipment.Bâtiment}
      </p>
      <p>
        <strong>Adresse:</strong> {equipment.Adresse}
      </p>
      <p>
        <strong>Statut:</strong> {equipment["Opérationnel/HS"]}
      </p>
      <p>
        <strong>Validation:</strong> {equipment.Validation}
      </p>
    </div>
  );
};

const EquipmentList = () => {
  return (
    <div className="p-6 mx-10">
      <h1 className="text-2xl font-bold mb-4">Fiches Techniques</h1>
      <EquipmentCard equipment={mockData} />
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    setMessages([...messages, { text: inputValue, isUser: true }]);
    setInputValue("");

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
              <TabsTrigger value="settings">Equipement</TabsTrigger>
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
            <EquipmentList />
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
      <div className="px-4 py-2 border-b">
        <CardTitle className="text-lg">Assistant virtuel</CardTitle>
        <CardDescription>Disponible 24/7 pour vous aider</CardDescription>
      </div>

      <ScrollArea
        className="flex-1 px-8 py-6"
        style={{
          marginRight: "2rem",
          marginLeft: "2rem",
          marginTop: "5rem",
          padding: "0.5rem",
        }}
      >
        {" "}
        <div className="space-y-4 flex flex-col items-center">
          {" "}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-full max-w-2xl ${
                message.isUser ? "justify-end" : "justify-start"
              } gap-3`}
            >
              {!message.isUser && (
                <Avatar
                  className="h-8 w-8 bg-primary flex text-center flex-shrink-0"
                  style={{
                    marginRight: "2rem",
                    marginLeft: "2rem",
                    padding: "0.5rem",
                  }}
                >
                  <div className="text-xs font-medium text-primary-foreground">
                    AI
                  </div>
                </Avatar>
              )}

              <div
                className={`px-6 py-3 rounded-lg text-base max-w-[85%] md:max-w-[65%] lg:max-w-[50%] break-words ${
                  message.isUser
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                }`}
                style={{
                  marginRight: "2rem",
                  marginLeft: "2rem",
                  padding: "0.5rem",
                }}
              >
                {message.text}
              </div>

              {message.isUser && (
                <Avatar
                  className="h-8 w-8 bg-secondary flex flex-shrink-0"
                  style={{
                    marginRight: "2rem",
                    marginLeft: "2rem",
                    padding: "0.5rem",
                  }}
                >
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

      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-3 w-full">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-12 w-12 flex items-center justify-center"
          >
            <Smile className="h-6 w-6 text-black" />
          </Button>

          <Input
            type="text"
            placeholder="Écrivez votre message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-12 px-5 py-3 text-black rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            style={{ marginRight: "2rem", marginLeft: "2rem", height: "2rem" }}
          />

          <Button
            size="icon"
            onClick={handleSendMessage}
            className="rounded-full h-12 w-12 flex items-center justify-center"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
