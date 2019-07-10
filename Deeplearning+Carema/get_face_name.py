from oldcare.facial import FaceUtil
import imutils
import cv2
import time
import sendEvent


class Stranger:

    def __init__(self):
        facial_recognition_model_path = 'models/new_face_recognition_hog.pickle'
        self.faceutil = FaceUtil(facial_recognition_model_path)

    def facedetect(self, picpath, picname, timestamp):

        pic = cv2.imread(picpath,)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=600)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)

        for ((left, top, right, bottom), name) in zip(face_location_list, names):
            # display label and bounding box rectangle on the output frame
            if 'Unknown' in names:
                print('有陌生人出没!')
                event = {
                    'event_type': 2,
                    'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                    'event_location': 'BJTU',
                    'event_desc': '陌生人来了',
                    'oldperson_id': 0,
                    'pic_name': picname
                }
                return event

    def detectID(self, picpath):

        pic = cv2.imread(picpath,)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=600)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)
        dict = None
        if len(face_location_list) == 1:
            if 'old_1' in names:
                dict = 0
            if 'old_2' in names:
                dict = 1
            return dict