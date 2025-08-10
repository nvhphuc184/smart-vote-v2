"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react"
import { usePolls } from "@/contexts/poll-context"
import Link from "next/link"
import Navigation from "@/components/navigation"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

export default function ResultsPage() {
  const { polls } = usePolls()

  // Calculate overall statistics
  const totalPolls = polls.length
  const activePolls = polls.filter((poll) => poll.isActive).length
  const totalVotes = polls.reduce((sum, poll) => sum + poll.votes.reduce((a, b) => a + b, 0), 0)

  // Category distribution
  const categoryData = polls.reduce(
    (acc, poll) => {
      acc[poll.category] = (acc[poll.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / totalPolls) * 100).toFixed(1),
  }))

  // Voting trends (mock data)
  const trendData = [
    { month: "Jan", votes: 120, polls: 5 },
    { month: "Feb", votes: 190, polls: 8 },
    { month: "Mar", votes: 300, polls: 12 },
    { month: "Apr", votes: 250, polls: 10 },
    { month: "May", votes: 400, polls: 15 },
    { month: "Jun", votes: 350, polls: 13 },
  ]

  // Top polls by votes
  const topPolls = [...polls]
    .sort((a, b) => b.votes.reduce((sum, vote) => sum + vote, 0) - a.votes.reduce((sum, vote) => sum + vote, 0))
    .slice(0, 5)

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Poll Results & Analytics
          </h1>
          <p className="text-xl text-gray-600">Comprehensive insights into voting patterns and poll performance</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Polls", value: totalPolls, icon: BarChart3, color: "from-blue-500 to-blue-600" },
            { title: "Active Polls", value: activePolls, icon: TrendingUp, color: "from-green-500 to-green-600" },
            { title: "Total Votes", value: totalVotes, icon: Users, color: "from-purple-500 to-purple-600" },
            {
              title: "Avg Votes/Poll",
              value: Math.round(totalVotes / totalPolls) || 0,
              icon: Eye,
              color: "from-orange-500 to-orange-600",
            },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Poll Categories Distribution</CardTitle>
                <CardDescription>Breakdown of polls by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} polls`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {categoryChartData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>
                        {entry.name} ({entry.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>Voting Trends</CardTitle>
                <CardDescription>Monthly voting activity and poll creation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="votes" stroke="#3B82F6" strokeWidth={3} name="Votes" />
                    <Line type="monotone" dataKey="polls" stroke="#8B5CF6" strokeWidth={3} name="Polls Created" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Polls */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Polls</CardTitle>
              <CardDescription>Polls with the highest engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPolls.map((poll, index) => {
                  const totalVotes = poll.votes.reduce((a, b) => a + b, 0)
                  const topOption = poll.options[poll.votes.indexOf(Math.max(...poll.votes))]
                  const topVotes = Math.max(...poll.votes)
                  const percentage = totalVotes > 0 ? ((topVotes / totalVotes) * 100).toFixed(1) : 0

                  return (
                    <motion.div
                      key={poll.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{poll.title}</h3>
                            <p className="text-sm text-gray-600">{poll.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 ml-12">
                          <Badge variant={poll.isActive ? "default" : "secondary"}>
                            {poll.isActive ? "Active" : "Closed"}
                          </Badge>
                          <Badge variant="outline">{poll.category}</Badge>
                          <span className="text-sm text-gray-600">{totalVotes} total votes</span>
                          <span className="text-sm text-green-600 font-medium">
                            Leading: {topOption} ({percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/polls/${poll.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Vote Distribution Analysis</CardTitle>
              <CardDescription>Detailed breakdown of voting patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={topPolls.map((poll) => ({
                    name: poll.title.substring(0, 20) + "...",
                    votes: poll.votes.reduce((a, b) => a + b, 0),
                    options: poll.options.length,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#3B82F6" name="Total Votes" />
                  <Bar dataKey="options" fill="#8B5CF6" name="Number of Options" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
