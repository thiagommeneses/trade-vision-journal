
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

// Form schema
const formSchema = z.object({
  date: z.date({
    required_error: "Trade date is required",
  }),
  hasTime: z.boolean().default(false),
  time: z.string().optional(),
  asset: z.string({
    required_error: "Asset is required",
  }),
  tradeType: z.string({
    required_error: "Trade type is required",
  }),
  quantity: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Quantity must be a positive number" }
  ),
  entryPrice: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Entry price must be a positive number" }
  ),
  exitPrice: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Exit price must be a positive number" }
  ),
  entryReason: z.string().min(3, "Entry reason is required"),
  exitReason: z.string().min(3, "Exit reason is required"),
  emotionalState: z.string().min(3, "Emotional state is required"),
  analysis: z.string().min(3, "Post-trade analysis is required"),
  notes: z.string().optional(),
});

export function TradeEntryForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profit, setProfit] = useState<number | null>(null);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      hasTime: false,
      time: "",
      asset: "",
      tradeType: "",
      quantity: "",
      entryPrice: "",
      exitPrice: "",
      entryReason: "",
      exitReason: "",
      emotionalState: "",
      analysis: "",
      notes: "",
    },
  });

  // Watch form values to calculate profit
  const watchEntryPrice = form.watch("entryPrice");
  const watchExitPrice = form.watch("exitPrice");
  const watchQuantity = form.watch("quantity");
  const watchTradeType = form.watch("tradeType");
  const watchHasTime = form.watch("hasTime");

  // Calculate profit/loss when values change
  useState(() => {
    if (
      watchEntryPrice &&
      watchExitPrice &&
      watchQuantity &&
      watchTradeType
    ) {
      const entry = parseFloat(watchEntryPrice);
      const exit = parseFloat(watchExitPrice);
      const qty = parseFloat(watchQuantity);

      if (!isNaN(entry) && !isNaN(exit) && !isNaN(qty)) {
        // For Mini Índice and Mini Dólar, each point is worth R$0.20 and R$10 respectively
        const pointValue = watchTradeType === "buy" ? 1 : -1;
        let calculatedProfit = (exit - entry) * pointValue * qty;
        
        // Apply the correct contract value based on the asset
        if (form.getValues("asset") === "mini-indice") {
          calculatedProfit *= 0.2; // R$0.20 per point
        } else if (form.getValues("asset") === "mini-dolar") {
          calculatedProfit *= 10; // R$10 per point
        }
        
        setProfit(calculatedProfit);
      }
    }
  });

  // Form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Show success message
    toast({
      title: "Trade entry saved",
      description: "Your trade diary entry has been successfully saved.",
    });
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trade Date & Time Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Trade Date & Time</h3>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Field */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Trade</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Time Switch & Field */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hasTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Add Time
                            </FormLabel>
                            <FormDescription>
                              Include time of trade
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

                    {watchHasTime && (
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Trade Time</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  placeholder="HH:MM"
                                  type="time"
                                />
                                <Clock className="absolute top-2.5 right-3 h-4 w-4 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trade Details Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Trade Details</h3>
                <Separator />
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Asset */}
                  <FormField
                    control={form.control}
                    name="asset"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traded Asset</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select asset" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mini-indice">Mini Índice</SelectItem>
                            <SelectItem value="mini-dolar">Mini Dólar</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Trade Type */}
                  <FormField
                    control={form.control}
                    name="tradeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trade Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select trade type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buy">Buy (Long)</SelectItem>
                            <SelectItem value="sell">Sell (Short)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quantity */}
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Prices Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Prices & Result</h3>
                <Separator />
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Entry Price */}
                  <FormField
                    control={form.control}
                    name="entryPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entry Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter entry price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Exit Price */}
                  <FormField
                    control={form.control}
                    name="exitPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exit Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter exit price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Calculated Profit/Loss */}
                  {profit !== null && (
                    <div className="mt-2 p-3 rounded-md bg-muted">
                      <p className="text-sm font-medium">Calculated P&L:</p>
                      <p 
                        className={cn(
                          "text-xl font-bold",
                          profit >= 0 ? "text-profit" : "text-loss"
                        )}
                      >
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(profit)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Analysis Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reasoning & Psychological State</h3>
                <Separator />
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Entry Reason */}
                  <FormField
                    control={form.control}
                    name="entryReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Entry</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe why you entered this trade"
                            className="resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Exit Reason */}
                  <FormField
                    control={form.control}
                    name="exitReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Exit</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe why you exited this trade"
                            className="resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Emotional State */}
                  <FormField
                    control={form.control}
                    name="emotionalState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Psychological & Emotional State</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe your emotional state during this trade"
                            className="resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Post-Trade Analysis & Notes */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Post-Trade Analysis & Notes</h3>
              <Separator />
              
              <div className="grid grid-cols-1 gap-6">
                {/* Post-Trade Analysis */}
                <FormField
                  control={form.control}
                  name="analysis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post-Trade Analysis</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="What did you learn from this trade? What could be improved?"
                          className="resize-none"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Additional notes about market conditions or other factors"
                          className="resize-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-8">
            <Save className="mr-2 h-4 w-4" />
            Save Trade Entry
          </Button>
        </div>
      </form>
    </Form>
  );
}
