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
} from '@/actions/measure/facilities'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField from '@/components/CustomFormField'
import { FormFieldType } from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import {
  ICboBrand,
  ICboModel,
  Status, ICboType,
  IMeasureContextType,
  IMeasureResponse,
  IVehicle,
  VLabel,
} from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { Vehicle, VehicleValidation } from '@/lib/validation'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack'

type Props = Readonly<{ vehicleMeasure?: IVehicle }>

const VehiclesForm = ({ vehicleMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cboStatuses, setCboStatuses] = useState<VLabel[]>([]);
  const [CboBrands, setCboBrands] = useState<VLabel[]>([]);
  const [CboModels, setCboModels] = useState<VLabel[]>([]);
  const [cboTypes, setCboTypes] = useState<VLabel[]>([]);
  const { addMeasure, handleHideModal, setData, setMeasure } =
    (useContext(MeasureContext) as IMeasureContextType) || {};
  const { toast } = useToast();
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";

  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.measure.modalv);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    };
    loadDictionary();
  }, [lang]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusResponse: Status[] = await getCboStatuses();
        const brandResponse: ICboBrand[] = await getCboBrands();
        const modelResponse: ICboModel[] = await getCboModels();
        const typeResponse: ICboType[] = await getCboTypes();
        const statuses: VLabel[] = statusResponse.map((status) => ({
          value: String(status.idStatus),
          label: status.description,
        }));
        const brands: VLabel[] = brandResponse.map((brand) => ({
          value: String(brand.idVehicleCboBrand),
          label: brand.description,
        }));
        const models: VLabel[] = modelResponse.map((brand) => ({
          value: String(brand.idVehicleCboModel),
          label: brand.description,
        }));
        const types: VLabel[] = typeResponse.map((type) => ({
          value: String(type.idVehicleCboType),
          label: type.description,
        }));

        setCboStatuses(statuses);
        setCboBrands(brands);
        setCboModels(models);
        setCboTypes(types);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<Vehicle>({
    resolver: zodResolver(VehicleValidation),
    defaultValues: {
      idControlVehicle: vehicleMeasure?.idControlVehicle ?? 0,
      idUserControl: vehicleMeasure?.idUserControl ?? 0,
      idCboBrand: vehicleMeasure?.idCboBrand ?? 0,
      idCboModel: vehicleMeasure?.idCboModel ?? 0,
      idCboType: vehicleMeasure?.idCboType ?? 0,
      idStatus: vehicleMeasure?.idStatus ?? 0,
      licensePlate: vehicleMeasure?.licensePlate ?? "",
      name: vehicleMeasure?.name ?? "",
      active: vehicleMeasure?.active ?? 1,
    },
  });

  if (!dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  async function onSubmit(vehicles: Vehicle) {
    setIsLoading(true)

    try {
      const description = `${dictionary.messages.this} ${ !vehicleMeasure ? dictionary.messages.inser : dictionary.messages.up } ${dictionary.messages.succ}`
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
        title: dictionary.messages.success,
        description: description,
        className: 'bg-black',
      })
      handleHideModal()
    } catch (error) {
      toast({
        variant: dictionary.messages.var,
        title: dictionary.messages.title,
        description: dictionary.messages.descrip4,
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
            label={dictionary.proper}
            placeholder={dictionary.select}
            options={ cboStatuses }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="name"
            label={dictionary.opt}
            placeholder={dictionary.name}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboBrand"
            label={dictionary.brand}
            placeholder={dictionary.selectb}
            options={ CboBrands }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboModel"
            label={dictionary.model}
            placeholder={dictionary.selectm}
            options={ CboModels }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="idCboType"
            label={dictionary.type}
            placeholder={dictionary.selectt}
            options={ cboTypes }
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="licensePlate"
            label={dictionary.license}
            placeholder={dictionary.write}
            control={ form.control }
          />
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !vehicleMeasure ? dictionary.add : dictionary.up }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default VehiclesForm
