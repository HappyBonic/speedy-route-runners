
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const DeliveryMap = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 h-full min-h-[400px]">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-red-500" />
          Live Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-700 rounded-lg h-80 flex items-center justify-center">
          {/* Placeholder for map - in a real app, this would be Google Maps or similar */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg"></div>
          
          {/* Simulated location markers */}
          <div className="absolute top-16 left-16">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <div className="text-xs text-white mt-1">Pickup</div>
          </div>
          
          <div className="absolute bottom-16 right-16">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="text-xs text-white mt-1">Drop-off</div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="text-xs text-white mt-1">Driver</div>
          </div>
          
          {/* Route line simulation */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 64 64 Q 160 160 288 256"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
          
          <div className="text-center text-gray-300">
            <MapPin className="mx-auto h-12 w-12 mb-2 opacity-50" />
            <p className="text-sm">Interactive Map View</p>
            <p className="text-xs opacity-75">Real-time driver tracking</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;
