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
        data = request.data
        serializer = PostSerializer(data = request.data)
    
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({'status' : 403, 'errors': serializer.errors , 'message' : 'Something went wrong'})
        serializer.save()

        return Response({'status' : 200, 'payLoad' : serializer.data, 'message' :'You sent this data'})
        pass
    

class PostApiID(APIView):
    def get(self, request, id):
        try:
            post_obj = Post.objects.get(id=id)
            serializer = PostSerializer(post_obj)
            return Response({'status': 200, 'payload': serializer.data})
        except Post.DoesNotExist:
            return Response({'status': 404, 'message': 'Post not found'})

    def put(self, request, id):
        try:
            post_obj = Post.objects.get(id=id)
            serializer = PostSerializer(post_obj, data=request.data)
            if not serializer.is_valid():
                return Response({'status': 400, 'errors': serializer.errors, 'message': 'Invalid data'})
            serializer.save()
            return Response({'status': 200, 'payload': serializer.data, 'message': 'Post updated successfully'})
        except Post.DoesNotExist:
            return Response({'status': 404, 'message': 'Post not found'})

    def delete(self, request, id):
        try:
            post_obj = Post.objects.get(id=id)
            post_obj.delete()
            return Response({'status': 200, 'message': 'Post deleted successfully'})
        except Post.DoesNotExist:
            return Response({'status': 404, 'message': 'Post not found'})


class hello(APIView):
    def get(self, request):
        return Response ({
            'status': 200,
            'message': "Hello from backend"
        })
