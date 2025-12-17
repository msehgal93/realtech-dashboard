import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useTenant } from "@/contexts/TenantContext";

export default function AIGeneratorPage() {
  const { tenant } = useTenant();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  
  const [formData, setFormData] = useState({
    product: "",
    customer: "",
    tone: "professional",
    goal: ""
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // In a real app, use env var for URL
      const response = await fetch('http://localhost:8000/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: formData.product || "RealTech CRM",
          target_customer: formData.customer || "Real Estate Agencies",
          tone: formData.tone,
          tenantId: tenant?.id || "demo-tenant"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedScript(data.script);
      } else {
        // Fallback if API is not running
        console.warn("API call failed, using fallback");
        setGeneratedScript(`[Fallback Script - API Error]
Hi, I'm calling from RealTech. We help ${formData.customer || "companies"} with ${formData.product || "CRM solutions"}.`);
      }
    } catch (error) {
      console.error("Generation error:", error);
      setGeneratedScript(`[Fallback Script - Network Error]
Hi, I'm calling from RealTech. We help ${formData.customer || "companies"} with ${formData.product || "CRM solutions"}.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-display">AI Script Generator</h2>
          <p className="text-muted-foreground">
            Generate high-converting sales scripts using AI.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>
                Enter details to generate a tailored script.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product / Service</Label>
                <Input 
                  id="product" 
                  placeholder="e.g. RealTech CRM" 
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer">Target Customer</Label>
                <Input 
                  id="customer" 
                  placeholder="e.g. Real Estate Agencies" 
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select 
                  value={formData.tone} 
                  onValueChange={(val) => setFormData({...formData, tone: val})}
                >
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="consultative">Consultative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Call Goal</Label>
                <Textarea 
                  id="goal" 
                  placeholder="e.g. Schedule a demo" 
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Script
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Generated Script</CardTitle>
              <CardDescription>
                Your AI-generated script will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px] bg-muted/30 rounded-md m-6 p-4 border border-dashed">
              {generatedScript ? (
                <div className="whitespace-pre-wrap animate-in fade-in duration-500">
                  {generatedScript}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                  <p>Ready to generate</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" size="sm" onClick={() => setGeneratedScript("")}>
                Clear
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button size="sm" onClick={() => navigator.clipboard.writeText(generatedScript)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
