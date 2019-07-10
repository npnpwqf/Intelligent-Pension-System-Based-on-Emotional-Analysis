from get_face_name import Stranger
from oldcare.sentimentANN.test_cnn import CNNProcessor
from oldcare.facial.faceutildlib import FaceUtil
import time
import cv2
import imutils

#stranger = Stranger()
#cnnprocessor = CNNProcessor()
faceutil = FaceUtil(encoding_file_path='models/new_face_recognition_hog.pickle')

timestamp = int(time.time())
picpath = 'static/framePic/1562594993.jpg'
picname = str(timestamp) + '.jpg'


pic = cv2.imread(picpath,)
frame = cv2.flip(pic, 1)
frame = imutils.resize(frame, width=600)
face_location_list, names = faceutil.get_face_location_and_name(frame)

for ((left, top, right, bottom), name) in zip(face_location_list, names):
    # display label and bounding box rectangle on the output frame
    cv2.putText(frame, name, (left, top - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
    cv2.rectangle(frame, (left, top), (right, bottom),
                  (0, 0, 255), 2)
    # show our detected faces along with smiling/not smiling labels
    cv2.imshow("Face Recognition", frame)
    # Press 'ESC' for exiting video
    k = cv2.waitKey(0)

# # stranger detect
# face_msg = stranger.facedetect(picpath=picpath, picname=picname, timestamp=timestamp)
# print(face_msg)
# id = stranger.detectID(picpath=picpath)
#
# print('sentiment:' + str(id))
# if id:
#     sentiment_msg = cnnprocessor.cnn_tester(id=id, test_img_path=picpath, picname=picname, timestamp=timestamp)
#     print(sentiment_msg)
# print(id)
