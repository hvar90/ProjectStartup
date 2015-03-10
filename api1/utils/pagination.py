from rest_framework import pagination
from rest_framework import serializers

class LinksSerializer(serializers.Serializer):
    next = pagination.NextPageField(source='*')
    prev = pagination.PreviousPageField(source='*')

class CustomPaginationSerializer(pagination.BasePaginationSerializer):
    links = LinksSerializer(source='*')  # Takes the page object as the source
    total_results = serializers.Field(source='paginator.count')
    num_page = serializers.Field(source='paginator.num_pages')

    results_field = 'objects'
