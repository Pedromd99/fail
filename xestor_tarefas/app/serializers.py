from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import *
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:

        model = User
        fields = ('url', 'id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_staff')


class notasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = notas
        fields = ('url','id', 'description', 'pending', 'id_name')

class registerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:

        model = User
        fields = ('url', 'id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_staff')

class PasswordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:

        model = User
        fields = ('url', 'id', 'old_pass', 'new_pass')

    def validate_new_password(self, value):
        validate_password(value)
        return value
