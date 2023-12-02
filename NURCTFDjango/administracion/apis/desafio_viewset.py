from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction

from administracion.apis.tipo_viewset import TipoSerializer
from administracion.models import Desafio, DesafioUsuario, Usuario
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
                ver_respuesta=request.data['respuesta'],
                intentos=request.data['intentos'],
                archivo=request.data['archivo'],
                tipo_id=request.data['tipo_id']
            )
            usuarios = Usuario.objects.all()
            for usuario in usuarios:
                DesafioUsuario.objects.create(
                    desafio_u_id=desafio.pk,
                    usuario_id=usuario.pk,
                    intento=0,
                )
            return Response(status=201)

    @action(detail=False, methods=['post'], url_path="respuesta",
            name="Se validará la respuesta del desafio")
    def validacionRespuesta(self, request, pk=None):
        respuesta = self.__md5_hash(request.data['respuesta'])
        desafio = Desafio.objects.get(pk=request.data['desafio_id'])
        intentos = DesafioUsuario.objects.get(desafio_u_id=request.data['desafio_id'],
                                              usuario_id=request.data['usuario_id'])
        if intentos.intento <= desafio.intentos:
            if desafio.intentos > 0:
                intentos.intento += 1
                intentos.save()
            if respuesta == desafio.respuesta:
                if intentos.resuelto == True:
                    respuestaJson = {
                        'mensaje': 'Ya resolviste este ejercicio'
                    }
                    return Response(respuestaJson, status=200)
                intentos.resuelto = True
                intentos.save()
                usuario = Usuario.objects.get(pk=request.data['usuario_id'])
                usuario.puntos += desafio.puntos
                usuario.save()
                return Response(status=200)
            respuestaJson = {
                'mensaje': 'Respuesta incorrecta'
            }
            return Response(respuestaJson, status=400) # respuesta incorrecta
        # puedes retornar un mensaje de intentos agotados en formato json
        respuestaJson = {
            'mensaje': 'Intentos agotados'
        }
        return Response(respuestaJson, status=400)

    def __md5_hash(self, string):
        md5_hasher = hashlib.md5()
        md5_hasher.update(string.encode('utf-8'))
        md5_hash = md5_hasher.hexdigest()
        return md5_hash
