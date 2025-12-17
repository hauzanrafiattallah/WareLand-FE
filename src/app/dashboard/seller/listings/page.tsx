"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useProperty } from "@/hooks/property/useProperty";

export default function ManageListingsPage() {
  const {
    properties,
    loading,
    error,
    deleteProperty,
  } = useProperty();

  if (loading) {
    return <p className="text-gray-500">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600">
            Manage and edit your property catalog.
          </p>
        </div>
        <Link href="/dashboard/seller/listings/new">
          <Button className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full">
            <Plus className="w-4 h-4 mr-2" /> Add New Property
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {properties.map((item) => (
          <Card key={item.propertyId} className="overflow-hidden">
            <CardContent className="p-0 flex items-center">
              <div className="w-32 h-32 relative bg-gray-200 shrink-0">
                <Image
                  src="/home.png"
                  alt="Property"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg text-gray-900">
                    {item.address}
                  </h3>
                  <p className="text-sm text-[#39D177] font-semibold">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs px-2 py-1 rounded-full w-fit bg-green-100 text-green-700">
                    Active
                  </span>
                  <span className="text-xs text-gray-500">
                    0 Views
                  </span>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => deleteProperty(item.propertyId)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {properties.length === 0 && (
          <p className="text-gray-500 text-sm">
            Belum ada properti yang dibuat.
          </p>
        )}
      </div>
    </div>
  );
}
