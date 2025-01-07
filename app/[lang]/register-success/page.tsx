"use client"
import SuccessPage from "@/components/SuccessPage";
import LottieAnimation from "@/components/LottieAnimation"; 
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

interface RegisterSuccessPageProps {
  params: { lang: Locale }; 
}

export default async function RegisterSuccessPage({ params: { lang } }: RegisterSuccessPageProps) {
  const dictionary = await getDictionary(lang); 

  return (
    <div className="flex h-screen max-h-screen bg-login">
      <section 
        className="remove-scrollbar bg-[#FFFFFF] my-auto mx-auto md:min-w-[458px] md:w-auto w-full h-full md:h-[400px] md:rounded-[10px] p-[32px] md:pt-16 pt-36"
      >
        <div className="mb-6 h-[64px] w-[336px] ml-auto mr-auto">
          <LottieAnimation />
        </div>
        <SuccessPage dictionary={dictionary.pages.success}/> 
      </section>
    </div>
  );
}
