import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Form} from '@/components/ui/form'
import CustomFormField from '@/components/CustomFormField'
import {FormFieldType} from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import {Vehicle, VehicleValidation} from '@/lib/validation'
import Loading from '@/components/loading/LoadingBlack'
import {useDictionary} from "@/hooks/shared/useDictionary";
import {useVehicleStore} from "@/store/measure/vehicles";

type Props = {
  vehicle: Vehicle | null;
  statuses: Option[]
  brands: Option[]
  models: Option[]
  types: Option[]
  onSubmit: (vehicle: Vehicle) => Promise<void>;
}

const VehiclesForm = ({vehicle, statuses, brands, models, types, onSubmit}: Props) => {
  const { dictionary } = useDictionary();
  const { loading } = useVehicleStore()

  const form = useForm<Vehicle>({
    resolver: zodResolver(VehicleValidation),
    defaultValues: {
      idControlVehicle: vehicle?.idControlVehicle ?? 0,
      idUserControl: vehicle?.idUserControl ?? 0,
      idCboBrand: vehicle?.idCboBrand ?? 0,
      idCboModel: vehicle?.idCboModel ?? 0,
      idCboType: vehicle?.idCboType ?? 0,
      idStatus: vehicle?.idStatus ?? 0,
      licensePlate: vehicle?.licensePlate ?? "",
      name: vehicle?.name ?? "",
      active: vehicle?.active ?? 1,
    },
  });

  return (!dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-scroll no-scrollbar">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="idStatus"
            label={dictionary.measure.modalv.proper}
            placeholder={dictionary.measure.modalv.select}
            options={statuses}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="name"
            label={dictionary.measure.modalv.opt}
            placeholder={dictionary.measure.modalv.name}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="idCboBrand"
            label={dictionary.measure.modalv.brand}
            placeholder={dictionary.measure.modalv.selectb}
            options={brands}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="idCboModel"
            label={dictionary.measure.modalv.model}
            placeholder={dictionary.measure.modalv.selectm}
            options={models}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="idCboType"
            label={dictionary.measure.modalv.type}
            placeholder={dictionary.measure.modalv.selectt}
            options={types}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="licensePlate"
            label={dictionary.measure.modalv.license}
            placeholder={dictionary.measure.modalv.write}
            control={form.control}
          />
        </div>
        <SubmitButton isLoading={loading} className="flex items-center justify-center w-32 float-end">
          {!vehicle ? dictionary.measure.modalv.add : dictionary.measure.modalv.up}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default VehiclesForm
