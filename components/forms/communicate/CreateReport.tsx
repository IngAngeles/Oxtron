import { useContext, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Modal } from '@/components/shared/Modal'
import { CommunicateContext, ICommunicateContext } from '@/context/communicate'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReportHeaderValidation } from '@/lib/validation'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { SendHorizonal } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { createReport, updateReport } from '@/actions/communicate'
import { getCboTypes } from '@/actions/communicate'
import { VLabel } from '@/constants/types'

type ReportHeader = z.infer<typeof ReportHeaderValidation>
type Props = { reportHeader?: ReportHeader }

export const CreateReport = ({ reportHeader }: Props) => {
  const { showCreateReportModal, handleHideCreateReportModal } = useContext(CommunicateContext) as ICommunicateContext
  const [types, setTypes] = useState<VLabel[]>([])
  const [error, setError] = useState<AxiosError | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<ReportHeader>({
    resolver: zodResolver(ReportHeaderValidation),
    defaultValues: {
      idControl: reportHeader?.idControl,
      idUserControl: reportHeader?.idUserControl || 0,
      preparedBy: reportHeader?.preparedBy,
      facilityId: reportHeader?.facilityId,
      idType: reportHeader?.idType || 0,
      typeDescription: reportHeader?.typeDescription,
      startDate: reportHeader?.startDate || '',
      endDate: reportHeader?.endDate || '',
      active: reportHeader?.active || 1,
    }
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await getCboTypes()
        setTypes(response)
      } catch (error) {
        console.error({ error })
        setError(error as AxiosError)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])


  const handleCreateReport = async ({
    idUserControl,
    facilityId,
    preparedBy,
    idType,
    typeDescription,
    startDate,
    endDate,
    active,
  }: ReportHeader) => {
    await createReport({
      idUserControl,
      facilityId,
      preparedBy,
      idType,
      typeDescription,
      startDate,
      endDate,
      active
    })
    toast({
      title: 'Success',
      description: 'This report has been inserted successfully',
      className: 'bg-black',
    })
  }

  const handleUpdateReport = async (report: ReportHeader) => {
    const response = await updateReport(report)
    console.log({ response })
    toast({
      title: 'Success',
      description: 'This report has been updated successfully',
      className: 'bg-black',
    })
  }

  async function onSubmit(report: ReportHeader) {
    try {
      setIsLoading(true)
      if (!reportHeader) {
        await handleCreateReport(report)
      } else {
        await handleUpdateReport(report)
      }
    } catch (error) {
      console.error('CreateReport->onSubmit', { error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="New Report"
      Icon={ SendHorizonal }
      open={ showCreateReportModal }
      onClose={ handleHideCreateReportModal }
      className="w-10/12 xl:w-1/4 lg:w-1/3 md:w-1/2 md:h-[65vh]"
    >
      <Form { ...form }>
        <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col items-center justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-">
            <div className="flex flex-row lg:flex-row col-span-2 space-x-8">
              <CustomFormField
                fieldType={ FormFieldType.DATE_PICKER }
                name="startDate"
                label="START DATE"
                placeholder="dd/mm/yyyy"
                control={ form.control }/>
              <CustomFormField
                fieldType={ FormFieldType.DATE_PICKER }
                name="endDate"
                label="END DATE"
                placeholder="dd/mm/yyyy"
                control={ form.control }/>
            </div>
            <div className="col-span-2">
              <CustomFormField
                fieldType={ FormFieldType.SELECT }
                name="idType"
                label="TYPE"
                placeholder="Select Activity Type"
                options={ types }
                control={ form.control }/>
            </div>
          </div>
          <div className="flex items-center justify-end w-32 float-end">
            <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
              { !reportHeader ? 'Add' : 'Update' }
            </SubmitButton>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
