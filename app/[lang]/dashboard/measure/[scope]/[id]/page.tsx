'use client'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {CommutingInvoiceForm} from '@/components/forms/measure/Details/CommutingInvoiceForm'
import {FacilityInvoiceForm} from '@/components/forms/measure/Details/FacilityInvoiceForm'
import {LogisticsInvoiceForm} from '@/components/forms/measure/Details/LogisticsInvioceForm'
import {TravelsInvoiceForm} from '@/components/forms/measure/Details/TravelsInvoiceForm'
import {VehiclesInvoiceForm} from '@/components/forms/measure/Details/VehiclesInvoiceForm'
import Loading from '@/components/loading/LoadingBlack'
import {HistoricalCard} from '@/components/measure/historical/HistoricalCard'
import {Modal} from '@/components/shared/Modal'
import {SimpleTable} from '@/components/shared/SimpleTable'
import {
  deleteCommutingDetails, deleteFacilityDetails,
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
import {ManufacturingInvoiceForm} from '@/components/forms/measure/Details/ManufacturingInvioceForm'
import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import {toast} from "@/components/ui/use-toast";
import {
  CommutingDetails,
  FacilityDescriptionDetails,
  FacilityDetails,
  LogisticDetails,
  ManufacturingDetails,
  TravelDetails,
  VehicleDetails
} from '@/lib/validation'

type Props = { params: { scope: string, id: number } };

const Page = ({params: {scope, id}}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<Array<any>>([])
  const path = usePathname()
  const lang: Locale = (path?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

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

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
        // @ts-ignore
        setDictionary(dict.pages.measure);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  if (loading || !dictionary) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading/>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/').replace(`/${scope}`, '')}
              className="text-neutral-300"
            >
              {dictionary.title}
            </Link> /

            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {` ${scope}`}
            </Link>
            {' '} / {id}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary.subtitle}
          </p>
        </div>
        <HistoricalCard onClick={() => setIsOpen(true)} registryCount={ data.length }>
          {isLoading ?
            <Loading/> :
            <SimpleTable columns={getColumnsByScope(scope, dictionary)} data={data}/>
          }
        </HistoricalCard>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create an invoice manually"
        className="h-auto min-w-full lg:min-w-[70vw] xl:min-w-[700px] 2xl:min-w-[1000px]"
      >
        {scope === 'commuting' ?
          <CommutingInvoiceForm
            idControlCommuting={id}
            commuting={selectedRow as CommutingDetails}
            reloadData={reloadData}/> :
          scope === 'facilities' ?
            <FacilityInvoiceForm
              idControlFacility={id}
              facility={selectedRow as FacilityDescriptionDetails}
              reloadData={reloadData}/> :
            scope === 'logistics' ?
              <LogisticsInvoiceForm
                idControlLogistics={id}
                logistic={selectedRow as LogisticDetails}
                reloadData={reloadData}/> :
              scope === 'manufacturing' ?
                <ManufacturingInvoiceForm
                  idControlManufacturing={id}
                  manufacturing={selectedRow as ManufacturingDetails}
                  reloadData={reloadData}/> :
                scope === 'travels' ?
                  <TravelsInvoiceForm
                    idControlTravel={id}
                    travel={selectedRow as TravelDetails}
                    reloadData={reloadData}/> :
                  <VehiclesInvoiceForm
                    idControlVehicle={id}
                    vehicle={selectedRow as VehicleDetails}
                    reloadData={reloadData}/>
        }
      </Modal>
    </>
  )
}

