import { useState, useCallback } from 'react';

/**
 * useChunkedDataFetch
 * Optimized for large-scale engineering datasets.
 * Implements a "Page-by-Page" or "Chunk-by-Chunk" loading strategy.
 */
export function useChunkedDataFetch() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChunk = useCallback(async (documentId: string, page: number) => {
    setLoading(true);
    try {
      // Strategy: Only fetch the detailed geometric metadata for the specific page
      // instead of the entire document payload.
      const response = await fetch(`/api/docs/${documentId}/page/${page}`);
      const chunk = await response.json();
      
      setData((prev) => {
        const newData = [...prev];
        newData[page] = chunk;
        return newData;
      });
    } catch (err) {
      console.error('Failed to fetch chunk', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchChunk };
}

/**
 * Note on Binary Formats:
 * For truly massive datasets (1M+ points), we recommend:
 * 1. fetch(url).then(res => res.arrayBuffer())
 * 2. Parsing the TypedArray directly into a Web Worker
 * 3. Transferring the buffer to a Three.js BufferGeometry
 */
