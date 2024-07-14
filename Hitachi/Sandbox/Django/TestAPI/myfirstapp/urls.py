from django.urls import path
from . import views

# used to map a url to a view function
# when myfirstapp/hello endpoint is visited hello_world function is called
# this needs to be further mapped using urls.py file in the main project folder

urlpatterns = [
    path("hello/", views.hello_world),
    path("etowerinfo/", views.etowerinfo),
    path("crud/all/", views.crud_all),
]
