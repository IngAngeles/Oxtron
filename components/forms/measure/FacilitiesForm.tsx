import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createFacility, deleteFacility, getCboStatuses, updateFacility } from '@/actions/measure/facilities'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { useToast } from '@/components/ui/use-toast'
import { Facility, FacilityValidation } from '@/lib/validation'
import { ICboStatus, IFacility, IMeasureContextType, IMeasureResponse, VLabel } from '@/constants/types'
import { MeasureContext } from '@/context/measure'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = Readonly<{ facilityMeasure?: IFacility }>

const FacilitiesForm = ({ facilityMeasure }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [cboStatuses, setCboStatuses] = useState<VLabel[]>([])
  const { setMeasure, handleHideModal, addMeasure, setData } = useContext(MeasureContext) as IMeasureContextType || {}
  const { toast } = useToast()
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  const handleCreateFacility = async (facility: Facility) => {
    await createFacility(facility)
    addMeasure(facility as unknown as IMeasureResponse)
    toast({
      title: 'Success',
      description: 'This facility has been inserted successfully',
      className: 'bg-black',
    })
  }

  const handleUpdateFacility = async (facility: Facility) => {
    const updatedFacility = {
      ...facilityMeasure, ...facility,
      idControlFacility: facilityMeasure?.idControlFacility
    } as unknown as IFacility
    setMeasure(updatedFacility as unknown as IMeasureResponse)
    await updateFacility(updatedFacility)
    setMeasure(undefined)

    setData(prevState =>
      prevState.map(measure => {
        const measureFacility: IFacility = measure as unknown as IFacility
        return measureFacility.idControlFacility === facility.idControlFacility ? facility as unknown as IMeasureResponse : measure as unknown as IMeasureResponse
      })
    )
    toast({
      title: 'Success',
      description: 'This facility has been updated successfully',
      className: 'bg-black',
    })
  }

  const handleDeleteFacility = async (idControlFacility: number) => {
    await deleteFacility(idControlFacility.toString())
    setData(prevState =>
      prevState.filter(measure => {
        const measureFacility: IFacility = measure as unknown as IFacility
        return measureFacility.idControlFacility !== idControlFacility
      })
    )
    toast({
      title: 'Success',
      description: 'This facility has been deleted successfully',
      className: 'bg-black',
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusResponse: ICboStatus[] = await getCboStatuses()
        const statuses: VLabel[] = statusResponse.map(status => ({
          value: String(status.idStatus),
          label: status.description
        }))
        setCboStatuses(statuses)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  const form = useForm<Facility>({
    resolver: zodResolver(FacilityValidation),
    defaultValues: {
      idControlFacility: facilityMeasure?.idControlFacility ?? 0,
      idUserControl: facilityMeasure?.idUserControl ?? 0,
      idFacility: facilityMeasure?.idFacility ?? '',
      city: facilityMeasure?.city ?? '',
      country: facilityMeasure?.country ?? '',
      description: facilityMeasure?.description ?? '',
      propertyStatus: facilityMeasure?.propertyStatus ?? 0,
      active: facilityMeasure?.active ?? 1,
    },
  })

  async function onSubmit(facility: Facility) {
    setIsLoading(true)

    try {
      if (!facilityMeasure) {
        await handleCreateFacility(facility)
      } else {
        await handleUpdateFacility(facility)
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
      console.error('FacilitiesForm:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.measure.modal);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  return (isLoading || !dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading />
    </div>
  ) : (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-">
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            name="idFacility"
            label={dictionary.title}
            placeholder={dictionary.write}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            name="propertyStatus"
            label={dictionary.status}
            placeholder={dictionary.status}
            options={ cboStatuses }
            control={ form.control }
          >
            { facilityMeasure ? cboStatuses.find(value => facilityMeasure.propertyStatus.toString() === value.value)?.label : null }
          </CustomFormField>
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.city}
            name="city"
            label={dictionary.city}
            control={ form.control }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            placeholder={dictionary.country}
            name="country"
            label={dictionary.country}
            control={ form.control }
          />
          <div className="col-span-2">
            <CustomFormField
              fieldType={ FormFieldType.TEXTAREA }
              placeholder={dictionary.desc}
              name="description"
              label={dictionary.desc}
              control={ form.control }
            />
          </div>
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
            { !facilityMeasure ? dictionary.add : dictionary.button }
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default FacilitiesForm
