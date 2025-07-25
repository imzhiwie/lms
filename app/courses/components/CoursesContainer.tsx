import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Users, Star, Search, Filter, Play, FileText, Award, Eye } from "lucide-react"


const courses = [
    {
        id: 1,
        title: "Advanced MRI Interpretation",
        instructor: "Dr. Sarah Chen",
        duration: "12 hours",
        students: 1247,
        rating: 4.8,
        progress: 78,
        category: "Neuroradiology",
        level: "Advanced",
        thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
        id: 2,
        title: "CT Chest Imaging Fundamentals",
        instructor: "Dr. Michael Rodriguez",
        duration: "8 hours",
        students: 892,
        rating: 4.6,
        progress: 45,
        category: "Chest Imaging",
        level: "Intermediate",
        thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
        id: 3,
        title: "Mammography Screening & Diagnosis",
        instructor: "Dr. Lisa Wang",
        duration: "10 hours",
        students: 634,
        rating: 4.9,
        progress: 92,
        category: "Bweast Imaging",
        level: "Intermediate",
        thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
        id: 4,
        title: "Emergency Radiology Essentials",
        instructor: "Dr. Robert Taylor",
        duration: "15 hours",
        students: 1456,
        rating: 4.7,
        progress: 0,
        category: "Emergency",
        level: "Beginner",
        thumbnail: "/placeholder.svg?height=200&width=300",
    },
]

const featuredCourse = {
    title: "AI in Radiology: Future Perspectives",
    instructor: "Dr. Jennifer Lee",
    duration: "6 hours",
    students: 2341,
    rating: 4.9,
    description:
        "Explore the latest developments in artificial intelligence and machine learning applications in radiology practice.",
    thumbnail: "/placeholder.svg?height=300&width=500",
}

interface ComponentProps {
    userDetails: any;
}

function CoursesContainer({ userDetails }: ComponentProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Courses</h1>
                    <p className="text-muted-foreground">Advance your radiology expertise</p>
                </div>
                <Button>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Catalog
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-10" />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                </Button>
            </div>

            {/* Featured Course */}
            <Card className="overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <div className="h-48 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Eye className="h-16 w-16 text-white opacity-50" />
                        </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                        <Badge className="mb-2">Featured Course</Badge>
                        <h2 className="text-2xl font-bold mb-2">{featuredCourse.title}</h2>
                        <p className="text-muted-foreground mb-4">{featuredCourse.description}</p>

                        <div className="flex items-center space-x-6 mb-4 text-sm">
                            <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {featuredCourse.students.toLocaleString()} students
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {featuredCourse.duration}
                            </div>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {featuredCourse.rating}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button>
                                <Play className="h-4 w-4 mr-2" />
                                Start Course
                            </Button>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Course Tabs */}
            <Tabs defaultValue="enrolled" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                    <TabsTrigger value="available">Available Courses</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="enrolled" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses
                            .filter((course) => course.progress > 0)
                            .map((course) => (
                                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center">
                                        <BookOpen className="h-12 w-12 text-blue-600 opacity-50" />
                                    </div>

                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <Badge variant="outline">{course.category}</Badge>
                                            <Badge variant="secondary">{course.level}</Badge>
                                        </div>
                                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                                        <CardDescription>by {course.instructor}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {course.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                                {course.rating}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} />
                                        </div>

                                        <Button className="w-full">
                                            <Play className="h-4 w-4 mr-2" />
                                            Continue Learning
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="available" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses
                            .filter((course) => course.progress === 0)
                            .map((course) => (
                                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center">
                                        <BookOpen className="h-12 w-12 text-green-600 opacity-50" />
                                    </div>

                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <Badge variant="outline">{course.category}</Badge>
                                            <Badge variant="secondary">{course.level}</Badge>
                                        </div>
                                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                                        <CardDescription>by {course.instructor}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {course.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                {course.students}
                                            </div>
                                        </div>

                                        <div className="flex items-center text-sm">
                                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                            <span>{course.rating}</span>
                                            <span className="text-muted-foreground ml-1">({course.students} reviews)</span>
                                        </div>

                                        <Button className="w-full">
                                            <Play className="h-4 w-4 mr-2" />
                                            Enroll Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses
                            .filter((course) => course.progress === 100 || course.progress >= 92)
                            .map((course) => (
                                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 flex items-center justify-center relative">
                                        <BookOpen className="h-12 w-12 text-yellow-600 opacity-50" />
                                        <Award className="absolute top-4 right-4 h-8 w-8 text-yellow-600" />
                                    </div>

                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <Badge variant="outline">{course.category}</Badge>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                Completed
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                                        <CardDescription>by {course.instructor}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {course.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="h-4 w-4 mr-1" />
                                                Certificate
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button variant="outline" className="flex-1">
                                                <FileText className="h-4 w-4 mr-2" />
                                                Certificate
                                            </Button>
                                            <Button variant="outline" className="flex-1">
                                                <Play className="h-4 w-4 mr-2" />
                                                Review
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CoursesContainer;