from rest_framework import routers
import re
from django.urls import path, include, re_path
from django.conf.urls import url
from Backend import views

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .user_view import UserView, UserDetailView
from .doc_view import DocumentView, DocumentDetailView
from .login_view import LoginUserView
from .comment_view import CommentView, CommentDetailView


urlpatterns = [
    path('user', UserView.as_view()),
    path('user/<int:pk>/', UserDetailView.as_view()),
    path('document', DocumentView.as_view()),
    path('document/<int:pk>/', DocumentDetailView.as_view()),
    path('login', LoginUserView.as_view()),
    path('comment', CommentView.as_view()),
    path('comment/<int:pk>/', CommentDetailView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)


router = routers.SimpleRouter()

# urlpatterns = [
    # path('user/<id>', UserView.as_view),
#     path('accounts/', include('django.contrib.auth.urls')),
#     # path('registration/', register_views.registerPage, name = 'registration'),
#     # path('login/', register_views.loginPage, name = 'login'),
#     # path('logout/', register_views.logoutUser, name = 'logout'),
#     # path('main/', register_views.mainPage, name='main'),
#     path('upload/', views.ModelUploader.as_view()),
#     path(r'^auth/users/activate/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', views.UserActivationView.as_view()),
# ]
# urlpatterns += router.urls