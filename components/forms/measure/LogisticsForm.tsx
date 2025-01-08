import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createLogistic,
  deleteLogistic,
  getCboBrands,
  getCboModels,
  getCboStatuses,
  getCboTypes, getVehiclesByUserId,
  updateLogistic,
} from '@/actions/measure'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import { ILogistic, IMeasureContextType, IMeasureResponse, VLabel } from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { Logistic, LogisticValidation } from '@/lib/validation'
import { Button } from '@/components/ui/button'

type Props = Readonly<{ logisticMeasure?: ILogistic }>

const TravelsForm = ({ logisticMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [status, setStatus] = useState<VLabel[]>([])
  const [type, setType] = useState<VLabel[]>([])
  const [models, setModels] = useState<VLabel[]>([])
  const [brands, setBrands] = useState<VLabel[]>([])
  const [vehicles, setVehicles] = useState<VLabel[]>([])
  const { setData, setMeasure, handleHideModal, addMeasure } = useContext(MeasureContext) as IMeasureContextType || {}
  const { toast } = useToast()

  const handleCreateLogistic = async (logistic: Logistic) => {
    await createLogistic(logistic)
    addMeasure(logistic as unknown as IMeasureResponse)
    toast({
      title: 'Success',
      description: 'This logistic has been inserted successfully',
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
      title: 'Success',
      description: 'This logistic has been updated successfully',
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
      title: 'Success',
      description: 'This logistic has been deleted successfully',
      className: 'bg-black',
    })
  }

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
      active: logisticMeasure?.active ?? 1,
      propertyStatus: logisticMeasure?.propertyStatus ?? ''
    },
  })

  const watchedFields = form.watch([
    'origin',
    'destination',
    'originzc',
    'destinationzc',
    'idCboStatus',
    'idTravelCboType',
    'idCboBrand',
    'propertyStatus',
    'selectVehicle',
  ])

  const isNextDisabled = currentStep === 1
    ? watchedFields[0]!.length === 0 || watchedFields[1]!.length === 0 || watchedFields[2]!.length === 0 || watchedFields[3]!.length === 0
    : currentStep === 2
      ? watchedFields[4] === 0 || watchedFields[5] === 0 || watchedFields[6] === 0
      : false

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
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
      console.error('LogisticsForm', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prevState => prevState + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevState => prevState - 1)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const statusResponse = await getCboStatuses()
      const typeResponse = await getCboTypes()
      const modelsResponse = await getCboModels()
      const brandsResponse = await getCboBrands()
      const vehiclesResponse = await getVehiclesByUserId()

      setStatus(
        statusResponse.map(value => ({
          value: value.idStatus.toString(),
          label: value.description,
        }))
      )

      setType(
        typeResponse.map(value => ({
          value: value.idVehicleCboType.toString(),
          label: value.description,
        }))
      )

      setModels(
        modelsResponse.map(value => ({
          value: value.idVehicleCboModel.toString(),
          label: value.description,
        }))
      )

      setBrands(
        brandsResponse.map(value => ({
          value: value.idVehicleCboBrand.toString(),
          label: value.description,
        }))
      )

      setVehicles(
        vehiclesResponse?.map(value => ({
          value: value.idControlVehicle.toString(),
          label: value.name || '',
        })) || []
      )
    }

    loadData()
  }, [])

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          { currentStep === 1 && (
            <>
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                name="origin"
                label="ORIGIN"
                placeholder="Origin"
                control={ form.control }
              />
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                name="destination"
                label="DESTINATION"
                placeholder="Destination"
                control={ form.control }/>
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                placeholder="Origin Zip Code"
                name="originzc"
                label="ORIGIN ZIP CODE"
                control={ form.control }/>
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                placeholder="Destination Zip Code"
                name="destinationzc"
                label="DESTINATION ZIP CODE"
                control={ form.control }/>
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                placeholder="Load"
                name="loadLogistic"
                label="LOAD (Optional)"
                control={ form.control }/>
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                placeholder="Client"
                name="client"
                label="CLIENT (Optional)"
                control={ form.control }/>
            </>
          ) }
          { currentStep === 2 && (
            <>
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="idCboStatus"
                label="PROPERTY STATUS"
                placeholder="Select Status"
                options={ status }
                control={ form.control }
              />
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                placeholder="Name"
                name="name"
                label="NAME (Optional)"
                control={ form.control }/>
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="idTravelCboType"
                label="TYPE"
                placeholder="Select Type"
                options={ type }
                control={ form.control }
              />
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="idCboModel"
                label="MODEL (OPTIONAL)"
                placeholder="Select Model"
                options={ models }
                control={ form.control }
              />
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="idCboBrand"
                label="BRAND (OPTIONAL)"
                placeholder="Select Brand"
                options={ brands }
                control={ form.control }
              />
              <CustomFormField
                fieldType={ FormFieldType.INPUT }
                placeholder="Client"
                name="licensePlate"
                label="LICENSE PLATE (OPTIONAL)"
                control={ form.control }/>
            </>
          ) }
          { currentStep === 3 && (
            <>
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="propertyStatus"
                label="PROPERTY STATUS"
                placeholder="Select Status"
                options={ status }
                control={ form.control }
              />
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="selectVehicle"
                label="SELECT VEHICLE"
                placeholder="Select Vehicle"
                options={ vehicles }
                control={ form.control }
              />
            </>
          ) }
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          { currentStep < 3 ? (
            <Button
              type="button"
              className={ 'bg-[#9FA2B4] w-full py-6 hover:scale-95 transition duration-300 text-white' }
              onClick={ nextStep }
              disabled={ isNextDisabled }
            >
              Next
            </Button>
          ) : (
            <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
              { !logisticMeasure ? 'Add' : 'Update' }
            </SubmitButton>
          ) }
        </div>
      </form>
    </Form>
  )
}

export default TravelsForm
