from django.db import models
from django.utils import timezone


# Create your models here.
class approvals(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female')
    )
    MARRIED_CHOICES = (
        ('Yes', 'Yes'),
        ('No', 'No')
    )
    GRADUATED_CHOICES =(
        ('Graduate', 'Graduated'),
        ('Not_Graduate', 'Not_Graduated')
    )
    SELFEMPLOYED_CHOICES =(
        ('Yes', 'Yes'),
        ('No', 'No')
    )
    PROPERTY_CHOICES = (
        ('Rural', 'Rural'),
        ('Semiurban', 'Semiurban'),
        ('Urban', 'Urban')
    )
    firstname = models.CharField(max_length=15)
    lastname = models.CharField(max_length=15)
    dependants = models.IntegerField()
    applicantincome = models.IntegerField()
    coapplicantincome = models.IntegerField()
    loanamt = models.IntegerField()
    loanterm = models.IntegerField()
    credithistory = models.IntegerField()
    gender= models.CharField(max_length=15, choices=GENDER_CHOICES)
    married = models.CharField(max_length=15, choices= MARRIED_CHOICES)
    graduatededucation = models.CharField(max_length=15,choices= GRADUATED_CHOICES)
    selfemployed = models.CharField(max_length= 15, choices= SELFEMPLOYED_CHOICES)
    area = models.CharField(max_length=15, choices= PROPERTY_CHOICES)

    STATUS_CHOICES = (
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Pending', 'Pending'),
    )
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='Pending'
    )
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.firstname} {self.lastname} - {self.status}"