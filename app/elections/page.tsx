"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Vote, Calendar, Users, TrendingUp, Search, Filter } from "lucide-react"
import { usePolitical } from "@/contexts/political-context"
import { useAuth } from "@/contexts/auth-context"
import Navigation from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"

export default function ElectionsPage() {
  const { elections } = usePolitical()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getElectionStatus = (election: any) => {
    const now = new Date()
    if (now < election.startDate) return { status: "upcoming", color: "bg-blue-100 text-blue-800" }
    if (now > election.endDate) return { status: "completed", color: "bg-gray-100 text-gray-800" }
    return { status: "active", color: "bg-green-100 text-green-800" }
  }

  const filteredElections = elections.filter((election) => {
    const matchesSearch =
      election.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      election.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch

    const status = getElectionStatus(election).status
    return matchesSearch && status === statusFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 via-blue-600 to-red-600 rounded-2xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Elections</h1>
            <p className="text-blue-100 text-lg">Participate in democratic elections and make your voice heard</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search elections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Elections</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Elections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredElections.map((election) => {
            const statusInfo = getElectionStatus(election)

            return (
              <Card
                key={election.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Election Header */}
                <div className="h-32 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${statusInfo.color} border-0 capitalize`}>{statusInfo.status}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{election.name}</h2>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">{election.description}</p>

                  {/* Election Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <Calendar className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Start Date</p>
                      <p className="font-semibold text-sm">{election.startDate.toLocaleDateString()}</p>
                    </div>
                    <div className="text-center">
                      <Vote className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Voting Power</p>
                      <p className="font-semibold text-sm">{election.votesPerVoter} votes</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Candidates</p>
                      <p className="font-semibold text-sm">{election.candidates.length}</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Turnout</p>
                      <p className="font-semibold text-sm">{election.voterTurnout}%</p>
                    </div>
                  </div>

                  {/* Candidates Preview */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Candidates</h3>
                    <div className="flex -space-x-2 overflow-hidden">
                      {election.candidates.slice(0, 4).map((candidate) => (
                        <div
                          key={candidate.id}
                          className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                        >
                          <Image
                            src={candidate.profileImage || "/placeholder.svg"}
                            alt={candidate.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {election.candidates.length > 4 && (
                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">+{election.candidates.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link href={`/elections/${election.id}`} className="flex-1">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                        disabled={statusInfo.status === "completed"}
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        {statusInfo.status === "active"
                          ? "Vote Now"
                          : statusInfo.status === "upcoming"
                            ? "View Details"
                            : "View Results"}
                      </Button>
                    </Link>
                    <Link href={`/elections/${election.id}/results`}>
                      <Button variant="outline" className="bg-transparent">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredElections.length === 0 && (
          <div className="text-center py-12">
            <Vote className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No elections found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
