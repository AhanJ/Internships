from django.shortcuts import render
import requests


def TestBot(request):
    return render(request, "chatbot.html")
