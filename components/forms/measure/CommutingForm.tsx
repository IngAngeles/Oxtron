import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createCommuting, deleteCommuting, updateCommuting } from '@/actions/measure'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import { ICommuting, IMeasureContextType, IMeasureResponse } from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { useFacilities } from '@/hooks/measure/useFacilities'
import { Commuting, CommutingValidation } from '@/lib/validation'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = Readonly<{ commutingMeasure?: ICommuting }>

const CommutingForm = ({ commutingMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { facilities } = useFacilities()
  const { setMeasure, setData, handleHideModal, addMeasure } = useContext(MeasureContext) as IMeasureContextType || {}
  const { toast } = useToast()
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
          const loadDictionary = async () => {
            try {
              setLoading(true);
              const dict = await getDictionary(lang);
              setDictionary(dict.pages.measure.modalc);
            } catch (error) {
              console.error("Error loading dictionary:", error);
            } finally {
              setLoading(false);
            }
          };
      
          loadDictionary();
        }, [lang]);

        const form = useForm<Commuting>({
          resolver: zodResolver(CommutingValidation),
          defaultValues: {
            idControlCommuting: commutingMeasure?.idControlCommuting ?? 0,
            idUserControl: commutingMeasure?.idUserControl ?? 0,
            description: commutingMeasure?.description ?? '',
            idControlFacility: commutingMeasure?.idControlFacility ?? '',
            active: commutingMeasure?.active ?? 1,
          },
        })

        if (loading || !dictionary) {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <Loading />
            </div>
          );
        }

  const handleCreateCommuting = async (commuting: Commuting) => {
    await createCommuting(commuting)
    addMeasure(commuting as unknown as IMeasureResponse)
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.desc1,
      className: 'bg-black',
    })
  }

  const handleUpdateCommuting = async (commuting: Commuting) => {
    const updatedCommuting = { ...commutingMeasure, ...commuting, } as unknown as ICommuting
    setMeasure(updatedCommuting as unknown as IMeasureResponse)
    await updateCommuting(updatedCommuting)
    setMeasure(undefined)

    setData(prevState =>
      prevState.map(measure => {
        const measureFacility: ICommuting = measure as unknown as ICommuting
        return measureFacility.idControlCommuting === commuting.idControlCommuting ? commuting as unknown as IMeasureResponse : measure as unknown as IMeasureResponse
      })
    )
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.desc2,
      className: 'bg-black',
    })
  }

  const handleDeleteCommuting = async (idControlCommuting: number) => {
    await deleteCommuting(idControlCommuting.toString())
    setData(prevState =>
      prevState.filter(measure => {
        const measureCommuting: ICommuting = measure as unknown as ICommuting
        return measureCommuting.idControlCommuting !== idControlCommuting
      })
    )
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.desc3,
      className: 'bg-black',
    })
  }

  async function onSubmit(commuting: Commuting) {
    setIsLoading(true)

    try {
      if (!commutingMeasure) {
        await handleCreateCommuting(commuting)
      } else {
        await handleUpdateCommuting(commuting)
      }
      form.reset()
      handleHideModal()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: dictionary.messages.title,
        description: dictionary.messages.desc,
        className: 'bg-[#7f1d1d]',
      })
      console.error('CommutingForm:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idControlFacility"
            label={dictionary.label}
            placeholder={dictionary.faci}
            options={ facilities }
            control={ form.control }
          >
            { commutingMeasure ? facilities.find(value => commutingMeasure.idControlCommuting.toString() === value.value)?.label : null }
          </CustomFormField>
          <div className="col-span-2">
            <CustomFormField
              fieldType={ FormFieldType.TEXTAREA }
              name="description"
              label={dictionary.label1}
              placeholder={dictionary.des}
              control={ form.control }
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !commutingMeasure ? dictionary.add : dictionary.up }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default CommutingForm
