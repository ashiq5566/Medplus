# from rest_framework import serializers
# from api.v1.accounts.functions import encrypt

# from leads.models import Lead, StudentApplication
# from api.v1.accounts.functions import decrypt
# from accounts.models import ExecutiveProfile



# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()   

# class StudentLoginSerializer(serializers.Serializer):
#     phone = serializers.CharField()
#     country = serializers.CharField()  

# class PhoneSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     email = serializers.CharField()
#     phone = serializers.CharField(max_length=16)
#     country = serializers.CharField()
    
    
# class OTPSerializer(serializers.Serializer):
#     country = serializers.CharField()
#     phone = serializers.CharField()
#     otp = serializers.IntegerField()


# class ProfileSerializer(serializers.Serializer):
#     phone = serializers.CharField()
#     name = serializers.CharField()
#     username = serializers.CharField()
#     password = serializers.CharField()
#     email = serializers.CharField()
    
    
# class CreateExecutiveProfileSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     phone = serializers.CharField()
#     email = serializers.CharField()
#     qualification = serializers.CharField()
#     image = serializers.ImageField(allow_null=True, required=False)
#     location = serializers.CharField()
#     username = serializers.CharField()
#     password = serializers.CharField()
#     confirm_password = serializers.CharField()

# class ExecutiveProfileSerializer(serializers.Serializer):
#     id = serializers.UUIDField()
#     name = serializers.CharField()
#     phone = serializers.CharField()
#     email = serializers.CharField()
#     location = serializers.CharField()
#     qualification = serializers.CharField()
#     image = serializers.ImageField(allow_null=True, required=False)
#     username = serializers.CharField()
#     password = serializers.CharField()
    
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.phone = validated_data.get('phone', instance.phone)
#         instance.email = validated_data.get('email', instance.email)
#         instance.qualification = validated_data.get('qualification', instance.qualification)
#         if validated_data.get('image', instance.image):
#             instance.image = validated_data.get('image', instance.image)
#         instance.location = validated_data.get('location', instance.location)
#         instance.username = validated_data.get('username', instance.username)
#         password = validated_data.get('password', instance.password)
#         instance.password = encrypt(password)
#         instance.save()
        
#         return instance
    
# class ViewExecutiveProfileSerializer(serializers.ModelSerializer):
#     password = serializers.SerializerMethodField()
#     class Meta:
#         model = ExecutiveProfile
#         fields = '__all__'
    
#     def get_password(self, instance):
#         password = None
#         if instance.password:
#             password = decrypt(instance.password)

#         return password 

    

# class UserSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     username = serializers.CharField()
#     password = serializers.CharField()
#     email = serializers.CharField()
    
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.email = validated_data.get('email', instance.email)
#         instance.username = validated_data.get('username', instance.username)
#         instance.password = validated_data.get('password', instance.password)
    
#         instance.set_password(instance.password)
#         instance.save()
        
#         return instance
    

# class UserDetailSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     email = serializers.CharField()
#     phone_number = serializers.CharField(max_length=16)
#     is_applied = serializers.SerializerMethodField()
#     other_details = serializers.SerializerMethodField()
#     # application_status = serializers.SerializerMethodField()

    
#     def get_is_applied(self,instance):
#         is_applied = None
#         if instance.phone_number and Lead.objects.filter(phone=instance.phone_number).exists():
#             lead = Lead.objects.get(phone=instance.phone_number)
#             is_applied = lead.is_applied
    
#         return is_applied

#     def get_other_details(self,instance):
#         other_details = None
#         if instance.phone_number:
#             if Lead.objects.filter(phone=instance.phone_number, is_deleted=False).exists():
#                 lead = Lead.objects.get(phone=instance.phone_number, is_deleted=False)
#                 other_details = {
#                     "qualification":lead.qualification,
#                     "dob":lead.dob
#                 }
            
#         return other_details
    
    
#     # def get_application_status(self,instance):
#     #     application_status = None
#     #     if instance.phone_number:
#     #         if StudentApplication.objects.get(lead__phone=instance.phone_number, is_deleted=False).exists():
#     #             application = StudentApplication.objects.get(lead__phone=instance.phone_number, is_deleted=False)
#     #             application_status = lead.application_status
            
#     #     return application_status