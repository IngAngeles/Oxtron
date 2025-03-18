import {create} from "zustand";
import {Communicate} from "@/lib/validation";
import {createCommunicateReport, fetchRecentReports} from "@/actions/communicate";

type CommunicateStore = {
  reports: Communicate[],
  report: Communicate | null,
  error: string | null;
  loading: boolean;
  showReportModal: boolean;
  handleHideReportModal: () => void;
  handleShowReportModal: () => void;
  showCreateReportModal: boolean;
  handleHideCreateReportModal: () => void;
  handleShowCreateReportModal: () => void;
  setReports: (reports: Communicate[]) => void;
  setReport: (report: Communicate | null) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  fetchReports: () => Promise<void>;
  fetchReportById: () => Promise<void>;
  createReport: (report: Communicate) => Promise<string | undefined>;
  updateReport: (updatedCommunicate: Communicate) => Promise<string | undefined>;
  deleteReport: (id: number) => Promise<string | undefined>;
}

export const useCommunicateStore = create<CommunicateStore>((set) => ({
  reports: [],
  report: null,
  error: null,
  loading: false,
  showReportModal: false,
  showCreateReportModal: false,
  handleHideReportModal: () => set({showReportModal: false}),
  handleShowReportModal: () => set({showReportModal: true}),
  handleHideCreateReportModal: () => set({showCreateReportModal: false}),
  handleShowCreateReportModal: () => set({showCreateReportModal: true}),
  setReports: (reports: Communicate[]) => set({reports}),
  setReport: (report: Communicate | null) => {
    set({loading: true})
    if (report) {
      localStorage.setItem("selectedReport", JSON.stringify(report));
    } else {
      localStorage.removeItem("selectedReport");
    }
    set({ report });
    set({loading: false})
  },
  setError: (error) => set({error}),
  setLoading: (loading) => set({loading}),
  fetchReports: async () => {
    set({loading: true});
    try {
      const response = await fetchRecentReports();
      set({reports: response, error: null, loading: false});
    } catch (error) {
      set({error: 'Failed to fetch reports', loading: false});
    }
  },
  fetchReportById: async () => {
  const savedReport = localStorage.getItem("selectedReport");
  if (savedReport) {
    set({ report: JSON.parse(savedReport) });
  }},
  createReport: async (report: Communicate) => {
    set({loading: true});
    try {
      await createCommunicateReport(report);
      const fetchResponse = await fetchRecentReports();

      set({reports: fetchResponse, showCreateReportModal: false, error: null, loading: false});

      return 'success'
    } catch (error) {
      set({error: 'Failed to create facility', loading: false});
    }
  },
  updateReport: (report: Communicate) => new Promise<string | undefined>((resolve, reject) => {
  }),
  deleteReport: (id: number) => new Promise<string | undefined>((resolve, reject) => {
  }),
}));
