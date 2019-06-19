BEGIN;


INSERT INTO blogful_articles (title, date_published, content)
VALUES
  ('book of 1', now() - '3 days'::INTERVAL, 'this is a content'),
  ('book of 2', now() - '2 days'::INTERVAL, 'this is a content'),
  ('book of 3', now() - '5 days'::INTERVAL, 'this is a content'),
  ('crazy rock', now() - '16 days'::INTERVAL, 'this is a content'),
  ('peppered paper', now() - '25 days'::INTERVAL, 'this is a content'),
  ('random words', now() - '3 days'::INTERVAL, 'this is a content'),
  ('generator of book titles', now(), 'this is a content'),
  ('articles are dumb', now(), 'this is a content'),
  ('is someone going to check this?', now(), 'this is a content'),
  ('who knows what is next', now(), 'this is a content'),
  ('Begginings of the beginnings', now(), 'this is a content'),
  ('Bruce Wayne is Batman, wow', now(), 'this is a content'),
  ('Superman is a news reporter', now(), 'this is a content');




COMMIT;