import codecs

from django.http            import Http404
from django.template        import RequestContext
from django.template.loader import render_to_string
from django.core.paginator  import InvalidPage, EmptyPage
from board.models           import SectionGroup

   

__all__ = ["get_page_or_404", "add_sidebar", "render_to_file"]


def get_page_or_404(paginator, page):
    """Obtiene pagina de la instancia del paginador o lanza un Http404 error."""
    try:
        return paginator.page(page)
    except (InvalidPage, EmptyPage):
        raise Http404


def add_sidebar(context={}):
    """actualiza contexto del diccionario con sidebar."""
    return dict(context, navigation=SectionGroup.objects.tree())


def render_to_file(template, filename, request, context):
    """Renders template to filename."""
    with codecs.open(filename, "w", "utf-8") as f:
        f.write(render_to_string(template, context, RequestContext(request)))
