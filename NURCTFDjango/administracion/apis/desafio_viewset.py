from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from administracion.apis.tipo_viewset import TipoSerializer
from administracion.models import Desafio


class DesafioSerializer(serializers.ModelSerializer):
    tipo = TipoSerializer(read_only=True)
    tipo_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Desafio
        fields = '__all__'


class DesafioViewSet(viewsets.ModelViewSet):
    queryset = Desafio.objects.all()
    serializer_class = DesafioSerializer
    permission_classes = [IsAuthenticated]
