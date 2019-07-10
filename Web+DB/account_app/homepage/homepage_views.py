from django.shortcuts import render,redirect,HttpResponse
import json,datetime
from django.http import StreamingHttpResponse
from account_app import models
from django.views.decorators.csrf import csrf_exempt
import cv2
from . import video_thread
from . import video_thread2
import time
import threading

@csrf_exempt
def homepage(request):
    thread1 = threading.Thread(target=video_thread.run)
    thread1.start()
    time.sleep(2)
    thread2 = threading.Thread(target=video_thread2.run)
    thread2.start()
    time.sleep(2)
    message={'mes1':'','mes2':''}
    if len(video_thread.getSocketList()) == 0:
        data='wait1'
        message['mes1']=data
    if len(video_thread2.getSocketList()) == 0:
        data = 'wait2'
        message['mes2']=data
    return render(request, 'homepage.html', {"message": message})


def gen(cam): #cam为摄像机对象，get_buf获得open_cv处理后压缩为jpeg格式并存入缓存的图片二进制数据。
    while True:
        time.sleep(0.1)
        frame = cam.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@csrf_exempt
def video_feed(request):
    if len(video_thread.getSocketList())==0:
        data=['wait']
        return HttpResponse({"message":data})
    return StreamingHttpResponse(gen(VideoCamera()), content_type="multipart/x-mixed-replace; boundary=frame")


class VideoCamera(object):
    def get_frame(self):
        image = video_thread.getImage()
        # 因为opencv读取的图片并非jpeg格式，因此要用motion JPEG模式需要先将图片转码成jpg格式图片
        ret, jpeg = cv2.imencode('.jpg', image)

        return jpeg.tobytes()

@csrf_exempt
def update(request):
    message = {'mes1': '', 'mes2': ''}
    if len(video_thread.getSocketList()) == 0:
        data = 'wait1'
        message['mes1'] = data
    if len(video_thread2.getSocketList()) == 0:
        data = 'wait2'
        message['mes2'] = data

    return HttpResponse(json.dumps({"message":message}))



@csrf_exempt
def video_feed2(request):
    if len(video_thread2.getSocketList())==0:
        data=['wait']
        return HttpResponse({"message2":data})
    return StreamingHttpResponse(gen(VideoCamera2()), content_type="multipart/x-mixed-replace; boundary=frame")


class VideoCamera2(object):
    def get_frame(self):
        image = video_thread2.getImage()
        # 因为opencv读取的图片并非jpeg格式，因此要用motion JPEG模式需要先将图片转码成jpg格式图片
        ret, jpeg = cv2.imencode('.jpg', image)

        return jpeg.tobytes()
