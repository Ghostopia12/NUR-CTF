from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from administracion.apis.desafio_viewset import DesafioSerializer
from administracion.models import PistasUsuario


class PistasUsuarioSerializer(serializers.ModelSerializer):
    desafio = DesafioSerializer(read_only=True)
    desafio_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = PistasUsuario
        fields = '__all__'


class PistasUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PistasUsuario.objects.all()
    serializer_class = PistasUsuarioSerializer
    permission_classes = [IsAuthenticated]
