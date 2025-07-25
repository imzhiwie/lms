'use client';
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BookOpen,
    Clock,
    Users,
    Star,
    Play,
    Award,
    Download,
    Share2,
    Heart,
    CheckCircle,
    PlayCircle,
    FileText,
    Brain,
    Calendar,
    Globe,
    Shield,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"


// This would typically come from your database
// const courseData = {
//     id: "1",
//     title: "Advanced MRI Brain Interpretation",
//     subtitle: "Master advanced MRI brain interpretation techniques including diffusion, perfusion, and spectroscopy",
//     instructor: {
//         name: "Dr. Sarah Chen, MD",
//         title: "Neuroradiologist, Johns Hopkins Hospital",
//         bio: "Dr. Chen is a board-certified neuroradiologist with over 15 years of experience in advanced neuroimaging. She has published over 100 peer-reviewed articles and is a recognized expert in functional MRI and diffusion tensor imaging.",
//         avatar: "/placeholder.svg?height=100&width=100",
//         rating: 4.9,
//         students: 12450,
//         courses: 8,
//     },
//     duration: "12 hours",
//     students: 1247,
//     rating: 4.8,
//     reviewCount: 342,
//     price: 299,
//     originalPrice: 399,
//     category: "Neuroradiology",
//     level: "Advanced",
//     language: "English",
//     cmeCredits: 12,
//     lastUpdated: "November 2024",
//     certificate: true,
//     downloadable: true,
//     lifetime: true,
//     preview: "/placeholder.svg?height=400&width=600",

//     whatYouWillLearn: [
//         "Interpret complex brain MRI sequences including DWI, PWI, and MRS",
//         "Recognize pathological patterns in neuroimaging across all age groups",
//         "Apply advanced MRI techniques in clinical practice and research",
//         "Understand the physics behind advanced MRI sequences",
//         "Develop systematic approaches to brain MRI interpretation",
//         "Correlate imaging findings with clinical presentations",
//     ],

//     requirements: [
//         "Basic knowledge of MRI physics and brain anatomy",
//         "Completion of radiology residency or equivalent experience",
//         "Access to PACS system for practice cases (recommended)",
//         "Basic understanding of neurological conditions",
//     ],

