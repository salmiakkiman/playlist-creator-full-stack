Foundation for flask app

to activate virtual environment
1. ```source venv/bin/activate```
2. ```export FLASK_APP=hello.py```
3. ```flask run```

Broker and RABBITMQ
```brew install rabbitmq```
to run it
```brew services run rabbitmq```

install celery & u need celery!
```pip install celery```

Run Celery at flamatus_flask root
```celery -A main.celery worker -l info```
 
 TO stop celery worker
``` pkill -9 -f 'celery worker' ```

bs4
```pip install beautifulsoup4```


to read/write meteor's mongo -> listen port 3001!