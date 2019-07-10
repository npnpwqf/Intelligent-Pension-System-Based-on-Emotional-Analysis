import cv2
import numpy as np
from keras.models import load_model
import time
import warnings
import cv2
import imutils
from oldcare.facial import FaceUtil

warnings.filterwarnings('ignore')


class EmotionEstimate:
    def __init__(self):
        # 加载模型
        self.emotion_classifier = load_model('models/emotion_model.hdf5')
        self.face_cascade = cv2.CascadeClassifier('models/haarcascade_frontalface_default.xml')
        facial_recognition_model_path = 'models/new_face_recognition_hog.pickle'
        self.faceutil = FaceUtil(facial_recognition_model_path)

    # 图片预处理
    def preprocess_input(self, x, v2=True):
        x = x.astype('float32')
        x = x / 255.0
        if v2:
            x = x - 0.5
            x = x * 2.0
        return x

    def apply_offsets(self, face_coordinates, offsets):
        x, y, width, height = face_coordinates
        x_off, y_off = offsets
        return x - x_off, x + width + x_off, y - y_off, y + height + y_off

    def predict_emotion(self, id, test_img_path, picname, timestamp):
        pic = cv2.imread(test_img_path)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=600)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)

        if len(face_location_list) == 1:

            # 情感类型字典
            emotion_labels = {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy',
                              4: 'sad', 5: 'surprise', 6: 'neutral'}

            emotion_offsets = (20, 40)

            emotion_target_size = self.emotion_classifier.input_shape[1:3]

            # 读取原图片
            bgr_image = cv2.imread(test_img_path)

            # 转化为灰度图
            gray_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)

            # 获得人脸坐标列表
            faces = self.face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5,
                                                  minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)

            # 获得人脸坐标
            for face_coordinates in faces:
                x1, x2, y1, y2 = self.apply_offsets(face_coordinates, emotion_offsets)
                gray_face = gray_image[y1:y2, x1:x2]
                try:
                    gray_face = cv2.resize(gray_face, emotion_target_size)
                except:
                    continue

                gray_face = self.preprocess_input(gray_face, True)
                gray_face = np.expand_dims(gray_face, 0)
                gray_face = np.expand_dims(gray_face, -1)

                # 获取模型的预测结果
                emotion_prediction = self.emotion_classifier.predict(gray_face)
                emotion_label_arg = np.argmax(emotion_prediction)
                emotion_text = emotion_labels[emotion_label_arg]
                print(emotion_text)

                # 编写事件描述和事件
                desc = str(emotion_prediction[0][0]) + ',' + str(emotion_prediction[0][1]) + ',' + str(emotion_prediction[0][2]) + ',' + \
                       str(emotion_prediction[0][3]) + ',' + str(emotion_prediction[0][5]) + ',' + str(emotion_prediction[0][6])

                event = {
                    'event_type': 0,
                    'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                    'event_location': 'BJTU',
                    'event_desc': desc,
                    'oldperson_id': id,
                    'pic_name': picname
                }

                # 返回事件
                return event


'''
# ###########这是调用范例
if __name__ == '__main__':
    ee = EmotionEstimate()
    ee.predict_emotion(id=老人id, test_img_path=输入图片路径, picname=输入图片名字, timestamp=时间戳)
'''
