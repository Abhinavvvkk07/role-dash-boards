import { TeamChat as TeamChatComponent } from "@/components/chat/TeamChat";

export function TeamChat() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Team Communication</h2>
        <p className="text-muted-foreground">
          Chat with team members and manage communications
        </p>
      </div>
      <TeamChatComponent />
    </div>
  );
} 