from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Type, Role, User, Document, Comment
# from django.contrib.auth.models import User

class TypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Type
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(many=False, read_only=True)
    class Meta:
        model = User
        exclude = ('password', )

class LoginUserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(many=False, read_only=True)
    class Meta:
        model = User
        exclude = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    type = TypeSerializer(many=False, read_only=True)
    class Meta:
        model = Document
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(many=False, read_only=True)
    to_user = UserSerializer(many=False, read_only=True)
    document = DocumentSerializer(many=False, read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'