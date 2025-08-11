"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Candidate {
  id: string
  name: string
  party: string
  partyColor: string
  slogan: string
  biography: string
  profileImage: string
  bannerImage: string
  policies: string[]
  achievements: string[]
  followers: number
  totalVotes: number
  mediaGallery: {
    images: string[]
    videos: string[]
  }
  endorsements: Array<{
    name: string
    title: string
    quote: string
  }>
  updates: Array<{
    id: string
    type: "announcement" | "event" | "policy" | "news"
    title: string
    content: string
    date: Date
  }>
}

export interface Election {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  votesPerVoter: number
  candidates: Candidate[]
  totalVotesCast: number
  voterTurnout: number
  isActive: boolean
}

export interface UserVoteAllocation {
  candidateId: string
  votes: number
}

export interface UserVotingPower {
  userId: string
  electionId: string
  totalVotes: number
  usedVotes: number
  allocations: UserVoteAllocation[]
}

interface PoliticalContextType {
  elections: Election[]
  candidates: Candidate[]
  userVotingPowers: UserVotingPower[]
  createElection: (election: Omit<Election, "id" | "totalVotesCast" | "voterTurnout">) => void
  updateElection: (id: string, updates: Partial<Election>) => void
  deleteElection: (id: string) => void
  getUserVotingPower: (userId: string, electionId: string) => UserVotingPower | null
  allocateVotes: (userId: string, electionId: string, allocations: UserVoteAllocation[]) => void
  followCandidate: (candidateId: string) => void
}

