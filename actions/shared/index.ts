'use server'

import axios, { AxiosError } from 'axios'
import {auth} from "@/auth";
import axiosInstance from '@/lib/axios-instance'
import {ComboBrand, ComboModel, ComboType, ICboModeTransport, Status} from "@/constants/types";

declare global {
  type ApiResponse<T> = {
    success: boolean;
    data?: T;
    message: string;
    status: number;
  };
}

export async function handleError(error: unknown): Promise<ApiResponse<any>> {
  if (axios.isAxiosError(error)) {
    console.error(`Axios error: ${error.message}`, error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred while processing the request.',
      status: error.response?.status || 500,
    };
  } else {
    console.error('Unexpected error:', error);
    return {
      success: false,
      message: (error as Error)?.message || 'An unknown error occurred.',
      status: 500,
    };
  }
}

export async function getAuthenticatedUserId(): Promise<number> {
  const session = await auth();
  const idUser: number = Number(session?.user?.id ?? 0);

  if (idUser === 0) throw new Error('User session not found or invalid');
  return idUser;
}

export async function getCboStatuses(): Promise<ApiResponse<Status[]>> {
  try {
    const response = await axiosInstance.get('/cboStatus/Mostrar_cboStatus')
    const data: Status[] = response.data as Status[]

    return {
      success: true,
      status: 200,
      message: 'Success',
      data: data.filter(status => status.active === 1),
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getCboBrands(): Promise<ApiResponse<ComboBrand[]>> {
  try {
    const response = await axiosInstance.get('/VehiclesCboBrands/Mostrar_VehiclesCboBrands')
    const data: ComboBrand[] = response.data as ComboBrand[]

    return {
      success: true,
      status: 200,
      message: 'Success',
      data: data.filter(status => status.active === 1),
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getCboModels(): Promise<ApiResponse<ComboModel[]>> {
  try {
    const response = await axiosInstance.get('/VehiclesCboModels/Mostrar_VehiclesCboModels')
    const data: ComboModel[] = response.data as ComboModel[]

    return {
      success: true,
      status: 200,
      message: 'Success',
      data: data.filter(status => status.active === 1),
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getCboTypes(): Promise<ApiResponse<ComboType[]>> {
  try {
    const response = await axiosInstance.get('/VehiclesCboTypes/Mostrar_VehiclesCboTypes')
    const data: ComboType[] = response.data as ComboType[]

    return {
      success: true,
      status: 200,
      message: 'Success',
      data: data.filter(status => status.active === 1),
    }
  } catch (error) {
    return handleError(error)
  }
}

export async function getCboModeTransport(): Promise<ApiResponse<ICboModeTransport[]>> {
  try {
    const response = await axiosInstance.get('/CommutingCboModeTransporte/Mostrar_CommutingCboModeTransporte')
    const data: ICboModeTransport[] = response.data as ICboModeTransport[]

    return {
      success: true,
      status: 200,
      message: 'Success',
      data: data.filter(status => status.active === 1),
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function getCboElectricityType() {
  try {
    const response = await axiosInstance.get('/cboElectricityType/Mostrar_cboElectricityType');
    return {
      status: response.status,
      success: true,
      data: response.data
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError
    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getCboFuelType() {
  try {
    const response = await axiosInstance.get('/cboFuelType/Mostrar_cboFuelType');
    return {
      status: response.status,
      success: true,
      data: response.data
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError
    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getCboGasType() {
  try {
    const response = await axiosInstance.get('/cboGasType/Mostrar_cboGasType');
    return {
      status: response.status,
      success: true,
      data: response.data
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError
    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getCboRefrigerantsType() {
  try {
    const response = await axiosInstance.get('/cboRefrigerantsType/Mostrar_cboRefrigerantsType');
    return {
      status: response.status,
      success: true,
      data: response.data
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError
    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}
