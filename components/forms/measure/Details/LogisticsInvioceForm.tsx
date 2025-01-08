'use client'
import { CustomRadioButton } from "@/components/controls/radio-button/RadioButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import { LogisticDetails, LogisticDetailsValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {createLogisticDetails, getDistance, updateLogisticDetails} from '@/actions/measure/details'
import { VLabel } from '@/constants/types'
import { getCboTypes } from '@/actions/communicate'
import { toast } from '@/components/ui/use-toast'

type Props = { idControlLogistics: number; logistic?: LogisticDetails; reloadData: () => void };

export const LogisticsInvoiceForm = ({idControlLogistics, logistic, reloadData}: Props) => {
  const [emissionsFactor, setEmissionsFactor] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fuelType, setFuelType] = useState<VLabel[]>([])
  const form = useForm<LogisticDetails>({
    resolver: zodResolver(LogisticDetailsValidation),
    defaultValues: {
      active: logistic?.active ?? 1,
      // @ts-ignore
      amount: logistic?.amount ?? '0',
      destiny: logistic?.destiny ?? '',
      endDate: logistic?.endDate ?? new Date().toISOString(),
      idControlLogistics,
      idControlLogisticsDetails: logistic?.idControlLogisticsDetails ?? 0,
      idEmissionFactor: logistic?.idEmissionFactor ?? Number(emissionsFactor),
      // @ts-ignore
      idFuelType: logistic?.idFuelType ?? '0',
      invoiceId: logistic?.invoiceId ?? '',
      origin: logistic?.origin ?? '',
      startDate: logistic?.startDate ?? new Date().toISOString(),
      unit: logistic?.unit ?? '',
    },
  });

  async function onSubmit(logisticsDetails: LogisticDetails) {
    setIsLoading(true);
    try {
      const data = !logistic
        ? await createLogisticDetails(logisticsDetails)
        : await updateLogisticDetails(logisticsDetails)

      if (data.success) {
        toast({
          title: 'Success',
          description: `This invoice has been ${!logistic ? 'created' : 'updated'} successfully`,
          className: 'bg-black',
        })
        form.reset()
        reloadData()
      }
    } catch (error) {
      console.error({error})
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await getCboTypes()
      setFuelType(data)
    }

    loadData()
  }, [])

  useEffect(() => {
    const origin = form.getValues('origin');
    const destiny = form.getValues('destiny');

    if (origin && destiny && origin.length >= 4 && destiny.length >= 4 && !isNaN(Number(origin)) && !isNaN(Number(destiny))) {
      getDistance(Number(origin), Number(destiny)).then((result) => {
        if (result?.success) {
          // @ts-ignore
          form.setValue('amount', result?.data?.distance);
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'It was not possible to calculate the distance between these postal codes.',
            className: 'bg-[#7f1d1d]',
          })
        }
      });
    }
  }, [form.getValues('origin'), form.getValues('destiny')]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 text-neutral-500 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center w-full gap-4">
            <CustomRadioButton
              value={ emissionsFactor }
              onChange={ setEmissionsFactor }
              options={ [
                { value: '1', label: 'Default' },
                // { value: '2', label: 'Personalized' },
              ] }
              cols={ 2 }
              label="EMISSIONS FACTOR"
              defaultSelected={ 0 }/>
          </div>
          <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="origin"
              label="ORIGIN"
              placeholder="Origin"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="destiny"
              label="DESTINY"
              placeholder="Destiny"
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
          {/* <div className="flex justify-center w-full gap-4">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="idFuelType"
              label="FUEL TYPE"
              placeholder="Fuel Type"
              options={fuelType}
            />
          </div> */ }
          <div>
            <div className="flex justify-center w-full gap-4">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="amount"
                label="AMOUNT"
                placeholder="Amount"
                disabled
              />
              {/* <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="unit"
                placeholder="Unit"
                label="UNIT"
              /> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-32 float-end">
          <SubmitButton
            isLoading={isLoading}
            onClick={() => onSubmit(form.getValues())}
          >
            { !logistic ? 'create' : 'update' }
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};