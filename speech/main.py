from google.cloud import speech
from google.cloud import storage
import os
import io
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
def encode_audio(audio):
  audio_content = audio.read()
  print(audio_content)
  return base64.b64encode(audio_content)

def parse_multipart(request):
    print("request",request.form)
    print("request",request.data)
    print("request",request.files['file'])
    # request.files['file'].save('./haha12200.amr')
    # request.files['file'].save('./helin1channel.wav')
    # print("request",dir(request))
    # return "OK"
    content_type = request.headers['content-type']
    print('content-type is',content_type)

    file_storage = request.files['file']
    # in_file = open(file_storage, "rb")
    in_file = (file_storage.read())
    # file_content = encode_audio(in_file)
    print(type(in_file))
    # content = file_storage.read()

    # with io.open(request.files['file'], "rb") as audio_file:
    #     content = audio_file.read()

    client = speech.SpeechClient()

    # Our audio file
    audio = speech.RecognitionAudio(content=in_file)
    # audio = speech.RecognitionAudio(uri="gs://ozone-audio-17263/brother.amr")
    # audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.AMR,
        sample_rate_hertz=8000,
        language_code="en-US",
        audio_channel_count=1,
    )

    # working Google audio sample
    # gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"
    # audio = speech.RecognitionAudio(uri=gcs_uri)
    # config = speech.RecognitionConfig(
    #     encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    #     sample_rate_hertz=16000,
    #     language_code="en-US",
    # )

    # print('below is the content of the file')
    # print(file_content)

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