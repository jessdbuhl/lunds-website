-- Seed default site content (run after migrations)
insert into public.site_content (key, value, updated_at)
values
  ('hero_headline', '"Lund''s Swedish Pancake Mix"', now()),
  ('hero_subhead', '"Authentic Scandinavian flavor. Just add water, mix & make—pancakes in minutes."', now()),
  ('hero_image_url', '""', now()),
  ('product_title', '"Lund''s Swedish Pancake Mix"', now()),
  ('product_description', '"Our flagship mix brings the taste of Sweden to your table. Simple ingredients, no fuss—just add water for light, delicious Swedish-style pancakes. Perfect for breakfast or anytime."', now()),
  ('product_image_url', '""', now()),
  ('cta_button_text', '"Buy on Amazon"', now()),
  ('amazon_url', '"https://www.amazon.com"', now()),
  ('story_title', '"Our Story"', now()),
  ('story_text', '"Lund''s has been part of Scandinavian food tradition for generations. Noon Hour Food Products is proud to bring Lund''s Swedish Pancake Mix to American tables—quality you can taste."', now()),
  ('footer_text', '"Lund''s Swedish Pancake Mix · Noon Hour Food Products · Chicago, IL"', now()),
  ('meta_title', '"Lund''s Swedish Pancake Mix | Authentic Scandinavian Pancakes"', now()),
  ('meta_description', '"Authentic Lund''s Swedish Pancake Mix. Just add water for delicious Scandinavian-style pancakes. Available on Amazon."', now())
on conflict (key) do update set
  value = excluded.value,
  updated_at = excluded.updated_at;
