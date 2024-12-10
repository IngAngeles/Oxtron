import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createVehicle,
  deleteVehicle,
  getCboBrands,
  getCboModels,
  getCboStatuses, getCboTypes,
  updateVehicle
} from '@/actions/measure'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import {
  ICboBrand,
  ICboModel,
  ICboStatus, ICboType,
  IMeasureContextType,
  IMeasureResponse,
  IVehicle,
  VLabel,
} from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { Vehicle, VehicleValidation } from '@/lib/validation'

type Props = Readonly<{ vehicleMeasure?: IVehicle }>

const VehiclesForm = ({ vehicleMeasure }: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [cboStatuses, setCboStatuses] = useState<VLabel[]>([])
  const [CboBrands, setCboBrands] = useState<VLabel[]>([])
  const [CboModels, setCboModels] = useState<VLabel[]>([])
  const [cboTypes, setCboTypes] = useState<VLabel[]>([])
  const { addMeasure, handleHideModal, setData, setMeasure } = useContext(MeasureContext) as IMeasureContextType || {}
  const { toast } = useToast()

  const handleCreateVehicle = async (vehicle: Vehicle) => {
    await createVehicle(vehicle)
    addMeasure(vehicle as unknown as IMeasureResponse)
    toast({
      title: 'Success',
      description: 'This vehicle has been inserted successfully',
      className: 'bg-black',
    })
  }

  const handleUpdateVehicle = async (vehicle: Vehicle) => {
    const updatedVehicle = {
      ...vehicleMeasure, ...vehicle,
      idControlVehicle: vehicleMeasure?.idControlVehicle
    } as unknown as IVehicle
    setMeasure(updatedVehicle as unknown as IMeasureResponse)
    await updateVehicle(updatedVehicle)
    setMeasure(undefined)

    setData(prevState =>
      prevState.map(measure => {
        const measureVehicle: IVehicle = measure as unknown as IVehicle
        return measureVehicle.idControlVehicle === vehicle.idControlVehicle ? vehicle as unknown as IMeasureResponse : measure as unknown as IMeasureResponse
      })
    )
    toast({
      title: 'Success',
      description: 'This vehicle has been updated successfully',
      className: 'bg-black',
    })
  }

  const handleDeleteVehicle = async (idControlVehicle: number) => {
    await deleteVehicle(idControlVehicle.toString())
    setData(prevState =>
      prevState.filter(measure => {
        const measureVehicle: IVehicle = measure as unknown as IVehicle
        return measureVehicle.idControlVehicle !== idControlVehicle
      })
    )
    toast({
      title: 'Success',
      description: 'This vehicle has been deleted successfully',
      className: 'bg-black',
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusResponse: ICboStatus[] = await getCboStatuses()
        const brandResponse: ICboBrand[] = await getCboBrands()
        const modelResponse: ICboModel[] = await getCboModels()
        const typeResponse: ICboType[] = await getCboTypes()
        const statuses: VLabel[] = statusResponse.map(status => ({
          value: String(status.idStatus),
          label: status.description
        }))
        const brands: VLabel[] = brandResponse.map(brand => ({
          value: String(brand.idVehicleCboBrand),
          label: brand.description
        }))
        const models: VLabel[] = modelResponse.map(brand => ({
          value: String(brand.idVehicleCboModel),
          label: brand.description
        }))
        const types: VLabel[] = typeResponse.map(type => ({
          value: String(type.idVehicleCboType),
          label: type.description
        }))

        setCboStatuses(statuses)
        setCboBrands(brands)
        setCboModels(models)
        setCboTypes(types)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const form = useForm<Vehicle>({
    resolver: zodResolver(VehicleValidation),
    defaultValues: {
      idControlVehicle: vehicleMeasure?.idControlVehicle ?? 0,
      idUserControl: vehicleMeasure?.idUserControl ?? 0,
      idCboBrand: vehicleMeasure?.idCboBrand ?? 0,
      idCboModel: vehicleMeasure?.idCboModel ?? 0,
      idCboType: vehicleMeasure?.idCboType ?? 0,
      idStatus: vehicleMeasure?.idStatus ?? 0,
      licensePlate: vehicleMeasure?.licensePlate ?? '',
      name: vehicleMeasure?.name ?? '',
      active: vehicleMeasure?.active ?? 1,
    },
  })

  async function onSubmit(vehicles: Vehicle) {
    setIsLoading(true)

    try {
      const description = `This vehicle has been ${ !vehicleMeasure ? 'inserted' : 'updated' } successfully`
      if (!vehicleMeasure) {
        await createVehicle(vehicles)
      } else {
        const updatedVehicle = { ...vehicleMeasure, ...vehicles, idControlVehicle: vehicleMeasure.idControlVehicle } as unknown as IVehicle
        setMeasure(updatedVehicle as unknown as IMeasureResponse)
        await updateVehicle(updatedVehicle)
        setMeasure(undefined)
      }
      form.reset()
      toast({
        title: 'Success',
        description: description,
        className: 'bg-black',
      })
      handleHideModal()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
      console.error('VehiclesForm:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-scroll no-scrollbar">
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idStatus"
            label="Property Status"
            placeholder="Select Status"
            options={ cboStatuses }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="name"
            label="NAME (OPTIONAL)"
            placeholder="Name"
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboBrand"
            label="BRAND"
            placeholder="Select Brand"
            options={ CboBrands }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboModel"
            label="MODEL"
            placeholder="Select Model"
            options={ CboModels }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboType"
            label="TYPE"
            placeholder="Select Type"
            options={ cboTypes }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="licensePlate"
            label="LICENSE PLATE (Optional)"
            placeholder="Write License Plate"
            control={ form.control }
          />
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !vehicleMeasure ? 'Add' : 'Update' }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default VehiclesForm
