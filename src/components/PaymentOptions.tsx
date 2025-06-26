
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Cash } from "lucide-react";

interface PaymentOptionsProps {
  selectedMethod: 'cash' | 'card';
  onMethodChange: (method: 'cash' | 'card') => void;
}

const PaymentOptions = ({ selectedMethod, onMethodChange }: PaymentOptionsProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [detectedBank, setDetectedBank] = useState('');

  const detectBank = (cardNum: string) => {
    const cleanNumber = cardNum.replace(/\s/g, '');
    
    // South African bank card number patterns
    const bankPatterns = {
      'ABSA': /^(4)(0[2-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])/,
      'Standard Bank': /^(4)(1[7-9]|2[0-9]|3[0-9]|4[0-1])/,
      'FNB': /^(4)(1[0-6]|9[0-9])/,
      'Nedbank': /^(4)(0[0-1]|8[0-9])/,
      'Capitec': /^(5)(4[6-9]|5[0-5])/,
      'Discovery Bank': /^(6)(0[0-9])/,
      'African Bank': /^(4)(5[0-9])/,
      'Investec': /^(4)(9[0-9])/
    };

    for (const [bank, pattern] of Object.entries(bankPatterns)) {
      if (pattern.test(cleanNumber)) {
        return bank;
      }
    }
    
    // General card type detection
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    
    return '';
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
    
    // Detect bank
    const bank = detectBank(value);
    setDetectedBank(bank);
  };

  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white text-lg">Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={selectedMethod}
          onValueChange={(value: 'cash' | 'card') => onMethodChange(value)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 p-3 bg-gray-600 rounded-lg">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center cursor-pointer text-white">
              <Cash className="mr-2 h-4 w-4" />
              Cash on Delivery
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-gray-600 rounded-lg">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center cursor-pointer text-white">
              <CreditCard className="mr-2 h-4 w-4" />
              Credit/Debit Card
            </Label>
          </div>
        </RadioGroup>

        {selectedMethod === 'card' && (
          <div className="space-y-3 pt-2 border-t border-gray-600">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-gray-200">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                maxLength={19}
                className="bg-gray-600 border-gray-500 text-white"
              />
              {detectedBank && (
                <div className="flex items-center text-sm text-green-400">
                  <CreditCard className="mr-1 h-3 w-3" />
                  Detected: {detectedBank}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-gray-200">Expiry</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="bg-gray-600 border-gray-500 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-gray-200">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  maxLength={3}
                  className="bg-gray-600 border-gray-500 text-white"
                />
              </div>
            </div>
            
            <p className="text-xs text-gray-400">
              Your card details are secure and encrypted
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
