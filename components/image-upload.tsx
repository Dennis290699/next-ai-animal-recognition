"use client";

import { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, ImagePlus } from "lucide-react";
import { PredictionDisplay } from "@/components/prediction-display";
import { ImageProcessor } from "@/lib/services/imageProcessor";
import { ImageState } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

// Memoizar las URLs de las imágenes de muestra
const sampleImages = [
  "https://images.unsplash.com/photo-1474314170901-f351b68f544f", // Cat
  "https://images.unsplash.com/photo-1517849845537-4d257902454a", // Dog
  "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f"  // Tiger
].map(url => `${url}?auto=format&fit=crop&w=800&q=80`);

export function ImageUpload() {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: null,
    isProcessing: false
  });

  const processImage = useCallback(async (file: File) => {
    setImageState(prev => ({ ...prev, isProcessing: true, error: undefined }));
    
    try {
      const imageProcessor = ImageProcessor.getInstance();
      
      const img = new Image(); 
      img.src = URL.createObjectURL(file);
      await new Promise(resolve => img.onload = resolve);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      const prediction = await imageProcessor.predict(imageData);
      
      setImageState(prev => ({
        ...prev,
        prediction,
        isProcessing: false
      }));
    } catch (error) {
      setImageState(prev => ({
        ...prev,
        error: "Failed to process image",
        isProcessing: false
      }));
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageState({
        file,
        preview: imageUrl,
        isProcessing: false
      });
      processImage(file);
    }
  }, [processImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  const dropzoneProps = useMemo(() => ({
    ...getRootProps(),
    style: {
      ...getRootProps().style,
      border: isDragActive ? '2px dashed #007bff' : '2px dashed #ced4da',
      backgroundColor: isDragActive ? '#f8f9fa26' : 'transparent',
    },
  }), [getRootProps, isDragActive]);

  // Memoizar componentes que no necesitan actualizarse frecuentemente
  const dropzoneContent = useMemo(() => (
    <div className="text-center space-y-6">
      <motion.div
        animate={{ 
          y: isDragActive ? -10 : 0,
          scale: isDragActive ? 1.1 : 1
        }}
        transition={{ type: "spring" }}
      >
        <Upload className="w-16 h-16 mx-auto text-primary" />
      </motion.div>
      <div>
        <p className="text-xl font-medium">Drop your image here, or click to select</p>
        <p className="text-sm text-muted-foreground mt-2">Supports PNG and JPG images</p>
      </div>
    </div>
  ), [isDragActive]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-12"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div
          {...dropzoneProps}
          className={`
            rounded-xl p-12 transition-all duration-300
            backdrop-blur-sm bg-white/5
            hover:border-primary hover:bg-primary/5 cursor-pointer
            shadow-lg hover:shadow-xl
          `}
        >
          <input {...getInputProps()} />
          {dropzoneContent}
        </div>

        <AnimatePresence mode="wait">
          {imageState.preview ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative rounded-xl overflow-hidden bg-black/5 shadow-lg aspect-video"
            >
              <img src={imageState.preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative rounded-xl overflow-hidden bg-black/5 shadow-lg flex items-center justify-center aspect-video"
            >
              <div className="text-center space-y-4">
                <ImagePlus className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">Your image preview will appear here</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {imageState.preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PredictionDisplay
            prediction={imageState.prediction}
            isProcessing={imageState.isProcessing}
            error={imageState.error}
          />
        </motion.div>
      )}

      <div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-medium mb-6"
        >
          Sample Images
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleImages.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                fetch(url)
                  .then(res => res.blob())
                  .then(blob => {
                    const file = new File([blob], "sample.jpg", { type: "image/jpeg" });
                    setImageState({
                      file,
                      preview: url,
                      isProcessing: false
                    });
                    processImage(file);
                  });
              }}
            >
              <img src={url} alt={`Sample ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <ImageIcon className="w-6 h-6 text-white" />
                <span className="text-white ml-2 font-medium">Try this image</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
