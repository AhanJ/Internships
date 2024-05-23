from django.urls import path
from . import views

urlpatterns = [
    path("", views.welcome),
    path("read/", views.getAll),
    path("temp/", views.getOne),
]
