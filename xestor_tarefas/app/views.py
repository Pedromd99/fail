# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from pprint import pprint
# Create your views here.
from datetime import datetime, date, time, timedelta
import calendar
import json
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import (CreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView)
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from app.serializers import *
from django.views import View
from rest_framework import mixins
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password, check_password
from passlib.hash import pbkdf2_sha256
from django.contrib.auth import update_session_auth_hash
from .models import User

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.mail import send_mail

from .forms import ContactForm

class reset_passViewSet(APIView):

    pass


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = User.objects.filter(id = request.user.id)
        serializer = UserSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)

class change_passViewSet(APIView):
    serializer_class = passwordSerializer()
    def get_object(self, queryset=None):
        return self.request.user
    def put(self, request, *args, **kwargs):
        u = User.objects.get(id = request.user.id)
        u.set_password(request.data['password'])
        u.save()
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
