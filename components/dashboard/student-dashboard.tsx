"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Bell,
  Settings,
  FileText,
  Users,
  BarChart3,
} from "lucide-react"
import Sidebar from "@/components/layout/sidebar"

const studentNavItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard/student", active: true },
  { icon: BookOpen, label: "Courses", href: "/dashboard/student/courses" },
  { icon: GraduationCap, label: "Grades", href: "/dashboard/student/grades" },
  { icon: Calendar, label: "Schedule", href: "/dashboard/student/schedule" },
  { icon: Users, label: "Advisors", href: "/dashboard/student/advisors" },
  { icon: FileText, label: "Assignments", href: "/dashboard/student/assignments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/student/messages" },
]

export default function StudentDashboard() {
  const [currentTime] = useState(new Date())
  console.log(currentTime)

  const todaysClasses = [
    { time: "8:00 AM - 9:30 AM", course: "MAT110", venue: "ROOM 102", lecturer: "Dr. Asiedu" },
    { time: "10:00 AM - 11:30 AM", course: "CSC101", venue: "ICT LAB", lecturer: "Prof. Mensah" },
    { time: "2:00 PM - 3:30 PM", course: "ENG112", venue: "ROOM 205", lecturer: "Dr. Osei" },
  ]

  const assignments = [
    { course: "MAT110", title: "Calculus Assignment", dueDate: "10/10/2024", status: "pending" },
    { course: "CSC101", title: "Programming Project", dueDate: "12/10/2024", status: "submitted" },
    { course: "ENG112", title: "Essay Writing", dueDate: "15/10/2024", status: "pending" },
  ]

  const announcements = [
    { title: "Welcome Back to School", type: "general", date: "2024-10-01" },
    { title: "Registration Deadline", type: "important", date: "2024-10-05" },
    { title: "Mid-term Exams Schedule", type: "academic", date: "2024-10-08" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navItems={studentNavItems} userRole="student" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Good morning, Jane Doe</h1>
              <p className="text-gray-600">2024/2025 First Semester</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Academic Stats */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Level</p>
                    <p className="text-3xl font-bold">100</p>
                  </div>
                  <GraduationCap className="h-12 w-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Courses/Units</p>
                    <p className="text-3xl font-bold">10/24</p>
                  </div>
                  <BookOpen className="h-12 w-12 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">CGPA</p>
                    <p className="text-3xl font-bold">4.5</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today&apos;s Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysClasses.map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{class_.course}</p>
                        <p className="text-sm text-gray-600">{class_.time}</p>
                        <p className="text-sm text-gray-500">
                          {class_.venue} • {class_.lecturer}
                        </p>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                        <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                      </div>
                      <Badge variant={assignment.status === "submitted" ? "default" : "destructive"}>
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Mathematics</span>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Computer Science</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">English</span>
                      <span className="text-sm text-gray-600">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{announcement.title}</p>
                        <p className="text-xs text-gray-500">{announcement.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {announcement.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
