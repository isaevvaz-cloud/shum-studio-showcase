import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Monitor, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-bg.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const services = [
  {
    icon: Palette,
    title: "Инфографика для маркетплейсов",
    description: "Продающие карточки товаров для Wildberries, Ozon и других площадок. Увеличиваем конверсию через визуал.",
  },
  {
    icon: Monitor,
    title: "Дизайн стримов",
    description: "Оверлеи, панели, алерты и полный визуальный пакет для стримеров на Twitch и YouTube.",
  },
  {
    icon: Image,
    title: "Баннеры и креативы",
    description: "Рекламные баннеры, промо-материалы и визуальный контент для любых платформ.",
  },
];

const stats = [
  { value: "500+", label: "Проектов" },
  { value: "150+", label: "Клиентов" },
  { value: "4", label: "Года опыта" },
  { value: "98%", label: "Довольных клиентов" },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Создаём
              <br />
              <span className="text-gradient">визуальный шум</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Дизайн-студия SHUM — инфографика для маркетплейсов, дизайн стримов и баннеров, которые привлекают внимание и продают.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-display font-semibold text-base px-8">
                <Link to="/order">
                  Заказать дизайн <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-display font-semibold text-base px-8 border-border hover:bg-secondary">
                <Link to="/portfolio">Портфолио</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-32">
        <div className="container">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center">
              Наши <span className="text-gradient">услуги</span>
            </h2>
            <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
              Полный спектр дизайн-услуг для вашего бизнеса
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.15}>
                <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 card-shadow hover:glow-border h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50 bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="py-20 md:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-bold">
                  Избранные <span className="text-gradient">работы</span>
                </h2>
                <p className="mt-3 text-muted-foreground">Последние проекты нашей студии</p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex border-border hover:bg-secondary">
                <Link to="/portfolio">
                  Все работы <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: portfolio1, title: "Инфографика товара", cat: "Маркетплейс" },
              { img: portfolio2, title: "Дизайн стрима", cat: "Стриминг" },
              { img: portfolio3, title: "Промо-баннер", cat: "Баннеры" },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="group rounded-2xl overflow-hidden bg-card border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary">{item.cat}</span>
                    <h3 className="mt-1 font-display font-semibold text-foreground">{item.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="border-border hover:bg-secondary">
              <Link to="/portfolio">
                Все работы <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="relative rounded-3xl bg-card border border-border/50 p-10 md:p-16 text-center glow-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold">
                  Готовы создать <span className="text-gradient">шум</span>?
                </h2>
                <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                  Расскажите нам о вашем проекте, и мы создадим дизайн, который будет продавать.
                </p>
                <Button asChild size="lg" className="mt-8 font-display font-semibold text-base px-10">
                  <Link to="/order">
                    Оставить заявку <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
