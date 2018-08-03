# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from pprint import pprint
# Create your views here.
from datetime import datetime, date, time, timedelta
import calendar
import json
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import (CreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView)
from django.contrib.auth.models import User
from rest_framework import viewsets
from app.serializers import *
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from django.views import View
from rest_framework import mixins
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password, check_password
from passlib.hash import pbkdf2_sha256

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = User.objects.filter(id = request.user.id)

        serializer = UserSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        datos = request.data
        password = datos['password']
        self.change = User(username = datos['username'], first_name = datos['first_name'], last_name = datos['last_name'], email = datos['email'])
        self.change.set_password(password)
        # self.change.save()
        return HttpResponse(status=200)

class change_passViewSet(UpdateAPIView):

    queryset = User.objects.all()
    serializer_class = passwordSerializer

    def get(self, request, *args, **kwargs):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)

    def put(self, request, pk=None):
        datos = request.data
        password = datos['password']
        print(password)
        user = self.get.objects()
        user.set_password(password)
        user.save()
        # self.change = User()
        # self.change.set_password(password)
        return HttpResponse(status=200)

class notasViewSet(viewsets.ModelViewSet):

    queryset = notas.objects.filter()
    serializer_class = notasSerializer

    def list(self, request):
        queryset = notas.objects.filter(id_name = request.user.id)

        serializer = notasSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)

class valoresViewSet(APIView):
    """
        Recollemos valores do formulario de alta
    """

    def post(self, request, format=None):
        datos = (request.data)
        password = datos['password']
        register = User(username = datos['username'], first_name = datos['first_name'], last_name = datos['last_name'], is_staff = datos['is_staff'], email = datos['email'])
        register.set_password(password)
        register.save()
        return HttpResponse(status=200)
