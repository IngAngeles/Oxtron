import {create} from 'zustand';
import {getCboFuelType} from "@/actions/shared";
import {
  createManufacturing,
  deleteManufacturing,
  getManufacturingByUserId,
  updateManufacturing
} from "@/actions/measure/manufacturing";
import {Facility, Manufacturing} from "@/lib/validation";
import {getFacilitiesByUserId} from "@/actions/measure/facilities";
import {ComboFuel} from "@/constants/types";

type ManufacturingStore = {
  manufacturing: Manufacturing[];
  facilities: Facility[];
  fuel: ComboFuel[];
  equipment: object[];
  manufacture: Manufacturing | null;
  error: string | null;
  loading: boolean;
  setManufacturing: (manufacturing: Manufacturing[]) => void;
  setManufacture: (manufacturing: Manufacturing | null) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  fetchFormData: () => Promise<void>;
  fetchManufacturing: () => Promise<void>;
  fetchManufacturingById: () => Promise<void>;
  createManufacturing: (manufacturing: Manufacturing) => Promise<string | undefined>;
  updateManufacturing: (manufacturing: Manufacturing) => Promise<string | undefined>;
  deleteManufacturing: (id: number) => Promise<string | undefined>;
};

export const useManufacturingStore = create<ManufacturingStore>((set) => ({
  manufacturing: [],
  facilities: [],
  fuel: [],
  equipment: [],
  manufacture: null,
  error: null,
  loading: false,
  setManufacturing: (manufacturing) => set({manufacturing}),
  setManufacture: (manufacturing: Manufacturing | null) => {
    set({loading: true})
    if (manufacturing) {
      localStorage.setItem("selectedManufacturing", JSON.stringify(manufacturing));
    } else {
      localStorage.removeItem("selectedManufacturing");
    }
    set({manufacture: manufacturing});
    set({loading: false})
  },
  setError: (error) => set({error}),
  setLoading: (loading) => set({loading}),
  fetchFormData: async () => {
    set({loading: true});
    try {
      const facilitiesResponse = await getFacilitiesByUserId();
      const fuelResponse = await getCboFuelType();
      set({
        facilities: facilitiesResponse.data,
        fuel: fuelResponse.data,
        equipment: [],
        error: null,
        loading: false,
      });
    } catch (error) {
      set({error: 'Failed to fetch manufacturing', loading: false});
    }
  },
  fetchManufacturing: async () => {
    set({loading: true});
    try {
      const response = await getManufacturingByUserId();
      set({manufacturing: response.data, error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to fetch manufacturing', loading: false});
    }
  },
  fetchManufacturingById: async () => {
    const savedManufacturing = localStorage.getItem("selectedManufacturing");
    if (savedManufacturing) {
      set({manufacture: JSON.parse(savedManufacturing)});
    }
  },
  createManufacturing: async (manufacture) => {
    set({loading: true});
    try {
      const response = await createManufacturing(manufacture);
      const fetchResponse = await getManufacturingByUserId();

      set({manufacturing: fetchResponse.data, error: null, loading: false});

      return response.data;
    } catch (error) {
      set({error: 'Failed to create manufacturing', loading: false});
    }
  },
  updateManufacturing: async (updatedManufacturing: Manufacturing) => {
    set({loading: true});
    try {
      const response = await updateManufacturing(updatedManufacturing);
      const fetchResponse = await getManufacturingByUserId();

      set({manufacturing: fetchResponse.data, error: null, loading: false});

      return response.data;
    } catch (error) {
      set({error: 'Failed to update manufacturing', loading: false});
    }
  },
  deleteManufacturing: async (id) => {
    set({loading: true});
    try {
      const response = await deleteManufacturing(id);
      const fetchResponse = await getManufacturingByUserId();

      set({manufacturing: fetchResponse.data, error: null, loading: false});

      return response.data;
    } catch (error) {
      set({error: 'Failed to delete manufacturing', loading: false});
    }
  },
}));
