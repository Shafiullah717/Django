from rest_framework.response import Response
from .models import *
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .serializer import *

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


class LoginUser(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response({
                'status': 400,
                'message': 'Username and password are required'
            })

        user = authenticate(username=username, password=password)

        if not user:
            return Response({
                'status': 401,
                'message': 'Invalid credentials'
            })

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'status': 200,
            'token': str(token),
            'username': user.username,
            'message': 'Login successful'
        })
    
class LogoutUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Delete the token
        user.auth_token.delete()

        return Response({
            'status': 200,
            'message': 'Logout successful. Token deleted.'
        })

class postApi(APIView):
    def get(self, request):
        post_objs = Post.objects.all()
        serializer = PostSerializer(post_objs, many = True)
        print(serializer.data)
        return Response({
            'status': 200,
            'payload': serializer.data,
            'message': "data from get request"
        })
        pass
    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass

class hello(APIView):
    def get(self, request):
        return Response ({
            'status': 200,
            'message': "Hello from backend"
        })
