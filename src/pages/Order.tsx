import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const serviceOptions = [
  "Инфографика для маркетплейсов",
  "Дизайн стримов",
  "Баннеры и креативы",
  "Другое",
];

const Order = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !selectedService) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", contact: "", message: "" });
    setSelectedService("");
  };

  return (
    <div className="py-20 md:py-28">
      <div className="container max-w-2xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-center">
            Заказать <span className="text-gradient">дизайн</span>
          </h1>
          <p className="mt-4 text-center text-muted-foreground">
            Расскажите о вашем проекте — мы подготовим предложение
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            {/* Service selection */}
            <div>
              <label className="block font-display text-sm font-semibold text-foreground mb-3">
                Выберите услугу *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-xl text-sm font-medium text-left transition-all border ${
                      selectedService === service
                        ? "bg-primary/10 border-primary/50 text-foreground"
                        : "bg-card border-border/50 text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-display text-sm font-semibold text-foreground mb-2">
                Ваше имя *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Как к вам обращаться"
                className="bg-card border-border/50 focus:border-primary/50 h-12"
              />
            </div>

            <div>
              <label className="block font-display text-sm font-semibold text-foreground mb-2">
                Контакт для связи *
              </label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Telegram, WhatsApp или email"
                className="bg-card border-border/50 focus:border-primary/50 h-12"
              />
            </div>

            <div>
              <label className="block font-display text-sm font-semibold text-foreground mb-2">
                Описание проекта
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Расскажите подробнее о задаче, сроках, бюджете..."
                rows={5}
                className="bg-card border-border/50 focus:border-primary/50 resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full font-display font-semibold text-base h-14">
              Отправить заявку <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Order;
