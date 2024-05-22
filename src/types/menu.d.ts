export type MenuType = {
  menuIdx: number;
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuImage: string;
  menuDate: string;
  categoryIdx: number;
};
export type BasketMenuType = {
  basketIdx: number;
  menuIdx: number;
  menuName: string;
  menuPrice: number;
  menuImage: string;
  orderDetailCount: number;
  menuTemperature?: string | null;
  menuSize?: string | null;
};

export type UpdatedMenuType = {
  menuName: string;
  menuPrice: number;
  categoryIdx: number;
};

export type BasketType = {
  totalPrice: number;
  basketList: BasketMenuType[];
};
