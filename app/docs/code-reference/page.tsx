'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ListChecks, Book, Cog, Database, Puzzle, Check, Brackets, ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CodeBlock } from '@/components/code-block'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useActiveSection } from "@/hooks/useActiveSection"

const sections = [
    { id: 'Listar-Clases', title: 'Listar todas las clases disponibles', icon: ListChecks },
    { id: 'Preparar-Datos', title: 'Configuraciones iniciales y preparacion de datos', icon: Database },
    { id: 'Preparar-Modelo', title: 'Configuracion del modelo', icon: Cog },
    { id: 'Entrenar-Modelo', title: 'Entrenamiento del modelo', icon: Puzzle },
    { id: 'Evaluar-Modelo', title: 'Evaluar el modelo entrenado', icon: Check },
    { id: 'Matriz-Confusion', title: 'Matriz de confusion', icon: Brackets },
    // Añade más secciones según sea necesario
]

export default function CodeReferencePage() {
    const { theme } = useTheme()
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
    const { activeSection, scrollToSection } = useActiveSection(sections.map((section) => section.id))

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/docs" className="flex items-center text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Documentación
                    </Link>
                </Button>
                <motion.h1
                    className="text-4xl font-bold mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Code Reference
                </motion.h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <motion.nav
                    className="lg:w-1/4 border-r border-gray-300 pr-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="sticky top-8">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <Book className="mr-2" />
                            Índice
                        </h2>
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <button
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${activeSection === section.id
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-primary hover:text-primary-foreground"
                                            }`}
                                        aria-current={activeSection === section.id ? "true" : "false"}
                                    >
                                        <section.icon className="mr-2 h-5 w-5" />
                                        <span>{section.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.nav>

                <motion.div
                    className="lg:w-3/4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-semibold mb-6">Documentación detallada de nuestro código de entrenamiento IA</h2>
                    <p className="mb-8 text-lg">Esta sección proporciona una referencia detallada de las funciones y clases principales utilizadas en nuestro código de entrenamiento de IA.</p>

                    <section ref={(el) => { sectionRefs.current['Listar-Clases'] = el; }} id="Listar-Clases" className="mb-12 scroll-mt-20">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <ListChecks className="mr-2" />
                            Listar todas las clases disponibles
                        </h3>
                        <CodeBlock
                            language="python"
                            code={`class IAModel:
import os

base_dir = '/kaggle/input/image-classification-64-classes-animal/image'
available_classes = os.listdir(base_dir)

print("Clases disponibles en el dataset:")
for i, class_name in enumerate(available_classes, 1):
    print(f"{i}. {class_name}")
`}
                            output="Clases disponibles en el dataset:
1. spider
2. fox
3. wolf
4. hedgehog
5. cheetah
6. snake
7. antelope
8. eagle
9. chimpanzee
10. bison
11. penguin
12. butterfly
13. mongoose
14. otter
15. grasshopper
16. raccoon
17. blackbird
18. dog
19. ferret
20. donkey
21. hippopotamus
22. bear
23. bee
24. owl
25. koala
26. buffalo
27. squid
28. hawk
29. falcon
30. lemur
31. whale
32. lizard
33. porcupine
34. kangaroo
35. gorilla
36. beaver
37. ostrich
38. frog
39. elephant
40. sheep
41. snail
42. seal
43. cow
44. panda
45. lynx
46. duck
47. mole
48. jaguar
49. chinchilla
50. goose
51. goat
52. flamingo
53. giraffe
54. crab
55. iguana
56. dolphin
57. camel
58. leopard
59. crocodile
60. hyena
61. cat
62. deer
63. walrus
64. peacock"
                        />
                    </section>

                    <section ref={(el) => { sectionRefs.current['Preparar-Datos'] = el; }} id="Preparar-Datos" className="mb-12 scroll-mt-20">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Database className="mr-2" />
                            Configuraciones iniciales y preparacion de datos
                        </h3>
                        <CodeBlock
                            language="python"
                            code={`
import os
import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report, ConfusionMatrixDisplay
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import models, layers
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from sklearn.model_selection import train_test_split
import datetime
import matplotlib.pyplot as plt

base_dir = '/kaggle/input/image-classification-64-classes-animal/image'
selected_classes = ['chinchilla', 'lizard', 'cat', 'panda', 'cow', 'dog']
print(f"Clases seleccionadas: {selected_classes}")

num_classes = len(selected_classes)
image_paths = []
labels = []

for class_name in selected_classes:
    class_dir = os.path.join(base_dir, class_name)
    for image_name in os.listdir(class_dir):
        image_paths.append(os.path.join(class_dir, image_name))
        labels.append(class_name)

df = pd.DataFrame({'image_path': image_paths, 'label': labels})

train_df, test_df = train_test_split(df, test_size=0.2, stratify=df['label'], random_state=42)
train_df, val_df = train_test_split(train_df, test_size=0.2, stratify=train_df['label'], random_state=42)

train_df = train_df.reset_index(drop=True)
val_df = val_df.reset_index(drop=True)
test_df = test_df.reset_index(drop=True)

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

val_test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_dataframe(
    train_df,
    x_col='image_path',
    y_col='label',
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=True
)

val_generator = val_test_datagen.flow_from_dataframe(
    val_df,
    x_col='image_path',
    y_col='label',
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)

test_generator = val_test_datagen.flow_from_dataframe(
    test_df,
    x_col='image_path',
    y_col='label',
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)
`}
                            output="
Clases seleccionadas: ['chinchilla', 'lizard', 'cat', 'panda', 'cow', 'dog']
Found 1120 validated image filenames belonging to 6 classes.
Found 281 validated image filenames belonging to 6 classes.
Found 351 validated image filenames belonging to 6 classes."
                        />
                    </section>

                    <section ref={(el) => { sectionRefs.current['Preparar-Modelo'] = el; }} id="Preparar-Modelo" className="mb-12 scroll-mt-20">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Cog className="mr-2" />
                            Configuracion del modelo
                        </h3>
                        <CodeBlock
                            language="python"
                            code={`
from tensorflow.keras import layers, models, Input

model = models.Sequential([
    Input(shape=(224, 224, 3)),
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(num_classes, activation='softmax')
])

print("Modelo construido correctamente. Resumen del modelo:")
model.summary()

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

print("Modelo compilado correctamente.")

`}
                            output="
Modelo construido correctamente. Resumen del modelo:
 Total params: 2,490,374 (9.50 MB)
 Trainable params: 2,490,374 (9.50 MB)
 Non-trainable params: 0 (0.00 B)
Modelo compilado correctamente.
"
                        />
                    </section>

                    <section ref={(el) => { sectionRefs.current['Entrenar-Modelo'] = el; }} id="Entrenar-Modelo" className="mb-12 scroll-mt-20">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Puzzle className="mr-2" />
                            Entrenamiento del modelo
                        </h3>
                        <CodeBlock
                            language="python"
                            code={`
import os
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from datetime import datetime
import tensorflow as tf

PROJECT_FOLDER = '/kaggle/working/Modelo_Checkpoints'
CHECKPOINT_FOLDER = os.path.join(PROJECT_FOLDER, 'checkpoints')
FINAL_MODEL_FOLDER = os.path.join(PROJECT_FOLDER, 'final_model')
TENSORBOARD_LOGS = '/kaggle/working/tensorboard_logs'

os.makedirs(CHECKPOINT_FOLDER, exist_ok=True)
os.makedirs(FINAL_MODEL_FOLDER, exist_ok=True)
os.makedirs(TENSORBOARD_LOGS, exist_ok=True)

checkpoint_callback = ModelCheckpoint(
    filepath=os.path.join(CHECKPOINT_FOLDER, 'best_model_val_loss_{val_loss:.4f}.keras'),
    monitor='val_loss',
    save_best_only=True,
    save_weights_only=False,
    mode='min',
    verbose=1
)

log_dir = os.path.join(TENSORBOARD_LOGS, datetime.now().strftime("%Y%m%d-%H%M%S"))
tensorboard_callback = TensorBoard(log_dir=log_dir, histogram_freq=1)

checkpoint_path = os.path.join(CHECKPOINT_FOLDER, 'best_model_val_loss_0.1234.keras')
if os.path.exists(checkpoint_path):
    print(f"Cargando el modelo desde el checkpoint: {checkpoint_path}")
    model = tf.keras.models.load_model(checkpoint_path)
else:
    print("No se encontró un modelo guardado, creando uno nuevo.")

history = model.fit(
    train_generator,
    steps_per_epoch=len(train_df) // BATCH_SIZE,
    epochs=30,
    validation_data=val_generator,
    validation_steps=len(val_df) // BATCH_SIZE,
    initial_epoch=history.epoch[-1] if 'history' in locals() else 0,
    callbacks=[checkpoint_callback, tensorboard_callback]
)

h5_model_path = os.path.join(FINAL_MODEL_FOLDER, 'final_model.h5')
model.save(h5_model_path)
print(f"Modelo guardado en formato .h5: {h5_model_path}")

keras_model_path = os.path.join(FINAL_MODEL_FOLDER, 'final_model.keras')
model.save(keras_model_path)
print(f"Modelo guardado en formato SavedModel (.keras): {keras_model_path}")
`}
                            output="
No se encontró un modelo guardado, creando uno nuevo.
Epoch 1/30
/usr/local/lib/python3.10/dist-packages/keras/src/trainers/data_adapters/py_dataset_adapter.py:122: UserWarning: Your `PyDataset` class should call `super().__init__(**kwargs)` in its constructor. `**kwargs` can include `workers`, `use_multiprocessing`, `max_queue_size`. Do not pass these arguments to `fit()`, as they will be ignored.
  self._warn_if_super_not_called()
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.2189 - loss: 1.7857
/usr/local/lib/python3.10/dist-packages/keras/src/trainers/data_adapters/py_dataset_adapter.py:122: UserWarning: Your `PyDataset` class should call `super().__init__(**kwargs)` in its constructor. `**kwargs` can include `workers`, `use_multiprocessing`, `max_queue_size`. Do not pass these arguments to `fit()`, as they will be ignored.
  self._warn_if_super_not_called()
Epoch 1: val_loss improved from inf to 1.62801, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_1.6280.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 91s 2s/step - accuracy: 0.2195 - loss: 1.7850 - val_accuracy: 0.3438 - val_loss: 1.6280
Epoch 2/30
/usr/lib/python3.10/contextlib.py:153: UserWarning: Your input ran out of data; interrupting training. Make sure that your dataset or generator can generate at least `steps_per_epoch * epochs` batches. You may need to use the `.repeat()` function when building your dataset.
  self.gen.throw(typ, value, traceback)
Epoch 2: val_loss improved from 1.62801 to 1.60468, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_1.6047.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 29ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.3600 - val_loss: 1.6047
Epoch 3/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.3495 - loss: 1.5518
Epoch 3: val_loss improved from 1.60468 to 0.92347, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.9235.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.3506 - loss: 1.5494 - val_accuracy: 0.5898 - val_loss: 0.9235
Epoch 4/30

Epoch 4: val_loss improved from 0.92347 to 0.57062, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.5706.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 32ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8000 - val_loss: 0.5706
Epoch 5/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.5518 - loss: 1.0857
Epoch 5: val_loss did not improve from 0.57062
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.5532 - loss: 1.0838 - val_accuracy: 0.7656 - val_loss: 0.6173
Epoch 6/30

Epoch 6: val_loss improved from 0.57062 to 0.44398, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.4440.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 30ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8000 - val_loss: 0.4440
Epoch 7/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.6765 - loss: 0.8944
Epoch 7: val_loss improved from 0.44398 to 0.24091, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.2409.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.6777 - loss: 0.8921 - val_accuracy: 0.9297 - val_loss: 0.2409
Epoch 8/30

Epoch 8: val_loss improved from 0.24091 to 0.21918, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.2192.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 29ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8400 - val_loss: 0.2192
Epoch 9/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.7689 - loss: 0.6449
Epoch 9: val_loss did not improve from 0.21918
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.7689 - loss: 0.6451 - val_accuracy: 0.8906 - val_loss: 0.3582
Epoch 10/30

Epoch 10: val_loss improved from 0.21918 to 0.19527, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.1953.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 4s 113ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.9200 - val_loss: 0.1953
Epoch 11/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8235 - loss: 0.5360
Epoch 11: val_loss did not improve from 0.19527
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.8228 - loss: 0.5380 - val_accuracy: 0.9414 - val_loss: 0.2302
Epoch 12/30

Epoch 12: val_loss did not improve from 0.19527
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 26ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8800 - val_loss: 0.2399
Epoch 13/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8217 - loss: 0.5549
Epoch 13: val_loss improved from 0.19527 to 0.12132, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.1213.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 81s 2s/step - accuracy: 0.8222 - loss: 0.5534 - val_accuracy: 0.9609 - val_loss: 0.1213
Epoch 14/30

Epoch 14: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 25ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8800 - val_loss: 0.1931
Epoch 15/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8684 - loss: 0.4076
Epoch 15: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.8685 - loss: 0.4073 - val_accuracy: 0.9453 - val_loss: 0.1669
Epoch 16/30

Epoch 16: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 26ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8400 - val_loss: 0.3487
Epoch 17/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8766 - loss: 0.3836
Epoch 17: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.8762 - loss: 0.3844 - val_accuracy: 0.8867 - val_loss: 0.3512
Epoch 18/30

Epoch 18: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 27ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8800 - val_loss: 0.3324
Epoch 19/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8747 - loss: 0.3867
Epoch 19: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.8748 - loss: 0.3861 - val_accuracy: 0.8789 - val_loss: 0.4785
Epoch 20/30

Epoch 20: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 26ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.7600 - val_loss: 0.6188
Epoch 21/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.9050 - loss: 0.3612
Epoch 21: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.9050 - loss: 0.3608 - val_accuracy: 0.9648 - val_loss: 0.1487
Epoch 22/30

Epoch 22: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 26ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.9600 - val_loss: 0.1276
Epoch 23/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8715 - loss: 0.3862
Epoch 23: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.8718 - loss: 0.3850 - val_accuracy: 0.9062 - val_loss: 0.2886
Epoch 24/30

Epoch 24: val_loss did not improve from 0.12132
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 26ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8800 - val_loss: 0.3987
Epoch 25/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.8837 - loss: 0.3429
Epoch 25: val_loss improved from 0.12132 to 0.10703, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.1070.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.8840 - loss: 0.3422 - val_accuracy: 0.9648 - val_loss: 0.1070
Epoch 26/30

Epoch 26: val_loss did not improve from 0.10703
35/35 ━━━━━━━━━━━━━━━━━━━━ 3s 96ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.8800 - val_loss: 0.2123
Epoch 27/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.9148 - loss: 0.2344
Epoch 27: val_loss improved from 0.10703 to 0.07147, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.0715.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.9149 - loss: 0.2343 - val_accuracy: 0.9727 - val_loss: 0.0715
Epoch 28/30

Epoch 28: val_loss did not improve from 0.07147
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 27ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.9600 - val_loss: 0.1198
Epoch 29/30
35/35 ━━━━━━━━━━━━━━━━━━━━ 0s 2s/step - accuracy: 0.9146 - loss: 0.2740
Epoch 29: val_loss did not improve from 0.07147
35/35 ━━━━━━━━━━━━━━━━━━━━ 82s 2s/step - accuracy: 0.9146 - loss: 0.2739 - val_accuracy: 0.9727 - val_loss: 0.0987
Epoch 30/30

Epoch 30: val_loss improved from 0.07147 to 0.05157, saving model to /kaggle/working/Modelo_Checkpoints/checkpoints/best_model_val_loss_0.0516.keras
35/35 ━━━━━━━━━━━━━━━━━━━━ 1s 29ms/step - accuracy: 0.0000e+00 - loss: 0.0000e+00 - val_accuracy: 0.9600 - val_loss: 0.0516

=== Guardando el modelo en múltiples formatos ===

Modelo guardado en formato .h5: /kaggle/working/Modelo_Checkpoints/final_model/final_model.h5
Modelo guardado en formato SavedModel (.keras): /kaggle/working/Modelo_Checkpoints/final_model/final_model.keras
"
                        />
                    </section>

                    <section ref={(el) => { sectionRefs.current['Evaluar-Modelo'] = el; }} id="Evaluar-Modelo" className="mb-12 scroll-mt-20">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Check className="mr-2" />
                            Evaluar el modelo entrenado
                        </h3>
                        <CodeBlock
                            language="python"
                            code={`
test_loss, test_accuracy = model.evaluate(
    test_generator,
    steps=len(test_generator),
    verbose=1
)

print("\n=== Resultados del Conjunto de Prueba ===")
print(f"Pérdida en prueba (Test Loss): {test_loss:.4f}")
print(f"Precisión en prueba (Test Accuracy): {test_accuracy:.4f}")
`}
                            output="
11/11 ━━━━━━━━━━━━━━━━━━━━ 10s 904ms/step - accuracy: 0.9252 - loss: 0.2171

=== Resultados del Conjunto de Prueba ===
Pérdida en prueba (Test Loss): 0.1882
Precisión en prueba (Test Accuracy): 0.9316
"
                        />
                    </section>

                    <section ref={(el) => { sectionRefs.current['Matriz-Confusion'] = el; }} id="Matriz-Confusion" className="mb-12 scroll-mt-20">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center">
                            <Brackets className="mr-2" />
                            Matriz de Confusión
                        </h3>
                        <CodeBlock
                            language="python"
                            code={`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report, precision_score, recall_score, f1_score
from tensorflow.summary import create_file_writer
from sklearn.metrics import ConfusionMatrixDisplay
import os
import tensorflow as tf

# --- PREDICCIONES Y ETIQUETAS ---
predictions = np.argmax(model.predict(test_generator), axis=1)
true_labels = test_generator.classes
class_labels = list(test_generator.class_indices.keys())

# --- MATRIZ DE CONFUSIÓN ---
cm = confusion_matrix(true_labels, predictions)
plt.figure(figsize=(10, 8))
ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=class_labels).plot(cmap=plt.cm.Blues, colorbar=True)
plt.xticks(rotation=45)
plt.title("Matriz de Confusión")
plt.show()

