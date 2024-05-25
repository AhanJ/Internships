from django.urls import path
from . import views

urlpatterns = [
    path("", views.welcome),
    path("read/", views.readData),
    path("create/", views.createData),
    path("delete/<int:id>", views.deleteData),
    path("update/<int:id>", views.updateData),
]
