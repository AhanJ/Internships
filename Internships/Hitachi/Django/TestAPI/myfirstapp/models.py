from django.db import models


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    hire_date = models.DateField(blank=True, null=True)
    job_id = models.CharField(max_length=20, blank=True, null=True)
    salary = models.IntegerField(blank=True, null=True)

    # if managed = False then django cannot modify schema of the table
    class Meta:
        managed = True
        db_table = "employee"
