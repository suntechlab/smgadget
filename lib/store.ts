import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

interface CartState {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
  isOpenCart: boolean;
  isOpenSearch: boolean;
}

interface Actions {
  addToCart: (Item: Product) => void;
  incrementQuantity: (Item: Product) => void;
  decrementQuantity: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const INITIAL_STATE: CartState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  isOpenCart: false,
  isOpenSearch: false,
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export const useCartStore = create<CartState & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      incrementQuantity: (product: Product) => {
        set({
          cart: get().cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          ),
        });
      },
      decrementQuantity: (product: Product) => {
        set({
          cart: get().cart.map((item) =>
            item.id === product.id && (item.quantity as number) > 1
              ? { ...item, quantity: (item.quantity as number) - 1 }
              : item
          ),
        });
      },
      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      isOpenCart: INITIAL_STATE.isOpenCart,
      toggleCart: () => set({ isOpenCart: !get().isOpenCart }),
      isOpenSearch: INITIAL_STATE.isOpenSearch,
      toggleSearch: () => set({ isOpenSearch: !get().isOpenSearch }),
      openCart: () => set({ isOpenCart: true }),
      closeCart: () => set({ isOpenCart: false }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export const useCartStore1 = create<CartState & Actions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart: (product: Product) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === product.id);

    // If the item already exists in the Cart, increase its quantity
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity as number) + 1 }
          : item
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];

      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
  incrementQuantity: (product: Product) => {
    set({
      cart: get().cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity as number) + 1 }
          : item
      ),
    });
  },
  decrementQuantity: (product: Product) => {
    set({
      cart: get().cart.map((item) =>
        item.id === product.id && (item.quantity as number) > 1
          ? { ...item, quantity: (item.quantity as number) - 1 }
          : item
      ),
    });
  },
  removeFromCart: (product: Product) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - product.price,
    }));
  },
  isOpenCart: INITIAL_STATE.isOpenCart,
  toggleCart: () => set({ isOpenCart: !get().isOpenCart }),
  isOpenSearch: INITIAL_STATE.isOpenSearch,
  toggleSearch: () => set({ isOpenSearch: !get().isOpenSearch }),
  openCart: () => set({ isOpenCart: true }),
  closeCart: () => set({ isOpenCart: false }),
}));
