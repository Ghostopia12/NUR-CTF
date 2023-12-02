from rest_framework import serializers, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction

from administracion.models import Usuario, Desafio, DesafioUsuario, Pistas, PistasUsuario


class UsuarioSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'puntos', 'is_superuser']


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    # permission_classes = [IsAuthenticated]
    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            serializer = UsuarioSerializer(data=request.data)
            if serializer.is_valid():
                user = Usuario.objects.create_user(username=request.data['username'], password=request.data['password'])
                desafios = Desafio.objects.all()
                for desafio in desafios:
                    DesafioUsuario.objects.create(
                        desafio_u_id=desafio.pk,
                        usuario_id=user.pk,
                        intento=0,
                    )
                pistas = Pistas.objects.all()
                for pista in pistas:
                    PistasUsuario.objects.create(
                        pista_u_id=pista.pk,
                        usuario_p_id=user.pk
                    )
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=400)

    # get usuarios de forma ascendente donde el usuario con mas puntos es el primero
    @action(detail=False, methods=['get'], url_path='puntos', name="puntos")
    def puntos(self, request, pk=None):
        queryset = Usuario.objects.all().order_by('-puntos')
        serializer = UsuarioSerializer(queryset, many=True)
        return Response(serializer.data)
    # ruta para usar esto? R.- administracion/user/puntos

    # @api_view(['GET'])
    # @authentication_classes([TokenAuthentication])
    # @action(detail=False, methods=['get'], url_path='current_user', name="current_user")
    # def current_user(request):
    #     user = request.user
    #     return Response({'user_id': user.id, 'username': user.username, 'is_admin': user.is_superuser})

    # @api_view(['GET'])
    # @authentication_classes([TokenAuthentication])
    # @action(detail=False, methods=['get'], url_path='current_user', name="usuario actual")
    # def my_view(self, request, pk=None):
    #     user = request.user
    #     return Response({'user_id': user})
