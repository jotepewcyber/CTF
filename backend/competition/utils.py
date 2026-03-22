from competition.models import Competition
from django.utils import timezone

def is_competition_running():
    try:
        comp = Competition.objects.get(is_active=True)
        now = timezone.now()
        return comp.start_time <= now < comp.end_time
    except Competition.DoesNotExist:
        return False
    
def get_active_competition():
    now = timezone.now()
    return Competition.objects.filter(is_active=True, start_time__lte=now, end_time__gte=now).first()