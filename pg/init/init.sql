CREATE TABLE users (
    username     varchar(40) CONSTRAINT firstkey PRIMARY KEY,
    passwd       varchar(40) NOT NULL
);

INSERT INTO users VALUES
    ('first', 'qwert');

INSERT INTO users VALUES
    ('asdf', 'asdf');