"use client";

import { PredictionResult } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PredictionDisplayProps {
  prediction?: PredictionResult;
  isProcessing: boolean;
  error?: string;
}

export function PredictionDisplay({ prediction, isProcessing, error }: PredictionDisplayProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-destructive/10 border-destructive/20">
          <p className="text-destructive font-medium">{error}</p>
        </Card>
      </motion.div>
    );
  }

  if (isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <p className="font-medium">Analyzing your image...</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!prediction) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 backdrop-blur-sm bg-white/5">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Analysis Results</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Detected Animal:</span>
              <span className="font-medium text-lg">{prediction.animal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Confidence:</span>
              <div className="flex items-center">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.confidence * 100}%` }}
                  className="h-2 bg-primary rounded-full"
                  transition={{ duration: 0.5 }}
                />
                <span className="ml-2 font-medium">
                  {(prediction.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}