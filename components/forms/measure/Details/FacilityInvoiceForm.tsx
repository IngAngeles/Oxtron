import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { CustomRadioButton } from '@/components/controls/radio-button/RadioButton'
import SubmitButton from '@/components/SubmitButton'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ComboType,
  FacilityDescriptionDetails,
  FacilityDescriptionDetailsValidation,
  FacilityDetails,
} from '@/lib/validation'
import { getCboTypes } from '@/actions/communicate'
import { VLabel } from '@/constants/types'
import { getCboElectricityType, getCboFuelType, getCboGasType, getCboRefrigerantsType } from '@/actions/shared'
import { fetchHeader } from '@/actions/dashboard'
import { createFacilityDetails, updateFacilityDetails } from '@/actions/measure/details'

type Props = { idControlFacility: number; facility?: FacilityDescriptionDetails; reloadData: () => void };

export const FacilityInvoiceForm = ({ idControlFacility, facility, reloadData }: Props) => {
  const [idType, setIdType] = useState<string>('')
  const [emissionsFactor, setEmissionsFactor] = useState<string>('1')
  const [measureFugitiveEmissionsFactor, setMeasureFugitiveEmissionsFactor] = useState<string>('1')
  // const [chargeIntoEquipment, setChargeIntoEquipment] = useState<string>('')
  const [dontKnow, setDontKnow] = useState<string>('0')
  const [label, setLabel] = useState<string>('TYPE')
  const [placeholder, setPlaceholder] = useState<string>('Fuel Type')
  const [cboTypes, setCboTypes] = useState<VLabel[]>([])
  const [options, setOptions] = useState<VLabel[]>([])
  const emissionsFactorOptions: VLabel[] = [
    { value: '1', label: 'Default' },
    { value: '2', label: 'Personalized' },
  ]
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<FacilityDescriptionDetails>({
    resolver: zodResolver(FacilityDescriptionDetailsValidation),
    defaultValues: {
      idControlFacilityDetails: facility?.idControlFacilityDetails,
      idControlFacility: idControlFacility,
      // @ts-ignore
      idType: facility?.idType ?? idType,
      idTypeDescription: facility?.idTypeDescription,
      // @ts-ignore
      idEmissionFactor: facility?.idEmissionFactor ?? emissionsFactor,
      idEmissionFactorDescription: facility?.idEmissionFactorDescription,
      startDate: facility?.startDate,
      endDate: facility?.endDate,
      invoiceId: facility?.invoiceId,
      idTypeDetails: facility?.idTypeDetails,
      idTypeDetailsDescription: facility?.idTypeDetailsDescription,
      amount: facility?.amount,
      unit: facility?.unit,
      typeEquipment: facility?.typeEquipment,
      // @ts-ignore
      measureFugitive: facility?.measureFugitive ?? measureFugitiveEmissionsFactor,
      purchased: facility?.purchased,
      delivered: facility?.delivered,
      returnsProducers: facility?.returnsProducers,
      returnedUsers: facility?.returnedUsers,
      returnedOffsiteRecycling: facility?.returnedOffsiteRecycling,
      partialNAmeplateCharged: facility?.partialNAmeplateCharged,
      amountYearsBeginning: facility?.amountYearsBeginning,
      amountYearsEnd: facility?.amountYearsEnd,
      chargedIntoEquipment: facility?.chargedIntoEquipment,
      // @ts-ignore
      dontKnow: facility?.dontKnow ?? '0',
      offSiteRecycling: facility?.offSiteRecycling,
      offSiteDestruction: facility?.offSiteDestruction,
      densityPressurePartial: facility?.densityPressurePartial,
      densityPressureFull: facility?.densityPressureFull,
      active: facility?.active ?? 1,
      firstName: facility?.firstName,
      /*
      idControlFacility,
      amount: facility?.amount ?? 0,
      amountYearsBeginning: facility?.amountYearsBeginning ?? 0,
      amountYearsEnd: facility?.amountYearsEnd ?? 0,
      chargedIntoEquipment: facility?.chargedIntoEquipment ?? 0,
      delivered: facility?.delivered ?? 0,
      densityPressureFull: facility?.densityPressureFull ?? 0,
      densityPressurePartial: facility?.densityPressurePartial ?? 0,
      dontKnow: facility?.dontKnow ?? 0,
      startDate: facility?.startDate ?? new Date().toISOString(),
      endDate: facility?.endDate ?? new Date().toISOString(),
      invoiceId: facility?.invoiceId ?? '',
      idControlFacilityDetails: facility?.idControlFacilityDetails ?? 0,
      idEmissionFactor: facility?.idEmissionFactor ?? Number(emissionsFactor),
      idType: facility?.idType ?? Number(idType),
      idTypeDetails: facility?.idTypeDetails ?? 0,
      measureFugitive: facility?.measureFugitive ?? 0,
      offSiteDestruction: facility?.offSiteDestruction ?? 0,
      offSiteRecycling: facility?.offSiteRecycling ?? 0,
      partialNAmeplateCharged: facility?.partialNAmeplateCharged ?? 0,
      purchased: facility?.purchased ?? 0,
      returnedOffsiteRecycling: facility?.returnedOffsiteRecycling ?? 0,
      returnedUsers: facility?.returnedUsers ?? 0,
      returnsProducers: facility?.returnsProducers ?? 0,
      unit: facility?.unit ?? '',
      typeEquipment: facility?.typeEquipment ?? '',
      active: facility?.active ?? 1,
      firstName: facility?.firstName ?? '', */
    },
  })

  async function onSubmit(facilityDetails: FacilityDetails) {
    setIsLoading(true)
    try {
      const name = await fetchHeader()
      const data = !facility
        ? await createFacilityDetails({
          ...facilityDetails,
          // @ts-ignore
          idType,
          idTypeDescription: cboTypes.find((cboType) => cboType.value === idType)?.label,
          // @ts-ignore
          dontKnow,
          idTypeDetailsDescription: options.find((option) => {
            console.log('idTypeDetails', facilityDetails.idTypeDetails.toString(), 'facilityIdTypeDetails', option.value.toString())
            return option.value.toString() === facilityDetails.idTypeDetails.toString()
          })?.label,
          idEmissionFactorDescription: emissionsFactorOptions.find((emissionFactor) => emissionFactor.value === emissionsFactor)?.label,
          firstName: name,
        })
        : await updateFacilityDetails({
          ...facilityDetails,
          // @ts-ignore
          idType,
          idTypeDescription: cboTypes.find((cboType) => cboType.value === idType)?.label,
          // @ts-ignore
          dontKnow,
          idTypeDetailsDescription: options.find((option) => {
            console.log('idTypeDetails', facilityDetails.idTypeDetails.toString(), 'facilityIdTypeDetails', option.value.toString())
            return option.value.toString() === facilityDetails.idTypeDetails.toString()
          })?.label,
          idEmissionFactorDescription: emissionsFactorOptions.find((emissionFactor) => emissionFactor.value === emissionsFactor)?.label,
          firstName: name,
        })

      if (data.success) {
        toast({
          title: 'Success',
          description: `This invoice has been ${ !facility ? 'created' : 'updated' } successfully`,
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

  const nextStep = () => {
    setCurrentStep(2)
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await getCboTypes()
      setCboTypes(data)
      setIdType(data[0].value)
    }

    loadData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      switch (idType) {
        case '1':
          const fuel = await getCboFuelType()
          const fuelData = fuel.data as unknown as ComboType[]

          setLabel('TYPE')
          setPlaceholder('Fuel Type')
          setOptions(fuelData.map((data) => ({
            value: data.idControl,
            label: data.description,
          })) as unknown as VLabel[])
          break
        case '2':
          const gas = await getCboGasType()
          const gasData = gas.data as unknown as ComboType[]

          setLabel('QUANTITY')
          setPlaceholder('Quantity')
          setOptions(gasData.map((data) => ({
            value: data.idControl,
            label: data.description,
          })) as unknown as VLabel[])
          break
        case '3':
          const electricity = await getCboElectricityType()
          const electricityData = electricity.data as unknown as ComboType[]

          setLabel('CALCULATION APPROACH')
          setPlaceholder('Calculation Approach')
          setOptions(electricityData.map((data) => ({
            value: data.idControl,
            label: data.description,
          })) as unknown as VLabel[])
          break
        case '4':
          const refrigerants = await getCboRefrigerantsType()
          const refrigerantsData = refrigerants.data as unknown as ComboType[]

          setLabel('REFRIGERANT USED')
          setPlaceholder('Select Refrigerant Type')
          setOptions(refrigerantsData.map((data) => ({
            value: data.idControl,
            label: data.description,
          })) as unknown as VLabel[])
          break
      }
    }

    loadData()
  }, [idType])

  return (
    <>
      <Form { ...form }>
        <form
          onSubmit={ form.handleSubmit(onSubmit) }
          className="space-y-6 flex-1 text-neutral-500 w-full"
        >
          { currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <CustomRadioButton
                  value={ idType }
                  onChange={ setIdType }
                  options={ cboTypes }
                  label="SELECT TYPE"
                  defaultSelected={ 0 }/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full">
                  <CustomRadioButton
                    value={ emissionsFactor }
                    onChange={ setEmissionsFactor }
                    options={ emissionsFactorOptions }
                    cols={ 2 }
                    label="EMISSIONS FACTOR"
                    defaultSelected={ 0 }/>
                </div>
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="typeEquipment"
                    fieldType={ FormFieldType.INPUT }
                    label="TYPE OF EQUIPMENT"
                    placeholder="Write Type of Equipment"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    fieldType={ FormFieldType.DATE_PICKER }
                    name="startDate"
                    label="START DATE"
                    placeholder="dd/mm/yyyy"/>
                  <CustomFormField
                    control={ form.control }
                    fieldType={ FormFieldType.DATE_PICKER }
                    name="endDate"
                    label="END DATE"
                    placeholder="dd/mm/yyyy"/>
                </div>
                <div>
                  <CustomFormField
                    control={ form.control }
                    fieldType={ FormFieldType.INPUT }
                    name="invoiceId"
                    label="INVOICE ID (OPTIONAL)"
                    placeholder="Invoice ID"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full gap-4 text-black">
                  <CustomFormField
                    control={ form.control }
                    fieldType={ FormFieldType.SELECT }
                    name="idTypeDetails"
                    label={ label }
                    options={ options }
                    placeholder={ placeholder }/>
                </div>
                <div>
                  <div className="flex justify-center w-full gap-4">
                    <CustomFormField
                      control={ form.control }
                      fieldType={ FormFieldType.INPUT }
                      name="amount"
                      label="AMOUNT"
                      placeholder="Amount"/>
                    <CustomFormField
                      control={ form.control }
                      fieldType={ FormFieldType.INPUT }
                      name="unit"
                      placeholder="Unit"
                      label="UNIT"/>
                  </div>
                </div>
              </div>
            </>
          ) }
          { currentStep > 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full gap-4">
                  <CustomRadioButton
                    label="MEASURE FUGITIVE EMISSIONS"
                    value={ measureFugitiveEmissionsFactor }
                    onChange={ setMeasureFugitiveEmissionsFactor }
                    options={ [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }] }
                    cols={ 2 }/>
                </div>
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="amountYearsBeginning"
                    fieldType={ FormFieldType.INPUT }
                    label="AMOUNT AT YEAR'S BEGINNING"
                    placeholder="000"/>
                  <CustomFormField
                    control={ form.control }
                    name="amountYearsEnd"
                    fieldType={ FormFieldType.INPUT }
                    label="AMOUNT AT YEAR'S END"
                    placeholder="000"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="purchased"
                    fieldType={ FormFieldType.INPUT }
                    label="PURCHASED"
                    placeholder="000"/>
                  <CustomFormField
                    control={ form.control }
                    name="delivered"
                    fieldType={ FormFieldType.INPUT }
                    label="DELIVERED"
                    placeholder="000"/>
                </div>
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="chargedIntoEquipment"
                    fieldType={ FormFieldType.INPUT }
                    label="CHARGED INTO THE EQUIPMENT"
                    placeholder="000"/>
                  <CustomRadioButton
                    label="CHARGED INTO THE EQUIPMENT"
                    value={ dontKnow }
                    options={ [{ value: '1', label: 'I don\'t know' }] }
                    onChange={ setDontKnow }
                    cols={ 1 }/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="returnsProducers"
                    fieldType={ FormFieldType.INPUT }
                    label="RETURNS TO PRODUCERS"
                    placeholder="000"/>
                  <CustomFormField
                    control={ form.control }
                    name="returnedUsers"
                    fieldType={ FormFieldType.INPUT }
                    label="RETURNED BY USERS"
                    placeholder="000"/>
                </div>
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="offSiteRecycling"
                    fieldType={ FormFieldType.INPUT }
                    label="OFF-SITE FOR RECYCLING"
                    placeholder="000"/>
                  <CustomFormField
                    control={ form.control }
                    name="offSiteDestruction"
                    fieldType={ FormFieldType.INPUT }
                    label="OFF-SITE FOR DESTRUCTION"
                    placeholder="000"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="returnedOffsiteRecycling"
                    fieldType={ FormFieldType.INPUT }
                    label="RETURN AFTER OFFSITE RECYCLING"
                    placeholder="000"/>
                  <CustomFormField
                    control={ form.control }
                    name="partialNAmeplateCharged"
                    fieldType={ FormFieldType.INPUT }
                    label="PARTIAL NAMEPLATE CAPACITY CHARGED"
                    placeholder="000"/>
                </div>
                <div className="flex justify-center w-full gap-4">
                  <CustomFormField
                    control={ form.control }
                    name="densityPressurePartial"
                    fieldType={ FormFieldType.INPUT }
                    label="DENSITY OR PRESSURE OF PARTIAL CHANGE"
                    placeholder="000"/>
                  <CustomFormField
                    control={ form.control }
                    name="densityPressureFull"
                    fieldType={ FormFieldType.INPUT }
                    label="DENSITY OR PRESSURE OF FULL CHARGE"
                    placeholder="000"/>
                </div>
              </div>
            </>
          ) }
          <div className="flex justify-end w-32 float-end">
            { currentStep < 2 ? (
              <Button
                type="button"
                className={ 'bg-[#9FA2B4] w-full py-6 hover:scale-95 transition duration-300 text-white' }
                onClick={ nextStep }
              >
                Next
              </Button>
            ) : (
              <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
                { !facility ? 'create' : 'update' }
              </SubmitButton>
            ) }
          </div>
        </form>
      </Form>
      <div className="flex items-center justify-center w-full gap-4 fixed bottom-1">
        <button
          type="button"
          onClick={ prevStep }
          className={
            cn(
              currentStep === 1 ? 'bg-[#000A14]' : 'bg-[#DFE0EB]',
              'w-4 h-4 rounded-full'
            ) }
        ></button>
        <button
          type="button"
          onClick={ nextStep }
          className={
            cn(
              currentStep > 1 ? 'bg-[#000A14]' : 'bg-[#DFE0EB]',
              'w-4 h-4 rounded-full'
            ) }
        ></button>
      </div>
    </>
  )
}
