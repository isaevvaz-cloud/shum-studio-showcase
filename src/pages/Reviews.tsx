import { Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const reviews = [
  {
    name: "Александр К.",
    company: "ООО «ТехноМаркет»",
    text: "Заказывали инфографику для карточек на Wildberries. Результат превзошёл ожидания — конверсия выросла на 40%! Ребята из SHUM реально понимают, как продавать через визуал.",
    rating: 5,
  },
  {
    name: "Мария С.",
    company: "Стример на Twitch",
    text: "Получила полный пакет для стрима: оверлей, панели, алерты. Всё идеально сочетается, зрители постоянно хвалят дизайн. Рекомендую!",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    company: "Бренд натуральной косметики",
    text: "Делали инфографику для Ozon. Команда быстро вникла в специфику продукта и сделала карточки, которые выделяются среди конкурентов.",
    rating: 5,
  },
  {
    name: "Екатерина Л.",
    company: "Маркетинговое агентство",
    text: "Сотрудничаем с SHUM уже больше года. Баннеры для наших клиентов всегда на высшем уровне. Быстро, качественно, с пониманием задачи.",
    rating: 5,
  },
  {
    name: "Игорь Т.",
    company: "YouTube-блогер",
    text: "Заказывал дизайн превью и баннеров для канала. Стиль получился узнаваемым и ярким. Просмотры видео заметно подросли!",
    rating: 4,
  },
  {
    name: "Анна П.",
    company: "Селлер на маркетплейсах",
    text: "Перешла на работу с SHUM после нескольких неудачных опытов с другими дизайнерами. Наконец-то получаю именно то, что нужно для продаж.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <div className="py-20 md:py-28">
      <div className="container">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-center">
            <span className="text-gradient">Отзывы</span> клиентов
          </h1>
          <p className="mt-4 text-center text-muted-foreground max-w-lg mx-auto">
            Что говорят о нас наши клиенты
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <AnimatedSection key={review.name} delay={i * 0.1}>
              <div className="h-full p-7 rounded-2xl bg-card border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-4 h-4 ${si < review.rating ? "text-primary fill-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed flex-1">«{review.text}»</p>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="font-display font-semibold text-foreground text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{review.company}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
