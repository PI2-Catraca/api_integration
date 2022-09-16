FROM python:3

WORKDIR /app/treinamento

COPY . ./

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get install cmake -y
RUN apt-get install -y libpq-dev
RUN apt-get install -y build-essential

RUN pip install uvicorn google.cloud.storage fastapi imutils numpy opencv-python face_recognition psycopg2-binary

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app"]