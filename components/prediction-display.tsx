"use client";

import { PredictionResult } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle, Check, Terminal, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface PredictionDisplayProps {
  prediction?: PredictionResult;
  isProcessing: boolean;
  error?: string;
  logs?: string[];
}

export function PredictionDisplay({ prediction, isProcessing, error, logs = [] }: PredictionDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-destructive/10 border-destructive/20 shadow-lg">
            <div className="flex items-center space-x-3 text-destructive">
              <AlertCircle className="w-6 h-6" />
              <p className="font-medium">{error}</p>
            </div>
          </Card>
        </motion.div>
      )}

      {isProcessing && (
        <motion.div
          key="processing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 shadow-lg bg-primary/5 border-primary/20">
            <div className="flex items-center space-x-3 text-primary">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="font-medium">Analizando su imagen...</p>
            </div>
          </Card>
        </motion.div>
      )}

      {prediction && (
        <motion.div
          key="prediction"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 shadow-lg backdrop-blur-sm bg-white/10 border-white/20">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Check className="w-6 h-6 text-green-500" />
                <h3 className="text-2xl font-semibold text-primary">Resultados del analisis</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Animal Detectado:</span>
                  <span className="font-medium text-xl text-primary">{prediction.animal}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Nivel de confiancia:</span>
                    <span className="font-medium text-lg text-primary">
                      {(Math.min(prediction.confidence * 100, 98.7)).toFixed(1)}%
                    </span>
                  </div>
                  <motion.div
                    className="h-3 bg-primary/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(prediction.confidence * 100, 98.7)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Terminal className="w-4 h-4 mr-2" />
                      Mostrar detalles del análisis
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        Detalles del análisis
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Top 3 Candidates Section */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          Mejores 3 candidatos
                        </h4>
                        <div className="space-y-3">
                          {prediction.candidates.slice(0, 3).map((candidate, index) => {
                            const adjustedConfidence = Math.min(candidate.confidence * 100, 98.7).toFixed(1);
                            return (
                              <motion.div
                                key={candidate.animal}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                    index === 1 ? 'bg-gray-500/20 text-gray-500' :
                                      'bg-amber-800/20 text-amber-800'
                                  }`}>
                                  #{index + 1}
                                </div>
                                <div className="flex-1 flex items-center justify-between">
                                  <span className="font-medium">{candidate.animal}</span>
                                  <span className="text-muted-foreground">{adjustedConfidence}%</span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      <Separator />

                      {/* Logs Section */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Terminal className="w-5 h-5" />
                          Registros de procesamiento
                        </h4>
                        <ScrollArea className="h-[250px] w-full rounded-md border">
                          <div className="p-4 space-y-4">
                            {logs.map((log, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-3 rounded-lg bg-muted/50 font-mono text-sm"
                              >
                                {log}
                              </motion.div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
