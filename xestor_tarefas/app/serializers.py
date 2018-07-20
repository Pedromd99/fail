from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:

        model = User
        fields = ('url', 'id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_staff')


class notasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = notas
        fields = ('url','id', 'description', 'pending', 'id_name')






    # class useSerializer(serializers.HyperlinkedModelSerializer):
    #         fields = ('url', 'username', 'email', 'first_name', 'last_name')
    #     class Meta:

    #         model = notas
