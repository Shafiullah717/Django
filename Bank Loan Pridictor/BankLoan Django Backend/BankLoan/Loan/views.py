# predictor/views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import approvals
from .serializer import approvalsSerializer
from .utils import predict_loan

class Test(APIView):
    def get(self, request):
        return Response({'Status': 200, 'Message': 'Hello From Backend!'})

class Total_requests(APIView):
    def get(self, request):
        Requests_objs = approvals.objects.all()
        serializer = approvalsSerializer(Requests_objs, many = True)
        return Response({'Status': 200, 'payload': serializer.data})


@api_view(['POST'])
def loan_prediction(request):
    # Validate and save data using serializer
    serializer = approvalsSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    
    # Create model instance but don't save yet
    instance = approvals(**serializer.validated_data)
    
    try:
        # Get prediction
        result = predict_loan(instance)
        
        # Add prediction result to instance and save
        instance.status = result
        instance.save()
        
        return Response({'status': result})
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)