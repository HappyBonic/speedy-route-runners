
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, User, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeliveryMap from "@/components/DeliveryMap";
import DriverDashboard from "@/components/DriverDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import CustomerDashboard from "@/components/CustomerDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'driver' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (type: 'customer' | 'driver' | 'admin') => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter email and password",
        variant: "destructive"
      });
      return;
    }

    setUserType(type);
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: `Welcome back, ${type}!`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-white">MashigoAlcho_DeliveryPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 capitalize">{userType}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4">
          {userType === 'customer' && <CustomerDashboard />}
          {userType === 'driver' && <DriverDashboard />}
          {userType === 'admin' && <AdminDashboard />}
        </main>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MapPin className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl font-bold text-white">MashigoAlcho_DeliveryPro</h1>
          </div>
          <p className="text-gray-400">Fast, reliable delivery service</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6 bg-opacity-90 backdrop-blur-sm">
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700">
              <TabsTrigger value="customer" className="data-[state=active]:bg-red-600">
                Customer
              </TabsTrigger>
              <TabsTrigger value="driver" className="data-[state=active]:bg-red-600">
                Driver
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-red-600">
                Admin
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <TabsContent value="customer" className="mt-6">
              <Button 
                onClick={() => handleLogin('customer')} 
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <User className="mr-2 h-4 w-4" />
                Login as Customer
              </Button>
            </TabsContent>

            <TabsContent value="driver" className="mt-6">
              <Button 
                onClick={() => handleLogin('driver')} 
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login as Driver
              </Button>
            </TabsContent>

            <TabsContent value="admin" className="mt-6">
              <Button 
                onClick={() => handleLogin('admin')} 
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login as Admin
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;
