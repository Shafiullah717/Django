from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializer import *
# Create your views here.

@api_view(['GET'])
def get_book(request):
    Book_objs = Book.objects.all()
    serializers = BookSerializer(Book_objs, many = True)
    return Response({'status' : 200, 'payload' : serializers.data})


class studentApi(APIView):

    def get(self, request):
        Student_objs = Student.objects.all()
        serializer = StudenSerializer(Student_objs, many = True)
        print(serializer.data)
        return Response({'status' : 200, 'payload' : serializer.data})
    def post(self, request):
         data = request.data
         serializer = StudenSerializer(data = request.data)
    
         if not serializer.is_valid():
            print(serializer.errors)
            return Response({'status' : 403, 'errors': serializer.errors , 'message' : 'Something went wrong'})
         serializer.save()

         return Response({'status' : 200, 'payLoad' : serializer.data, 'message' :'You sent this data'})
        
    def put(self, request):
     try:
         student_obj = Student.objects.get(id = request.data['id'])
         serializers = StudenSerializer(student_obj, data = request.data)

         if not serializers.is_valid():
             return Response({'status' : 403, 'errors': serializers.errors, 'message' :'Something went Wrong'})
         serializers.save()

         return Response({'status' : 200, 'payload' : serializers.data, 'message' : 'You data is   updated successfully'})
     except Exception as e:
        return Response({ 'status' : 403, 'message' : 'invalid id'})

        
    def patch(self, request):
        try:
         student_obj = Student.objects.get(id = request.data['id'])
         serializers = StudenSerializer(student_obj, data = request.data, partial = True)

         if not serializers.is_valid():
             return Response({'status' : 403, 'errors': serializers.errors, 'message' :'Something went Wrong'})
         serializers.save()

         return Response({'status' : 200, 'payload' : serializers.data, 'message' : 'You data is   updated successfully'})
        except Exception as e:
         return Response({ 'status' : 403, 'message' : 'invalid id'})

    def delete(self, request):
        try:
         id = request.GET.get('id')
         student_obj = Student.objects.get(id = id)
         student_obj.delete()
         return Response({'status' : 200, 'message' : 'student deleted successfully'})
    
        except Exception as e:
         return Response({'status' : 403, 'message' : 'invalid id'})    






















# @api_view(['GET'])
# def home(request):
#     Student_objs = Student.objects.all()
#     serializer = StudenSerializer(Student_objs, many = True)
#     print(serializer.data)

#     return Response({'status' : 200, 'payload' : serializer.data})

# @api_view(['POST'])
# def Post_student(request):
#     # data = request.data
#     serializer = StudenSerializer(data = request.data)
    
#     if not serializer.is_valid():
#         print(serializer.errors)
#         return Response({'status' : 403, 'errors': serializer.errors , 'message' : 'Something went wrong'})
#     serializer.save()

#     return Response({'status' : 200, 'payLoad' : serializer.data, 'message' :'You sent this data'})

# @api_view(['PUT'])    
# def update_student(request, id):
#     try:
#          student_obj = Student.objects.get(id = id)
#          serializers = StudenSerializer(student_obj, data = request.data, partial = True)

#          if not serializers.is_valid():
#              return Response({'status' : 403, 'errors': serializers.errors, 'message' :'Something went Wrong'})
#          serializers.save()

#          return Response({'status' : 200, 'payload' : serializers.data, 'message' : 'You data is   updated successfully'})
#     except Exception as e:
#         return Response({ 'status' : 403, 'message' : 'invalid id'})

# @api_view(['DELETE'])
# def delete_student(request, id):
#     try:
#         student_obj = Student.objects.get(id = id)
#         student_obj.delete()
#         return Response({'status' : 200, 'message' : 'student deleted successfully'})
    
#     except Exception as e:
#         return Response({'status' : 403, 'message' : 'invalid id'})    