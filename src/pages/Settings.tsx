
import { Layout } from "@/components/layout/Layout";
import { APIConfiguration } from "@/components/settings/APIConfiguration";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Key, Database, Bell } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <SettingsIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Configure your market data sources and application preferences
            </p>
          </div>

          <Tabs defaultValue="api" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Configuration
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Sources
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api">
              <APIConfiguration />
            </TabsContent>

            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Data Source Preferences</CardTitle>
                  <CardDescription>
                    Configure how market data is fetched and displayed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Update Intervals</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• Stocks: 3-5 seconds</p>
                          <p>• Commodities: 10 seconds</p>
                          <p>• News: 5 minutes</p>
                          <p>• VIX: 5 seconds</p>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Market Hours</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• NYSE: 9:30 AM - 4:00 PM EST</p>
                          <p>• B3: 10:00 AM - 5:00 PM BRT</p>
                          <p>• Updates slower when closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure alerts and notifications for market events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Notification settings will be available in future updates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
