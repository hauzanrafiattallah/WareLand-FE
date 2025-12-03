import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ShieldCheck,
  User,
  Phone,
  Share2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// 1. Tipe data yang lebih detail untuk halaman detail
type PropertyDetail = {
  id: number;
  title: string;
  price: string;
  location: string;
  address: string;
  seller: {
    name: string;
    role: string;
    image: string;
    joined: string;
  };
  images: string[];
  specs: {
    beds: number;
    baths: number;
    landArea: number; // m2
    buildingArea: number; // m2
    floors: number;
    certificate: string;
  };
  description: string;
  facilities: string[];
  badge?: string;
};

// 2. Mock Data Generator (Simulasi Database)
async function getPropertyDetail(id: string): Promise<PropertyDetail | null> {
  // Simulasi delay network
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Data dummy yang diperluas
  const dummyData: PropertyDetail = {
    id: parseInt(id),
    title: id === "1" ? "Rumah Modern Minimalis" : "Villa Pemandangan Gunung",
    price: id === "1" ? "750.000.000" : "1.200.000.000",
    location: id === "1" ? "Bandung" : "Lembang",
    address:
      id === "1"
        ? "Jl. Sukajadi No. 123, Sukasari, Kota Bandung"
        : "Jl. Kolonel Masturi No. 88, Lembang, Bandung Barat",
    seller: {
      name: id === "1" ? "Andi Setiawan" : "Sari Puspita",
      role: "Agen Properti Terverifikasi",
      image: "/profile.png", // Menggunakan placeholder yang ada
      joined: "Januari 2023",
    },
    images: ["/home.png", "/home.png", "/home.png"], // Simulasi galeri
    specs: {
      beds: id === "1" ? 3 : 4,
      baths: id === "1" ? 2 : 3,
      landArea: id === "1" ? 120 : 300,
      buildingArea: id === "1" ? 90 : 200,
      floors: id === "1" ? 1 : 2,
      certificate: "SHM - Sertifikat Hak Milik",
    },
    description:
      "Hunian asri dan nyaman dengan desain modern minimalis yang sangat cocok untuk keluarga muda. Terletak di kawasan strategis yang bebas banjir, dekat dengan pusat perbelanjaan, sekolah, dan akses tol. Lingkungan aman dengan sistem keamanan 24 jam (One Gate System). \n\nBangunan menggunakan material berkualitas tinggi, lantai granit, dan kusen aluminium. Halaman belakang luas, bisa digunakan untuk taman atau pengembangan masa depan.",
    facilities: [
      "Keamanan 24 Jam",
      "Taman Bermain",
      "Carport",
      "Akses Internet",
      "Dekat Sekolah",
      "Bebas Banjir",
    ],
    badge: id === "1" ? "New" : "Premium",
  };

  return dummyData;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyDetail(id);

  if (!property) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER IMAGE SECTION */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
        
        {/* Top Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3 z-10">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white">
                <Share2 className="w-5 h-5 text-gray-700" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white">
                <Heart className="w-5 h-5 text-gray-700" />
            </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
          <div className="max-w-7xl mx-auto">
            {property.badge && (
              <span className="px-3 py-1 bg-[#39D177] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 inline-block">
                {property.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-200">
              <MapPin className="w-4 h-4" />
              <span>{property.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT CONTENT - MAIN INFO */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Stats Card */}
          <Card className="shadow-lg border-none">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-500 mb-1">Harga Penawaran</p>
                    <h2 className="text-3xl font-bold text-[#39D177]">Rp {property.price}</h2>
                </div>
                <div className="flex gap-6 text-center">
                    <div>
                        <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                            <BedDouble className="w-5 h-5" /> {property.specs.beds}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Kamar Tidur</p>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                            <Bath className="w-5 h-5" /> {property.specs.baths}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Kamar Mandi</p>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                            <Maximize className="w-5 h-5" /> {property.specs.buildingArea}m²
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Luas Bangunan</p>
                    </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Deskripsi Properti</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Fasilitas & Spesifikasi</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.facilities.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 bg-[#39D177] rounded-full" />
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR - SELLER & ACTION */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Seller Card */}
            <Card className="shadow-md border-gray-100">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                            {/* Placeholder image, replace with actual if available */}
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <User className="w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{property.seller.name}</h4>
                            <p className="text-xs text-gray-500">{property.seller.role}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <Button className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full h-12 text-base font-medium">
                            <Phone className="w-4 h-4 mr-2" /> Hubungi Penjual
                        </Button>
                        <Button variant="outline" className="w-full rounded-full h-12 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50">
                            Jadwalkan Survey
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                    <h5 className="font-semibold text-blue-900 text-sm">Transaksi Terlindungi</h5>
                    <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                        Dokumen properti ini telah diverifikasi oleh sistem AI WareLand. Transaksi aman dengan Smart Contract.
                    </p>
                </div>
            </div>

        </div>

      </div>
    </main>
  );
}
