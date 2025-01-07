import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { CommutingDetails, CommutingDetailsValidation } from '@/lib/validation'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = { idControlCommuting: number };

export const CommutingInvoiceForm = ({ idControlCommuting }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.measure.createm.comm);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
          setLoading(false);
        }
    };
        
      loadDictionary();
    }, [lang]);

  const form = useForm<CommutingDetails>({
    resolver: zodResolver(CommutingDetailsValidation),
    defaultValues: {
      active: 1,
      destination: '',
      distance: '',
      distinationZipCode: '',
      fuelEfficiency: 0,
      idControlCommuting,
      origin: '',
      originZipCode: '',
    },
  })

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  async function onSubmit(commutingDetails: CommutingDetails) {
    setIsLoading(true)
    try {
      console.log({ commutingDetails })
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form { ...form }>
      <form
        onSubmit={ form.handleSubmit(onSubmit) }
        className="space-y-6 flex-1 text-neutral-500 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={ form.control }
              name="typeEquipment"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label}
              placeholder={dictionary.origin}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={ form.control }
              name="typeEquipment"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label1}
              placeholder={dictionary.zip}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={ form.control }
              name="typeEquipment"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label2}
              placeholder={dictionary.desti}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={ form.control }
              name="typeEquipment"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label3}
              placeholder={dictionary.code}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CustomFormField
            control={ form.control }
            name=" Npurchased"
            fieldType={ FormFieldType.INPUT }
            label={dictionary.label4}
            placeholder={dictionary.dis}
          />
          <CustomFormField
            control={ form.control }
            name=" Ndelivered"
            fieldType={ FormFieldType.SELECT }
            label={dictionary.label5}
            placeholder={dictionary.mode}
          />
          <CustomFormField
            control={ form.control }
            name=" Ndelivered"
            fieldType={ FormFieldType.INPUT }
            label={dictionary.label6}
            placeholder={dictionary.fuel}
          />
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton
            isLoading={ isLoading }
            onClick={ () => onSubmit(form.getValues()) }
          >
            { dictionary.up }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
