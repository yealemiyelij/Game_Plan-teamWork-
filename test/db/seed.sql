INSERT INTO member_profile
    (frist_name, last_name, username, birth_date, email_address, password, phone_number)
VALUES("xxx", "yyy", "xyxy", "2018-10-10", "xyxy@gmail.com", "xyxy_yxyx", "1-704-000-0000");
INSERT INTO group_profile
    (group_name, admin_username, group_description, group_created, group_updated)
VALUES("football group", "Ryan", "table tennis group", "2017-12-09", "2017-12-13" );
INSERT INTO group_profile
    (group_name, admin_username, group_description, group_created, group_updated)
VALUES("soccer group", "Keylla", "English Priemer League soccer fun", "2017-12-08", "2017-12-16" );

INSERT INTO group_profile
    (group_name, admin_username, group_description, group_created, group_updated)
VALUES("tennis group", "Wondu", "table tennis group", "2017-12-09", "2017-12-11" );



INSERT INTO event_profile
    (event_admin, group_name, event_name, event_date, private_event, ongoing_event)
VALUES
    ("Ryan", "football group", "celeb night", "2017-12-20", TRUE, FALSE),
    ("Keylla", "soccer group", "re-grouping", " 2017-12-23", TRUE, FALSE),
    ("Wondu", "tennis group", "winners night", "2017-12-19", TRUE, FALSE);

INSERT INTO Entlocation_markers
    (location_name, location_address, lat, lng, event_id)
VALUES
    ("Myers Park High", "2400 Colony Rd", "35.171643", "-80.833236", 1),
    ("Kirk Farm Fields", "210 E Mallard Creek Church RD", "35.322072", "-80.730994", 2),
    ("Freedom park tennis courts", "1900 East Blvd", "35.195353", "-80.838736", 3)