"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Building, Loader2, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CatalogPropertyService, CatalogProperty } from "@/services/property/catalog.property.service";
import { toast } from "sonner";

export default function ContactSellerPage() {
  const [properties, setProperties] = useState<CatalogProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await CatalogPropertyService.getAll();
        if (res.success) {
          setProperties(res.data);
        }
      } catch {
        toast.error("Gagal memuat data properti");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filter properties by search query
  const filteredProperties = properties.filter(
    (p) =>
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.seller?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate WhatsApp link with message
  const getWhatsAppLink = (property: CatalogProperty) => {
    const phone = property.seller?.phoneNumber?.replace(/\D/g, "") || "";
    // Add 62 prefix if starts with 0
    const formattedPhone = phone.startsWith("0") ? "62" + phone.slice(1) : phone;
    
    const message = encodeURIComponent(
      `Halo ${property.seller?.name || "Penjual"},\n\n` +
        `Saya tertarik dengan properti:\n` +
        `📍 ${property.address}\n` +
        `💰 Rp ${property.price.toLocaleString("id-ID")}\n` +
        `📝 ${property.description}\n\n` +
        `Apakah properti ini masih tersedia?`
    );
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  // Format phone number for display
  const formatPhone = (phone: string) => {
    if (!phone) return "-";
    // Add +62 if starts with 0
    if (phone.startsWith("0")) {
      return "+62 " + phone.slice(1);
    }
    return phone.startsWith("+") ? phone : "+" + phone;
  };

  return (
    <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Hubungi Penjual
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Chat langsung dengan penjual via WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white shadow-sm border rounded-xl p-3 mb-6 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari properti atau nama penjual..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-sm sm:text-base"
        />
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-[#25D366] animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Memuat data properti...</p>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredProperties.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {searchQuery ? "Tidak ada hasil" : "Belum ada properti"}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Coba ubah kata kunci pencarian"
              : "Properti akan muncul di sini"}
          </p>
        </div>
      )}

      {/* PROPERTY LIST */}
      {!loading && filteredProperties.length > 0 && (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.propertyId}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* IMAGE */}
                <div className="relative w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 bg-gray-100">
                  <Image
                    src="/home.png"
                    alt={property.description}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    {/* TITLE */}
                    <Link
                      href={`/dashboard/buyer/properties/${property.propertyId}`}
                      className="font-bold text-lg text-gray-900 hover:text-[#39D177] transition line-clamp-1"
                    >
                      {property.description?.split("\n")[0]?.replace("Title: ", "") || 
                       `Properti #${property.propertyId}`}
                    </Link>

                    {/* SELLER INFO */}
                    {property.seller && (
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#39D177] to-[#2FAE63] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className="text-gray-900 font-medium">
                              {property.seller.name}
                            </span>
                            <span className="text-gray-400 text-xs ml-1">
                              @{property.seller.username}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{formatPhone(property.seller.phoneNumber)}</span>
                        </div>
                      </div>
                    )}

                    {/* PRICE & ADDRESS */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <p className="text-[#39D177] font-bold">
                        Rp {property.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-1">
                        📍 {property.address}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="mt-4 sm:mt-3">
                    <a
                      href={getWhatsAppLink(property)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full hover:opacity-90 transition text-sm font-medium shadow-sm w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INFO CARD */}
      <div className="mt-8 bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/10 rounded-2xl border border-[#25D366]/20 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Tips Menghubungi Penjual</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Perkenalkan diri Anda dengan sopan</li>
              <li>• Sebutkan properti yang Anda minati</li>
              <li>• Tanyakan ketersediaan dan jadwal viewing</li>
              <li>• Negosiasi harga dengan cara yang baik</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
