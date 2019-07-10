from django.shortcuts import render,redirect
from account_app import models
from django.views.decorators.csrf import csrf_exempt
global count
count=0
from account_app.homepage import singleton
@csrf_exempt
def protect(request):
    if request.session.get('is_login', None):
        return redirect('/homepage')
    else:
       return  redirect('/login')

@csrf_exempt
def logout(request):
    if request.session.get('is_login', None):
        request.session.flush()
        return render(request, 'index.html')
    else:
        return render(request, 'index.html')

@csrf_exempt
def login(request):
    if request.method == 'POST':
        id =request.POST['id']
        password = request.POST['password']
        if models.SysUser.objects.filter(id=id):
            person = models.SysUser.objects.get(id=id)
            if person.password == password:
                if request.session.get('is_login', None):
                    return render(request, 'page-blog-list.html', {'mes1': "You have already been login."})
                request.session['sys_id'] = id
                # request.session['username'] = "manager"
                request.session['is_login'] = True

                return redirect('/homepage')
            else:
                return render(request, 'index.html', {'mes1': "password is invalid."})
        else:
            return render(request, 'index.html', {'mes1': "id not found."})
    singleton.Singleton()
    return render(request, 'index.html')