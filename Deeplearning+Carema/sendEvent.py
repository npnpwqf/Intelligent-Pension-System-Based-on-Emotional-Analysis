import requests
import json


def postMsg(msg, pic):

    files = {('images', (pic, open(pic, 'rb'), 'image/jpg'))}

    msg_url = 'http://172.20.10.10:8080/sendMsg/'
    pic_url = 'http://172.20.10.10:8080/sendPic/'

    requests1 = requests.post(msg_url, data=json.dumps(msg))
    print(requests1.content)
    requests2 = requests.post(pic_url, files=files)
    print(requests2.content)
