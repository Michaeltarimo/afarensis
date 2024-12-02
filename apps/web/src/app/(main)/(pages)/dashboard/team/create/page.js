import PageHeader from "@/components/dashboard/header/PageHeader";
import CreateTeamForm from "@/components/dashboard/team/CreateTeamForm";

export default function CreateTeamPage() {
  return (
    <div className="min-h-full bg-background-dark">
      <PageHeader 
        title="Create Team" 
        description="Create a new team workspace to collaborate on GPU instances and manage shared resources"
      />
      
      <div className="p-8">
        <CreateTeamForm />
      </div>
    </div>
  );
}
