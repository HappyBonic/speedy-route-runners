
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Clock, Check, CreditCard, MessageCircle, Store, Cash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeliveryMap from "./DeliveryMap";
import AlcoholSelection from "./AlcoholSelection";
import StoreSelection from "./StoreSelection";
import PaymentOptions from "./PaymentOptions";
import DriverChat from "./DriverChat";

interface Delivery {
  id: string;
  pickup: string;
  dropoff: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
  driver?: string;
  estimatedTime?: string;
  items?: AlcoholItem[];
  totalPrice?: number;
  paymentMethod?: 'cash' | 'card';
  store?: string;
}

interface AlcoholItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const CustomerDashboard = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedItems, setSelectedItems] = useState<AlcoholItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [showChat, setShowChat] = useState<string | null>(null);
  const [distance, setDistance] = useState(2.5); // km
  const { toast } = useToast();

  const calculateDeliveryFee = (distance: number) => {
    const baseRate = 25; // R25 base fee
    const perKmRate = 15; // R15 per km
    return baseRate + (distance * perKmRate);
  };

  const calculateTotal = () => {
    const itemsTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = calculateDeliveryFee(distance);
    return itemsTotal + deliveryFee;
  };

  const handleRequestDelivery = () => {
    if (!deliveryAddress || !selectedStore || selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please complete all fields and select items",
        variant: "destructive"
      });
      return;
    }

    const newDelivery: Delivery = {
      id: `DEL-${Date.now()}`,
      pickup: selectedStore,
      dropoff: deliveryAddress,
      status: 'pending',
      estimatedTime: '25-40 mins',
      items: selectedItems,
      totalPrice: calculateTotal(),
      paymentMethod,
      store: selectedStore
    };

    setDeliveries(prev => [newDelivery, ...prev]);
    setDeliveryAddress('');
    setSelectedItems([]);

    toast({
      title: "Order Placed",
      description: `Total: R${newDelivery.totalPrice?.toFixed(2)} - Finding a driver!`,
    });

    // Simulate driver acceptance
    setTimeout(() => {
      setDeliveries(prev => 
        prev.map(d => 
          d.id === newDelivery.id 
            ? { ...d, status: 'accepted', driver: 'Sipho Mthembu' }
            : d
        )
      );
      toast({
        title: "Driver Found!",
        description: "Sipho Mthembu is heading to the store",
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
      case 'picked_up': return 'Out for Delivery';
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
              <Store className="mr-2 h-5 w-5 text-red-500" />
              Order Alcohol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StoreSelection 
              selectedStore={selectedStore}
              onStoreSelect={setSelectedStore}
            />
            
            {selectedStore && (
              <AlcoholSelection 
                selectedItems={selectedItems}
                onItemsChange={setSelectedItems}
                store={selectedStore}
              />
            )}

            <div className="space-y-2">
              <Label htmlFor="delivery-address" className="text-gray-200">Delivery Address</Label>
              <Input
                id="delivery-address"
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {selectedItems.length > 0 && (
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <h4 className="text-white font-medium">Order Summary</h4>
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-300">
                    <span>{item.name} x{item.quantity}</span>
                    <span>R{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm text-gray-300 pt-2 border-t border-gray-600">
                  <span>Delivery Fee ({distance}km)</span>
                  <span>R{calculateDeliveryFee(distance).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>R{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}

            <PaymentOptions
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />

            <Button 
              onClick={handleRequestDelivery}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={!deliveryAddress || !selectedStore || selectedItems.length === 0}
            >
              Place Order - R{calculateTotal().toFixed(2)}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-red-500" />
              Your Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliveries.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No orders yet</p>
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
                  <div className="space-y-1 text-sm text-gray-300 mb-3">
                    <div className="flex items-center">
                      <Store className="mr-1 h-3 w-3 text-green-500" />
                      Store: {delivery.store}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-red-500" />
                      To: {delivery.dropoff}
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="mr-1 h-3 w-3 text-blue-500" />
                      Total: R{delivery.totalPrice?.toFixed(2)} ({delivery.paymentMethod})
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
                  {delivery.driver && (
                    <Button
                      onClick={() => setShowChat(delivery.id)}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                    >
                      <MessageCircle className="mr-1 h-3 w-3" />
                      Chat with Driver
                    </Button>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <DeliveryMap />
        {showChat && (
          <DriverChat
            deliveryId={showChat}
            driverName="Sipho Mthembu"
            onClose={() => setShowChat(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
