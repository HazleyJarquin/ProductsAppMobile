import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IProduct } from "../interfaces/IProduct";

interface ProductStore {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
  updateProduct: (id: string, updatedProduct: Partial<IProduct>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => IProduct | undefined;
  clearProducts: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      isEditing: false,
      setIsEditing: (isEditing) => set({ isEditing }),
      products: [],

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      getProductById: (id) => {
        const state = get();
        return state.products.find((product) => product.id === id);
      },
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
