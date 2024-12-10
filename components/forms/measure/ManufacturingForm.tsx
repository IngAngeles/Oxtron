import { useContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createManufacturing, deleteManufacturing, updateManufacturing } from '@/actions/measure'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import { IManufacturing, IMeasureContextType, IMeasureResponse } from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { useFacilities } from '@/hooks/measure/useFacilities'
import { Manufacturing, ManufacturingValidation } from '@/lib/validation'

type Props = Readonly<{ manufacturingMeasure?: IManufacturing }>

const TravelsForm = ({ manufacturingMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { facilities } = useFacilities()
  const { addMeasure, handleHideModal, setData, setMeasure } = useContext(MeasureContext) as IMeasureContextType || {}
  const { toast } = useToast()

  const handleCreateManufacturing = async (manufacturing: Manufacturing) => {
    await createManufacturing(manufacturing)
    addMeasure(manufacturing as unknown as IMeasureResponse)
    toast({
      title: 'Success',
      description: 'This manufacturing has been inserted successfully',
      className: 'bg-black',
    })
  }

  const handleUpdateManufacturing = async (manufacturing: Manufacturing) => {
    const updatedManufacturing = {
      ...manufacturingMeasure, ...manufacturing,
      idControlManufacturing: manufacturingMeasure?.idControlManufacturing
    } as unknown as IManufacturing
    setMeasure(updatedManufacturing as unknown as IMeasureResponse)
    await updateManufacturing(updatedManufacturing)
    setMeasure(undefined)

    setData(prevState =>
      prevState.map(measure => {
        const measureManufacturing: IManufacturing = measure as unknown as IManufacturing
        return measureManufacturing.idControlManufacturing === manufacturing.idControlManufacturing ? manufacturing as unknown as IMeasureResponse : measure as unknown as IMeasureResponse
      })
    )
    toast({
      title: 'Success',
      description: 'This manufacturing has been updated successfully',
      className: 'bg-black',
    })
  }

  const handleDeleteManufacturing = async (idControlManufacturing: number) => {
    await deleteManufacturing(idControlManufacturing.toString())
    setData(prevState =>
      prevState.filter(measure => {
        const measureManufacturing: IManufacturing = measure as unknown as IManufacturing
        return measureManufacturing.idControlManufacturing !== idControlManufacturing
      })
    )
    toast({
      title: 'Success',
      description: 'This manufacturing has been deleted successfully',
      className: 'bg-black',
    })
  }

  const form = useForm<Manufacturing>({
    resolver: zodResolver(ManufacturingValidation),
    defaultValues: {
      idControlManufacturing: manufacturingMeasure?.idControlManufacturing ?? 0,
      idUserControl: manufacturingMeasure?.idUserControl ?? 0,
      idFacility: manufacturingMeasure?.idFacility ?? '',
      idTypeEquipment: manufacturingMeasure?.idTypeEquipment ?? 0,
      idTypeEquipmentCode: manufacturingMeasure?.idTypeEquipmentCode ?? 0,
      idTypeFuelUsed: manufacturingMeasure?.idTypeFuelUsed ?? 0,
      process: manufacturingMeasure?.process ?? '',
      active: manufacturingMeasure?.active ?? 1,
    },
  })

  async function onSubmit(manufacturing: Manufacturing) {
    setIsLoading(true)

    try {
      if (!manufacturingMeasure) {
        await handleCreateManufacturing(manufacturing)
      } else {
        await handleUpdateManufacturing(manufacturing)
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
      console.error('ManufacturingForm:', error)
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
            name="process"
            label="PROCESS"
            placeholder="Process"
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idFacility"
            label="FACILITY"
            placeholder="Select Facility"
            options={ facilities }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idTypeEquipment"
            label="TYPE OF EQUIPMENT"
            placeholder="Type Of Equipment"
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idTypeFuelUsed"
            label="TYPE OF FUEL USED"
            placeholder="Type Of Fuel Used"
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idTypeEquipmentCode"
            label="EQUIPMENT CODE"
            placeholder="Equipment Code"
            control={ form.control }
          />
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !manufacturingMeasure ? 'Add' : 'Update' }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default TravelsForm
