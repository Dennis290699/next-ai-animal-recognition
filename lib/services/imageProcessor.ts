"use client";

import * as tf from '@tensorflow/tfjs';
import { PredictionResult } from '@/lib/types';

export class ImageProcessor {
  private static instance: ImageProcessor;
  private model: tf.LayersModel | null = null;
  private labels: string[] = ['gato', 'chinchilla', 'vaca', 'perro', 'lagarto', 'panda'];
  private isModelLoading: boolean = false;

  private constructor() {
    tf.setBackend('webgl').catch(e => {
      console.warn('WebGL no disponible, usando CPU:', e);
      tf.setBackend('cpu');
    });
  }

  static getInstance(): ImageProcessor {
    if (!ImageProcessor.instance) {
      ImageProcessor.instance = new ImageProcessor();
    }
    return ImageProcessor.instance;
  }

  async loadModel() {
    if (this.isModelLoading) {
      console.log('Modelo ya está cargando, esperando...');
      while (this.isModelLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    try {
      this.isModelLoading = true;
      console.log('Iniciando carga del modelo...');

      await tf.ready();
      console.log('TensorFlow.js está listo, backend:', tf.getBackend());

      this.model = await tf.loadLayersModel('/Model/model.json', {
        onProgress: (fraction) => {
          console.log(`Progreso de carga del modelo: ${(fraction * 100).toFixed(1)}%`);
        }
      });

      console.log('Modelo cargado exitosamente');
      this.model.summary();

      const inputShape = this.model.inputs[0].shape;
      const outputShape = this.model.outputs[0].shape;
      console.log('Forma de entrada del modelo:', inputShape);
      console.log('Forma de salida del modelo:', outputShape);

    } catch (error) {
      console.error('Error detallado al cargar el modelo:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`No se pudo cargar el modelo: ${errorMessage}`);
    } finally {
      this.isModelLoading = false;
    }
  }

  async predict(imageData: ImageData): Promise<PredictionResult> {
    try {
      if (!this.model) {
        console.log('Modelo no cargado, intentando cargar...');
        await this.loadModel();
      }
  
      console.log('Iniciando preprocesamiento de imagen');
      console.log('Dimensiones de imagen original:', imageData.width, 'x', imageData.height);
  
      const tensor = tf.tidy(() => {
        let pixels = tf.browser.fromPixels(imageData);
        console.log('Tensor inicial:', pixels.shape);
  
        pixels = tf.image.resizeBilinear(pixels, [224, 224]);
        console.log('Tensor redimensionado:', pixels.shape);
  
        const normalized = pixels.toFloat().div(255.0);
        console.log('Tensor normalizado:', normalized.shape);
  
        const batched = normalized.expandDims(0);
        console.log('Tensor final (con batch):', batched.shape);
  
        return batched;
      });
  
      console.log('Realizando predicción...');
      const predictions = await this.model!.predict(tensor) as tf.Tensor;
      const scores = await predictions.data();
      console.log('Scores obtenidos:', Array.from(scores));
  
      const candidates = Array.from(scores).map((score, index) => ({
        animal: this.labels[index],
        confidence: score
      })).sort((a, b) => b.confidence - a.confidence);
  
      const topPrediction = candidates[0];
  
      tensor.dispose();
      predictions.dispose();
  
      return {
        animal: topPrediction.animal,
        confidence: topPrediction.confidence,
        candidates
      };
    } catch (error: unknown) {
      // Type Guard para asegurar que 'error' es de tipo 'Error'
      if (error instanceof Error) {
        console.error('Error detallado en la predicción:', error);
        throw new Error(`Error al procesar la imagen: ${error.message}`);
      } else {
        console.error('Error desconocido en la predicción:', error);
        throw new Error('Error desconocido al procesar la imagen');
      }
    }
  }
}  
