import os
import json
import requests
from django.conf import settings
from cryptography.fernet import Fernet
import base64


def encrypt(text):
    text = str(text)
    f = Fernet(settings.ENCRYPT_KEY)
    #input should be in bytes
    encrypted_data = f.encrypt(text.encode('ascii'))
    encrypted_data = base64.urlsafe_b64encode(encrypted_data).decode("ascii") 

    return encrypted_data


def decrypt(text):
    text= base64.urlsafe_b64decode(text)
    f = Fernet(settings.ENCRYPT_KEY)
    decrypted_data = f.decrypt(text).decode("ascii")

    return decrypted_data


    
