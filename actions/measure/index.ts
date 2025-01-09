'use server'

import { auth } from '@/auth'
import { MEASURE_ROUTES } from '@/constants/measure'
import {
  ICboBrand,
  ICboModel,
  ICboModeTransport,
  ICboStatus,
  ICboType,
  ICommuting,
  IFacility,
  ILogistic,
  IManufacturing,
  IMeasureResponse,
  ITravel,
  IVehicle
} from '@/constants/types'
import { Commuting, Facility, Logistic, Manufacturing, Travel, Vehicle } from '@/lib/validation'
import axiosInstance from '@/lib/axios-instance'

export async function fetchData(scope: string): Promise<IMeasureResponse[]> {
  const url: string = MEASURE_ROUTES.find(value => value.toLowerCase().includes(scope)) ?? ''

  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) throw new Error('There is not user session')

    const response = await axiosInstance.get(url, {
      params: { idUser }
    })
    const data: IMeasureResponse[] = response.data as IMeasureResponse[]

    // @ts-ignore
    return data.filter(value => value.active === 1)
  } catch (error) {
    throw error
  }
}

export async function createFacility(facility: Facility) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) throw new Error('There is not user session')

    const response = await axiosInstance.post('/Facilities/Registrar_Facilities', {
      ...facility,
      idUserControl: session?.user?.id
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getFacilitiesByUserId(): Promise<IFacility[] | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Facilities/Mostrar_Facilities_User', {
      params: { idUser }
    })
    const data: IFacility[] = response.data as IFacility[]

    return data.filter(status => status.active === 1)
  } catch (error) {
    throw error
  }
}

export async function getFacilityById(idFacility: string): Promise<IFacility | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Facilities/Mostrar_Facilities_ByFacility', {
      params: { idFacility, idUser }
    })

    const data = response.data as IFacility
    return data.active === 1 ? data : undefined
  } catch (error) {
    throw error
  }
}

export async function updateFacility(facility: IFacility) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('facility:', facility)

    const data = { ...facility }
    const response = await axiosInstance.put('/Facilities/Actualizar_Facilities', data)

    return response.status
  } catch (error) {
    throw error
  }
}

export async function deleteFacility(idFacility: string) {
  try {
    const response = await axiosInstance.delete('/Facilities/Mostrar_Facilities_ByFacility', {
      params: { idFacility }
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getVehiclesByUserId() : Promise<IVehicle[] | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Vehicles/Mostrar_Vehicles_User', {
      params: {idUser}
    })
    const data = response.data as IVehicle[]
    return data.filter(value => value.active === 1)
  } catch (error) {
    throw error
  }
}

export async function getVehicleById(name: string): Promise<IVehicle | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Vehicles/Mostrar_Vehicles_ByVehicle', {
      params: { name, idUser }
    })

    const data = response.data as IVehicle
    return data.active === 1 ? data : undefined
  } catch (error) {
    throw error
  }
}

// TODO: Status 500
export async function createVehicle(vehicle: Vehicle) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    const data = { ...vehicle, idUserControl }
    const response = await axiosInstance.post('/Vehicles/Registrar_Vehicles', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function updateVehicle(vehicle: IVehicle) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('vehicle:', vehicle)

    const data = { ...vehicle, idUserControl }
    const response = await axiosInstance.put('/Vehicles/Actualizar_Vehicles', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function deleteVehicle(idVehicles: string) {
  try {
    const response = await axiosInstance.delete('/Vehicles/Eliminar_Vehicles', {
      params: { idVehicles }
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getTravelById(idTravel: string): Promise<ITravel | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Travels/Mostrar_Travels_ByTravel', {
      params: { idTravel, idUser }
    })

    const data = response.data as ITravel
    return data.active === 1 ? data : undefined
  } catch (error) {
    throw error
  }
}

export async function createTravel(travel: Travel) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    if (!idUserControl) return

    const data = { ...travel, idUserControl }
    const response = await axiosInstance.post('/Travels/Registrar_Travels', data)
    return response.status
  } catch (error) {
    console.error('Error en createTravel:', error)
    throw error
  }
}

