import { toast } from "@/components/ui/use-toast";
import { Facility } from "@/lib/validation";

type Props = {
  facility: Facility;
  handleCreateFacility: (facility: Facility) => Promise<void>;
  handleUpdateFacility: (facility: Facility) => Promise<void>;
};

export async function handleFacilitySubmit({
  facility,
  handleCreateFacility,
  handleUpdateFacility,
}: Props): Promise<void> {
  try {
    if (!facility.idFacility) {
      await handleCreateFacility(facility);
      toast({
        title: "Success",
        description: "Facility created successfully!",
      });
    } else {
      await handleUpdateFacility(facility);
      toast({
        title: "Success",
        description: "Facility updated successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Something went wrong while processing the facility.",
    });
  }
}
