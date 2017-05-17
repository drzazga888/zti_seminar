# 1. Podstawowa konfiguracja

- Należy ściągnąć i zainstalować najnowszą wersję Node.js wraz z NPM - https://nodejs.org/en/
- Aplikacja będzie wymagała bazy danych z danymi "person" (baza z zajęć); można ją utworzyć tutaj: https://www.elephantsql.com/ 

```sql
CREATE TABLE person (
  id serial primary key,
  fname varchar,
  lname varchar,
  city varchar,
  email varchar(50),
  tel varchar(50)
);
INSERT INTO person (fname, lname, city, email, tel) VALUES ('Adam', 'Abacki', 'Szczecin', 'aaa@bbb.pl', '234123234');
```

- Upewniamy się, czy mamy sterownik `postgresql-9.3-1104.jdbc41.jar` dodany do naszego serwera WAS Liberty
- Należy odpowiednio zmodyfikować zawartość pliku `server.xml`, dodając / modyfikując wpisy JNDI:

```xml
<library filesetRef="${wlp.server.name}" id="ElephantSQL">
    <fileset dir="${server.config.dir}/resources/lib" includes="postgresql-9.3-1104.jdbc41.jar"/>
</library>
 
<dataSource jndiName="jdbc/Elephant" statementCacheSize="10" type="javax.sql.DataSource">
      <jdbcDriver libraryRef="ElephantSQL"/>
      <properties databaseName="[[nazwa bazy]]" password="[[haslo]]" portNumber="5432"
  serverName="[[nazwa serwera]]" user="[[uzytkownik]]"/>
      <connectionManager maxPoolSize="3" purgePolicy="FailingConnectionOnly"/>
</dataSource>
```

- należy utworzyć nowy projekt typu **Dynamic Web Project**, który zawiera następujące zależności (tzw. Server Facets):
  - Java
  - JavaScript
  - Dynamic Web Project
  - JAX-RS Restful WebService
