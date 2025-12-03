import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="pt-32 max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT SECTION */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Property Transactions <br />
            Are More <span className="text-[#39D177]">Transparent &</span>{" "}
            <br />
            <span className="text-[#39D177]">Protected</span>
          </h1>

          <p className="text-gray-600 max-w-md">
            WareLand utilizes AI and blockchain to check contracts, assess agent
            reputation, and detect fraud for transparent and protected
            transactions.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-full text-white bg-[#39D177] hover:bg-[#2FAE63] transition font-medium"
            >
              Register Now
            </Link>

            <Link
              href="#learn"
              className="px-6 py-3 rounded-full text-[#39D177] bg-[#D6F5E7] border border-[#39D177]/40 hover:bg-[#C8EFD8] transition font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/image.png"
            width={450}
            height={450}
            alt="WareLand Property Image"
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </main>
    </div>
  );
}
