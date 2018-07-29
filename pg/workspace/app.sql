--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4 (Debian 10.4-2.pgdg90+1)
-- Dumped by pg_dump version 10.4 (Debian 10.4-2.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_pkey;
ALTER TABLE public.rooms ALTER COLUMN roomid DROP DEFAULT;
DROP SEQUENCE public.rooms_roomid_seq;
DROP TABLE public.rooms;
SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: rooms; Type: TABLE; Schema: public; Owner: node
--

CREATE TABLE public.rooms (
    roomid integer NOT NULL,
    player1 character varying(40),
    player2 character varying(40),
    game_status character varying(40),
    fields jsonb
);


ALTER TABLE public.rooms OWNER TO node;

--
-- Name: rooms_roomid_seq; Type: SEQUENCE; Schema: public; Owner: node
--

CREATE SEQUENCE public.rooms_roomid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rooms_roomid_seq OWNER TO node;

--
-- Name: rooms_roomid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: node
--

ALTER SEQUENCE public.rooms_roomid_seq OWNED BY public.rooms.roomid;


--
-- Name: rooms roomid; Type: DEFAULT; Schema: public; Owner: node
--

ALTER TABLE ONLY public.rooms ALTER COLUMN roomid SET DEFAULT nextval('public.rooms_roomid_seq'::regclass);


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: node
--

COPY public.rooms (roomid, player1, player2, game_status, fields) FROM stdin;
1	asdf	bartek	winner_player2	{"A1": "player1", "A2": "player1", "A3": "player2", "B2": "player1", "B3": "player1", "C1": "winner_player2", "C2": "winner_player2", "C3": "winner_player2"}
\.


--
-- Name: rooms_roomid_seq; Type: SEQUENCE SET; Schema: public; Owner: node
--

SELECT pg_catalog.setval('public.rooms_roomid_seq', 1, true);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: node
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (roomid);


--
-- PostgreSQL database dump complete
--

