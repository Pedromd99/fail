# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-19 07:15
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20180718_1452'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notas',
            name='id_name',
        ),
    ]