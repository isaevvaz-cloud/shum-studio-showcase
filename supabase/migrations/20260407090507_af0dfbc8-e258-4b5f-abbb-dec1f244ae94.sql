
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  text text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can insert reviews" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews" ON public.reviews
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews" ON public.reviews
  FOR DELETE TO authenticated USING (true);

-- Seed with existing hardcoded reviews
INSERT INTO public.reviews (name, company, text, rating, sort_order) VALUES
  ('Александр К.', 'ООО «ТехноМаркет»', 'Заказывали инфографику для карточек на Wildberries. Результат превзошёл ожидания — конверсия выросла на 40%! Ребята из SHUM реально понимают, как продавать через визуал.', 5, 1),
  ('Мария С.', 'Стример на Twitch', 'Получила полный пакет для стрима: оверлей, панели, алерты. Всё идеально сочетается, зрители постоянно хвалят дизайн. Рекомендую!', 5, 2),
  ('Дмитрий В.', 'Бренд натуральной косметики', 'Делали инфографику для Ozon. Команда быстро вникла в специфику продукта и сделала карточки, которые выделяются среди конкурентов.', 5, 3),
  ('Екатерина Л.', 'Маркетинговое агентство', 'Сотрудничаем с SHUM уже больше года. Баннеры для наших клиентов всегда на высшем уровне. Быстро, качественно, с пониманием задачи.', 5, 4),
  ('Игорь Т.', 'YouTube-блогер', 'Заказывал дизайн превью и баннеров для канала. Стиль получился узнаваемым и ярким. Просмотры видео заметно подросли!', 4, 5),
  ('Анна П.', 'Селлер на маркетплейсах', 'Перешла на работу с SHUM после нескольких неудачных опытов с другими дизайнерами. Наконец-то получаю именно то, что нужно для продаж.', 5, 6);
