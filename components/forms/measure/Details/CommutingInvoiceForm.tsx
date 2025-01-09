import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { CommutingDetails, CommutingDetailsValidation } from '@/lib/validation'
import { VLabel } from '@/constants/types'
import { getCboModeTransport } from '@/actions/measure'
import { createCommutingDetails, updateCommutingDetails } from '@/actions/measure/details'
import { toast } from '@/components/ui/use-toast'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = { idControlCommuting: number; commuting?: CommutingDetails; reloadData: () => void  };

export const CommutingInvoiceForm = ({ idControlCommuting, commuting, reloadData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);
  const [cboModeTransport, setCboModeTransport] = useState<VLabel[]>([])

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
      active: commuting?.active ?? 1,
      fuelEfficiency: commuting?.fuelEfficiency ?? 0,
      destination: commuting?.destination,
      distinationZipCode: commuting?.distinationZipCode,
      distance: commuting?.distance,
      idControlCommuting,
      origin: commuting?.origin,
      originZipCode: commuting?.originZipCode,
      idControlCommutingDetails: commuting?.idControlCommutingDetails,
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
      const data = !commuting
        ? await createCommutingDetails(commutingDetails)
        : await updateCommutingDetails(commutingDetails)

      if (data.success) {
        toast({
          title: 'Success',
          description: `This invoice has been ${ !commutingDetails ? 'created' : 'updated' } successfully`,
          className: 'bg-black',
        })
        form.reset()
        reloadData()
      }
    } catch (error) {
      console.error({ error })
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await getCboModeTransport()
      setCboModeTransport(
        data.map(value => ({
          value: value.idCommutingCboModeTransport.toString(),
          label: value.description,
        }))
      )
    }

    loadData()
  }, [])

  return (
    <Form { ...form }>
      <form
        onSubmit={ form.handleSubmit(onSubmit) }
        className="space-y-6 flex-1 text-neutral-500 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="origin"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label}
              placeholder={dictionary.origin}
            />
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="originZipCode"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label1}
              placeholder={dictionary.zip}
            />
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="destination"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label2}
              placeholder={dictionary.desti}
            />
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="destinationZipCode"
              fieldType={ FormFieldType.INPUT }
              label={dictionary.label3}
              placeholder={dictionary.code}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CustomFormField
            control={ form.control }
            name="distance"
            fieldType={ FormFieldType.INPUT }
            label={dictionary.label4}
            placeholder={dictionary.dis}
          />
          <CustomFormField
            control={ form.control }
            name="idCommutingCboModeTransport"
            fieldType={ FormFieldType.SELECT }
            label={dictionary.label5}
            placeholder={dictionary.mode}
            options={ cboModeTransport }
          />
          {/* <CustomFormField
            control={form.control}
            name="fuelEfficiency"
            fieldType={FormFieldType.INPUT}
            label={dictionary.label6}
            placeholder={dictionary.fuel}
          /> */}
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
