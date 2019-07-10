import time
import cv2


def convertFrame(frame):
    r = 750.0 / frame.shape[1]
    dim = (750, int(frame.shape[0] * r))
    frame = cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    if useGaussian:
        gray = cv2.GaussianBlur(gray, (gaussianPixels, gaussianPixels), 0)
    return frame, gray


# Video or camera
camera = cv2.VideoCapture(0)
'''
camera = cv2.VideoCapture("test.mp4")
time.sleep(1.0)
'''
firstFrame = None
start = time.time()
i = 0
lastH = [0] * 100
lastW = [0] * 100

# Detect parameters
minArea = 30 * 30
thresholdLimit = 20
dilationPixels = 10  # 10
useGaussian = 1
gaussianPixels = 31
j = 0

# loop for each frame in video
while 1:
    detectStatus = "Empty"

    grabbed, frame = camera.read()

    # eof
    if not grabbed:
        break

    frame, gray = convertFrame(frame)

    # firstFrame (this should updated every time light conditions change)
    if firstFrame is None:
        time.sleep(1.0)  # let camera autofocus + autosaturation settle
        grabbed, frame = camera.read()
        frame, gray = convertFrame(frame)
        firstFrame = gray
        continue

    # difference between the current frame and firstFrame
    frameDelta = cv2.absdiff(firstFrame, gray)
    thresh = cv2.threshold(frameDelta, thresholdLimit, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.dilate(thresh, None, iterations=dilationPixels)  # dilate thresh
    contours, _ = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # find contours

    if contours:

        # list to hold all areas
        areas = []

        for contour in contours:
            ar = cv2.contourArea(contour)
            areas.append(ar)

        max_area = max(areas, default = 0)

        # index of the list of elements with the largest area
        max_area_index = areas.index(max_area)

        #largest area contour
        cnt = contours[max_area_index]

        # M = cv2.movements(cnt)
        x,y,w,h = cv2.boundingRect(cnt)

        print ("w= ", w," h=  ",h)

        cv2.drawContours(frameDelta, [cnt], 0, (255,255,0), 3) #, maxLevel = 0)
        if h < w:
            j+=1

            if j > 10:
                print ("FALL")
                cv2.putText(frameDelta, 'FALL', (x, y),cv2.FONT_HERSHEY_TRIPLEX, 0.5, (255,255,255), 2)

                if  h > w:
                    j=0

        cv2.imshow("fgmask", frameDelta)
        cv2.waitKey(0)


