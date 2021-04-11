from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def data():
    content = request.json
    print(content)
    return "Ok!"

if __name__ == '__main__':
    app.run(port = 5001)