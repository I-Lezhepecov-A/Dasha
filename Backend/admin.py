from django.contrib import admin

from django.contrib import admin
from . models import Type, User, Document, Role, Comment
admin.site.register(Type)
admin.site.register(User)
admin.site.register(Role)
admin.site.register(Document)
admin.site.register(Comment)
