# Generated by Django 4.2.3 on 2023-11-18 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='currency',
            field=models.CharField(default='inr'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='payment',
            name='session_id',
            field=models.CharField(max_length=255),
        ),
    ]
