DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username     varchar(40) PRIMARY KEY,
  passwd       varchar(40) NOT NULL
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  roomid     SERIAL PRIMARY KEY,
  o          varchar(40),
  x          varchar(40)
);

INSERT INTO users VALUES 
  ('asdf', 'asdf'),
  ('admin', 'admin'),
  ('bartek', 'password'),
  ('agatek', 'asdf');

INSERT INTO rooms (o,x) VALUES 
  ('bartek', 'admin'),
  (null, 'asdf'),
  ('bartek', null),
  ('agatek', null),
  (null, 'bartek'),
  (null, 'bartek'),
  (null, 'bartek'),
  ('agatek', 'bartek');
