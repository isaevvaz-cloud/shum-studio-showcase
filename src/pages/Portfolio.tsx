import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const categories = ["Все", "Инфографика", "Стримы", "Баннеры"];

const projects = [
  { img: portfolio1, title: "Карточка товара — электроника", category: "Инфографика" },
  { img: portfolio2, title: "Twitch оверлей — киберпанк", category: "Стримы" },
  { img: portfolio3, title: "Промо-баннер распродажа", category: "Баннеры" },
  { img: portfolio4, title: "Инфографика — добавки", category: "Инфографика" },
  { img: portfolio5, title: "Карточка товара — наушники", category: "Инфографика" },
  { img: portfolio6, title: "Стрим-пак — полный комплект", category: "Стримы" },
];

const Portfolio = () => {
  const [active, setActive] = useState("Все");
  const filtered = active === "Все" ? projects : projects.filter((p) => p.category === active);

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

        <AnimatedSection className="mt-10">
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <AnimatedSection key={project.title + i} delay={i * 0.1}>
              <div className="group rounded-2xl overflow-hidden bg-card border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{project.category}</span>
                  <h3 className="mt-1 font-display font-semibold text-foreground">{project.title}</h3>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
