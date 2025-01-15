'use server'

import {getAuthenticatedUserId, handleError} from "@/actions/shared";
import axiosInstance from "@/lib/axios-instance";
import {Logistic} from "@/lib/validation"

export async function createLogistic(logistic: Logistic): Promise<ApiResponse<string>> {
  try {
    console.log('logistic:', logistic)
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Logistics/Registrar_Logistics', {...logistic, idUser})
    const data = response.data as string

    console.log(data)

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

export async function getLogisticsByUserId(): Promise<ApiResponse<Logistic[]>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Logistics/Mostrar_Logistics_User', {params: {idUser}})
    const data: Logistic[] = response.data as Logistic[]

    return {
      success: true,
      status: 200,
      data: data.filter(status => status.active === 1),
      message: 'Successfully getting logistic',
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getLogisticById(origin: string, destination: string): Promise<ApiResponse<Logistic | null>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Logistics/Mostrar_Logistics_ByLogistics', {
      params: {origin, destination, idUser}
    })
    const data = response.data as Logistic

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

export async function updateLogistic(logistic: Logistic): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.put('/Logistics/Actualizar_Logistics', {...logistic})
    const data = response.data as string

    return {
      success: true,
      status: 200,
      message: 'Successfully updated logistic',
      data: data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteLogistic(IdLogistics: number): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.delete('/Logistics/Eliminar_Logistics', {
      params: {IdLogistics}
    })
    const data = response.data as string

    return {
      success: true,
      status: 204,
      message: 'Successfully deleted logistic',
      data,
    }
  } catch (error) {
    return handleError(error)
  }
}
