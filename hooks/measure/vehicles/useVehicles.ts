import {useDictionary} from "@/hooks/shared/useDictionary";
import {useVehicleStore} from "@/store/measure/vehicles";
import {useModal} from "@/hooks/shared/useModal";
import {useEffect, useState} from "react";
import {Vehicle} from "@/lib/validation";
import {toast} from "@/components/ui/use-toast";

export const useVehicles = () => {
  const {isLoading, dictionary} = useDictionary()
  const {
    vehicles,
    vehicle,
    brands,
    models,
    statuses,
    types,
    createVehicle,
    fetchVehicles,
    fetchFormData,
    setLoading,
    setVehicle,
    updateVehicle,
    loading
  } = useVehicleStore()
  const {showModal, handleShowModal, handleHideModal} = useModal()
  const [brandOptions, setBrandOptions] = useState<Option[]>([])
  const [modelOptions, setModelOptions] = useState<Option[]>([])
  const [statusOptions, setStatusOptions] = useState<Option[]>([])
  const [typeOptions, setTypeOptions] = useState<Option[]>([])
  const [cards, setCards] = useState<Card[]>([])

  const items: string[] = [dictionary?.measure.bar[0]]

  const buttons: IIconButton[] = [
    {
      src: '/assets/icons/black/Search.png',
      alt: 'Search icon',
      size: 'xs',
      text: dictionary?.measure.search,
      onClick: () => {
      },
    },
    {
      src: '/assets/icons/black/Add New-1.png',
      alt: 'Add icon',
      size: 'xs',
      text: dictionary?.measure.add,
      onClick: () => {
        handleShowModal()
        setVehicle(null)
      }
    },
  ]

  useEffect(() => {
    fetchVehicles()
    fetchFormData()
  }, [])

  useEffect(() => {
    setLoading(true)
    const cards: Card[] = vehicles.map((vehicle) => ({
      id: vehicle.idControlVehicle || 0,
      title: `${vehicle.name}`,
      description: 'Mexico City, Mexico',
      icon: {
        src: '/assets/icons/black/Edit.png',
        position: 'head',
        onClick: () => {
          handleShowModal()
          setVehicle(vehicle!)
        },
      },
      link: `/${vehicle.idControlVehicle}`,
      lastUpdated: new Date(2022, 10, 23),
    }))

    setCards(cards)
  }, [vehicles])

  useEffect(() => {
    setLoading(true)
    setBrandOptions(brands.map((brand) => ({
      value: brand.idVehicleCboBrand.toString(),
      label: brand.description
    })))
    setModelOptions(models.map((model) => ({
      value: model.idVehicleCboModel.toString(),
      label: model.description,
    })))
    setStatusOptions(statuses.map((status) => ({
      value: status.idStatus.toString(),
      label: status.description,
    })))
    setTypeOptions(types.map((type) => ({
      value: type.idVehicleCboType.toString(),
      label: type.description,
    })))
    setLoading(false)
  }, [brands, models, statuses, types]);

  const onSubmit = async (vehicle: Vehicle) => {
    try {
      if (vehicle.idControlVehicle) {
        await updateVehicle(vehicle);

        toast({
          title: dictionary?.measure.modal.toast.update.title,
          description: dictionary?.measure.modal.toast.update.description,
          className: 'bg-black',
        });
      } else {
        await createVehicle(vehicle);

        toast({
          title: dictionary?.measure.modal.toast.create.title,
          description: dictionary?.measure.modal.toast.create.description,
          className: 'bg-black',
        });
      }

      setLoading(false)
      handleHideModal()
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: dictionary?.measure.modal.toast.error.title,
        description: dictionary?.measure.modal.toast.error.description,
      });
    }
  }

  return {
    dictionary,
    isLoading,
    vehicles,
    vehicle,
    showModal,
    handleShowModal,
    handleHideModal,
    brands: brandOptions,
    models: modelOptions,
    statuses: statusOptions,
    types: typeOptions,
    cards,
    onSubmit,
    loading,
    items,
    buttons,
  }
}