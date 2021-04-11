from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import wikipedia

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def data():
    content = request.json
    print(content)
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