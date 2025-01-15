import { ICommuting, IFacility, ILogistic, IManufacturing, IMeasureResponse, ITravel, IVehicle } from './types'

export enum EMeasureScope {
  Facilities = 'facilities',
  Vehicles = 'vehicles',
  Travels = 'travels',
  Logistics = 'logistics',
  Manufacturing = 'manufacturing',
  Commuting = 'commuting',
}

export const MEASURE_ROUTES = [
  '/Facilities/Mostrar_Facilities_User',
  '/Vehicles/Mostrar_Vehicles_User',
  '/Travels/Mostrar_Travels_User',
  '/Logistics/Mostrar_Logistics_User',
  '/Manufacturing/Mostrar_Manufacturing_User',
  '/Commuting/Mostrar_Commuting_User',
]

export const getFacilities = (facilities: IFacility[], handleShowModal: () => void): Card[] => facilities.map((facility) => ({
  id: facility.idControlFacility,
  title: facility.idFacility,
  description: `${ facility.city }, ${ facility.country }`,
  icon: {
    src: '/assets/icons/black/Edit.png',
    position: 'head',
    onClick: handleShowModal,
  },
  link: `/${ facility.idControlFacility }`,
  lastUpdated: new Date(2022, 10, 23),
  measure: facility as unknown as IMeasureResponse,
}))
export const getVehicles = (vehicles: IVehicle[], handleShowModal: () => void): Card[] => vehicles.map((vehicle) => ({
  id: vehicle.idControlVehicle,
  title: `${ vehicle.name }`,
  description: 'Mexico City, Mexico',
  icon: {
    src: '/assets/icons/black/Edit.png',
    position: 'head',
    onClick: handleShowModal,
  },
  link: `/${ vehicle.idControlVehicle }`,
  lastUpdated: new Date(2022, 10, 23),
  measure: vehicle as unknown as IMeasureResponse,
}))

export const getTravels = (travels: ITravel[], handleShowModal: () => void): Card[] => travels.map((travel) => ({
  id: travel.idControlTravel,
  title: travel.idTravel,
  description: 'Mexico City, Mexico',
  icon: {
    src: '/assets/icons/black/Edit.png',
    position: 'head',
    onClick: handleShowModal,
  },
  link: `/${ travel.idControlTravel }`,
  lastUpdated: new Date(2022, 10, 23),
  measure: travel as unknown as IMeasureResponse,
}))

export const getLogistics = (logistics: ILogistic[], handleShowModal: () => void): Card[] => logistics.map((logistic) => ({
  id: logistic.idControlLogistics,
  title: `${ logistic.origin } - ${ logistic.destination }`,
  description: 'Mexico City, Mexico',
  icon: {
    src: '/assets/icons/black/Edit.png',
    position: 'head',
    onClick: handleShowModal,
  },
  link: `/${ logistic.idControlLogistics }`,
  lastUpdated: new Date(2022, 10, 23),
  measure: logistic as unknown as IMeasureResponse,
}))

export const getManufacturing = (manufacturing: IManufacturing[], handleShowModal: () => void): Card[] => manufacturing.map((manufacture) => ({
  id: manufacture.idControlManufacturing,
  title: manufacture.process,
  description: 'Mexico City, Mexico',
  icon: {
    src: '/assets/icons/black/Edit.png',
    position: 'head',
    onClick: handleShowModal,
  },
  link: `/${ manufacture.idControlManufacturing }`,
  lastUpdated: new Date(2022, 10, 23),
  measure: manufacture as unknown as IMeasureResponse,
}))

export const getCommuting = (commuting: ICommuting[], handleShowModal: () => void): Card[] => commuting.map((commute) => ({
  id: commute.idControlCommuting,
  title: commute.idControlFacility,
  description: 'Mexico City, Mexico',
  icon: {
    src: '/assets/icons/black/Edit.png',
    position: 'head',
    onClick: handleShowModal,
  },
  link: `/${ commute.idControlCommuting }`,
  lastUpdated: new Date(2022, 10, 23),
  measure: commute as unknown as IMeasureResponse,
}))
