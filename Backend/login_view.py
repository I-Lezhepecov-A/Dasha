from .models import User
from rest_framework.authtoken.models import Token
from .serializers import LoginUserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_access_token, generate_refresh_token
import base64
import json


class LoginUserView(APIView):

    def post(self, request, format=None):
        data = request.data
        # print(data)
        login = data.get("username")
        password_usr = data.get("password")
        if (login is None) or (password_usr is None):
            raise exceptions.AuthenticationFailed(
            'username and password required')
        users = User.objects.values()

        user = [i for i in users if i.get("email") == login][0]

        # print(user)
        password = user.get("password")
        password_bytes = password_usr.encode('ascii')
        base64_bytes = base64.b64encode(password_bytes)
        # print("{} - {} --> {}".format(str(password), str(base64_bytes), str(password) != str(base64_bytes)))
        if str(password) != str(base64_bytes):
            return Response({"status":400, 'data':data}, status=status.HTTP_400_BAD_REQUEST)
        # token = Token.objects.create(user=user)
        # print(token.key)

        access_token = generate_access_token(user)
        refresh_token = generate_refresh_token(user)

        # return Response("loginned", status=status.HTTP_200_OK)
        return Response(
            {
                'access_token' : access_token,
                'refresh_token' : refresh_token
            },
             status=status.HTTP_200_OK)