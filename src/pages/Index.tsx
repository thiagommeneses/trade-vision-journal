
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Form schema
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Index = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Set up form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to your Trading Diary",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try demo@example.com / password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Hero/Feature Display */}
      <div className="bg-primary text-primary-foreground md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-foreground flex items-center justify-center mb-4">
              <span className="text-primary font-bold text-xl">DT</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Day Trading Diary</h1>
            <p className="text-primary-foreground/80">
              Your complete solution for tracking, analyzing, and improving your trading performance.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary-foreground mb-2">Track Your Trades</h3>
              <p className="text-sm text-primary-foreground/80">
                Record detailed trade information including entry/exit prices, reasons, and emotional state.
              </p>
            </div>
            
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary-foreground mb-2">Analyze Performance</h3>
              <p className="text-sm text-primary-foreground/80">
                Visualize your trading performance with comprehensive charts and metrics.
              </p>
            </div>
            
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary-foreground mb-2">Market Insights</h3>
              <p className="text-sm text-primary-foreground/80">
                Access real-time market data for Mini Índice and Mini Dólar on B3.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="bg-background md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Login to Your Account</h2>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your trading diary
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="youremail@example.com" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        type="password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Demo credentials: <span className="font-medium">demo@example.com / password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
