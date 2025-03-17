
import { Layout } from "@/components/layout/Layout";
import { TradeEntryForm } from "@/components/forms/TradeEntryForm";

const TradeEntry = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 pt-20 pb-20 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Add New Diary Entry</h1>
            <p className="text-muted-foreground">
              Record your trade details, analyze your decisions, and reflect on your trading psychology.
            </p>
          </div>
          
          <TradeEntryForm />
        </div>
      </div>
    </Layout>
  );
};

export default TradeEntry;
