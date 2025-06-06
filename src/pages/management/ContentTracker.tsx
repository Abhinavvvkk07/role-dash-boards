import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rss, Mail, PlayCircle } from "lucide-react";

// Sample data - In a real app, this would come from an API
const contentMetrics = {
  feedPosts: {
    lastPost: 2, // days
    totalPosts: 145,
    pendingApproval: 3,
    recentPosts: [
      { id: 1, title: "Summer Collection Preview", status: "approved", date: "2024-05-10", engagement: 892 },
      { id: 2, title: "Behind the Scenes", status: "approved", date: "2024-05-09", engagement: 756 },
      { id: 3, title: "New Product Launch", status: "pending", date: "2024-05-08", engagement: 0 },
    ]
  },
  massMessages: {
    lastMessage: 1, // days
    totalMessages: 89,
    pendingApproval: 2,
    recentMessages: [
      { id: 1, title: "Weekend Special Offer", status: "approved", date: "2024-05-10", opens: 2341 },
      { id: 2, title: "Exclusive Content Alert", status: "approved", date: "2024-05-09", opens: 1892 },
      { id: 3, title: "Member Appreciation", status: "pending", date: "2024-05-08", opens: 0 },
    ]
  },
  ppvContent: {
    lastPPV: 3, // days
    totalPPV: 67,
    pendingApproval: 1,
    recentPPV: [
      { id: 1, title: "Exclusive Photoshoot", status: "approved", date: "2024-05-10", sales: 156 },
      { id: 2, title: "Behind the Scenes Video", status: "approved", date: "2024-05-09", sales: 98 },
      { id: 3, title: "Special Collection", status: "pending", date: "2024-05-08", sales: 0 },
    ]
  }
};

export function ContentTracker() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Content Tracker</h2>
        <p className="text-muted-foreground">
          Monitor content performance and approval status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Feed Posts
            </CardTitle>
            <Rss className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentMetrics.feedPosts.lastPost} days</div>
            <p className="text-xs text-muted-foreground">
              since last post
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                Total Posts: <span className="font-medium">{contentMetrics.feedPosts.totalPosts}</span>
              </div>
              <div className="text-sm text-yellow-500">
                Pending Approval: <span className="font-medium">{contentMetrics.feedPosts.pendingApproval}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mass Messages
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentMetrics.massMessages.lastMessage} days</div>
            <p className="text-xs text-muted-foreground">
              since last message
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                Total Messages: <span className="font-medium">{contentMetrics.massMessages.totalMessages}</span>
              </div>
              <div className="text-sm text-yellow-500">
                Pending Approval: <span className="font-medium">{contentMetrics.massMessages.pendingApproval}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              PPV Content
            </CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentMetrics.ppvContent.lastPPV} days</div>
            <p className="text-xs text-muted-foreground">
              since last PPV
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                Total PPV: <span className="font-medium">{contentMetrics.ppvContent.totalPPV}</span>
              </div>
              <div className="text-sm text-yellow-500">
                Pending Approval: <span className="font-medium">{contentMetrics.ppvContent.pendingApproval}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content History</CardTitle>
          <CardDescription>
            Recent content and their performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="feed" className="space-y-4">
            <TabsList>
              <TabsTrigger value="feed">Feed Posts</TabsTrigger>
              <TabsTrigger value="messages">Mass Messages</TabsTrigger>
              <TabsTrigger value="ppv">PPV Content</TabsTrigger>
            </TabsList>
            <TabsContent value="feed">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {contentMetrics.feedPosts.recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${
                          post.status === 'approved' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {post.status}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {post.engagement} engagements
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="messages">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {contentMetrics.massMessages.recentMessages.map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{message.title}</h3>
                        <p className="text-sm text-muted-foreground">{message.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${
                          message.status === 'approved' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {message.status}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {message.opens} opens
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="ppv">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {contentMetrics.ppvContent.recentPPV.map((ppv) => (
                    <div key={ppv.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{ppv.title}</h3>
                        <p className="text-sm text-muted-foreground">{ppv.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${
                          ppv.status === 'approved' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {ppv.status}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ppv.sales} sales
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 