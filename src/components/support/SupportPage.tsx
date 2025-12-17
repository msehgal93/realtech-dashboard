import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Book, HelpCircle, Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Support Hub</h2>
        <p className="text-muted-foreground">Get help, find answers, and contact our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" /> Contact Support
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue..." className="min-h-[150px]" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Send Message</Button>
          </CardFooter>
        </Card>

        {/* FAQ & Resources */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" /> Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    You can reset your password in the Settings page under the Profile tab, or click "Forgot Password" on the login screen.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I export my leads?</AccordionTrigger>
                  <AccordionContent>
                    Yes, go to the Leads page and click the "Export CSV" button in the top right corner.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does the AI script generator work?</AccordionTrigger>
                  <AccordionContent>
                    The AI analyzes your product details and target audience to generate a custom sales script. You can adjust the tone in Settings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What is the session limit for automation?</AccordionTrigger>
                  <AccordionContent>
                    For safety reasons, automation sessions are limited to 8 hours per day. They will auto-stop when the limit is reached.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                <Book className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Documentation</h3>
                <p className="text-xs text-muted-foreground">Read our guides</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                <MessageCircle className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs text-muted-foreground">Talk to an agent</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
