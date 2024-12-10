"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import Link from "next/link";
import { login } from '@/actions/auth'
import { useToast } from '@/components/ui/use-toast'

export enum FormFieldType {
    INPUT = 'input',
    PASSWORD = "password",
    TEXTAREA = 'textarea',
    PHONE_INPUT= 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

const LoginForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const response = await login({ email, password });

      if (!response) {
        console.log(response)
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your login. Please check your credentials and try again.',
        className: 'bg-[#7f1d1d]',
      })
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
        <section className="mb-7 space-y-4 text-center">
          <h1 className="font-bold text-[24px] text-black title-century-gothic-bold">Log In</h1>
          <p className="text-[#9FA2B4] title-century-gothic-regular text-[14px]">Enter your email and password below</p>
        </section>
        <div className="space-y-2">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email address"
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
            showPassword={showPassword}
            showPasswordToggle={true}
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />
          <Link href="/forgot-password" className="text-[#9FA2B4] text-[10px] w-full font-extralight">
            <p className="mt-2 title-century-gothic-regular">Forgot Password?</p>
          </Link>
        </div>
        <div className="mt-14">
          <SubmitButton isLoading={isLoading}>
            Log In
          </SubmitButton>
          <Link href="/register" className="text-[#9FA2B4] text-sm w-full font-extralight text-center">
            <p className="mt-4 title-century-gothic-regular">Don&apos;t have an account? <b className="text-[#0D2A85] title-century-gothic-bold">Sign up</b></p>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
