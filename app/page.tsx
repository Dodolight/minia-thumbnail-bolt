import ThumbnailGenerator from '@/components/thumbnail-generator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            YouTube Thumbnail Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Create eye-catching thumbnails with AI-powered magic
          </p>
        </div>
        <ThumbnailGenerator />
      </div>
    </main>
  );
}