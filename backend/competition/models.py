from django.db import models

class Competition(models.Model):
    name = models.CharField(max_length=100, default="CTF Competition")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.start_time} - {self.end_time})"