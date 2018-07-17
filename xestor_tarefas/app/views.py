# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from datetime import datetime, date, time, timedelta
import calendar

from django.contrib.auth.models import User
from rest_framework import viewsets
from app.serializers import *

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required

from rest_framework.request import Request
from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import get_user

# from django.http import HttpResponse
# from django.views import View

# class UserViewSet(View):
#     model = User
#
#     def get(self, request):
#         print(request.user.id)
#         return HttpResponse(request.user)
#         return HttpResponse("Manolooo")
#     queryset = User.objects.filter()
#     serializer_class = UserSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class notasViewSet(viewsets.ModelViewSet):

    queryset = notas.objects.filter()
    serializer_class = notasSerializer


# Django.core.exceptions.FieldError:
#  Cannot resolve keyword 'login' into field. Choices are:
#  auth_token, date_joined, email, first_name, groups, id, is_active,
#  is_staff, is_superuser, last_login, last_name, logentry, password,
#  registrationprofile, user_permissions, username
