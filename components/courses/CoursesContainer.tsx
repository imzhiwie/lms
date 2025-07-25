import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BookOpen,
    Clock,
    Users,
    Star,
    Search,
    Play,
    Award,
    Eye,
    Brain,
    CircleDot,
    Bone,
    Stethoscope,
    Activity,
    Zap,
    AirVent,
    Circle,
    HeartPulse,
    Baby,
    User,
    HeadingIcon,
} from "lucide-react"
import CourseCard from "./CourseCard"
import axios from "axios"
import { useEffect, useState } from "react"

interface ComponentProps {
    userDetails: any
}

const radiologyCategories = [
  {
    id: "head-and-neck",
    name: "Head and Neck",
    icon: HeadingIcon,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "brain-and-cns",
    name: "Brain",
    icon: Brain,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "chest-and-thorax",
    name: "Chest and Thorax",
    icon: AirVent,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "abdomen",
    name: "Abdomen",
    icon: Stethoscope,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "musculoskeletal-system",
    name: "Musculoskeletal System",
    icon: Bone,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "pelvis",
    name: "Pelvis",
    icon: CircleDot,
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "breast",
    name: "Breast",
    icon: Circle,
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "vascular-system",
    name: "Vascular System",
    icon: HeartPulse,
    color: "bg-red-200 text-red-800",
  },
  {
    id: "pediatric-specific-imaging",
    name: "Pediatric-Specific Imaging",
    icon: Baby,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "whole-body-imaging",
    name: "Whole-Body Imaging",
    icon: User,
    color: "bg-gray-100 text-gray-700",
  },
];

function CoursesContainer({ userDetails }: ComponentProps) {
    const [courses, setCourses] = useState([])
    const [allCourses, setAllCourses] = useState([])
    const [featuredCourses, setFeaturedCourses] = useState([])


    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.post('http://35.247.179.125/lms-api/get-all-courses', {
                    user_id: userDetails.id
                });
                console.log('Success:', response.data);
                setCourses(response.data.data)
                const featuredCourses = response.data.data.filter((course: any) => course.featured)
                setFeaturedCourses(featuredCourses)
                setAllCourses(response.data.data)

            } catch (error: any) {
                console.error('Error:', error.response?.data || error.message);
            }
        }
        if (userDetails) {
            loadData()
        }
    }, [userDetails])


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Radiology Education Courses</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Advance your radiology expertise with courses designed by leading radiologists from top medical institutions
                </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses, instructors, or topics..." className="pl-10" />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {radiologyCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Browse by Specialty</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-4">
                    {radiologyCategories.map((category) => {
                        const Icon = category.icon
                        return (
                            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-4 text-center">
                                    <div
                                        className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-medium text-sm">{category.name}</h3>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Course Sections */}
            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Courses</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="new">New Releases</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">All Courses ({allCourses.length})</h2>
                        <div className="text-sm text-muted-foreground">Showing {allCourses.length} results</div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {allCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="featured" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Featured Courses</h2>
                        <div className="text-sm text-muted-foreground">More courses to come!</div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="new" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">New Releases</h2>
                        <div className="text-sm text-muted-foreground">Latest courses added this month</div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {allCourses.slice(0, 3).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CoursesContainer;
