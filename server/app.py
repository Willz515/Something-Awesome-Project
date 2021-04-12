from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import wikipedia
import os
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app)

urls = []

def makeNotes(newPath, content):
    if content["url"] not in urls:
        urls.append(content["url"])
    index = urls.index(content["url"])
    filename = str(index) + ".txt"
    filenameTime = str(index) + "time" + ".txt"
    pathName = newPath + "/" + filename
    pathNameTime = newPath + "/" + filenameTime

    if (os.path.exists(pathName) == False):
        f = open(pathName, "w")
        f.write(f'{content["url"]}\n')
        f.close()

    if (os.path.exists(pathNameTime) == False):
        f = open(pathNameTime, "w")
        f.write(f'{content["url"]}\n')
        f.close()

    key = next(iter(content["logs"]))

    f = open(pathNameTime, 'a+')
    f.write(f'{content["logs"][key]} (time: {key})\n') 
    f.close()



    f = open(pathName, 'a+')
    f.write(f'{content["logs"][key]}') 
    f.close()
    return

def createFolder(path, content):
    newPath = path + "/" + urlparse(content["url"]).netloc
    if (os.path.exists(newPath) == False):
        os.mkdir(newPath)
    return newPath



@app.route('/', methods=['GET', 'POST'])
def data():
    ipAddress = request.remote_addr
    content = request.json
    print(content, ipAddress)
    path = "./server/" + ipAddress
    if (os.path.exists(path) == False):
        os.mkdir(path)
    newPath = createFolder(path, content)
    makeNotes(newPath, content)
    return "Ok!"

@app.route('/wiki', methods=['GET', 'POST'])
def wiki():
    searchTerm = request.args.get('topic')
    print('topic: ', searchTerm)

    data = {
        'summary': wikipedia.summary(searchTerm, sentences=1),
        'raw': 'Successful',
    }

    print('json data to be sent: ', data)

    return data

if __name__ == '__main__':
    app.run(port = 5002)