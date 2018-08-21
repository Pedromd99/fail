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
from django.core.mail import send_mail
from django.template.loader import render_to_string, get_template
from django.core.mail import EmailMessage
from mail_templated import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template import Context
from django.utils import timezone

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.template import loader
from django.views import generic
from django.utils.encoding import smart_str
from django.shortcuts import redirect


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


class sendViewSet(APIView):

    def post(self, request):
        to = request.data['email']
        user = User.objects.get(email = request.data['email'])
        qs = User.objects.filter(username = user)
        id = user.id
        send_mail(
        'pass_reset_email.html',
        {'User' :  user},
        'peepgalaxia11@gmail.com', #FROM
        [to],
        subject='Reset Password',
        )
        return HttpResponse(status=200)
class reset_passViewSet(APIView):
    serializer_class = passwordSerializer()

    def put(self, request, *args, **kwargs):
        id = request.data['id']
        print(id)
        u = User.objects.get(id = id)
        u.set_password(request.data['password'])
        u.save()
        return HttpResponse(status=200)
