from .views import *
from django.urls import path

urlpatterns = [
    path('student/', studentApi.as_view(), name='studentApi'),
    # path('', home, name= 'home'),
    # path('Post_student/', Post_student, name = 'Post_student'),
    # path('update-student/<id>/', update_student, name = 'update-student'),
    # path('delete-student/<id>/', delete_student, name = 'delete-student'),
    path('get-book/', get_book, name='get_book')

]
