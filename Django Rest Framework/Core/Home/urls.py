from .views import home, AddData
from django.urls import path

urlpatterns = [
    path('', home, name= 'home'),
    path('AddData/', AddData, name = 'adddata')

]
