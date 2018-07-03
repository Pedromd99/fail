# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class notas(models.Model):
    id = models.AutoField (primary_key = True)
    description = models.CharField(max_length = 30)
    pending = models.BooleanField(default = True)
