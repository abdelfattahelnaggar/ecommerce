"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getUserAddresses, { UserAddress } from "@/apis/userAddresses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import avatar from "@/Assets/screens/Naruto.jpg";
import Image from "next/image";
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(true);

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
                      Reset Password
                    </h4>
                    <p className="text-sm text-slate-600">
                      Update your account password for security
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled
                    className="opacity-50 cursor-not-allowed"
                  >
                    <i className="fas fa-key mr-2"></i>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
