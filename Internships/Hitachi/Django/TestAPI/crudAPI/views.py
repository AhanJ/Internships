from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from myfirstapp.models import Employee
from .serializers import EmployeeSerializer

# decorators are functions which pass the decorated function as argument to the decorator function
# these decorator functions then extend the functionality of these decorated functions by using them in a wrapper function inside the decorator function
# whenever the decorated function is called the decorator is called with argument of the decorator as the decorated function

# def outer(func):
#     def wrapper():
#         print("Outer Function Called")
#         func()
#     return wrapper


# @outer
# def inner():
#     print("Inner Function Being Called")

# inner()

# Output
#   Outer Function Called
#   Inner Function Being Called


@api_view(["GET"])
def welcome(request):
    message = "Welcome to crudAPI"
    return Response(message)


# Deserialised output: Employee object Employee object Employee object Employee object

# After serialisation oup


@api_view(["GET"])
def getAll(request):
    data = Employee.objects.all()
    serializer = EmployeeSerializer(data, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getOne(request):
    input = request.GET.get("fname", "lname")
    return Response(input)
