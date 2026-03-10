import { Mail, Phone, MapPin, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const contacts = [
  { icon: Mail, label: "Email", value: "hello@shum.studio", href: "mailto:hello@shum.studio" },
  { icon: Send, label: "Telegram", value: "@shum_studio", href: "https://t.me/shum_studio" },
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
