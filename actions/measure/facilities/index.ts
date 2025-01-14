'use server'

import {getAuthenticatedUserId, handleError} from "@/actions/shared";
import axiosInstance from '@/lib/axios-instance'
import {Facility} from '@/lib/validation'

export async function createFacility(facility: Facility): Promise<ApiResponse<string>> {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Facilities/Registrar_Facilities', {...facility, idUserControl,})
    const data = response.data as string

    return {
      success: true,
      status: 201,
      data,
      message: data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getFacilitiesByUserId(): Promise<ApiResponse<Facility[]>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Facilities/Mostrar_Facilities_User', {params: {idUser}})
    const data: Facility[] = response.data as Facility[]

    return {
      success: true,
      status: 200,
      data: data.filter(status => status.active === 1),
      message: 'Successfully getting facilities',
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getFacilityById(idFacility: number): Promise<ApiResponse<Facility | null>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Facilities/Mostrar_Facilities_ByFacility', {params: {idFacility, idUser}})
    const data = response.data as Facility

    return {
      success: true,
      status: data.active === 1 ? 200 : 404,
      message: 'success',
      data: data.active === 1 ? data : null,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function updateFacility(facility: Facility): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.put('/Facilities/Actualizar_Facilities', {...facility})
    const data = response.data as string

    return {
      success: true,
      status: 200,
      message: 'Successfully updated facility',
      data: data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteFacility(idFacility: number): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.delete('/Facilities/Mostrar_Facilities_ByFacility', {params: {idFacility}})
    const data = response.data as string

    return {
      success: true,
      status: 204,
      message: 'Successfully deleted facility',
      data,
    }
  } catch (error) {
    return handleError(error)
  }
}

/*

export async function getLogisticById(origin: string, destination: string): Promise<ILogistic | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Logistics/Mostrar_Logistics_ByLogistics', {
      params: {origin, destination, idUser}
    })

    const data = response.data as ILogistic
    return data.active === 1 ? data : undefined
  } catch (error) {
    return handleError(error)
  }
}

export async function createLogistic(logistic: Logistic) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    const data = {...logistic, idUserControl}
    const response = await axiosInstance.post('/Logistics/Registrar_Logistics', data)
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function updateLogistic(logistic: ILogistic) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('logistic:', logistic)

    const data = {...logistic, idUserControl}
    const response = await axiosInstance.put('/Logistics/Actualizar_Logistics', data)
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteLogistic(IdLogistics: string) {
  try {
    const response = await axiosInstance.delete('/Logistics/Eliminar_Logistics', {
      params: {IdLogistics}
    })
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function getManufacturingById(process: string): Promise<IManufacturing | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Manufacturing/Mostrar_Manufacturing_ByManufacturing', {
      params: {process, idUser}
    })

    const data = response.data as IManufacturing
    return data.active === 1 ? data : undefined
  } catch (error) {
    return handleError(error)
  }
}

export async function createManufacturing(manufacturing: Manufacturing) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    if (!idUserControl) return

    const data = {...manufacturing, idUserControl}
    const response = await axiosInstance.post('/Manufacturing/Registrar_Manufacturing', data)
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function updateManufacturing(manufacturing: IManufacturing) {
  try {

    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('manufacturing:', manufacturing)

    const data = {...manufacturing, idUserControl}
    const response = await axiosInstance.put('/Manufacturing/Actualizar_Manufacturing', data)
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteManufacturing(IdManufacturing: string) {
  try {
    const response = await axiosInstance.delete('/Manufacturing/Eliminar_Manufacturing', {
      params: {IdManufacturing}
    })
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function getCommutingById(idControlFacility: number): Promise<ICommuting | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Commuting/Mostrar_Commuting_ByCommuting', {
      params: {idControlFacility, idUser}
    })

    const data = response.data as ICommuting
    return data.active === 1 ? data : undefined
  } catch (error) {
    return handleError(error)
  }
}

export async function createCommuting(commuting: Commuting) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    const data = {...commuting, idUserControl}
    const response = await axiosInstance.post('/Commuting/Registrar_Commuting', data)
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function updateCommuting(commuting: ICommuting) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('commuting:', commuting)

    const data = {...commuting, idUserControl}
    const response = await axiosInstance.put('/Manufacturing/Actualizar_Manufacturing', data)
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteCommuting(IdCommuting: string) {
  try {
    const response = await axiosInstance.delete('/Commuting/Eliminar_Commuting', {
      params: {IdCommuting}
    })
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

/* export async function fetchData(scope: string): Promise<IMeasureResponse[]> {
  const url: string = MEASURE_ROUTES.find(value => value.toLowerCase().includes(scope)) ?? ''

  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) throw new Error('There is not user session')

    const response = await axiosInstance.get(url, {
      params: {idUser}
    })
    const data: IMeasureResponse[] = response.data as IMeasureResponse[]

    // @ts-ignore
    return data.filter(value => value.active === 1)
  } catch (error) {
    return handleError(error)
  }
} */
