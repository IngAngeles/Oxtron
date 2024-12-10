"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
// import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import Link from "next/link";

const SuccessPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex-1">
        <section className="mb-7 space-y-4 text-center">
        <h1 className="font-bold text-[24px] text-black title-century-gothic-bold">Thank you for your registration!</h1>
          <p className="text-[#9FA2B4] title-century-gothic-regular text-[14px]">Shortly our team will contact you to access our panel</p>
        </section>
        <div className="mt-14">
          <Link href="/" className="text-[#9FA2B4] text-sm w-full font-extralight text-center">
            <p className="mt-4 title-century-gothic-regular">¿Already have an account? <b className="text-[#0D2A85] title-century-gothic-bold">Log In</b></p>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SuccessPage;
