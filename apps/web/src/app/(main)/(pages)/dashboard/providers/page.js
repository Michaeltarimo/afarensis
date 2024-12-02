import PageHeader from "@/components/dashboard/header/PageHeader";
import ProvidersSettings from "@/components/dashboard/providers/ProvidersSettings";

export default function ProvidersPage() {
  return (
    <div className="min-h-full bg-background-dark">
      <PageHeader 
        title="Providers" 
        description="Our Afarensis hosted solution manages all your providers and payments by default. Optionally, you can connect your own provider accounts by providing us with the specific API keys."
      />
      
      <div className="p-8">
        <ProvidersSettings />
      </div>
    </div>
  );
}
