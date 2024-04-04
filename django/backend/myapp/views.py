from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
# views.py
from rest_framework import serializers

from rest_framework import viewsets, status
from .models import Course, Student, Activity, Outcome, Grade
from .serializers import   GradeListSerializer, OutcomeWithActivitySerializer, CourseSerializer, StudentSerializer, ActivitySerializer, OutcomeSerializer, GradeSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        course = self.get_object()
        students = course.students.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        cid = self.request.query_params.get('cid')
        if cid:
            queryset = queryset.filter(cid=cid)
        return queryset

    def create(self, request, *args, **kwargs):
        # Check if 'id' is provided in the request data
        student_id = request.data.get('id')

        if student_id:
            # If 'id' is provided, try to update the existing student
            try:
                student_instance = Student.objects.get(id=student_id)
                serializer = self.get_serializer(student_instance, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Student.DoesNotExist:
                return Response({'error': f'Student with id {student_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # If 'id' is not provided, create a new student
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = self.queryset
        cid = self.request.query_params.get('cid')
        if cid:
            queryset = queryset.filter(cid=cid)
        return queryset

    def create(self, request, *args, **kwargs):
        activity_id = request.data.get('id')

        if activity_id:
            # Try to retrieve the existing Activity instance
            try:
                activity = Activity.objects.get(id=activity_id)
            except Activity.DoesNotExist:
                # If the Activity instance does not exist, return a 404 response
                return Response({'error': 'Activity with id {} does not exist'.format(activity_id)}, status=status.HTTP_404_NOT_FOUND)

            # Update the existing Activity instance with the request data
            serializer = self.get_serializer(activity, data=request.data, partial=True)
        else:
            # Create a new Activity instance with the request data
            serializer = self.get_serializer(data=request.data)

        # Validate and save the serializer data
        serializer.is_valid(raise_exception=True)
        activity = serializer.save()

        # Return the response with the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK if activity_id else status.HTTP_201_CREATED)

class OutcomeWithActivityInfoSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer()  # Assuming ActivitySerializer is defined

    class Meta:
        model = Outcome
        fields = '__all__'

class OutcomeViewSet(viewsets.ModelViewSet):
    queryset = Outcome.objects.all()
    serializer_class = OutcomeSerializer

    def get_queryset(self):
        queryset = self.queryset
        cid = self.request.query_params.get('cid')
        if cid:
            queryset = queryset.filter(cid=cid).select_related('activity')
        return queryset

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return OutcomeWithActivityInfoSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        # Extract the outcome ID from the request data
        outcome_id = request.data.get('id')

        # If outcome ID is provided
        if outcome_id:
            try:
                # Try to retrieve the outcome with the provided ID
                outcome = Outcome.objects.get(id=outcome_id)
                
                # Update the existing outcome with the request data
                serializer = self.get_serializer(outcome, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            except Outcome.DoesNotExist:
                pass  # Proceed to create new outcome if the provided ID doesn't exist

        # If outcome ID is not provided or doesn't exist, proceed to create new
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        outcome = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def get_queryset(self):
        queryset = self.queryset
        cid = self.request.query_params.get('cid')
        if cid:
            queryset = queryset.filter(cid=cid)
        return queryset

    def create(self, request, *args, **kwargs):
        grade_id = request.data.get('id')

        if grade_id:
            # Try to retrieve the existing Grade instance
            try:
                grade = Grade.objects.get(id=grade_id)
            except Grade.DoesNotExist:
                # If the Grade instance does not exist, return a 404 response
                return Response({'error': 'Grade with id {} does not exist'.format(grade_id)}, status=status.HTTP_404_NOT_FOUND)

            # Update the existing Grade instance with the request data
            serializer = self.get_serializer(grade, data=request.data, partial=True)
        else:
            # Create a new Grade instance with the request data
            serializer = self.get_serializer(data=request.data)

        # Validate and save the serializer data
        serializer.is_valid(raise_exception=True)
        grade = serializer.save()

        # Return the response with the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK if grade_id else status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action == 'list':
            return GradeListSerializer
        return super().get_serializer_class()

