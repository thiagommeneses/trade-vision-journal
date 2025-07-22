
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function APIConfiguration() {
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState({
    alphaVantage: localStorage.getItem('alphaVantage_api_key') || '',
    financialModelingPrep: localStorage.getItem('fmp_api_key') || '',
    polygon: localStorage.getItem('polygon_api_key') || '',
    iexCloud: localStorage.getItem('iex_api_key') || '',
  });
  const { toast } = useToast();

  const handleSave = () => {
    // Save to localStorage (in a real app, this would be saved securely)
    Object.entries(keys).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(`${key}_api_key`, value);
      } else {
        localStorage.removeItem(`${key}_api_key`);
      }
    });

    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved locally. Refresh the page to use real market data.",
    });
  };

  const apiProviders = [
    {
      name: "Alpha Vantage",
      key: "alphaVantage",
      description: "15 requests/min free, global stocks, forex, crypto",
      url: "https://www.alphavantage.co/support/#api-key",
      status: keys.alphaVantage ? "configured" : "missing"
    },
    {
      name: "Financial Modeling Prep",
      key: "financialModelingPrep", 
      description: "250 requests/day free, comprehensive financial data",
      url: "https://financialmodelingprep.com/developer/docs",
      status: keys.financialModelingPrep ? "configured" : "missing"
    },
    {
      name: "Polygon.io",
      key: "polygon",
      description: "5 requests/min free, real-time and historical data",
      url: "https://polygon.io/",
      status: keys.polygon ? "configured" : "missing"
    },
    {
      name: "IEX Cloud",
      key: "iexCloud",
      description: "500k requests/month free, US market data",
      url: "https://iexcloud.io/",
      status: keys.iexCloud ? "configured" : "missing"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Market Data APIs
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeys(!showKeys)}
            >
              {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </CardTitle>
          <CardDescription>
            Configure API keys to access real-time market data. Without API keys, the app will use simulated data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              API keys are stored locally in your browser. For production use, implement secure server-side storage.
            </AlertDescription>
          </Alert>

          {apiProviders.map((provider) => (
            <div key={provider.key} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{provider.name}</h3>
                    {provider.status === "configured" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={provider.url} target="_blank" rel="noopener noreferrer">
                    Get API Key <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">{provider.description}</p>
              
              <div className="space-y-2">
                <Label htmlFor={provider.key}>API Key</Label>
                <Input
                  id={provider.key}
                  type={showKeys ? "text" : "password"}
                  value={keys[provider.key as keyof typeof keys]}
                  onChange={(e) => setKeys(prev => ({
                    ...prev,
                    [provider.key]: e.target.value
                  }))}
                  placeholder={`Enter your ${provider.name} API key`}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button onClick={handleSave}>
              Save API Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sources Status</CardTitle>
          <CardDescription>
            Current status of your configured data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiProviders.map((provider) => (
              <div key={provider.key} className="flex items-center justify-between p-3 border rounded">
                <span className="font-medium">{provider.name}</span>
                <div className="flex items-center gap-2">
                  {provider.status === "configured" ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Active</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-orange-600">Not Configured</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
