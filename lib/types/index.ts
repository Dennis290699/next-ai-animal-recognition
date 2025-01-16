export interface Candidate {
  animal: string;
  confidence: number;
}

export interface PredictionResult {
  animal: string;
  confidence: number;
  candidates: Candidate[];
}

export interface ImageState {
  file: File | null;
  preview: string | null;
  prediction?: PredictionResult;
  isProcessing: boolean;
  error?: string;
  logs?: string[];
}