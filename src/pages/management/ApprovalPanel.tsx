import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Lock,
  Eye,
} from "lucide-react";

// Dummy data for pending approvals
const pendingApprovals = {
  feedPosts: [
    {
      id: "1",
      title: "New Product Launch",
      creator: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah-johnson.jpg",
      },
      submittedAt: "2024-03-15T10:30:00",
      type: "image",
      status: "pending",
      urgency: "high",
    },
    {
      id: "2",
      title: "Weekly Update",
      creator: {
        name: "Michael Brown",
        avatar: "/avatars/michael-brown.jpg",
      },
      submittedAt: "2024-03-15T09:15:00",
      type: "text",
      status: "pending",
      urgency: "medium",
    },
  ],
  massMessages: [
    {
      id: "1",
      title: "Special Offer Announcement",
      creator: {
        name: "John Smith",
        avatar: "/avatars/john-smith.jpg",
      },
      submittedAt: "2024-03-15T11:00:00",
      recipients: 1200,
      status: "pending",
      urgency: "high",
    },
  ],
  massPPV: [
    {
      id: "1",
      title: "Exclusive Content Release",
      creator: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah-johnson.jpg",
      },
      submittedAt: "2024-03-15T08:45:00",
      price: 29.99,
      status: "pending",
      urgency: "medium",
    },
  ],
};

export function ApprovalPanel() {
  const [activeTab, setActiveTab] = useState("feed-posts");

  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      high: "bg-red-500/10 text-red-500",
      medium: "bg-yellow-500/10 text-yellow-500",
      low: "bg-blue-500/10 text-blue-500",
    };
    return colors[urgency as keyof typeof colors] || "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleApprove = (id: string, type: string) => {
    // In a real app, this would make an API call to approve the content
    console.log(`Approving ${type} with ID: ${id}`);
  };

  const handleReject = (id: string, type: string) => {
    // In a real app, this would make an API call to reject the content
    console.log(`Rejecting ${type} with ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Approval Panel</h1>
        <p className="text-muted-foreground">Review and approve content submissions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feed Posts</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.feedPosts.length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mass Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.massMessages.length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mass PPV</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.massPPV.length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="feed-posts">Feed Posts</TabsTrigger>
          <TabsTrigger value="mass-messages">Mass Messages</TabsTrigger>
          <TabsTrigger value="mass-ppv">Mass PPV</TabsTrigger>
        </TabsList>

        <TabsContent value="feed-posts">
          <Card>
            <CardHeader>
              <CardTitle>Pending Feed Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.feedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.creator.avatar} />
                            <AvatarFallback>{post.creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{post.creator.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.type}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(post.submittedAt)}</TableCell>
                      <TableCell>
                        <Badge className={getUrgencyBadge(post.urgency)}>
                          {post.urgency.charAt(0).toUpperCase() + post.urgency.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleApprove(post.id, 'feed-post')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleReject(post.id, 'feed-post')}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mass-messages">
          <Card>
            <CardHeader>
              <CardTitle>Pending Mass Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.massMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.creator.avatar} />
                            <AvatarFallback>{message.creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{message.creator.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{message.title}</TableCell>
                      <TableCell>{message.recipients.toLocaleString()}</TableCell>
                      <TableCell>{formatDate(message.submittedAt)}</TableCell>
                      <TableCell>
                        <Badge className={getUrgencyBadge(message.urgency)}>
                          {message.urgency.charAt(0).toUpperCase() + message.urgency.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleApprove(message.id, 'mass-message')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleReject(message.id, 'mass-message')}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mass-ppv">
          <Card>
            <CardHeader>
              <CardTitle>Pending Mass PPV</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.massPPV.map((ppv) => (
                    <TableRow key={ppv.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ppv.creator.avatar} />
                            <AvatarFallback>{ppv.creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{ppv.creator.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{ppv.title}</TableCell>
                      <TableCell>${ppv.price}</TableCell>
                      <TableCell>{formatDate(ppv.submittedAt)}</TableCell>
                      <TableCell>
                        <Badge className={getUrgencyBadge(ppv.urgency)}>
                          {ppv.urgency.charAt(0).toUpperCase() + ppv.urgency.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleApprove(ppv.id, 'mass-ppv')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleReject(ppv.id, 'mass-ppv')}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 