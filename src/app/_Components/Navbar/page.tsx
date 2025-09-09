import Link from "next/link";
import React from "react";
import logo from "@/Assets/screens/freshcart-logo.svg";
import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <div className="bg-slate-100 p-5">
        <div className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Links */}
          <ul className="flex items-center flex-col md:flex-row text-center gap-6">
            <li>
              <Link href="/">
                <Image src={logo} alt="logo" priority />
              </Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
          {/* icons & search */}
          <div className="flex flex-col md:flex-row text-center items-center gap-2">
            <div className="flex gap-3">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-youtube"></i>
            </div>
            <div>
              <Link href="/login">Login</Link>
            </div>
            <div>
              <Link href="/register">Register</Link>
            </div>
            <div>
              <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
