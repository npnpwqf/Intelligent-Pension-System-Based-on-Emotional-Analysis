from oldcare.facial import FaceUtil
import imutils
import cv2
from math import sqrt
import time


class Interact:

    def __init__(self):
        facial_recognition_model_path = 'models/new_face_recognition_hog.pickle'
        self.faceutil = FaceUtil(facial_recognition_model_path)

    def test_distance(self, picpath, picname, timestamp):
        pic = cv2.imread(picpath)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=600)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)
        #if ('volunteer', 'old_1') in names or ('volunteer', 'old_2') in names:
        if len(face_location_list)==2:
            i = 0
            (x1, y1) = (0, 0)
            (x2, y2) = (0, 0)
            for (left, top, right, bottom) in face_location_list:
                i = i + 1
                if i == 1:
                    (x1, y1) = ((left + right) / 2, (top + bottom) / 2)
                if i == 2:
                    (x2, y2) = ((left + right) / 2, (top + bottom) / 2)
            pixel_distance = sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
            measure = 20 / abs(face_location_list[0][0] - face_location_list[0][2])
            actual_distance = pixel_distance * measure
            print("actual_distance", actual_distance)
            if actual_distance <= 50:
                event = {
                    'event_type': 1,
                    'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                    'event_location': 'BJTU',
                    'event_desc': '有义工和老人交互!',
                    'oldperson_id': 0,
                    'pic_name': picname
                }
                print('他俩唠嗑了')
                return event





