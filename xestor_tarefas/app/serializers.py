from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'date_joined', 'first_name', 'last_name', 'password', 'last_login', 'is_staff')


class notasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = notas
        fields = ('url','id', 'description', 'pending', 'id_name')

# class useSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = notas
#         fields = ('url', 'username', 'email', 'first_name', 'last_name')
