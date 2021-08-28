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
$env:GOOGLE_APPLICATION_CREDENTIALS="AIzaSyBn_7fDz9GCaSt422496rBe8XXuNhg59E0"
```

functions-framework --target=parse_multipart --debug