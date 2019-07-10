'''
图像采集程序-人脸检测
'''
import argparse
import cv2
import dlib
from oldcare.facial import FaceUtil
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import os
import shutil
import time

#控制参数
error = 0
start_time = None
limit_time = 2   #2s

# #传入参数
# ap = argparse.ArgumentParser()
# ap.add_argument('-ic', '--id', required=True, help='')
# ap.add_argument('-id', '--imagedir', required=True, help='')
# args = vars(ap.parse_args())

action_list = ['blink', 'open_mouth', 'smile', 'rise_head', 'bow_head', 'look_left', 'look_right']
#action_map = {'blink':'眨眼', 'open_mouth':'张嘴', 'smile':'笑笑', 'rise_head':'抬头', 'bow_head':'低头', 'look_left':'向左看', 'look_right':'向右看'}
action_map = {'blink':'blink', 'open_mouth':'open_mouth', 'smile':'smile', 'rise_head':'rise_head', 'bow_head':'bow_head',
              'look_left':'look_left', 'look_right':'look_right'}

#设置摄像头
cam = cv2.VideoCapture(0)
cam.set(3,640)
cam.set(4,480)

faceutil = FaceUtil()

counter = 0
while True:
    counter+=1
    _, image = cam.read()
    if counter <= 10:
        continue
    image = cv2.flip(image, 1)

    if error == 1:
        end_time = time.time()
        difference = end_time - start_time
        print(difference)
        if difference >= limit_time:
            error = 0

    face_location_list = faceutil.get_face_location(image)
    for (top, right, bottom, left) in face_location_list:
        cv2.rectangle(image, (left, top), (right,bottom), (0,0,255), 2)

    cv2.imshow("capture", image)

    input = cv2.waitKey(100) & 0xFF
    if input == 27:
        break

    face_count = len(face_location_list)
    if error == 0 and face_count == 0:
        print('没有检测到人脸')
        error = 1
        start_time = time.time()
    elif error == 0 and face_count == 1:
        print('开始采集人脸图像')
        break
    elif error == 0 and face_count > 1:
        print('检测到多张人脸')
        error = 1
        start_time = time.time()
    else:
        pass

# #新建目录
# if os.path.exists(os.path.join(args['imagedir'],args['id'])):
#     shutil.rmtree(os.path.join(args['imagedir'],args['id']), True)
# os.mkdir(os.path.join(args['imagedir'],args['id']))

#开始采集人脸
for action in action_list:
    action_name = action_map[action]

    counter = 1
    for i in range(15):
        print('%s-%d' % (action_name, i))
        _, img_OpenCV = cam.read()
        img_OpenCV = cv2.flip(img_OpenCV, 1)
        origin_img = img_OpenCV.copy()  #保存时使用

        face_location_list = faceutil.get_face_location(img_OpenCV)
        for (top, right, bottom, left) in face_location_list:
            cv2.rectangle(img_OpenCV, (left, top), (right,bottom), (0,0,255), 2)

        img_PIL = Image.fromarray(cv2.cvtColor(img_OpenCV, cv2.COLOR_BGR2RGB))

        draw = ImageDraw.Draw(img_PIL)
        draw.text((int(image.shape[1]/2), 30), action_name, font=ImageFont.truetype('Symbola_hint.ttf', 40), fill=(255,0,0)) #linux

        # 转换为openCV格式
        img_OpenCV = cv2.cvtColor(np.asarray(img_PIL), cv2.COLOR_RGB2BGR)

        cv2.imshow('capture', img_OpenCV)

        image_name = os.path.join('/home/wangqifeng/PycharmProjects/Collect','old1', action+'_'+str(counter)+'.jpg')
        # image_name = os.path.join(args['imagedir'], args['id'], action + '_' + str(counter) + '.jpg')
        cv2.imwrite(image_name, origin_img)

        k = cv2.waitKey(100) & 0xFF
        if k == 27:
            break
        counter += 1

#结束
print('采集结束')
cam.release()
cv2.destroyAllWindows()