# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class notas(models.Model):
    id = models.AutoField (primary_key = True)
    description = models.CharField(max_length = 30)
    pending = models.BooleanField(default = True)
    id_name = models.IntegerField()

    def __str__(self):
        return (self.descpription)

class register(models.Model):

    id = models.AutoField (primary_key = True)
    username = models.CharField(max_length = 30)
    email = models.CharField(max_length = 30)
    password = models.CharField(max_length = 30)
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    is_staff = models.BooleanField(default = True)
