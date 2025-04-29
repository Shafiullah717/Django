from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello.as_view(), name= "hello"),
    path('posts/',BlogApi.as_view(), name = "blogapi")
]
