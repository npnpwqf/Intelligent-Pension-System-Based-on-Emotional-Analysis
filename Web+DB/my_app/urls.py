"""my_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('account_app/', include('account_app.urls'))
"""
from django.conf.urls import url
from account_app.Login import login_views
from account_app.homepage import homepage_views
from django.urls import path, re_path

from django.conf import settings
from django.conf.urls.static import static
from account_app.event import event_views
from account_app.statistics import statistic_views
from account_app.management import views_aq


urlpatterns = [
       url(r'^$', login_views.protect),
       url(r'^login$', login_views.login),
       url(r'^logout$', login_views.logout),
       url(r'^getEvent$', event_views.get_event),
       url(r'^homepage$', homepage_views.homepage),
       url(r'^update$', homepage_views.update),
       url(r'^video_feed$', homepage_views.video_feed, name='video_feed'),
       url(r'^video_feed2$', homepage_views.video_feed2, name='video_feed2'),
       url(r'^sendMsg/$', event_views.getMsg),
       url(r'^sendPic/$', event_views.getPic),
       #url(r'^managePerson/$', event_views.getMsg),
       url(r'^statistic$', statistic_views.statistics),
       url(r'^eventRecord$', event_views.eventDetail),

       url(r'^getinfo_old$', views_aq.getinfo_old, name='getinfo_old'),

    # 系统管理员信息修改


    path('update_sys', views_aq.update_sys, name='update_sys'),
    url(r'^saveNewInfo_sys$', views_aq.saveNewInfo_sys, name='saveNewInfo_sys'),

    # 老人信息管理
    url(r'^info_old$', views_aq.info_old, name='info_old'),
    url(r'^addinfo_old$', views_aq.addinfo_old, name='addinfo_old'),
    url(r'^search_old$', views_aq.search_old, name='search_old'),
    url(r'^saveNewInfo_old$', views_aq.saveNewInfo_old, name='saveNewInfo_old'),
    path('delOld/<id>', views_aq.delOld, name='delOld'),
    path('update_old/<id>', views_aq.update_old, name='update_old'),

    # 工作人员信息管理
    url(r'^info_emp$', views_aq.info_emp, name='info_emp'),
    url(r'^addinfo_emp$', views_aq.addinfo_emp, name='addinfo_emp'),
    url(r'^search_emp$', views_aq.search_emp, name='search_emp'),
    url(r'^saveNewInfo_emp$', views_aq.saveNewInfo_emp, name='saveNewInfo_emp'),
    path('del_emp/<id>', views_aq.del_emp, name='del_emp'),
    path('update_emp/<id>', views_aq.update_emp, name='update_emp'),

    # 义工信息管理
    url(r'^info_vol$', views_aq.info_vol, name='info_vol'),
    url(r'^addinfo_vol$', views_aq.addinfo_vol, name='addinfo_vol'),
    url(r'^search_vol$', views_aq.search_vol, name='search_vol'),
    url(r'^saveNewInfo_vol$', views_aq.saveNewInfo_vol, name='saveNewInfo_vol'),
    path('del_vol/<id>', views_aq.del_vol, name='del_vol'),
    path('update_vol/<id>', views_aq.update_vol, name='update_vol'),


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)