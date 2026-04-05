import { useState, useEffect, useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img81 from "@/assets/portfolio/81.jpg";
import img82 from "@/assets/portfolio/82.jpg";
import img83 from "@/assets/portfolio/83.jpg";
import img84 from "@/assets/portfolio/84.jpg";
import img85 from "@/assets/portfolio/85.jpg";
import img88 from "@/assets/portfolio/88.jpg";
import img65 from "@/assets/portfolio/65.jpg";
import img72 from "@/assets/portfolio/72.jpg";
import img89 from "@/assets/portfolio/89.jpg";
import img1_6 from "@/assets/portfolio/1_6.jpg";
import img1_2 from "@/assets/portfolio/1_2.jpg";
import img2_2 from "@/assets/portfolio/2_2.jpg";
import img2_1 from "@/assets/portfolio/2_1.jpg";
import img3_2 from "@/assets/portfolio/3_2.jpg";
import img3_1 from "@/assets/portfolio/3_1.jpg";
import imgBanner1 from "@/assets/portfolio/banner_1.jpg";
import imgBanner4 from "@/assets/portfolio/banner_4.jpg";

type Category = "all" | "infographics" | "vk" | "banners" | "streams";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "Портфолио" },
  { key: "infographics", label: "Инфографика" },
  { key: "vk", label: "Оформление группы вк" },
  { key: "banners", label: "Баннеры" },
  { key: "streams", label: "Оформление стримов" },
];

interface VkPhoto {
  id: number;
  url: string;
  width: number;
  height: number;
  text: string;
  date: number;
}

const staticPortfolio = [
  { id: 81, url: img81, text: "Крючки для ванной", category: "infographics" as Category },
  { id: 82, url: img82, text: "Apple iPhone 17 Pro Max", category: "infographics" as Category },
  { id: 83, url: img83, text: "ТВ приставка Mi Box S 3nd Gen", category: "infographics" as Category },
  { id: 84, url: img84, text: "Молоток универсальный", category: "infographics" as Category },
  { id: 85, url: img85, text: "Кронштейн для ТВ", category: "infographics" as Category },
  { id: 88, url: img88, text: "Зарядное устройство UGREEN 65W", category: "infographics" as Category },
  { id: 89, url: img89, text: "Xiaomi BE7000 роутер", category: "infographics" as Category },
  { id: 16, url: img1_6, text: "Apple Shop баннер", category: "vk" as Category },
  { id: 12, url: img1_2, text: "Apple Shop аватар", category: "vk" as Category },
  { id: 22, url: img2_2, text: "ЖК Курортный баннер", category: "vk" as Category },
  { id: 21, url: img2_1, text: "ЖК Новоянино", category: "vk" as Category },
  { id: 32, url: img3_2, text: "Туры по Кавказу аватар", category: "vk" as Category },
  { id: 31, url: img3_1, text: "Туры по Кавказу баннер", category: "vk" as Category },
  { id: 101, url: imgBanner1, text: "ЖК Театрал", category: "banners" as Category },
  { id: 102, url: imgBanner4, text: "Школа фитнес-тренеров", category: "banners" as Category },
];

const Portfolio = () => {
  const [photos, setPhotos] = useState<VkPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; text: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

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
    ...staticPortfolio.map((p) => ({ id: p.id, url: p.url, text: p.text, category: p.category })),
    ...photos.map((p) => ({ id: p.id, url: p.url, text: p.text, category: "infographics" as Category })),
  ];

  const filteredItems = activeCategory === "all"
    ? allItems
    : allItems.filter((item) => item.category === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-8 relative group/carousel">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground -translate-x-1/2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground translate-x-1/2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading &&
              photos.length === 0 &&
              staticPortfolio.length === 0 &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px]">
                  <Skeleton className="aspect-[3/4] rounded-2xl" />
                </div>
              ))}

            {filteredItems.map((photo) => (
              <div
                key={photo.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] snap-start"
              >
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
              </div>
            ))}
          </div>
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
