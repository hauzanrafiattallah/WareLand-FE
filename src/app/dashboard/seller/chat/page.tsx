"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const buyers = [
  {
    id: 1,
    name: "Budi Santoso",
    phone: "6281234567890",
    avatar: "/profile.png",
  },
  {
    id: 2,
    name: "Siti Aminah",
    phone: "6281122334455",
    avatar: "/profile.png",
  },
  {
    id: 3,
    name: "Rudi Hermawan",
    phone: "6285566778899",
    avatar: "/profile.png",
  },
];

export default function SellerChatPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chat Pembeli</h1>
        <p className="text-gray-600">Hubungi pembeli potensial melalui WhatsApp.</p>
      </div>

      <div className="space-y-4">
        {buyers.map((buyer) => (
          <Card key={buyer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={buyer.avatar}
                  alt={buyer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {buyer.name}
                </h3>
              </div>
              <a
                href={`https://wa.me/${buyer.phone}?text=Halo ${buyer.name}, saya dari WareLand menanggapi pesan Anda.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
