import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

import img81 from "@/assets/portfolio/81.jpg";
import img82 from "@/assets/portfolio/82.jpg";
import img83 from "@/assets/portfolio/83.jpg";
import img84 from "@/assets/portfolio/84.jpg";
import img85 from "@/assets/portfolio/85.jpg";
import img88 from "@/assets/portfolio/88.jpg";
import img89 from "@/assets/portfolio/89.jpg";

interface VkPhoto {
  id: number;
  url: string;
  width: number;
  height: number;
  text: string;
  date: number;
}

const staticPortfolio = [
  { id: 81, url: img81, text: "Крючки для ванной" },
  { id: 82, url: img82, text: "Apple iPhone 17 Pro Max" },
  { id: 83, url: img83, text: "ТВ приставка Mi Box S 3nd Gen" },
  { id: 84, url: img84, text: "Молоток универсальный" },
  { id: 85, url: img85, text: "Кронштейн для ТВ" },
  { id: 88, url: img88, text: "Зарядное устройство UGREEN 65W" },
  { id: 89, url: img89, text: "Xiaomi BE7000 роутер" },
];

const Portfolio = () => {
  const [photos, setPhotos] = useState<VkPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; text: string } | null>(null);

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
        console.error("Failed to load portfolio from VK:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const allItems = [
    ...staticPortfolio.map((p) => ({ id: p.id, url: p.url, text: p.text })),
    ...photos.map((p) => ({ id: p.id, url: p.url, text: p.text })),
  ];

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
            photos.length === 0 &&
            staticPortfolio.length === 0 &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
            ))}

          {allItems.map((photo, i) => (
            <AnimatedSection key={photo.id} delay={i * 0.05}>
              <div
                className="group rounded-2xl overflow-hidden bg-card border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.text || "Работа из портфолио"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
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
