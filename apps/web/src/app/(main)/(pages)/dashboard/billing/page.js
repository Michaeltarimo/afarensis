import PageHeader from "@/components/dashboard/header/PageHeader";
import BalanceSection from "@/components/dashboard/billing/BalanceSection";
import TransactionsGraph from "@/components/dashboard/billing/TransactionsGraph";
import WalletTopUps from "@/components/dashboard/billing/WalletTopUps";
import BillingSummary from "@/components/dashboard/billing/BillingSummary";

export default function BillingPage() {
  return (
    <div className="min-h-full bg-background-dark">
      <PageHeader 
        title="Billing" 
        description="Your transactions and billing history"
      />
      
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BalanceSection />
          <TransactionsGraph />
        </div>
        <BillingSummary />
        <WalletTopUps />
      </div>
    </div>
  );
}
