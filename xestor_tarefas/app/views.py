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
from rest_framework.permissions import IsAuthenticated

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from django.views import View

class ItemViewSet(View):
    model = User

    def get(self, request):
        print(request.user.id)
        return HttpResponse(User.objects.filter(id = request.user.id))
        # return HttpResponse("Manolooo")
    # queryset = User.objects.filter(id = request.user.id)
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = User.objects.filter(id = request.user.id)

        serializer = UserSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)
    # def get_serializer_context(self):
    #     return {'request': self.request}



class notasViewSet(viewsets.ModelViewSet):

    queryset = notas.objects.filter()
    serializer_class = notasSerializer

    def list(self, request):
        queryset = notas.objects.filter(id_name = request.user.id)

        serializer = notasSerializer(queryset, many=True, context={'request': self.request})
        return Response(serializer.data)
