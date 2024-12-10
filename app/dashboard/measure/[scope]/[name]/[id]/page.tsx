'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CommutingInvoiceForm } from '@/components/forms/measure/Details/CommutingInvoiceForm'
import { FacilityInvoiceForm } from '@/components/forms/measure/Details/FacilityInvoiceForm'
import { LogisticsInvoiceForm } from '@/components/forms/measure/Details/LogisticsInvioceForm'
import { ManufacturingInvoiceForm } from '@/components/forms/measure/Details/ManufacturingInvioceForm'
import { TravelsInvoiceForm } from '@/components/forms/measure/Details/TravelsInvoiceForm'
import { VehiclesInvoiceForm } from '@/components/forms/measure/Details/VehiclesInvoiceForm'
import Loading from '@/components/loading/LoadingBlack'
import { HistoricalCard } from '@/components/measure/historical/HistoricalCard'
import { Modal } from '@/components/shared/Modal'
import { SimpleTable } from '@/components/shared/SimpleTable'

import {
  deleteCommutingDetails,
  deleteFacilityDetails,
  deleteLogisticDetails,
  deleteManufacturingDetails,
  deleteTravelDetails,
  deleteVehicleDetails,
  getCommutingDetails,
  getFacilityDetails,
  getLogisticDetails,
  getManufacturingDetails,
  getTravelDetails,
  getVehicleDetails
} from '@/actions/measure/details'
import {
  CommutingDetails, FacilityDescriptionDetails,
  FacilityDetails,
  LogisticDetails,
  ManufacturingDetails,
  TravelDetails,
  VehicleDetails,
} from '@/lib/validation'
import { toast } from '@/components/ui/use-toast'

type Props = { params: { scope: string, name: string, id: number } };

const Page = ({ params: { scope, name, id } }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<Array<any>>([])
  const path = usePathname()

  useEffect(() => {
    setIsLoading(true)
    reloadData()
  }, [scope, id])

  const handleEdit = async (rowData: any) => {
    setSelectedRow(rowData)
    setIsOpen(true)
  }

  const handleDelete = async (rowData: any) => {
    const data = await deleteData(scope, rowData)

    if (!data) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
      return
    }

    toast({
      title: 'Success',
      description: 'This item has been deleted successfully',
      className: 'bg-black',
    })

    await reloadData()
  }

  const reloadData = async () => {
    setIsLoading(true)
    const newData = await getData(scope, id)

    // @ts-ignore
    setData(newData || [])
    setIsLoading(false)
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:p-6 lg:ml-64 ml-0 w-[90%] lg:w-[80%] 2xl:w-[86%] overflow-y-auto absolute">
        <div>
          <h1 className="title-geometos font-[400] text-base md:text-2xl text-neutral-900">
            <Link
              href={ path.split('/').slice(0, -1).join('/').replace(`/${ scope }/${ name }`, '') }
              className="text-neutral-300"
            >
              Measure
            </Link> /

            <Link
              href={ path.split('/').slice(0, -2).join('/') }
              className="text-neutral-300"
            >
              { ` ${ scope }` }
            </Link>
            { ' ' } / { decodeURI(name) }
          </h1>
          <p className="font-light text-neutral-500">
            Measure your company emissions and identify hotspots
          </p>
        </div>
        <HistoricalCard title={ decodeURI(name) } registryCount={ data.length } onClick={ () => setIsOpen(true) }>
          { isLoading ?
            <Loading/> :
            <SimpleTable
              columns={ getColumnsByScope(scope) }
              data={ data }
              options={ {
                onEdit: handleEdit,
                onDelete: handleDelete
              } }
            />
          }
        </HistoricalCard>
      </div>
      <Modal
        open={ isOpen }
        onClose={ () => setIsOpen(false) }
        title="Create an invoice manually"
        className="h-auto min-w-full lg:min-w-[70vw] xl:min-w-[700px] 2xl:min-w-[1000px]"
        icon
      >
        { scope === 'commuting' ?
          <CommutingInvoiceForm
            idControlCommuting={ id }
            commuting={ selectedRow as CommutingDetails }
            reloadData={ reloadData }/> :
          scope === 'facilities' ?
            <FacilityInvoiceForm
              idControlFacility={ id }
              facility={ selectedRow as FacilityDescriptionDetails }
              reloadData={ reloadData }/> :
            scope === 'logistics' ?
              <LogisticsInvoiceForm
                idControlLogistics={ id }
                logistic={ selectedRow as LogisticDetails }
                reloadData={ reloadData }/> :
              scope === 'manufacturing' ?
                <ManufacturingInvoiceForm
                  idControlManufacturing={ id }
                  manufacturing={ selectedRow as ManufacturingDetails }
                  reloadData={ reloadData }/> :
                scope === 'travels' ?
                  <TravelsInvoiceForm
                    idControlTravel={ id }
                    travel={ selectedRow as TravelDetails }
                    reloadData={ reloadData }/> :
                  <VehiclesInvoiceForm
                    idControlVehicle={ id }
                    vehicle={ selectedRow as VehicleDetails }
                    reloadData={ reloadData }/>
        }
      </Modal>
    </>
  )
}

