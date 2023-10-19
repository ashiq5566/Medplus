# from rest_framework import serializers
# from doctors.models import Doctor

# class CreateDoctorSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     phone = serializers.CharField()
#     email = serializers.CharField()
#     qualification = serializers.CharField()
#     image = serializers.ImageField(allow_null=True, required=False)
#     department = serializers.CharField()
#     location = serializers.CharField()
#     username = serializers.CharField()
#     password = serializers.CharField()
#     confirm_password = serializers.CharField()
    
# class DoctorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Doctor
#         fields = '__all__'
    