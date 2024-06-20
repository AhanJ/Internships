FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /TestAPI
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .