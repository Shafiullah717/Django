from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializer import *
# Create your views here.

@api_view(['GET'])
def home(request):
    Student_objs = Student.objects.all()
    serializer = StudenSerializer(Student_objs, many = True)
    print(serializer.data)

    return Response({'status' : 200, 'payload' : serializer.data})
    
