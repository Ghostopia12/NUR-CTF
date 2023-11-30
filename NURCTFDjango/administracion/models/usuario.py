# models.py

from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    puntos = models.IntegerField(default=0)


    def __str__(self):
        return self.username
