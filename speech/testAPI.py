
# Imports the Google Cloud client library
from google.cloud import speech


# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe
# gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"
gcs_uri = "gs://ozone-audio-17263/brother.amr"     # default file type by RN
# gcs_uri = "gs://ozone-audio-17263/work.wav"       # produced by Audacity

audio = speech.RecognitionAudio(uri=gcs_uri)
# audio = speech.RecognitionAudio(content=open('./haha12200.flac','r').read())

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.AMR,
    sample_rate_hertz=8000,
    language_code="en-US",
    audio_channel_count=1,
)

# Detects speech in the audio file
response = client.recognize(config=config, audio=audio)
print(response)
for result in response.results:
    print("Transcript: {}".format(result.alternatives[0].transcript))