"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Wand2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThumbnailGenerator() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[400px,1fr]">
      {/* Controls - Now on the left */}
      <div className="space-y-6">
        <Card className="p-6 border-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Upload Image</h2>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageUpload}
              />
              <Label
                htmlFor="image-upload"
                className="cursor-pointer block"
              >
                <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="text-center space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                  </div>
                </div>
              </Label>
            </div>

            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="effects">Effects</TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="modern">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="retro">Retro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <Select defaultValue="vibrant">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select colors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Enter thumbnail title" />
                </div>

                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input placeholder="Enter subtitle (optional)" />
                </div>

                <div className="space-y-2">
                  <Label>Font</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="oswald">Oswald</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Brightness</Label>
                      <span className="text-sm text-muted-foreground">100%</span>
                    </div>
                    <Slider
                      defaultValue={[100]}
                      max={200}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Contrast</Label>
                      <span className="text-sm text-muted-foreground">100%</span>
                    </div>
                    <Slider
                      defaultValue={[100]}
                      max={200}
                      min={0}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Blur</Label>
                      <span className="text-sm text-muted-foreground">0px</span>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      max={20}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>AI Enhancement Prompt</Label>
              <Textarea
                placeholder="Describe how you want to enhance your thumbnail..."
                className="resize-none min-h-[100px]"
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Thumbnails
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Preview Area - Now on the right */}
      <div className="space-y-6">
        <Card className="aspect-video w-full overflow-hidden bg-muted/30 backdrop-blur-sm">
          {imageUrl ? (
            <div className="relative w-full h-full">
              <img
                src={imageUrl}
                alt="Thumbnail preview"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">
                Your preview will appear here
              </p>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="aspect-video flex items-center justify-center bg-muted/30 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}