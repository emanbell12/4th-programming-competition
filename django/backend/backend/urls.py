# backend/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import CourseViewSet, StudentViewSet, ActivityViewSet, OutcomeViewSet, GradeViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'outcomes', OutcomeViewSet)
router.register(r'grades', GradeViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    
]
