"use client";

import { motion } from "framer-motion";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { categoryIcons } from "@/lib/types/categoryIcons";
import { supportedAnimals } from "@/lib/types/supportedAnimals";
import { AnimalCategory } from "@/lib/types/index";

interface SupportedAnimalsListProps {
  searchQuery: string;
  category: AnimalCategory | "all";
}

export function SupportedAnimalsList({
  searchQuery,
  category,
}: SupportedAnimalsListProps) {
  // Filtrar animales según búsqueda y categoría
  const filteredAnimals = supportedAnimals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || animal.category === category;
    return matchesSearch && matchesCategory;
  });

  // Renderizar mensaje si no hay resultados
  if (filteredAnimals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <p>No se encontraron animales que coincidan con sus criterios.</p>
        <p className="text-sm">Intente ajustar su filtro de búsqueda o categoría.</p>
      </div>
    );
  }

  // Renderizar lista de animales
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredAnimals.map((animal, index) => {
        const Icon = animal.icon || categoryIcons[animal.category];
        return (
          <HoverCard key={animal.name}>
            <HoverCardTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card/50 hover:bg-accent cursor-pointer transition-colors duration-300"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <span className="font-medium text-primary">{animal.name}</span>
              </motion.div>
            </HoverCardTrigger>
          </HoverCard>
        );
      })}
    </div>
  );
}
