from oldcare.sentimentANN.processing import SimplePreprocessor
from oldcare.sentimentANN import SimpleDatasetLoader
from imutils import paths
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from keras.models import Sequential
from keras.layers.core import Dense
from keras.optimizers import SGD
from keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as plt

from keras.layers.core import Dense, Dropout, Activation, Flatten
from keras.layers.convolutional import Convolution2D, MaxPooling2D

# 全局变量
dataset_path = '../../Collect/sentiment_images'
accuracy_plot_path = '../../plots/accuracy.png'
loss_plot_path = '../../plots/loss.png'
output_model_path = '../../models/face_expression.hdf5'

# 全局常量
TARGET_IMAGE_WIDTH = 28
TARGET_IMAGE_HEIGHT = 28
LR = 0.001  # 学习率
BATCH_SIZE = 64
EPOCHS = 640
################################################
# 第一部分：数据预处理
sp = SimplePreprocessor(TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT)   # 28  28  3
sdl = SimpleDatasetLoader(preprocessors=[sp])

# Load images
print("[INFO] 导入图像...")
image_paths = list(paths.list_images(dataset_path))# 数组  每张图片的路径  # path included
(X, y) = sdl.load(image_paths, verbose=500, grayscale=True)
# X 0：54   0：28   0：28   y 0:54  存类型

# Flatten (reshape the data matrix)
# convert from (13164,TARGET_IMAGE_WIDTH,TARGET_IMAGE_HEIGHT)
# into (13164,TARGET_IMAGE_WIDTH*TARGET_IMAGE_HEIGHT)

X = X.reshape((X.shape[0], TARGET_IMAGE_WIDTH * TARGET_IMAGE_HEIGHT))
X = X.astype("float") / 255.0  # 特征缩放，是非常重要的步骤
# X 0：54    0：784


le = LabelEncoder()  # 0:2  分两类
y = to_categorical(le.fit_transform(y), 7)   # 0：54  0：2  表明属于哪一类

# 拆分数据集  X是图片  y是类型
(X_train, X_test, y_train, y_test) = train_test_split(X, y,
                                                      test_size=0.25,
                                                      random_state=42)
################################################3
# 第二部分：创建并训练模型
# 创建模型
model = Sequential()
model.add(Dense(1024,
                input_shape=(TARGET_IMAGE_WIDTH * TARGET_IMAGE_HEIGHT,),
                activation="relu"))
model.add(Dense(512, activation="relu"))
# model.add(Dense(2, activation="softmax"))
model.add(Dense(7, activation="softmax"))


# # CNN创建模型
# model = Sequential()
# # 第一个卷积层，2个卷积核，每个卷积核大小3*3。1表示输入的图片的通道,灰度图为1通道。
# # border_mode可以是valid或者full
# # 激活函数用relu
# model.add(Convolution2D(nb_filters, nb_conv, nb_conv,
#                         border_mode='valid',
#                         input_shape=(img_rows, img_cols, 1)))
#
# convout1 = Activation('relu')
# model.add(convout1)
#
# # 第二个卷积层，32个卷积核，每个卷积核大小3*3。
# # 激活函数用relu
# model.add(Convolution2D(nb_filters, nb_conv, nb_conv))
# convout2 = Activation('relu')
# model.add(convout2)
#
# # 第三个卷积层，32个卷积核，每个卷积核大小3*3。
# # 激活函数用relu
# model.add(Convolution2D(nb_filters, nb_conv, nb_conv))
# convout3 = Activation('relu')
# model.add(convout3)
#
# # 采用maxpooling，poolsize为(2,2)
# model.add(MaxPooling2D(pool_size=(nb_pool, nb_pool)))
#
# # 按概率来将x中的一些元素值置零，并将其他的值放大。
# # 用于进行dropout操作，一定程度上可以防止过拟合
# # x是一个张量，而keep_prob是一个[0,1]之间的值。
# # x中的各个元素清零的概率互相独立，为1-keep_prob,
# # 而没有清零的元素，则会统一乘以1/keep_prob,
# # 目的是为了保持x的整体期望值不变。
# model.add(Dropout(0.5))
#
# # 全连接层，先将前一层输出的二维特征图flatten为一维的,压扁平准备全连接。
# model.add(Flatten())
# model.add(Dense(512))  # 添加512节点的全连接
# model.add(Activation('relu'))
# model.add(Dropout(0.5))
# model.add(Dense(nb_classes))  # 添加输出3个节点
# model.add(Activation('softmax'))  # 采用softmax激活
# model.compile(loss='categorical_crossentropy', optimizer='adadelta', metrics=['accuracy'])
#
# # 用于训练一个固定迭代次数的模型
# # 返回：记录字典，包括每一次迭代的训练误差率和验证误差率；
# hist = model.fit(X_train, Y_train, batch_size=batch_size, nb_epoch=nb_epoch,
#                  shuffle=True, verbose=1, validation_data=(X_test, Y_test))
#
# hist = model.fit(X_train, Y_train, batch_size=batch_size, nb_epoch=nb_epoch,
#                  shuffle=True, verbose=1, validation_split=0.2)
#
# # 展示模型在验证数据上的效果
# # 返回：误差率或者是(误差率，准确率)元组（if show_accuracy=True）
# score = model.evaluate(X_test, Y_test, verbose=0)
# print('Test loss:', score[0])
# print('Test accuracy:', score[1])
#
# from sklearn.metrics import classification_report, confusion_matrix
#
# Y_pred = model.predict(X_test)
# print(Y_pred)
# y_pred = np.argmax(Y_pred, axis=1)
# print(y_pred)
#
# target_names = ['class 0(Negative)', 'class 1(Positive)']
# print(classification_report(np.argmax(Y_test, axis=1), y_pred, target_names=target_names))


# 训练模型
print("[INFO] 训练模型...")
sgd = SGD(LR)
model.compile(loss="categorical_crossentropy", optimizer=sgd,
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


################################################
# 第四部分：保存模型
model.save(output_model_path)
