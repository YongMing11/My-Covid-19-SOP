from google.cloud import speech
import os
import tempfile
from werkzeug.utils import secure_filename
from flask import jsonify
# Import the base64 encoding library.
import base64

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