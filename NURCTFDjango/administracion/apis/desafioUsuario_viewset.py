from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from administracion.apis.desafio_viewset import DesafioSerializer
from administracion.models import DesafioUsuario
from administracion.apis.usuario_viewset import UsuarioSimpleSerializer


class DesafioUsuarioSerializer(serializers.ModelSerializer):
    desafio = DesafioSerializer(read_only=True)
    desafio_id = serializers.IntegerField(write_only=True)
    usuario = UsuarioSimpleSerializer(read_only=True)
    usuario_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = DesafioUsuario
        fields = '__all__'


class DesafioUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DesafioUsuario.objects.all()
    serializer_class = DesafioUsuarioSerializer
    permission_classes = [IsAuthenticated]
