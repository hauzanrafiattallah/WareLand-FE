import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Eye, TrendingUp, BarChart3 } from "lucide-react";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, here is your property summary.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[#39D177]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.4M</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Listings
            </CardTitle>
            <Home className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+2 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,342</div>
            <p className="text-xs text-gray-500">+12% traffic increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-gray-500">+0.4% from average</p>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS & INSIGHTS (Merged from Analytics) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statistik Kunjungan Chart */}
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Statistik Kunjungan</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            {/* Placeholder for Chart */}
            <div className="w-full h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
              <BarChart3 className="w-12 h-12 mb-3" />
              <p>Grafik Kunjungan (7 Hari Terakhir)</p>
              <p className="text-xs">Chart Component Visualization</p>
            </div>
          </CardContent>
        </Card>

        {/* Produk Populer List */}
        <Card className="h-[400px] overflow-y-auto">
          <CardHeader>
            <CardTitle>Produk Populer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Rumah Modern Minimalis", views: 450, sales: 3 },
                { name: "Villa Pemandangan Gunung", views: 320, sales: 1 },
                { name: "Tanah Kavling", views: 210, sales: 4 },
                { name: "Apartemen Studio", views: 180, sales: 0 },
                { name: "Ruko Strategis", views: 150, sales: 1 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.views} Dilihat</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#39D177]">{item.sales} Terjual</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
