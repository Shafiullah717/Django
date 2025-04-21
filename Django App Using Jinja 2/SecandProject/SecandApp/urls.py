from django.urls import path
from . import views

urlpatterns = [
    path('', views.AllSecandApp, name='all_secand_app'),
    
]