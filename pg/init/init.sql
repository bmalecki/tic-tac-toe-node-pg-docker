DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username     varchar(40) PRIMARY KEY,
  passwd       varchar(40) NOT NULL
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  roomid     SERIAL PRIMARY KEY,
  player1          varchar(40),
  player2          varchar(40),
  game_status      varchar(40),
  fields            json
);

INSERT INTO users VALUES 
  ('asdf', 'asdf'),
  ('admin', 'admin'),
  ('bartek', 'password'),
  ('agatek', 'asdf');

