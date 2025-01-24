import { Bone as Domestic, Tent as Wild, Bird, Fish as Marine, Biohazard as Lizard, Bug as insects } from "lucide-react";
import { AnimalCategory } from "./index";

export const categoryIcons: Record<AnimalCategory, typeof Domestic> = {
  domestic: Domestic,
  wild: Wild,
  birds: Bird,
  marine: Marine,
  reptiles: Lizard,
  insects: insects,
};
