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

@api_view(['POST'])
def AddData(request):
    # data = request.data
    serializer = StudenSerializer(data = request.data)

    if not serializer.is_valid():
        print(serializer.errors)
        return Response({'status' : 403, 'errors': serializer.errors , 'message' : 'Something went wrong'})
    serializer.save()

    return Response({'status' : 200, 'payLoad' : serializer.data, 'message' :'You sent this data'})
    
