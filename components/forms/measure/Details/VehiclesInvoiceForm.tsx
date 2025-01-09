import { CustomRadioButton } from "@/components/controls/radio-button/RadioButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import { VehicleDetails, VehicleDetailsValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from '@/components/SubmitButton'
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = { idControlVehicle: number };

export const VehiclesInvoiceForm = ({idControlVehicle}: Props) => {
  const [emissionsFactor, setEmissionsFactor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);
      
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        setDictionary(dict.pages.measure.createm.man);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
          setLoading(false);
        }
    };
              
      loadDictionary();
    }, [lang]);

  const form = useForm<VehicleDetails>({
    resolver: zodResolver(VehicleDetailsValidation),
    defaultValues: {
      active: 1,
      amount: 0,
      endDate: new Date().toISOString(),
      idControlVehicle,
      idEmissionFactor: 0,
      idVehicleCboType: 0,
      invoiceId: "",
      startDate: new Date().toISOString(),
    },
  });

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  async function onSubmit(vehicleDetails: VehicleDetails) {
    setIsLoading(true);
    try {
      console.log({ vehicleDetails })
    } catch (error) {

    } finally{
      setIsLoading(false);
    }
  }

  return (
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
                { value: "1", label: dictionary.lab1 },
                { value: "2", label: dictionary.lab2 },
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
              label={dictionary.label7}
              placeholder={dictionary.cal}
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
            { dictionary.up }
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};