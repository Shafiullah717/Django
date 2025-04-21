from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    # return HttpResponse( "Hellow Shafiullah is here, and now you are at home page")
    return render(request, 'website/index.html')
def about(request):
    return HttpResponse("Hello Shafiullah is here, and now you are at about page")