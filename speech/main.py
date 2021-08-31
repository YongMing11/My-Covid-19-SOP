from google.cloud import speech
from google.cloud import speech_v1p1beta1
import json

def parse_multipart(request):
    print("request",request.files['file'])
    # uncomment this to save file locally
    # but will remove file in object - parsing will fail
    # request.files['file'].save('./wantToWorkFromAssamJawaToKualaSelangor.amr')

    # Create the adaptation client
    # adaptation_client = speech.AdaptationClient()

    # # The parent resource where the custom class and phrase set will be created.
    # parent = f"projects/{project_id}/locations/{location}"

    # # Create the custom class resource
    # custom_class_response = adaptation_client.create_custom_class(
    #     {
    #         "parent": parent,
    #         "custom_class_id": custom_class_id,
    #         "custom_class": {
    #             "items": [
    #                 {"value": "sushido"},
    #                 {"value": "altura"},
    #                 {"value": "taneda"},
    #             ]
    #         },
    #     }
    # )
    # custom_class_name = custom_class_response.name
    # # Create the phrase set resource
    # phrase_set_response = adaptation_client.create_phrase_set(
    #     {
    #         "parent": parent,
    #         "phrase_set_id": phrase_set_id,
    #         "phrase_set": {
    #             "boost": 10,
    #             "phrases": [{"value": f"Visit restaurants like ${custom_class_name}"}],
    #         },
    #     }
    # )
    # phrase_set_name = phrase_set_response.name
    # # The next section shows how to use the newly created custom
    # # class and phrase set to send a transcription request with speech adaptation

    # # Speech adaptation configuration
    # speech_adaptation = speech.SpeechAdaptation(phrase_set_references=[phrase_set_name])

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
        # speechContexts=speech_adaptation,
        # speech_contexts=[{
        #   "phrases":["at"],
        #   "boost": 10.0
        # },{
        #   "phrases":["eat", "buy", "work", "somewhere", "emergency"],
        #   "boost": 7.0
        # },{
        #   "phrases":["to eat", "buy things", "work at", "go somewhere", "have emergency"],
        #   "boost": 5.0
        # }]
        # speech_contexts=[{ "phrases": ["eat", "buy", "work", "somewhere", "emergency"] }]
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
    return json.dumps(str(response.results[0].alternatives[0].transcript)), 200, {'Content-Type': 'application/json'}
