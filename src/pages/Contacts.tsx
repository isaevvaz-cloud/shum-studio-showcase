import { Mail, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const VkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z" />
  </svg>
);

const contacts = [
  { icon: Mail, label: "Email", value: "isaev.vaz@yandex.ru", href: "mailto:isaev.vaz@yandex.ru" },
  { icon: VkIcon, label: "VK", value: "designstudioshum", href: "https://vk.com/designstudioshum" },
];

const Contacts = () => {
  return (
    <div className="py-20 md:py-28">
      <div className="container max-w-4xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-center">
            <span className="text-gradient">Контакты</span>
          </h1>
          <p className="mt-4 text-center text-muted-foreground max-w-lg mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1}>
              <a
                href={item.href}
                className="group flex items-start gap-5 p-7 rounded-2xl bg-card border border-border/50 card-shadow hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-display font-semibold text-foreground mt-1">{item.value}</div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-16">
          <div className="rounded-2xl bg-card border border-border/50 p-10 md:p-14 text-center glow-border">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Предпочитаете писать?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Напишите нам в Telegram — мы ответим в течение часа в рабочее время.
            </p>
            <a
              href="https://t.me/shum_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold transition-all hover:opacity-90"
            >
              <Send className="w-5 h-5" />
              Написать в Telegram
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contacts;
