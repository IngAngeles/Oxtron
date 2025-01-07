"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserRegisterValidation } from "@/lib/validation"
import Link from "next/link"

 
export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

interface RegisterFormProps {
    dictionary: {
      title: string;
      subtitle: string;
      labels: {
        firstname: string;
        lastname: string;
        role: string;
        email: string;
        organisation: string;
        city: string;
        state: string;
        country: string;
        postal: string;
        license: string;
        account: string;
      };
      placeholders: {
        firstname: string;
        lastname: string;
        role: string;
        email: string;
        organisation: string;
        city: string;
        state: string;
        country: string;
        postal: string;
        license: string;
      };
      buttons: {
        next: string;
        login: string;
      };
      options: {
        basic: string;
        professional: string;
        emissions: string;
        footprint: string;
        carbon: string;
        advanced: string;
      };
    };
  }
  
  const RegisterForm = ({ dictionary }: RegisterFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm<z.infer<typeof UserRegisterValidation>>({
      resolver: zodResolver(UserRegisterValidation),
      defaultValues: {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        organisationName: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        typeLicense: 0,
      },
    });
  
    async function onSubmit(data: z.infer<typeof UserRegisterValidation>) {
      setIsLoading(true);
      router.push("/register-success");
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <section className="mb-7 space-y-4 text-center">
            <h1 className="font-bold text-[24px] text-black title-century-gothic-bold">
              {dictionary.title}
            </h1>
            <p className="text-[#9FA2B4] title-century-gothic-regular text-[14px]">
              {dictionary.subtitle}
            </p>
          </section>
  
          <div className="flex space-x-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="firstName"
              label={dictionary.labels.firstname}
              placeholder={dictionary.placeholders.firstname}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="lastName"
              label={dictionary.labels.lastname}
              placeholder={dictionary.placeholders.lastname}
            />
          </div>
  
          <div className="flex space-x-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="role"
              label={dictionary.labels.role}
              placeholder={dictionary.placeholders.role}
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label={dictionary.labels.email}
              placeholder={dictionary.placeholders.email}
            />
          </div>
  
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="organisationName"
            label={dictionary.labels.organisation}
            placeholder={dictionary.placeholders.organisation}
          />
  
          <div className="flex space-x-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="city"
              label={dictionary.labels.city}
              placeholder={dictionary.placeholders.city}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="state"
              label={dictionary.labels.state}
              placeholder={dictionary.placeholders.state}
            />
          </div>
  
          <div className="flex space-x-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="country"
              label={dictionary.labels.country}
              placeholder={dictionary.placeholders.country}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="postalCode"
              label={dictionary.labels.postal}
              placeholder={dictionary.placeholders.postal}
            />
          </div>
  
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="typeLicense"
            label={dictionary.labels.license}
            placeholder={dictionary.placeholders.license}
            options={[
              { value: "basic", label: dictionary.options.basic },
              { value: "professional", label: dictionary.options.professional },
              { value: "emissions", label: dictionary.options.emissions },
              { value: "footprint", label: dictionary.options.footprint },
              { value: "carbon", label: dictionary.options.carbon },
              { value: "advanced", label: dictionary.options.advanced },
            ]}
          />
  
          <SubmitButton isLoading={isLoading}>
            {dictionary.buttons.next}
          </SubmitButton>
  
          <Link href="/" className="text-black text-sm w-full font-extralight text-center">
            <p className="mt-4 title-century-gothic-regular">
              {dictionary.labels.account}{" "}
              <b className="text-[#0D2A85] title-century-gothic-bold">
                {dictionary.buttons.login}
              </b>
            </p>
          </Link>
        </form>
      </Form>
    );
  };
  
  export default RegisterForm;