import { createContext, useState } from 'react'
import { ReportHeader } from '@/constants/types'

export interface ICommunicateContext {
  report?: ReportHeader
  setReport: (report: ReportHeader) => void
  showReportModal: boolean
  handleHideReportModal: () => void
  handleShowReportModal: () => void
  showCreateReportModal: boolean
  handleHideCreateReportModal: () => void
  handleShowCreateReportModal: () => void
}

export const CommunicateContext = createContext<ICommunicateContext | null>(null);
export const CommunicateProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [report, setReport] = useState<ReportHeader | undefined>(undefined)
  const [showReportModal, setShowReportModal] = useState<boolean>(false)
  const [showCreateReportModal, setShowCreateReportModal] = useState<boolean>(false)
  const handleHideReportModal = () => setShowReportModal(false)
  const handleShowReportModal = () => setShowReportModal(true)
  const handleHideCreateReportModal = () => setShowCreateReportModal(false)
  const handleShowCreateReportModal = () => setShowCreateReportModal(true)

  return (
    <CommunicateContext.Provider value={ { report, setReport, showReportModal, handleHideReportModal, handleShowReportModal, showCreateReportModal, handleHideCreateReportModal, handleShowCreateReportModal } }>
      { children }
    </CommunicateContext.Provider>
  )
}
