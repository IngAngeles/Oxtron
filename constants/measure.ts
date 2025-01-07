import { ICommuting, IFacility, ILogistic, IManufacturing, IMeasureResponse, ITravel, IVehicle } from './types'

export const measureCards: IMeasureCard[] = [
  {
    id: 1,
    title: 'Facilities',
    description: 'Information about this type of emissions',
    icon: {
      src: '/assets/icons/black/Facility.png',
      position: 'body'
    },
    link: '/facilities',
    lastUpdated: new Date(2022, 10, 23),
    footerCard: {
      scope: ['Scope 1', 'Scope 2', 'Scope 3']
    }
  },
  {
    id: 2,
    title: 'Vehicles',
    description: 'Information about this type of emissions',
    icon: {
      src: '/assets/icons/black/Vehicles.png',
      position: 'body'
    },
    link: '/vehicles',
    lastUpdated: new Date(2022, 10, 23),
    footerCard: {
      scope: ['Scope 1']
    }
  },
  {
    id: 3,
    title: 'Travels',
    description: 'Information about this type of emissions',
    icon: {
      src: '/assets/icons/black/Travel.png',
      position: 'body'
    },
    link: '/travels',
    lastUpdated: new Date(2022, 10, 23),
    footerCard: {
      scope: ['Scope 3']
    }
  },
  {
    id: 4,
    title: 'Logistics',
    description: 'Information about this type of emissions',
    icon: {
      src: '/assets/icons/black/Logistics.png',
      position: 'body'
    },
    link: '/logistics',
    lastUpdated: new Date(2022, 10, 23),
    footerCard: {
      scope: ['Scope 3']
    }
  },
  {
    id: 5,
    title: 'Manufacturing',
    description: 'Information about this type of emissions',
    icon: {
      src: '/assets/icons/black/Manufacturing.png',
      position: 'body'
    },
    link: '/manufacturing',
    lastUpdated: new Date(2022, 10, 23),
    footerCard: {
      scope: ['Scope 1']
    }
  },
  {
    id: 6,
    title: 'Commuting',
    description: 'Information about this type of emissions',
    icon: {
      src: '/assets/icons/black/Commuting.png',
      position: 'body'
    },
    link: '/commuting',
    lastUpdated: new Date(2022, 10, 23),
    footerCard: {
      scope: ['Scope 3']
    }
  },
]

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

export const getFacilities = (facilities: IFacility[], handleShowModal: () => void): IMeasureCard[] => facilities.map((facility) => ({
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
export const getVehicles = (vehicles: IVehicle[], handleShowModal: () => void): IMeasureCard[] => vehicles.map((vehicle) => ({
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

export const getTravels = (travels: ITravel[], handleShowModal: () => void): IMeasureCard[] => travels.map((travel) => ({
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

export const getLogistics = (logistics: ILogistic[], handleShowModal: () => void): IMeasureCard[] => logistics.map((logistic) => ({
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

export const getManufacturing = (manufacturing: IManufacturing[], handleShowModal: () => void): IMeasureCard[] => manufacturing.map((manufacture) => ({
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

export const getCommuting = (commuting: ICommuting[], handleShowModal: () => void): IMeasureCard[] => commuting.map((commute) => ({
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
