# Part of data upload/update
# HOW TO USE: 
# Download this file as csv:  https://docs.google.com/spreadsheets/d/12_qQTidWdyNIkAeL7P2KQ0Lct2AjUea9YapM95HApSU/edit?usp=sharing 
# Rename downloaded file to sheet.csv
# Delete any sheet.csv and procedures.json files from DataUpload folder 
# Copy sheet.csv into DataUpload folder
# Run this script by doing: cd DataUpload; python ToJson.py

import pandas as pd 
import json 

df = pd.read_csv("sheet.csv")
df = df.fillna("")                          # Use "" for empty fields
json_data = df.to_dict(orient="records")    # convert to json 

with open("procedures.json", "w") as f: 
    json.dump(json_data, f, indent=4)