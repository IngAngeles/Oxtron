'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";
import VehiclesForm from "@/components/forms/measure/VehiclesForm";
import Loading from "@/components/loading/LoadingBlack";
import TabMenu from "@/components/measure/TabMenu";
import Modal from "@/components/measure/Modal";
import {useVehicles} from "@/hooks/measure/vehicles/useVehicles";

export default function VehiclesPage() {
  const {
    onSubmit,
    dictionary,
    vehicle,
    cards,
    brands,
    models,
    types,
    showModal,
    handleHideModal,
    statuses,
    items,
    buttons,
  } = useVehicles()
  const path = usePathname()

  return (!dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {dictionary?.measure.title}
            </Link> / {dictionary?.measure.all.vehicles}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <TabMenu items={items} cards={cards} iconButton={buttons}/>
      </div>
      {showModal && (
        <Modal title={dictionary.measure.modal.create} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <VehiclesForm
            vehicle={vehicle}
            brands={brands}
            models={models}
            statuses={statuses}
            types={types}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
