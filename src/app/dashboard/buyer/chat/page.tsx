"use client";

import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

const contactedSellers = [
  {
    sellerName: "Andi Setiawan",
    phone: "+6281234567890",
    propertyTitle: "Rumah Modern Minimalis",
    image: "/home.png",
  },
  {
    sellerName: "Sari Puspita",
    phone: "+6289876543210",
    propertyTitle: "Villa Pemandangan Gunung",
    image: "/home.png",
  },
];

export default function ContactSellerPage() {
  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Kontak Penjual</h1>
      <p className="text-gray-600 mb-8">
        Hubungi agen atau penjual properti secara langsung melalui WhatsApp atau
        panggilan telepon.
      </p>

      <div className="space-y-6">
        {contactedSellers.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-sm border rounded-xl p-5 flex gap-4 items-center"
          >
            {/* Image */}
            <Image
              src={item.image}
              width={90}
              height={90}
              alt="property"
              className="rounded-lg object-cover"
            />

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.propertyTitle}</h2>
              <p className="text-gray-700 text-sm mt-1">
                Seller: <span className="font-medium">{item.sellerName}</span>
              </p>
              <p className="text-gray-500 text-sm">{item.phone}</p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-3">
                <a
                  href={`tel:${item.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#39D177] text-white rounded-full hover:bg-[#2FAE63] transition text-sm"
                >
                  <Phone size={16} /> Call
                </a>

                <a
                  href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition text-sm"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
