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

type Props = { idControlCommuting: number; commuting?: CommutingDetails; reloadData: () => void  };

export const CommutingInvoiceForm = ({ idControlCommuting, commuting, reloadData }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [cboModeTransport, setCboModeTransport] = useState<VLabel[]>([])

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
              label="ORIGIN"
              placeholder="Origin"
            />
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="originZipCode"
              fieldType={ FormFieldType.INPUT }
              label="ORIGIN ZIP CODE"
              placeholder="Origin Zip Code"
            />
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="destination"
              fieldType={ FormFieldType.INPUT }
              label="DESTINATION"
              placeholder="Destination"
            />
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={ form.control }
              name="destinationZipCode"
              fieldType={ FormFieldType.INPUT }
              label="DESTINATION ZIP CODE"
              placeholder="Destination Zip Code"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CustomFormField
            control={ form.control }
            name="distance"
            fieldType={ FormFieldType.INPUT }
            label="DISTANCE"
            placeholder="Commuting Distance"
          />
          <CustomFormField
            control={ form.control }
            name="idCommutingCboModeTransport"
            fieldType={ FormFieldType.SELECT }
            label="MODE OF TRANSPORT"
            placeholder="Select Transport"
            options={ cboModeTransport }
          />
          <CustomFormField
            control={ form.control }
            name="fuelEfficiency"
            fieldType={ FormFieldType.INPUT }
            label="FUEL EFFICIENCY"
            placeholder="Fuel efficiency"
          />
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton
            isLoading={ isLoading }
            onClick={ () => onSubmit(form.getValues()) }
          >
            { 'Update' }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
