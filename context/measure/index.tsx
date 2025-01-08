import { createContext, ReactNode, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { fetchData } from '@/actions/measure'
import {
  EMeasureScope,
  getCommuting,
  getFacilities,
  getLogistics,
  getManufacturing,
  getTravels,
  getVehicles
} from '@/constants/measure'
import {
  ICommuting,
  IFacility,
  ILogistic,
  IManufacturing,
  IMeasureContextType,
  IMeasureResponse,
  ITravel,
  IVehicle
} from '@/constants/types'
import { useModal } from '@/hooks/shared/useModal'

type Props = Readonly<{ children: ReactNode, scope: string }>

export const MeasureContext = createContext<IMeasureContextType | null>(null)

const MeasureProvider = ({ children, scope }: Props) => {
  const [cards, setCards] = useState<IMeasureCard[]>([])
  const { showModal, handleShowModal, handleHideModal } = useModal()
  const [measure, setMeasure] = useState<IMeasureResponse | undefined>(undefined)
  let title = !measure ? 'Add New ' : 'Update '

  const [data, setData] = useState<IMeasureResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError | null>(null)

  const addMeasure = (measure: IMeasureResponse) => {
    setData(prevState => [...prevState, measure])
  }

  switch (scope) {
    case 'facilities':
      title += 'Facility'
      break
    case 'vehicles':
      title += 'Vehicle'
      break
    case 'travels':
      title += 'Travel'
      break
    case 'logistics':
      title += 'Logistic'
      break
    case 'manufacturing':
      title += 'Manufacturing'
      break
    case 'commuting':
      title += 'Commute'
      break
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const response: IMeasureResponse[] = await fetchData(scope)
        setData(response)
      } catch (error) {
        setData([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [scope])

  useEffect(() => {
    const loadData = async () => {
      switch (scope) {
        case EMeasureScope.Facilities:
          setCards(getFacilities(data as unknown as IFacility[], handleShowModal))
          break
        case EMeasureScope.Vehicles:
          setCards(getVehicles(data as unknown as IVehicle[], handleShowModal))
          break
        case EMeasureScope.Travels:
          setCards(getTravels(data as unknown as ITravel[], handleShowModal))
          break
        case EMeasureScope.Logistics:
          setCards(getLogistics(data as unknown as ILogistic[], handleShowModal))
          break
        case EMeasureScope.Manufacturing:
          setCards(getManufacturing(data as unknown as IManufacturing[], handleShowModal))
          break
        case EMeasureScope.Commuting:
          const commutingData = await getCommuting(data as unknown as ICommuting[], handleShowModal)
          setCards(commutingData)
          break
      }
    }

    loadData()
  }, [data])

  return (
    <MeasureContext.Provider
      value={ {
        measure,
        scope,
        title,
        data,
        cards,
        showModal,
        loading,
        error,
        addMeasure,
        setData,
        setMeasure,
        handleHideModal,
        handleShowModal,
      } }
    >
      { children }
    </MeasureContext.Provider>
  )
}

export default MeasureProvider
