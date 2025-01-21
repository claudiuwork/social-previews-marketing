import { create } from "zustand";

const useMetaDataStore = create((set) => {
  return {
    metaData: {},
    setMetaData: (data) => {
      set({ metaData: data });
    },
  };
});

export default useMetaDataStore;
