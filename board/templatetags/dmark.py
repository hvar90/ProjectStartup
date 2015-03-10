
from django.template import Library
from django.utils.safestring import mark_safe

try: 
    from board.dmark import DMark
except ImportError:    
    from appSocialchan.src.boardsHandler.services.objs.board.dmark import DMark

register = Library()


@register.filter
def dmark(value):
    """
        Run DMark over a given value.

        Syntax::

            {{ value|dmark }}
    """
    return mark_safe(DMark().convert(value))

dmark.is_safe = True
