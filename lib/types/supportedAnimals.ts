import { Cat, Dog } from "lucide-react";
import { Animal } from "./index";
import { categoryIcons } from "@/lib/types/categoryIcons";

export const supportedAnimals: Animal[] = [
  {
    name: "Cat",
    icon: Cat,
    description: "Domestic and wild cats",
    category: "domestic",
  },
  {
    name: "Dog",
    icon: Dog, 
    description: "Various dog breeds",
    category: "domestic",
  },
  {
    name: "Tiger",
    icon: categoryIcons.wild,
    description: "Tigers and big cats",
    category: "wild",
  },
  {
    name: "Goose",
    icon: categoryIcons.birds,
    description: "Waterfowl and geese",
    category: "birds",
  },
  {
    name: "Squid",
    icon: categoryIcons.marine,
    description: "Sea creatures",
    category: "marine",
  },
  {
    name: "Iguana",
    icon: categoryIcons.reptiles,
    description: "Reptiles and lizards",
    category: "reptiles",
  },
  {
    name: "Panda",
    icon: categoryIcons.wild,
    description: "Giant pandas",
    category: "wild",
  },
  {
    name: "Spider",
    icon: categoryIcons.insects,
    description: "Spiders and arachnids",
    category: "insects",
  },
  {
    name: "Fox",
    icon: categoryIcons.wild,
    description: "Foxes and wild dogs",
    category: "wild",
  },
  {
    name: "Wolf",
    icon: categoryIcons.wild,
    description: "Wild wolves and dogs",
    category: "wild",
  },
  {
    name: "Snake",
    icon: categoryIcons.reptiles,
    description: "Reptiles and snakes",
    category: "reptiles",
  },
  {
    name: "Eagle",
    icon: categoryIcons.birds,
    description: "Eagles and large birds of prey",
    category: "birds",
  },
  {
    name: "Bee",
    icon: categoryIcons.insects,
    description: "Bees and insects",
    category: "insects",
  },
  {
    name: "Whale",
    icon: categoryIcons.marine,
    description: "Whales and marine mammals",
    category: "marine",
  },
  {
    name: "Crocodile",
    icon: categoryIcons.reptiles,
    description: "Crocodiles and reptiles",
    category: "reptiles",
  },
  {
    name: "Butterfly",
    icon: categoryIcons.insects,
    description: "Butterflies and insects",
    category: "insects",
  },
  {
    name: "Duck",
    icon: categoryIcons.birds,
    description: "Ducks and waterfowl",
    category: "birds",
  },
  {
    name: "Giraffe",
    icon: categoryIcons.wild,
    description: "Giraffes and herbivores",
    category: "wild",
  },
  {
    name: "Crab",
    icon: categoryIcons.marine,
    description: "Crabs and marine life",
    category: "marine",
  },
  {
    name: "Leopard",
    icon: categoryIcons.wild,
    description: "Leopards and big cats",
    category: "wild",
  },
  {
    name: "Antelope",
    icon: categoryIcons.wild,
    description: "Antelopes and wild grazers",
    category: "wild",
  },
  {
    name: "Hedgehog",
    icon: categoryIcons.wild,
    description: "Hedgehogs and small mammals",
    category: "wild",
  },
  {
    name: "Peacock",
    icon: categoryIcons.birds,
    description: "Peacocks and large birds",
    category: "birds",
  },
];
