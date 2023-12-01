from django.db import models

from administracion.models import Desafio, Usuario


class DesafioUsuario(models.Model):
    intento = models.IntegerField()
    resuelto = models.BooleanField(default=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario', null=False, default=1)
    desafio_u = models.ForeignKey(Desafio, on_delete=models.CASCADE, related_name='desafio_u', null=False, default=1)

    def __str__(self):
        return self.usuario.username + ' ' + self.desafio_u.titulo
