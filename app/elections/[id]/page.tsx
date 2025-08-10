"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Vote, Users, Calendar, ArrowLeft, Check, AlertCircle, TrendingUp, Eye } from "lucide-react"
import { usePolitical, type UserVoteAllocation } from "@/contexts/political-context"
import { useAuth } from "@/contexts/auth-context"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function ElectionDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { elections, getUserVotingPower, allocateVotes } = usePolitical()
  const { user } = useAuth()

  const [voteAllocations, setVoteAllocations] = useState<{ [candidateId: string]: number }>({})
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  const election = elections.find((e) => e.id === id)
  const userVotingPower = user ? getUserVotingPower(user.id, id as string) : null

  useEffect(() => {
    if (userVotingPower && userVotingPower.usedVotes > 0) {
      setHasVoted(true)
      const allocations: { [candidateId: string]: number } = {}
      userVotingPower.allocations.forEach((allocation) => {
        allocations[allocation.candidateId] = allocation.votes
      })
      setVoteAllocations(allocations)
    }
  }, [userVotingPower])

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

  const totalAllocated = Object.values(voteAllocations).reduce((sum, votes) => sum + votes, 0)
  const remainingVotes = userVotingPower ? userVotingPower.totalVotes - totalAllocated : 0

  const handleVoteChange = (candidateId: string, votes: string) => {
    const numVotes = Number.parseInt(votes) || 0
    setVoteAllocations((prev) => ({
      ...prev,
      [candidateId]: numVotes,
    }))
  }

  const handleSubmitVotes = async () => {
    if (!user || !userVotingPower) return

    if (totalAllocated === 0) {
      toast.error("Please allocate at least one vote")
      return
    }

    if (totalAllocated > userVotingPower.totalVotes) {
      toast.error("You cannot allocate more votes than you have")
      return
    }

    setIsVoting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const allocations: UserVoteAllocation[] = Object.entries(voteAllocations)
      .filter(([_, votes]) => votes > 0)
      .map(([candidateId, votes]) => ({ candidateId, votes }))

    allocateVotes(user.id, election.id, allocations)

    setIsVoting(false)
    setHasVoted(true)
    toast.success("Your votes have been cast successfully!")
  }

  const getElectionStatus = () => {
    const now = new Date()
    if (now < election.startDate) return { status: "upcoming", color: "bg-blue-100 text-blue-800" }
    if (now > election.endDate) return { status: "completed", color: "bg-gray-100 text-gray-800" }
    return { status: "active", color: "bg-green-100 text-green-800" }
  }

  const statusInfo = getElectionStatus()

  // Chart data for vote distribution
  const chartData = Object.entries(voteAllocations)
    .filter(([_, votes]) => votes > 0)
    .map(([candidateId, votes]) => {
      const candidate = election.candidates.find((c) => c.id === candidateId)
      return {
        name: candidate?.name || "Unknown",
        votes,
        color: candidate?.partyColor || "#6366f1",
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/elections">
            <Button variant="outline" className="border-gray-200 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Elections
            </Button>
          </Link>
        </div>

        {/* Election Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-6 right-6">
                <Badge className={`${statusInfo.color} border-0 capitalize text-lg px-4 py-2`}>
                  {statusInfo.status}
                </Badge>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{election.name}</h1>
                <p className="text-blue-100 text-lg">{election.description}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Voting Period</p>
                    <p className="font-medium">
                      {election.startDate.toLocaleDateString()} - {election.endDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Vote className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Your Voting Power</p>
                    <p className="font-medium">{userVotingPower?.totalVotes || election.votesPerVoter} votes</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Candidates</p>
                    <p className="font-medium">{election.candidates.length} running</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Voter Turnout</p>
                    <p className="font-medium">{election.voterTurnout}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voting Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vote Allocation Status */}
            {userVotingPower && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Vote className="h-5 w-5" />
                    <span>Your Voting Power</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Votes Used</span>
                      <span className="font-medium">
                        {totalAllocated} / {userVotingPower.totalVotes}
                      </span>
                    </div>
                    <Progress value={(totalAllocated / userVotingPower.totalVotes) * 100} className="h-3" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Remaining Votes</span>
                      <span className={`font-medium ${remainingVotes < 0 ? "text-red-600" : "text-green-600"}`}>
                        {remainingVotes}
                      </span>
                    </div>
                    {remainingVotes < 0 && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>You have allocated more votes than available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Candidates List */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Candidates</CardTitle>
                <CardDescription>
                  {hasVoted ? "Your vote allocation" : "Allocate your votes among the candidates"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {election.candidates.map((candidate, index) => (
                    <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                          <Image
                            src={candidate.profileImage || "/placeholder.svg"}
                            alt={candidate.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{candidate.name}</h3>
                              <p className="text-sm" style={{ color: candidate.partyColor }}>
                                {candidate.party}
                              </p>
                              <p className="text-sm text-gray-600 italic">"{candidate.slogan}"</p>
                            </div>
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                            </Link>
                          </div>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{candidate.biography}</p>

                          {/* Vote Allocation Input */}
                          {statusInfo.status === "active" && !hasVoted && (
                            <div className="flex items-center space-x-4">
                              <Label htmlFor={`votes-${candidate.id}`} className="text-sm font-medium">
                                Allocate votes:
                              </Label>
                              <Input
                                id={`votes-${candidate.id}`}
                                type="number"
                                min="0"
                                max={userVotingPower?.totalVotes || election.votesPerVoter}
                                value={voteAllocations[candidate.id] || 0}
                                onChange={(e) => handleVoteChange(candidate.id, e.target.value)}
                                className="w-24"
                              />
                              <span className="text-sm text-gray-500">votes</span>
                            </div>
                          )}

                          {/* Show allocated votes if already voted */}
                          {hasVoted && voteAllocations[candidate.id] > 0 && (
                            <div className="flex items-center space-x-2 text-green-600">
                              <Check className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {voteAllocations[candidate.id]} votes allocated
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Votes Button */}
                {statusInfo.status === "active" && !hasVoted && userVotingPower && (
                  <div className="mt-6 pt-6 border-t">
                    <Button
                      onClick={handleSubmitVotes}
                      disabled={isVoting || totalAllocated === 0 || remainingVotes < 0}
                      className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-lg py-3"
                    >
                      {isVoting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Casting Your Votes...
                        </>
                      ) : (
                        <>
                          <Vote className="h-5 w-5 mr-2" />
                          Cast {totalAllocated} Votes
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {hasVoted && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Your votes have been cast successfully!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vote Distribution Chart */}
            {chartData.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Your Vote Distribution</CardTitle>
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
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {chartData.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="flex-1">{entry.name}</span>
                        <span className="font-medium">{entry.votes} votes</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Election Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Election Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Votes Cast</p>
                  <p className="text-2xl font-bold text-blue-600">{election.totalVotesCast.toLocaleString()}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-600">Voter Turnout</p>
                  <p className="text-2xl font-bold text-green-600">{election.voterTurnout}%</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-600">Candidates Running</p>
                  <p className="text-2xl font-bold text-purple-600">{election.candidates.length}</p>
                </div>
                <Separator />
                <Link href={`/elections/${election.id}/results`} className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Live Results
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