export async function updateTravel(travel: ITravel) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('travel:', travel)

    const data = { ...travel, idUserControl }
    const response = await axiosInstance.put('/Travels/Actualizar_Travels', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function deleteTravel(idTravels: string) {
  try {
    const response = await axiosInstance.delete('/Travels/Eliminar_Travels', {
      params: { idTravels }
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getLogisticById(origin: string, destination: string): Promise<ILogistic | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Logistics/Mostrar_Logistics_ByLogistics', {
      params: { origin, destination, idUser }
    })

    const data = response.data as ILogistic
    return data.active === 1 ? data : undefined
  } catch (error) {
    throw error
  }
}

export async function createLogistic(logistic: Logistic) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    const data = { ...logistic, idUserControl }
    const response = await axiosInstance.post('/Logistics/Registrar_Logistics', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function updateLogistic(logistic: ILogistic) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('logistic:', logistic)

    const data = { ...logistic, idUserControl }
    const response = await axiosInstance.put('/Logistics/Actualizar_Logistics', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function deleteLogistic(IdLogistics: string) {
  try {
    const response = await axiosInstance.delete('/Logistics/Eliminar_Logistics', {
      params: { IdLogistics }
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getManufacturingById(process: string): Promise<IManufacturing | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Manufacturing/Mostrar_Manufacturing_ByManufacturing', {
      params: { process, idUser }
    })

    const data = response.data as IManufacturing
    return data.active === 1 ? data : undefined
  } catch (error) {
    throw error
  }
}

export async function createManufacturing(manufacturing: Manufacturing) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    if (!idUserControl) return

    const data = { ...manufacturing, idUserControl }
    const response = await axiosInstance.post('/Manufacturing/Registrar_Manufacturing', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function updateManufacturing(manufacturing: IManufacturing) {
  try {

    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('manufacturing:', manufacturing)

    const data = { ...manufacturing, idUserControl }
    const response = await axiosInstance.put('/Manufacturing/Actualizar_Manufacturing', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function deleteManufacturing(IdManufacturing: string) {
  try {
    const response = await axiosInstance.delete('/Manufacturing/Eliminar_Manufacturing', {
      params: { IdManufacturing }
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getCommutingById(idControlFacility: number): Promise<ICommuting | undefined> {
  try {
    const session = await auth()
    const idUser: number = Number(session?.user?.id) ?? 0

    if (idUser === 0) return

    const response = await axiosInstance.get('/Commuting/Mostrar_Commuting_ByCommuting', {
      params: { idControlFacility, idUser }
    })

    const data = response.data as ICommuting
    return data.active === 1 ? data : undefined
  } catch (error) {
    throw error
  }
}

export async function createCommuting(commuting: Commuting) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    const data = { ...commuting, idUserControl }
    const response = await axiosInstance.post('/Commuting/Registrar_Commuting', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function updateCommuting(commuting: ICommuting) {
  try {
    const session = await auth()
    const idUserControl: number = Number(session?.user?.id) ?? 0

    if (idUserControl === 0) return

    console.log('commuting:', commuting)

    const data = { ...commuting, idUserControl }
    const response = await axiosInstance.put('/Manufacturing/Actualizar_Manufacturing', data)
    return response.status
  } catch (error) {
    throw error
  }
}

export async function deleteCommuting(IdCommuting: string) {
  try {
    const response = await axiosInstance.delete('/Commuting/Eliminar_Commuting', {
      params: { IdCommuting }
    })
    return response.status
  } catch (error) {
    throw error
  }
}

export async function getCboStatuses(): Promise<ICboStatus[]> {
  try {
    const response = await axiosInstance.get('/cboStatus/Mostrar_cboStatus')
    const data: ICboStatus[] = response.data as ICboStatus[]

    return data.filter(status => status.active === 1)
  } catch (error) {
    throw error
  }
}

export async function getCboBrands(): Promise<ICboBrand[]> {
  try {
    const response = await axiosInstance.get('/VehiclesCboBrands/Mostrar_VehiclesCboBrands')
    const data: ICboBrand[] = response.data as ICboBrand[]

    return data.filter(brand => brand.active === 1)
  } catch (error) {
    throw error
  }
}

export async function getCboModels(): Promise<ICboModel[]> {
  try {
    const response = await axiosInstance.get('/VehiclesCboModels/Mostrar_VehiclesCboModels')
    const data: ICboModel[] = response.data as ICboModel[]

    return data.filter(model => model.active === 1)
  } catch (error) {
    throw error
  }
}

export async function getCboTypes(): Promise<ICboType[]> {
  try {
    const response = await axiosInstance.get('/VehiclesCboTypes/Mostrar_VehiclesCboTypes')
    const data: ICboType[] = response.data as ICboType[]

    return data.filter(type => type.active === 1)
  } catch (error) {
    throw error
  }
}

export async function getCboModeTransport(): Promise<ICboModeTransport[]> {
  try {
    const response = await axiosInstance.get('/CommutingCboModeTransporte/Mostrar_CommutingCboModeTransporte')
    const data: ICboModeTransport[] = response.data as ICboModeTransport[]

    return data.filter(transport => transport.active === 1)
  } catch (error) {
    return []
  }
}
