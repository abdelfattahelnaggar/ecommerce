"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword, verifyResetCode, resetPassword } from "@/apis/resetPassword";
import { toast } from "sonner";
import Link from "next/link";

type ResetStep = "email" | "code" | "password" | "success";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ResetStep>("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendResetEmail = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword({ email });
      toast.success("Reset code sent to your email successfully!");
      setCurrentStep("code");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send reset email";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!resetCode) {
      toast.error("Please enter the reset code");
      return;
    }

    if (resetCode.length !== 6) {
      toast.error("Reset code must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      await verifyResetCode({ resetCode });
      toast.success("Reset code verified successfully!");
      setCurrentStep("password");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid reset code";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ email, newPassword });
      toast.success("Password reset successfully!");
      setCurrentStep("success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: "email", label: "Email", icon: "fas fa-envelope" },
      { key: "code", label: "Verify", icon: "fas fa-key" },
      { key: "password", label: "Reset", icon: "fas fa-lock" },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep === step.key || 
                  (currentStep === "success" && step.key === "password") ||
                  (currentStep === "password" && step.key === "code") ||
                  (currentStep === "code" && step.key === "email")
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                <i className={step.icon}></i>
              </div>
              <span className="text-xs mt-1 text-slate-600">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 transition-colors ${
                  (currentStep === "code" && index === 0) ||
                  (currentStep === "password" && index <= 1) ||
                  (currentStep === "success" && index <= 1)
                    ? "bg-blue-600"
                    : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
              Reset Password
            </CardTitle>
            <p className="text-slate-600 text-sm">
              {currentStep === "email" && "Enter your email to receive a reset code"}
              {currentStep === "code" && "Enter the 6-digit code sent to your email"}
              {currentStep === "password" && "Enter your new password"}
              {currentStep === "success" && "Password reset completed successfully"}
            </p>
          </CardHeader>

          <CardContent>
            {currentStep !== "success" && renderStepIndicator()}

            {/* Step 1: Email Input */}
            {currentStep === "email" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendResetEmail()}
                  />
                </div>
                <Button
                  onClick={handleSendResetEmail}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <i className="fas fa-paper-plane mr-2"></i>
                  )}
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </div>
            )}

            {/* Step 2: Code Verification */}
            {currentStep === "code" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resetCode">Reset Code</Label>
                  <Input
                    id="resetCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Check your email for the 6-digit verification code
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={handleVerifyCode}
                    disabled={loading || resetCode.length !== 6}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                    ) : (
                      <i className="fas fa-check mr-2"></i>
                    )}
                    {loading ? "Verifying..." : "Verify Code"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("email")}
                    className="w-full"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Email
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: New Password */}
            {currentStep === "password" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                  />
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={handleResetPassword}
                    disabled={loading || newPassword !== confirmPassword || !newPassword}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                    ) : (
                      <i className="fas fa-unlock-alt mr-2"></i>
                    )}
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("code")}
                    className="w-full"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Code
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {currentStep === "success" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-2xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Password Reset Successful!
                </h3>
                <p className="text-slate-600 text-sm">
                  Your password has been reset successfully. You can now sign in with your new password.
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Go to Login
                </Button>
              </div>
            )}

            {/* Back to Login Link */}
            {currentStep !== "success" && (
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <i className="fas fa-arrow-left mr-1"></i>
                  Back to Login
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;