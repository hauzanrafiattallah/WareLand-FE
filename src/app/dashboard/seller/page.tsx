import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Eye, TrendingUp } from "lucide-react";

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

      {/* RECENT ACTIVITY Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[300px]">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[200px] text-gray-400 border-dashed border-2 border-gray-100 rounded-lg m-4">
                Chart Visualization Placeholder
            </CardContent>
        </Card>
        <Card className="h-[300px]">
            <CardHeader>
                <CardTitle>Recent Enquiries</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                <div>
                                    <p className="text-sm font-medium">Budi Santoso</p>
                                    <p className="text-xs text-gray-500">Asking about Villa Lembang</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">2h ago</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}



