# Generated by Django 4.1.2 on 2023-04-18 13:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_productvariant_sizes_productvariant_size'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productvariant',
            old_name='size',
            new_name='sizes',
        ),
    ]
