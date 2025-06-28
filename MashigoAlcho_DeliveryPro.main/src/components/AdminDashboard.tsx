import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, User, Clock, Check } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  type: 'customer' | 'driver';
  status: 'active' | 'inactive';
  joinDate: string;
}

interface DeliveryLog {
  id: string;
  customer: string;
  driver: string;
  pickup: string;
  dropoff: string;
  status: string;
  date: string;
  payment: string;
}

const AdminDashboard = () => {
  const [users] = useState<User[]>([
    {
      id: 'USR-001',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      type: 'customer',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 'USR-002',
      name: 'John Smith',
      email: 'john@example.com',
      type: 'driver',
      status: 'active',
      joinDate: '2024-01-10'
    },
    {
      id: 'USR-003',
      name: 'Bob Williams',
      email: 'bob@example.com',
      type: 'customer',
      status: 'inactive',
      joinDate: '2024-01-20'
    }
  ]);

  const [deliveryLogs] = useState<DeliveryLog[]>([
    {
      id: 'DEL-001',
      customer: 'Alice Johnson',
      driver: 'John Smith',
      pickup: '123 Main St',
      dropoff: '456 Oak Ave',
      status: 'delivered',
      date: '2024-01-25',
      payment: 'R125.00'
    },
    {
      id: 'DEL-002',
      customer: 'Bob Williams',
      driver: 'John Smith',
      pickup: '789 Pine Rd',
      dropoff: '321 Elm St',
      status: 'in_transit',
      date: '2024-01-25',
      payment: 'R97.50'
    }
  ]);

  const stats = {
    totalUsers: users.length,
    activeDrivers: users.filter(u => u.type === 'driver' && u.status === 'active').length,
    totalCustomers: users.filter(u => u.type === 'customer').length,
    totalDeliveries: deliveryLogs.length,
    completedDeliveries: deliveryLogs.filter(d => d.status === 'delivered').length,
    revenue: deliveryLogs.reduce((sum, d) => sum + parseFloat(d.payment.replace('R', '')), 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'delivered': return 'bg-green-500';
      case 'in_transit': return 'bg-orange-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getUserTypeColor = (type: string) => {
    return type === 'driver' ? 'bg-blue-500' : 'bg-purple-500';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Active Drivers</p>
                <p className="text-2xl font-bold text-white">{stats.activeDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-400">Total Deliveries</p>
                <p className="text-2xl font-bold text-white">{stats.totalDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Check className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-white">R{stats.revenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Users and Deliveries */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
          <TabsTrigger value="users" className="data-[state=active]:bg-red-600">
            Users & Drivers
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="data-[state=active]:bg-red-600">
            Delivery Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Users & Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-white">{user.name}</h3>
                          <Badge className={`${getUserTypeColor(user.type)} text-white`}>
                            {user.type}
                          </Badge>
                          <Badge className={`${getStatusColor(user.status)} text-white`}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300">{user.email}</p>
                        <p className="text-xs text-gray-400">Joined: {user.joinDate}</p>
                      </div>
                      <div className="text-sm text-gray-400">
                        ID: {user.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Delivery Logs & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryLogs.map((delivery) => (
                  <div key={delivery.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">{delivery.id}</span>
                        <Badge className={`${getStatusColor(delivery.status)} text-white`}>
                          {delivery.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">{delivery.payment}</div>
                        <div className="text-xs text-gray-400">{delivery.date}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <p><span className="text-gray-400">Customer:</span> {delivery.customer}</p>
                        <p><span className="text-gray-400">Driver:</span> {delivery.driver}</p>
                      </div>
                      <div>
                        <p><span className="text-gray-400">From:</span> {delivery.pickup}</p>
                        <p><span className="text-gray-400">To:</span> {delivery.dropoff}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
