import cv2
import time
from PIL import Image
import numpy
import socket
from io import StringIO
import sendEvent
import get_face_name
from io import BytesIO
import struct
from oldcare.sentimentANN.test_cnn import CNNProcessor
from test_Interact import Interact
from get_face_name import Stranger
from oldcare.fall.poseprocessor import PoseProcessor
from emotion_estimate import EmotionEstimate

IP = "172.20.10.10"
PORT = 9999
address = (IP, PORT)
PIC = 101
VOIEC = 102

timeF = 90  # 视频帧计数间隔频率

#fourcc = cv2.VideoWriter_fourcc(*'XVID')  # 保存视频的编码
# out = cv2.VideoWriter('static/frameVideo/output.avi',fourcc, 20.0, (640,480))

def to_package(byte,cmd,ver=1):
    '''
    将每一帧的图片流的二进制数据进行分包
    :param byte: 二进制文件
    :param cmd:命令
    :return: 
    '''
    head = [ver,len(byte),cmd]
    headPack = struct.pack("!3I", *head)
    senddata = headPack+byte
    return senddata

def pic_to_array(pic):
    '''
    将图片转化为numpy数组
    :param pic: 
    :return: 
    '''
    stram = BytesIO()
    pic.save(stram, format="JPEG")
    array_pic = numpy.array(Image.open(stram))
    stram.close()
    return array_pic

def array_pic_to_stream(pic):
    '''
    将数组图片转化为byte
    :param pic: 
    :return: 
    '''
    stream = BytesIO()
    pic = Image.fromarray(pic)
    pic.save(stream, format="JPEG")
    jepg = stream.getvalue()
    stream.close()
    return jepg

def tcp_camera(process=None):
    '''
    通过tcp协议传输每一帧图片
    :param process: 
    :return: 
    '''
    cam = cv2.VideoCapture(0)#打开摄像头
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)#构建tcp套接字
    sock.connect(address)
    c = 1
    while cam.isOpened():
        ret,frame = cam.read()#读取摄像头信息
        if ret == True:#是否正常打开
            # frame = cv2.flip(frame, 0)
            # # write the flipped frame
            # out.write(frame)
            cv2.imshow("transmitting", frame)#显示


            if (c % timeF == 0):  # 每隔timeF帧进行存储操作
                # 以保存图片时的时间戳为文件名
                timestamp = int(time.time())
                picpath = 'static/framePic/' + str(timestamp) + '.jpg'
                picname = str(timestamp) + '.jpg'
                cv2.imwrite(picpath, frame)

                # stranger detect
                face_msg = stranger.facedetect(picpath=picpath, picname=picname, timestamp=timestamp)
                print(face_msg)
                if face_msg:
                    sendEvent.postMsg(face_msg, picpath)


                # # sentiment
                # sentiment_msg = emotion.predict_emotion(id=0, test_img_path=picpath, picname=picname, timestamp=timestamp)
                # print(sentiment_msg)
                # if sentiment_msg:
                #    sendEvent.postMsg(sentiment_msg, picpath)


                # interact
                interact_msg = interact.test_distance(picpath=picpath, picname=picname, timestamp=timestamp)
                print(interact_msg)
                if interact_msg:
                    sendEvent.postMsg(interact_msg, picpath)

                # # fall
                # fall_msg = poseProcessor.pose_estimater(id=0, picpath=picpath, picname=picname, timestamp=timestamp)
                # print(fall_msg)
                # if fall_msg:
                #     sendEvent.postMsg(fall_msg, picpath)


            c = c + 1
            cv2.waitKey(1)  # 每帧数据延时 1ms，延时不能为 0，否则读取的结果会是静态帧

            if process:
                '''
                视频处理模块
                '''
                frame = process(frame)
            jepg = array_pic_to_stream(frame)#将图片转化为二进制流
            #print(len(jepg))
            package = to_package(jepg,101)#封包
            try:
                sock.send(package)
            except:
                cont = input("远程连接断开,是否重新连接? Y:重新连接 N:退出程序")
                if(cont.lower() == "n"):
                    return
                if(cont.lower() == "y"):
                    cam.release()
                    cv2.destroyAllWindows()
                    sock.close()
                    tcp_camera()
            if (cv2.waitKey(1) & 0xFF) == ord('q'):
                break
            else:
                continue
    #关闭自愿
    cam.release()
    # out.release()
    cv2.destroyAllWindows()
    sock.close()

# def tcp_screen(process=None):
#     '''
#         将本地屏幕发送到客户端
#         :param process:
#         :param fps:
#         :return:
#         '''
#     # 构建套接字
#     sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     sock.connect(address)
#     while True:
#         img = ImageGrab.grab()
#         img = pic_to_array(img)
#         if process:
#             frame = process(img)
#         # cv2.imshow("screen",img)
#         jepg = array_pic_to_stream(img)
#         jepg = to_package(jepg,101)
#         print(len(jepg))
#         try:
#             sock.send(jepg)
#         except:
#             cont = input("远程连接失败,是否重新连接? Y:重新连接 N:退出程序")
#             if (cont.lower() == "n"):
#                 print("程序退出......")
#                 return
#             if (cont.lower() == "y"):
#                 cv2.destroyAllWindows()
#                 sock.close()
#                 tcp_screen()
#         #cv2.imshow("cra", img)
#         cv2.waitKey(1)
#         if (cv2.waitKey(1) & 0xFF) == ord('q'):
#             break
#         else:
#             continue
#     sock.close()
#     cv2.destroyAllWindows()


if __name__ == "__main__":
    #cnn_processor = CNNProcessor()
    interact = Interact()
    stranger = Stranger()
    poseProcessor = PoseProcessor()
    emotion = EmotionEstimate()
    tcp_camera()