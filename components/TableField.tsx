'use client'
import React, {useEffect} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline'
import Loading from '@/components/loading/LoadingBlack'
import { formatDateTime } from '@/lib/utils'
import {useCommunicateStore} from "@/store/communicate";

const TableField = () => {
  const { fetchReports, reports, loading, error, setReport } = useCommunicateStore()

  useEffect(() => {
    fetchReports()
  }, []);

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
          { reports.map((report, index) => (
            <TableRow key={ index }>
              <TableCell className="text-center hidden md:table-cell">
                <EyeIcon className="w-4 h-4 cursor-pointer" onClick={ () => setReport(report) }/>
              </TableCell>
              <TableCell className="font-medium">
                { report.firstName }
              </TableCell>
              <TableCell className="hidden md:table-cell">{ report.idFacility }</TableCell>
              <TableCell className="hidden md:table-cell">{ report.type }</TableCell>
              <TableCell className="hidden md:table-cell">{ formatDateTime(report.startDate).dateDay }</TableCell>
              <TableCell className="hidden md:table-cell">{ formatDateTime(report.endDate).dateDay }</TableCell>
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
