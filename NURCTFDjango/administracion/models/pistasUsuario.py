from django.db import models

from administracion.models import Pistas, Usuario


class PistasUsuario(models.Model):
    pista_u = models.ForeignKey(Pistas, on_delete=models.CASCADE, related_name='pista_u', null=False, default=1)
    usuario_p = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_p', null=False, default=1)
    usado = models.BooleanField(default=False)

