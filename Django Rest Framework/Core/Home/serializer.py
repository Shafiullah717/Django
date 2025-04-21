from rest_framework import serializers
from .models import *

class StudenSerializer(serializers.Serializer):
    class Meta:
        model = Student
        # fields = [
        #     'name',
        #     'age',
        # ]
        # exclude = [
        #     'id'
        # ]
        fields = '__all__'
        