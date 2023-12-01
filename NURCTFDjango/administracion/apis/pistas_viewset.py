from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from administracion.apis.desafio_viewset import DesafioSerializer
from administracion.models import Pistas
from django.db import transaction

class PistasSerializer(serializers.ModelSerializer):
    desafio = DesafioSerializer(read_only=True)
    desafio_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Pistas
        fields = '__all__'


class PistasViewSet(viewsets.ModelViewSet):
    queryset = Pistas.objects.all()
    serializer_class = PistasSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic()
    @action(detail=False, methods=['post'], url_path="usar",
            name="Se usuara la pista del desafio")
    def usar_pista(self, request, pk=None):
        with transaction.atomic():
            pista = Pistas.objects.get(pk=request.data['pista_id'])
            usuario = Usuario.objects.get(pk=request.data['usuario_id'])
            if usuario.puntos >= pista.puntos:
                usuario.puntos -= pista.puntos
                usuario.save()
                pista_usada = PistasUsuario.objects.get(
                    pista_u_id=request.data['pista_id'], usuario_p_id=request.data['usuario_id'])
                pista_usada.usada = True
                pista_usada.save()
                return Response(status=200)
            else:
                return Response(status=400)
