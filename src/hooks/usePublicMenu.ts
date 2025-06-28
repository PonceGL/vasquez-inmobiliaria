import { Menu } from "@/types/menu";

export function usePublicMenu() {
  const neighborhoods: Menu[] = [
    {
      id: "pedregal-marquesa",
      label: "PEDREGAL DE LA MARQUESA",
      path: "/fraccionamiento/61dc8b002811546e832d5ec8",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
    {
      id: "la-molienda",
      label: "LA MOLIENDA",
      path: "/fraccionamiento/61ccc2f312d3c371db5d46dc",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
  ];
  const menu: Menu[] = [
    {
      id: "propiedades",
      label: "Propiedades",
      path: "/casas",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
    {
      id: "preventa",
      label: "Preventa",
      path: "/detalles/preventa",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
    {
      id: "fraccionamientos",
      label: "Fraccionamientos",
      path: "#",
      isDropdown: true,
      subMenu: neighborhoods,
      isVisible: true,
    },
    {
      id: "nosotros",
      label: "Nosotros",
      path: "/nosotros",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
    {
      id: "contactanos",
      label: "Contáctanos",
      path: "/contacto",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
    {
      id: "vende-propiedad",
      label: "Vende tu propiedad",
      path: "/vende-tu-propiedad",
      isDropdown: false,
      subMenu: [],
      isVisible: true,
    },
  ];

  return { menu };
}
