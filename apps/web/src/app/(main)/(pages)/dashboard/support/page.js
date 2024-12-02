import PageHeader from "@/components/dashboard/header/PageHeader";
import SupportContent from "@/components/dashboard/support/SupportContent";

export default function SupportPage() {
  return (
    <div className="min-h-full bg-background-dark">
      <PageHeader 
        title="Get Support" 
        description="Tell us about feature requests and bugs"
      />
      
      <div className="p-8">
        <SupportContent />
      </div>
    </div>
  );
}
