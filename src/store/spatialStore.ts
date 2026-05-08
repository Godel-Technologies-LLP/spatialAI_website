import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface SpatialState {
  // High-frequency data (e.g., current active node ID)
  activeNodeId: string | null;
  // Massive data arrays (stored here to decouple from React lifecycle)
  geometricNodes: Float32Array | null;
  // Spatial metrics
  metrics: {
    fps: number;
    gpuMemory: number;
  };
  
  // Actions
  setActiveNodeId: (id: string | null) => void;
  setGeometricNodes: (nodes: Float32Array) => void;
  updateMetrics: (metrics: Partial<SpatialState['metrics']>) => void;
}

/**
 * useSpatialStore
 * Optimized for granular updates using subscribeWithSelector.
 * This allows us to update the 3D scene without re-rendering the entire React UI.
 */
export const useSpatialStore = create<SpatialState>()(
  subscribeWithSelector((set) => ({
    activeNodeId: null,
    geometricNodes: null,
    metrics: {
      fps: 0,
      gpuMemory: 0,
    },

    setActiveNodeId: (id) => set({ activeNodeId: id }),
    setGeometricNodes: (nodes) => set({ geometricNodes: nodes }),
    updateMetrics: (metrics) => set((state) => ({ 
      metrics: { ...state.metrics, ...metrics } 
    })),
  }))
);

/**
 * Example of Decoupling:
 * Components can select exactly what they need. 
 * A 'StatusIndicator' only re-renders when metrics change.
 * The 3D Canvas only re-renders when geometricNodes change.
 */