# --- MÉTRICAS ADICIONALES ---
precision = precision_score(true_labels, predictions, average=None)
recall = recall_score(true_labels, predictions, average=None)
f1 = f1_score(true_labels, predictions, average=None)

print("\n=== Métricas Generales ===")
print(f"Precisión por clase: {dict(zip(class_labels, precision))}")
print(f"Recall por clase: {dict(zip(class_labels, recall))}")
print(f"F1-score por clase: {dict(zip(class_labels, f1))}")

print("\n=== Reporte de Clasificación ===")
print(classification_report(true_labels, predictions, target_names=class_labels))

# --- REGISTRAR MATRIZ DE CONFUSIÓN Y MÉTRICAS EN TENSORBOARD ---
log_dir_cm = os.path.join(TENSORBOARD_LOGS, "confusion_matrix_logs")
file_writer_cm = create_file_writer(log_dir_cm)

def plot_to_image(fig):
    from io import BytesIO
    buf = BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    image = tf.image.decode_png(buf.getvalue(), channels=4)
    return tf.expand_dims(image, 0)

def log_confusion_matrix(epoch, logs):
    fig, ax = plt.subplots(figsize=(10, 8))
    ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=class_labels).plot(cmap=plt.cm.Blues, ax=ax)
    plt.title("Matriz de Confusión")
    cm_image = plot_to_image(fig)
    with file_writer_cm.as_default():
        tf.summary.image("Matriz de Confusión", cm_image, step=epoch)

