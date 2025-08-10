"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Vote, Activity, Calendar } from "lucide-react"
import { usePolls } from "@/contexts/poll-context"
import { useAuth } from "@/contexts/auth-context"
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
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts"

export default function StatisticsPage() {
  const { polls, users } = usePolls()
  const { user } = useAuth()

  // Redirect if not admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  // Calculate statistics
  const totalPolls = polls.length
  const activePolls = polls.filter((poll) => poll.isActive).length
  const totalVotes = polls.reduce((sum, poll) => sum + poll.votes.reduce((a, b) => a + b, 0), 0)
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.isActive).length

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

  // User role distribution
  const roleData = users.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const roleChartData = Object.entries(roleData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    percentage: ((value / totalUsers) * 100).toFixed(1),
  }))

  // Voting trends (mock data with some real calculations)
  const trendData = [
    { month: "Jan", votes: 120, polls: 5, users: 45 },
    { month: "Feb", votes: 190, polls: 8, users: 67 },
    { month: "Mar", votes: 300, polls: 12, users: 89 },
    { month: "Apr", votes: 250, polls: 10, users: 102 },
    { month: "May", votes: 400, polls: 15, users: 134 },
    { month: "Jun", votes: totalVotes, polls: activePolls, users: totalUsers },
  ]

  // Poll performance data
  const pollPerformanceData = polls
    .map((poll) => ({
      name: poll.title.substring(0, 15) + "...",
      votes: poll.votes.reduce((a, b) => a + b, 0),
      options: poll.options.length,
      engagement: ((poll.votes.reduce((a, b) => a + b, 0) / totalVotes) * 100).toFixed(1),
    }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 8)

  // Participation rate data
  const participationData = [
    { name: "High Engagement", value: 35, fill: "#10B981" },
    { name: "Medium Engagement", value: 45, fill: "#3B82F6" },
    { name: "Low Engagement", value: 20, fill: "#F59E0B" },
  ]

  // Activity timeline (mock data)
  const activityData = [
    { time: "00:00", activity: 12 },
    { time: "04:00", activity: 8 },
    { time: "08:00", activity: 45 },
    { time: "12:00", activity: 67 },
    { time: "16:00", activity: 89 },
    { time: "20:00", activity: 56 },
  ]

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#EC4899", "#14B8A6"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Platform Statistics
          </h1>
          <p className="text-xl text-gray-600">Comprehensive analytics and insights</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          {[
            {
              title: "Total Polls",
              value: totalPolls,
              icon: Vote,
              color: "from-blue-500 to-blue-600",
              change: "+12%",
            },
            {
              title: "Active Polls",
              value: activePolls,
              icon: Activity,
              color: "from-green-500 to-green-600",
              change: "+8%",
            },
            {
              title: "Total Votes",
              value: totalVotes,
              icon: BarChart3,
              color: "from-purple-500 to-purple-600",
              change: "+23%",
            },
            {
              title: "Total Users",
              value: totalUsers,
              icon: Users,
              color: "from-orange-500 to-orange-600",
              change: "+15%",
            },
            {
              title: "Active Users",
              value: activeUsers,
              icon: TrendingUp,
              color: "from-pink-500 to-pink-600",
              change: "+18%",
            },
            {
              title: "Avg Votes/Poll",
              value: Math.round(totalVotes / totalPolls) || 0,
              icon: Calendar,
              color: "from-indigo-500 to-indigo-600",
              change: "+5%",
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
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Poll Categories</CardTitle>
                <CardDescription>Distribution of polls by category</CardDescription>
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
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Roles */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Distribution of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={roleChartData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                    <Tooltip />
                    <Legend />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trends and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Voting Trends */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Monthly trends for votes, polls, and users</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="votes"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="polls"
                      stackId="2"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="3"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Poll Performance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Polls</CardTitle>
                <CardDescription>Polls ranked by total votes received</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pollPerformanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Participation Rate */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User participation levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={participationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {participationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity Pattern</CardTitle>
                <CardDescription>User activity throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="activity"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Platform Summary</CardTitle>
              <CardDescription>Key insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Most Popular Category</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {categoryChartData.length > 0 ? categoryChartData[0].name : "N/A"}
                  </p>
                  <p className="text-sm text-blue-600">
                    {categoryChartData.length > 0 ? `${categoryChartData[0].percentage}% of polls` : ""}
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Average Engagement</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {totalPolls > 0 ? Math.round((totalVotes / totalPolls) * 10) / 10 : 0}
                  </p>
                  <p className="text-sm text-green-600">votes per poll</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">User Growth</h3>
                  <p className="text-2xl font-bold text-purple-600">+{Math.round((activeUsers / totalUsers) * 100)}%</p>
                  <p className="text-sm text-purple-600">active users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
