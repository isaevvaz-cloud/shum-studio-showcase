import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const Order = () => {
  return (
    <div className="py-20 md:py-28">
      <div className="container max-w-2xl text-center">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            Заказать <span className="text-gradient">дизайн</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Напишите нам — обсудим ваш проект
          </p>
          <a
            href="https://vk.com/im/convo/-224938569?entrypoint=community_page&tab=all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10"
          >
            <Button size="lg" className="font-display font-semibold text-base h-14 px-10">
              Заказать дизайн <Send className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Order;
