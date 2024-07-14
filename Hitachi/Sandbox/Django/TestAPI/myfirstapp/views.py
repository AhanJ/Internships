from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Employee


# a view function takes in a request and returns a response
# a way to handle requests


# returning http response
def hello_world(request):
    return HttpResponse("Hello World")


# returning markup using render function
# automatically looks into the templates folder so no need to manually specify directory
def etowerinfo(request):
    return render(request, "etower.html", {"name": "Ahan"})


# returning a JSON response with all entries of Employee table in testdb
def crud_all(request):
    data = list(Employee.objects.all().values())
    return JsonResponse(data, safe=False)
