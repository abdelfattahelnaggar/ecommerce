"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const handleRegister = async (values: RegisterSchemaType) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        values
      );

      // Success toast
      toast.success("Account created successfully!", {
        position: "top-center",
        duration: 4000,
        icon: <i className="fas fa-check-circle text-green-600"></i>,
        style: {
          color: "#16a34a", // Green color for message
        },
      });

      router.push("/login");
    } catch (error: unknown) {
      // Error toast
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-center",
        duration: 5000,
        icon: <i className="fas fa-times-circle text-red-600"></i>,
        action: {
          label: "Retry",
          onClick: () => {
            form.reset();
          },
        },
        style: {
          color: "#dc2626", // Red color for message
        },
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-user-plus text-white text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Create your account
          </h2>
          <p className="text-slate-600">
            Join us and start your shopping journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
     <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="space-y-6"
            >
              {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Create a strong password"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
            <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Phone Number
                    </FormLabel>
              <FormControl>
                      <div className="relative">
                        <Input
                          type="tel"
                          placeholder="01012345678"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
              </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
            </FormItem>
          )}
        />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 mt-8"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>
                    Create Account
                  </>
                )}
              </Button>
      </form>
     </Form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-slate-200">
            <p className="text-slate-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-slate-800 hover:text-slate-600 font-medium hover:underline transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
