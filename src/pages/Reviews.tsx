import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setReviews(data);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

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

        {loading ? (
          <p className="mt-16 text-center text-muted-foreground">Загрузка...</p>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <AnimatedSection key={review.id} delay={i * 0.1}>
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
        )}
      </div>
    </div>
  );
};

export default Reviews;
