import cv2 as cv
import os
import math
import time

class PoseProcessor:
    def model_loader(self):
        net = cv.dnn.readNetFromTensorflow("oldcare/fall/graph_opt.pb")
        return net

    def calc(self,x1,y1, x2, y2):
        if abs(x2 - x1) > 3:
            l1 = x2 - x1
            l2 = y2 - y1
            tmp1 = l1 * 1 + 0 * l2
            tmp2 = math.sqrt(l1*l1 + l2*l2) * math.sqrt(2)
            radias = math.acos(tmp1 / tmp2)
            degree = math.degrees(radias)
            if degree < 70.0 or degree > 110.0:
                return True
            else:
                return False
        else:
            return False

    def createEvent(self, id, picname, timestamp):
        event = {
            'event_type': 3,
            'event_date': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp)),
            'event_location': 'BJTU',
            'event_desc': '老人摔倒了!',
            'oldperson_id': id,
            'pic_name': picname
        }
        return event

    def pose_estimater(self, id, picpath, picname, timestamp, thr=0.2, width=320, height=240):

        BODY_PARTS = { "Nose": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
                       "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
                       "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "REye": 14,
                       "LEye": 15, "REar": 16, "LEar": 17, "Background": 18 }

        POSE_PAIRS = [ ["Neck", "RShoulder"], ["Neck", "LShoulder"], ["RShoulder", "RElbow"],
                       ["RElbow", "RWrist"], ["LShoulder", "LElbow"], ["LElbow", "LWrist"],
                       ["Neck", "RHip"], ["RHip", "RKnee"], ["RKnee", "RAnkle"], ["Neck", "LHip"],
                       ["LHip", "LKnee"], ["LKnee", "LAnkle"], ["Neck", "Nose"], ["Nose", "REye"],
                       ["REye", "REar"], ["Nose", "LEye"], ["LEye", "LEar"] ]

        cap = cv.VideoCapture(picpath if picpath else 0)

        while cv.waitKey(1) < 0:
            hasFrame, frame = cap.read()
            if not hasFrame:
                cv.waitKey(1)
                break

            frameWidth = frame.shape[1]
            frameHeight = frame.shape[0]

            self.net.setInput(cv.dnn.blobFromImage(frame, 1.0, (width, height), (127.5, 127.5, 127.5), swapRB=True, crop=False))
            out = self.net.forward()
            out = out[:, :19, :, :]

            assert(len(BODY_PARTS) == out.shape[1])

            points = []
            for i in range(len(BODY_PARTS)):
                # Slice heatmap of corresponging body's part.
                heatMap = out[0, i, :, :]

                # Originally, we try to find all the local maximums. To simplify a sample
                # we just find a global one. However only a single pose at the same time
                # could be detected this way.
                _, conf, _, point = cv.minMaxLoc(heatMap)
                x = (frameWidth * point[0]) / out.shape[3]
                y = (frameHeight * point[1]) / out.shape[2]
                # Add a point if it's confidence is higher than threshold.
                points.append((int(x), int(y)) if conf > thr else None)

            for pair in POSE_PAIRS:
                partFrom = pair[0]
                partTo = pair[1]
                assert(partFrom in BODY_PARTS)
                assert(partTo in BODY_PARTS)

                idFrom = BODY_PARTS[partFrom]
                idTo = BODY_PARTS[partTo]

                if points[idFrom] and points[idTo]:
                    cv.line(frame, points[idFrom], points[idTo], (0, 255, 0), 3)
                    cv.ellipse(frame, points[idFrom], (3, 3), 0, 0, 360, (0, 0, 255), cv.FILLED)
                    cv.ellipse(frame, points[idTo], (3, 3), 0, 0, 360, (0, 0, 255), cv.FILLED)

            # 显示标注的图形在这里
            # cv.imshow('Pose Estimation', frame)

            is_l_leg = (points[13] is not None and points[12] is not None)
            is_r_leg = (points[10] is not None and points[9] is not None)
            if is_l_leg:
                if self.calc(points[12][0], points[12][1], points[13][0], points[13][1]):
                    print("摔倒了")
                    event = self.createEvent(id=id, picname=picname, timestamp=timestamp)
                    return event
                elif is_r_leg:
                    if self.calc(points[9][0], points[9][1], points[10][0], points[10][1]):
                        print("摔倒了")
                        event = self.createEvent(id=id, picname=picname, timestamp=timestamp)
                        return event
                    else:
                        print("正常的")
                        #return None
            elif is_r_leg:
                if self.calc(points[9][0], points[9][1], points[10][0], points[10][1]):
                    print("摔倒了")
                    event = self.createEvent(id=id, picname=picname, timestamp=timestamp)
                    return event
                else:
                    print("正常的")
                    #return None
            else:
                print("未识别到腿")
                #return None

    def __init__(self):
        self.net = self.model_loader()

'''
if __name__ == '__main__':
    pose_processor = PoseProcessor()
    image_path = os.path.join(os.path.abspath(os.path.join(os.getcwd(), "../..")) +
                              '/test_img/2/7.png')
    event = pose_processor.pose_estimater(input=image_path)
'''
