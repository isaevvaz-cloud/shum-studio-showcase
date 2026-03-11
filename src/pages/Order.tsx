import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, RefreshCw } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";

const serviceOptions = [
  "Инфографика для маркетплейсов",
  "Дизайн стримов",
  "Баннеры и креативы",
  "Другое",
];

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const Order = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !selectedService) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    if (parseInt(captchaInput) !== captcha.answer) {
      toast.error("Неверный ответ на капчу");
      refreshCaptcha();
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-telegram", {
        body: {
          name: formData.name.trim().slice(0, 100),
          contact: formData.contact.trim().slice(0, 200),
          service: selectedService,
          message: formData.message.trim().slice(0, 1000),
        },
      });

      if (error) throw error;

      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", contact: "", message: "" });
      setSelectedService("");
      refreshCaptcha();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка отправки. Попробуйте позже или напишите в Telegram.");
    } finally {
      setSubmitting(false);
    }
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
                maxLength={100}
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
                maxLength={200}
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
                maxLength={1000}
              />
            </div>

            {/* Captcha */}
            <div>
              <label className="block font-display text-sm font-semibold text-foreground mb-2">
                Проверка: {captcha.question}
              </label>
              <div className="flex gap-3 items-center">
                <Input
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Ваш ответ"
                  className="bg-card border-border/50 focus:border-primary/50 h-12 w-40"
                  type="number"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  title="Обновить капчу"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full font-display font-semibold text-base h-14"
              disabled={submitting}
            >
              {submitting ? "Отправка..." : "Отправить заявку"} <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Order;
