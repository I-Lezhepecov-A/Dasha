import json
from .models import Document, User, Comment
from .serializers import DocumentSerializer, CommentSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json


class CommentView(APIView):

    def get(self, request, format=None):
        comment = Comment.objects.all()
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        print(request.data)
        from_user = request.data['from_user']
        user_from = User.objects.get(pk=from_user)
        to_user = request.data['to_user']
        to_user = User.objects.get(pk=to_user)
        document = request.data['document']
        document = Document.objects.get(pk=document)
        comment = request.data['comment']
        Comment.objects.create(
            from_user=user_from,
            to_user=to_user,
            document=document,
            comment=comment
            )
        return Response({'msg':'model created'}, status=200)
        # serializer = DocumentSerializer(data=request.data)
        # print(serializer)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentDetailView(APIView):
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CommentSerializer(snippet)
        return Response(serializer.data)