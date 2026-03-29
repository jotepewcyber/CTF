from rest_framework import serializers
from .models import Category, Challenge, ChallengeSolve, ChallengeAttachment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ChallengeCardSerializer(serializers.ModelSerializer):
    solved_count = serializers.IntegerField(source='solves.count', read_only=True)
    class Meta:
        model = Challenge
        fields = ['id', 'name', 'level', 'points', 'solved_count', 'category']

class ChallengeAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeAttachment
        fields = ['id', 'file', 'filename']

class ChallengeDetailSerializer(serializers.ModelSerializer):
    solved_count = serializers.IntegerField(source='solves.count', read_only=True)
    attachments = ChallengeAttachmentSerializer(many=True, read_only=True) 
    class Meta:
        model = Challenge
        fields = ['id', 'name', 'description', 'hint', 'url', 'level', 'points', 'solved_count', 'category', 'attachments']


class ChallengeCreateSerializer(serializers.ModelSerializer):
    attachments = ChallengeAttachmentSerializer(many=True, read_only=True)
    class Meta:
        model = Challenge
        fields = [
            'id', 'category', 'name', 'description', 'hint',
            'url', 'level', 'points', 'flag', 'attachments'
        ]

class SolveSubmissionSerializer(serializers.Serializer):
    flag = serializers.CharField()

class LeaderboardEntrySerializer(serializers.Serializer):
    username = serializers.CharField()
    total_points = serializers.IntegerField()