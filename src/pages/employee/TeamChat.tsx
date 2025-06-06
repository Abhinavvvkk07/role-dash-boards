import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Image as ImageIcon,
  Paperclip,
  Smile,
  Search,
  MoreVertical,
  Phone,
  Video,
  Users,
} from "lucide-react";
import { format } from "date-fns";

// Mock data
const channels = [
  { id: 1, name: "General", unread: 2 },
  { id: 2, name: "Development", unread: 0 },
  { id: 3, name: "Design", unread: 5 },
  { id: 4, name: "Marketing", unread: 0 },
];

const directMessages = [
  { id: 1, name: "Sarah Wilson", status: "online", avatar: "/avatars/sarah.jpg" },
  { id: 2, name: "Michael Chen", status: "offline", avatar: "/avatars/michael.jpg" },
  { id: 3, name: "Emma Davis", status: "away", avatar: "/avatars/emma.jpg" },
  { id: 4, name: "James Miller", status: "online", avatar: "/avatars/james.jpg" },
];

const messages = [
  {
    id: 1,
    sender: "Sarah Wilson",
    avatar: "/avatars/sarah.jpg",
    content: "Hey team! Just finished the new feature implementation.",
    timestamp: "2024-03-20T10:30:00",
    type: "text"
  },
  {
    id: 2,
    sender: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    content: "Great work! I'll review it shortly.",
    timestamp: "2024-03-20T10:32:00",
    type: "text"
  },
  {
    id: 3,
    sender: "Emma Davis",
    avatar: "/avatars/emma.jpg",
    content: "Don't forget we have the team meeting at 2 PM.",
    timestamp: "2024-03-20T10:35:00",
    type: "text"
  }
];

export function TeamChat() {
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-12 h-full gap-4">
        {/* Sidebar */}
        <div className="col-span-3 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Channels</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    className="w-full p-2 text-left hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {channel.name}
                    </span>
                    {channel.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Direct Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Direct Messages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {directMessages.map((dm) => (
                  <button
                    key={dm.id}
                    className="w-full p-2 text-left hover:bg-accent hover:text-accent-foreground flex items-center"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={dm.avatar} alt={dm.name} />
                        <AvatarFallback>{dm.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${getStatusColor(
                          dm.status
                        )}`}
                      />
                    </div>
                    <span className="ml-2">{dm.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <Card className="col-span-9 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/sarah.jpg" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Sarah Wilson</CardTitle>
                  <CardDescription>Online</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>
                      {message.sender.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(message.timestamp), "h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <CardContent className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 