# Generated by Django 5.0.6 on 2024-05-22 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employee_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=50, null=True)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.CharField(blank=True, max_length=150, null=True)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('hire_date', models.DateField(blank=True, null=True)),
                ('job_id', models.CharField(blank=True, max_length=20, null=True)),
                ('salary', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'employee',
                'managed': True,
            },
        ),
    ]
