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
    <main className="px-2 py-6 md:px-6 md:py-10 mx-auto min-h-screen bg-gray-50">
      {/* Header Text */}
      <div className="mb-6 px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Kontak Penjual
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Hubungi agen atau penjual properti secara langsung melalui WhatsApp
          atau panggilan telepon.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {contactedSellers.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-sm border rounded-xl overflow-hidden flex flex-col md:flex-row md:items-center md:p-5 transition hover:shadow-md"
          >
            {/* IMAGE WRAPPER */}

            <div className="relative w-full h-48 md:w-[90px] md:h-[90px] flex-shrink-0 bg-gray-200">
              <Image
                src={item.image}
                fill
                alt={item.propertyTitle}
                className="object-cover md:rounded-lg"
              />
            </div>

            {/* INFO WRAPPER */}
            <div className="flex-1 p-3 md:p-0 md:ml-4">
              <h2 className="font-bold text-lg text-gray-900 leading-tight">
                {item.propertyTitle}
              </h2>
              <div className="mt-1 mb-4 md:mb-2">
                <p className="text-gray-700 text-sm">
                  Seller: <span className="font-medium">{item.sellerName}</span>
                </p>
                <p className="text-gray-500 text-xs md:text-sm">{item.phone}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-row gap-2 md:gap-3 w-full mt-2 md:mt-0">
                {/* Tombol Call */}
                <a
                  href={`tel:${item.phone}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg md:rounded-full hover:bg-gray-50 hover:border-gray-300 transition text-sm font-medium"
                >
                  <Phone size={16} className="text-[#39D177]" /> Call
                </a>

                {/* Tombol WhatsApp */}
                <a
                  href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] text-white rounded-lg md:rounded-full hover:bg-[#20bd5a] transition text-sm font-medium shadow-sm shadow-green-100"
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
