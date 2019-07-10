import cv2
import time
import imutils
import sendEvent
import get_face_name
from test_forbidden import Forbidden
from oldcare.facial import FaceUtil
from test_Interact import Interact
from get_face_name import Stranger
from oldcare.sentimentANN.test_cnn import CNNProcessor

cnn_processor = CNNProcessor()
interact = Interact()
stranger = Stranger()
forbidden = Forbidden()

timeF = 100 #视频帧计数间隔频率
cam = cv2.VideoCapture(0)#打开摄像头
c = 1

# fourcc = cv2.VideoWriter_fourcc(*'XVID')  # 保存视频的编码
# out = cv2.VideoWriter('static/frameVideo/output.avi',fourcc, 20.0, (640,480))

while cam.isOpened():
    ret, frame = cam.read()  # 读取摄像头信息
    if ret == True:  # 是否正常打开
        # frame = cv2.flip(frame, 0)
        # # write the flipped frame
        # out.write(frame)
        cv2.imshow("transmitting", frame)  # 显示

        if (c % timeF == 0):  # 每隔timeF帧进行存储操作

            #以保存图片时的时间戳为文件名
            timestamp = int(time.time())
            picpath = 'static/framePic/' + str(timestamp) + '.jpg'
            picname = str(timestamp) + '.jpg'
            cv2.imwrite(picpath, frame)

            # sentiment
            sentiment_msg = cnn_processor.cnn_tester(test_img_path=picpath, picname=picname, timestamp=timestamp)
            print(sentiment_msg)
            #sendEvent.postMsg(sentiment_msg, picpath)

            # face dectect
            face_msg = stranger.facedetect(picpath=picpath, picname=picname, timestamp=timestamp)
            if face_msg:
                print('stranger' + face_msg)
                #sendEvent.postMsg(face_msg, picpath)


            # # interact
            # interact_msg = interact.test_distance(picpath=picpath, picname=picname, timestamp=timestamp)
            # if interact_msg:
            #     print(interact_msg)
            #     sendEvent.postMsg(interact_msg, picpath)
            #
            #
            # district
            forbidden_msg = forbidden.testForbidden(picpath=picpath, picname=picname, timestamp=timestamp)
            if forbidden_msg:
                print(forbidden_msg)
                #sendEvent.postMsg(forbidden_msg, picpath)

            # fall



        c = c + 1
        cv2.waitKey(1)  # 每帧数据延时 1ms，延时不能为 0，否则读取的结果会是静态帧

cam.release()
# out.release()
cv2.destroyAllWindows()