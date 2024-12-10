import { CustomRadioButton } from "@/components/controls/radio-button/RadioButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import { VehicleDetails, VehicleDetailsValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import SubmitButton from '@/components/SubmitButton'
import { createVehicleDetails, updateVehicleDetails } from '@/actions/measure/details'
import { toast } from '@/components/ui/use-toast'
import { getCboTypes } from '@/actions/measure'
import { VLabel } from '@/constants/types'

type Props = { idControlVehicle: number; vehicle?: VehicleDetails; reloadData: () => void  };

export const VehiclesInvoiceForm = ({idControlVehicle, vehicle, reloadData}: Props) => {
  const [vehiclesCboTypes, setVehiclesCboTypes] = useState<VLabel[]>([])
  const [emissionsFactor, setEmissionsFactor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<VehicleDetails>({
    resolver: zodResolver(VehicleDetailsValidation),
    defaultValues: {
      active: vehicle?.active ?? 1,
      // @ts-ignore
      amount: vehicle?.amount ?? '0',
      endDate: vehicle?.endDate ?? new Date().toISOString(),
      idControlVehicle,
      idEmissionFactor: vehicle?.idEmissionFactor ?? 0,
      // @ts-ignore
      idVehicleCboType: vehicle?.idVehicleCboType ?? '0',
      invoiceId: vehicle?.invoiceId ?? "",
      startDate: vehicle?.startDate ?? new Date().toISOString(),
      unit: vehicle?.unit ?? '',
      idControlVehicleDetails: vehicle?.idControlVehicleDetails,
    },
  });

  async function onSubmit(vehicleDetails: VehicleDetails) {
    setIsLoading(true);
    try {
      const data = !vehicle
        ? await createVehicleDetails(vehicleDetails)
        : await updateVehicleDetails(vehicleDetails)

      console.log({ data })

      if (data.success) {
        toast({
          title: 'Success',
          description: `This invoice has been ${ !vehicle ? 'created' : 'updated' } successfully`,
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

  useEffect(() => {
    const loadData = async () => {
      const data = await getCboTypes()
      setVehiclesCboTypes(
        data.map(value => ({
          value: value.idVehicleCboType.toString(),
          label: value.description,
        }))
      )
    }

    loadData()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 text-neutral-500 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center w-full gap-4">
            <CustomRadioButton
              value={emissionsFactor}
              onChange={setEmissionsFactor}
              options={[
                { value: '1', label: 'Default' },
                { value: '2', label: 'Personalized' },
              ]}
              cols={2}
              label="EMISSIONS FACTOR"
              defaultSelected={0}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center w-full gap-4">
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
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="idVehicleCboType"
              label="TYPE"
              placeholder="Fuel Type"
              options={ vehiclesCboTypes }
            />
          </div>
          <div>
            <div className="flex justify-center w-full gap-4">
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
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton
            isLoading={isLoading}
            onClick={() => onSubmit(form.getValues())}
          >
            {"Update"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};