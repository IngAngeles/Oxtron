'use client'
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogistics } from "@/hooks/measure/logistics/useLogistics";

// ⬇️ Importaciones dinámicas para evitar errores de SSR (document is not defined)
const Loading = dynamic(() => import("@/components/loading/LoadingBlack"), { ssr: false });
const TabMenu = dynamic(() => import("@/components/measure/TabMenu"), { ssr: false });
const Modal = dynamic(() => import("@/components/measure/Modal"), { ssr: false });
const LogisticsForm = dynamic(() => import("@/components/forms/measure/LogisticsForm"), { ssr: false });

export default function LogisticsPage() {
  const {
    dictionary,
    items,
    cards,
    buttons,
    showModal,
    handleHideModal,
    logistic,
    loading,
    brands,
    models,
    statuses,
    isDisabled,
    isModelDisabled,
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
      <div className="flex flex-col  gap-4 p-6 lg:ml-[205px] ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {dictionary?.measure.title}
            </Link> / {dictionary?.measure.all.logistics}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <TabMenu items={items} cards={cards} iconButton={buttons}/>
      </div>
      {showModal && (
        <Modal
          title={!logistic ? dictionary.measure.modall.create : dictionary.measure.modall.title}
          handleOnCloseModal={handleHideModal}
          stepper={{
            steps: 3, currentStep: 0, setCurrentStep: () => {}
          }}
          className="max-h-[80vh]">
          <LogisticsForm
            logistic={logistic}
            loading={loading}
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
            isModelDisabled={isModelDisabled}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
