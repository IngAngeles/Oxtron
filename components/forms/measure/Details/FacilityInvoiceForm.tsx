import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CustomRadioButton } from "@/components/controls/radio-button/RadioButton";
import { FacilityDetails, FacilityDetailsValidation } from "@/lib/validation";
import SubmitButton from "@/components/SubmitButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import Loading from '@/components/loading/LoadingBlack';

type Props = { idControlFacility: number };

export const FacilityInvoiceForm = ({ idControlFacility }: Props) => {
  const [idType, setIdType] = useState<string>("");
  const [emissionsFactor, setEmissionsFactor] = useState<string>("");
  const [measureFugitiveEmissionsFactor, setMeasureFugitiveEmissionsFactor] =
    useState<string>("");
  const [chargeIntoEquipment, setChargeIntoEquipment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();
  const lang: Locale = (pathname?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

   useEffect(() => {
      const loadDictionary = async () => {
        try {
          setLoading(true);
          const dict = await getDictionary(lang);
          setDictionary(dict.pages.measure.createm.fac);
        } catch (error) {
          console.error("Error loading dictionary:", error);
        } finally {
            setLoading(false);
          }
      };
          
        loadDictionary();
      }, [lang]);

  const form = useForm<FacilityDetails>({
    resolver: zodResolver(FacilityDetailsValidation),
    defaultValues: {
      idControlFacility,
      amount: 0,
      amountYearsBeginning: 0,
      amountYearsEnd: 0,
      chargedIntoEquipment: 0,
      delivered: 0,
      densityPressureFull: 0,
      densityPressurePartial: 0,
      dontKnow: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      invoiceId: "",
      idControlFacilityDetails: 0,
      idEmissionFactor: 0,
      idType: Number(idType),
      idTypeDetails: 0,
      measureFugitive: 0,
      offSiteDestruction: 0,
      offSiteRecycling: 0,
      partialNAmeplateCharged: 0,
      purchased: 0,
      returnedOffsiteRecycling: 0,
      returnedUsers: 0,
      returnsProducers: 0,
      unit: "",
      typeEquipment: "",
      active: 0,
    },
  });

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }

  async function onSubmit(facilityDetails: FacilityDetails) {
    setIsLoading(true);
    try {

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
        {/*<div className="grid grid-cols-1 gap-4">
          <CustomRadioButton
            value={idType}
            onChange={setIdType}
            options={[
              { value: "1", label: "Opción 1" },
              { value: "2", label: "Opción 2" },
              { value: "3", label: "Opción 3" },
              { value: "4", label: "Opción 4" },
            ]}
            label="SELECT TYPE"
            defaultSelected={ 0 }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomRadioButton
              value={emissionsFactor}
              onChange={setEmissionsFactor}
              options={[
                { value: "1", label: "Opción 1" },
                { value: "2", label: "Opción 2" },
              ]}
              cols={ 2 }
              label="EMISSIONS FACTOR"
              defaultSelected={ 0 }
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label="TYPE OF EQUIPMENT"
              placeholder="Write Type of Equipment"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="startDate"
              label="START DATE"
              placeholder="dd/mm/yyyy"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="endDate"
              label="END DATE"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="invoiceId"
              label="INVOICE ID (OPTIONAL)"
              placeholder="Invoice ID"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="fuelType"
              label="TYPE"
              placeholder="Fuel Type"
            />
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="amount"
                label="AMOUNT"
                placeholder="Amount"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="unit"
                placeholder="Unit"
                label="UNIT"
              />
            </div>
          </div>
        </div>*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomRadioButton
              value={measureFugitiveEmissionsFactor}
              onChange={setMeasureFugitiveEmissionsFactor}
              options={[
                { value: "1", label: dictionary.lab1 },
                { value: "2", label: dictionary.lab2 },
              ]}
              cols={2}
              label={dictionary.emi}
              defaultSelected={0}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label1}
              placeholder="000"
            />
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label2}
              placeholder="000"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name=" Npurchased"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label3}
              placeholder="000"
            />
            <CustomFormField
              control={form.control}
              name=" Ndelivered"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label4}
              placeholder="000"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name=" NchargedIntoEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label5}
              placeholder="000"
            />

            <CustomRadioButton
              value={chargeIntoEquipment}
              onChange={setChargeIntoEquipment}
              options={[{ value: "1", label: dictionary.label6 }]}
              cols={1}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label7}
              placeholder="000"
            />
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label8}
              placeholder="000"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label9}
              placeholder="000"
            />
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label10}
              placeholder="000"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label11}
              placeholder="000"
            />
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label12}
              placeholder="000"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label13}
              placeholder="000"
            />
            <CustomFormField
              control={form.control}
              name="typeEquipment"
              fieldType={FormFieldType.INPUT}
              label={dictionary.label14}
              placeholder="000"
            />
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