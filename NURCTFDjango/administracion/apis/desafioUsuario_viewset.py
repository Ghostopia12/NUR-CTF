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

    @action(detail=False, methods=['get'], url_path='resueltos', name="resueltos")
    def desafios_resueltos(self, request, pk=None):
        queryset = DesafioUsuario.objects.filter(usuario_id=request.user.id, resuelto=True)
        serializer = DesafioUsuarioSerializer(queryset, many=True)
        return Response(serializer.data)
    # ruta para usar esto? R.- administracion/desafio-suario/resueltos

    # obtener desafios de un usuario
    @action(detail=False, methods=['get'], url_path='usuario', name="usuario")
    def usuario(self, request, pk=None):
        queryset = DesafioUsuario.objects.filter(usuario_id=request.user.id)
        serializer = DesafioUsuarioSerializer(queryset, many=True)
        return Response(serializer.data)