from django.urls import path, include
from rest_framework import routers

from administracion.apis.desafio_viewset import DesafioViewSet
from administracion.apis.pistas_viewset import PistasViewSet
from administracion.apis.tipo_viewset import TipoViewSet
from administracion.apis.usuario_viewset import UsuarioViewSet

router = routers.DefaultRouter()
router.register(r'desafio', DesafioViewSet)
router.register(r'pistas', PistasViewSet)
router.register(r'tipo', TipoViewSet)
router.register(r'user', UsuarioViewSet)


urlpatterns = [
    path('', include(router.urls)),
]