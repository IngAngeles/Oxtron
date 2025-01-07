'use server'
import { AxiosError } from 'axios'
import axiosInstance from '@/lib/axios-instance'
import {
  CommutingDetails,
  FacilityDetails,
  LogisticDetails,
  ManufacturingDetails,
  TravelDetails,
  VehicleDetails
} from '@/lib/validation'

export async function getCommutingDetails(idControlCommuting: number) {
  try {
    const response = await axiosInstance.get('/CommutingDetails/Mostrar_CommutingDetails_ControlLogistic', {
      params: { idControlCommuting }
    })

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createCommutingDetails(commutingDetails: CommutingDetails) {
  try {
    const response = await axiosInstance.post('/CommutingDetails/Mostrar_CommutingDetails_ControlLogistic', commutingDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {

    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function getFacilityDetails(idFacilities: number) {
  try {
    const response = await axiosInstance.get('/FacilitiesDetails/Mostrar_FacilitiesDetails_ControlFacilities', {
      params: { idFacilities }
    })

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createFacilityDetails(facilityDetails: FacilityDetails) {
  try {
    const response = await axiosInstance.post('/FacilitiesDetails/Registrar_FacilitiesDetails', facilityDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function getLogisticDetails(idControlLogistics: number) {
  try {
    const response = await axiosInstance.get('/LogisticsDetails/Mostrar_LogisticsDetails_ControlLogistic', {
      params: { idControlLogistics }
    })

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createLogisticDetails(logisticDetails: LogisticDetails) {
  try {
    const response = await axiosInstance.post('/LogisticsDetails/Registrar_LogisticsDetails', logisticDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function getManufacturingDetails(idManufacturing: number) {
  try {
    const response = await axiosInstance.get('/ManufacturingDetails/Mostrar_ManufacturingDetails_ControlManufacturing', {
      params: { idManufacturing }
    })

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createManufacturingDetails(manufacturingDetails: ManufacturingDetails) {
  try {
    const response = await axiosInstance.post('/ManufacturingDetails/Registrar_ManufacturingDetails', manufacturingDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function getTravelDetails(idControl: number) {
  try {
    const response = await axiosInstance.get('/TravelsDetails/Mostrar_TravelsDetails_ControlTravel', {
      params: { idControl }
    })

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createTravelDetails(travelDetails: TravelDetails) {
  try {
    const response = await axiosInstance.post('/TravelsDetails/Registrar_TravelsDetails', travelDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function getVehicleDetails(idControl: number) {
  try {
    const response = await axiosInstance.get('/VehicleDetails/Mostrar_Vehicles_ControlVehicle', {
      params: { idControl }
    })

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createVehicleDetails(vehicleDetails: VehicleDetails) {
  try {
    const response = await axiosInstance.post('/VehicleDetails/Registrar_VehiclesDetails', vehicleDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}
