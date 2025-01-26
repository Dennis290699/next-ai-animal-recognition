import { Cat, Dog } from "lucide-react";
import { Animal } from "./index";
import { categoryIcons } from "@/lib/types/categoryIcons";

export const supportedAnimals: Animal[] = [
  {
    name: "Gato", // Traducción de "Cat"
    icon: Cat,
    description: "Gatos domésticos y salvajes",
    category: "domestic",
  },
  {
    name: "Perro", // Traducción de "Dog"
    icon: Dog, 
    description: "Diversas razas de perros",
    category: "domestic",
  },
  {
    name: "Chinchilla", // Añadido como ejemplo de especie
    icon: categoryIcons.wild, 
    description: "Chinchillas y pequeños roedores",
    category: "domestic",
  },
  {
    name: "Vaca", // Traducción de "Cow"
    icon: categoryIcons.wild,
    description: "Vacas y animales de granja",
    category: "domestic",
  },
  {
    name: "Lagarto", // Traducción de "Lizard"
    icon: categoryIcons.reptiles,
    description: "Reptiles y lagartos",
    category: "reptiles",
  },
  {
    name: "Panda", // Traducción de "Panda"
    icon: categoryIcons.wild,
    description: "Pandas gigantes",
    category: "wild",
  }
];
