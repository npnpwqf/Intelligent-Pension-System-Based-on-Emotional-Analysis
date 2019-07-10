from django.shortcuts import render
from django.http import HttpResponse
import json
import datetime
from django.views.decorators.csrf import csrf_exempt
from account_app import models
@csrf_exempt
def getMsg(request):
    if request.method == "POST":
        recv_data = json.loads(request.body.decode())
        print(recv_data)

        event_type = recv_data['event_type']
        event_date = datetime.datetime.strptime(recv_data['event_data'], "%Y-%m-%d %H:%M:%S")
        event_location = recv_data['event_location']
        event_desc = recv_data['event_desc']
        oldperson_id = recv_data['oldperson_id']
        pic_name = recv_data['pic_name']


        models.EventInfo.objects.create(event_type=int(event_type),event_date=event_date,
                                        event_location=event_location,event_desc=event_desc,
                                        oldperson_id=int(oldperson_id),pic_name=pic_name)
        response = {'Msg': 'copy Msg'}
        return HttpResponse(json.dumps(response))

@csrf_exempt
def getPic(request):
    if request.method == "POST":
        file = request.FILES.get('images')
        file_name = file.name  # 获得原图片名称
        imageName = 'D:/liuiqngyu/web/OldAgeCare_Web/my_app/static/eventPic/' + file_name  # 新图片路径，不改变名称
        imgfile = open(imageName, 'wb')
        for chunk in file.chunks():
            imgfile.write(chunk)
        imgfile.close()

        response = {'Msg': 'copy Pic'}
        return HttpResponse(json.dumps(response))

#实时报表
@csrf_exempt
def get_event(request):
    if request.method=="POST":
        events = models.EventInfo.objects.all().values_list('event_type', 'event_date')
        chartList=[['event',],['情感检测',0,0,0,0,0,0,0],
                   ['交互检测',0,0,0,0,0,0,0],
                   ['陌生人检测',0,0,0,0,0,0,0],
                   ['禁止区域入侵检测',0,0,0,0,0,0,0]]
        today = datetime.datetime.now()
        for i in range(7):
            time = today + datetime.timedelta(days=i-6)
            chartList[0].append([time.strftime("%Y-%m-%d")])
        for event in events:
            delta = today - event[1]
            if delta.days<7:
                chartList[event[0]+1][7 - delta.days] = chartList[event[0]+1][7 - delta.days] + 1

        return HttpResponse(json.dumps({
            "events": chartList
        }))