'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CommutingInvoiceForm } from '@/components/forms/measure/Details/CommutingInvoiceForm'
import { FacilityInvoiceForm } from '@/components/forms/measure/Details/FacilityInvoiceForm'
import { LogisticsInvoiceForm } from '@/components/forms/measure/Details/LogisticsInvioceForm'
import { TravelsInvoiceForm } from '@/components/forms/measure/Details/TravelsInvoiceForm'
import { VehiclesInvoiceForm } from '@/components/forms/measure/Details/VehiclesInvoiceForm'
import Loading from '@/components/loading/LoadingBlack'
import { HistoricalCard } from '@/components/measure/historical/HistoricalCard'
import { Modal } from '@/components/shared/Modal'
import { SimpleTable } from '@/components/shared/SimpleTable'
import {
  getCommutingDetails,
  getFacilityDetails,
  getLogisticDetails,
  getManufacturingDetails,
  getTravelDetails,
  getVehicleDetails
} from '@/actions/measure/details'
import { ManufacturingInvoiceForm } from '@/components/forms/measure/Details/ManufacturingInvioceForm'
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

type Props = { params: { scope: string, id: number } };

const Page = ({ params: { scope, id } }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<Array<any>>([])
  const path = usePathname()
  const lang: Locale = (path?.split("/")[1] as Locale) || "en";
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const dict = await getDictionary(lang);
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
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={ path.split('/').slice(0, -1).join('/').replace(`/${ scope }`, '') }
              className="text-neutral-300"
            >
              {dictionary.title}
            </Link> /

            <Link
              href={ path.split('/').slice(0, -1).join('/') }
              className="text-neutral-300"
            >
              { ` ${ scope }` }
            </Link>
            { ' ' } / { id }
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary.subtitle}
          </p>
        </div>
        <HistoricalCard onClick={ () => setIsOpen(true) }>
          { isLoading ?
            <Loading/> :
            <SimpleTable columns={ getColumnsByScope(scope, dictionary) } data={ data }/>
          }
        </HistoricalCard>
      </div>
      <Modal open={ isOpen } onClose={ () => setIsOpen(false) } title={dictionary.create}>
        { scope === 'commuting' ? <CommutingInvoiceForm idControlCommuting={ id }/> :
          scope === 'facilities' ? <FacilityInvoiceForm idControlFacility={ id }/> :
            scope === 'logistics' ? <LogisticsInvoiceForm idControlLogistics={ id }/> :
              scope === 'manufacturing' ? <ManufacturingInvoiceForm idControlManufacturing={ id }/> :
                scope === 'travels' ? <TravelsInvoiceForm idControlTravel={ id }/> :
                  <VehiclesInvoiceForm idControlVehicle={ id }/>
        }
      </Modal>
    </>
  )
}

function getColumnsByScope(scope: string, dictionary: any) {
  switch (scope) {
    case 'coooommuting':
      return [
        { header: dictionary.table.commuting.trans, accessor: 'distinationZipCode' },
        { header: dictionary.table.commuting.acti, accessor: 'originZipCode' },
        { header: dictionary.table.commuting.dis, accessor: 'distance' },
        { header: dictionary.table.commuting.unit, accessor: 'active' },
        { header: dictionary.table.commuting.ori, accessor: 'origin' },
        { header: dictionary.table.commuting.dest, accessor: 'destination' },
        { header: dictionary.table.commuting.user, accessor: 'idControlCommuting' },
        { header: dictionary.table.commuting.status, accessor: 'fuelEfficiency' },
      ]
    case 'facilities':
      return [
        { header: dictionary.table.facilities.type, accessor: 'idType' },
        { header: dictionary.table.facilities.sour, accessor: 'idEmissionFactor' },
        { header: dictionary.table.facilities.amo, accessor: 'amount' },
        { header: dictionary.table.facilities.uni, accessor: 'unit' },
        { header: dictionary.table.facilities.start, accessor: 'startDate' },
        { header: dictionary.table.facilities.end, accessor: 'endDate' },
        { header: dictionary.table.facilities.up, accessor: 'invoiceId' },
        { header: dictionary.table.facilities.status, accessor: 'active' },
      ]
    case 'logistics':
      return [
        { header: dictionary.table.logistics.trans, accessor: 'invoiceId' },
        { header: dictionary.table.logistics.fuel, accessor: 'idFuelType' },
        { header: dictionary.table.logistics.ori, accessor: 'origin' },
        { header: dictionary.table.logistics.des, accessor: 'destiny' },
        { header: dictionary.table.logistics.dis, accessor: 'active' },
        { header: dictionary.table.logistics.fue, accessor: 'unit' },
        { header: dictionary.table.logistics.up, accessor: 'idEmissionFactor' },
        { header: dictionary.table.logistics.status, accessor: 'amount' },
      ]
    case 'manufacturing':
      return [
        { header: dictionary.table.manufacturing.equi, accessor: 'invoiceId' },
        { header: dictionary.table.manufacturing.cd, accessor: 'idEmissionFactor' },
        { header: dictionary.table.manufacturing.amo, accessor: 'amount' },
        { header: dictionary.table.manufacturing.unit, accessor: 'unit' },
        { header: dictionary.table.manufacturing.start, accessor: 'startDate' },
        { header: dictionary.table.manufacturing.end, accessor: 'endDate' },
        { header: dictionary.table.manufacturing.up, accessor: 'active' },
        { header: dictionary.table.manufacturing.status, accessor: 'idControlManufacturing' },
      ]
    case 'travels':
      return [
        { header: dictionary.table.travels.vehi, accessor: 'idTravelCboType' },
        { header: dictionary.table.travels.sou, accessor: 'invoiceId' },
        { header: dictionary.table.travels.ori, accessor: 'origin' },
        { header: dictionary.table.travels.desti, accessor: 'destiny' },
        { header: dictionary.table.travels.km, accessor: 'idEmissionFactor' },
        { header: dictionary.table.travels.date, accessor: 'startDate' },
        { header: dictionary.table.travels.up, accessor: 'active' },
        { header: dictionary.table.travels.status, accessor: 'idControlTravel' },
      ]
    case 'vehicles':
      return [
        { header: dictionary.table.vehicles.type, accessor: 'idVehicleCboType' },
        { header: dictionary.table.vehicles.sou, accessor: 'invoiceId' },
        { header: dictionary.table.vehicles.amo, accessor: 'amount' },
        { header: dictionary.table.vehicles.unit, accessor: 'unit' },
        { header: dictionary.table.vehicles.start, accessor: 'startDate' },
        { header: dictionary.table.vehicles.end, accessor: 'endDate' },
        { header: dictionary.table.vehicles.up, accessor: 'idEmissionFactor' },
        { header: dictionary.table.vehicles.status, accessor: 'active' },
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

export default Page