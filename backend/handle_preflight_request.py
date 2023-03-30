# manually handle preflight request
import logging

from flask import Flask, Response, request, jsonify, make_response

app = Flask(__name__)

@app.route('/api/send-text', methods=['OPTIONS'])
def options_preflight():
    response = Response(status=200)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'content-type')
    response.headers.add('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Allow', 'OPTIONS, POST')
    response.headers.add('Vary', 'Origin')
    return response

@app.route('/api/send-text', methods=['POST'])
def post_text():
    text = request.json['text']
    print("Received text:", text)
    response = jsonify(**{'text': text})
    response.status = 200
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Vary', 'Origin')
    return response

if __name__ == '__main__':
    app.run(debug=True)
