from django.urls import path
from . import views

urlpatterns = [
    path('', views.system, name='system'),
    path('system/purchasing_overview', views.system_purchasing_overview, name='system_purchasing_overview'),
    path('system/purchasing_detail', views.system_purchasing_detail, name='system_purchasing_detail'),
    path('system/delivery', views.system_delivery, name='system_delivery'),
    path('system/state', views.system_state, name='system_state'),
    path('equipment/', views.equipment, name='equipment'),
    path('connections/', views.connections, name='connections'),
    path('definitions/', views.definitions, name='definitions'),
    
]