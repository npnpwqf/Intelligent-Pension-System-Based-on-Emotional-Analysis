from django.db import models


class EmployeeInfo(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    org_id = models.IntegerField(db_column='ORG_ID', blank=True, null=True)  # Field name made lowercase.
    client_id = models.IntegerField(db_column='CLIENT_ID', blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(max_length=5, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    id_card = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateTimeField(blank=True, null=True)
    hire_date = models.DateTimeField(blank=True, null=True)
    description = models.CharField(db_column='DESCRIPTION', max_length=200, blank=True, null=True)  # Field name made lowercase.
    isactive = models.CharField(db_column='ISACTIVE', max_length=10, blank=True, null=True)  # Field name made lowercase.
    created = models.DateTimeField(db_column='CREATED', blank=True, null=True)  # Field name made lowercase.
    createby = models.IntegerField(db_column='CREATEBY', blank=True, null=True)  # Field name made lowercase.
    updated = models.DateTimeField(db_column='UPDATED', blank=True, null=True)  # Field name made lowercase.
    updateby = models.IntegerField(db_column='UPDATEBY', blank=True, null=True)  # Field name made lowercase.
    remove = models.CharField(db_column='REMOVE', max_length=1, blank=True, null=True)  # Field name made lowercase.
    imgset_dir = models.CharField(max_length=200, blank=True, null=True)
    profile_photo = models.CharField(max_length=200, blank=True, null=True)


    class Meta:
        db_table = 'employee_info'


class EventInfo(models.Model):
    event_type = models.IntegerField(blank=True, null=True)
    event_date = models.DateTimeField(blank=True, null=True)
    event_location = models.CharField(max_length=200, blank=True, null=True)
    event_desc = models.CharField(max_length=200, blank=True, null=True)
    oldperson_id = models.IntegerField(blank=True, null=True)
    pic_name = models.CharField(max_length=45, blank=True, null=True)
    isUpdate = models.IntegerField(null=False)#0为未通知，1为已通知

    class Meta:
        db_table = 'event_info'


class OldpersonInfo(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    org_id = models.IntegerField(db_column='ORG_ID', blank=True, null=True)  # Field name made lowercase.
    client_id = models.IntegerField(db_column='CLIENT_ID', blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(max_length=5, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    id_card = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateTimeField(blank=True, null=True)
    checkin_date = models.DateTimeField(blank=True, null=True)
    checkout_date = models.DateTimeField(blank=True, null=True)
    imgset_dir = models.CharField(max_length=200, blank=True, null=True)
    profile_photo = models.CharField(max_length=200, blank=True, null=True)
    room_number = models.CharField(max_length=50, blank=True, null=True)
    firstguardian_name = models.CharField(max_length=50, blank=True, null=True)
    firstguardian_relationship = models.CharField(max_length=50, blank=True, null=True)
    firstguardian_phone = models.CharField(max_length=50, blank=True, null=True)
    firstguardian_wechat = models.CharField(max_length=50, blank=True, null=True)
    secondguardian_name = models.CharField(max_length=50, blank=True, null=True)
    secondguardian_relationship = models.CharField(max_length=50, blank=True, null=True)
    secondguardian_phone = models.CharField(max_length=50, blank=True, null=True)
    isactive = models.CharField(db_column='ISACTIVE', max_length=10, blank=True, null=True)  # Field name made lowercase.
    created = models.DateTimeField(db_column='CREATED', blank=True, null=True)  # Field name made lowercase.
    createby = models.IntegerField(db_column='CREATEBY', blank=True, null=True)  # Field name made lowercase.
    updated = models.DateTimeField(db_column='UPDATED', blank=True, null=True)  # Field name made lowercase.
    updateby = models.IntegerField(db_column='UPDATEBY', blank=True, null=True)  # Field name made lowercase.
    remove = models.CharField(db_column='REMOVE', max_length=1, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'oldperson_info'


class SysUser(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    org_id = models.IntegerField(db_column='ORG_ID')  # Field name made lowercase.
    client_id = models.IntegerField(db_column='CLIENT_ID')  # Field name made lowercase.
    username = models.CharField(db_column='UserName', max_length=50)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=50, blank=True, null=True)  # Field name made lowercase.
    real_name = models.CharField(db_column='REAL_NAME', max_length=50, blank=True, null=True)  # Field name made lowercase.
    sex = models.CharField(db_column='SEX', max_length=20, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='EMAIL', max_length=50, blank=True, null=True)  # Field name made lowercase.
    phone = models.CharField(db_column='PHONE', max_length=50, blank=True, null=True)  # Field name made lowercase.
    mobile = models.CharField(db_column='MOBILE', max_length=50, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='DESCRIPTION', max_length=200, blank=True, null=True)  # Field name made lowercase.
    isactive = models.CharField(db_column='ISACTIVE', max_length=10, blank=True, null=True)  # Field name made lowercase.
    created = models.DateTimeField(db_column='CREATED', blank=True, null=True)  # Field name made lowercase.
    createby = models.IntegerField(db_column='CREATEBY', blank=True, null=True)  # Field name made lowercase.
    updated = models.DateTimeField(db_column='UPDATED', blank=True, null=True)  # Field name made lowercase.
    updateby = models.IntegerField(db_column='UPDATEBY', blank=True, null=True)  # Field name made lowercase.
    remove = models.CharField(db_column='REMOVE', max_length=1, blank=True, null=True)  # Field name made lowercase.
    datafilter = models.CharField(db_column='DATAFILTER', max_length=200, blank=True, null=True)  # Field name made lowercase.
    theme = models.CharField(max_length=45, blank=True, null=True)
    defaultpage = models.CharField(max_length=45, blank=True, null=True)
    logoimage = models.CharField(max_length=45, blank=True, null=True)
    qqopenid = models.CharField(max_length=100, blank=True, null=True)
    appversion = models.CharField(max_length=10, blank=True, null=True)
    jsonauth = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:

        db_table = 'sys_user'


class VolunteerInfo(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    org_id = models.IntegerField(db_column='ORG_ID', blank=True, null=True)  # Field name made lowercase.
    client_id = models.IntegerField(db_column='CLIENT_ID', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(max_length=5, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    id_card = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateTimeField(blank=True, null=True)
    checkin_date = models.DateTimeField(blank=True, null=True)
    checkout_date = models.DateTimeField(blank=True, null=True)
    isactive = models.CharField(db_column='ISACTIVE', max_length=10, blank=True, null=True)  # Field name made lowercase.
    created = models.DateTimeField(db_column='CREATED', blank=True, null=True)  # Field name made lowercase.
    createby = models.IntegerField(db_column='CREATEBY', blank=True, null=True)  # Field name made lowercase.
    updated = models.DateTimeField(db_column='UPDATED', blank=True, null=True)  # Field name made lowercase.
    updateby = models.IntegerField(db_column='UPDATEBY', blank=True, null=True)  # Field name made lowercase.
    remove = models.CharField(db_column='REMOVE', max_length=1, blank=True, null=True)  # Field name made lowercase.
    imgset_dir = models.CharField(max_length=200, blank=True, null=True)
    profile_photo = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'volunteer_info'
