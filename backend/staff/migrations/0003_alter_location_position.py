# Generated by Django 4.2.4 on 2023-09-06 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0002_alter_location_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='position',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]