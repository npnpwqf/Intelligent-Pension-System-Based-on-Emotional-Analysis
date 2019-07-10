from oldcare.sentimentANN.processing.simplepreprocessor import SimplePreprocessor
from oldcare.sentimentANN.simpledatasetloader import SimpleDatasetLoader
from imutils import paths
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from keras.models import Sequential
from keras.optimizers import Adam
from keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as plt

from keras.layers.core import Dense, Dropout, Activation, Flatten
from keras.layers.convolutional import Conv2D, MaxPooling2D

# 全局变量
dataset_path = '../../Collect/sentiment_images'
accuracy_plot_path = '../../plots/accuracy.png'
loss_plot_path = '../../plots/loss.png'
output_model_path = '../../models/face_expression_cnn.hdf5'

# 全局常量
TARGET_IMAGE_WIDTH = 48
TARGET_IMAGE_HEIGHT = 48
NUM_CHANNELS = 1
NUM_CLASS = 7
LR = 0.001  # 学习率
BATCH_SIZE = 64
EPOCHS = 50


def CNNModel():
    ################################################
    # 第一部分：数据预处理
    sp = SimplePreprocessor(TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT)
    sdl = SimpleDatasetLoader(preprocessors=[sp])

    # Load images
    print("[INFO] 导入图像...")
    image_paths = list(paths.list_images(dataset_path))# 数组  每张图片的路径  # path included
    (X, y) = sdl.load(image_paths, verbose=500, grayscale=True)
    # X 0：54   0：28   0：28   y 0:54  存类型

    X = X.reshape(X.shape[0], TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT, NUM_CHANNELS)
    X = X.astype("float") / 255.0  # 特
    # 征缩放，是非常重要的步骤
    # X 0：54    0：784

    le = LabelEncoder()  # 0:2  分两类
    y = to_categorical(le.fit_transform(y), 7)   # 0：54  0：2  表明属于哪一类

    # 拆分数据集  X是图片  y是类型
    (X_train, X_test, y_train, y_test) = train_test_split(X, y,
                                                          test_size=0.25,
                                                          random_state=42)
    # ###############################################3
    # 第二部分：创建并训练模型
    # 创建CNN模型
    model = Sequential()

    model.add(Conv2D(input_shape=(TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT, NUM_CHANNELS), filters=32, kernel_size=1,
                     padding="same", activation='relu'))
    model.add(Conv2D(input_shape=(TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT, 32), filters=32, kernel_size=5,
                     padding="same", activation='relu'))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=2, padding='same'))
    model.add(Conv2D(input_shape=(23, 23, 32), filters=32, kernel_size=3,
                     padding="same", activation='relu'))
    model.add(MaxPooling2D(input_shape=(23, 23, 32), pool_size=(3, 3), strides=2, padding='same'))
    model.add(Conv2D(input_shape=(11, 11, 32), filters=64, kernel_size=5,
                     padding="same", activation='relu'))
    model.add(MaxPooling2D(input_shape=(11, 11, 64), pool_size=(3, 3), strides=2, padding='same'))

    model.add(Dropout(0.5))
    model.add(Flatten())
    model.add(Dense(2048))
    model.add(Activation('relu'))

    model.add(Dropout(0.5))
    model.add(Dense(1024))
    model.add(Activation('relu'))

    model.add(Dense(NUM_CLASS))
    model.add(Activation('softmax'))

    # 训练模型
    print("[INFO] 训练模型...")
    adam = Adam(lr= LR)
    model.compile(loss="categorical_crossentropy", optimizer=adam,
                  metrics=["accuracy"])
    H = model.fit(X_train, y_train, validation_data=(X_test, y_test),
                  epochs=EPOCHS, batch_size=BATCH_SIZE, verbose=1)

    ################################################
    # 第三部分：评估模型
    # 画出accuracy曲线
    plt.style.use("ggplot")
    plt.figure()
    plt.plot(np.arange(1, EPOCHS + 1), H.history["acc"], label="train_acc")
    plt.plot(np.arange(1, EPOCHS + 1), H.history["val_acc"], label="val_acc")
    plt.title("Training Accuracy")
    plt.xlabel("Epoch #")
    plt.ylabel("Acc")
    plt.legend()
    plt.savefig(accuracy_plot_path)

    # 画出loss曲线
    plt.style.use("ggplot")
    plt.figure()
    plt.plot(np.arange(1, EPOCHS + 1), H.history["loss"], label="train_loss")
    plt.plot(np.arange(1, EPOCHS + 1), H.history["val_loss"], label="val_loss")
    plt.title("Training Loss")
    plt.xlabel("Epoch #")
    plt.ylabel("Loss")
    plt.legend()
    plt.savefig(loss_plot_path)

    # 打印分类报告
    label_names = le.classes_.tolist()
    print("[INFO] 评估模型...")
    predictions = model.predict(X_test, batch_size=BATCH_SIZE)
    print(classification_report(y_test.argmax(axis=1),
                                predictions.argmax(axis=1), target_names=label_names))

    # ###############################################
    # 第四部分：保存模型
    model.save(output_model_path)


if __name__ == '__main__':
    CNNModel()
