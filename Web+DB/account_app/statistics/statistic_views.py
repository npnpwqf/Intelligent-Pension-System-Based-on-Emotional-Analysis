from django.shortcuts import render,redirect
from account_app import models
import json,datetime,operator
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def statistics(request):
    if request.method=="GET":
        old_person=models.OldpersonInfo.objects.filter(remove='0')
        old_name=[]
        eventList=[]
        for person in old_person:
            old_name.append(person.username)
            events = models.EventInfo.objects.filter(oldperson_id=person.id).exclude(
                Q(event_type=2) | Q(event_type=4))
            temp=[]
            for item in events:
                type=item.event_type
                if item.event_type==3:
                    type=2
                temp.append({"event_type": type,
                             "event_date": datetime.datetime.strftime(item.event_date, "%Y-%m-%d %H:%M:%S")})
            list = sorted(temp, key=operator.itemgetter('event_date'), reverse=True)
            eventList.append(list)

        return render(request,"statistic.html",{"old_name":json.dumps(old_name),"eventList":json.dumps(eventList)})

