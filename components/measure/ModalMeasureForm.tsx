import FacilitiesForm from '@/components/forms/measure/FacilitiesForm'
import VehiclesForm from '@/components/forms/measure/VehiclesForm'
import TravelsForm from '@/components/forms/measure/TravelsForm'
import LogisticsForm from '@/components/forms/measure/LogisticsForm'
import ManufacturingForm from '@/components/forms/measure/ManufacturingForm'
import CommutingForm from '@/components/forms/measure/CommutingForm'
import IconButton from '@/components/measure/IconButton'
import { ICommuting, IFacility, ILogistic, IManufacturing, IMeasureResponse, ITravel, IVehicle } from '@/constants/types'

type Props = {
  scope: string,
  title: string,
  handleOnCloseModal: () => void,
  measure?: IMeasureResponse
}

const ModalMeasureForm = ({ scope, title, handleOnCloseModal, measure }: Props) => {
  return (
    <div className="fixed top-0 right-0 flex flex-col items-center justify-center w-screen h-screen bg-black/25">
      <div
        className="flex flex-col items-center justify-between w-full h-full lg:w-1/3 md:w-2/3 md:h-auto rounded bg-white p-8 gap-4 md:gap-8">
        <section className="flex items-center justify-between w-full h-auto space-y-4">
          <h3 className="font-bold text-xl text-neutral-900">{ title }</h3>
          <div className="flex items-center justify-center rounded-full border-2 border-neutral-500">
            <IconButton src="/assets/icons/black/Delete.png" alt="Close icon" size="md" onClick={ handleOnCloseModal }/>
          </div>
        </section>
        {
          scope === 'facilities' ? <FacilitiesForm facilityMeasure={ measure as unknown as IFacility }/> :
            scope === 'vehicles' ? <VehiclesForm vehicleMeasure={ measure as unknown as IVehicle }/> :
              scope === 'travels' ? <TravelsForm travelMeasure={ measure as unknown as ITravel }/> :
                scope === 'logistics' ? <LogisticsForm logisticMeasure={ measure as unknown as ILogistic }/> :
                  scope === 'manufacturing' ?
                    <ManufacturingForm manufacturingMeasure={ measure as unknown as IManufacturing }/> :
                    <CommutingForm commutingMeasure={ measure as unknown as ICommuting }/>
        }
      </div>
    </div>
  )
}

export default ModalMeasureForm
