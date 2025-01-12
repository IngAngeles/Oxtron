import {toast} from "@/components/ui/use-toast";
import {Facility} from "@/lib/validation";
import {SubmitHandler} from "react-hook-form";

type Props = {
  form: any;
  handleCreateFacility: (facility: Facility) => Promise<void>;
  handleUpdateFacility: (facility: Facility) => Promise<void>;
};

export function createOnSubmitFacility({handleCreateFacility, handleUpdateFacility}: Props): SubmitHandler<Facility> {
  return async (facility: Facility) => {
    try {
      if (!facility.idFacility) {
        await handleCreateFacility(facility);
      } else {
        await handleUpdateFacility(facility);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        className: "bg-[#7f1d1d]",
      });
    }
  };
}
