"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Vote, Users, Clock, ArrowLeft, Check } from "lucide-react"
import { usePolls } from "@/contexts/poll-context"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export default function PollDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { polls, vote } = usePolls()
  const [selectedOption, setSelectedOption] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  const poll = polls.find((p) => p.id === id)

  useEffect(() => {
    // Check if user has already voted (in real app, this would be from backend)
    const votedPolls = JSON.parse(localStorage.getItem("voted-polls") || "[]")
    setHasVoted(votedPolls.includes(id))
  }, [id])

  if (!poll) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-600">Poll not found</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleVote = async () => {
    if (!selectedOption) return

    setIsVoting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const optionIndex = poll.options.indexOf(selectedOption)
    vote(poll.id, optionIndex)

    // Mark as voted
    const votedPolls = JSON.parse(localStorage.getItem("voted-polls") || "[]")
    votedPolls.push(id)
    localStorage.setItem("voted-polls", JSON.stringify(votedPolls))

    setHasVoted(true)
    setIsVoting(false)
  }

  const totalVotes = poll.votes.reduce((a, b) => a + b, 0)

  const chartData = poll.options.map((option, index) => ({
    name: option,
    votes: poll.votes[index],
    percentage: totalVotes > 0 ? ((poll.votes[index] / totalVotes) * 100).toFixed(1) : 0,
  }))

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Polls
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poll Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex space-x-2">
                      <Badge variant={poll.isActive ? "default" : "secondary"}>
                        {poll.isActive ? "Active" : "Closed"}
                      </Badge>
                      <Badge variant="outline">{poll.category}</Badge>
                    </div>
                    {hasVoted && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Voted
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-3xl">{poll.title}</CardTitle>
                  <CardDescription className="text-lg">{poll.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{totalVotes} total votes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Ends {poll.endDate.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {poll.isActive && !hasVoted ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Cast Your Vote</h3>
                      <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                        <div className="space-y-3">
                          {poll.options.map((option, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              onClick={() => setSelectedOption(option)}
                            >
                              <RadioGroupItem value={option} id={`option-${index}`} />
                              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                                {option}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </RadioGroup>
                      <Button
                        onClick={handleVote}
                        disabled={!selectedOption || isVoting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                      >
                        <Vote className="h-5 w-5 mr-2" />
                        {isVoting ? "Submitting Vote..." : "Submit Vote"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Results</h3>
                      <div className="space-y-4">
                        {poll.options.map((option, index) => {
                          const percentage = totalVotes > 0 ? (poll.votes[index] / totalVotes) * 100 : 0
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{option}</span>
                                <span className="text-sm text-gray-600">
                                  {poll.votes[index]} votes ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <motion.div
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Vote Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="votes"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {chartData.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="truncate">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Vote Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={60} />
                      <Tooltip />
                      <Bar dataKey="votes" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Poll Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Created by</p>
                    <p className="font-medium">{poll.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created on</p>
                    <p className="font-medium">{poll.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total options</p>
                    <p className="font-medium">{poll.options.length}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
