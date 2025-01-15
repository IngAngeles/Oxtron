'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import TabMenu from "@/components/measure/TabMenu";
import Modal from "@/components/measure/Modal";
import LogisticsForm from "@/components/forms/measure/LogisticsForm";
import {useLogistics} from "@/hooks/measure/logistics/useLogistics";

export default function LogisticsPage() {
  const {
    dictionary,
    items,
    cards,
    buttons,
    showModal,
    handleHideModal,
    logistic,
    brands,
    models,
    statuses,
    isDisabled,
    types,
    vehicles,
    currentStep,
    nextStep,
    prevStep,
    steps,
    onSubmit,
    form,
  } = useLogistics()
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
        <Modal title={dictionary.measure.modall.title} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <LogisticsForm
            logistic={logistic}
            dictionary={dictionary.measure.modall}
            brands={brands}
            models={models}
            statuses={statuses}
            types={types}
            vehicles={vehicles}
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            steps={steps}
            form={form}
            isDisabled={isDisabled}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
