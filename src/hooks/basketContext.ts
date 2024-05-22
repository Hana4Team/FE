import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useReducer,
  } from "react";
import { BasketMenuType, BasketType } from "../types/menu";
  
  type BasketContextProp = {
    basket: BasketType;
    // 장바구니에 담는 함수
    addBasket: (menu: BasketMenuType) => void;
    // 장바구니에서 삭제하는 함수
    removeBasket: (basketIdx: number) => void;
    // 장바구니 비우는 함수
    resetBasket: () => void;
    // 장바구니에서 개수 +1하는 함수
    plusMenu: (basketIdx: number) => void;
    // 장바구니에서 개수 -1하는 함수
    minusMenu: (basketIdx: number) => void;
  };
  
  type ProviderProps = {
    children: ReactNode;
  };
  
  type Action =
    | {
        type: "addBasket";
        payload: BasketMenuType;
      }
    | { type: "removeBasket" | "plusMenu" | "minusMenu"; payload: number }
    | { type: "resetBasket"; payload: null };
  
  const DefaultBasket: BasketType = {
    totalPrice: 0,
    basketList: [] as BasketMenuType[],
  };
  
  const BasketContext = createContext<BasketContextProp>({
    basket: { totalPrice: 0, basketList: [] as BasketMenuType[] },
    addBasket: (menu: BasketMenuType) => {},
    removeBasket: (basketIdx: number) => {},
    resetBasket: () => {},
    plusMenu: (basketIdx: number) => {},
    minusMenu: (basketIdx: number) => {},
  });
  
  const reducer = (basket: BasketType, { type, payload }: Action): BasketType => {
    let newer: BasketMenuType[] = [];
    let newer2: number = basket.totalPrice;
  
    switch (type) {
      case "addBasket":
        newer = [...basket.basketList, payload];
        newer2 += payload.menuPrice;
        break;
  
      case "removeBasket":
        for (let i = 0; i < basket.basketList.length; i++) {
          let menu = basket.basketList[i];
          if (menu.basketIdx == payload) {
            i == basket.basketList.length - 1
              ? (newer = basket.basketList.slice(0, i))
              : (newer = [
                  ...basket.basketList.slice(0, i),
                  ...basket.basketList.slice(i + 1, basket.basketList.length),
                ]);
            newer2 -= menu.menuPrice * menu.orderDetailCount;
            break;
          }
        }
        break;
  
      case "resetBasket":
        newer = [];
        newer2 = 0;
        break;
  
      case "plusMenu":
        for (let i = 0; i < basket.basketList.length; i++) {
          let menu = { ...basket.basketList[i] };
          if (menu.basketIdx == payload) {
            i == basket.basketList.length - 1
              ? (newer = basket.basketList.slice(0, i))
              : (newer = [
                  ...basket.basketList.slice(0, i),
                  ...basket.basketList.slice(i + 1, basket.basketList.length),
                ]);
            menu.orderDetailCount = basket.basketList[i].orderDetailCount + 1;
            newer.splice(i, 0, menu);
            newer2 += menu.menuPrice;
            break;
          }
        }
        break;
  
      case "minusMenu":
        for (let i = 0; i < basket.basketList.length; i++) {
          let menu = { ...basket.basketList[i] };
          if (menu.basketIdx == payload) {
            i == basket.basketList.length - 1
              ? (newer = basket.basketList.slice(0, i))
              : (newer = [
                  ...basket.basketList.slice(0, i),
                  ...basket.basketList.slice(i + 1, basket.basketList.length),
                ]);
            menu.orderDetailCount = basket.basketList[i].orderDetailCount - 1;
            newer.splice(i, 0, menu);
            newer2 -= menu.menuPrice;
            break;
          }
        }
        break;
  
      default:
        break;
    }
  
    let res: BasketType = {
      totalPrice: newer2,
      basketList: newer,
    };
  
    return res;
  };
  
  export const BasketProvider = ({ children }: ProviderProps) => {
    const [basket, dispatch] = useReducer(reducer, DefaultBasket);
  
    const addBasket = useCallback((menu: BasketMenuType) => {
      dispatch({ type: "addBasket", payload: menu });
    }, []);
  
    const removeBasket = useCallback((basketIdx: number) => {
      dispatch({ type: "removeBasket", payload: basketIdx });
    }, []);
  
    const resetBasket = useCallback(() => {
      dispatch({ type: "resetBasket", payload: null });
    }, []);
  
    const plusMenu = useCallback((basketIdx: number) => {
      dispatch({ type: "plusMenu", payload: basketIdx });
    }, []);
  
    const minusMenu = useCallback((basketIdx: number) => {
      dispatch({ type: "minusMenu", payload: basketIdx });
    }, []);
  
    return (
      <BasketContext.Provider
        value={{
          basket,
          addBasket,
          removeBasket,
          resetBasket,
          plusMenu,
          minusMenu,
        }}
      >
        {children}
      </BasketContext.Provider>
    );
  };
  
  export const useSession = () => useContext(BasketContext);