# Generated by Django 4.1.2 on 2023-04-18 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_productvariant_size_productvariant_sizes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productvariant',
            name='sizes',
        ),
        migrations.AddField(
            model_name='productvariant',
            name='size',
            field=models.ManyToManyField(blank=True, null=True, to='api.size'),
        ),
    ]
