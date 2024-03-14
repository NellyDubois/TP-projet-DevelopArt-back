export PGUSER=postgres
export PGPORT=5432

# export PGUSER=JulieZaccaria
# export PG_URL=postgresql://JulieZaccaria:QgD7PTXw4sjk@ep-divine-shadow-a2r2gb0p-pooler.eu-central-1.aws.neon.tech/developart?sslmode=require

# Exécution du script d'initialisation de la BDD
psql -f 1.init_db.sql

# Prise de l'identité de l'admin pour exécuter le script ( il sera ainsi OWNER des tables )
export PGUSER=admin_developart
export PGDATABASE=developart

# Exécution du script de création des tables
psql -f 2.create_tables.sql

# Exécution du script de seeding de la BDD
psql -f 3.seeding.sql

# Exécution du script de création des fonctions
psql -f 4.functions.sql
