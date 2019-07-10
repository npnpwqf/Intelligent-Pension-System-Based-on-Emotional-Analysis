from datetime import datetime,date, timedelta
import time
from django.http import HttpResponse, request
from django.shortcuts import render, redirect

from django.views.decorators.csrf import csrf_exempt
from account_app import models


# 添加老人信息
@csrf_exempt
def addinfo_old(request):
    if request.method == "POST":
        name_old = request.POST.get('name_old')
        gender_old = request.POST.get('gender_old')
        phone_old = request.POST.get('phone_old')
        id_card_old = request.POST.get('id_card_old')
        birthday_old = request.POST.get('birthday_old')
        file_img_old=request.FILES.get('img_old')
        # 构造文件名及文件路径
        img_name_old='./static/img/'+name_old+'_'+str(int(time.time()))+'.'+file_img_old.name.split('.')[-1]
        if file_img_old.name.split('.')[-1] not in ['jpeg','jpg','png']:
            return HttpResponse('输入文件有误')
        print("测试上传的文件", request.FILES)
        models.OldpersonInfo.objects.create(username=name_old, gender=gender_old,
                                            phone=phone_old, id_card=id_card_old, birthday=birthday_old,
                                            imgset_dir=img_name_old[1:],
                                            remove='0'),
        with open(img_name_old, 'wb+') as f:
            f.write(file_img_old.read())

    return redirect('/getinfo_old')


# 添加工作人员信息
@csrf_exempt
def addinfo_emp(request):
    if request.method == "POST":
        name_emp = request.POST.get('name_emp')
        gender_emp = request.POST.get('gender_emp')
        phone_emp = request.POST.get('phone_emp')
        id_card_emp = request.POST.get('id_card_emp')
        birthday_emp = request.POST.get('birthday_emp')
        file_img_emp=request.FILES.get('img_emp')
        # 构造文件名及文件路径
        img_name_emp='./static/img/'+name_emp+'_'+str(int(time.time()))+'.'+file_img_emp.name.split('.')[-1]
        if file_img_emp.name.split('.')[-1] not in ['jpeg','jpg','png']:
            return HttpResponse('输入文件有误')
        models.EmployeeInfo.objects.create(username=name_emp, gender=gender_emp,
                                            phone=phone_emp, id_card=id_card_emp, birthday=birthday_emp,
                                            imgset_dir=img_name_emp[1:],
                                            remove='0'),
        with open(img_name_emp, 'wb+') as f:
            f.write(file_img_emp.read())
    return redirect('/getinfo_old')


# 添加义工信息
@csrf_exempt
def addinfo_vol(request):
    if request.method == "POST":
        name_vol = request.POST.get('name_vol')
        gender_vol = request.POST.get('gender_vol')
        phone_vol = request.POST.get('phone_vol')
        id_card_vol = request.POST.get('id_card_vol')
        birthday_vol = request.POST.get('birthday_vol')
        file_img_vol = request.FILES.get('img_vol')
        # 构造文件名及文件路径
        img_name_vol = './static/img/' + name_vol + '_' + str(int(time.time())) + '.' + file_img_vol.name.split('.')[-1]
        if file_img_vol.name.split('.')[-1] not in ['jpeg', 'jpg', 'png']:
            return HttpResponse('输入文件有误')
        models.VolunteerInfo.objects.create(name=name_vol, gender=gender_vol,
                                            phone=phone_vol, id_card=id_card_vol, birthday=birthday_vol,
                                            imgset_dir=img_name_vol[1:],
                                            remove='0'),
    return redirect('/getinfo_old')


# 储存更改后的老人信息
@csrf_exempt
def saveNewInfo_old(request):
    if request.method == "POST":
        id_old = request.POST.get('id_old')
        name_old = request.POST.get('name_old')
        gender_old = request.POST.get('gender_old')
        phone_old = request.POST.get('phone_old')
        id_card_old = request.POST.get('id_card_old')
        birthday_old = request.POST.get('birthday_old')
        file_img_old = request.FILES.get('img_old')
        # 构造文件名及文件路径
        img_name_old = './static/img/' + name_old + '_' + str(int(time.time())) + '.' + file_img_old.name.split('.')[-1]
        if file_img_old.name.split('.')[-1] not in ['jpeg', 'jpg', 'png']:
            return HttpResponse('输入文件有误')
        models.OldpersonInfo.objects.filter(id=id_old).update(username=name_old, gender=gender_old,
                                                              phone=phone_old, id_card=id_card_old,
                                                              birthday=birthday_old,
                                                              imgset_dir=img_name_old[1:]),
        with open(img_name_old, 'wb+') as f:
            f.write(file_img_old.read())

        return redirect('getinfo_old')
    # id总是get不到，好奇怪


