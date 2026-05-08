/**
 * WASM Bridge with Graceful Degradation
 * Automatically detects environment security capabilities and chooses the optimal memory strategy.
 */

export interface WasmGeometryExports {
  memory: WebAssembly.Memory;
  process_coordinates: (offset: number, length: number) => void;
  calculate_area: (offset: number, length: number) => number;
}

export const isSharedMemorySupported = (): boolean => {
  return typeof SharedArrayBuffer !== 'undefined' && window.crossOriginIsolated;
};

export async function loadGeometryWasm(url: string): Promise<WasmGeometryExports> {
  const response = await fetch(url);
  const bytes = await response.arrayBuffer();
  
  const supportsSAB = isSharedMemorySupported();
  
  // Choose optimal memory strategy
  const memory = new WebAssembly.Memory({
    initial: 256,
    maximum: supportsSAB ? 1024 : undefined,
    shared: supportsSAB
  });

  const { instance } = await WebAssembly.instantiate(bytes, {
    env: { memory }
  });

  return instance.exports as unknown as WasmGeometryExports;
}

/**
 * Memory Proxy: Abstracted interface for data passing
 */
export function createDataBuffer(size: number): ArrayBuffer | SharedArrayBuffer {
  return isSharedMemorySupported() 
    ? new SharedArrayBuffer(size) 
    : new ArrayBuffer(size);
}
