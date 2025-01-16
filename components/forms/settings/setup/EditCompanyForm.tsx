"use client"
import React, { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Company, useFormValidation } from '@/lib/validation'
import { updateCompany } from '@/actions/company'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = { company?: Company }

export const EditCompanyForm = ({ company }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);
  const { CompanyValidation } = useFormValidation();

  const form = useForm<Company>({
    resolver: zodResolver(CompanyValidation),
    defaultValues: {
      idCompany: company?.idCompany,
      firstName: company?.firstName,
      lastName: company?.lastName,
      role: company?.role,
      email: company?.email,
      password: company?.password,
      organisatioName: company?.organisatioName,
      city: company?.city,
      state: company?.state,
      country: company?.country,
      postalCode: company?.postalCode,
      active: company?.active,
      registrationDate: company?.registrationDate,
      idTypeLicense: company?.idTypeLicense,
      address: company?.address,
      telephoneCompany: company?.telephoneCompany,
      size: company?.size,
    }
  })

  async function onSubmit(company: Company) {
    setIsLoading(true)
    try {
      await updateCompany(company)
      toast({
        title: 'Success',
        description: 'This company has been updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.settings.setup);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.name}
            label={dictionary.content1.name}
            name="organisatioName"/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.industry}
            label={dictionary.content1.industry}
            name="industry"/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.country}
            label={dictionary.content1.country}
            name="country"/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.state}
            label={dictionary.content1.state}
            name="state"/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.city}
            label={dictionary.content1.city}
            name="city"/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.zip}
            label={dictionary.content1.zip}
            name="postalCode"/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder={dictionary.content1.add}
            label={dictionary.content1.add}
            name="address"/>
          <CustomFormField
            fieldType={ FormFieldType.PHONE_INPUT }
            control={ form.control }
            placeholder={dictionary.content1.phonee}
            label={dictionary.content1.phonee}
            name="telephoneCompany"/>
        </div>
        <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>{dictionary.content1.up}</SubmitButton>
      </form>
    </Form>
  )
}