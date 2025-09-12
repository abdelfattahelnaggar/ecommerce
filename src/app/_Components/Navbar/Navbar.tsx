"use client";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/Assets/screens/freshcart-logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/Context/CartContext";

const Navbar = () => {
  const { data: session, status } = useSession();
  const { numOfCartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutDialogOpen(false);
    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="bg-slate-100 pb-5 pt-2">
        <div className="w-full md:w-4/5 mx-auto">
          {/* Desktop & Mobile Header */}
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image src={logo} alt="logo" priority />
              </Link>
            </div>

            {/* Desktop Navigation Links - Center */}
            {status === "authenticated" && (
              <ul className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
                <li>
                  <Link href="/categories" className="text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 flex items-center gap-2">
                    <i className="fas fa-heart"></i>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/allorders" className="text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 flex items-center gap-2">
                    <i className="fas fa-receipt"></i>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="relative text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 flex items-center gap-2">
                    <i className="fas fa-shopping-cart"></i>
                    Cart
                    {numOfCartItems > 0 && (
                      <Badge variant="destructive" className="text-xs font-medium">
                        {numOfCartItems}
                      </Badge>
                    )}
                  </Link>
                </li>
              </ul>
            )}

            {/* Desktop Right Side - Auth Only */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Auth Buttons */}
              {status === "unauthenticated" && (
                <div className="flex gap-3">
                  <Link 
                    href="/login"
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 border border-slate-300 rounded-lg hover:border-slate-400 bg-white hover:bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* User Profile & Logout */}
              {status === "authenticated" && (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/profile"
                    className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                  >
                    <i className="fas fa-user text-sm"></i>
                    <span className="capitalize">{session?.user?.name?.split(" ")[0]}</span>
                  </Link>
                  <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-2 text-slate-600 hover:text-red-600 font-medium transition-colors duration-300 border border-slate-300 rounded-lg hover:border-red-300 bg-white hover:bg-red-50">
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Logout
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-sign-out-alt text-red-600"></i>
                          </div>
                          Confirm Logout
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to logout from your account? You&apos;ll need to sign in again to access your account.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-2 sm:gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsLogoutDialogOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleLogout}
                          className="flex-1"
                        >
                          <i className="fas fa-sign-out-alt mr-2"></i>
                          Logout
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

          {/* Loading State */}
          {status === "loading" && (
            <div className="text-center text-slate-600">
              Loading...
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-slate-200">
              {/* Mobile Navigation Links */}
              {status === "authenticated" && (
                <div className="space-y-3 mb-4">
                  <Link 
                    href="/categories" 
                    className="block py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link 
                    href="/brands" 
                    className="block py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Brands
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="block py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <i className="fas fa-heart"></i>
                      Wishlist
                    </div>
                  </Link>
                  <Link 
                    href="/allorders" 
                    className="block py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <i className="fas fa-receipt"></i>
                      My Orders
                    </div>
                  </Link>
                  <Link 
                    href="/cart" 
                    className="flex items-center justify-between py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <i className="fas fa-shopping-cart"></i>
                      Cart
                    </div>
                    {numOfCartItems > 0 && (
                      <Badge variant="destructive" className="text-xs font-medium">
                        {numOfCartItems}
                      </Badge>
                    )}
                  </Link>
                </div>
              )}

              {/* Mobile Auth Buttons */}
              {status === "unauthenticated" && (
                <div className="space-y-3 mb-4">
                  <Link 
                    href="/login"
                    className="block w-full text-center px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300 border border-slate-300 rounded-lg hover:border-slate-400 bg-white hover:bg-slate-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register"
                    className="block w-full text-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile User Profile & Logout */}
              {status === "authenticated" && (
                <div className="space-y-3 mb-4">
                  <Link 
                    href="/profile"
                    className="flex items-center justify-center gap-2 w-full py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user text-sm"></i>
                    <span className="capitalize">{session?.user?.name?.split(" ")[0]}</span>
                  </Link>
                  <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full px-4 py-2 text-slate-600 hover:text-red-600 font-medium transition-colors duration-300 border border-slate-300 rounded-lg hover:border-red-300 bg-white hover:bg-red-50"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Logout
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-sign-out-alt text-red-600"></i>
                          </div>
                          Confirm Logout
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to logout from your account? You&apos;ll need to sign in again to access your account.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-2 sm:gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsLogoutDialogOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleLogout}
                          className="flex-1"
                        >
                          <i className="fas fa-sign-out-alt mr-2"></i>
                          Logout
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {/* Mobile Social Icons */}
              <div className="flex justify-center gap-2">
                <i className="fab fa-facebook-f text-slate-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-blue-50"></i>
                <i className="fab fa-x-twitter text-slate-600 hover:text-slate-900 transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-slate-100"></i>
                <i className="fab fa-instagram text-slate-600 hover:text-pink-600 transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-pink-50"></i>
                <i className="fab fa-linkedin text-slate-600 hover:text-blue-700 transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-blue-50"></i>
                <i className="fab fa-youtube text-slate-600 hover:text-red-600 transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-red-50"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
