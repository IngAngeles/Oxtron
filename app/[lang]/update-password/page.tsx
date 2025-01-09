import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import Image from "next/image";

export default function Home() { 

  return (
    <div className="bg-register flex min-h-screen md:h-full md:py-10">
      <section
        className="remove-scrollbar bg-[#FFFFFF] mx-auto md:min-w-[458px] md:w-auto w-full h-full md:rounded-[10px] p-[32px] md:pt-16 pt-36"
      >
          <Image 
            src="/assets/images/logo.png"
            height={100}
            width={500}
            alt="oxtron"
            className="mb-6 h-[64px] w-[336px] ml-auto mr-auto "
          />
          <UpdatePasswordForm />
      </section>
    </div>
  );
}
