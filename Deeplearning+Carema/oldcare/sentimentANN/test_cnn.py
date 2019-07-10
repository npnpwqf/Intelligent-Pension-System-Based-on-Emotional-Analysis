from keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from oldcare.sentimentANN import SimpleDatasetLoader
from oldcare.sentimentANN.processing import SimplePreprocessor
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Activation, Flatten
from keras.layers.convolutional import Conv2D, MaxPooling2D
from oldcare.facial import FaceUtil
import time
import cv2
import imutils

class CNNProcessor:

    def model_loader(self):
        # 创建CNN模型
        model = Sequential()

        model.add(Conv2D(input_shape=(48, 48, 1), filters=32, kernel_size=1,
                         padding="same", activation='relu'))
        model.add(Conv2D(input_shape=(48, 48, 32), filters=32, kernel_size=5,
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

        model.add(Dense(7))
        model.add(Activation('softmax'))

        model.load_weights("models/face_expression_cnn.hdf5")

        return model

    def cnn_tester(self, id, test_img_path, picname, timestamp):

        pic = cv2.imread(test_img_path)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=600)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)

        if len(face_location_list) == 1:
            sp = SimplePreprocessor(48, 48)   # 28  28  3
            sdl = SimpleDatasetLoader(preprocessors=[sp])
            dataset_path = test_img_path
            (X, y) = sdl.loadSingleImage(dataset_path, verbose=500, grayscale=True)

            X = X.reshape(X.shape[0], 48, 48, 1)
            X = X.astype("float") / 255.0  # 特征缩放，是非常重要的步骤
            le = LabelEncoder()  # 0:2  分两类
            y = to_categorical(le.fit_transform(y), 7)   # 0：54  0：2  表明属于哪一类

            motionValue = self.model.predict(X)  # a[0][1]是第一个情绪的值  a[0][2]是第二个情绪的值
            desc = str(motionValue[0][0])+',' + str(motionValue[0][1])+',' + str(motionValue[0][2])+\
                   ',' + str(motionValue[0][3]) + ',' + str(motionValue[0][5])+',' + str(motionValue[0][6])

            motionMax = max(motionValue[0])
            motionList = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
            for i in range(7):
                if motionMax == motionValue[0][i]:
                    print("是第", i+1, "种情感:", motionList[i])

                    event = {
                        'event_type': 0,
                        'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                        'event_location': 'BJTU',
                        'event_desc': desc,
                        'oldperson_id': id,
                        'pic_name': picname
                    }
                    print(type(event))
                    return event


    def __init__(self):
        self.model = self.model_loader()
        facial_recognition_model_path = 'models/face_recognition_hog.pickle'
        self.faceutil = FaceUtil(facial_recognition_model_path)


'''
if __name__ == '__main__':
    model = model_loader()
    cnn_tester('D:\\PycharmProjects\\OldAgeCare_ComputerVision\\test\\1.jpg')
    cnn_tester('D:\\PycharmProjects\\OldAgeCare_ComputerVision\\test\\2.jpg')
    cnn_tester('D:\\PycharmProjects\\OldAgeCare_ComputerVision\\test\\3.jpg')
    cnn_tester('D:\\PycharmProjects\\OldAgeCare_ComputerVision\\test\\neural.jpg')
    cnn_tester('D:\\PycharmProjects\\OldAgeCare_ComputerVision\\test\\sad.jpg')
'''
