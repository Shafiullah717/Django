from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from .models import *
from .serializer import *

class hello(APIView):
    def get(self, request):
        return Response({"status": 200, "message": "Hello from Blogapp"})


class BlogApi(APIView):
    def get(self, request):
        Blog_obj = Blog.objects.all()
        serializer = BlogSerializer(Blog_obj, many = True)
        return Response ({'status': 200, 'payload': serializer.data})
        pass
    


