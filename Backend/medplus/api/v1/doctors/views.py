import requests
import json
import phonenumbers
from django.db.models import Q
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from .serializers import ( 
    
    CreateDoctorSerializer,
    DoctorSerializer
)
from doctors.models import Doctor

from api.v1.general.decorators import group_required




@api_view(['POST'])
@permission_classes((AllowAny,))
def create_doctor(request):
    """
    View function to add doctor.

    """
    serialized_data = CreateDoctorSerializer(data=request.data)
    if serialized_data.is_valid():
        name = request.data['name']
        phone = request.data['phone']
        email = request.data['email']
        qualification = request.data['qualification']
        image = request.data['image']
        location = request.data['location']
        department = request.data['department']
        username = request.data['username']
        password = request.data['password']
        confirm_password = request.data['confirm_password']

        if not Doctor.objects.filter(username=username, is_deleted=False).exists():
            if password == confirm_password:
                Doctor.objects.create(
                    name=name,
                    phone=phone,
                    email=email,
                    qualification=qualification,
                    image=image,
                    location=location,
                    department=department,
                    username=username,
                    password=password
                )
                response_data = {
                    "StatusCode": 6000,
                    "data":{
                        "title": "Success",
                        "message": "Doctor profile created successfully"
                    }
                }
            else:
                response_data = {
                    "StatusCode": 6001,
                    "data" : {
                        "title": "Failed",
                        "message": "Passwords do not match"
                    } 
                }
        else:
            response_data = {
                "StatusCode": 6001,
                "data":{
                    "title": "Failed",
                    "message": "Doctor profile already exists"
                }

            }
    else:
        response_data = {
            "StatusCode":6001,
            "data":{
                "title":"Failed",
                "message":serialized_data._errors
            }
        }
            
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((AllowAny,))
def doctors(request):
    """
    View function to get doctor.

    """
    search_query = request.GET.get('search_query')
    if Doctor.objects.filter(is_deleted=False).exists():
        doctors =  Doctor.objects.filter(is_deleted=False)
        if search_query:
            doctors = Doctor.objects.filter(
                Q(name__icontains=search_query) |
                Q(qualification__icontains=search_query) |
                Q(location__icontains=search_query)
            )
        serialized_data = DoctorSerializer(doctors, context={"request": request}, many=True)
        response_data = {
            "StatusCode": 6000,
            "data":{
                "title": "Success",
                "data": serialized_data.data
            }
        }
    else:
        response_data = {
            "StatusCode": 6001,
            "data":{
                "title": "Failed",
                "message": "Doctors Not found"
            }

        }
            
    return Response(response_data, status=status.HTTP_200_OK)