# Generated by Django 5.0.3 on 2024-04-01 07:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=10)),
                ('section', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percent', models.IntegerField()),
                ('cid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.course')),
            ],
        ),
        migrations.CreateModel(
            name='Outcome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('plo', models.CharField(max_length=2)),
                ('oc', models.IntegerField()),
                ('target', models.IntegerField()),
                ('pass_value', models.IntegerField()),
                ('cid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.course')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('full_name', models.CharField(max_length=255)),
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=10)),
                ('cid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.course')),
            ],
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.IntegerField()),
                ('aid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.activity')),
                ('oid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.outcome')),
                ('sid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.student')),
            ],
        ),
    ]
