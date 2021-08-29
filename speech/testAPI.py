# Imports the Google Cloud client library
from google.cloud import speech

# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe
# gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"
# gcs_uri = "gs://ozone-audio-17263/work.wav"       # produced by Audacity - working with language_code="en-US", audio_channel_count=2 ONLY
# gcs_uri = "gs://ozone-audio-17263/goOutToWork.amr"       # Transcript: Go to work
# gcs_uri = "gs://ozone-audio-17263/workFromAssamJawaToKS.amr"       # Transcript: work from asam jawa to kuala selangor
# gcs_uri = "gs://ozone-audio-17263/kualaselangor.amr"       # Transcript: Kuala Selangor
gcs_uri = "gs://ozone-audio-17263/wantToWorkFromAssamJawaToKualaSelangor.amr"       # Transcript: want to work from Assam Jawa to Kuala Selangor

audio = speech.RecognitionAudio(uri=gcs_uri)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.AMR,
    sample_rate_hertz=8000,
    language_code="ms-MY",
    audio_channel_count=1,
)

# Detects speech in the audio file
response = client.recognize(config=config, audio=audio)
print(response)
for result in response.results:
    print("Transcript: {}".format(result.alternatives[0].transcript))