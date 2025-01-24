"use client";

import { useState } from "react";
import { Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SupportedAnimalsList } from "./SupportedAnimalsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "all", name: "All Animals" },
  { id: "domestic", name: "Domestic" },
  { id: "wild", name: "Wild" },
  { id: "birds", name: "Birds" },
  { id: "reptiles", name: "Reptiles" },
  { id: "marine", name: "Marine" },
  { id: "insects", name: "Insects" },
];

export function SupportedAnimalsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Info className="h-4 w-4" />
          View Supported Animals
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[760px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Supported Animals</DialogTitle>
          <DialogDescription>
            Our AI model can recognize these animals. For best results, use clear, well-lit images.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 flex-1 overflow-hidden">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search animals..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="flex-1 overflow-hidden" onValueChange={setActiveCategory}>
            <TabsList className="w-full justify-start overflow-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="min-w-[100px]">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="overflow-y-auto flex-1 mt-4 max-h-[calc(90vh-200px)]">
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="m-0">
                  <SupportedAnimalsList
                    searchQuery={searchQuery}
                    category={activeCategory as "all" | "domestic" | "wild" | "birds" | "reptiles" | "marine" | "insects"}
                  />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
