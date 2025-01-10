export interface PredictionResult {
  animal: string;
  confidence: number;
}

export interface ImageState {
  file: File | null;
  preview: string | null;
  prediction?: PredictionResult;
  isProcessing: boolean;
  error?: string;
}