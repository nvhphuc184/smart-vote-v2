"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Vote, Users, BarChart3, Settings, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { usePolls } from "@/contexts/poll-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function AdminDashboard() {
  const { polls, deletePoll, updatePoll } = usePolls()
  const { user } = useAuth()

  const activePolls = polls.filter((poll) => poll.isActive)
  const totalVotes = polls.reduce((sum, poll) => sum + poll.votes.reduce((a, b) => a + b, 0), 0)

  // Sample data for charts
  const votingTrends = [
    { date: "Jan", votes: 120 },
    { date: "Feb", votes: 190 },
    { date: "Mar", votes: 300 },
    { date: "Apr", votes: 250 },
    { date: "May", votes: 400 },
    { date: "Jun", votes: 350 },
  ]

  const pollCategories = [
    { name: "Technology", value: 35, color: "#3B82F6" },
    { name: "Food", value: 25, color: "#8B5CF6" },
    { name: "Work", value: 20, color: "#10B981" },
    { name: "Other", value: 20, color: "#F59E0B" },
  ]

  const handleTogglePoll = (pollId: string, isActive: boolean) => {
    updatePoll(pollId, { isActive: !isActive })
  }

  const handleDeletePoll = (pollId: string) => {
    if (confirm("Are you sure you want to delete this poll?")) {
      deletePoll(pollId)
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100 text-lg">Manage polls, users, and monitor platform statistics.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Polls", value: polls.length, icon: Vote, color: "from-blue-500 to-blue-600" },
          { title: "Active Polls", value: activePolls.length, icon: BarChart3, color: "from-green-500 to-green-600" },
          { title: "Total Votes", value: totalVotes, icon: Users, color: "from-purple-500 to-purple-600" },
          { title: "Total Users", value: "1,234", icon: Settings, color: "from-orange-500 to-orange-600" },
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
              <CardTitle>Voting Trends</CardTitle>
              <CardDescription>Monthly voting activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={votingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="votes" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Poll Categories</CardTitle>
              <CardDescription>Distribution of polls by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pollCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pollCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Quick access to admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/create-poll">
                <Button className="w-full h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <div className="text-center">
                    <Plus className="h-6 w-6 mx-auto mb-2" />
                    <span>Create Poll</span>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/polls">
                <Button className="w-full h-20 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <div className="text-center">
                    <Settings className="h-6 w-6 mx-auto mb-2" />
                    <span>Manage Polls</span>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button className="w-full h-20 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <div className="text-center">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <span>Manage Users</span>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/statistics">
                <Button className="w-full h-20 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                  <div className="text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                    <span>Statistics</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Poll Management */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Polls</CardTitle>
            <CardDescription>Manage your polls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {polls.slice(0, 5).map((poll) => (
                <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{poll.title}</h3>
                    <p className="text-sm text-gray-600">{poll.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          poll.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {poll.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{poll.category}</span>
                      <span className="text-xs text-gray-500">{poll.votes.reduce((a, b) => a + b, 0)} votes</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/polls/${poll.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleTogglePoll(poll.id, poll.isActive)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeletePoll(poll.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
