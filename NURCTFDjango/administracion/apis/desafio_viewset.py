from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction

from administracion.apis.tipo_viewset import TipoSerializer
from administracion.models import Desafio
import hashlib


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

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            respuesta = self.__md5_hash(request.data['respuesta'])
            desafio = Desafio.objects.create(
                titulo=request.data['titulo'],
                descripcion=request.data['descripcion'],
                puntos=request.data['puntos'],
                respuesta=respuesta,
                archivo=request.data['archivo'],
                tipo_id=request.data['tipo_id']
            )
            return Response(status=201)

    @action(detail=False, methods=['post'], url_path="respuesta",
            name="Se validará la respuesta del desafio")
    def validacionRespuesta(self, request, pk=None):
        respuesta = self.__md5_hash(request.data['respuesta'])
        desafio = Desafio.objects.get(pk=request.data['desafio_id'])
        if desafio.respuesta == repuesta:
            return True
        else:
            return False

    def __md5_hash(self,string):
        md5_hasher = hashlib.md5()
        md5_hasher.update(string.encode('utf-8'))
        md5_hash = md5_hasher.hexdigest()
        return md5_hash