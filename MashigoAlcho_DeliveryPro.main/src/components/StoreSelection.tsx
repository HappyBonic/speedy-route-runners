
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, MapPin, Clock } from "lucide-react";

interface StoreSelectionProps {
  selectedStore: string;
  onStoreSelect: (store: string) => void;
}

const StoreSelection = ({ selectedStore, onStoreSelect }: StoreSelectionProps) => {
  const stores = [
    {
      id: 'tops1',
      name: 'Tops at SPAR Sandton',
      address: '123 Rivonia Road, Sandton',
      distance: '2.1 km',
      deliveryTime: '20-30 mins',
      rating: 4.5
    },
    {
      id: 'liquor1',
      name: 'Pick n Pay Liquor Rosebank',
      address: '456 Oxford Road, Rosebank',
      distance: '3.2 km',
      deliveryTime: '25-35 mins',
      rating: 4.3
    },
    {
      id: 'ultra1',
      name: 'Ultra Liquors Melrose',
      address: '789 Main Road, Melrose',
      distance: '1.8 km',
      deliveryTime: '15-25 mins',
      rating: 4.7
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white font-medium">Choose Store</h3>
      {stores.map((store) => (
        <Card 
          key={store.id} 
          className={`cursor-pointer transition-colors ${
            selectedStore === store.name 
              ? 'bg-red-600 border-red-500' 
              : 'bg-gray-600 border-gray-500 hover:bg-gray-500'
          }`}
          onClick={() => onStoreSelect(store.name)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Store className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">{store.name}</h4>
                  <div className="flex items-center text-sm text-gray-300 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {store.address}
                  </div>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="h-3 w-3 mr-1" />
                      {store.deliveryTime}
                    </div>
                    <span className="text-xs text-gray-400">
                      ⭐ {store.rating} • {store.distance}
                    </span>
                  </div>
                </div>
              </div>
              {selectedStore === store.name && (
                <div className="bg-white rounded-full p-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoreSelection;
