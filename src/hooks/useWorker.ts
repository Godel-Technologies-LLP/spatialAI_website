import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useWorker Hook
 * Boilerplate for React-Worker communication with loading and error states.
 */
export function useWorker<T = any, P = any>(workerPath: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Note: In Vite, workers are typically imported via ?worker
    // This is a generic boilerplate for the pattern.
    workerRef.current = new Worker(new URL(workerPath, import.meta.url));

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { type, payload } = e.data;
      setData(payload);
      setIsLoading(false);
    };

    workerRef.current.onerror = (err) => {
      setError(new Error('Worker error'));
      setIsLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerPath]);

  const postMessage = useCallback((type: string, payload: P, transferables?: Transferable[]) => {
    if (!workerRef.current) return;
    setIsLoading(true);
    setError(null);
    if (transferables) {
      workerRef.current.postMessage({ type, payload }, transferables);
    } else {
      workerRef.current.postMessage({ type, payload });
    }
  }, []);

  return { data, isLoading, error, postMessage };
}
