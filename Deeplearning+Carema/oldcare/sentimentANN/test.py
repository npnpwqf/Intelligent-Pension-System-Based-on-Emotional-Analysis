from keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from oldcare.sentimentANN import SimpleDatasetLoader
from oldcare.sentimentANN.processing import SimplePreprocessor
from keras.models import Sequential
from keras.layers.core import Dense

sp = SimplePreprocessor(28, 28)   # 28  28  3
sdl = SimpleDatasetLoader(preprocessors=[sp])
# dataset_path = "D:\\project\\last_term\\OldAgeCare_ComputerVision\\OldAgeCare_ComputerVision\\test\\8.jpg"
dataset_path = "D:\\PycharmProjects\\OldAgeCare_ComputerVision\\test\\neural.jpg"
(X, y) = sdl.loadSingleImage(dataset_path, verbose=500, grayscale=True)

model = Sequential()
model.add(Dense(1024,
                input_shape=(28 * 28,),
                activation="relu"))
model.add(Dense(512, activation="relu"))
model.add(Dense(7, activation="softmax"))

X = X.reshape((X.shape[0], 28 * 28))
X = X.astype("float") / 255.0  # 特征缩放，是非常重要的步骤
le = LabelEncoder()  # 0:2  分两类
y = to_categorical(le.fit_transform(y), 7)   # 0：54  0：2  表明属于哪一类

model.load_weights("../../models/face_expression.hdf5")

motionValue = model.predict(X)  #a[0][1]是第一个情绪的值  a[0][2]是第二个情绪的值
motionMax = max(motionValue[0])
motionList = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
for i in range(7):
    if motionMax == motionValue[0][i]:
        print("是第", i+1, "种情感：", motionList[i])
        break


