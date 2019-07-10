from oldcare.facial import FaceUtil
import imutils
import cv2
from math import sqrt
import time

class Track:

    def __init__(self):

        facial_recognition_model_path = 'models/new_face_recognition_hog.pickle'
        self.faceutil = FaceUtil(facial_recognition_model_path)
        self.turnArea = (140, 120, 500, 370)

    def test_track(self, picpath, picname, timestamp):
        pic = cv2.imread(picpath)
        frame = cv2.flip(pic, 1)
        frame = imutils.resize(frame, width=600)
        face_location_list, names = self.faceutil.get_face_location_and_name(frame)
        if 'Unknown' in names:
            (left, top, right, bottom)=face_location_list[0]
            if left < self.turnArea[0]:
                print("摄像头向右转")
                event = {
                    'event_type': 4,
                    'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                    'event_location': '在庭院',
                    'event_desc': '摄像头向右转',
                    'oldperson_id': 0,
                    'pic_name': picname
                }
                return event
            elif right > self.turnArea[3]:
                print("摄像头向左转")
                event = {
                    'event_type': 4,
                    'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
                    'event_location': '在庭院',
                    'event_desc': '摄像头向左转',
                    'oldperson_id': 0,
                    'pic_name': picname
                }
                return event
            else:
                print("能正常检测到陌生人")


if __name__ == '__main__':
    track = Track()
    track.test_track(picpath='static/framePic/123.jpg', picname='123.jpg', timestamp=1562492260)
