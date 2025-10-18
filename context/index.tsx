"use client";
import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

interface ContextProps {
  open: boolean;
  openSearch: boolean;
  handleSetOpen: VoidFunction;
  handleSetSearch: VoidFunction;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CreateContext = createContext<ContextProps | null>(null);

const UseContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error("useStateData must be used within a ContextProvider");
  }
  return context;
};

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleSetOpen = useCallback(() => setOpen((prev) => !prev), []);
  const handleSetSearch = useCallback(() => setOpenSearch((prev) => !prev), []);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity }];
    });
    setOpen(!open)
    
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const contextValue = useMemo<ContextProps>(
    () => ({
      open,
      openSearch,
      handleSetOpen,
      handleSetSearch,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
    }),
    [open, openSearch, handleSetOpen, handleSetSearch, cart, addToCart, removeFromCart, updateQuantity]
  );

  return (
    <CreateContext.Provider value={contextValue}>
      {children}
    </CreateContext.Provider>
  );
};

export { ContextProvider, CreateContext, UseContext };
