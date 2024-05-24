from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
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
# handling request differently if it contains query parameters
@api_view(["GET"])
def readData(request):
    if request.GET:
        input = request.GET.get("fname")
        data = Employee.objects.get(first_name=input)
        # input = request.GET.dict()
        # input = request.GET.items()
        # return Response(input)
        serializer = EmployeeSerializer(data, many=False)

    else:
        data = Employee.objects.all()
        serializer = EmployeeSerializer(data, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def createData(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
def deleteData(request, id):
    data = Employee.objects.get(pk=id)
    serializer = EmployeeSerializer(data, many=False)
    data.delete()
    return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


@api_view(["PUT"])
def updateData(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def temp(request):
    print(request.body)
    return Response(request.data)
