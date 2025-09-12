"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getUserOrders } from "@/apis/userOrders";
import { Order } from "@/types/order.type";
import Link from "next/link";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "authenticated" && session?.accessToken) {
        try {
          setLoading(true);
          // Extract user ID from JWT token
          let userId: string | null = null;
          
          try {
            // Decode JWT token to get user ID
            const token = session.accessToken;
            const base64Payload = token.split('.')[1];
            const payload = JSON.parse(atob(base64Payload));
            userId = payload.id;
            
            console.log("Extracted user ID from token:", userId);
          } catch (error) {
            console.error("Error decoding JWT token:", error);
            toast.error("Failed to extract user information from session");
            return;
          }
          
          if (!userId) {
            toast.error("User ID not found in token");
            console.log("Session structure:", session);
            return;
          }
          
          const ordersData = await getUserOrders(session.accessToken, userId);
          if (ordersData) {
            // Sort orders by creation date (newest first)
            const sortedOrders = ordersData.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setOrders(sortedOrders);
          }
        } catch (error) {
          toast.error("Failed to load orders");
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentStatusBadge = (order: Order) => {
    if (order.isPaid) {
      return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>;
    }
  };

  const getDeliveryStatusBadge = (isDelivered: boolean) => {
    if (isDelivered) {
      return <Badge className="bg-blue-100 text-blue-700">Delivered</Badge>;
    } else {
      return <Badge variant="outline" className="border-slate-300 text-slate-600">In Progress</Badge>;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-slate-600 mb-4"></i>
          <p className="text-slate-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center py-16">
          <i className="fas fa-lock text-6xl text-slate-300 mb-6"></i>
          <h3 className="text-xl font-semibold text-slate-600 mb-4">
            Please sign in to view your orders
          </h3>
          <Link href="/login">
            <Button className="bg-slate-800 hover:bg-slate-700">
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full md:w-4/5 mx-auto py-8 px-5 md:px-0">
        {/* Orders Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                My Orders
              </h1>
              <p className="text-slate-600">
                {orders.length === 0
                  ? "You haven't placed any orders yet"
                  : `You have ${orders.length} order${orders.length > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-receipt text-6xl text-slate-300 mb-6"></i>
            <h3 className="text-xl font-semibold text-slate-600 mb-4">
              No orders found
            </h3>
            <p className="text-slate-500 mb-8">
              You haven&apos;t placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/">
              <Button className="bg-slate-800 hover:bg-slate-700">
                <i className="fas fa-shopping-bag mr-2"></i>
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-slate-50 border-b">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-slate-500">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                      {order.shippingAddress && (
                        <p className="text-sm text-slate-600 mt-1">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {order.shippingAddress.city}
                          {order.shippingAddress.phone && (
                            <span className="ml-2">
                              <i className="fas fa-phone mr-1"></i>
                              {order.shippingAddress.phone}
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-800">
                          {order.totalOrderPrice} EGP
                        </p>
                        <p className="text-sm text-slate-500">
                          {order.cartItems.length} item{order.cartItems.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        {getPaymentStatusBadge(order)}
                        {getDeliveryStatusBadge(order.isDelivered)}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <i className={`fas ${order.paymentMethodType === 'card' ? 'fa-credit-card' : 'fa-money-bill-wave'}`}></i>
                        <span className="capitalize">{order.paymentMethodType}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.cartItems.map((item, index) => (
                      <React.Fragment key={item._id}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="w-full sm:w-20 h-40 sm:h-20 bg-white rounded-lg overflow-hidden border">
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                              <div>
                                <h3 className="font-medium text-slate-800 leading-tight">
                                  {item.product.title}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="mt-2 bg-green-100 text-green-700"
                                >
                                  {item.product.category.name}
                                </Badge>
                                <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                                  <div className="flex items-center gap-1">
                                    <i className="fas fa-tag text-slate-400"></i>
                                    <span>Unit Price: {item.price} EGP</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <i className="fas fa-times text-slate-400"></i>
                                    <span>Qty: {item.count}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-semibold text-slate-800">
                                  {item.price * item.count} EGP
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < order.cartItems.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <Separator className="my-6" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-medium">{order.totalOrderPrice - order.taxPrice - order.shippingPrice} EGP</span>
                    </div>
                    {order.taxPrice > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax:</span>
                        <span className="font-medium">{order.taxPrice} EGP</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Shipping:</span>
                      <span className="font-medium">
                        {order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
