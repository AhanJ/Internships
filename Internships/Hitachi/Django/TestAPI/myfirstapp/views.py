from django.shortcuts import render
from django.http import HttpResponse

# a view function takes in a request and returns a response
# a way to handle requests


def hello_world(request):
    return HttpResponse("Hello World")
