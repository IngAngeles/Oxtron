'use server'

import {getAuthenticatedUserId, handleError} from "@/actions/shared";
import axiosInstance from "@/lib/axios-instance";
import {Commuting} from "@/lib/validation";

export async function createCommuting(commuting: Commuting): Promise<ApiResponse<any>> {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Commuting/Registrar_Commuting', {...commuting, idUserControl})
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

export async function getCommutingByUserId(): Promise<ApiResponse<Commuting[]>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Commuting/Mostrar_Commuting_User', {params: {idUser}})
    const data: Commuting[] = response.data as Commuting[]

    return {
      success: true,
      status: 200,
      data: data.filter(status => status.active === 1),
      message: 'Successfully getting commuting',
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getCommutingById(idControlCommuting: number): Promise<ApiResponse<any>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Commuting/Mostrar_Commuting_ByCommuting', {
      params: {idControlCommuting, idUser}
    })
    const data = response.data as Commuting

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

export async function updateCommuting(commuting: Commuting): Promise<ApiResponse<any>> {
  try {
    const response = await axiosInstance.put('/Manufacturing/Actualizar_Manufacturing', {...commuting})
    const data = response.data as string

    return {
      success: true,
      status: 200,
      data,
      message: data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteCommuting(IdCommuting: number): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.delete('/Commuting/Eliminar_Commuting', {
      params: {IdCommuting}
    })
    const data = response.data as string

    return {
      success: true,
      status: 204,
      message: 'Successfully deleted commuting',
      data,
    }
  } catch (error) {
    return handleError(error)
  }
}