//     curriculum: [
//         {
//             id: 1,
//             title: "Introduction to Advanced MRI Techniques",
//             duration: "2 hours",
//             lessons: [
//                 { id: 1, title: "Course Overview and Learning Objectives", type: "video", duration: "15 min", preview: true },
//                 { id: 2, title: "Advanced MRI Physics Review", type: "video", duration: "45 min", preview: false },
//                 { id: 3, title: "Sequence Selection and Optimization", type: "video", duration: "30 min", preview: false },
//                 { id: 4, title: "Quality Control and Artifacts", type: "video", duration: "25 min", preview: false },
//                 { id: 5, title: "Module 1 Quiz", type: "quiz", duration: "15 min", preview: false },
//             ],
//         },
//         {
//             id: 2,
//             title: "Diffusion Weighted Imaging (DWI)",
//             duration: "3 hours",
//             lessons: [
//                 { id: 6, title: "DWI Physics and Principles", type: "video", duration: "40 min", preview: false },
//                 { id: 7, title: "ADC Maps and Interpretation", type: "video", duration: "35 min", preview: false },
//                 { id: 8, title: "Diffusion Tensor Imaging (DTI)", type: "video", duration: "45 min", preview: false },
//                 { id: 9, title: "Clinical Applications of DWI", type: "video", duration: "50 min", preview: false },
//                 { id: 10, title: "DWI Case Studies", type: "case", duration: "25 min", preview: false },
//                 { id: 11, title: "Module 2 Assessment", type: "quiz", duration: "15 min", preview: false },
//             ],
//         },
//         {
//             id: 3,
//             title: "Perfusion Weighted Imaging (PWI)",
//             duration: "2.5 hours",
//             lessons: [
//                 { id: 12, title: "PWI Techniques: DSC vs ASL", type: "video", duration: "35 min", preview: false },
//                 { id: 13, title: "Perfusion Parameters and Maps", type: "video", duration: "40 min", preview: false },
//                 { id: 14, title: "Clinical Applications in Stroke", type: "video", duration: "45 min", preview: false },
//                 { id: 15, title: "Tumor Perfusion Analysis", type: "video", duration: "35 min", preview: false },
//                 { id: 16, title: "Perfusion Case Review", type: "case", duration: "20 min", preview: false },
//             ],
//         },
//         {
//             id: 4,
//             title: "MR Spectroscopy (MRS)",
//             duration: "2 hours",
//             lessons: [
//                 { id: 17, title: "MRS Fundamentals", type: "video", duration: "30 min", preview: false },
//                 { id: 18, title: "Single Voxel vs Multi-voxel MRS", type: "video", duration: "25 min", preview: false },
//                 { id: 19, title: "Metabolite Interpretation", type: "video", duration: "40 min", preview: false },
//                 { id: 20, title: "Clinical MRS Applications", type: "video", duration: "35 min", preview: false },
//                 { id: 21, title: "MRS Case Studies", type: "case", duration: "15 min", preview: false },
//             ],
//         },
//         {
//             id: 5,
//             title: "Integrated Case Studies",
//             duration: "2.5 hours",
//             lessons: [
//                 { id: 22, title: "Complex Neuro Cases", type: "case", duration: "45 min", preview: false },
//                 { id: 23, title: "Pediatric Advanced MRI", type: "case", duration: "35 min", preview: false },
//                 { id: 24, title: "Research Applications", type: "video", duration: "30 min", preview: false },
//                 { id: 25, title: "Future Directions in MRI", type: "video", duration: "25 min", preview: false },
//                 { id: 26, title: "Final Comprehensive Exam", type: "quiz", duration: "45 min", preview: false },
//             ],
//         },
//     ],

    // reviews: [
    //     {
    //         id: 1,
    //         user: "Dr. Michael Thompson",
    //         title: "Radiologist",
    //         rating: 5,
    //         date: "2 weeks ago",
    //         comment:
    //             "Excellent course! Dr. Chen's explanations are clear and the case studies are very relevant to daily practice. The advanced techniques covered here have significantly improved my confidence in interpreting complex brain MRIs.",
    //         helpful: 23,
    //     },
    //     {
    //         id: 2,
    //         user: "Dr. Jennifer Liu",
    //         title: "Neuroradiology Fellow",
    //         rating: 5,
    //         date: "1 month ago",
    //         comment:
    //             "As a fellow, this course provided exactly what I needed to understand advanced MRI techniques. The physics explanations are thorough but accessible, and the clinical correlations are spot-on.",
    //         helpful: 18,
    //     },
    //     {
    //         id: 3,
    //         user: "Dr. Robert Martinez",
    //         title: "Attending Radiologist",
    //         rating: 4,
    //         date: "6 weeks ago",
    //         comment:
    //             "Great content and well-organized curriculum. The only minor issue is that some videos could be slightly shorter, but overall an excellent learning experience.",
    //         helpful: 12,
    //     },
    // ],
// }

