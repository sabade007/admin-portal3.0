import { create } from "zustand";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  searchTermmob: string;
  setSearchTermmob: (term: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  searchTermmob: "",
  setSearchTermmob: (term) => set({ searchTermmob: term }),
}));

export default useSearchStore;
