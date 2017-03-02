--  DELETE DATABASE     =   =   =   =   =   =   =
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS message_status;
DROP TABLE IF EXISTS cipher;
DROP TABLE IF EXISTS bonus;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS team;

DROP SEQUENCE IF EXISTS task_pk;
DROP SEQUENCE IF EXISTS message_pk;
DROP SEQUENCE IF EXISTS message_status_pk;
DROP SEQUENCE IF EXISTS cipher_pk;
DROP SEQUENCE IF EXISTS bonus_pk;
DROP SEQUENCE IF EXISTS country_pk;
DROP SEQUENCE IF EXISTS account_pk;
DROP SEQUENCE IF EXISTS team_pk;


--  CREATE DATABASE =   =   =   =   =   =   =   =

-- Sequences
CREATE SEQUENCE public.team_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.account_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.country_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.bonus_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.cipher_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.message_status_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.message_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.task_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;
-- Tables

CREATE TABLE public.team
(
    id integer NOT NULL DEFAULT nextval('team_pk'),
    team_name text,
    PRIMARY KEY (id)
);


CREATE TABLE public.account
(
    id integer NOT NULL DEFAULT nextval('account_pk'),
    username text,
    password text,
    team_id integer,
    PRIMARY KEY (id),
    FOREIGN KEY (team_id) REFERENCES public.team (id)
);

CREATE TABLE public.country
(
    id integer NOT NULL DEFAULT nextval('country_pk'),
    team_id integer,
    name text,
    demonym text,
    PRIMARY KEY (id),
    FOREIGN KEY (team_id) REFERENCES public.team (id)
);

CREATE TABLE public.bonus
(
    id integer NOT NULL DEFAULT nextval('bonus_pk'),
    title text,
    bonus_description text,
    task_description text,
    default_message text,
    PRIMARY KEY (id)
);

CREATE TABLE public.cipher
(
    id integer NOT NULL DEFAULT nextval('cipher_pk'),
    tier integer,
    ipc_cost integer,
    cipher_word text,
    PRIMARY KEY (id)
);

CREATE TABLE public.message_status
(
    id integer NOT NULL DEFAULT nextval('message_status_pk'),
    name text,
    PRIMARY KEY (id)
);

CREATE TABLE public.message
(
    id integer NOT NULL DEFAULT nextval('message_pk'),
    country_id integer,
    bonus_id integer,
    message_status_id integer,
    cipher_id integer,
    message_plain text,
    message_encoded text,
    guessed boolean,
    create_time timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (country_id) REFERENCES public.country (id),
    FOREIGN KEY (bonus_id) REFERENCES public.bonus (id),
    FOREIGN KEY (message_status_id) REFERENCES public.message_status (id),
    FOREIGN KEY (cipher_id) REFERENCES public.cipher (id)
);

CREATE TABLE public.task
(
    id integer NOT NULL DEFAULT nextval('task_pk'),
    target_country_id integer,
    message_id integer,
    task_description text,
    completed boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (message_id) REFERENCES public.message (id)
);


-- INITIALIZATION DATA  =   =   =   =   =   =   =

-- Teams
INSERT INTO public.team VALUES (1, 'Allies');
INSERT INTO public.team VALUES (2, 'Axis');
INSERT INTO public.team VALUES (3, 'Neutral');

-- Accounts
INSERT INTO public.account VALUES (1, 'admin','eisenhower', 3);
INSERT INTO public.account VALUES (2, 'allied_command', 'enigma50',1);
INSERT INTO public.account VALUES (3, 'axis_command', 'wolfpack179', 2);
INSERT INTO public.account VALUES (4, 'allied_decoder', 'turing1938',1);
INSERT INTO public.account VALUES (5, 'axis_decoder', 'rommel1844', 2);

-- Countries
INSERT INTO public.country VALUES (1, 2, 'Germany','German');
INSERT INTO public.country VALUES (2, 1, 'Russia', 'Russian');
INSERT INTO public.country VALUES (3, 2, 'Japan', 'Imperial Japanese');
INSERT INTO public.country VALUES (4, 1, 'United States of America', 'American');
INSERT INTO public.country VALUES (5, 1, 'China', 'Chinese');
INSERT INTO public.country VALUES (6, 1, 'United Kingdom', 'English');
INSERT INTO public.country VALUES (7, 1, 'United Kingdom - Pacific', 'Pacific English');
INSERT INTO public.country VALUES (8, 2, 'Italy', 'Italian');
INSERT INTO public.country VALUES (9, 1, 'Austrailian and New Zealand Army Corp', 'ANZAC');
INSERT INTO public.country VALUES (10, 2, 'France', 'French');

-- Message Statuses
INSERT INTO public.message_status VALUES (1, 'SENT');
INSERT INTO public.message_status VALUES (2, 'BROKEN');
INSERT INTO public.message_status VALUES (3, 'COUNTERED');
INSERT INTO public.message_status VALUES (4, 'SUCCESS');
INSERT INTO public.message_status VALUES (5, 'USED');


-- TEST DATA    =   =   =   =   =   =   =   =   =

INSERT INTO public.cipher VALUES (1,1,1,'ZONE');
INSERT INTO public.cipher VALUES (2,2,2,'ZEBRAS');
INSERT INTO public.cipher VALUES (3,3,3,'MAXIMIZE');

INSERT INTO public.bonus VALUES (1,
                                    'Trade Deal',
                                    'Gain 5 additional IPCs',
                                    'Give 5 IPCs to <COUNTRY>',
                                    'From <TEAM> Command: Our <DEMONYM> ambassadors have made a successful deal with Brazil. Additional resources are on their way'
                                );
INSERT INTO public.bonus VALUES (2,
                                    'Surpise Attack',
                                    'When you next attack the specified country, you gain an additional 3 infantry, or 1 infantry and 1 armor',
                                    'Give <COUNTRY> Additional Units when attacking <TERRITORY>',
                                    '<OFFICER_TITLE> <OFFICER_NAME> is moving additional forces to support your attack on <TERRITORY>'
                                );

INSERT INTO public.bonus VALUES (3,
                                    'Sabotage',
                                    'Deal 1d6 of damage to enemy facility in specified territory',
                                    'Deal 1d6 of damage to <FACILITY> in <TERRITORY>',
                                    'Our agents have infiltrated the <DEMONYM> <FACILITY> in <TERRITORY>. They stand ready to sabotage on your command'
                                );

