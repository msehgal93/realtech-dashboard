import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Palette, Bot, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2"><Palette className="h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2"><Bot className="h-4 w-4" /> AI Config</TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline">Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for better viewing at night.
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce whitespace and increase information density.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>Customize how the AI agent behaves and interacts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Tone</Label>
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                    <SelectItem value="formal">Professional & Formal</SelectItem>
                    <SelectItem value="casual">Casual & Relaxed</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This tone will be used as the default for all generated scripts.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-Correction</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically correct grammar and spelling in generated scripts.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your billing and subscription details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Pro Plan</p>
                  <p className="text-sm text-muted-foreground">$29/month per user</p>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-muted rounded flex items-center justify-center border">
                    <span className="font-bold text-xs">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </MainLayout>
  );
}
