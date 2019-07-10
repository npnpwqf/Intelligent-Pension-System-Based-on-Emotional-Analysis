from fall.train.simplepreprocessor import SimplePreprocessor
from fall.train.simpledatasetloader import SimpleDatasetLoader
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
from keras.layers.normalization import BatchNormalization
from keras.regularizers import l2

# 全局变量
dataset_path = '../dataset'
accuracy_plot_path = 'plots/accuracy_alex3.png'
loss_plot_path = 'plots/loss_alex3.png'
output_model_path = 'models/fall_down_alex3.hdf5'

# 全局常量
TARGET_IMAGE_WIDTH = 227
TARGET_IMAGE_HEIGHT = 227
NUM_CHANNELS = 3
NUM_CLASS = 2
LR = 0.001  # 学习率
BATCH_SIZE = 64
EPOCHS = 30


def AlexModel():
    ################################################
    # 第一部分：数据预处理
    sp = SimplePreprocessor(TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT)
    sdl = SimpleDatasetLoader(preprocessors=[sp])

    # Load images
    print("[INFO] 导入图像...")
    image_paths = list(paths.list_images(dataset_path))
    (X, y) = sdl.load(image_paths, verbose=500, grayscale=False)

    X = X.reshape(X.shape[0], TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT, NUM_CHANNELS)
    X = X.astype("float") / 255.0  # 特
    # 征缩放，是非常重要的步骤
    # X 0：54    0：784

    le = LabelEncoder()  # 0:2  分两类
    y = to_categorical(le.fit_transform(y), NUM_CLASS)   # 0：54  0：2  表明属于哪一类

    # 拆分数据集  X是图片  y是类型
    (X_train, X_test, y_train, y_test) = train_test_split(X, y,
                                                          test_size=0.2,
                                                          random_state=42)
    # ###############################################3
    # 第二部分：创建并训练模型
    # 创建CNN模型: Alex-Net
    model = Sequential()

    chanDim = -1
    reg = 0.0002

    model.add(Conv2D(96, (11, 11), strides=(4, 4), input_shape=(TARGET_IMAGE_WIDTH,TARGET_IMAGE_HEIGHT,NUM_CHANNELS),
                     padding="same", kernel_regularizer=l2(reg)))
    model.add(Activation("relu"))
    model.add(BatchNormalization(axis=chanDim))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(256, (5, 5), padding="same", kernel_regularizer=l2(reg)))
    model.add(Activation("relu"))
    model.add(BatchNormalization(axis=chanDim))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(384, (3, 3), padding="same", kernel_regularizer=l2(reg)))
    model.add(Activation("relu"))
    model.add(BatchNormalization(axis=chanDim))
    model.add(Conv2D(384, (3, 3), padding="same", kernel_regularizer=l2(reg)))
    model.add(Activation("relu"))
    model.add(BatchNormalization(axis=chanDim))
    model.add(Conv2D(256, (3, 3), padding="same", kernel_regularizer=l2(reg)))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(4096, kernel_regularizer=l2(reg)))
    model.add(Activation("relu"))
    model.add(BatchNormalization())
    model.add(Dropout(0.25))

    model.add(Dense(4096, kernel_regularizer=l2(reg)))
    model.add(Activation("relu"))
    model.add(BatchNormalization())
    model.add(Dropout(0.25))

    model.add(Dense(NUM_CLASS, kernel_regularizer=l2(reg)))
    model.add(Activation("softmax"))

    # 训练模型
    print("[INFO] 训练模型...")
    adam = Adam(lr=LR)
    model.compile(loss="categorical_crossentropy", optimizer=adam,
                  metrics=["accuracy"])
    H = model.fit(X_train, y_train, validation_data=(X_test, y_test),
                  epochs=EPOCHS, batch_size=BATCH_SIZE)

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
    AlexModel()

