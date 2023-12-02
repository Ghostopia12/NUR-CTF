from django.urls import path, include
from rest_framework import routers

from administracion.apis.desafio_viewset import DesafioViewSet
from administracion.apis.pistas_viewset import PistasViewSet
from administracion.apis.tipo_viewset import TipoViewSet
from administracion.apis.usuario_viewset import UsuarioViewSet
from administracion.apis.desafioUsuario_viewset import DesafioUsuarioViewSet

from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'desafio', DesafioViewSet)
router.register(r'pista', PistasViewSet)
router.register(r'desafio-usuario', DesafioUsuarioViewSet)
router.register(r'tipo', TipoViewSet)
router.register(r'user', UsuarioViewSet)


urlpatterns = [
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)