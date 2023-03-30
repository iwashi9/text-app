# app.py
import logging

from flask import Flask, Response, request, jsonify, make_response
from flask_cors import CORS, cross_origin

origin = "https://main--sensational-yeot-3009fc.netlify.app/"

app = Flask(__name__)
CORS(app, resources={"/api/*": {"origins": origin}}, supports_credentials=True)
app.config['CORS_HEADERS'] = "Content-Type"

def process_text(text):
    return f"Text \"{text}\" is processed by backend!"

@app.route('/api/send-text', methods=['OPTIONS'])
def options_preflight():
    print("Preflight Request")
    response = Response(status=200)
    response.headers.add('Access-Control-Allow-Origin', origin)
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
    response.headers.add('Access-Control-Allow-Origin', origin)
    response.headers.add('Vary', 'Origin')
    return response

if __name__ == '__main__':
    app.run(debug=True)