function getColumnsByScope(scope: string, dictionary: any) {
  switch (scope) {
    case 'commuting':
      return [
        { header: dictionary.table.commuting.trans, accessor: 'cboModeTransportDescription' },
        { header: dictionary.table.commuting.acti, accessor: 'activity' },
        { header: dictionary.table.commuting.dis, accessor: 'distance' },
        { header: dictionary.table.commuting.unit, accessor: 'active' },
        { header: dictionary.table.commuting.ori, accessor: 'origin' },
        { header: dictionary.table.commuting.dest, accessor: 'destination' },
        { header: dictionary.table.commuting.user, accessor: 'idUserControl' },
        { header: dictionary.table.commuting.status, accessor: 'status' },
      ]
    case 'facilities':
      return [
        { header: dictionary.table.facilities.type, accessor: 'idTypeDetailsDescription' },
        { header: dictionary.table.facilities.sour, accessor: 'idTypeDescription' },
        { header: dictionary.table.facilities.amo, accessor: 'amount' },
        { header: dictionary.table.facilities.uni, accessor: 'unit' },
        { header: dictionary.table.facilities.start, accessor: 'startDate' },
        { header: dictionary.table.facilities.end, accessor: 'endDate' },
        { header: dictionary.table.facilities.up, accessor: 'firstName' },
        // { header: 'Status', accessor: 'active' },
      ]
    case 'logistics':
      return [
        { header: dictionary.table.logistics.trans, accessor: 'invoiceId' },
        { header: dictionary.table.logistics.fuel, accessor: 'idEmissionFactorDescription' },
        { header: dictionary.table.logistics.ori, accessor: 'origin' },
        { header: dictionary.table.logistics.des, accessor: 'destiny' },
        { header: dictionary.table.logistics.dis, accessor: 'amount' },
        { header: dictionary.table.logistics.fue, accessor: 'fuelTypeDescription' },
        { header: dictionary.table.logistics.up, accessor: 'firstName' },
        // { header: 'Status', accessor: 'amount' },
      ]
    case 'manufacturing':
      return [
        { header: dictionary.table.manufacturing.equi, accessor: 'invoiceId' },
        { header: dictionary.table.manufacturing.cd, accessor: 'idEmissionFactor' },
        { header: dictionary.table.manufacturing.amo, accessor: 'amount' },
        { header: dictionary.table.manufacturing.unit, accessor: 'unit' },
        { header: dictionary.table.manufacturing.start, accessor: 'startDate' },
        { header: dictionary.table.manufacturing.end, accessor: 'endDate' },
        { header: dictionary.table.manufacturing.up, accessor: 'firstName' },
        // { header: 'Status', accessor: 'idControlManufacturing' },
      ]
    case 'travels':
      return [
        { header: dictionary.table.travels.vehi, accessor: 'idTravelCboType' },
        { header: dictionary.table.travels.sou, accessor: 'invoiceId' },
        { header: dictionary.table.travels.ori, accessor: 'origin' },
        { header: dictionary.table.travels.desti, accessor: 'destiny' },
        { header: dictionary.table.travels.km, accessor: 'idEmissionFactor' },
        { header: dictionary.table.travels.date, accessor: 'startDate' },
        { header: dictionary.table.travels.up, accessor: 'firstName' },
        // { header: 'Status', accessor: 'idControlTravel' },
      ]
    case 'vehicles':
      return [
        { header: dictionary.table.vehicles.type, accessor: 'idEmissionFactorDescription' },
        { header: dictionary.table.vehicles.sou, accessor: 'cboTypeDescription' },
        { header: dictionary.table.vehicles.amo, accessor: 'amount' },
        { header: dictionary.table.vehicles.unit, accessor: 'unit' },
        { header: dictionary.table.vehicles.start, accessor: 'startDate' },
        { header: dictionary.table.vehicles.end, accessor: 'endDate' },
        { header: dictionary.table.vehicles.up, accessor: 'firstName' },
        // { header: 'Status', accessor: 'active' },
      ]
    default:
      return []
  }
}

async function getData(scope: string, id: number) {
  switch (scope) {
    case 'coooommuting':
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
      const {idControlCommutingDetails} = rowData as CommutingDetails
      const commuting = await deleteCommutingDetails(idControlCommutingDetails || 0)
      return commuting.success
    case 'facilities':
      const {idControlFacilityDetails} = rowData as FacilityDetails
      const facility = await deleteFacilityDetails(idControlFacilityDetails || 0)
      return facility.success
    case 'logistics':
      const {idControlLogisticsDetails} = rowData as LogisticDetails
      const logistic = await deleteLogisticDetails(idControlLogisticsDetails || 0)
      return logistic.success
    case 'manufacturing':
      const {idControlManufacturingDetails} = rowData as ManufacturingDetails
      const manufacturing = await deleteManufacturingDetails(idControlManufacturingDetails || 0)
      return manufacturing.success
    case 'travels':
      const {idControlTravelDetails} = rowData as TravelDetails
      const travels = await deleteTravelDetails(idControlTravelDetails || 0)
      return travels.success
    case 'vehicles':
      const {idControlVehicleDetails} = rowData as VehicleDetails
      const vehicles = await deleteVehicleDetails(idControlVehicleDetails || 0)
      return vehicles.success
    default:
      return null
  }
}

export default Page
