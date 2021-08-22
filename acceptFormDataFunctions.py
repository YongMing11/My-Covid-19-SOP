from google.cloud import speech
import os
import tempfile
from werkzeug.utils import secure_filename

def speech_to_text(file_content):
    print('start converting speech to text')
    # Instantiates a client
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    # gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"
    # gcs_uri = "gs://ozone-audio-17263/work.m4a"     # default file type by RN
    # gcs_uri = "gs://ozone-audio-17263/work.wav"       # produced by Audacity

    # audio = speech.RecognitionAudio(uri=gcs_uri)
    print('below is the content of the file')
    print(file_content)
    audio = speech.RecognitionAudio(content=file_content)

    config = speech.RecognitionConfig(
        # encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        # sample_rate_hertz=44100,
        language_code="en-US",
        audio_channel_count=2,
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
    return str(result)

# Helper function that computes the filepath to save files to
def get_file_path(filename):
    # Note: tempfile.gettempdir() points to an in-memory file system
    # on GCF. Thus, any files in it must fit in the instance's memory.
    file_name = secure_filename(filename)
    return os.path.join(tempfile.gettempdir(), file_name)


def parse_multipart(request):
    """ Parses a 'multipart/form-data' upload request
    Args:
        request (flask.Request): The request object.
    Returns:
        The response text, or any set of values that can be turned into a
         Response object using `make_response`
        <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.
    """

    # This code will process each non-file field in the form
    fields = {}
    data = request.form.to_dict()
    for field in data:
        fields[field] = data[field]
        print('Processed field: %s' % field)

    # This code will process each file uploaded
    files = request.files.to_dict()
    for file_name, the_file in files.items():
        # Note: GCF may not keep files saved locally between invocations.
        # If you want to preserve the uploaded files, you should save them
        # to another location (such as a Cloud Storage bucket).
        the_file.save(get_file_path(file_name)) 
        print('Processed file: %s' % file_name)
        # call speech to text
        content = the_file.read()
        print(speech_to_text(content))

    # Clear temporary directory
    for file_name in files:
        file_path = get_file_path(file_name)
        os.remove(file_path)

    return "Done!"