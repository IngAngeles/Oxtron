import {Form} from '@/components/ui/form'
import CustomFormField from '@/components/CustomFormField'
import {FormFieldType} from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import {Logistic} from '@/lib/validation'
import {Button} from '@/components/ui/button'
import Loading from '@/components/loading/LoadingBlack';
import {useLogisticStore} from '@/store/measure/logistics'

type Props = {
  logistic: Logistic | null,
  dictionary: any,
  currentStep: number,
  nextStep: () => void,
  prevStep: () => void,
  statuses: Option[],
  types: Option[],
  models: Option[],
  brands: Option[],
  vehicles: Option[],
  onSubmit: (logistic: Logistic) => void,
  isDisabled: boolean,
  form: any,
  steps: number,
}

type StepProps = { dictionary: any, form: any }

const TravelsForm = ({
  logistic,
  dictionary,
  statuses,
  types,
  models,
  brands,
  // vehicles,
  currentStep,
  nextStep,
  // prevStep,
  steps,
  form,
  isDisabled,
  onSubmit,
}: Props) => {
  const {loading} = useLogisticStore()
  return (!dictionary || loading) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentStep === 0 && (
            <StepOne dictionary={dictionary} form={form}/>
          )}
          {currentStep === 1 && (
            <StepTwo dictionary={dictionary} form={form} statuses={statuses} types={types} models={models} brands={brands}/>
          )}
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          {currentStep < steps - 1 ? (
            <Button
              type="button"
              className={'bg-[#9FA2B4] w-full py-6 hover:scale-95 transition duration-300 text-white'}
              disabled={isDisabled}
              onClick={nextStep}
            >
              Next
            </Button>
          ) : (
            <SubmitButton isLoading={loading} onClick={() => onSubmit(form.getValues())}>
              {!logistic ? dictionary.add : dictionary.up}
            </SubmitButton>
          )}
        </div>
      </form>
    </Form>
  )
}

const StepOne = ({dictionary, form}: StepProps) => {
  return (
    <>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="origin"
        label={dictionary.origin}
        placeholder={dictionary.label}
        control={form.control}
      />
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="destination"
        label={dictionary.desti}
        placeholder={dictionary.label1}
        control={form.control}/>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        placeholder={dictionary.zip}
        name="originzc"
        label={dictionary.label2}
        control={form.control}/>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        placeholder={dictionary.code}
        name="destinationzc"
        label={dictionary.label3}
        control={form.control}/>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        placeholder={dictionary.load}
        name="loadLogistic"
        label={dictionary.label4}
        control={form.control}/>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        placeholder={dictionary.client}
        name="client"
        label={dictionary.label5}
        control={form.control}/>
    </>
  )
}

const StepTwo = ({dictionary, form, statuses, types, models, brands,}: Readonly<StepProps & {
  statuses: Option[],
  types: Option[],
  models: Option[],
  brands: Option[],
}>) => {
  return (
    <>
      <CustomFormField
        fieldType={FormFieldType.SELECT}
        name="idCboStatus"
        label={dictionary.label6}
        placeholder={dictionary.status}
        options={statuses}
        control={form.control}
      />
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        placeholder={dictionary.name}
        name="name"
        label={dictionary.label7}
        control={form.control}/>
      <CustomFormField
        fieldType={FormFieldType.SELECT}
        name="idTravelCboType"
        label={dictionary.label8}
        placeholder={dictionary.type}
        options={types}
        control={form.control}
      />
      <CustomFormField
        fieldType={FormFieldType.SELECT}
        name="idCboModel"
        label={dictionary.label9}
        placeholder={dictionary.model}
        options={models}
        control={form.control}
      />
      <CustomFormField
        fieldType={FormFieldType.SELECT}
        name="idCboBrand"
        label={dictionary.label10}
        placeholder={dictionary.brand}
        options={brands}
        control={form.control}
      />
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        placeholder={dictionary.licen}
        name="licensePlate"
        label={dictionary.label11}
        control={form.control}/>
    </>
  )
}

export default TravelsForm
