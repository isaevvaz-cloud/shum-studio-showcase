import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pencil, Plus, Loader2, Star, X, Check } from "lucide-react";

interface Review {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
  sort_order: number;
  created_at: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setText("");
    setRating(5);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (review: Review) => {
    setEditingId(review.id);
    setName(review.name);
    setCompany(review.company);
    setText(review.text);
    setRating(review.rating);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast({ title: "Заполните имя и текст отзыва", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from("reviews")
          .update({ name, company, text, rating })
          .eq("id", editingId);
        if (error) throw error;
        toast({ title: "Отзыв обновлён!" });
      } else {
        const { error } = await supabase
          .from("reviews")
          .insert({ name, company, text, rating, sort_order: reviews.length + 1 });
        if (error) throw error;
        toast({ title: "Отзыв добавлен!" });
      }
      resetForm();
      fetchReviews();
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Ошибка удаления", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Отзыв удалён" });
      fetchReviews();
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold">
          Отзывы клиентов ({reviews.length})
        </h2>
        {!showForm && (
          <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus className="w-4 h-4 mr-1" /> Добавить
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="mb-6 p-4 border border-border/50 rounded-xl space-y-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">
              {editingId ? "Редактирование отзыва" : "Новый отзыв"}
            </h3>
            <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя клиента</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Александр К." />
            </div>
            <div className="space-y-2">
              <Label>Компания</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="ООО «Компания»" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Текст отзыва</Label>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст отзыва..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Рейтинг</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="p-0.5"
                >
                  <Star className={`w-5 h-5 ${s <= rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Сохранение...</>
            ) : (
              <><Check className="w-4 h-4 mr-1" /> {editingId ? "Сохранить" : "Добавить"}</>
            )}
          </Button>
        </form>
      )}

      {loading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : reviews.length === 0 ? (
        <p className="text-muted-foreground">Пока нет отзывов</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4 p-4 border border-border/50 rounded-xl">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.company}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-primary fill-primary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(review)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                      <AlertDialogDescription>Это действие нельзя отменить. Отзыв от «{review.name}» будет удалён навсегда.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(review.id)}>Удалить</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
