import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UploadCloud } from "lucide-react";

export default function AddPropertyPage() {
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
              <Input id="title" placeholder="e.g. Luxury Villa in Bali" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="price">Price (IDR)</Label>
                    <Input id="price" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="area">Area (m²)</Label>
                    <Input id="area" placeholder="e.g. 120" />
                </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Location & Details</h3>
            <div className="grid gap-2">
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="Street address, City, Province" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input id="beds" type="number" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input id="baths" type="number" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="floors">Floors</Label>
                    <Input id="floors" type="number" />
                </div>
            </div>
          </div>
        </div>

        {/* Right Column - Images & Publish */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                 <h3 className="font-semibold text-gray-900">Property Images</h3>
                 <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition cursor-pointer">
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="text-sm">Click to upload images</span>
                 </div>
            </div>

            <div className="flex flex-col gap-3">
                <Button className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white h-12 rounded-full">
                    Publish Listing
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-full">
                    Save as Draft
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}



