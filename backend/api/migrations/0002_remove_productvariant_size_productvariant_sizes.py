# Generated by Django 4.1.2 on 2023-04-18 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productvariant',
            name='size',
        ),
        migrations.AddField(
            model_name='productvariant',
            name='sizes',
            field=models.CharField(blank=True, choices=[('S', 'S'), ('M', 'M'), ('X', 'X'), ('XL', 'XL'), ('XXL', 'XXL')], max_length=5, null=True),
        ),
    ]
