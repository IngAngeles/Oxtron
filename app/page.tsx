
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

export default function Home() { 
  return (
    <div className="flex h-screen max-h-screen bg-login">
      <section 
        className="remove-scrollbar bg-[#FFFFFF] my-auto mx-auto md:min-w-[458px] md:w-auto w-full h-full md:h-[617px] md:rounded-[10px] p-[32px] md:pt-16 pt-36"
      >
          <Image 
            src="/assets/images/logo.png"
            height={100}
            width={500}
            alt="oxtron"
            className="mb-6 h-[64px] w-[336px] ml-auto mr-auto "
          />
          <LoginForm /> 
      </section>
    </div>
  );
}
