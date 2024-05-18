from django.shortcuts import render
from django.http import HttpResponse


# a view function takes in a request and returns a response
# a way to handle requests


# returning http response
def hello_world(request):
    return HttpResponse("Hello World")


# returning markup using render function
# automatically looks into the templates folder so no need to manually specify directory
def etowerinfo(request):
    return render(request, "etower.html")
