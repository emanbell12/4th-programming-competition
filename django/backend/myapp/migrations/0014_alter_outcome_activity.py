# Generated by Django 5.0.3 on 2024-04-03 23:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0013_alter_outcome_activity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outcome',
            name='activity',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapp.activity'),
        ),
    ]
