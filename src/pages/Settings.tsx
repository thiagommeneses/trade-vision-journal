import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  BarChart4,
  Settings as SettingsIcon, 
  Save,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().optional(),
});

// Trading preferences schema
const tradingPreferencesSchema = z.object({
  defaultAsset: z.string(),
  defaultQuantity: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Quantity must be a positive number" }
  ),
  monthlyGoal: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Monthly goal must be a positive number" }
  ),
  dailyTradeGoal: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Daily trade goal must be a positive number" }
  ),
  tradingSessionStart: z.string(),
  tradingSessionEnd: z.string(),
});

// Notification preferences schema
const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  tradingReminders: z.boolean().default(true),
  marketAlerts: z.boolean().default(true),
  weeklyReports: z.boolean().default(true),
});

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
    },
  });

  // Trading preferences form
  const tradingForm = useForm<z.infer<typeof tradingPreferencesSchema>>({
    resolver: zodResolver(tradingPreferencesSchema),
    defaultValues: {
      defaultAsset: "mini-indice",
      defaultQuantity: "1",
      monthlyGoal: "10000",
      dailyTradeGoal: "5",
      tradingSessionStart: "09:00",
      tradingSessionEnd: "17:30",
    },
  });

  // Notification preferences form
  const notificationForm = useForm<z.infer<typeof notificationPreferencesSchema>>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      emailNotifications: true,
      tradingReminders: true,
      marketAlerts: true,
      weeklyReports: true,
    },
  });

  // Handle profile form submission
  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  // Handle trading preferences form submission
  const onTradingSubmit = (values: z.infer<typeof tradingPreferencesSchema>) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      
      toast({
        title: "Trading preferences updated",
        description: "Your trading preferences have been updated successfully.",
      });
    }, 1000);
  };

  // Handle notification preferences form submission
  const onNotificationSubmit = (values: z.infer<typeof notificationPreferencesSchema>) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-20 pb-20 animate-fade-in">
        <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 w-full md:w-auto mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Account Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and how it appears on your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="flex-1 space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about yourself as a trader" 
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description about your trading experience and style.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <>Saving...</>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Password
                  </CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <FormLabel>Current Password</FormLabel>
                        <Input type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <FormLabel>New Password</FormLabel>
                        <Input type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input type="password" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Trading Tab */}
            <TabsContent value="trading" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart4 className="h-5 w-5 mr-2" />
                    Trading Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure your default trading settings and goals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...tradingForm}>
                    <form onSubmit={tradingForm.handleSubmit(onTradingSubmit)} className="space-y-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={tradingForm.control}
                          name="defaultAsset"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Asset</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select default asset" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="mini-indice">Mini Índice</SelectItem>
                                  <SelectItem value="mini-dolar">Mini Dólar</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Default asset to trade
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={tradingForm.control}
                          name="defaultQuantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Quantity</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="1"
                                  placeholder="1" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Default quantity for your trades
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={tradingForm.control}
                          name="monthlyGoal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Profit Goal (R$)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="0"
                                  placeholder="10000" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Your monthly profit target
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={tradingForm.control}
                          name="dailyTradeGoal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Daily Trade Goal</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="1"
                                  placeholder="5" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Number of trades to execute daily
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={tradingForm.control}
                          name="tradingSessionStart"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Trading Session Start</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type="time"
                                    {...field} 
                                  />
                                </FormControl>
                                <Clock className="absolute top-2.5 right-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormDescription>
                                When your trading day begins
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={tradingForm.control}
                          name="tradingSessionEnd"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Trading Session End</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type="time"
                                    {...field} 
                                  />
                                </FormControl>
                                <Clock className="absolute top-2.5 right-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormDescription>
                                When your trading day ends
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>Saving...</>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Preferences
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and alerts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationForm}>
                    <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive email notifications about your activities
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="tradingReminders"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Trading Reminders</FormLabel>
                              <FormDescription>
                                Receive reminders about your trading schedule
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="marketAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Market Alerts</FormLabel>
                              <FormDescription>
                                Receive alerts about market events and opportunities
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="weeklyReports"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Weekly Reports</FormLabel>
                              <FormDescription>
                                Receive weekly performance reports
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>Saving...</>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Preferences
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
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
