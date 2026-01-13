import { create } from 'zustand';

interface AppStore {
  // Overlay State
  isOverlayEnabled: boolean;
  setIsOverlayEnabled: (value: boolean) => void;
  toggleIsOverlayEnabled: () => void;

  overlayContent: React.ReactNode | null;
  setOverlayContent: (component: React.ReactNode | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Overlay State
  isOverlayEnabled: false,
  setIsOverlayEnabled: (value: boolean) => set({isOverlayEnabled: value}),
  toggleIsOverlayEnabled: () => set((state) => ({ isOverlayEnabled: !state.isOverlayEnabled })),

  overlayContent: null,
  setOverlayContent: (component) => set({ overlayContent: component }),
}));
