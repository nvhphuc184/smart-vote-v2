"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, BarChart3, TrendingUp, Eye } from "lucide-react"
import { usePolls } from "@/contexts/poll-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function CandidateDashboard() {
  const { polls } = usePolls()
  const { user } = useAuth()

  // Sample data for candidate performance
  const performanceData = [
    { poll: "Tech Poll", votes: 45, percentage: 27 },
    { poll: "Food Poll", votes: 23, percentage: 15 },
    { poll: "Work Poll", votes: 67, percentage: 20 },
  ]

  const trendData = [
    { month: "Jan", votes: 20 },
    { month: "Feb", votes: 35 },
    { month: "Mar", votes: 45 },
    { month: "Apr", votes: 30 },
    { month: "May", votes: 67 },
    { month: "Jun", votes: 55 },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Candidate Dashboard</h1>
        <p className="text-green-100 text-lg">Track your performance and view poll results.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Votes", value: "135", icon: BarChart3, color: "from-blue-500 to-blue-600" },
          { title: "Polls Participated", value: "8", icon: User, color: "from-green-500 to-green-600" },
          { title: "Average Rating", value: "4.2", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
          { title: "Ranking", value: "#3", icon: Eye, color: "from-orange-500 to-orange-600" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Performance by Poll</CardTitle>
              <CardDescription>Your votes received in different polls</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="poll" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Vote Trends</CardTitle>
              <CardDescription>Your voting trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="votes" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your candidate profile and view results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/profile">
                <Button className="w-full h-20 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <div className="text-center">
                    <User className="h-6 w-6 mx-auto mb-2" />
                    <span>Edit Profile</span>
                  </div>
                </Button>
              </Link>
              <Link href="/results">
                <Button className="w-full h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <div className="text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                    <span>View Results</span>
                  </div>
                </Button>
              </Link>
              <Link href="/polls">
                <Button className="w-full h-20 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <div className="text-center">
                    <Eye className="h-6 w-6 mx-auto mb-2" />
                    <span>Browse Polls</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Poll Results */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Poll Results</CardTitle>
            <CardDescription>Your performance in recent polls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((poll, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{poll.poll}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">
                        {poll.votes} votes ({poll.percentage}%)
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${poll.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <Link href={`/polls/${index + 1}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
