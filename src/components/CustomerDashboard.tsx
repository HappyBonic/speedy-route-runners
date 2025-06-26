
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeliveryMap from "./DeliveryMap";

interface Delivery {
  id: string;
  pickup: string;
  dropoff: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
  driver?: string;
  estimatedTime?: string;
}

const CustomerDashboard = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const { toast } = useToast();

  const handleRequestDelivery = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Error",
        description: "Please enter both pickup and drop-off locations",
        variant: "destructive"
      });
      return;
    }

    const newDelivery: Delivery = {
      id: `DEL-${Date.now()}`,
      pickup,
      dropoff,
      status: 'pending',
      estimatedTime: '15-30 mins'
    };

    setDeliveries(prev => [newDelivery, ...prev]);
    setPickup('');
    setDropoff('');

    toast({
      title: "Delivery Requested",
      description: "We're finding a driver for you!",
    });

    // Simulate driver acceptance after 3 seconds
    setTimeout(() => {
      setDeliveries(prev => 
        prev.map(d => 
          d.id === newDelivery.id 
            ? { ...d, status: 'accepted', driver: 'John Smith' }
            : d
        )
      );
      toast({
        title: "Driver Found!",
        description: "John Smith is on the way to pickup",
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'picked_up': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Finding Driver';
      case 'accepted': return 'Driver Assigned';
      case 'picked_up': return 'In Transit';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-red-500" />
              Request Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-gray-200">Pickup Location</Label>
              <Input
                id="pickup"
                placeholder="Enter pickup address"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropoff" className="text-gray-200">Drop-off Location</Label>
              <Input
                id="dropoff"
                placeholder="Enter drop-off address"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button 
              onClick={handleRequestDelivery}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Request Delivery
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-red-500" />
              Your Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliveries.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No deliveries yet</p>
            ) : (
              deliveries.map((delivery) => (
                <div key={delivery.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium text-gray-200">
                      {delivery.id}
                    </div>
                    <Badge className={`${getStatusColor(delivery.status)} text-white`}>
                      {getStatusText(delivery.status)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-green-500" />
                      From: {delivery.pickup}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-red-500" />
                      To: {delivery.dropoff}
                    </div>
                    {delivery.driver && (
                      <div className="flex items-center">
                        <Check className="mr-1 h-3 w-3 text-blue-500" />
                        Driver: {delivery.driver}
                      </div>
                    )}
                    {delivery.estimatedTime && (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-yellow-500" />
                        ETA: {delivery.estimatedTime}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <DeliveryMap />
      </div>
    </div>
  );
};

export default CustomerDashboard;
