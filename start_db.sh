export $(egrep -v '^#' .env | xargs)

docker run -d --rm --name $DB_CONTAINER -p $DB_PORT:3306 -e MYSQL_ROOT_PASSWORD=$DB_PASSWORD -e MYSQL_DATABASE=$DB_DATABASE mysql:5.7.29

yarn wait-for-mysql -u root -P $DB_PASSWORD -h $DB_HOST -p $DB_PORT -T 20000 --quiet

yarn db:migration:run
