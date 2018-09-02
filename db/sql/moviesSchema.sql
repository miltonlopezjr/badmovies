-- SET UP SCHEMA HERE

drop table movies;

CREATE TABLE movies (
  vote_count int,
  id int,
  video boolean,
  vote_average int,
  title varchar(255),
  popularity decimal(5,5),
  poster_path varchar(255),
  original_language varchar(100),
  original_title varchar(100),
  backdrop_path varchar(100),
  adult boolean,
  release_date date
)