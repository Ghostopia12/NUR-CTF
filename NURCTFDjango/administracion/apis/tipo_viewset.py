from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from administracion.models import Tipo


class TipoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tipo
        fields = '__all__'


class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    serializer_class = TipoSerializer
    permission_classes = [IsAuthenticated]