# 储存更改后的工作人员信息
@csrf_exempt
def saveNewInfo_emp(request):
    if request.method == "POST":
        id_emp = request.POST.get('id_emp')
        name_emp = request.POST.get('name_emp')
        gender_emp = request.POST.get('gender_emp')
        phone_emp = request.POST.get('phone_emp')
        id_card_emp = request.POST.get('id_card_emp')
        birthday_emp = request.POST.get('birthday_emp')
        file_img_emp = request.FILES.get('img_emp')
        # 构造文件名及文件路径
        img_name_emp = './static/img/' + name_emp + '_' + str(int(time.time())) + '.' + file_img_emp.name.split('.')[-1]
        if file_img_emp.name.split('.')[-1] not in ['jpeg', 'jpg', 'png']:
            return HttpResponse('输入文件有误')
        models.EmployeeInfo.objects.filter(id=id_emp).update(username=name_emp, gender=gender_emp,
                                                             phone=phone_emp, id_card=id_card_emp,
                                                             birthday=birthday_emp,
                                                             imgset_dir=img_name_emp[1:]),
        with open(img_name_emp, 'wb+') as f:
            f.write(file_img_emp.read())
        return redirect('getinfo_old')


# 储存更改后的义工信息
@csrf_exempt
def saveNewInfo_vol(request):
    if request.method == "POST":
        id_vol = request.POST.get('id_vol')
        name_vol = request.POST.get('name_vol')
        gender_vol = request.POST.get('gender_vol')
        phone_vol = request.POST.get('phone_vol')
        id_card_vol = request.POST.get('id_card_vol')
        birthday_vol = request.POST.get('birthday_vol')
        file_img_vol = request.FILES.get('img_vol')
        # 构造文件名及文件路径
        img_name_vol = './static/img/' + name_vol + '_' + str(int(time.time())) + '.' + file_img_vol.name.split('.')[-1]
        if file_img_vol.name.split('.')[-1] not in ['jpeg', 'jpg', 'png']:
            return HttpResponse('输入文件有误')
        models.VolunteerInfo.objects.filter(id=id_vol).update(name=name_vol, gender=gender_vol,
                                                              phone=phone_vol, id_card=id_card_vol,
                                                              birthday=birthday_vol,
                                                              imgset_dir=img_name_vol[1:]),
        with open(img_name_vol, 'wb+') as f:
            f.write(file_img_vol.read())
        return redirect('getinfo_old')


# 储存更改后的系统管理员信息
@csrf_exempt
def saveNewInfo_sys(request):
    if request.method == "POST":
        id_sys = request.POST.get('id_sys')
        pwd_sys=request.POST.get('pwd_sys')
        name_sys = request.POST.get('name_sys')
        gender_sys = request.POST.get('gender_sys')
        phone_sys = request.POST.get('phone_sys')
        file_img_sys = request.FILES.get('img_sys')
        # 构造文件名及文件路径
        img_name_sys = './static/img/' + name_sys + '_' + str(int(time.time())) + '.' + file_img_sys.name.split('.')[-1]
        if file_img_sys.name.split('.')[-1] not in ['jpeg', 'jpg', 'png']:
            return HttpResponse('输入文件有误')
        models.SysUser.objects.filter(id=id_sys).update(username=name_sys, password=pwd_sys,sex=gender_sys,
                                                        phone=phone_sys, logoimage=img_name_sys[1:]),
        with open(img_name_sys, 'wb+') as f:
            f.write(file_img_sys.read())
        return redirect('/update_sys')


# 获取要修改的系统管理员id发送给updatePage函数
@csrf_exempt
def update_sys(request):
    if request.method == "GET":
        id_sys=request.session['sys_id']
        print("看下id格式",id_sys)
        sys= models.SysUser.objects.filter(id=id_sys)
        print("看下管理员信息", sys)
        sysuser=sys[0]
        print("看下管理员信息", sysuser.id,sysuser.username, sysuser.password)
        return render(request, "update_sys.html", {
            "sysUser": sysuser,
        })
    # notes:要传单个的对象才能直接在html里后面.属性，如果传list还需要for item in List才能获取对象


# 获取要修改的老人id发送给updatePage函数
@csrf_exempt
def update_old(request, id):
    if request.method == "GET":
        old = models.OldpersonInfo.objects.filter(id=id[1:-1])
        oldperson = old[0]
        return render(request, "update.html", {
            "oldpersonInfo": oldperson,
        })
    # notes:要传单个的对象才能直接在html里后面.属性，如果传list还需要for item in List才能获取对象


