'use server'
import { AxiosError } from 'axios'
import axiosInstance from '@/lib/axios-instance'
import {
  CommutingDescriptionDetails,
  CommutingDetails,
  FacilityDescriptionDetails,
  LogisticDescriptionDetails,
  LogisticDetails,
  ManufacturingDescriptionDetails,
  ManufacturingDetails,
  TravelDescriptionDetails,
  TravelDetails,
  VehicleDescriptionDetails,
  VehicleDetails
} from '@/lib/validation'
import {distance} from "framer-motion";

export async function getCommutingDetails(idCommuting: number) {
  try {
    const response = await axiosInstance.get('/CommutingDetails/Mostrar_CommutingDetails_ControlLogisticDescription', {
      params: { idCommuting }
    })

    const data = response.data as CommutingDescriptionDetails[]

    return {
      status: response.status,
      success: true,
      data: data.filter((detail) => detail.active === 1)
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createCommutingDetails(commutingDetails: CommutingDetails) {
  try {
    const response = await axiosInstance.post('/CommutingDetails/Registrar_CommutingDetails', commutingDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {

    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function updateCommutingDetails(commutingDetails: CommutingDetails) {
  try {
    const response = await axiosInstance.put('/CommutingDetails/Actualizar_CommutingDetails', commutingDetails)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function deleteCommutingDetails(IdCommuting: number) {
  try {
    const response = await axiosInstance.delete('/CommutingDetails/Eliminar_CommutingDetails', {
      params: { IdCommuting }
    })
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getFacilityDetails(idFacilities: number) {
  try {
    const response = await axiosInstance.get('/FacilitiesDetails/Mostrar_FacilitiesDetails_ControlFacilitiesDescripton', {
      params: { idFacilities }
    })
    const data = response.data as FacilityDescriptionDetails[]

    return {
      status: response.status,
      success: true,
      data: data.filter((detail) => detail.active === 1)
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createFacilityDetails(facilityDetails: FacilityDescriptionDetails) {
  try {
    const response = await axiosInstance.post('/FacilitiesDetails/Registrar_FacilitiesDetails', facilityDetails)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function updateFacilityDetails(facilityDetails: FacilityDescriptionDetails) {
  try {
    const response = await axiosInstance.put('/FacilitiesDetails/Actualizar_FacilitiesDetails', facilityDetails)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function deleteFacilityDetails(IdFacilities: number) {
  try {
    const response = await axiosInstance.delete('/FacilitiesDetails/Eliminar_FacilitiesDetails', {
      params: { IdFacilities }
    })
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getLogisticDetails(idLogistic: number) {
  try {
    const response = await axiosInstance.get('/LogisticsDetails/Mostrar_LogisticsDetails_ControlLogisticDescription', {
      params: { idLogistic }
    })
    const data = response.data as LogisticDescriptionDetails[]

    return {
      status: response.status,
      success: true,
      data: data.filter((detail) => detail.active === 1)
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function createLogisticDetails(logisticDetails: LogisticDetails) {
  try {
    const { amount, idControlLogistics, idFuelType } = logisticDetails
    const data = {
      ...logisticDetails,
      amount: Number(amount),
      idControlLogistics: Number(idControlLogistics),
      idFuelType: Number(idFuelType),
    }

    console.log({ data })

    const response = await axiosInstance.post('/LogisticsDetails/Registrar_LogisticsDetails', data)

    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: true, data: axiosError.response?.data }
  }
}

export async function updateLogisticDetails(logisticDetails: LogisticDetails) {
  try {
    const response = await axiosInstance.put('/LogisticsDetails/Actualizar_LogisticsDetails', logisticDetails)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function deleteLogisticDetails(IdLogistic: number) {
  try {
    const response = await axiosInstance.delete('/LogisticsDetails/Eliminar_LogisticsDetails', {
      params: { IdLogistic }
    })
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getManufacturingDetails(idManufacturing: number) {
  try {
    const response = await axiosInstance.get('/ManufacturingDetails/Mostrar_ManufacturingDetails_ControlManufacturingDescription', {
      params: { idManufacturing }
    })
    const data = response.data as ManufacturingDescriptionDetails[]

    return {
      status: response.status,
      success: true,
      data: data.filter((detail) => detail.active === 1)
    }
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

export async function updateManufacturingDetails(manufacturingDetails: ManufacturingDetails) {
  try {
    const response = await axiosInstance.put('/ManufacturingDetails/Actualizar_ManufacturingDetails', manufacturingDetails)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function deleteManufacturingDetails(IdManufacturing: number) {
  try {
    const response = await axiosInstance.delete('/ManufacturingDetails/Eliminar_ManufacturingDetails', {
      params: { IdManufacturing }
    })
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getTravelDetails(idControl: number) {
  try {
    const response = await axiosInstance.get('/TravelsDetails/Mostrar_TravelsDetails_ControlTravelDescription', {
      params: { idControl }
    })
    const data = response.data as TravelDescriptionDetails[]

    return {
      status: response.status,
      success: true,
      data: data.filter((detail) => detail.active === 1)
    }
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

export async function updateTravelDetails(travelDetails: TravelDetails) {
  try {
    const response = await axiosInstance.put('/TravelsDetails/Actualizar_TravelsDetails', travelDetails)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function deleteTravelDetails(IdTravels: number) {
  try {
    const response = await axiosInstance.delete('/TravelsDetails/Eliminar_TravelsDetails', {
      params: { IdTravels }
    })
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getVehicleDetails(idControl: number) {
  try {
    const response = await axiosInstance.get('/VehicleDetails/Mostrar_Vehicles_ControlVehicleDescription', {
      params: { idControl }
    })
    const data = response.data as VehicleDescriptionDetails[]

    return {
      status: response.status,
      success: true,
      data: data.filter((detail) => detail.active === 1)
    }
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

export async function updateVehicleDetails(vehicleDetails: VehicleDetails) {
  try {
    const response = await axiosInstance.put('/VehicleDetails/Actualizar_VehiclesDetails', vehicleDetails)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function deleteVehicleDetails(IdVehicles: number) {
  try {
    const response = await axiosInstance.delete('/VehicleDetails/Eliminar_VehiclesDetails', {
      params: { IdVehicles }
    })
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}

export async function getDistance (originZip: number, destinationZip: number)  {
  const apiKey = process.env.MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

  try {
    const response = await axiosInstance.get(url, {
      params: {
        origins: originZip,
        destinations: destinationZip,
        key: apiKey,
      },
    });

    const data = response.data;

    if (data.status === 'OK') {
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;
      return { status: data.status, success: true, data: { originZip, destinationZip, distance, duration } };
    }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}
