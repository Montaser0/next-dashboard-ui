import Link from "next/link";
import Image from "next/image";
import Menu from "../componnets/Menu";
import Navbar from "../componnets/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex bg-gray-50">
      {/* LEFT - Main Content (with margins for fixed elements) */}
      <div className="flex-1 mr-20 lg:mr-64 bg-gray-50">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-20 lg:right-64 z-40">
          <Navbar />
        </div>
        
        {/* Content with top margin for navbar */}
        <div className="pt-16 lg:pt-20">
          {children}
        </div>
      </div>
      
      {/* RIGHT - Sidebar (Fixed) */}
      <div className="w-20 lg:w-64 bg-white border-l border-gray-200 shadow-lg flex-shrink-0 flex flex-col fixed right-0 top-0 h-full z-50">
        <Link href="/" className="flex flex-col lg:flex-row items-center gap-3 justify-center p-6 border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group flex-shrink-0">
          <div className="p-2   to-indigo-600 group-hover:shadow-xl transition-all duration-300">
            <Image src="/logo.png" alt="logo" width={32} height={32} className="rounded-xl" />
          </div>
          
          <span className="hidden lg:block text-xl font-bold  bg-clip-text text-black">نظام التعليم</span>
        </Link>
        <Menu />
      </div>
    </div>
  );
}
