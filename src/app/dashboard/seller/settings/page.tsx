import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Toko</h1>
        <p className="text-gray-600">Kelola informasi profil penjual Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Identitas Penjual</CardTitle>
          <CardDescription>
            Ubah nama yang akan ditampilkan kepada pembeli.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="shopName">Nama Toko / Penjual</Label>
            <Input id="shopName" defaultValue="Properti Sejahtera Abadi" placeholder="Masukkan nama toko" />
            <p className="text-xs text-gray-500">
              Nama ini akan muncul di halaman detail properti dan chat.
            </p>
          </div>

          <div className="flex justify-end">
            <Button className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full px-8">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

