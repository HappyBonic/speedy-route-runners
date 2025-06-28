
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

interface AlcoholItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface AlcoholSelectionProps {
  selectedItems: AlcoholItem[];
  onItemsChange: (items: AlcoholItem[]) => void;
  store: string;
}

const AlcoholSelection = ({ selectedItems, onItemsChange, store }: AlcoholSelectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('beer');

  const alcoholInventory = {
    beer: [
      { id: 'beer1', name: 'Castle Lager 440ml', price: 18.99, image: 'https://images.unsplash.com/photo-1608667508764-33cf0726caa1?w=300', category: 'beer' },
      { id: 'beer2', name: 'Black Label 340ml', price: 16.50, image: 'https://images.unsplash.com/photo-1608667508764-33cf0726caa1?w=300', category: 'beer' },
      { id: 'beer3', name: 'Amstel Lager 440ml', price: 19.99, image: 'https://images.unsplash.com/photo-1608667508764-33cf0726caa1?w=300', category: 'beer' },
    ],
    wine: [
      { id: 'wine1', name: 'KWV Roodeberg 750ml', price: 89.99, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300', category: 'wine' },
      { id: 'wine2', name: 'Nederburg Cabernet 750ml', price: 125.00, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300', category: 'wine' },
      { id: 'wine3', name: 'Two Oceans Sauvignon 750ml', price: 75.50, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300', category: 'wine' },
    ],
    spirits: [
      { id: 'spirit1', name: 'Klipdrift Brandy 750ml', price: 189.99, image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300', category: 'spirits' },
      { id: 'spirit2', name: 'Jägermeister 750ml', price: 299.99, image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300', category: 'spirits' },
      { id: 'spirit3', name: 'Vodka Cruz 750ml', price: 149.99, image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300', category: 'spirits' },
    ]
  };

  const categories = [
    { id: 'beer', name: 'Beer', color: 'bg-yellow-600' },
    { id: 'wine', name: 'Wine', color: 'bg-purple-600' },
    { id: 'spirits', name: 'Spirits', color: 'bg-amber-600' }
  ];

  const updateItemQuantity = (item: any, change: number) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    
    if (existingItem) {
      const newQuantity = Math.max(0, existingItem.quantity + change);
      if (newQuantity === 0) {
        onItemsChange(selectedItems.filter(i => i.id !== item.id));
      } else {
        onItemsChange(selectedItems.map(i => 
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        ));
      }
    } else if (change > 0) {
      onItemsChange([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const getItemQuantity = (itemId: string) => {
    return selectedItems.find(item => item.id === itemId)?.quantity || 0;
  };

  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white text-lg">Select Alcohol</CardTitle>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category.id ? category.color : ''}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
          {alcoholInventory[selectedCategory as keyof typeof alcoholInventory].map((item) => (
            <div key={item.id} className="flex items-center space-x-3 bg-gray-600 p-3 rounded-lg">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm">{item.name}</h4>
                <p className="text-red-400 font-bold">R{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => updateItemQuantity(item, -1)}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-white min-w-[20px] text-center">
                  {getItemQuantity(item.id)}
                </span>
                <Button
                  onClick={() => updateItemQuantity(item, 1)}
                  size="sm"
                  className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlcoholSelection;
