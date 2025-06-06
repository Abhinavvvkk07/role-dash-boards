import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare } from "lucide-react";

// Mock data
const directMessages = [
  { id: 1, name: "Sarah Wilson", status: "online", avatar: "/avatars/sarah.jpg", message: "Hey! Just finished the report." },
  { id: 2, name: "Michael Chen", status: "offline", avatar: "/avatars/michael.jpg", message: "When is the next meeting?" },
  { id: 3, name: "Emma Davis", status: "away", avatar: "/avatars/emma.jpg", message: "Thanks for your help!" },
];

interface SidebarTeamChatProps {
  isCollapsed: boolean;
}

export function SidebarTeamChat({ isCollapsed }: SidebarTeamChatProps) {
  const [newMessage, setNewMessage] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isCollapsed) {
    return (
      <div className="px-2 py-4">
        <Button variant="ghost" size="icon" className="w-full h-10">
          <MessageSquare size={20} />
        </Button>
      </div>
    );
  }

  return (
    <Card className="mx-2 my-4">
      <CardContent className="p-2">
        <ScrollArea className="h-[200px]">
          <div className="space-y-4 pr-4">
            {directMessages.map((dm) => (
              <div key={dm.id} className="flex items-start space-x-2">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={dm.avatar} alt={dm.name} />
                    <AvatarFallback>{dm.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-background ${getStatusColor(
                      dm.status
                    )}`}
                  />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">{dm.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{dm.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2 mt-2">
          <Input
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="h-8 text-sm"
          />
          <Button size="icon" className="h-8 w-8">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 