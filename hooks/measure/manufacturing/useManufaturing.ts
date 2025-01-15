import {useDictionary} from "@/hooks/shared/useDictionary";
import {useModal} from "@/hooks/shared/useModal";
import {useEffect, useState} from "react";
import {Manufacturing} from "@/lib/validation";
import {toast} from "@/components/ui/use-toast";
import {useManufacturingStore} from "@/store/measure/manufacturing";

export const useManufacturing = () => {
  const {isLoading, dictionary} = useDictionary()
  const {
    manufacturing,
    manufacture,
    facilities,
    fuel,
    equipment,
    createManufacturing,
    fetchManufacturing,
    fetchFormData,
    setLoading,
    setManufacture,
    updateManufacturing,
    loading,
  } = useManufacturingStore()
  const {showModal, handleShowModal, handleHideModal} = useModal()
  const [facilityOptions, setFacilityOptions] = useState<Option[]>([])
  const [fuelOptions, setFuelOptions] = useState<Option[]>([])
  const [equipmentOptions, setEquipmentOptions] = useState<Option[]>([])
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
        setManufacture(null)
      }
    },
  ]

  useEffect(() => {
    fetchManufacturing()
    fetchFormData()
  }, [])

  useEffect(() => {
    setLoading(true)
    const cards: Card[] = manufacturing.map((manufacturing) => ({
      id: manufacturing.idControlManufacturing || 0,
      title: `${manufacturing.process}`,
      description: 'Mexico City, Mexico',
      icon: {
        src: '/assets/icons/black/Edit.png',
        position: 'head',
        onClick: () => {
          handleShowModal()
          setManufacture(manufacturing!)
        },
      },
      link: `/${manufacturing.idControlManufacturing}`,
      lastUpdated: new Date(2022, 10, 23),
    }))

    setCards(cards)
  }, [manufacturing])

  useEffect(() => {
    setLoading(true)
    setFacilityOptions(facilities.map((facility) => ({
      value: facility?.idControlFacility?.toString() || '0',
      label: facility.idFacility,
    })))
    setFuelOptions(fuel.map((f) => ({
      value: f.idControl.toString(),
      label: f.description,
    })))
    setEquipmentOptions(equipment.map((eq) => ({
      value: '1',
      label: 'Mundo'
    })))
    setLoading(false)
  }, [facilities, fuel, equipment]);

  const onSubmit = async (manufacturing: Manufacturing) => {
    try {
      if (manufacturing.idControlManufacturing) {
        await updateManufacturing(manufacturing);

        toast({
          title: dictionary?.measure.modal.toast.update.title,
          description: dictionary?.measure.modal.toast.update.description,
          className: 'bg-black',
        });
      } else {
        await createManufacturing(manufacturing);

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
    manufacturing,
    manufacture,
    showModal,
    handleShowModal,
    handleHideModal,
    facilityOptions,
    fuelOptions,
    equipmentOptions,
    cards,
    onSubmit,
    loading,
    items,
    buttons,
  }
}