function getColumnsByScope(scope: string) {
  switch (scope) {
    case 'commuting':
      return [
        { header: 'Transport', accessor: 'cboModeTransportDescription' },
        { header: 'Activity', accessor: 'activity' },
        { header: 'Distance', accessor: 'distance' },
        { header: 'Unit', accessor: 'active' },
        { header: 'Origin', accessor: 'origin' },
        { header: 'Destiny', accessor: 'destination' },
        { header: 'User', accessor: 'idUserControl' },
        { header: 'Status', accessor: 'status' },
      ]
    case 'facilities':
      return [
        { header: 'Type', accessor: 'idTypeDetailsDescription' },
        { header: 'Source', accessor: 'idTypeDescription' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Unit', accessor: 'unit' },
        { header: 'Start Date', accessor: 'startDate' },
        { header: 'End Date', accessor: 'endDate' },
        { header: 'Uploaded By', accessor: 'firstName' },
        // { header: 'Status', accessor: 'active' },
      ]
    case 'logistics':
      return [
        { header: 'Transport', accessor: 'invoiceId' },
        { header: 'Fuel', accessor: 'idEmissionFactorDescription' },
        { header: 'Origin', accessor: 'origin' },
        { header: 'Destiny', accessor: 'destiny' },
        { header: 'Distance (km)', accessor: 'amount' },
        { header: 'Fuel (l)', accessor: 'fuelTypeDescription' },
        { header: 'Uploaded By', accessor: 'firstName' },
        // { header: 'Status', accessor: 'amount' },
      ]
    case 'manufacturing':
      return [
        { header: 'Equipment', accessor: 'invoiceId' },
        { header: 'Code', accessor: 'idEmissionFactor' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Unit', accessor: 'unit' },
        { header: 'Start Date', accessor: 'startDate' },
        { header: 'End Date', accessor: 'endDate' },
        { header: 'Uploaded By', accessor: 'firstName' },
        // { header: 'Status', accessor: 'idControlManufacturing' },
      ]
    case 'travels':
      return [
        { header: 'Vehicle', accessor: 'idTravelCboType' },
        { header: 'Source', accessor: 'invoiceId' },
        { header: 'Origin', accessor: 'origin' },
        { header: 'Destiny', accessor: 'destiny' },
        { header: 'km', accessor: 'idEmissionFactor' },
        { header: 'Date', accessor: 'startDate' },
        { header: 'Uploaded By', accessor: 'firstName' },
        // { header: 'Status', accessor: 'idControlTravel' },
      ]
    case 'vehicles':
      return [
        { header: 'Type', accessor: 'idEmissionFactorDescription' },
        { header: 'Source', accessor: 'cboTypeDescription' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Unit', accessor: 'unit' },
        { header: 'Start Date', accessor: 'startDate' },
        { header: 'End Date', accessor: 'endDate' },
        { header: 'Uploaded By', accessor: 'firstName' },
        // { header: 'Status', accessor: 'active' },
      ]
    default:
      return []
  }
}

async function getData(scope: string, id: number) {
  switch (scope) {
    case 'commuting':
      const commuting = await getCommutingDetails(id)
      return commuting.data
    case 'facilities':
      const facility = await getFacilityDetails(id)
      return facility.data
    case 'logistics':
      const logistic = await getLogisticDetails(id)
      return logistic.data
    case 'manufacturing':
      const manufacturing = await getManufacturingDetails(id)
      return manufacturing.data
    case 'travels':
      const travels = await getTravelDetails(id)
      return travels.data
    case 'vehicles':
      const vehicles = await getVehicleDetails(id)
      return vehicles.data
    default:
      return []
  }
}

async function deleteData(scope: string, rowData: any) {
  switch (scope) {
    case 'commuting':
      const { idControlCommutingDetails } = rowData as CommutingDetails
      const commuting = await deleteCommutingDetails(idControlCommutingDetails || 0)
      return commuting.success
    case 'facilities':
      const { idControlFacilityDetails } = rowData as FacilityDetails
      const facility = await deleteFacilityDetails(idControlFacilityDetails || 0)
      return facility.success
    case 'logistics':
      const { idControlLogisticsDetails } = rowData as LogisticDetails
      const logistic = await deleteLogisticDetails(idControlLogisticsDetails || 0)
      return logistic.success
    case 'manufacturing':
      const { idControlManufacturingDetails } = rowData as ManufacturingDetails
      const manufacturing = await deleteManufacturingDetails(idControlManufacturingDetails || 0)
      return manufacturing.success
    case 'travels':
      const { idControlTravelDetails } = rowData as TravelDetails
      const travels = await deleteTravelDetails(idControlTravelDetails || 0)
      return travels.success
    case 'vehicles':
      const { idControlVehicleDetails } = rowData as VehicleDetails
      const vehicles = await deleteVehicleDetails(idControlVehicleDetails || 0)
      return vehicles.success
    default:
      return null
  }
}

export default Page
