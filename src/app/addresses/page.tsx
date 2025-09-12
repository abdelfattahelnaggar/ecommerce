"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import getUserAddresses, { UserAddress, addAddress, deleteAddress, AddAddressData } from "@/apis/userAddresses";
import { toast } from "sonner";

const AddressesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; addressId: string | null }>({
    open: false,
    addressId: null,
  });
  const [addingAddress, setAddingAddress] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState<string | null>(null);

  // Form state for new address
  const [newAddress, setNewAddress] = useState<AddAddressData>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      if (status === "authenticated" && session?.accessToken) {
        try {
          setLoading(true);
          const data = await getUserAddresses(session.accessToken);
          if (data) {
            setAddresses(data.data);
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
          toast.error("Failed to load addresses");
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [status, session?.accessToken]);

  const handleAddAddress = async () => {
    if (!session?.accessToken) {
      toast.error("Please sign in to add addresses");
      return;
    }

    // Basic validation
    if (!newAddress.name || !newAddress.details || !newAddress.phone || !newAddress.city) {
      toast.error("Please fill in all fields");
      return;
    }

    setAddingAddress(true);
    try {
      const result = await addAddress(newAddress, session.accessToken);
      if (result) {
        setAddresses(prev => [...prev, result.data]);
        setNewAddress({ name: "", details: "", phone: "", city: "" });
        setIsAddDialogOpen(false);
        toast.success("Address added successfully!");
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    } finally {
      setAddingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!session?.accessToken) {
      toast.error("Please sign in to delete addresses");
      return;
    }

    setDeletingAddress(addressId);
    try {
      const success = await deleteAddress(addressId, session.accessToken);
      if (success) {
        setAddresses(prev => prev.filter(addr => addr._id !== addressId));
        toast.success("Address deleted successfully!");
      } else {
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    } finally {
      setDeletingAddress(null);
      setDeleteDialog({ open: false, addressId: null });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-slate-600 mb-4"></i>
          <p className="text-slate-600">Loading addresses...</p>
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
                Please log in to manage your addresses.
              </p>
              <Button onClick={() => router.push("/login")} className="w-full">
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full md:w-4/5 mx-auto py-8 px-5 md:px-0">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-blue-500"></i>
                My Addresses
              </h1>
              <p className="text-slate-600">
                {addresses.length === 0
                  ? "No addresses found. Add your first address to get started."
                  : `${addresses.length} address${addresses.length > 1 ? "es" : ""} saved`}
              </p>
            </div>

            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <i className="fas fa-plus mr-2"></i>
              Add New Address
            </Button>
          </div>
        </div>

        {/* Back to Profile Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Profile
          </Button>
        </div>

        {/* Addresses Grid */}
        {addresses.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-map-marker-alt text-6xl text-slate-300 mb-6"></i>
            <h3 className="text-xl font-semibold text-slate-600 mb-4">
              No addresses found
            </h3>
            <p className="text-slate-500 mb-8">
              Add your first delivery address to get started with your orders.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <i className="fas fa-plus mr-2"></i>
              Add Your First Address
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <Card
                key={address._id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        {address.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {address.city}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50"
                      onClick={() => setDeleteDialog({ open: true, addressId: address._id })}
                      disabled={deletingAddress === address._id}
                    >
                      {deletingAddress === address._id ? (
                        <i className="fas fa-spinner fa-spin text-xs"></i>
                      ) : (
                        <i className="fas fa-trash text-xs"></i>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <i className="fas fa-map-marker-alt text-slate-400 mt-1 text-sm"></i>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {address.details}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-phone text-slate-400 text-sm"></i>
                      <p className="text-slate-600 text-sm">
                        {address.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Address Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter the details for your new delivery address.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-name">Address Name</Label>
                <Input
                  id="add-name"
                  placeholder="e.g., Home, Office, etc."
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="add-city">City</Label>
                <Input
                  id="add-city"
                  placeholder="Enter city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="add-details">Address Details</Label>
                <Input
                  id="add-details"
                  placeholder="Street, building, apartment number"
                  value={newAddress.details}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, details: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="add-phone">Phone Number</Label>
                <Input
                  id="add-phone"
                  placeholder="Contact phone number"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setNewAddress({ name: "", details: "", phone: "", city: "" });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAddress}
                disabled={addingAddress}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {addingAddress ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : (
                  <i className="fas fa-plus mr-2"></i>
                )}
                {addingAddress ? "Adding..." : "Add Address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, addressId: null })}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-trash text-red-600"></i>
                </div>
                Delete Address
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this address? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialog({ open: false, addressId: null })}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteDialog.addressId) {
                    handleDeleteAddress(deleteDialog.addressId);
                  }
                }}
                className="flex-1"
              >
                <i className="fas fa-trash mr-2"></i>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddressesPage;
