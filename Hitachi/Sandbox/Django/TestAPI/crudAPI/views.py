from django.shortcuts import render
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


# deserialised output: "Employee object Employee object Employee object Employee object"
# handling request differently if it contains query parameters
@api_view(["GET"])
def readData(request):
    if "fname" in request.query_params:
        input = request.query_params.get("fname")

        try:
            data = Employee.objects.get(first_name=input)

        except Employee.DoesNotExist:
            return Response(
                {"Error": "Employee Not Found"}, status=status.HTTP_404_NOT_FOUND
            )

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
        return Response(
            {"Message": "User Added", "Details": serializer.data},
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(
            {
                "Error": "Duplicate Fields Not Allowed. Please Re-Check Email and / or Phone."
            },
            status=status.HTTP_403_FORBIDDEN,
        )


@api_view(["DELETE"])
def deleteData(request, id):
    try:
        data = Employee.objects.get(pk=id)

    except Employee.DoesNotExist:
        return Response(
            {"Error": "Employee Not Found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = EmployeeSerializer(data, many=False)
    data.delete()
    return Response(
        {
            "Message": "Deleted Data for Employee...",
            "Employee ID": id,
            "Employee Data: ": serializer.data,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["PUT"])
def updateData(request, id):
    try:
        employee = Employee.objects.get(pk=id)
    except Employee.DoesNotExist:
        return Response(
            {"Error": "Employee Not Found"}, status=status.HTTP_404_NOT_FOUND
        )

    data = request.data.get("payload")

    # it is necessary to pass the instance of the Employee object being updated to the serializer
    # this allows the serializer to know which specific instance to update with the provided data
    # without passing the instance, the serializer will attempt to create a new instance instead of updating the existing one

    serializer = EmployeeSerializer(employee, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"Message": "User Updated", "Updated Data": serializer.data},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"Error": "Invalid Update Request"},
            status=status.HTTP_403_FORBIDDEN,
        )
