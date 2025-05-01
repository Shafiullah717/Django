from django.shortcuts import render
from rest_framework.response import Response
from .serializer import *
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

# Create your views here.

# Register User

class RegisterUser(APIView):
   def post(self, request):
      serializer = UserSerializer(data = request.data)

      if not serializer.is_valid():
            print(serializer.errors)
            return Response({'status' : 403, 'errors': serializer.errors , 'message' : 'Something went wrong'})
      serializer.save()
      user = User.objects.get(username = serializer.data['username'])
      token_obj = Token.objects.create(user = user)

      return Response({'status' : 200, 'payLoad' : serializer.data, 'token': str(token_obj), 'message' :'You sent this data'})
      pass


class hello(APIView):
    def get(self, request):
        return Response ({
            'status': 200,
            'message': "Hello from backend"
        })
