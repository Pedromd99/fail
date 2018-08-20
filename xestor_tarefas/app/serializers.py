from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import *
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
import django.contrib.auth.password_validation as validators

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:

        model = User
        fields = ('url', 'id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_staff')

class notasSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = notas
        fields = ('url','id', 'description', 'pending', 'id_name')

class passwordSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'id', 'password')

class reset_passwordSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'id', 'password')
