from rest_framework import serializers


class CreateDoctorSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.CharField()
    qualification = serializers.CharField()
    image = serializers.ImageField(allow_null=True, required=False)
    location = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()