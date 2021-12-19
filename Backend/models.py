from django.db import models
from django.contrib.auth.models import UserManager
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_admin=False, is_staff=False, is_active=True):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
        # if not full_name:
        #     raise ValueError("User must have a full name")

        user = self.model(
            email=self.normalize_email(email)
        )
        # user.full_name = full_name
        user.set_password(password)  # change password to hash
        # user.profile_picture = profile_picture
        user.admin = is_admin
        user.staff = is_staff
        user.active = is_active
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
        # if not full_name:
        #     raise ValueError("User must have a full name")

        user = self.model(
            email=self.normalize_email(email)
        )
        # user.full_name = full_name
        user.set_password(password)
        # user.profile_picture = profile_picture
        user.admin = True
        user.staff = True
        user.active = True
        user.save(using=self._db)
        return user

class Role(models.Model):
    role = models.CharField(max_length=128, null=True)

    def __str__(self):
        return self.role

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

class Type(models.Model):
    type = models.CharField(max_length=128, null=True)

    def __str__(self):
        return self.type
  
    class Meta:
        verbose_name = 'Тип файла'
        verbose_name_plural = 'Типы файлов'
    

class User(AbstractBaseUser):
    REQUIRED_FIELDS = ('name', 'password',)

    name = models.CharField(max_length=128)
    username = models.CharField(max_length=128)
    email = models.CharField(max_length=128, unique=True)
    phone = models.CharField(max_length=128)
    password = models.CharField(max_length=256, default="PassW0rd")
    role = models.ForeignKey(Role, on_delete=models.CASCADE, default=1)
    last_login = models.DateField
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    def get_full_name(self):
        return self.username

    def get_short_name(self):
         return self.username

    @staticmethod
    def has_perm(perm, obj=None):
        return True

    @staticmethod
    def has_module_perms(app_label):
         return True

    @property
    def is_staff(self):
         return self.staff

    @property
    def is_admin(self):
         return self.admin

    @property
    def is_active(self):
         return self.active

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def is_anonymous(self):
        """
        Always return False. This is a way of comparing User objects to
        anonymous users.
        """
        return False

    @property
    def is_authenticated(self):
        """
        Always return False. This is a way of comparing User objects to
        anonymous users.
        """
        return False

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

class Document(models.Model):
    file_name = models.FileField(upload_to="files/")
    description = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    type = models.ForeignKey(Type, on_delete=models.CASCADE,)
    # comment = models.ForeignKey(Comment, on_delete=models.CASCADE,)

    @property
    def comment(self):
        return Comment.fin

    def __str__(self):
        return self.description

    class Meta:
        verbose_name = 'Файл'
        verbose_name_plural = 'Файлы'

class Comment(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+', default=0)
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+', default=0)
    document = models.ForeignKey(Document, on_delete=models.CASCADE,)
    comment = models.CharField(max_length=256)

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
