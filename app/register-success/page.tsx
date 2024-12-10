"use client"

import LottieAnimation from "@/components/LottieAnimation"; // Asegúrate de que la ruta sea correcta
import dynamic from "next/dynamic";

const SuccessPage = dynamic(() => import("@/components/SuccessPage"), {
  ssr: false,
});


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen bg-login">
      <section 
        className="remove-scrollbar bg-[#FFFFFF] my-auto mx-auto md:min-w-[458px] md:w-auto w-full h-full md:h-[400px] md:rounded-[10px] p-[32px] md:pt-16 pt-36"
      >
        <div className="mb-6 h-[64px] w-[336px] ml-auto mr-auto">
          <LottieAnimation />
        </div>
        <SuccessPage /> 
      </section>
    </div>
  );
}