export default function CourseDetailPage() {
    const params = useParams()
    const courseId = params.courseId as string
    const [courseData, setCourseData] = useState<any>('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                //TODO: To add UserDetails
                const response = await axios.post('http://35.247.179.125/lms-api/get-course-preview', {
                    user_id: "1",
                    course_id: params.courseId,
                });
                console.log('Success:', response.data);
                setCourseData(response.data.data)
                setLoading(false)
            } catch (error: any) {
                console.error('Error:', error.response?.data || error.message);
            }
        }
        if (loading) {
            loadCourse()
        }
    }, [loading])


    return (
        <DashboardLayout>
            {courseData && (
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
                        <div className="grid lg:grid-cols-3 gap-8 p-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-purple-600">{courseData.category}</Badge>
                                        <Badge variant="outline" className="text-white border-white">
                                            {courseData.level}
                                        </Badge>
                                    </div>

                                    <h1 className="text-4xl font-bold leading-tight">{courseData.title}</h1>

                                    <p className="text-xl text-gray-300">{courseData.subtitle}</p>
                                </div>

                                {/* Course Stats */}
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{courseData.rating}</span>
                                        <span className="text-gray-300">({courseData.reviewCount} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{courseData.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{courseData.duration} total</span>
                                    </div>
                                    {/* <div className="flex items-center gap-1">
                                        <Award className="h-4 w-4" />
                                        <span>{courseData.cmeCredits} CME Credits</span>
                                    </div> */}
                                    <div className="flex items-center gap-1">
                                        <Globe className="h-4 w-4" />
                                        <span>{courseData.language}</span>
                                    </div>
                                </div>

                                {/* Instructor */}
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={courseData.instructor.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">Created by {courseData.instructor.name}</div>
                                        <div className="text-gray-300 text-sm">{courseData.instructor.title}</div>
                                    </div>
                                </div>

                                {/* Course Features */}
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Last updated {courseData.lastUpdated}</span>
                                    </div>
                                    {courseData.certificate && (
                                        <div className="flex items-center gap-1">
                                            <Award className="h-4 w-4" />
                                            <span>Certificate of completion</span>
                                        </div>
                                    )}
                                    {courseData.downloadable && (
                                        <div className="flex items-center gap-1">
                                            <Download className="h-4 w-4" />
                                            <span>Downloadable resources</span>
                                        </div>
                                    )}
                                    {courseData.lifetime && (
                                        <div className="flex items-center gap-1">
                                            <Shield className="h-4 w-4" />
                                            <span>Lifetime access</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pricing Card */}
                            <div className="lg:col-span-1">
                                <Card className="bg-white text-gray-900">
                                    <CardContent className="p-6 space-y-6">
                                        {/* Preview Video */}
                                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <Play className="h-6 w-6 text-white ml-1" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                                Preview
                                            </div>
                                        </div>

                                        {/* Pricing */}
                                        {/* <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-bold">${courseData.price}</span>
                                            <span className="text-xl text-gray-500 line-through">${courseData.originalPrice}</span>
                                            <Badge variant="destructive">{discount}% OFF</Badge>
                                        </div>
                                        <div className="text-sm text-red-600 font-medium">Limited time offer! Sale ends soon.</div>
                                    </div> */}

                                        {/* Action Buttons */}
                                        <div className="space-y-3">
                                            <Link href={`/courses/${courseData.id}/learn`}>
                                                <Button size="lg" className="w-full">
                                                    Enroll Now
                                                </Button>
                                            </Link>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                                    <Heart className="h-4 w-4 mr-2" />
                                                    Wishlist
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                                    <Share2 className="h-4 w-4 mr-2" />
                                                    Share
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Course Includes */}
                                        <div className="space-y-3">
                                            <h4 className="font-medium">This course includes:</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <PlayCircle className="h-4 w-4" />
                                                    <span>{courseData.duration} on-demand video</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4" />
                                                    <span>Downloadable resources</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Award className="h-4 w-4" />
                                                    <span>Certificate of completion</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4" />
                                                    <span>Lifetime access</span>
                                                </div>
                                                {/* <div className="flex items-center gap-2">
                                                    <Brain className="h-4 w-4" />
                                                    <span>{courseData.cmeCredits} CME Credits</span>
                                                </div> */}
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Course Content Tabs */}
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                            <TabsTrigger value="instructor">Instructor</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-8">
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* What You'll Learn */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>What you'll learn</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {courseData.whatYouWillLearn.map((item, index) => (
                                                    <div key={index} className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Requirements */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Requirements</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {courseData.requirements.map((req, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm">
                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* Course Description */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Course Description</CardTitle>
                                        </CardHeader>
                                        <CardContent className="prose prose-sm max-w-none">
                                            <p>
                                                This comprehensive course is designed for radiologists, neuroradiologists, and radiology residents
                                                who want to master advanced MRI brain interpretation techniques. Led by Dr. Sarah Chen, a renowned
                                                neuroradiologist from Johns Hopkins, this course covers the latest advances in neuroimaging.
                                            </p>
                                            <p>
                                                You'll learn to interpret complex MRI sequences including diffusion-weighted imaging (DWI),
                                                perfusion-weighted imaging (PWI), and magnetic resonance spectroscopy (MRS). The course combines
                                                theoretical knowledge with practical case studies to ensure you can apply these techniques in your
                                                daily practice.
                                            </p>
                                            <p>
                                                Each module includes high-quality video lectures, interactive case studies, and assessments to
                                                test your understanding. Upon completion, you'll receive 12 CME credits and a certificate of
                                                completion.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="lg:col-span-1">
                                    {/* Course Stats */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Course Statistics</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between">
                                                <span>Total Lessons</span>
                                                <span className="font-medium">{courseData.totalLessons}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Video Content</span>
                                                <span className="font-medium">{courseData.duration}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Skill Level</span>
                                                <span className="font-medium">{courseData.level}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Language</span>
                                                <span className="font-medium">{courseData.language}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>CME Credits</span>
                                                <span className="font-medium">{courseData.cmeCredits}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="curriculum" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">Course Curriculum</h2>
                                <div className="text-sm text-muted-foreground">
                                    {courseData.curriculum.length} modules • {courseData.totalLessons} lessons • {courseData.duration} total
                                </div>
                            </div>

                            <div className="space-y-4">
                                {courseData.curriculum.map((module, moduleIndex) => (
                                    <Card key={module.id}>
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">
                                                    Module {moduleIndex + 1}: {module.title}
                                                </CardTitle>
                                                <div className="text-sm text-muted-foreground">
                                                    {module.lessons.length} lessons • {module.duration}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {module.lessons.map((lesson, lessonIndex) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
                                                                {lessonIndex + 1}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{lesson.title}</div>
                                                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                                    {lesson.type === "video" && <PlayCircle className="h-4 w-4" />}
                                                                    {lesson.type === "quiz" && <FileText className="h-4 w-4" />}
                                                                    {lesson.type === "case" && <Brain className="h-4 w-4" />}
                                                                    <span className="capitalize">{lesson.type}</span>
                                                                    <span>•</span>
                                                                    <span>{lesson.duration}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {lesson.preview && <Badge variant="outline">Preview</Badge>}
                                                            <Button variant="ghost" size="sm">
                                                                <Play className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="instructor" className="space-y-6">
                            <Card>
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-6">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src={courseData.instructor.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h2 className="text-2xl font-bold">{courseData.instructor.name}</h2>
                                                <p className="text-lg text-muted-foreground">{courseData.instructor.title}</p>
                                            </div>

                                            <div className="flex items-center gap-6 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-medium">{courseData.instructor.rating} instructor rating</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>{courseData.instructor.students.toLocaleString()} students</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{courseData.instructor.courses} courses</span>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground leading-relaxed">{courseData.instructor.bio}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">Student Reviews</h2>
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xl font-bold">{courseData.rating}</span>
                                    <span className="text-muted-foreground">({courseData.reviewCount} reviews)</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {courseData.reviews.map((review) => (
                                    <Card key={review.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {review.user
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-medium">{review.user}</div>
                                                            <div className="text-sm text-muted-foreground">{review.title}</div>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">{review.date}</div>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className="text-muted-foreground">{review.comment}</p>

                                                    <div className="flex items-center gap-4 text-sm">
                                                        <Button variant="ghost" size="sm">
                                                            Helpful ({review.helpful})
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            Report
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}

        </DashboardLayout>
    )
}
