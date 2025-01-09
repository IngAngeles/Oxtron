'use server'

import { AxiosError } from 'axios'
import axiosInstance from '@/lib/axios-instance'

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
