import { z } from 'zod'
import { useFormValidation } from '@/lib/validation'

const { ReportHeaderValidation } = useFormValidation();

type ReportHeader = z.infer<typeof ReportHeaderValidation>
type Props = { reportHeader?: ReportHeader }

export const useReportForm = ({ reportHeader }: Props) => {

  return {  }
}
