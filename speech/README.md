# To call the testAPI.py
## Create the virtual environment.
```
python -m venv venv
```
## Activate the env in Windows 10
```
venv\Scripts\activate.ps1
```
## Setup Auth credential for current session, run
```
$env:GOOGLE_APPLICATION_CREDENTIALS="meowmeow-280110-a23165fd1829.json"
```

functions-framework --target=parse_multipart --debug