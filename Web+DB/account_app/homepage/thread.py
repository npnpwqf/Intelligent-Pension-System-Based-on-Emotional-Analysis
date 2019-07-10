import socket
import cv2
import numpy
from io import BytesIO
from PIL import Image
import struct
from . import singleton


HEADSIZE = 12

global image
image = cv2.imread('./test.jpg')


sockList=[]
def run():
    buff = bytes()
    sock=singleton.Singleton()
    package, addr = sock.accept()
    sockList.append(sock)
    print('已连接客户端'+str(sock))
    while True:
        img = package.recv(1024 * 1024)
        if img:
            buff = buff + img
            while True:
                # 判断数据是否完整
                if len(buff) < HEADSIZE:
                    break
                headPack = struct.unpack('!3I', buff[:HEADSIZE])
                cmd = headPack[2]
                bodySize = headPack[1]
                # 判断数据包是否完整
                if len(buff) < HEADSIZE + bodySize:
                    break
                body = buff[HEADSIZE:HEADSIZE + bodySize]
                if (cmd == 101):
                    img = byte_to_img(body)
                    global image
                    image = img
                buff = buff[HEADSIZE + bodySize:]
            if (cv2.waitKey(1) & 0xFF) == ord('q'):
                break
            else:
                continue
        break
    sockList.remove(sock)

def byte_to_img(byte):
    str_buf = BytesIO(byte)
    img = numpy.array(Image.open(str_buf))
    str_buf.close()
    return img

def getImage():
    global image
    return image


def getSocketList():
    global sockList
    return sockList