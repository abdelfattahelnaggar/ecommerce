"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { checkoutOnline } from "../_action/checkout.action";

const schema = z.object({
  details: z.string().min(1, { message: "Details is required" }),
  city: z.string().min(1, { message: "City is required" }),
  phone: z.string().min(11, { message: "Phone must be at least 11 digits" }).max(15, { message: "Phone must be at most 15 digits" }),
});

const CheckOut = ({ cartId, url }: { cartId: string, url: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      details: "",
      city: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    
    try {
      const result = await checkoutOnline({ 
        cartId, 
        url, 
        shippingAddress: values 
      });

      if (result.success && result.data?.session?.url) {
        toast.success("Redirecting to payment...");
        // Redirect to payment URL
        window.location.href = result.data.session.url;
      } else {
        toast.error(result.error || "Checkout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Shipping Information
        </CardTitle>
        <p className="text-slate-600">Please provide your shipping details</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="details" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Address Details
            </label>
            <Input
              id="details"
              type="text"
              placeholder="Enter your address details"
              {...form.register("details")}
              disabled={isLoading}
              className="mt-2"
            />
            {form.formState.errors.details && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.details.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              City
            </label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              {...form.register("city")}
              disabled={isLoading}
              className="mt-2"
            />
            {form.formState.errors.city && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.city.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...form.register("phone")}
              disabled={isLoading}
              className="mt-2"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-credit-card mr-2"></i>
                Proceed to Payment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckOut;