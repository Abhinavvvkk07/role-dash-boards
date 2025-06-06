import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Save } from 'lucide-react';

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
}

const MOCK_PROFILES: Record<string, UserProfile> = {
  employee: {
    fullName: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Employee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  management: {
    fullName: 'Sara Johnson',
    email: 'sara.johnson@company.com',
    role: 'Management',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara'
  },
  admin: {
    fullName: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    role: 'Administrator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa'
  }
};

export function ProfilePage() {
  const userRole = localStorage.getItem('userRole') || 'employee';
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILES[userRole]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, you would save to backend here
  };

  const handleImageUpload = () => {
    // In a real app, this would open a file picker
    alert('Image upload functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Image and Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="w-32 h-32 rounded-full bg-muted"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0"
                  onClick={handleImageUpload}
                >
                  <Camera size={16} />
                </Button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{profile.fullName}</h2>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={isEditing ? editedProfile.fullName : profile.fullName}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, fullName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={profile.role}
                  disabled
                />
              </div>

              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      onClick={handleSaveProfile}
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedProfile(profile);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => alert('Change password functionality would be implemented here')}
              >
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 