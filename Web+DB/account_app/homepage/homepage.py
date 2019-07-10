from django.shortcuts import render,redirect,HttpResponse
import json,datetime
from django.http import StreamingHttpResponse
from account_app import models
from django.views.decorators.csrf import csrf_exempt
import cv2
from . import thread
import time
import threading

@csrf_exempt
def homepage(request):
    thread2 = threading.Thread(target=thread.run)
    thread2.start()
    time.sleep(2)
    if len(thread.getSocketList()) == 0:
        data=['wait']
        return render(request,'homepage.html',{"message":data})
    return render(request, 'homepage.html')


def gen(cam): #cam为摄像机对象，get_buf获得open_cv处理后压缩为jpeg格式并存入缓存的图片二进制数据。
    while True:
        time.sleep(0.1)
        frame = cam.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@csrf_exempt
def video_feed(request):
    if len(thread.getSocketList())==0:
        data=['wait']
        return HttpResponse({"message":data})
    return StreamingHttpResponse(gen(VideoCamera()), content_type="multipart/x-mixed-replace; boundary=frame")


class VideoCamera(object):
    def get_frame(self):
        image = thread.getImage()
        # 因为opencv读取的图片并非jpeg格式，因此要用motion JPEG模式需要先将图片转码成jpg格式图片
        ret, jpeg = cv2.imencode('.jpg', image)

        return jpeg.tobytes()

@csrf_exempt
def update(request):
    if len(thread.getSocketList())==0:
        return HttpResponse(json.dumps({"message":"wait"}))
    else:
        return HttpResponse(json.dumps({"message": "play"}))
