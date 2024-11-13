from pymongo import MongoClient
import os

# Replace with your MongoDB URI directly for testing purposes
MONGODB_URI="mongodb+srv://haseebjaved715:HNpNDoXwsnIXwFgf@cluster0.yxvzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try:
    client = MongoClient(MONGODB_URI)
    client.server_info()  # Test the connection
    print("Connected to MongoDB successfully!")
except Exception as e:
    print("Error connecting to MongoDB:", e)
