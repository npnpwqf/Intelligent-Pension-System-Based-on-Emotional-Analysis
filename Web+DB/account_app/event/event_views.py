from django.shortcuts import render
from django.http import HttpResponse
import json
import datetime
import operator
from django.views.decorators.csrf import csrf_exempt
from account_app import models
@csrf_exempt
def getMsg(request):
    if request.method == "POST":
        recv_data = json.loads(request.body.decode())

        event_type = int(recv_data['event_type'])
        event_date = datetime.datetime.strptime(recv_data['event_date'], "%Y-%m-%d %H:%M:%S")
        event_location = recv_data['event_location']
        event_desc = recv_data['event_desc']
        oldperson_id = recv_data['oldperson_id']
        pic_name = recv_data['pic_name']

        if event_type== 2 or event_type == 3 or event_type == 4:
            isUpdate= 0
        else:
            isUpdate=1

        models.EventInfo.objects.create(event_type=event_type,event_date=event_date,
                                        event_location=event_location,event_desc=event_desc,
                                        oldperson_id=int(oldperson_id),pic_name=pic_name,isUpdate=isUpdate)
        response = {'Msg': 'copy Msg'}
        return HttpResponse(json.dumps(response))

@csrf_exempt
def getPic(request):
    if request.method == "POST":
        file = request.FILES.get('images')
        file_name = file.name  # 获得原图片名称
        imageName = 'D:/shixun19/0708/static/eventPic/' + file_name  # 新图片路径，不改变名称
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
        notifyList=[]
        events = models.EventInfo.objects.all().values_list('event_type', 'event_date')
        chartList=[['event',],['情感检测',0,0,0,0,0,0,0],
                   ['交互检测',0,0,0,0,0,0,0],
                   ['陌生人检测',0,0,0,0,0,0,0],
                   ['摔倒检测', 0, 0, 0, 0, 0, 0, 0],
                   ['禁止区域入侵检测',0,0,0,0,0,0,0]]
        updateEvent=models.EventInfo.objects.filter(isUpdate=0)
        if updateEvent:
            for item in updateEvent:
                if item.event_type==2:
                    notifyList.append("检测到有陌生人闯入<br>"
                                      +item.event_date.strftime("%Y-%m-%d %H:%M:%S"))
                elif item.event_type==3:
                    old_name=models.OldpersonInfo.objects.get(id=item.oldperson_id)
                    notifyList.append("检测到 "+old_name.username + " 老人在 " + item.event_location +"摔倒了<br>"
                                      +item.event_date.strftime("%Y-%m-%d %H:%M:%S"))
                elif item.event_type==4:
                    notifyList.append("检测到 "+item.event_location +"区域有人闯入,"+
                                      item.event_desc+'<br>'+
                                      item.event_date.strftime("%Y-%m-%d %H:%M:%S"))
                elif item.event_type==1:
                    notifyList.append("检测到有义工和老人交互<br>" +
                                      item.event_date.strftime("%Y-%m-%d %H:%M:%S"))

                item.isUpdate=1
                item.save()

        today = datetime.datetime.now()
        for i in range(7):
            time = today + datetime.timedelta(days=i-6)
            chartList[0].append([time.strftime("%Y-%m-%d")])
        for event in events:
            delta = today - event[1]
            if delta.days<7 and delta.days>=0:
                chartList[event[0]+1][7 - delta.days] = chartList[event[0]+1][7 - delta.days] + 1

        countList=[0,0,0,0,0]
        for i in range(5):
            for j in range(7):
                countList[i]+=chartList[i+1][j+1]

        return HttpResponse(json.dumps({
            "events": chartList,
            "eventCounts":countList,
            "notifyList":notifyList
        }))


@csrf_exempt
def eventDetail(request):
    if request.method=="GET":
        events=models.EventInfo.objects.all().order_by('-event_date')
        feeling=[]
        communication=[]
        stranger=[]
        fall=[]
        ban=[]

        for item in events:
            if item.event_type==0 and len(feeling)<20:
                name=models.OldpersonInfo.objects.get(id=item.oldperson_id).username
                feeling.append({"id":item.id,"event_type": item.event_type,
                        "event_date": datetime.datetime.strftime(item.event_date, "%Y-%m-%d %H:%M:%S"), "name": name,
                        "pic_name": item.pic_name})
            elif item.event_type==1 and len(communication)<20:
                name = models.OldpersonInfo.objects.get(id=item.oldperson_id).username
                communication.append({"id": item.id, "event_type": item.event_type,
                        "event_date": datetime.datetime.strftime(item.event_date, "%Y-%m-%d %H:%M:%S"), "name": name,
                        "pic_name": item.pic_name})
            elif item.event_type==3 and len(fall)<20:
                name = models.OldpersonInfo.objects.get(id=item.oldperson_id).username
                fall.append({"id": item.id, "event_type": item.event_type,
                                      "event_date": datetime.datetime.strftime(item.event_date, "%Y-%m-%d %H:%M:%S"),
                                      "name": name,
                                      "pic_name": item.pic_name})
            elif item.event_type==2 and len(stranger)<20:
                stranger.append({"id":item.id,"event_type": item.event_type,
                        "event_date": datetime.datetime.strftime(item.event_date, "%Y-%m-%d %H:%M:%S"),
                        "pic_name": item.pic_name})
            elif item.event_type==4 and len(ban)<20:
                ban.append({"id": item.id, "event_type": item.event_type,
                                 "event_date": datetime.datetime.strftime(item.event_date, "%Y-%m-%d %H:%M:%S"),
                                 "pic_name": item.pic_name})


        return render(request,'event.html',{'feeling':feeling,'ban':ban,'stranger':stranger,'communication':communication,
                                            'fall':fall})
    else:
        id=int(request.POST['id'])
        print(id)
        if models.EventInfo.objects.filter(id=id):
            event =models.EventInfo.objects.get(id=id)
            chart = [{"name": "生气", "value": 0}, {"name": "厌恶", "value": 0}, {"name": "恐惧", "value": 0},
                     {"name": "开心", "value": 0}, {"name": "伤心", "value": 0},
                     {"name": "惊讶", "value": 0}]
            percentage = event.event_desc.split(',')
            for i in range(6):
                chart[i]["value"] = float(percentage[i])
            return HttpResponse(json.dumps({
            "percentage": chart,
            "categories":['生气','厌恶','恐惧','开心','伤心','惊讶']
            }))