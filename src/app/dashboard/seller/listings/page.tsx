"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProperty } from "@/hooks/property/useProperty";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ManageListingsPage() {
  const { properties, loading, error, deleteProperty } = useProperty();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleConfirmDelete = async () => {
    if (selectedId !== null) {
      await deleteProperty(selectedId);
      setSelectedId(null);
      setOpen(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
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
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {properties.map((item) => (
            <Card key={item.propertyId} className="overflow-hidden">
              <CardContent className="p-0 flex items-center">
                <div className="w-32 h-32 relative bg-gray-200 shrink-0">
                  <Image
                    src={item.imageUrl || "/home.png"}
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

                  <div />

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        setSelectedId(item.propertyId);
                        setOpen(true);
                      }}
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Properti?</AlertDialogTitle>
            <AlertDialogDescription>
              Properti yang dihapus tidak dapat dikembalikan. Apakah kamu yakin
              ingin melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
