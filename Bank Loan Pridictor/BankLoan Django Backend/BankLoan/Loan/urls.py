from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', Test.as_view(), name="Test"),
    path('request/', Total_requests.as_view(), name="Total_requests" ),
    path('predict/', loan_prediction, name="loan_prediction")  # Add this line
]
