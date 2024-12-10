import { useContext, useState } from 'react'
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

type Props = Readonly<{ travelMeasure?: ITravel }>

const TravelsForm = ({ travelMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { addMeasure, handleHideModal, setData, setMeasure } = useContext(MeasureContext) as IMeasureContextType || {}
  const { toast } = useToast()

  const handleCreateTravel = async (travel: Travel) => {
    await createTravel(travel)
    addMeasure(travel as unknown as IMeasureResponse)
    toast({
      title: 'Success',
      description: 'This travel has been inserted successfully',
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
      title: 'Success',
      description: 'This travel has been updated successfully',
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
      title: 'Success',
      description: 'This travel has been deleted successfully',
      className: 'bg-black',
    })
  }

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
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
      console.error('onSubmitTravel:', error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="idTravel"
            label="TRAVEL ID"
            placeholder="Write Travel ID"
            control={ form.control }
          />
          <div className="col-span-2">
            <CustomFormField
              fieldType={ FormFieldType.TEXTAREA }
              name="description"
              label="DESCRIPTION"
              placeholder="Write Description"
              control={ form.control }
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !travelMeasure ? 'Add' : 'Update' }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default TravelsForm
