from oldcare.facial import FaceUtil
import imutils
import cv2
import time
import argparse

# 传入参数
ap = argparse.ArgumentParser()
ap.add_argument("-f", "--filename", required=False, default = '', help="")
args = vars(ap.parse_args())

# 全局变量
facial_recognition_model_path = 'models/new_face_recognition_hog.pickle'
input_video = args['filename']

# 初始化摄像头
if not input_video:
    vs = cv2.VideoCapture(0)
    time.sleep(2)
else:
    vs = cv2.VideoCapture(input_video)

# 初始化人脸识别模型
faceutil = FaceUtil(facial_recognition_model_path)
# 不断循环
while True:
    # grab the current frame
    (grabbed, frame) = vs.read()
    # if we are viewing a video and we did not grab a frame, then we
    # have reached the end of the video
    if input_video and not grabbed:
        break
    if not input_video:
        frame = cv2.flip(frame, 1)
    # resize the frame, convert it to grayscale, and then clone the
    # original frame so we can draw on it later in the program
    frame = imutils.resize(frame, width=600)
    face_location_list, names = faceutil.get_face_location_and_name(frame)

    # loop over the face bounding boxes
    for ((left, top, right, bottom), name) in zip(face_location_list,names):
        # display label and bounding box rectangle on the output frame
        cv2.putText(frame, name, (left, top - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
        cv2.rectangle(frame, (left, top), (right, bottom),
                      (0, 0, 255), 2)
    # show our detected faces along with smiling/not smiling labels
    cv2.imshow("Face Recognition", frame)
    # Press 'ESC' for exiting video
    k = cv2.waitKey(1) & 0xff
    if k == 27:
        break

# cleanup the camera and close any open windows
vs.release()
cv2.destroyAllWindows()