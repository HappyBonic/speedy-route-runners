
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Check, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeliveryRequest {
  id: string;
  pickup: string;
  dropoff: string;
  customer: string;
  distance: string;
  payment: string;
  status: 'available' | 'accepted' | 'picked_up' | 'delivered';
}

const DriverDashboard = () => {
  const [availableRequests, setAvailableRequests] = useState<DeliveryRequest[]>([
    {
      id: 'DEL-001',
      pickup: '123 Main St',
      dropoff: '456 Oak Ave',
      customer: 'Alice Johnson',
      distance: '2.3 km',
      payment: '$12.50',
      status: 'available'
    },
    {
      id: 'DEL-002',
      pickup: '789 Pine Rd',
      dropoff: '321 Elm St',
      customer: 'Bob Williams',
      distance: '1.8 km',
      payment: '$9.75',
      status: 'available'
    }
  ]);
  
  const [activeDeliveries, setActiveDeliveries] = useState<DeliveryRequest[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();

  const handleAcceptRequest = (request: DeliveryRequest) => {
    const acceptedRequest = { ...request, status: 'accepted' as const };
    setActiveDeliveries(prev => [...prev, acceptedRequest]);
    setAvailableRequests(prev => prev.filter(r => r.id !== request.id));
    
    toast({
      title: "Request Accepted",
      description: `Heading to pickup at ${request.pickup}`,
    });
  };

  const handleUpdateStatus = (requestId: string, newStatus: 'picked_up' | 'delivered') => {
    setActiveDeliveries(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: newStatus }
          : req
      ).filter(req => req.status !== 'delivered')
    );

    const statusText = newStatus === 'picked_up' ? 'Package Picked Up' : 'Delivery Completed';
    toast({
      title: statusText,
      description: newStatus === 'delivered' ? 'Great job! Payment processed.' : 'On the way to drop-off',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'accepted': return 'bg-blue-500';
      case 'picked_up': return 'bg-orange-500';
      case 'delivered': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Driver Dashboard</h2>
        <div className="flex items-center space-x-4">
          <Badge className={isOnline ? 'bg-green-500' : 'bg-red-500'}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          <Button 
            variant="outline" 
            onClick={() => setIsOnline(!isOnline)}
          >
            Go {isOnline ? 'Offline' : 'Online'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-500" />
              Available Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isOnline ? (
              <p className="text-gray-400 text-center py-4">Go online to see delivery requests</p>
            ) : availableRequests.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No requests available</p>
            ) : (
              availableRequests.map((request) => (
                <div key={request.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-medium text-gray-200">
                      {request.id}
                    </div>
                    <Badge className="bg-green-500 text-white">
                      {request.payment}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-300 mb-3">
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3 text-blue-500" />
                      Customer: {request.customer}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-green-500" />
                      From: {request.pickup}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-red-500" />
                      To: {request.dropoff}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-yellow-500" />
                      Distance: {request.distance}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleAcceptRequest(request)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Accept Request
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              Active Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeDeliveries.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No active deliveries</p>
            ) : (
              activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-medium text-gray-200">
                      {delivery.id}
                    </div>
                    <Badge className={`${getStatusColor(delivery.status)} text-white`}>
                      {delivery.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-300 mb-3">
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3 text-blue-500" />
                      Customer: {delivery.customer}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-green-500" />
                      From: {delivery.pickup}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-red-500" />
                      To: {delivery.dropoff}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {delivery.status === 'accepted' && (
                      <Button 
                        onClick={() => handleUpdateStatus(delivery.id, 'picked_up')}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        Mark Picked Up
                      </Button>
                    )}
                    {delivery.status === 'picked_up' && (
                      <Button 
                        onClick={() => handleUpdateStatus(delivery.id, 'delivered')}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;
