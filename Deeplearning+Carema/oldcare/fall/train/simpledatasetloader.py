import numpy as np
import cv2
import os

adjust_brightness = True


class SimpleDatasetLoader:
    def __init__(self, preprocessors=None):
        self.preprocessors = preprocessors
        if self.preprocessors is None:
            self.preprocessors = []

    def load(self, imagePaths, verbose=500, grayscale=False):
        data = []
        labels = []
        for (i, imagePath) in enumerate(imagePaths):
            image = cv2.imread(imagePath)
            if grayscale:
                image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            label = imagePath.split(os.path.sep)[-2]  # neg_images
            if self.preprocessors is not None:
                for p in self.preprocessors:
                    image = p.preprocess(image) # 重新设置大小
            data.append(image)
            labels.append(label)  # 存每张图片所在的文件夹名称，即类型
            if verbose > 0 and i > 0 and (i + 1) % verbose == 0:
                print("[INFO] processed {}/{}".format(i + 1,
                                              len(imagePaths)))
        return np.array(data), np.array(labels)

    def loadSingleImage(self, imagePath, verbose=500, grayscale=False):
        data = []
        labels = []

        image = cv2.imread(imagePath)
        rows = image.shape[0]
        cols = image.shape[1]
        img = image

        if adjust_brightness:
            a = 1.2
            b = 100
            for i in range(rows):
                for j in range(cols):
                    for c in range(3):
                        color = image[i, j][c] * a + b
                        if color > 255:
                            img[i, j][c] = 255
                        elif color < 0:
                            img[i, j][c] = 0
            image = img
        if grayscale:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        label = imagePath.split(os.path.sep)[-2]  # neg_images
        if self.preprocessors is not None:
            for p in self.preprocessors:
                image = p.preprocess(image)  # 重新设置大小
        data.append(image)
        labels.append(label)
        return np.array(data), np.array(labels)
