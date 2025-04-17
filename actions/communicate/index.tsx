'use server'

import { auth } from '@/auth'
import { CBOType, ReportHeader, VLabel } from '@/constants/types'
import axiosInstance from '@/lib/axios-instance'
import { Communicate } from '@/lib/validation'
import { getAuthenticatedUserId } from '@/actions/shared'

export async function fetchRecentReports(): Promise<Communicate[]> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    const response = await axiosInstance.get(`Communicate/Mostrar_Communicate_User?idUser=${ idUser }`)

    return response.data as Communicate[]
  } catch (error) {
    console.error('communicate->fetchRecentReports:', { error })
    throw error
  }
}

export async function createCommunicateReport({
  idControlFacility,
  idFacility,
  type,
  startDate,
  endDate,
}: Communicate) {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Communicate/Registrar_Communicate', {
      idControlFacility: idControlFacility.toString(),
      idUserControl,
      idFacility,
      type: type.toString(),
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    })

    return response.data as Communicate
  } catch (error) {
    console.error('Error creating Report', error)
    throw error
  }
}

export async function createReport({
  idUserControl,
  type,
  idFacility,
  idControlFacility,
  startDate,
  endDate,
}: ReportHeader) {
  try {
    const response = await axiosInstance.post('/ReportHeader/Registrar_ReportHeader', null, {
      params: {
        idUserControl,
        idFacility,
        idControlFacility,
        type,
        startDate,
        endDate,
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

/* export async function getReport (idUserControl: number, startDate: Date, endDate: Date, type: number) {
  try {
    const response = await axiosInstance.get('/Report/Listar_Reporte', {
      params: {
        idUserControl,
        startDate,
        endDate,
        type,
      }
    })
    return response.data
  } catch (error) {
    throw error;
  }
} */

export async function getPDF (idControlCommunicate: number) {
  try {
    const response = await axiosInstance.get('/ReportGlobal/Global Report', {
      params: {
        idControlCommunicate
      }
    })

    return response.data
  } catch (error) {
    throw error;
  }
}

export async function getCSV(idControlCommunicate: number, idUserControl: number) {
  try {
    const response = await axiosInstance.get('/Report/Listar_ReporteCSV', {
      params: { idControlCommunicate, idUserControl },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getXLSX(idControlCommunicate: number, idUserControl: number) {
  try {
    const response = await axiosInstance.get('/Report/Listar_ReporteXLSX', {
      params: { idControlCommunicate, idUserControl },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
