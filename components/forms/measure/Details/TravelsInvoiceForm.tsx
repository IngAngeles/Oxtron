import {CustomRadioButton} from "@/components/controls/radio-button/RadioButton";
import CustomFormField, {FormFieldType} from "@/components/CustomFormField";
import {Form} from "@/components/ui/form";
import {TravelDetails, TravelDetailsValidation, VehicleDetails} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import SubmitButton from '@/components/SubmitButton'
import {getDictionary} from "@/lib/dictionary";
import {usePathname} from "next/navigation";
import {Locale} from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';
import {createTravelDetails, updateTravelDetails} from "@/actions/measure/details";
import {toast} from "@/components/ui/use-toast";

type Props = { idControlTravel: number; travel?: TravelDetails; reloadData: () => void };

export const TravelsInvoiceForm = ({idControlTravel, travel, reloadData}: Props) => {
  const [emissionsFactor, setEmissionsFactor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setIsLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.measure.createm.man);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  const form = useForm<TravelDetails>({
    resolver: zodResolver(TravelDetailsValidation),
    defaultValues: {
      active: travel?.active ?? 1,
      destiny: travel?.destiny ?? '',
      endDate: travel?.endDate ?? new Date().toISOString(),
      idControlTravel,
      idEmissionFactor: travel?.idEmissionFactor ?? Number(emissionsFactor),
      // @ts-ignore
      idTravelCboType: travel?.idTravelCboType ?? '0',
      invoiceId: travel?.invoiceId ?? "",
      origin: travel?.origin ?? '',
      startDate: travel?.startDate ?? new Date().toISOString(),
      idControlTravelDetails: travel?.idControlTravelDetails,
    },
  });

  async function onSubmit(travelDetails: TravelDetails) {
    setIsLoading(true);
    try {
      const data = !travel
        ? await createTravelDetails(travelDetails)
        : await updateTravelDetails(travelDetails)

      if (data.success) {
        toast({
          title: 'Success',
          description: `This invoice has been ${ !travel ? 'created' : 'updated' } successfully`,
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
    } finally{
      setIsLoading(false);
    }
  }

  return (isLoading || !dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 text-neutral-500 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomRadioButton
              value={emissionsFactor}
              onChange={setEmissionsFactor}
              options={[
                {value: "1", label: dictionary.lab1},
                // {value: "2", label: dictionary.lab2},
              ]}
              cols={2}
              label={dictionary.label}
              defaultSelected={0}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="startDate"
              label={dictionary.label2}
              placeholder="dd/mm/yyyy"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="endDate"
              label={dictionary.label3}
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="invoiceId"
              label={dictionary.label1}
              placeholder={dictionary.id}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="fuelType"
              label={dictionary.label6}
              placeholder={dictionary.tran}
            />
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="amount"
                label={dictionary.label4}
                placeholder={dictionary.amo}
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="unit"
                placeholder={dictionary.unit}
                label={dictionary.label5}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton
            isLoading={isLoading}
            onClick={() => onSubmit(form.getValues())}
          >
            {dictionary.up}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};