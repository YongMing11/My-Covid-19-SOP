from google.cloud import speech
import json

def parse_multipart(request):
    print("request",request.files['file'])
    # uncomment this to save file locally
    # but will remove file in object - parsing will fail
    # request.files['file'].save('./wantToWorkFromAssamJawaToKualaSelangor.amr')

    file_storage = request.files['file']
    in_file = (file_storage.read())
    print(type(in_file))

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=in_file)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.AMR,
        sample_rate_hertz=8000,
        language_code="ms-MY",
        audio_channel_count=1,
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
    return json.dumps(str(response.results)), 200, {'Content-Type': 'application/json'}
