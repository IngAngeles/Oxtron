import { z } from 'zod'
import { ReportHeaderValidation } from '@/lib/validation'

type ReportHeader = z.infer<typeof ReportHeaderValidation>
type Props = { reportHeader?: ReportHeader }

export const useReportForm = ({ reportHeader }: Props) => {

  return {  }
}
