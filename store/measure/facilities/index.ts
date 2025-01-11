import {create} from 'zustand';
import {
  createFacility,
  deleteFacility,
  getFacilitiesByUserId,
  getFacilityById,
  updateFacility
} from "@/actions/measure/facilities";
import {Facility} from "@/lib/validation";

type FacilityStore = {
  facilities: Facility[];
  error: string | null;
  loading: boolean;
  setFacilities: (facilities: Facility[]) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  fetchFacilities: () => Promise<void>;
  fetchFacilityById: (id: number) => Promise<void>;
  createFacility: (facility: Facility) => Promise<void>;
  updateFacility: (id: number, updatedFacility: Facility) => Promise<void>;
  deleteFacility: (id: number) => Promise<void>;
};

export const useFacilityStore = create<FacilityStore>((set) => ({
  facilities: [],
  error: null,
  loading: false,
  setFacilities: (facilities) => set({facilities}),
  setError: (error) => set({error}),
  setLoading: (loading) => set({loading}),

  fetchFacilities: async () => {
    set({loading: true});
    try {
      const response = await getFacilitiesByUserId();
      set({facilities: response.data, error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to fetch facilities', loading: false});
    }
  },

  fetchFacilityById: async (id) => {
    set({loading: true});
    try {
      const response = await getFacilityById(id);
      set({facilities: response.data ? [response.data] : [], error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to fetch facility', loading: false});
    }
  },

  createFacility: async (facility) => {
    set({loading: true});
    try {
      await createFacility(facility);
      const fetchResponse = await getFacilitiesByUserId();

      set({facilities: fetchResponse.data, error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to create facility', loading: false});
    }
  },

  updateFacility: async (id, updatedFacility: Facility) => {
    set({loading: true});
    try {
      await updateFacility(updatedFacility);
      const fetchResponse = await getFacilitiesByUserId();

      set({facilities: fetchResponse.data, error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to update facility', loading: false});
    }
  },

  deleteFacility: async (id) => {
    set({loading: true});
    try {
      await deleteFacility(id);
      const fetchResponse = await getFacilitiesByUserId();

      set({facilities: fetchResponse.data, error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to delete facility', loading: false});
    }
  },
}));
