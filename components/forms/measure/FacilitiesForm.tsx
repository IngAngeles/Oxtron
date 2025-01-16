import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useFormValidation, Facility } from "@/lib/validation";
import { useDictionary } from "@/hooks/shared/useDictionary";
import { handleFacilitySubmit } from "@/services/measure/facility";

type Props = {
  facility: Facility | null;
  options: Option[];
  handleCreateFacility: (facility: Facility) => Promise<void>;
  handleUpdateFacility: (facility: Facility) => Promise<void>;
};

const FacilitiesForm = ({
  facility,
  options,
  handleCreateFacility,
  handleUpdateFacility,
}: Props) => {
  const { isLoading, dictionary } = useDictionary();
  const { FacilityValidation } = useFormValidation();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const form = useForm<Facility>({
    resolver: zodResolver(FacilityValidation),
    defaultValues: {
      idControlFacility: facility?.idControlFacility ?? 0,
      idUserControl: facility?.idUserControl ?? 0,
      idFacility: facility?.idFacility ?? "",
      city: facility?.city ?? "",
      country: facility?.country ?? "",
      description: facility?.description ?? "",
      propertyStatus: facility?.propertyStatus ?? 0,
      active: facility?.active ?? 1,
    },
  });

  const onSubmit = async (facility: Facility) => {
    setIsSubmitted(true);
    await handleFacilitySubmit({
      facility,
      handleCreateFacility,
      handleUpdateFacility,
    });
    setIsSubmitted(false);
  };

  return isLoading || !dictionary ? null : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 text-neutral-500 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="idFacility"
            label={dictionary.measure.modal.title}
            placeholder={dictionary.measure.modal.write}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="propertyStatus"
            label={dictionary.measure.modal.status}
            placeholder={dictionary.measure.modal.status}
            options={options}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="city"
            placeholder={dictionary.measure.modal.city}
            label={dictionary.measure.modal.city}
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="country"
            label={dictionary.measure.modal.country}
            placeholder={dictionary.measure.modal.country}
            control={form.control}
          />
          <div className="col-span-2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="description"
              label={dictionary.measure.modal.desc}
              placeholder={dictionary.measure.modal.desc}
              control={form.control}
            />
          </div>
        </div>
        <SubmitButton
          isLoading={isSubmitted}
          className="flex items-center justify-center w-32 float-end"
        >
          {facility
            ? dictionary.measure.modal.button
            : dictionary.measure.modal.add}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default FacilitiesForm;
