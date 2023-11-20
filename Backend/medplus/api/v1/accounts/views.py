import requests
import json

from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view

from .serializers import ( 
    LoginSerializer,
)
from accounts.models import User
from doctors.models import Doctor
from api.v1.accounts.functions import decrypt


@api_view(["POST"])
@permission_classes((AllowAny,))
def user_login(request): 
    """
    View function to handle add login form of users.

    This view processes users login securely with username and password.
    """
    serialized_data = LoginSerializer(data=request.data)
    if serialized_data.is_valid():
        username = request.data['username']
        password = request.data['password']

        if User.objects.filter(username=username, is_deleted=False).exists():
            user = User.objects.get(username=username, is_deleted=False)
            if user.check_password(password):
                headers = {
                    "Content-Type" : "application/json"
                }
                protocol = "http://"
                if request.is_secure():
                    protocol = "https://"

                web_host = request.get_host()
                request_url = protocol + web_host + "/api/v1/accounts/token/"
                data={
                    'grant_type': 'password',
                    'username': username,
                    'password': password,
                }
                response = requests.post(request_url, headers=headers, data=json.dumps(data))
                
                response_data = {
                    'StatusCode' : 6000,
                    'data' : {
                        'title': 'Success',
                        'response' : response.json(),
                    }
                }
            else:
                response_data = {
                    'StatusCode' : 6001,
                    'data' : {
                        'title': 'failed',
                        'message' : "Incorrect password"
                    }
                }
        else:
            response_data = {
                'StatusCode' : 6001,
                'data' : {
                    'title': 'failed',
                    'message' : "User not exists"
                }
            }
    else:
        response_data = {
            "StatusCode": 6001,
            "data":{
                "title": "Validation Error",
                "message": serialized_data._errors
            }
        }
        
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes((AllowAny,))
def doctor_login(request):
    """"
    View function to handle add login form of doctor.
    This view processes executive profile login securely with username and password.
    """
    serialized_data = LoginSerializer(data=request.data)
    if serialized_data.is_valid():
        username = request.data['username']
        password = request.data['password']

        if Doctor.objects.filter(username=username, is_deleted=False).exists():
            doctor = Doctor.objects.get(username=username)
            if password == decrypt(doctor.password):
                
                headers = {
                    "Content-Type" : "application/json"
                }
                protocol = "http://"
                if request.is_secure():
                    protocol = "https://"

                web_host = request.get_host()
                request_url = protocol + web_host + "/api/v1/accounts/token/"
                data={
                    'grant_type': 'password',
                    'username': username,
                    'password': password,
                }
                response = requests.post(request_url, headers=headers, data=json.dumps(data))
                
                if response.status_code==200:  
                    
                    response_data = {
                        'StatusCode' : 6000,
                        'data' : {
                            'title': 'Success',
                            'response' : response.json(),
                            'role' : doctor.department,
                            'id' : doctor.id,
                            'name' : doctor.name,
                            'phone' : doctor.phone,
                            'email' : doctor.email,
                            'qualification' : doctor.qualification,
                            'location' : doctor.location,
                        }
                    }
                else:
                    response_data = {
                        'StatusCode' : 6001,
                        'data' : {
                            'title': 'failed',
                            'message': 'Token generation failed'
                            
                        }
                    }
            else:
                response_data = {
                    'StatusCode' : 6001,
                    'data' : {
                        'title': 'failed',
                        'message' : "Incorrect password"
                    }
                }
        else:
            response_data = {
                'StatusCode' : 6001,
                'data' : {
                    'title': 'failed',
                    'message' : "User not exist"
                }
            }
    else:
        response_data = {
            "StatusCode": 6001,
            "data":{
                "title": "Validation Error",
                "message": serialized_data._errors
            }
        }
        
    return Response(response_data, status=status.HTTP_200_OK)