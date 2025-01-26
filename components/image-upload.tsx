"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, ImageIcon, ImagePlus } from "lucide-react"
import { PredictionDisplay } from "@/components/prediction-display"
import { ImageProcessor } from "@/lib/services/imageProcessor"
import type { ImageState } from "@/lib/types"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Usar imágenes locales desde el directorio public
const sampleImages = [
  "/Assets/samples/cat.png",
  "/Assets/samples/chinchilla.jpeg",
  "/Assets/samples/lizard.png",
  "/Assets/samples/panda.jpg",
  "/Assets/samples/dog.jpg",
  "/Assets/samples/cow.jpg",
]

export function ImageUpload() {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: null,
    isProcessing: false,
    logs: [],
  })

  const processImage = useCallback(async (file: File) => {
    setImageState((prev) => ({ ...prev, isProcessing: true, error: undefined, logs: [] }))
    const logs: string[] = []

    try {
      const imageProcessor = ImageProcessor.getInstance()
      logs.push("Initializing image processor...")
      await imageProcessor.loadModel()
      logs.push("Model loaded successfully")

      const img = document.createElement("img")
      img.src = URL.createObjectURL(file)

      img.onload = async () => {
        logs.push(`Processing image of size: ${img.width}x${img.height}`)
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        logs.push("Image prepared for analysis")

        const prediction = await imageProcessor.predict(imageData)
        logs.push(
          `Analysis complete - Detected: ${prediction.animal} (${(prediction.confidence * 100).toFixed(1)}% confidence)`,
        )

        setImageState((prev) => ({
          ...prev,
          prediction,
          isProcessing: false,
          logs,
        }))
      }
    } catch (error: any) {
      console.error("Error in processImage:", error)
      logs.push(`Error: ${error.message}`)
      setImageState((prev) => ({
        ...prev,
        error: error.message || "Failed to process image",
        isProcessing: false,
        logs,
      }))
    }
  }, [])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setImageState({
          file,
          preview: imageUrl,
          isProcessing: false,
          logs: [],
        })
        processImage(file)
      }
    },
    [processImage],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  })

  const dropzoneContent = useMemo(
    () => (
      <div className="text-center space-y-6">
        <motion.div
          animate={{
            y: isDragActive ? -10 : 0,
            scale: isDragActive ? 1.1 : 1,
          }}
          transition={{ type: "spring" }}
        >
          <Upload className="w-16 h-16 mx-auto text-primary" />
        </motion.div>
        <div>
          <p className="text-xl font-medium">Arrastre su imagen aqui, o click para subir</p>
          <p className="text-sm text-muted-foreground mt-2">Soporta archivos PNG y JPG</p>
        </div>
      </div>
    ),
    [isDragActive],
  )

  const handleSampleImageClick = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath)
      const blob = await response.blob()
      const file = new File([blob], imagePath.split("/").pop() || "sample.jpg", { type: "image/jpeg" })
      setImageState({
        file,
        preview: imagePath,
        isProcessing: false,
        logs: [],
      })
      await processImage(file)

      // Scroll con ajuste de desplazamiento
      if (predictionRef.current) {
        const offset = -470 // Ajusta este valor según lo que necesites
        const topPosition = predictionRef.current.getBoundingClientRect().top + window.scrollY + offset

        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        })
      }
    } catch (error) {
      console.error("Error loading sample image:", error)
    }
  }

  const predictionRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-12"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...getRootProps({ refKey: "ref" })}
          className={`
            border-2 border-dashed rounded-xl p-12 transition-all duration-300
            backdrop-blur-sm bg-white/5
            ${isDragActive ? "border-primary bg-primary/5" : "border-border"}
            hover:border-primary hover:bg-primary/5 cursor-pointer
            shadow-lg hover:shadow-xl
          `}
        >
          <input {...getInputProps()} />
          {dropzoneContent}
        </motion.div>

        <AnimatePresence mode="wait">
          {imageState.preview ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative rounded-xl overflow-hidden bg-black/5 shadow-lg aspect-video"
            >
              <Image
                src={imageState.preview || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
                <p className="text-muted-foreground">La vista previa de su imagen aparecerá aquí.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {imageState.preview && (
        <motion.div ref={predictionRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <PredictionDisplay
            prediction={imageState.prediction}
            isProcessing={imageState.isProcessing}
            error={imageState.error}
            logs={imageState.logs}
          />
        </motion.div>
      )}

      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Pruebe con imágenes de muestra
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleImages.map((imagePath, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleSampleImageClick(imagePath)}
            >
              <Image
                src={imagePath || "/placeholder.svg"}
                alt={`Sample ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 33vw"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <ImageIcon className="w-6 h-6 text-white" />
                <span className="text-white ml-2 font-medium">Probar esta imagen</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
