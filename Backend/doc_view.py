import json
from .models import Document, User, Comment, Type
from .serializers import DocumentSerializer, CommentSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json


class DocumentView(APIView):

    def get(self, request, format=None):
        document = Document.objects.all()
        serializer = DocumentSerializer(document, many=True)
        serializer_data = json.loads(json.dumps(serializer.data))
        # serializer_data['ttype'] = serializer_data.get('type')
        return Response(serializer_data)

    def post(self, request, format=None):
        type = request.data['type']
        type = Type.objects.get(pk=type)
        file_name = request.data['file_name']
        user = request.data['user']
        user = User.objects.get(pk=user)
        description = request.data['description']
        Document.objects.create(
            user=user,
            type=type,
            file_name=file_name,
            description=description
            )
        return Response({'msg':'model created'}, status=200)

        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocumentDetailView(APIView):
    def get_object(self, pk):
        try:
            return Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = DocumentSerializer(snippet)
        serializer_data = json.loads(json.dumps(serializer.data))
        comment = Comment.objects.filter(document_id=serializer_data.get('id'))
        comments = []
        [comments.append(CommentSerializer(i).data) for i in comment]
        serializer_data['comment'] = json.loads(json.dumps(comments))

        return Response(serializer_data)

