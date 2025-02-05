'use server'

import {getAuthenticatedUserId, handleError} from "@/actions/shared";
import axiosInstance from "@/lib/axios-instance";
import {Manufacturing} from "@/lib/validation"
import {ComboTypeOfEquipment} from "@/constants/types";

export async function createManufacturing(manufacturing: Manufacturing) {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Manufacturing/Registrar_Manufacturing', {...manufacturing, idUserControl})
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

export async function getManufacturingByUserId(): Promise<ApiResponse<Manufacturing[]>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Manufacturing/Mostrar_Manufacturing_User', {
      params: {idUser}
    })
    const data: Manufacturing[] = response.data as Manufacturing[]

    return {
      success: true,
      status: 200,
      data: data.filter(status => status.active === 1),
      message: 'Successfully getting manufacturing',
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getManufacturingById(process: string): Promise<ApiResponse<Manufacturing | null>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Manufacturing/Mostrar_Manufacturing_ByManufacturing', {
      params: {process, idUser}
    })
    const data = response.data as Manufacturing

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

export async function updateManufacturing(manufacturing: Manufacturing): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.put('/Manufacturing/Actualizar_Manufacturing', {...manufacturing})
    const data = response.data as string

    return {
      success: true,
      status: 200,
      message: 'Successfully updated manufacturing',
      data: data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteManufacturing(IdManufacturing: number) {
  try {
    const response = await axiosInstance.delete('/Manufacturing/Eliminar_Manufacturing', {
      params: {IdManufacturing}
    })
    const data = response.data as string

    return {
      success: true,
      status: 204,
      message: 'Successfully deleted manufacturing',
      data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getTypeOfEquipment(): Promise<ApiResponse<ComboTypeOfEquipment[]>> {
  try {
    const response = await axiosInstance.get('/ManufacturingCboEquipment/Mostrar_ManufacturingCboEquipment')
    const data = response.data as ComboTypeOfEquipment[]

    return {
      success: true,
      status: 200,
      message: 'Successfully getting manufacturingCboEquipment',
      data: data.filter((typeOfEq) => typeOfEq.active === 1),
    }
  } catch (error) {
    return handleError(error)
  }
}
