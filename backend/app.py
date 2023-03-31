# app.py
import logging

from flask import Flask, Response, request, jsonify, make_response
from flask_cors import CORS, cross_origin

allowed_origin = [
    "https://sensational-yeot-3009fc.netlify.app",
    "https://main--sensational-yeot-3009fc.netlify.app",
    "http://localhost:3000"
]

app = Flask(__name__)
app.config['CORS_HEADERS'] = "Content-Type"

def process_text(text):
    return f"Text \"{text}\" is processed by backend!"

@app.route('/api/send-text', methods=['OPTIONS'])
def options_preflight():
    print("Preflight Request")
    response = Response(status=200)
    if request.origin in allowed_origin:
        response.headers.add('Access-Control-Allow-Origin', request.origin)
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
    text = process_text(text)
    response = jsonify(**{'text': text})
    response.status = 200
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    if request.origin in allowed_origin:
        response.headers.add('Access-Control-Allow-Origin', request.origin)
    response.headers.add('Vary', 'Origin')
    return response

if __name__ == '__main__':
    app.run(debug=True)
