import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLogistic, deleteLogistic, updateLogistic } from '@/actions/measure'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import { ILogistic, IMeasureContextType, IMeasureResponse } from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { Logistic, LogisticValidation } from '@/lib/validation'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = Readonly<{ logisticMeasure?: ILogistic }>

const TravelsForm = ({ logisticMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setData, setMeasure, handleHideModal, addMeasure } = useContext(MeasureContext) as IMeasureContextType || {}
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
          setDictionary(dict.pages.measure.modall);
        } catch (error) {
          console.error("Error loading dictionary:", error);
        } finally {
          setLoading(false);
        }
      };
  
      loadDictionary();
    }, [lang]);

    const form = useForm<Logistic>({
      resolver: zodResolver(LogisticValidation),
      defaultValues: {
        idControlLogistics: logisticMeasure?.idControlLogistics ?? 0,
        idUserControl: logisticMeasure?.idUserControl ?? 0,
        idCboModel: logisticMeasure?.idCboModel ?? 0,
        idCboBrand: logisticMeasure?.idCboBrand ?? 0,
        idCboStatus: logisticMeasure?.idCboStatus ?? 0,
        idTravelCboType: logisticMeasure?.idTravelCboType ?? 0,
        licensePlate: logisticMeasure?.licensePlate ?? '',
        client: logisticMeasure?.client ?? '',
        name: logisticMeasure?.name ?? '',
        destination: logisticMeasure?.destination ?? '',
        origin: logisticMeasure?.origin ?? '',
        destinationzc: logisticMeasure?.destinationzc ?? '',
        originzc: logisticMeasure?.originzc ?? '',
        loadLogistic: logisticMeasure?.loadLogistic ?? '',
        active: logisticMeasure?.active ?? 1
      },
    })

    if (loading || !dictionary) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      );
    }

  const handleCreateLogistic = async (logistic: Logistic) => {
    await createLogistic(logistic)
    addMeasure(logistic as unknown as IMeasureResponse)
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.descri1,
      className: 'bg-black',
    })
  }

  const handleUpdateLogistic = async (logistic: Logistic) => {
    const updatedLogistic = {
      ...logisticMeasure, ...logistic,
      idControlLogistics: logisticMeasure?.idControlLogistics
    } as unknown as ILogistic
    setMeasure(updatedLogistic as unknown as IMeasureResponse)
    await updateLogistic(updatedLogistic)
    setMeasure(undefined)

    setData(prevState =>
      prevState.map(measure => {
        const measureLogistic: ILogistic = measure as unknown as ILogistic
        return measureLogistic.idControlLogistics === logistic.idControlLogistics ? logistic as unknown as IMeasureResponse : measure as unknown as IMeasureResponse
      })
    )
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.descri2,
      className: 'bg-black',
    })
  }

  const handleDeleteLogistic = async (idControlLogistics: number) => {
    await deleteLogistic(idControlLogistics.toString())
    setData(prevState =>
      prevState.filter(measure => {
        const measureLogistic: ILogistic = measure as unknown as ILogistic
        return measureLogistic.idControlLogistics !== idControlLogistics
      })
    )
    toast({
      title: dictionary.messages.succ,
      description: dictionary.messages.descri3,
      className: 'bg-black',
    })
  }


  async function onSubmit(logistic: Logistic) {
    setIsLoading(true)

    try {
      if (!logisticMeasure) {
        await handleCreateLogistic(logistic)
      } else {
        await handleUpdateLogistic(logistic)
      }
      form.reset()
      handleHideModal()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: dictionary.messages.title,
        description: dictionary.messages.there,
        className: 'bg-[#7f1d1d]',
      })
      console.error('LogisticsForm', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          { /* 1st */ }
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="origin"
            label={dictionary.origin}
            placeholder={dictionary.label}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="destination"
            label={dictionary.desti}
            placeholder={dictionary.label1}
            control={ form.control }/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.zip}
            name="originzc"
            label={dictionary.label2}
            control={ form.control }/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.code}
            name="destinationzc"
            label={dictionary.label3}
            control={ form.control }/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.load}
            name="loadLogistic"
            label={dictionary.label4}
            control={ form.control }/>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.client}
            name="client"
            label={dictionary.label5}
            control={ form.control }/>
          { /* 2nd */ }
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboStatus"
            label={dictionary.label6}
            placeholder={dictionary.status}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.name}
            name="name"
            label={dictionary.label7}
            control={ form.control }/>
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idTravelCboType"
            label={dictionary.label8}
            placeholder={dictionary.type}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboModel"
            label={dictionary.label9}
            placeholder={dictionary.model}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboBrand"
            label={dictionary.label10}
            placeholder={dictionary.brand}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.licen}
            name="licensePlate"
            label={dictionary.label11}
            control={ form.control }/>
          { /* 3rd */ }
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="propertyStatus"
            label={dictionary.label12}
            placeholder={dictionary.proper}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="selectVehicle"
            label={dictionary.label13}
            placeholder={dictionary.vehi}
            control={ form.control }
          />
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !logisticMeasure ? dictionary.add : dictionary.up }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default TravelsForm
