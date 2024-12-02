import PageHeader from "@/components/dashboard/header/PageHeader";
import ProfileSettings from "@/components/dashboard/profile/ProfileSettings";
import SSHKeys from "@/components/dashboard/profile/SSHKeys";

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-background-dark">
      <PageHeader 
        title="Your Profile" 
        description="Manage your settings"
      />
      
      <div className="p-8 space-y-6">
        <ProfileSettings />
        <SSHKeys />
      </div>
    </div>
  );
}
