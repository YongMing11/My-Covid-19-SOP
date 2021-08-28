from google.cloud import speech
from google.cloud import storage
import os
import tempfile
from werkzeug.utils import secure_filename
from flask import jsonify
# Import the base64 encoding library.
import base64
from flask import Flask, request
from flask import Response

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main(request):
    print('FUck')
    r = Response(response="TEST OK", status=200, mimetype="application/xml")
    r.headers["Content-Type"] = "text/xml; charset=utf-8"
    return r
    # upload_blob('ozone-audio-17263', './work.m4a', 'test.m4a')

# Pass the audio data to an encoding function.
def encode_audio(audio_content):
#   audio_content = audio.read()
  return base64.b64encode(audio_content)

# Helper function that computes the filepath to save files to
def get_file_path(filename):
    # Note: tempfile.gettempdir() points to an in-memory file system
    # on GCF. Thus, any files in it must fit in the instance's memory.
    file_name = secure_filename(filename)
    return os.path.join(tempfile.gettempdir(), file_name)

def parse_multipart(request):
    print('v45')
    """ Parses a 'multipart/form-data' upload request
    Args:
        request (flask.Request): The request object.
    Returns:
        The response text, or any set of values that can be turned into a
         Response object using `make_response`
        <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.
    """
    print("GANINE")
    print("request",request.form)
    print("request",request.data)
    print("request",request.files['file'])
    # request.files['file'].save('./haha12200.amr')
    request.files['file'].save('./haha12200.m4a')
    print("request",dir(request))
    return "OK"
    content_type = request.headers['content-type']
    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        print('The request is application/json')
    print('content-type is',content_type)
    # return speech_to_text(request.data)
    file_content = encode_audio(request.data)

    client = speech.SpeechClient()

    # audio = speech.RecognitionAudio(uri=gcs_uri)
    print('below is the content of the file')
    print(file_content)

    audio = speech.RecognitionAudio(content=file_content)

    config = speech.RecognitionConfig(
        # encoding=speech.RecognitionConfig.AudioEncoding.AMR,
        # sample_rate_hertz=8000,
        language_code="en-US",
        # audio_channel_count=1,
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    print('get the response')

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
    return str(response.results)

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )
