from rest_framework import serializers
from .models import approvals

class approvalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = approvals
        fields = '__all__'
        read_only_fields = ('status', 'created_at')  # These will be set by the system