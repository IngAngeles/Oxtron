"use client"
import Header from "@/components/navigation/Header";
import Navigation from "@/components/navigation/Navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white min-h-screen flex relative overflow-hidden justify-center">
      {/* Navegación lateral */}
      <Navigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`flex-1 transition-all duration-300 flex flex-col p-4 lg:p-2 mx-auto`}>
        <div className="flex justify-between items-center px-6 pt-6">
          <div className="w-10 h-10 lg:hidden flex items-center">
            {!isSidebarOpen && (
              <Bars3Icon 
                className="text-neutral-700/30 cursor-pointer w-6 h-6" 
                onClick={toggleSidebar} 
              />
            )}
          </div>
          <Header />
        </div>

        {/* Contenido de la página */}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
