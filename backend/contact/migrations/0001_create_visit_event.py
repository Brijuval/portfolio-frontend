from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='VisitEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page_path', models.CharField(max_length=255)),
                ('referrer', models.CharField(blank=True, max_length=500)),
                ('user_agent', models.CharField(blank=True, max_length=500)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ('-created_at',)},
        ),
    ]
