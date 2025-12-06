"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Filter, MessageCircle, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type OrderStatus = "ALL" | "UNPAID" | "TO_SHIP" | "SHIPPED" | "COMPLETED" | "CANCELLED";

interface Order {
  id: string;
  buyer: string;
  status: OrderStatus;
  productName: string;
  productImage: string;
  quantity: number;
  totalPrice: string;
  date: string;
}

const dummyOrders: Order[] = [
  {
    id: "ORD-2023-001",
    buyer: "Budi Santoso",
    status: "TO_SHIP",
    productName: "Rumah Modern Minimalis - Tipe 36",
    productImage: "/home.png",
    quantity: 1,
    totalPrice: "Rp 750.000.000",
    date: "2023-10-25",
  },
  {
    id: "ORD-2023-002",
    buyer: "Siti Aminah",
    status: "COMPLETED",
    productName: "Villa Pemandangan Gunung",
    productImage: "/home.png",
    quantity: 1,
    totalPrice: "Rp 1.200.000.000",
    date: "2023-10-10",
  },
  {
    id: "ORD-2023-003",
    buyer: "Rudi Hermawan",
    status: "UNPAID",
    productName: "Tanah Kavling Siap Bangun",
    productImage: "/home.png",
    quantity: 1,
    totalPrice: "Rp 450.000.000",
    date: "2023-10-26",
  },
  {
    id: "ORD-2023-004",
    buyer: "Dewi Lestari",
    status: "CANCELLED",
    productName: "Apartemen Pusat Kota",
    productImage: "/home.png",
    quantity: 1,
    totalPrice: "Rp 850.000.000",
    date: "2023-09-15",
  },
];

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = dummyOrders.filter((order) => {
    const matchesTab = activeTab === "ALL" || order.status === activeTab;
    const matchesSearch =
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "UNPAID":
        return <span className="text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Belum Bayar</span>;
      case "TO_SHIP":
        return <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Truck className="w-3 h-3" /> Perlu Dikirim</span>;
      case "SHIPPED":
        return <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Truck className="w-3 h-3" /> Sedang Dikirim</span>;
      case "COMPLETED":
        return <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Selesai</span>;
      case "CANCELLED":
        return <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><XCircle className="w-3 h-3" /> Dibatalkan</span>;
      default:
        return null;
    }
  };

  const tabs = [
    { label: "Semua", value: "ALL" },
    { label: "Belum Bayar", value: "UNPAID" },
    { label: "Perlu Dikirim", value: "TO_SHIP" },
    { label: "Dikirim", value: "SHIPPED" },
    { label: "Selesai", value: "COMPLETED" },
    { label: "Dibatalkan", value: "CANCELLED" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daftar Pesanan</h1>
        <p className="text-gray-600">Kelola pesanan masuk dan riwayat transaksi.</p>
      </div>

      {/* TABS & SEARCH */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as OrderStatus)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.value
                  ? "border-[#39D177] text-[#39D177]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari No. Pesanan, Nama Pembeli, atau Produk"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ORDER LIST */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
            <p className="text-gray-500">Tidak ada pesanan ditemukan.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 py-3 px-4 flex flex-row items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900">{order.buyer}</span>
                  <span className="text-gray-400 text-sm">|</span>
                  <span className="text-sm text-gray-500">{order.id}</span>
                </div>
                {getStatusBadge(order.status)}
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={order.productImage}
                      alt={order.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{order.productName}</h3>
                    <p className="text-sm text-gray-500 mt-1">Variasi: Standar</p>
                    <p className="text-sm text-gray-500">x{order.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Pesanan</p>
                    <p className="text-lg font-bold text-[#39D177]">{order.totalPrice}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-white px-4 py-3 border-t border-gray-100 flex justify-end gap-3">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Hubungi Pembeli
                </Button>
                {order.status === "TO_SHIP" && (
                  <Button size="sm" className="bg-[#39D177] hover:bg-[#2FAE63] text-white">
                    Atur Pengiriman
                  </Button>
                )}
                {order.status === "SHIPPED" && (
                  <Button variant="outline" size="sm">
                    Lacak Pesanan
                  </Button>
                )}
                {(order.status === "COMPLETED" || order.status === "CANCELLED") && (
                   <Button variant="ghost" size="sm">
                    Lihat Rincian
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

