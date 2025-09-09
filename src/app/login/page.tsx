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
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const handleLogin = async (values: LoginSchemaType) => {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      // Success toast
      toast.success("Login successful!", {
        position: "top-center",
        duration: 4000,
        icon: <i className="fas fa-check-circle text-green-600"></i>,
        style: {
          color: "#16a34a", // Green color for message
        },
      });

      router.push("/");
    } catch (error: unknown) {
      // Error toast
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        "Login failed. Please try again.";

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
            <i className="fas fa-sign-in-alt text-white text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Login to your account
          </h2>
          <p className="text-slate-600">Welcome back to FreshCart</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6"
            >
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
                          placeholder="Enter your password"
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 mt-8"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Login
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-slate-200">
            <p className="text-slate-600">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-slate-800 font-medium hover:underline transition-colors hover:text-slate-600"
              >
                Sign up here
              </a>
            </p>
          </div>
          {/* Forgot Password Section */}
          <div className="text-center mt-6">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-center mb-2">
                <i className="fas fa-key text-slate-600 mr-2"></i>
                <span className="text-slate-700 font-medium">
                  Need help accessing your account?
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-3">
                Don&apos;t worry! It happens to the best of us.
              </p>
              <a
                href="/forgot-password"
                className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm"
              >
                <i className="fas fa-unlock-alt mr-2"></i>
                Reset Your Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
