# lab-module-name-change
change the name of a module in every sections' data.json

### to initiate
1. create venv: `python -m venv venv`
2. activate venv; Mac: `source venv/bin/activate` or Windows: `.\venv\Scripts\activate`
3. install requirements (if included): `pip install -r requirements.txt`

### to run name-change.py
1. ensure all section folders exist in `sections/` directory (no lesson or module folders)
2. change name of `new_module_name` to desired name - `name-change.py  --  line 70`
3. run `python3 name-change.py` || `python name-change.py`