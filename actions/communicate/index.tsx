'use server'

import { auth } from '@/auth'
import { CBOType, ReportHeader, VLabel } from '@/constants/types'
import axiosInstance from '@/lib/axios-instance'


export async function fetchRecentReports(): Promise<ReportHeader[]> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    const response = await axiosInstance.get(`ReportHeader/Mostrar_ReportHeader_User?idUser=${ idUser }`)

    console.log({ response: response.data, message: response.statusText })

    return response.data as ReportHeader[]
  } catch (error) {
    console.error('communicate->fetchRecentReports:', { error })
    throw error
  }
}

export async function createReport({
  idUserControl,
  facilityId,
  preparedBy,
  idType,
  typeDescription,
  startDate,
  endDate,
  active,
}: ReportHeader) {
  try {
    const response = await axiosInstance.post('/ReportHeader/Registrar_ReportHeader', null, {
      params: {
        idUserControl,
        facilityId,
        preparedBy,
        idType,
        typeDescription,
        startDate,
        endDate,
        active,
      },
    })

    return response.data as ReportHeader
  } catch (error) {
    console.error('Error creating Report', error)
    throw error
  }
}

export async function updateReport(data: ReportHeader) {
  try {
    const response = await axiosInstance.put('/ReportHeader/Actualizar_ReportHeader', data)

    return response.data as ReportHeader
  } catch (error) {
    console.error('Error creating Report', error)
    throw error
  }
}

export async function showReport(idUserControl: number, startDate: string, endDate: string, type: number) {
  try {
    const response = await axiosInstance.get(`/Report/Listar_Reporte?idUserControl=${ idUserControl }&startDate=${ startDate }&endDate=${ endDate }&type=${ type }`)
    return response.data as ReportHeader
  } catch (error) {
    console.error('Error generating report', error)
    throw error
  }
}

export async function getCboTypes(): Promise<VLabel[]> {
  try {
    const response = await axiosInstance.get('/cboType/Mostrar_cboType')
    const data = response.data as CBOType[]

    return data.map(type => ({ value: type.idType.toString(), label: type.description }))
  } catch (error) {
    console.error('Error getting types', error)
    throw error
  }
}