with file_writer_cm.as_default():
    for i, label in enumerate(class_labels):
        tf.summary.scalar(f"Precisión/{label}", precision[i], step=0)
        tf.summary.scalar(f"Recall/{label}", recall[i], step=0)
        tf.summary.scalar(f"F1-score/{label}", f1[i], step=0)

print(f"Registros de la matriz de confusión y métricas guardados en: {log_dir_cm}")
`}
                            output="
11/11 ━━━━━━━━━━━━━━━━━━━━ 9s 778ms/step
<Figure size 1000x800 with 0 Axes>


=== Métricas Generales ===
Precisión por clase: {'cat': 0.9859154929577465, 'chinchilla': 0.7818181818181819, 'cow': 0.8775510204081632, 'dog': 0.9662921348314607, 'lizard': 1.0, 'panda': 0.9545454545454546}
Recall por clase: {'cat': 0.8045977011494253, 'chinchilla': 1.0, 'cow': 1.0, 'dog': 0.9347826086956522, 'lizard': 1.0, 'panda': 0.9767441860465116}
F1-score por clase: {'cat': 0.8860759493670887, 'chinchilla': 0.8775510204081634, 'cow': 0.9347826086956522, 'dog': 0.9502762430939227, 'lizard': 1.0, 'panda': 0.9655172413793104}

Registros de la matriz de confusión y métricas guardados en: /kaggle/working/tensorboard_logs/confusion_matrix_logs
"
                            imageUrl="/Assets/console-out/matrix-confuse.png"
                        />
                    </section>
                </motion.div>
            </div>
            <ScrollToTopButton />
        </div>
    )
}
