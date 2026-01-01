"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { PropertyService } from "@/services/property/property.service";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    area: "",
    address: "",
    beds: "",
    baths: "",
    floors: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!formData.address || !formData.price || !formData.title) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // Combine extra fields into description since backend has limited fields
      const description = `
Title: ${formData.title}
Area: ${formData.area} m²
Bedrooms: ${formData.beds}
Bathrooms: ${formData.baths}
Floors: ${formData.floors}
      `.trim();

      await PropertyService.create({
        address: formData.address,
        price: Number(formData.price),
        description: description,
        imageUrl: imageUrl,
      });

      toast.success("Property published successfully!");
      router.push("/dashboard/seller/listings");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish property");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
        <p className="text-gray-600">Fill in the details to list your property.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Basic Information</h3>
            <div className="grid gap-2">
              <Label htmlFor="title">Property Title</Label>
              <Input id="title" placeholder="e.g. Luxury Villa in Bali" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="price">Price (IDR)</Label>
                    <Input id="price" type="number" placeholder="0" value={formData.price} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="area">Area (m²)</Label>
                    <Input id="area" placeholder="e.g. 120" value={formData.area} onChange={handleInputChange} />
                </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Location & Details</h3>
            <div className="grid gap-2">
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="Street address, City, Province" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input id="beds" type="number" value={formData.beds} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input id="baths" type="number" value={formData.baths} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="floors">Floors</Label>
                    <Input id="floors" type="number" value={formData.floors} onChange={handleInputChange} />
                </div>
            </div>
          </div>
        </div>

        {/* Right Column - Images & Publish */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                 <h3 className="font-semibold text-gray-900">Property Images</h3>
                 
                 {!imagePreview ? (
                   <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition cursor-pointer relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageSelect}
                      />
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload image</span>
                   </div>
                 ) : (
                   <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                      />
                      <button 
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                   </div>
                 )}
            </div>

            <div className="flex flex-col gap-3">
                <Button 
                  className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white h-12 rounded-full"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      "Publish Listing"
                    )}
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-full" disabled={isLoading}>
                    Save as Draft
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}



