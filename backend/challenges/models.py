from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Challenge(models.Model):
    LEVEL_CHOICES = [("Easy", "Easy"), ("Medium", "Medium"), ("Hard", "Hard")]
    category = models.ForeignKey(Category, related_name='challenges', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    hint = models.TextField(blank=True)
    url = models.URLField(blank=True)
    level = models.CharField(max_length=16, choices=LEVEL_CHOICES)
    points = models.PositiveIntegerField()
    flag = models.CharField(max_length=255) 

    def __str__(self):
        return self.name

class ChallengeAttachment(models.Model):
    challenge = models.ForeignKey(Challenge, related_name='attachments', on_delete=models.CASCADE)
    file = models.FileField(upload_to='challenge_files/')
    filename = models.CharField(max_length=255) 

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['challenge', 'filename'], name='unique_file_name_per_challenge')
        ]

class ChallengeSolve(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, related_name='solves', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'challenge')  # A user can only solve once