const PoliticalContext = createContext<PoliticalContextType | undefined>(undefined)

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    party: "Progressive Party",
    partyColor: "#3B82F6",
    slogan: "Building Tomorrow Together",
    biography:
      "Sarah Johnson is a dedicated public servant with over 15 years of experience in community organizing and policy development. She holds a Master's degree in Public Administration from State University and has worked tirelessly to improve education, healthcare, and economic opportunities in our district. As a former school board member and city council representative, Sarah has a proven track record of bringing people together to solve complex problems.",
    profileImage: "/avt1.svg?height=200&width=200&text=Sarah+Johnson",
    bannerImage: "/avt1.svg?height=400&width=800&text=Sarah+Johnson+Campaign",
    policies: [
      "Increase funding for public education by 25% over the next four years",
      "Implement universal healthcare coverage for all residents",
      "Create 10,000 new green jobs through renewable energy initiatives",
      "Establish affordable housing trust fund with $500M investment",
      "Expand public transportation network to reduce traffic congestion",
    ],
    achievements: [
      "Led successful campaign to increase teacher salaries by 15%",
      "Secured $50M in federal funding for infrastructure improvements",
      "Authored legislation protecting workers' rights to organize",
      "Established first community health center in underserved area",
      "Reduced city budget deficit by 30% through efficient management",
    ],
    followers: 45230,
    totalVotes: 12450,
    mediaGallery: {
      images: [
        "/placeholder.svg?height=300&width=400&text=Campaign+Rally",
        "/placeholder.svg?height=300&width=400&text=Community+Event",
        "/placeholder.svg?height=300&width=400&text=Policy+Discussion",
        "/placeholder.svg?height=300&width=400&text=Town+Hall",
        "/placeholder.svg?height=300&width=400&text=Volunteer+Event",
        "/placeholder.svg?height=300&width=400&text=Endorsement+Event",
      ],
      videos: [
        "/placeholder.svg?height=300&width=400&text=Campaign+Video+1",
        "/placeholder.svg?height=300&width=400&text=Policy+Speech",
        "/placeholder.svg?height=300&width=400&text=Debate+Highlights",
        "/placeholder.svg?height=300&width=400&text=Community+Address",
      ],
    },
    endorsements: [
      {
        name: "Dr. Michael Chen",
        title: "President, Teachers Union",
        quote:
          "Sarah Johnson has consistently fought for education funding and teacher rights. She understands the challenges facing our schools and has concrete plans to address them.",
      },
      {
        name: "Maria Rodriguez",
        title: "Executive Director, Community Health Alliance",
        quote:
          "Sarah's commitment to healthcare access is unwavering. Her leadership on the community health center project saved countless lives in our neighborhood.",
      },
      {
        name: "James Thompson",
        title: "Small Business Owner",
        quote:
          "As a local entrepreneur, I appreciate Sarah's balanced approach to economic development. She supports business growth while protecting workers and the environment.",
      },
    ],
    updates: [
      {
        id: "1",
        type: "announcement",
        title: "New Healthcare Initiative Announced",
        content:
          "Today I'm proud to announce our comprehensive healthcare plan that will provide coverage for all residents while reducing costs for families and small businesses.",
        date: new Date("2024-01-15"),
      },
      {
        id: "2",
        type: "event",
        title: "Town Hall Meeting This Saturday",
        content:
          "Join me this Saturday at 2 PM at the Community Center for a town hall discussion about our education priorities. Your voice matters in shaping our future.",
        date: new Date("2024-01-12"),
      },
      {
        id: "3",
        type: "policy",
        title: "Green Jobs Initiative Details Released",
        content:
          "Our green jobs program will create 10,000 new positions in renewable energy, sustainable agriculture, and environmental restoration over the next four years.",
        date: new Date("2024-01-10"),
      },
    ],
  },
  {
    id: "2",
    name: "Robert Martinez",
    party: "Conservative Alliance",
    partyColor: "#DC2626",
    slogan: "Strength Through Unity",
    biography:
      "Robert Martinez brings 20 years of business leadership and military service to public office. A decorated veteran and successful entrepreneur, Robert understands the importance of fiscal responsibility, strong defense, and limited government. He has built three successful companies, creating over 500 jobs in our community, and served two tours of duty overseas defending our freedoms.",
    profileImage: "/avt2.svg?height=200&width=200&text=Robert+Martinez",
    bannerImage: "/avt2.svg?height=400&width=800&text=Robert+Martinez+Campaign",
    policies: [
      "Reduce government spending by 15% through efficiency improvements",
      "Strengthen border security and immigration enforcement",
      "Cut taxes for middle-class families and small businesses",
      "Increase defense spending to ensure national security",
      "Promote school choice and educational freedom for parents",
    ],
    achievements: [
      "Founded three successful businesses employing 500+ people",
      "Served with distinction in two overseas military deployments",
      "Led volunteer disaster relief efforts after Hurricane Maria",
      "Established scholarship fund for military families",
      "Reduced crime rates by 25% as community safety coordinator",
    ],
    followers: 38750,
    totalVotes: 10230,
    mediaGallery: {
      images: [
        "/placeholder.svg?height=300&width=400&text=Business+Forum",
        "/placeholder.svg?height=300&width=400&text=Veterans+Event",
        "/placeholder.svg?height=300&width=400&text=Tax+Reform+Rally",
        "/placeholder.svg?height=300&width=400&text=Security+Briefing",
        "/placeholder.svg?height=300&width=400&text=Family+Values+Event",
        "/placeholder.svg?height=300&width=400&text=Economic+Summit",
      ],
      videos: [
        "/placeholder.svg?height=300&width=400&text=Economic+Plan+Video",
        "/placeholder.svg?height=300&width=400&text=Security+Address",
        "/placeholder.svg?height=300&width=400&text=Business+Roundtable",
        "/placeholder.svg?height=300&width=400&text=Veterans+Speech",
      ],
    },
    endorsements: [
      {
        name: "General Patricia Williams (Ret.)",
        title: "Former Joint Chiefs of Staff",
        quote:
          "Robert Martinez exemplifies the leadership and integrity we need in government. His military service and business acumen make him uniquely qualified for this role.",
      },
      {
        name: "David Kim",
        title: "Chamber of Commerce President",
        quote:
          "Robert understands what it takes to create jobs and grow the economy. His pro-business policies will bring prosperity to our community.",
      },
      {
        name: "Susan Anderson",
        title: "Parents for Educational Choice",
        quote:
          "Robert Martinez is a champion for parental rights in education. He will give families the freedom to choose the best schools for their children.",
      },
    ],
    updates: [
      {
        id: "4",
        type: "policy",
        title: "Tax Relief Plan Unveiled",
        content:
          "My comprehensive tax relief plan will put money back in the pockets of working families while encouraging business investment and job creation.",
        date: new Date("2024-01-14"),
      },
      {
        id: "5",
        type: "event",
        title: "Veterans Appreciation Breakfast",
        content:
          "Join me tomorrow morning at 8 AM for our monthly Veterans Appreciation Breakfast. We honor those who served and discuss issues important to our military families.",
        date: new Date("2024-01-11"),
      },
      {
        id: "6",
        type: "announcement",
        title: "Endorsement from Business Leaders",
        content:
          "I'm honored to receive the endorsement of over 200 local business leaders who recognize the importance of pro-growth economic policies.",
        date: new Date("2024-01-09"),
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Amanda Foster",
    party: "Independent Coalition",
    partyColor: "#059669",
    slogan: "Science-Based Solutions",
    biography:
      "Dr. Amanda Foster is a renowned environmental scientist and policy expert with a Ph.D. in Environmental Engineering from MIT. She has spent her career developing innovative solutions to climate change and environmental challenges. As an independent candidate, Dr. Foster brings a data-driven approach to governance, focusing on evidence-based policies that benefit all citizens regardless of party affiliation.",
    profileImage: "/avt3.svg?height=200&width=200&text=Dr.+Amanda+Foster",
    bannerImage: "/avt3.svg?height=400&width=800&text=Dr.+Foster+Campaign",
    policies: [
      "Implement carbon-neutral energy grid by 2030",
      "Invest $1B in climate resilience infrastructure",
      "Create bipartisan commission for evidence-based policymaking",
      "Establish universal basic research funding for innovation",
      "Reform campaign finance to reduce special interest influence",
    ],
    achievements: [
      "Published 50+ peer-reviewed papers on climate solutions",
      "Led international climate research consortium",
      "Developed award-winning water purification technology",
      "Advised three governors on environmental policy",
      "Founded non-profit organization for science education",
    ],
    followers: 29180,
    totalVotes: 8750,
    mediaGallery: {
      images: [
        "/placeholder.svg?height=300&width=400&text=Climate+Summit",
        "/placeholder.svg?height=300&width=400&text=Research+Lab",
        "/placeholder.svg?height=300&width=400&text=Environmental+Forum",
        "/placeholder.svg?height=300&width=400&text=Innovation+Conference",
        "/placeholder.svg?height=300&width=400&text=Science+Fair",
        "/placeholder.svg?height=300&width=400&text=Policy+Workshop",
      ],
      videos: [
        "/placeholder.svg?height=300&width=400&text=Climate+Plan+Video",
        "/placeholder.svg?height=300&width=400&text=Innovation+Speech",
        "/placeholder.svg?height=300&width=400&text=Research+Presentation",
        "/placeholder.svg?height=300&width=400&text=Policy+Debate",
      ],
    },
    endorsements: [
      {
        name: "Dr. Robert Chen",
        title: "Nobel Prize Winner, Climate Science",
        quote:
          "Dr. Foster's scientific expertise and commitment to evidence-based policy make her the ideal candidate to address our most pressing challenges.",
      },
      {
        name: "Jennifer Walsh",
        title: "Executive Director, Innovation Alliance",
        quote:
          "Amanda Foster understands that innovation and scientific research are key to our economic future. Her policies will position us as leaders in the global economy.",
      },
      {
        name: "Mark Stevens",
        title: "Former EPA Administrator",
        quote:
          "Dr. Foster's environmental policies are both ambitious and achievable. She has the expertise to implement real solutions to climate change.",
      },
    ],
    updates: [
      {
        id: "7",
        type: "policy",
        title: "Climate Action Plan Released",
        content:
          "Today I released my comprehensive climate action plan, featuring science-based solutions that will create jobs while protecting our environment for future generations.",
        date: new Date("2024-01-13"),
      },
      {
        id: "8",
        type: "event",
        title: "Innovation Forum Next Week",
        content:
          "Join me next Tuesday for an Innovation Forum where we'll discuss how scientific research and technology can drive economic growth and solve societal challenges.",
        date: new Date("2024-01-08"),
      },
      {
        id: "9",
        type: "announcement",
        title: "Bipartisan Support for Research Funding",
        content:
          "I'm pleased to announce bipartisan support for my proposal to increase basic research funding, demonstrating that science transcends political boundaries.",
        date: new Date("2024-01-07"),
      },
    ],
  },
]

const mockElections: Election[] = [
  {
    id: "1",
    name: "2024 Presidential Election",
    description: "Choose the next President of the United States",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-11-30"),
    votesPerVoter: 100,
    candidates: mockCandidates,
    totalVotesCast: 31430,
    voterTurnout: 68,
    isActive: true,
  },
  {
    id: "2",
    name: "State Governor Election",
    description: "Select your state governor for the next four years",
    startDate: new Date("2024-10-15"),
    endDate: new Date("2024-11-15"),
    votesPerVoter: 50,
    candidates: mockCandidates.slice(0, 2),
    totalVotesCast: 15680,
    voterTurnout: 72,
    isActive: true,
  },
]

export function PoliticalProvider({ children }: { children: ReactNode }) {
  const [elections, setElections] = useState<Election[]>(mockElections)
  const [candidates] = useState<Candidate[]>(mockCandidates)
  const [userVotingPowers, setUserVotingPowers] = useState<UserVotingPower[]>([])

  const createElection = (electionData: Omit<Election, "id" | "totalVotesCast" | "voterTurnout">) => {
    const newElection: Election = {
      ...electionData,
      id: Date.now().toString(),
      totalVotesCast: 0,
      voterTurnout: 0,
    }
    setElections((prev) => [...prev, newElection])
  }

  const updateElection = (id: string, updates: Partial<Election>) => {
    setElections((prev) => prev.map((election) => (election.id === id ? { ...election, ...updates } : election)))
  }

  const deleteElection = (id: string) => {
    setElections((prev) => prev.filter((election) => election.id !== id))
  }

  const getUserVotingPower = (userId: string, electionId: string): UserVotingPower | null => {
    const existing = userVotingPowers.find((uvp) => uvp.userId === userId && uvp.electionId === electionId)

    if (existing) return existing

    const election = elections.find((e) => e.id === electionId)
    if (!election) return null

    const newVotingPower: UserVotingPower = {
      userId,
      electionId,
      totalVotes: election.votesPerVoter,
      usedVotes: 0,
      allocations: [],
    }

    setUserVotingPowers((prev) => [...prev, newVotingPower])
    return newVotingPower
  }

  const allocateVotes = (userId: string, electionId: string, allocations: UserVoteAllocation[]) => {
    const totalAllocated = allocations.reduce((sum, allocation) => sum + allocation.votes, 0)

    setUserVotingPowers((prev) =>
      prev.map((uvp) => {
        if (uvp.userId === userId && uvp.electionId === electionId) {
          return {
            ...uvp,
            usedVotes: totalAllocated,
            allocations,
          }
        }
        return uvp
      }),
    )

    // Update election total votes
    setElections((prev) =>
      prev.map((election) => {
        if (election.id === electionId) {
          return {
            ...election,
            totalVotesCast: election.totalVotesCast + totalAllocated,
          }
        }
        return election
      }),
    )
  }

  const followCandidate = (candidateId: string) => {
    // Mock implementation - in real app would update user's followed candidates
    console.log(`Following candidate ${candidateId}`)
  }

  return (
    <PoliticalContext.Provider
      value={{
        elections,
        candidates,
        userVotingPowers,
        createElection,
        updateElection,
        deleteElection,
        getUserVotingPower,
        allocateVotes,
        followCandidate,
      }}
    >
      {children}
    </PoliticalContext.Provider>
  )
}

export function usePolitical() {
  const context = useContext(PoliticalContext)
  if (context === undefined) {
    throw new Error("usePolitical must be used within a PoliticalProvider")
  }
  return context
}
