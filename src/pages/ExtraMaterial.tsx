import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  SearchIcon, 
  BookOpen, 
  FileText, 
  Video, 
  Calendar,
  Download,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

// Mock study materials
const articles = [
  {
    id: 1,
    title: "Understanding Price Action in Mini Índice Trading",
    author: "Carlos Oliveira",
    date: "Mar 15, 2023",
    readTime: "12 min",
    category: "Technical Analysis",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Essential Risk Management for Day Traders",
    author: "Ana Silva",
    date: "Feb 22, 2023",
    readTime: "10 min",
    category: "Risk Management",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Advanced Mini Dólar Trading Strategies",
    author: "Pedro Santos",
    date: "Jan 05, 2023",
    readTime: "15 min",
    category: "Strategy",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Correlation Between Mini Índice and US Markets",
    author: "Mariana Costa",
    date: "Dec 12, 2022",
    readTime: "8 min",
    category: "Market Analysis",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "The Psychology of Successful Day Trading",
    author: "Rafael Mendes",
    date: "Nov 28, 2022",
    readTime: "14 min",
    category: "Psychology",
    level: "All Levels",
  },
];

const videos = [
  {
    id: 1,
    title: "Mini Índice Day Trading Tutorial - From Basics to Advanced",
    creator: "Trading Academy Brazil",
    duration: "45:23",
    date: "Apr 10, 2023",
    category: "Tutorial",
    level: "Beginner",
  },
  {
    id: 2,
    title: "5 Technical Indicators Every Mini Dólar Trader Should Know",
    creator: "InvestPro Channel",
    duration: "28:17",
    date: "Mar 22, 2023",
    category: "Technical Analysis",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Live Trading Session: Mini Índice Morning Analysis",
    creator: "Day Trading Lab",
    duration: "1:12:45",
    date: "Mar 15, 2023",
    category: "Live Trading",
    level: "All Levels",
  },
  {
    id: 4,
    title: "How to Develop a Winning Trading Plan for B3 Futures",
    creator: "Strategic Trader",
    duration: "52:31",
    date: "Feb 28, 2023",
    category: "Strategy",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Mastering Order Flow: Advanced Mini Índice & Mini Dólar Trading",
    creator: "Pro Trader Channel",
    duration: "1:05:18",
    date: "Feb 14, 2023",
    category: "Advanced Techniques",
    level: "Advanced",
  },
];

const resources = [
  {
    id: 1,
    title: "Mini Índice Trading Spreadsheet Template",
    type: "Excel Spreadsheet",
    size: "1.2 MB",
    category: "Tool",
  },
  {
    id: 2,
    title: "B3 Futures Contract Specifications Guide",
    type: "PDF Document",
    size: "3.5 MB",
    category: "Reference",
  },
  {
    id: 3,
    title: "Day Trading Journal Template",
    type: "Excel Spreadsheet",
    size: "895 KB",
    category: "Tool",
  },
  {
    id: 4,
    title: "Mini Dólar Historical Data (2018-2023)",
    type: "CSV File",
    size: "4.8 MB",
    category: "Data",
  },
  {
    id: 5,
    title: "Trading Psychology Checklist",
    type: "PDF Document",
    size: "752 KB",
    category: "Checklist",
  },
];

const events = [
  {
    id: 1,
    title: "B3 Futures Trading Workshop",
    date: "Jun 15, 2023",
    time: "10:00 AM - 12:30 PM",
    location: "Online",
    price: "Free",
  },
  {
    id: 2,
    title: "Mini Índice Advanced Strategies Webinar",
    date: "Jun 22, 2023",
    time: "7:00 PM - 8:30 PM",
    location: "Online",
    price: "R$89",
  },
  {
    id: 3,
    title: "Trading Psychology Masterclass",
    date: "Jul 05, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "São Paulo",
    price: "R$197",
  },
  {
    id: 4,
    title: "Day Trading Live Conference 2023",
    date: "Jul 15-16, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Rio de Janeiro",
    price: "R$450",
  },
  {
    id: 5,
    title: "Risk Management for Futures Traders",
    date: "Jul 28, 2023",
    time: "11:00 AM - 1:00 PM",
    location: "Online",
    price: "Free",
  },
];

const ExtraMaterial = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter function for search
  const filterBySearch = (item: { title: string }) => {
    if (!searchTerm) return true;
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Filtered data
  const filteredArticles = articles.filter(filterBySearch);
  const filteredVideos = videos.filter(filterBySearch);
  const filteredResources = resources.filter(filterBySearch);
  const filteredEvents = events.filter(filterBySearch);

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-20 pb-20 animate-fade-in">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Extra Material</h1>
              <p className="text-muted-foreground">
                Educational resources to improve your trading knowledge and skills
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Trading Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article) => (
                        <div key={article.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium hover:text-primary cursor-pointer">
                              {article.title}
                            </h3>
                            <Badge variant="outline" className="ml-2">
                              {article.level}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <span>{article.author}</span>
                            <span className="mx-1.5">•</span>
                            <span>{article.date}</span>
                            <span className="mx-1.5">•</span>
                            <span>{article.readTime} read</span>
                          </div>
                          <div className="mt-2">
                            <Badge variant="secondary" className="mr-2">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">
                        No articles found matching your search
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Trading Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredVideos.length > 0 ? (
                      filteredVideos.map((video) => (
                        <div key={video.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium hover:text-primary cursor-pointer">
                              {video.title}
                            </h3>
                            <Badge variant="outline" className="ml-2">
                              {video.level}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <span>{video.creator}</span>
                            <span className="mx-1.5">•</span>
                            <span>{video.date}</span>
                            <span className="mx-1.5">•</span>
                            <span>{video.duration}</span>
                          </div>
                          <div className="mt-2">
                            <Badge variant="secondary" className="mr-2">
                              {video.category}
                            </Badge>
                            <Button size="sm" variant="outline" className="ml-2">
                              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                              Watch
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">
                        No videos found matching your search
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Downloadable Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredResources.length > 0 ? (
                      filteredResources.map((resource) => (
                        <div key={resource.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                {resource.title}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span>{resource.type}</span>
                                <span className="mx-1.5">•</span>
                                <span>{resource.size}</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-3.5 w-3.5 mr-1.5" />
                              Download
                            </Button>
                          </div>
                          <div className="mt-2">
                            <Badge variant="secondary" className="mr-2">
                              {resource.category}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">
                        No resources found matching your search
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Trading Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <div key={event.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                {event.title}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span>{event.date}</span>
                                <span className="mx-1.5">•</span>
                                <span>{event.time}</span>
                                <span className="mx-1.5">•</span>
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <Badge variant={event.price === "Free" ? "outline" : "secondary"}>
                              {event.price}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <Button size="sm">
                              Register
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">
                        No events found matching your search
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ExtraMaterial;
