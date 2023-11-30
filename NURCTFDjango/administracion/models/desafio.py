from django.db import models

from administracion.models import Tipo


class Desafio(models.Model):
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField()
    puntos = models.IntegerField()
    respuesta = models.CharField(max_length=50)
    archivo = models.FileField(upload_to='media/recurso', null=True, blank=True)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE, related_name='tipo', null=True, default=1)


    def __str__(self):
        return self.titulo
