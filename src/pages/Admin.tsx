import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, LogOut, Upload, Loader2 } from "lucide-react";
import AdminReviews from "@/components/admin/AdminReviews";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

const CATEGORIES = [
  { value: "infographics", label: "Инфографика" },
  { value: "vk", label: "Оформление группы ВК" },
  { value: "banners", label: "Баннеры" },
  { value: "streams", label: "Оформление стримов" },
];

const Admin = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("infographics");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchItems();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Выберите изображение", variant: "destructive" });
      return;
    }

    setUploading(true);

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("portfolio")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from("portfolio_items")
        .insert({
          title,
          category,
          image_url: urlData.publicUrl,
        });

      if (insertError) throw insertError;

      toast({ title: "Изображение добавлено!" });
      setTitle("");
      setFile(null);
      setPreview(null);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Ошибка загрузки", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: PortfolioItem) => {
    const url = new URL(item.image_url);
    const pathParts = url.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];

    await supabase.storage.from("portfolio").remove([fileName]);
    await supabase.from("portfolio_items").delete().eq("id", item.id);

    toast({ title: "Удалено" });
    fetchItems();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="py-20 md:py-28">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">
            <span className="text-gradient">Панель управления</span>
          </h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Выйти
          </Button>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 card-shadow mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">Добавить работу</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Название</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Название работы"
                />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Изображение</Label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {file ? file.name : "Нажмите для выбора файла"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {preview && (
                  <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                )}
              </div>
            </div>

            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Загрузка...
                </>
              ) : (
                "Добавить"
              )}
            </Button>
          </form>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 card-shadow">
          <h2 className="font-display text-xl font-semibold mb-4">
            Загруженные работы ({items.length})
          </h2>

          {loading ? (
            <p className="text-muted-foreground">Загрузка...</p>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">Пока нет загруженных работ</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden border border-border/50">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    <p className="text-sm text-foreground text-center font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {CATEGORIES.find((c) => c.value === item.category)?.label}
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-1" /> Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить работу?</AlertDialogTitle>
                          <AlertDialogDescription>Это действие нельзя отменить. Работа «{item.title}» будет удалена навсегда.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item)}>Удалить</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AdminReviews />
      </div>
    </div>
  );
};

export default Admin;
