import { MainLayout } from "@/components/layout/MainLayout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-display">{title}</h2>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">Coming Soon</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              This feature is currently under development.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
