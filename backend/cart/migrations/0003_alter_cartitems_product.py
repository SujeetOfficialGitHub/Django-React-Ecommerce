# Generated by Django 4.1.2 on 2023-05-27 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_product_title'),
        ('cart', '0002_alter_cartitems_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitems',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.product'),
        ),
    ]
