'use server'

import {getAuthenticatedUserId, handleError} from "@/actions/shared";
import axiosInstance from "@/lib/axios-instance";
import {Travel} from "@/lib/validation";

export async function createTravel(travel: Travel): Promise<ApiResponse<string>> {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Travels/Registrar_Travels', {...travel, idUserControl})
    const data = response.data as string

    return {
      success: true,
      status: 201,
      data,
      message: data,
    }
  } catch (error) {
    console.error('Error en createTravel:', error)
    return handleError(error)
  }
}

export async function getTravelsByUserId(): Promise<ApiResponse<Travel[]>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Travels/Mostrar_Travels_User', {params: {idUser}})
    const data: Travel[] = response.data as Travel[]

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

export async function getTravelById(idTravel: number): Promise<ApiResponse<Travel | null>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Travels/Mostrar_Travels_ByTravel', {
      params: {idTravel, idUser}
    })
    const data = response.data as Travel

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

export async function updateTravel(travel: Travel): Promise<ApiResponse<string>> {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.put('/Travels/Actualizar_Travels', {...travel, idUserControl})
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

export async function deleteTravel(idTravels: number): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.delete('/Travels/Eliminar_Travels', {
      params: {idTravels}
    })
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
