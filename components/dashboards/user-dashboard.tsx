"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Vote, Plus, BarChart3, TrendingUp } from "lucide-react"
import { usePolls } from "@/contexts/poll-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export default function UserDashboard() {
  const { polls } = usePolls()
  const { user } = useAuth()

  const activePolls = polls.filter((poll) => poll.isActive)
  const recentPolls = polls.slice(0, 3)

  // Sample data for charts
  const participationData = [
    { name: "Voted", value: 12 },
    { name: "Not Voted", value: 8 },
  ]

  const categoryData = [
    { category: "Technology", votes: 5 },
    { category: "Food", votes: 3 },
    { category: "Work", votes: 4 },
  ]

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100 text-lg">Ready to make your voice heard? Check out the latest polls below.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Polls", value: activePolls.length, icon: Vote, color: "from-blue-500 to-blue-600" },
          { title: "My Votes", value: "12", icon: BarChart3, color: "from-green-500 to-green-600" },
          { title: "Polls Created", value: "3", icon: Plus, color: "from-purple-500 to-purple-600" },
          { title: "Participation Rate", value: "85%", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
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
              <CardTitle>Voting Participation</CardTitle>
              <CardDescription>Your voting activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {participationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Votes by Category</CardTitle>
              <CardDescription>Your voting preferences by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#3B82F6" />
                </BarChart>
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
            <CardDescription>Get started with these common actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/polls">
                <Button className="w-full h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <div className="text-center">
                    <Vote className="h-6 w-6 mx-auto mb-2" />
                    <span>Vote in Polls</span>
                  </div>
                </Button>
              </Link>
              <Link href="/create-poll">
                <Button className="w-full h-20 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <div className="text-center">
                    <Plus className="h-6 w-6 mx-auto mb-2" />
                    <span>Create Poll</span>
                  </div>
                </Button>
              </Link>
              <Link href="/results">
                <Button className="w-full h-20 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <div className="text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                    <span>View Results</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Polls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Polls</CardTitle>
            <CardDescription>Latest polls you can participate in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPolls.map((poll) => (
                <div
                  key={poll.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{poll.title}</h3>
                    <p className="text-sm text-gray-600">{poll.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{poll.category}</span>
                      <span className="text-xs text-gray-500">{poll.votes.reduce((a, b) => a + b, 0)} votes</span>
                    </div>
                  </div>
                  <Link href={`/polls/${poll.id}`}>
                    <Button size="sm">{poll.isActive ? "Vote Now" : "View Results"}</Button>
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
