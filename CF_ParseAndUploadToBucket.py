from google.cloud import speech
import os
import tempfile
from werkzeug.utils import secure_filename
from flask import jsonify
# Import the base64 encoding library.
import base64
from google.cloud import storage
from google.cloud.storage import Blob

def upload_blob(my_file):
    client = storage.Client(project="meowmeow-280110")
    bucket = client.get_bucket("ozone-audio-17263")
    blob = Blob("secure-data", bucket)
    blob.upload_from_file(my_file)

# Pass the audio data to an encoding function.
def encode_audio(audio_content):
#   audio_content = audio.read()
  return base64.b64encode(audio_content)

def parse_multipart(request):
    print('v45')
    content_type = request.headers['content-type']
    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        print('The request is application/json')
    print('content-type is',content_type)
    
    upload_blob(request.data)
    print('done uploading blob')
    file_content = encode_audio(request.data)

    client = speech.SpeechClient()

    # audio = speech.RecognitionAudio(uri=gcs_uri)
    print('below is the content of the file')
    print(file_content)

    audio = speech.RecognitionAudio(content=file_content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.AMR,
        sample_rate_hertz=8000,
        language_code="en-US",
        audio_channel_count=1,
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    print('get the response')

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
    return str(response.results)