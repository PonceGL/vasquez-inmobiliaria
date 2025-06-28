export type Menu = {
  id: string;
  label: string;
  path: string;
  isDropdown: boolean;
  subMenu: Menu[];
  isVisible: boolean;
};
