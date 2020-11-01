# Generated by Django 3.0.8 on 2020-10-18 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('onlineshopApp', '0010_auto_20201018_1920'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='product_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='comment_id', to='onlineshopApp.Product'),
        ),
        migrations.AddField(
            model_name='rating',
            name='product_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='rating_id', to='onlineshopApp.Product'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='productCode',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='rating',
            name='productCode',
            field=models.IntegerField(default=0),
        ),
    ]
