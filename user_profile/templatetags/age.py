from django import template
import datetime

register = template.Library()

def age(birthdate, d=None):
    if d is None:
        d = datetime.date.today()
    return (d.year - birthdate.year) - int((d.month, d.day) < (birthdate.month, birthdate.day))

register.filter('age', age)
