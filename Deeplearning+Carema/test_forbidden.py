from oldcare.facial import FaceUtil
import imutils
import cv2
import time

class Forbidden:

    def __init__(self):
        facial_recognition_model_path = 'models/new_face_recognition_hog.pickle'
        self.faceutil = FaceUtil(facial_recognition_model_path)
        self.forbidden = (190, 140, 430, 340)
        print(self.forbidden)

    def ifInFobidden(self, left, top, right, bottom, picname, timestamp):
        # 不在安全区域内
        if not (left > self.forbidden[0] and top > self.forbidden[1] and right < self.forbidden[2] and bottom < self.forbidden[3]):
            print("有人闯入安全区域内")
            event = {
                'event_type': 4,
                'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                'event_location': 'BJTU',
                'event_desc': '有人闯入安全区域内',
                'oldperson_id': 0,
                'pic_name': picname
            }
            return event

    def testForbidden(self, picpath, picname, timestamp):

        pic = cv2.imread(picpath)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=640)
        frame = imutils.resize(frame, height=480)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)
        for ((left, top, right, bottom), name) in zip(face_location_list, names):
            self.ifInFobidden(left, top, right, bottom, picname, timestamp)

