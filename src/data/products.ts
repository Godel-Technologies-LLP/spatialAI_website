export interface Product {
  id: string;
  path: string;
  category: string;
  categoryStyles: string;
  name: string;
  iconId: string;
  order?: number;
}

/**
 * Dynamic Discovery Pattern
 * Uses Vite's import.meta.glob to automatically discover product metadata
 * across the module directory without central manual imports.
 */
const modules = import.meta.glob('../features/*/data/metadata.ts', { 
  eager: true,
  import: 'default'
});


// Map the discovered modules into our product array and filter out any invalid entries or non-product features
export const PRODUCTS_DATA: Product[] = (Object.values(modules)
  .filter((m: any) => m && m.path && m.path.startsWith('/products')) as Product[])
  .sort((a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY));



/**
 * Note for Developers:
 * To add a new product, simply create a 'metadata.ts' file in a new module's data directory.
 * The registry will discover it automatically on the next build/HMR.
 */
