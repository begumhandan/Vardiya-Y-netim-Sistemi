import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface Person {
  id: string;
  name: string;
}

interface Shift {
  id: string;
  personId: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  notes?: string;
}

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function Index() {
  const [personnel, setPersonnel] = useState<Person[]>([
    { id: uuid(), name: "Ayşe Yılmaz" },
    { id: uuid(), name: "Mehmet Demir" },
  ]);
  const [shifts, setShifts] = useState<Shift[]>([]);

  const [newPersonName, setNewPersonName] = useState("");

  const [form, setForm] = useState<
    Pick<Shift, "personId" | "date" | "start" | "end" | "notes">
  >({ personId: "", date: "", start: "", end: "", notes: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(
    null,
  );

  const currentPersonName = useMemo(() => {
    if (!form.personId) return "";
    return personnel.find((p) => p.id === form.personId)?.name ?? "";
  }, [form.personId, personnel]);

  const addPersonnel = () => {
    const name = newPersonName.trim();
    if (!name) return;
    if (personnel.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      toast.error("Bu isim zaten mevcut");
      return;
    }
    const p: Person = { id: uuid(), name };
    setPersonnel((prev) => [...prev, p]);
    setNewPersonName("");
    toast.success("Personel eklendi");
  };

  const resetForm = () => {
    setForm({ personId: "", date: "", start: "", end: "", notes: "" });
    setEditingId(null);
  };

  const validateForm = () => {
    if (!form.personId || !form.date || !form.start || !form.end) {
      toast.error("Lütfen tüm zorunlu alanları doldurun");
      return false;
    }
    if (form.end <= form.start) {
      toast.error("Bitiş saati başlangıçtan sonra olmalı");
      return false;
    }
    return true;
  };

  const createOrUpdateShift = () => {
    if (!validateForm()) return;

    if (editingId) {
      setShifts((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...form } : s)),
      );
      toast.success("Vardiya güncellendi");
      resetForm();
      return;
    }

    const newShift: Shift = { id: uuid(), ...form };
    setShifts((prev) => [newShift, ...prev]);
    // match text expected by legacy Cypress tests
    toast.success("Vardiya başarıyla oluşturuldu");
    resetForm();
  };

  const onEdit = (id: string) => {
    const s = shifts.find((x) => x.id === id);
    if (!s) return;
    setForm({
      personId: s.personId,
      date: s.date,
      start: s.start,
      end: s.end,
      notes: s.notes ?? "",
    });
    setEditingId(id);
  };

  const onDelete = (id: string) => {
    setShifts((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) resetForm();
    toast.success("Vardiya silindi");
    setDeleteCandidateId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Vardiya Yönetim Sistemi
        </h1>
        <p className="text-muted-foreground">
          Personel listesi ve vardiya oluşturma, düzenleme, silme işlemleri
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Personel Listesi */}
        <Card>
          <CardHeader>
            <CardTitle>Personel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Yeni personel adı"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                data-testid="personnel-name-input"
              />
              <Button onClick={addPersonnel} data-testid="add-personnel-button">
                <Plus className="mr-1 h-4 w-4" /> Ekle
              </Button>
            </div>
            <ul
              className="divide-y rounded-md border"
              data-testid="personel-list"
            >
              {personnel.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between p-3 text-sm"
                  data-testid="personel-item"
                  data-item-id={p.id}
                >
                  <span>{p.name}</span>
                  <span className="rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                    ID: {p.id.slice(0, 6)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Vardiya Oluştur / Düzenle */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId
                ? `Vardiya Düzenle${currentPersonName ? ` – ${currentPersonName}` : ""}`
                : "Vardiya Oluştur"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Personel
                </label>
                <Select
                  value={form.personId}
                  onValueChange={(v) => setForm((f) => ({ ...f, personId: v }))}
                >
                  <SelectTrigger data-testid="vardiya-personel">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {personnel.map((p) => (
                      <SelectItem
                        value={p.id}
                        key={p.id}
                        data-testid={`shift-personnel-option-${p.id}`}
                      >
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Tarih</label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-testid="vardiya-date"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Başlangıç
                </label>
                <Input
                  type="time"
                  value={form.start}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, start: e.target.value }))
                  }
                  data-testid="vardiya-start-time"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Bitiş</label>
                <Input
                  type="time"
                  value={form.end}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, end: e.target.value }))
                  }
                  data-testid="vardiya-end-time"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Not</label>
                <Input
                  placeholder="İsteğe bağlı not"
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  data-testid="shift-notes-input"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {editingId ? (
                <>
                  <Button
                    onClick={createOrUpdateShift}
                    data-testid="save-changes"
                  >
                    Güncelle
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={resetForm}
                    data-testid="cancel-edit-button"
                  >
                    İptal
                  </Button>
                </>
              ) : (
                <Button
                  onClick={createOrUpdateShift}
                  data-testid="create-vardiya-button"
                >
                  Oluştur
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vardiya Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>Vardiyalar</CardTitle>
        </CardHeader>
        <CardContent>
          {shifts.length === 0 ? (
            <div className="rounded-md border p-6 text-sm text-muted-foreground">
              Henüz bir vardiya yok.
            </div>
          ) : (
            <ul className="divide-y rounded-md border">
              {shifts.map((s) => {
                const person = personnel.find((p) => p.id === s.personId);
                return (
                  <li
                    key={s.id}
                    className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
                    data-testid="vardiya-item"
                    data-shift-id={s.id}
                  >
                    <div className="space-y-1">
                      <div className="font-medium">
                        {person?.name || "Bilinmeyen"} • {s.date}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {s.start} – {s.end}
                        {s.notes ? ` • ${s.notes}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(s.id)}
                        data-testid="edit-vardiya-button"
                      >
                        <Pencil className="mr-1 h-4 w-4" /> Düzenle
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteCandidateId(s.id)}
                        data-testid="delete-vardiya-button"
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Sil
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
      {/* Confirm deletion simple dialog used by Cypress tests */}
      {deleteCandidateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className="rounded bg-white p-6 shadow"
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4">
              Bu vardiyayı silmek istediğinizden emin misiniz?
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                data-testid="confirm-delete"
                onClick={() => onDelete(deleteCandidateId)}
              >
                Sil
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDeleteCandidateId(null)}
              >
                İptal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
