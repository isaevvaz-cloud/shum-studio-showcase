import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface VkPhoto {
  id: number;
  url: string;
  width: number;
  height: number;
  text: string;
  date: number;
}

const Portfolio = () => {
  const [photos, setPhotos] = useState<VkPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<VkPhoto | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("vk-album-photos", {
          method: "GET",
        });

        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        setPhotos(data.photos || []);
      } catch (err: any) {
        console.error("Failed to load portfolio:", err);
        setError("Не удалось загрузить портфолио");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="py-20 md:py-28">
      <div className="container">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-center">
            Наше <span className="text-gradient">портфолио</span>
          </h1>
          <p className="mt-4 text-center text-muted-foreground max-w-lg mx-auto">
            Избранные работы в области инфографики, дизайна стримов и баннеров
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}

          {error && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            photos.map((photo, i) => (
              <AnimatedSection key={photo.id} delay={i * 0.05}>
                <div
                  className="group rounded-2xl overflow-hidden bg-card border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.text || "Работа из портфолио"}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {photo.text && (
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-foreground line-clamp-2">
                        {photo.text}
                      </h3>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.text || "Работа из портфолио"}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Portfolio;