# 获取要修改的工作人员id发送给updatePage函数
@csrf_exempt
def update_emp(request, id):
    if request.method == "GET":
        emp = models.EmployeeInfo.objects.filter(id=id[1:-1])
        employee = emp[0]
        return render(request, "update_emp.html", {
            "employeeInfo": employee,
        })
    # notes:要传单个的对象才能直接在html里后面.属性，如果传list还需要for item in List才能获取对象


# 获取要修改的义工id发送给updatePage函数
@csrf_exempt
def update_vol(request, id):
    if request.method == "GET":
        vol = models.VolunteerInfo.objects.filter(id=id[1:-1])
        volun = vol[0]
        return render(request, "update_vol.html", {
            "volunteerInfo": volun,
        })
    # notes:要传单个的对象才能直接在html里后面.属性，如果传list还需要for item in List才能获取对象


# 删除老人信息
@csrf_exempt
def delOld(request, id):
    if request.method == "GET":
        old = models.OldpersonInfo.objects.filter(id=id[1:-1])
        oldperson = old[0]
        oldperson.remove = '1'
        oldperson.save()
    return redirect('/getinfo_old')


# 删除工作人员信息
@csrf_exempt
def del_emp(request, id):
    if request.method == "GET":
        emp = models.EmployeeInfo.objects.filter(id=id[1:-1])
        employee = emp[0]
        employee.remove = '1'
        employee.save()
    return redirect('/getinfo_old')


# 删除义工信息
@csrf_exempt
def del_vol(request, id):
    if request.method == "GET":
        vol = models.VolunteerInfo.objects.filter(id=id[1:-1])
        volun = vol[0]
        volun.remove = '1'
        volun.save()
    return redirect('/getinfo_old')


# 查询老人信息
@csrf_exempt
def search_old(request):
    if request.method == "GET":
        old_name_search = request.GET.get('keyword')
        error_msg = ''

        if not old_name_search:
            error_msg = '请输入关键词'
            print(error_msg)
            return render(request, 'table.html', {'error_msg': error_msg})

        old_list = models.OldpersonInfo.objects.filter(username__icontains=old_name_search)

        employList = models.EmployeeInfo.objects.filter(remove='0')
        volunteerList = models.VolunteerInfo.objects.filter(remove='0')

        return render(request, 'table.html', {'error_msg': error_msg,
                                              'oldpersonInfo': old_list,
                                              'volunteerInfo': volunteerList,
                                              "employeeInfo": employList,
                                              })


# 查询工作人员信息
@csrf_exempt
def search_emp(request):
    if request.method == "GET":
        emp_name_search = request.GET.get('keyword_emp')
        error_msg = ''

        if not emp_name_search:
            error_msg = '请输入关键词'
            print(error_msg)
            return render(request, 'table.html', {'error_msg': error_msg})
        emp_list = models.EmployeeInfo.objects.filter(username__icontains=emp_name_search)
        oldList = models.OldpersonInfo.objects.filter(remove='0')
        volunteerList = models.VolunteerInfo.objects.filter(remove='0')

        return render(request, 'table.html', {'error_msg': error_msg,
                                              'employeeInfo': emp_list,
                                              "oldpersonInfo": oldList,
                                              "volunteerInfo": volunteerList,
                                              })


# 查询义工信息
@csrf_exempt
def search_vol(request):
    if request.method == "GET":
        vol_name_search = request.GET.get('keyword_vol')
        error_msg = ''

        if not vol_name_search:
            error_msg = '请输入关键词'
            print(error_msg)
            return render(request, 'table.html', {'error_msg': error_msg})

        vol_list = models.VolunteerInfo.objects.filter(name__icontains=vol_name_search)

        oldList = models.OldpersonInfo.objects.filter(remove='0')
        employList = models.EmployeeInfo.objects.filter(remove='0')

        return render(request, 'table.html', {'error_msg': error_msg,
                                              'volunteerInfo': vol_list,
                                              "oldpersonInfo": oldList,
                                              "employeeInfo": employList,
                                              })


# 加载数据到table页面
@csrf_exempt
def getinfo_old(request):
    if request.method == "GET":
        oldList = models.OldpersonInfo.objects.filter(remove='0')
        employList = models.EmployeeInfo.objects.filter(remove='0')
        volunteerList = models.VolunteerInfo.objects.filter(remove='0')
        return render(request, "table.html", {
            "oldpersonInfo": oldList,
            "employeeInfo": employList,
            "volunteerInfo": volunteerList,
        })


# 跳转到添加人员的界面
@csrf_exempt
def info_old(request):
    return render(request, 'info.html')


def info_emp(request):
    return render(request, 'info_emp.html')


def info_vol(request):
    return render(request, 'info_vol.html')



