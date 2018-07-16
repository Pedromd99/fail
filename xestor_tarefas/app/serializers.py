from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class notasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = notas
        fields = ('url','id', 'description', 'pending', 'id_name')
