import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createTravel, deleteTravel, updateTravel } from '@/actions/measure'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import { IMeasureContextType, IMeasureResponse, ITravel } from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { Travel, TravelValidation } from '@/lib/validation'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = Readonly<{ travelMeasure?: ITravel }>

const TravelsForm = ({ travelMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addMeasure, handleHideModal, setData, setMeasure } = useContext(MeasureContext) as IMeasureContextType || {};
  const { toast } = useToast();
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.measure.modalt);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  const form = useForm<Travel>({
    resolver: zodResolver(TravelValidation),
    defaultValues: {
      idControlTravel: travelMeasure?.idControlTravel ?? 0,
      idUserControl: travelMeasure?.idUserControl ?? 0,
      idTravel: travelMeasure?.idTravel ?? '',
      description: travelMeasure?.description ?? '',
      active: travelMeasure?.active ?? 1,
    },
  })

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  async function onSubmit(travel: Travel) {
    setIsLoading(true)

    try {
      if (!travelMeasure) {
        await handleCreateTravel(travel)
      } else {
        await handleUpdateTravel(travel)
      }
      form.reset()
      handleHideModal()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: dictionary.messages.title,
        description: dictionary.messages.descrip,
        className: 'bg-[#7f1d1d]',
      })
      console.error('onSubmitTravel:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTravel = async (travel: Travel) => {
    await createTravel(travel)
    addMeasure(travel as unknown as IMeasureResponse)
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.this,
      className: 'bg-black',
    })
  }

  const handleUpdateTravel = async (travel: Travel) => {
    const updatedTravel = {
      ...travelMeasure, ...travel,
      idControlTravel: travelMeasure?.idControlTravel
    } as unknown as ITravel
    setMeasure(updatedTravel as unknown as IMeasureResponse)
    await updateTravel(updatedTravel)
    setMeasure(undefined)

    setData(prevState =>
      prevState.map(measure => {
        const measureTravel: ITravel = measure as unknown as ITravel
        return measureTravel.idControlTravel === travel.idControlTravel ? travel as unknown as IMeasureResponse : measure as unknown as IMeasureResponse
      })
    )
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.this1,
      className: 'bg-black',
    })
  }

  const handleDeleteTravel = async (idControlTravel: number) => {
    await deleteTravel(idControlTravel.toString())
    setData(prevState =>
      prevState.filter(measure => {
        const measureTravel: ITravel = measure as unknown as ITravel
        return measureTravel.idControlTravel !== idControlTravel
      })
    )
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.this2,
      className: 'bg-black',
    })
  }


  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="idTravel"
            label={dictionary.id}
            placeholder={dictionary.write}
            control={ form.control }
          />
          <div className="col-span-2">
            <CustomFormField
              fieldType={ FormFieldType.TEXTAREA }
              name="description"
              label={dictionary.descri}
              placeholder={dictionary.writed}
              control={ form.control }
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !travelMeasure ? dictionary.add : dictionary.up }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default TravelsForm
