"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import getUserAddresses, { UserAddress } from "@/apis/userAddresses";
import changePassword, { ChangePasswordData } from "@/apis/changePassword";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import avatar from "@/Assets/screens/Naruto.jpg";
import Image from "next/image";
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      if (status === "authenticated" && session?.accessToken) {
        try {
          setAddressesLoading(true);
          const data = await getUserAddresses(session.accessToken);
          if (data) {
            setAddresses(data.data);
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        } finally {
          setAddressesLoading(false);
        }
      } else if (status === "unauthenticated") {
        setAddressesLoading(false);
      }
    };

    fetchAddresses();
  }, [status, session?.accessToken]);

  const handleChangePassword = async () => {
    if (!session?.accessToken) {
      toast.error("Please sign in to change your password");
      return;
    }

    // Validation
    if (!passwordData.currentPassword || !passwordData.password || !passwordData.rePassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.password !== passwordData.rePassword) {
      toast.error("New password and confirmation password do not match");
      return;
    }

    if (passwordData.password.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    setChangingPassword(true);
    try {
      await changePassword(passwordData, session.accessToken);
      
      // Reset form
      setPasswordData({
        currentPassword: "",
        password: "",
        rePassword: "",
      });
      setIsChangePasswordOpen(false);
      
      toast.success("Password changed successfully! Redirecting to login...", {
        duration: 3000,
      });
      
      // Sign out user so they can sign in with new password
      setTimeout(() => {
        signOut({ 
          callbackUrl: "/login",
          redirect: true 
        });
      }, 2000); // Wait 2 seconds to show success message
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setChangingPassword(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <i className="fas fa-lock text-4xl text-slate-400 mb-4"></i>
              <h2 className="text-xl font-semibold text-slate-700 mb-2">
                Access Denied
              </h2>
              <p className="text-slate-500 mb-4">
                Please log in to view your profile.
              </p>
              <Button asChild className="w-full">
                <a href="/login">Go to Login</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image
                      src={avatar}
                      alt="avatar"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">
                    {session?.user?.name}
                  </h3>
                  <p className="text-slate-600 mb-3">{session?.user?.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Personal Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>

                    <p className="mt-1 text-slate-900">{session?.user?.name}</p>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>

                    <p className="mt-1 text-slate-900">
                      {session?.user?.email}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="address">Addresses</Label>

                    {addressesLoading ? (
                      <div className="mt-2 flex items-center text-slate-600">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Loading addresses...
                      </div>
                    ) : addresses.length > 0 ? (
                      <div className="mt-2 space-y-3">
                        {addresses.map((address) => (
                          <div
                            key={address._id}
                            className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-slate-900">
                                {address.name}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {address.city}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-700 mb-1">
                              {address.details}
                            </p>
                            <p className="text-sm text-slate-600">
                              📞 {address.phone}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-slate-500 italic">
                        No addresses found. Add your first address to get
                        started.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Manage Addresses
                    </h4>
                    <p className="text-sm text-slate-600">
                      Add, edit, or remove your delivery addresses
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push('/addresses')}
                  >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    Manage
                  </Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Change Password
                    </h4>
                    <p className="text-sm text-slate-600">
                      Update your account password for security
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsChangePasswordOpen(true)}
                  >
                    <i className="fas fa-key mr-2"></i>
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Change Password Dialog */}
        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new password.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password (min 6 characters)"
                  value={passwordData.password}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={passwordData.rePassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, rePassword: e.target.value }))}
                />
              </div>
              {passwordData.password && passwordData.rePassword && passwordData.password !== passwordData.rePassword && (
                <p className="text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsChangePasswordOpen(false);
                  setPasswordData({
                    currentPassword: "",
                    password: "",
                    rePassword: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={changingPassword || passwordData.password !== passwordData.rePassword}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {changingPassword ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : (
                  <i className="fas fa-key mr-2"></i>
                )}
                {changingPassword ? "Changing..." : "Change Password"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
