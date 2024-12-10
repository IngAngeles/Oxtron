import { CustomRadioButton } from "@/components/controls/radio-button/RadioButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import { TravelDetails, TravelDetailsValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import SubmitButton from '@/components/SubmitButton'
import { createTravelDetails, updateTravelDetails } from '@/actions/measure/details'
import { toast } from '@/components/ui/use-toast'
import { VLabel } from '@/constants/types'
import { getCboModeTransport } from '@/actions/measure'

type Props = { idControlTravel: number; travel?: TravelDetails; reloadData: () => void  };

export const TravelsInvoiceForm = ({idControlTravel, travel, reloadData}: Props) => {
  const [cboModeTransport, setCboModeTransport] = useState<VLabel[]>([])
  const [emissionsFactor, setEmissionsFactor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    const loadData = async () => {
      const data = await getCboModeTransport()
      setCboModeTransport(
        data.map(value => ({
          value: value.idCommutingCboModeTransport.toString(),
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
          <div className="flex items-end justify-center w-full gap-4">
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
          <div className="flex items-end justify-center w-full gap-4">
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
          <div className="flex items-end justify-center w-full gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="idTravelCboType"
              label="TRANSPORT"
              placeholder="Mode of Transport"
              options={ cboModeTransport }
            />
          </div>
          <div>
            <div className="flex items-end justify-center w-full gap-4">
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