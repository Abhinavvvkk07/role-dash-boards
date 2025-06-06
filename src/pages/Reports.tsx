import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  FileText,
  BarChart,
  Calendar,
  Users,
  TrendingUp,
  Filter,
} from "lucide-react";
import { GenerateReportModal } from "@/components/modals/GenerateReportModal";

// Dummy data for reports
const reports = [
  {
    id: "1",
    title: "Q1 2024 Performance Review",
    type: "performance",
    date: "2024-03-31",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "March 2024 Team Productivity",
    type: "productivity",
    date: "2024-03-30",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Project Milestones - Q1",
    type: "project",
    date: "2024-03-25",
    status: "completed",
    downloadUrl: "#",
  },
];

// Dummy data for metrics
const metrics = {
  teamPerformance: [
    { month: "Jan", value: 85 },
    { month: "Feb", value: 88 },
    { month: "Mar", value: 92 },
  ],
  projectCompletion: [
    { month: "Jan", value: 12 },
    { month: "Feb", value: 15 },
    { month: "Mar", value: 18 },
  ],
  teamGrowth: [
    { month: "Jan", value: 24 },
    { month: "Feb", value: 26 },
    { month: "Mar", value: 28 },
  ],
};

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("q1-2024");
  const [selectedType, setSelectedType] = useState("all");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "draft":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleGenerateReport = async (reportConfig: any) => {
    // In a real application, this would make an API call to generate the report
    // For now, we'll simulate a download
    const { reportType, startDate, endDate, format } = reportConfig;
    
    // Create a dummy blob with some content
    const content = `Report Type: ${reportType}\nPeriod: ${startDate} to ${endDate}\n\nThis is a sample ${format.toUpperCase()} report.`;
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}-report.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and view performance reports</p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="q1-2024">Q1 2024</SelectItem>
            <SelectItem value="q4-2023">Q4 2023</SelectItem>
            <SelectItem value="q3-2023">Q3 2023</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="project">Project</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => setIsGenerateModalOpen(true)}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Average performance score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.teamPerformance[2].value}%</div>
            <div className="mt-4 space-y-2">
              {metrics.teamPerformance.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{month.month}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: `${month.value}px` }} />
                    <span className="text-sm font-medium">{month.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Completion</CardTitle>
            <CardDescription>Projects completed per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.projectCompletion[2].value}</div>
            <div className="mt-4 space-y-2">
              {metrics.projectCompletion.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{month.month}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: `${month.value * 5}px` }} />
                    <span className="text-sm font-medium">{month.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Growth</CardTitle>
            <CardDescription>Team members over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.teamGrowth[2].value}</div>
            <div className="mt-4 space-y-2">
              {metrics.teamGrowth.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{month.month}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: `${month.value * 3}px` }} />
                    <span className="text-sm font-medium">{month.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download or view generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{report.title}</h3>
                    <Badge variant="outline">{report.type}</Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Generated on {new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <GenerateReportModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={handleGenerateReport}
      />
    </div>
  );
} 