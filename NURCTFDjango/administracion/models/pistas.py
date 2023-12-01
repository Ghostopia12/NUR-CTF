from django.db import models

from administracion.models import Desafio


class Pistas(models.Model):
    pista = models.CharField(max_length=50)
    costo = models.IntegerField()
    desafio = models.ForeignKey(Desafio, on_delete=models.CASCADE, related_name='desafio', null=False, default=1)

    def __str__(self):
        return self.pista