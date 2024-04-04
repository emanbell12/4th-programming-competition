# models.py

from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10)
    section = models.CharField(max_length=10)

class Student(models.Model):
    cid = models.CharField(max_length=10)
    full_name = models.CharField(max_length=255)
    status = models.CharField(max_length=10)
    student_id = models.CharField(max_length=10)

class Activity(models.Model):
    cid = models.CharField(max_length=10)
    percent = models.IntegerField()
    name = models.CharField(max_length=255)



class Outcome(models.Model):
    cid = models.CharField(max_length=10)
    name = models.CharField(max_length=255)
    plo = models.CharField(max_length=2)
    oc = models.IntegerField()
    target = models.IntegerField()
    pass_value = models.IntegerField()
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, null=True, default=None)
    percent = models.IntegerField()
    number = models.FloatField()


class Grade(models.Model):
    sid = models.ForeignKey(Student, on_delete=models.CASCADE)
    oid = models.ForeignKey(Outcome, on_delete=models.CASCADE)
    cid = models.CharField(max_length=10)
    grade = models.IntegerField()
