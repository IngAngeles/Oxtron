'use client'
import { fetchRecentReports, showReport } from '@/actions/communicate'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ReportHeader } from '@/constants/types'
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/loading/LoadingBlack'
import { CommunicateContext, ICommunicateContext } from '@/context/communicate'
import { formatDateTime } from '@/lib/utils'

/* const invoices = [
  {
    view: EyeIcon,
    prepared: "Mary J.",
    facility: "F_001",
    type: "Heating & Cooling",
    start: "12/07/2022",
    end: "12/07/2022"
  },
  {
    view: EyeIcon,
    prepared: "Rafa C.",
    facility: "F_001",
    type: "Transportation",
    start: "12/07/2022",
    end: "12/07/2022"
  },
  {
    view: EyeIcon,
    prepared: "Allen J.",
    facility: "F_001",
    type: "Refrigerants",
    start: "12/07/2022",
    end: "12/07/2022"
  },
]; */

const TableField = () => {
  const [data, setData] = useState<ReportHeader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError | null>(null)
  const { setReport, handleShowReportModal } = React.useContext(CommunicateContext) as ICommunicateContext

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchRecentReports()
        console.log(response)
        setData(response)
      } catch (error) {
        console.error({ error })
        setError(error as AxiosError)
    } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleShowReport = async (idUserControl: number, startDate: string, endDate: string, type: number) => {
    try {
      const response: ReportHeader = await showReport(idUserControl, startDate, endDate, type)
      setReport(response)
      handleShowReportModal()
    } catch (error) {
      console.error(error)
    }
  }

  return !loading ? (
    !error ? (
      <Table style={ { color: 'black' } }>
        <TableHeader>
          <TableRow style={ { color: 'gray', fontSize: '11px' } }>
            <TableHead className="w-[100px] hidden md:table-cell">View</TableHead>
            <TableHead className="w-[100px]">Prepared By</TableHead>
            <TableHead className="hidden md:table-cell">Facility ID</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Start Date</TableHead>
            <TableHead className="hidden md:table-cell">End Date</TableHead>
            <TableHead className="w-[50px]">PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { data.map(({ idFacility, idUserControl, type, idControlFacility, startDate, endDate, idControlCommunicate }, index) => (
            <TableRow key={ index }>
              <TableCell className="text-center hidden md:table-cell">
                <EyeIcon className="w-4 h-4 cursor-pointer" onClick={ () => handleShowReport(idUserControl, startDate.toISOString(), endDate.toISOString(), 1) }/>
              </TableCell>
              <TableCell className="font-medium">
                { idUserControl ?? idUserControl }
              </TableCell>
              <TableCell className="hidden md:table-cell">{ idFacility }</TableCell>
              <TableCell className="hidden md:table-cell">{ type }</TableCell>
              <TableCell className="hidden md:table-cell">{ formatDateTime(startDate).dateDay }</TableCell>
              <TableCell className="hidden md:table-cell">{ formatDateTime(endDate).dateDay }</TableCell>
              <TableCell>
                <ArrowDownTrayIcon className="w-4 h-4"/>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    ) : (
      <div className="flex items-center justify-center w-full h-full text-black">
        <span className="font-bold text-neutral-700 text-2xl text-center">No data</span>
      </div>
    )
  ) : (
    <Loading />
  )
}

export default TableField
