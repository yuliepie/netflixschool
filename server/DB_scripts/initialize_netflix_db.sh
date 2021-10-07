python3 db_scripts/create_db.py
flask db upgrade
python3 db_scripts/seed_enum_tables.py
python3 db_scripts/initialize_netflix_data.py