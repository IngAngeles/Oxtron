"use client"
import { motion } from "framer-motion";
import NavigationLink from "./NavigationLink";
import Image from "next/image";
import { Bars3Icon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { logout } from "@/actions/auth";
import { useState } from "react";
import SubmitButton from "../SubmitButton";

interface NavigationProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navigation = ({ isSidebarOpen, toggleSidebar }: NavigationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signOut = async () => {
    await logout()
    setIsLoading(true)
  }

  return (
    <div 
      className={`fixed top-0 left-0 h-screen lg:w-64 w-0 ${isSidebarOpen && 'w-64'} bg-neutral-900 flex flex-col z-50 shadow shadow-neutral-600 transition-all duration-300`}
      // Este div es el contenedor del sidebar, tiene posición fija para asegurarse que esté sobre el contenido
    >
      <motion.nav 
        className={`lg:flex flex flex-col gap-20 p-5 justify-between h-full ${!isSidebarOpen && 'hidden'}`}
        // Si está en una pantalla pequeña y el sidebar está cerrado, no se muestra el contenido
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-row w-full justify-between items-center">
            <div
              className={ `w-fit h-10 flex justify-center items-center ${ isSidebarOpen && 'block'} lg:block` }>
              <Image
                src="/assets/images/logoWhite.webp"
                priority
                height={ 100 }
                width={ 500 }
                alt="logo oxtron"
                className="h-8 w-fit"
              />
            </div>
            <button 
              className="text-white lg:hidden cursor-pointer"
              onClick={() => toggleSidebar()}
            >
              {isSidebarOpen ? (
                <ChevronLeftIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className={`lg:flex flex-col gap-3 transition-all duration-300`}>
            <NavigationLink name="dashboard" isOpen={isSidebarOpen}>
              <Image src="/assets/icons/white/dashboard-1.png" height={32} width={32} alt="Dashboard" />
            </NavigationLink>
            <NavigationLink name="measure" isOpen={isSidebarOpen}>
              <Image src="/assets/icons/white/Measure-1.png" height={32} width={32} alt="Measure" />
            </NavigationLink>
            <NavigationLink name="communicate" isOpen={isSidebarOpen}>
              <Image src="/assets/icons/white/Communicate-1.png" height={32} width={32} alt="Communicate" />
            </NavigationLink>
            <NavigationLink name="capture" isOpen={isSidebarOpen}>
              <Image src="/assets/icons/white/Capture-1.png" height={32} width={32} alt="Capture" />
            </NavigationLink>
            <NavigationLink name="settings" isOpen={isSidebarOpen}>
              <Image src="/assets/icons/white/Settings.png" height={32} width={32} alt="Settings" />
            </NavigationLink>
          </div>
        </div>
        <form action={ signOut }>
            <SubmitButton
              isLoading={ isLoading }
              className="flex items-center py-6 gap-2 justify-center border-[0px] bg-neutral-500/40 border-neutral-600 rounded-lg w-full"
            >
              <Image src="/assets/icons/white/Log Out.png" height={32} width={32} alt="Log Out" />
              <span className="text-lg font-normal">Log out</span>
            </SubmitButton>
        </form>
      </motion.nav>
    </div>
  );
}

export default Navigation;
