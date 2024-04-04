# myapp/admin.py

from django.contrib import admin
from .models import Course, Student, Activity, Outcome, Grade

# Register your models here.
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Activity)
admin.site.register(Outcome)
admin.site.register(Grade)
