import pickle
import sys
import pandas as pd
import numpy as np

def load_model():
    with open('house_model_rfht.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    return model

def predict_house_price(location, size, propertyStatus, sellerType, bedrooms, propertyType):
    model = load_model()
    columns = ['location', 'area_size', 'status', 'seller', 'BHK', 'Type']
    li = np.array([[location, size, propertyStatus, sellerType, bedrooms, propertyType]])
    df = pd.DataFrame(li, columns=columns)
    prediction = model.predict(df)
    print(prediction[0])
    return prediction[0]

if __name__ == '__main__':
    location = sys.argv[1]
    bedrooms = sys.argv[2]
    size = sys.argv[3]
    propertyType = sys.argv[4]
    sellerType = sys.argv[5]
    propertyStatus = sys.argv[6]
    predicted_price = predict_house_price(location, size, propertyStatus, sellerType, bedrooms, propertyType)
    print(predicted_price)