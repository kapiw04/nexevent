# Generated by Django 4.2.7 on 2023-11-05 19:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_alter_event_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='owner',
        ),
    ]
