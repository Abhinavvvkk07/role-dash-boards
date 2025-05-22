
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartPlaceholderProps {
  title: string;
  description?: string;
  height?: number | string;
  className?: string;
}

const ChartPlaceholder = ({ 
  title, 
  description, 
  height = 300,
  className
}: ChartPlaceholderProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div 
          className="flex items-center justify-center bg-muted/50 rounded-md"
          style={{ height }}
        >
          <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="M3 9h18" />
              <path d="M15 15h3" />
              <path d="M15 19h3" />
              <path d="M9 15h3" />
              <path d="M9 19h3" />
            </svg>
            <span>{title} Chart</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartPlaceholder;
