'use server'
import {getAuthenticatedUserId, handleError} from "@/actions/shared";
import axiosInstance from "@/lib/axios-instance";
import {Vehicle} from "@/lib/validation";

export async function createVehicle(vehicle: Vehicle): Promise<ApiResponse<string>> {
  try {
    const idUserControl = await getAuthenticatedUserId();
    const response = await axiosInstance.post('/Vehicles/Registrar_Vehicles', {...vehicle, idUserControl})
    const data = response.data;

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

export async function getVehiclesByUserId(): Promise<ApiResponse<Vehicle[]>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Vehicles/Mostrar_Vehicles_User', {params: {idUser}})
    const data = response.data as Vehicle[];

    return {
      success: true,
      status: 200,
      data: data.filter(value => value.active === 1),
      message: 'Successfully getting vehicles',
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getVehicleById(name: string): Promise<ApiResponse<Vehicle | null>> {
  try {
    const idUser = await getAuthenticatedUserId();
    const response = await axiosInstance.get('/Vehicles/Mostrar_Vehicles_ByVehicle', {
      params: {name, idUser}
    })
    const data = response.data as Vehicle

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

export async function updateVehicle(vehicle: Vehicle): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.put('/Vehicles/Actualizar_Vehicles', {...vehicle})
    const data = response.data as string;

    return {
      success: true,
      status: 200,
      message: 'Successfully updated vehicle',
      data: data,
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteVehicle(idVehicles: number) {
  try {
    const response = await axiosInstance.delete('/Vehicles/Eliminar_Vehicles', {params: {idVehicles}})
    const data = response.data as string

    return {
      success: true,
      status: 204,
      message: 'Successfully deleted vehicle',
      data,
    }
  } catch (error) {
    return handleError(error)
  }
}
