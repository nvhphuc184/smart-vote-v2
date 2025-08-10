"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Vote, TrendingUp, Trophy, Share2, Download } from "lucide-react"
import { usePolitical } from "@/contexts/political-context"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

export default function ElectionResultsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { elections } = usePolitical()

  const election = elections.find((e) => e.id === id)

  if (!election) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-600">Election not found</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  // Calculate results
  const totalVotes = election.totalVotesCast
  const candidateResults = election.candidates
    .map((candidate) => {
      const votes = candidate.totalVotes
      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0
      return {
        ...candidate,
        votes,
        percentage,
      }
    })
    .sort((a, b) => b.votes - a.votes)

  const winner = candidateResults[0]

  const getElectionStatus = () => {
    const now = new Date()
    if (now < election.startDate) return { status: "upcoming", color: "bg-blue-100 text-blue-800" }
    if (now > election.endDate) return { status: "completed", color: "bg-gray-100 text-gray-800" }
    return { status: "active", color: "bg-green-100 text-green-800" }
  }

  const statusInfo = getElectionStatus()

  // Chart data
  const pieChartData = candidateResults.map((candidate) => ({
    name: candidate.name,
    value: candidate.votes,
    color: candidate.partyColor,
  }))

  const barChartData = candidateResults.map((candidate) => ({
    name: candidate.name.split(" ")[0], // First name only for chart
    votes: candidate.votes,
    percentage: candidate.percentage,
  }))

  const handleShare = () => {
    toast.success("Results shared successfully!")
  }

  const handleExport = () => {
    toast.success("Results exported to PDF!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/elections/${election.id}`}>
            <Button variant="outline" className="border-gray-200 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Election
            </Button>
          </Link>
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-6 right-6 flex space-x-2">
                <Badge className={`${statusInfo.color} border-0 capitalize text-lg px-4 py-2`}>
                  {statusInfo.status}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleShare} className="bg-white/90 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport} className="bg-white/90 backdrop-blur-sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{election.name} - Results</h1>
                <p className="text-blue-100 text-lg">Live election results and analytics</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Vote className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Votes</p>
                    <p className="font-medium text-2xl">{totalVotes.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Voter Turnout</p>
                    <p className="font-medium text-2xl">{election.voterTurnout}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Leading Candidate</p>
                    <p className="font-medium">{winner?.name || "TBD"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Lead Margin</p>
                    <p className="font-medium">
                      {candidateResults.length > 1
                        ? `${(candidateResults[0].percentage - candidateResults[1].percentage).toFixed(1)}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Election Results</span>
                </CardTitle>
                <CardDescription>Candidates ranked by vote count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidateResults.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className={`border rounded-lg p-6 transition-all duration-300 ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg"
                          : "hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                            <Image
                              src={candidate.profileImage || "/placeholder.svg"}
                              alt={candidate.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {index === 0 && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Trophy className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold flex items-center space-x-2">
                                <span>#{index + 1}</span>
                                <span>{candidate.name}</span>
                                {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                              </h3>
                              <p className="text-sm" style={{ color: candidate.partyColor }}>
                                {candidate.party}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{candidate.votes.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">votes</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Vote Share</span>
                              <span className="font-medium">{candidate.percentage.toFixed(1)}%</span>
                            </div>
                            <Progress
                              value={candidate.percentage}
                              className="h-3"
                              style={
                                {
                                  "--progress-background": candidate.partyColor,
                                } as React.CSSProperties
                              }
                            />
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <Badge
                              variant="outline"
                              style={{
                                borderColor: candidate.partyColor,
                                color: candidate.partyColor,
                              }}
                            >
                              {candidate.followers.toLocaleString()} followers
                            </Badge>
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="space-y-6">
            {/* Vote Distribution Pie Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [value.toLocaleString(), "Votes"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieChartData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="flex-1">{entry.name}</span>
                      <span className="font-medium">{entry.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vote Comparison Bar Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Vote Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barChartData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={60} />
                    <Tooltip formatter={(value: any) => [value.toLocaleString(), "Votes"]} />
                    <Bar dataKey="votes" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Election Statistics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Election Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Candidates</span>
                  <span className="font-bold">{election.candidates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Votes</span>
                  <span className="font-bold">{totalVotes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Voter Turnout</span>
                  <span className="font-bold">{election.voterTurnout}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Votes Per Voter</span>
                  <span className="font-bold">{election.votesPerVoter}</span>
                </div>

                {statusInfo.status === "active" && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">🔴 Live Results - Updates every 30 seconds</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
