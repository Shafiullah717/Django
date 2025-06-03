from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello.as_view(), name = 'hello'),
    path('register/', RegisterUser.as_view(), name= 'register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('logout/', LogoutUser.as_view(), name='logout'),
    path('posts/', postApi.as_view(), name='posts'),
    path('posts/<int:id>/', PostApiID.as_view(), name="postsID"),
]
