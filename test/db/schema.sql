DROP DATABASE IF EXISTS Game_Plan_db;
CREATE DATABASE Game_Plan_db;
USE Game_Plan_db;

DROP TABLE IF EXISTS member_profile;
CREATE TABLE member_profile
(
    id INT
    AUTO_INCREMENT,
    PRIMARY KEY
    (id),
    frist_name VARCHAR
    (15) NOT NULL,
    last_name VARCHAR
    (15) NOT NULL,
    username VARCHAR
    (15) NOT NULL,
    birth_date VARCHAR
    (35) NOT NULL,
    email_address VARCHAR
    (15) NOT NULL,
    password VARCHAR
    (50) NOT NULL,
    phone_number VARCHAR
    (15) NOT NULL

)ENGINE = INNODB;

    DROP TABLE IF EXISTS group_profile;
    CREATE TABLE group_profile
    (
        id INT
        AUTO_INCREMENT,
    PRIMARY KEY
        (id),
    group_name VARCHAR
        (15) NOT NULL,
    admin_username VARCHAR
        (15) NOT NULL,
    group_description VARCHAR
        (50),
    group_created TIMESTAMP,
    group_updated TIMESTAMP 

)ENGINE = INNODB;

        DROP TABLE IF EXISTS event_profile;
        CREATE TABLE event_profile
        (
            id INT
            AUTO_INCREMENT,
    PRIMARY KEY
            (id), 
    event_admin VARCHAR
            (15) NOT NULL,
    group_name VARCHAR
            (15) NOT NULL,
    event_name VARCHAR
            (15) NOT NULL,
    event_date DATE NOT NULL,
    private_event BOOLEAN ,
    ongoing_event BOOLEAN
)ENGINE = INNODB;

            DROP TABLE IF EXISTS entLocation_markers;
            CREATE TABLE entLocation_markers
            (
                id INT
                AUTO_INCREMENT,
    PRIMARY KEY
                (id),
   location_name VARCHAR
                (60) NOT NULL ,
                
    location_address VARCHAR
                (80) NOT NULL ,
    lat FLOAT
                (10, 6) NOT NULL ,
    lng FLOAT
                (10, 6) NOT NULL ,
    event_id INT 
    
)ENGINE = INNODB;


            



