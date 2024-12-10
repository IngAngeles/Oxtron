import { useEffect, useState } from 'react'
import { getFacilitiesByUserId } from '@/actions/measure'
import { VLabel } from '@/constants/types'

export const useFacilities = () => {
  const [facilities, setFacilities] = useState<VLabel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilityResponse = await getFacilitiesByUserId()
        const facilities: VLabel[] = facilityResponse?.map(facility => ({ value: String(facility.idControlFacility), label: facility.idFacility ?? '' })) ?? []
        setFacilities(facilities)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return { facilities }
}
