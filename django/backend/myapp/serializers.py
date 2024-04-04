# serializers.py

from rest_framework import serializers
from .models import Course, Student, Activity, Outcome, Grade

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class OutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outcome
        fields = '__all__'

class OutcomeWithActivitySerializer(serializers.ModelSerializer):
    activity = ActivitySerializer()  # Assuming ActivitySerializer is defined

    class Meta:
        model = Outcome
        fields = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class GradeListSerializer(serializers.ModelSerializer):
    sid = serializers.SerializerMethodField()
    oid = serializers.SerializerMethodField()

    class Meta:
        model = Grade
        fields = ['id', 'grade', 'sid', 'oid']

    def get_sid(self, obj):
        # Retrieve student information
        student = obj.sid
        return StudentSerializer(student).data

    def get_oid(self, obj):
        # Retrieve outcome information
        outcome = obj.oid
        outcome_data = OutcomeSerializer(outcome).data
        # Include all activity information within the oid field
        outcome_data['activity'] = ActivitySerializer(outcome.activity).data
        return outcome_data

