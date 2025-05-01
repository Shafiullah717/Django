from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello.as_view(), name = 'hello'),
    path('register/', RegisterUser.as_view(), name= 'register'),
]
