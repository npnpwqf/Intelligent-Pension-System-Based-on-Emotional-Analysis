from keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from fall.train.simpledatasetloader import SimpleDatasetLoader
from fall.train.simplepreprocessor import SimplePreprocessor
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Activation, Flatten
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.layers.normalization import BatchNormalization
from keras.regularizers import l2

model_path = 'D:\\PycharmProjects\\Intelligent-elderly-care\\fall\\train\\models\\fall_down_alex3.hdf5'


class AlexProcessor:

    def model_loader(self):
        # 创建CNN模型: Alex-Net
        model = Sequential()

        chanDim = -1
        reg = 0.0002

        model.add(
            Conv2D(96, (11, 11), strides=(4, 4), input_shape=(self.img_width, self.img_height, self.num_channels),
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

        model.add(Dense(self.num_class, kernel_regularizer=l2(reg)))
        model.add(Activation("softmax"))

        model.load_weights(model_path)

        return model

    def alex_tester(self, test_img_path):
        sp = SimplePreprocessor(self.img_width, self.img_height)
        sdl = SimpleDatasetLoader(preprocessors=[sp])
        dataset_path = test_img_path
        (X, y) = sdl.loadSingleImage(dataset_path, verbose=500, grayscale=False)

        X = X.reshape(X.shape[0], self.img_width, self.img_height, self.num_channels)
        X = X.astype("float") / 255.0  # 特征缩放，是非常重要的步骤
        le = LabelEncoder()
        y = to_categorical(le.fit_transform(y), self.num_class)

        motionValue = self.model.predict(X)
        motionMax = max(motionValue[0])
        motionList = ['摔倒了', '正常姿势']
        for i in range(self.num_class):
            if motionMax == motionValue[0][i]:
                print("预测的状态为: ", motionList[i])
                break
        return i

    def __init__(self):
        self.num_class = 2
        self.img_width = 227
        self.img_height = 227
        self.num_channels = 3
        self.model = self.model_loader()
