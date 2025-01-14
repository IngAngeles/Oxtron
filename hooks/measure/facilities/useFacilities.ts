import { toast } from "@/components/ui/use-toast";
import { Facility } from "@/lib/validation";
import {useFacilityStore} from "@/store/measure/facilities";
import {useDictionary} from "@/hooks/shared/useDictionary";

export function useFacilities() {
  const { fetchFacilities, createFacility, updateFacility } = useFacilityStore()
  const { dictionary } = useDictionary()

  const onSubmit = async (facility: Facility) => {
    try {
      if (facility.idControlFacility) {
        await updateFacility(facility);

        toast({
          title: dictionary?.measure.modal.toast.update.title || "Success",
          description: dictionary?.measure.modal.toast.update.description || "Facility updated successfully!",
          className: 'bg-black',
        });
      } else {
        await createFacility(facility);

        toast({
          title: dictionary?.measure.modal.toast.create.title || "Success",
          description: dictionary?.measure.modal.toast.create.description || "Facility created successfully!",
          className: 'bg-black',
        });
      }

      await fetchFacilities()
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: dictionary?.measure.modal.toast.error.title || "Error",
        description: dictionary?.measure.modal.toast.error.description || "Something went wrong while processing the facility.",
      });
    }
  }

  return { onSubmit }
}
