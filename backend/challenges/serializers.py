from rest_framework import serializers
from .models import Category, Challenge, ChallengeSolve

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ChallengeCardSerializer(serializers.ModelSerializer):
    solved_count = serializers.IntegerField(source='solves.count', read_only=True)
    class Meta:
        model = Challenge
        fields = ['id', 'name', 'level', 'points', 'solved_count', 'category']

class ChallengeDetailSerializer(serializers.ModelSerializer):
    solved_count = serializers.IntegerField(source='solves.count', read_only=True)
    class Meta:
        model = Challenge
        fields = ['id', 'name', 'description', 'hint', 'url', 'level', 'points', 'solved_count', 'category']

class ChallengeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = [
            'id', 'category', 'name', 'description', 'hint',
            'url', 'level', 'points', 'flag'
        ]

class SolveSubmissionSerializer(serializers.Serializer):
    flag = serializers.CharField()