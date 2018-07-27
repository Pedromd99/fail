# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from datetime import datetime, date, time, timedelta
import calendar

from django.contrib.auth.models import User
from rest_framework import viewsets
from app.serializers import *

from rest_framework.request import Request
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from django.views import View
from rest_framework import mixins
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.password_validation import validate_password


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = User.objects.filter(id = request.user.id)

        serializer = UserSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)

class notasViewSet(viewsets.ModelViewSet):

    queryset = notas.objects.filter()
    serializer_class = notasSerializer

    def list(self, request):
        queryset = notas.objects.filter(id_name = request.user.id)

        serializer = notasSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)


class registerViewSet(viewsets.ModelViewSet):

    queryset = register.objects.all()
    serializer_class = registerSerializer()
