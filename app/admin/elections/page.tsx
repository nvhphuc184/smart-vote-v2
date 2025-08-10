"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Eye, Users, Vote, TrendingUp, BarChart3, Download, Settings } from "lucide-react"
import { usePolitical } from "@/contexts/political-context"
import Navigation from "@/components/navigation"
import { toast } from "sonner"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function AdminElectionsPage() {
  const { elections, candidates, createElection, updateElection, deleteElection } = usePolitical()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedElection, setSelectedElection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Form state for creating/editing elections
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    votesPerVoter: 100,
    selectedCandidates: [] as string[],
    isActive: true,
  })

  const handleCreateElection = () => {
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    const selectedCandidateObjects = candidates.filter((c) => formData.selectedCandidates.includes(c.id))

    createElection({
      name: formData.name,
      description: formData.description,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      votesPerVoter: formData.votesPerVoter,
      candidates: selectedCandidateObjects,
      isActive: formData.isActive,
    })

    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      votesPerVoter: 100,
      selectedCandidates: [],
      isActive: true,
    })

    setIsCreateDialogOpen(false)
    toast.success("Election created successfully!")
  }

  const handleDeleteElection = (id: string) => {
    if (confirm("Are you sure you want to delete this election?")) {
      deleteElection(id)
      toast.success("Election deleted successfully!")
    }
  }

  const handleToggleElection = (id: string, isActive: boolean) => {
    updateElection(id, { isActive: !isActive })
    toast.success(`Election ${!isActive ? "activated" : "deactivated"} successfully!`)
  }

  const handleExportResults = (electionId: string) => {
    // Mock export functionality
    toast.success("Election results exported successfully!")
  }

  const getElectionStatus = (election: any) => {
    const now = new Date()
    if (now < election.startDate) return { status: "upcoming", color: "bg-blue-100 text-blue-800" }
    if (now > election.endDate) return { status: "completed", color: "bg-gray-100 text-gray-800" }
    return { status: "active", color: "bg-green-100 text-green-800" }
  }

  // Analytics data
  const totalVotes = elections.reduce((sum, election) => sum + election.totalVotesCast, 0)
  const averageTurnout = elections.reduce((sum, election) => sum + election.voterTurnout, 0) / elections.length || 0

  const electionData = elections.map((election) => ({
    name: election.name.substring(0, 15) + "...",
    votes: election.totalVotesCast,
    turnout: election.voterTurnout,
  }))

  const statusData = [
    {
      name: "Active",
      value: elections.filter((e) => getElectionStatus(e).status === "active").length,
      color: "#10B981",
    },
    {
      name: "Upcoming",
      value: elections.filter((e) => getElectionStatus(e).status === "upcoming").length,
      color: "#3B82F6",
    },
    {
      name: "Completed",
      value: elections.filter((e) => getElectionStatus(e).status === "completed").length,
      color: "#6B7280",
    },
  ]

  const trendData = [
    { month: "Jan", elections: 2, votes: 15000 },
    { month: "Feb", elections: 1, votes: 8000 },
    { month: "Mar", elections: 3, votes: 25000 },
    { month: "Apr", elections: 2, votes: 18000 },
    { month: "May", elections: 4, votes: 35000 },
    { month: "Jun", elections: 2, votes: 22000 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">Election Management</h1>
                <p className="text-purple-100 text-lg">Create, manage, and monitor elections</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Election
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Election</DialogTitle>
                    <DialogDescription>Set up a new election with candidates and voting parameters</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Election Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., 2024 Presidential Election"
                        />
                      </div>
                      <div>
                        <Label htmlFor="votesPerVoter">Votes Per Voter</Label>
                        <Input
                          id="votesPerVoter"
                          type="number"
                          value={formData.votesPerVoter}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, votesPerVoter: Number.parseInt(e.target.value) }))
                          }
                          min="1"
                          max="1000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the election purpose and scope"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          value={formData.startDate}
                          onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="datetime-local"
                          value={formData.endDate}
                          onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Select Candidates</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                        {candidates.map((candidate) => (
                          <label
                            key={candidate.id}
                            className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={formData.selectedCandidates.includes(candidate.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    selectedCandidates: [...prev.selectedCandidates, candidate.id],
                                  }))
                                } else {
                                  setFormData((prev) => ({
                                    ...prev,
                                    selectedCandidates: prev.selectedCandidates.filter((id) => id !== candidate.id),
                                  }))
                                }
                              }}
                            />
                            <span className="flex-1">{candidate.name}</span>
                            <span className="text-sm" style={{ color: candidate.partyColor }}>
                              {candidate.party}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateElection}>Create Election</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="elections" className="flex items-center space-x-2">
              <Vote className="h-4 w-4" />
              <span>Elections</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Elections</p>
                      <p className="text-2xl font-bold">{elections.length}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                      <Vote className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Votes</p>
                      <p className="text-2xl font-bold">{totalVotes.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Turnout</p>
                      <p className="text-2xl font-bold">{averageTurnout.toFixed(1)}%</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Elections</p>
                      <p className="text-2xl font-bold">
                        {elections.filter((e) => getElectionStatus(e).status === "active").length}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Election Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Voting Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="votes" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Elections Tab */}
          <TabsContent value="elections">
            <div className="space-y-6">
              {elections.map((election) => {
                const statusInfo = getElectionStatus(election)

                return (
                  <Card key={election.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold">{election.name}</h3>
                            <Badge className={`${statusInfo.color} border-0 capitalize`}>{statusInfo.status}</Badge>
                            {!election.isActive && (
                              <Badge variant="outline" className="border-red-200 text-red-600">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{election.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Start Date</p>
                              <p className="font-medium">{election.startDate.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">End Date</p>
                              <p className="font-medium">{election.endDate.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Candidates</p>
                              <p className="font-medium">{election.candidates.length}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Votes</p>
                              <p className="font-medium">{election.totalVotesCast.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Turnout</p>
                              <p className="font-medium">{election.voterTurnout}%</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/elections/${election.id}`, "_blank")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleElection(election.id, election.isActive)}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExportResults(election.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteElection(election.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Election Performance</CardTitle>
                  <CardDescription>Vote counts and turnout by election</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={electionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="votes" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Mock geographic voting data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: "North District", votes: 8500, percentage: 35 },
                        { region: "South District", votes: 6200, percentage: 28 },
                        { region: "East District", votes: 4800, percentage: 22 },
                        { region: "West District", votes: 3200, percentage: 15 },
                      ].map((region, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{region.region}</span>
                              <span className="text-sm text-gray-600">{region.votes.toLocaleString()} votes</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${region.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                    <CardDescription>Download election data and reports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => toast.success("CSV report exported!")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export All Elections (CSV)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => toast.success("PDF report generated!")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Generate Analytics Report (PDF)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => toast.success("Voter data exported!")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Voter Data (JSON)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
