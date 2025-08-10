"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Poll {
  id: string
  title: string
  description: string
  options: string[]
  votes: number[]
  createdBy: string
  createdAt: Date
  endDate: Date
  isActive: boolean
  category: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "candidate"
  joinDate: Date
  isActive: boolean
}

interface PollContextType {
  polls: Poll[]
  users: User[]
  createPoll: (poll: Omit<Poll, "id" | "votes" | "createdAt">) => void
  vote: (pollId: string, optionIndex: number) => void
  updatePoll: (pollId: string, updates: Partial<Poll>) => void
  deletePoll: (pollId: string) => void
  createUser: (user: Omit<User, "id" | "joinDate">) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  deleteUser: (userId: string) => void
}

const PollContext = createContext<PollContextType | undefined>(undefined)

// Mock data
const initialPolls: Poll[] = [
  {
    id: "1",
    title: "Best Programming Language for 2024",
    description: "Vote for the programming language you think will dominate in 2024",
    options: ["JavaScript", "Python", "TypeScript", "Go", "Rust"],
    votes: [45, 67, 23, 12, 18],
    createdBy: "admin",
    createdAt: new Date("2024-01-15"),
    endDate: new Date("2024-12-31"),
    isActive: true,
    category: "Technology",
  },
  {
    id: "2",
    title: "Favorite Food Cuisine",
    description: "What is your favorite type of cuisine?",
    options: ["Italian", "Chinese", "Mexican", "Indian", "Japanese"],
    votes: [34, 28, 41, 19, 33],
    createdBy: "user",
    createdAt: new Date("2024-01-10"),
    endDate: new Date("2024-06-30"),
    isActive: true,
    category: "Food",
  },
  {
    id: "3",
    title: "Remote Work Preference",
    description: "How do you prefer to work?",
    options: ["Fully Remote", "Hybrid", "Office Only", "Flexible"],
    votes: [89, 156, 23, 67],
    createdBy: "admin",
    createdAt: new Date("2024-01-05"),
    endDate: new Date("2024-03-31"),
    isActive: false,
    category: "Work",
  },
]

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    joinDate: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "candidate",
    joinDate: new Date("2024-01-10"),
    isActive: true,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@smartvote.com",
    role: "admin",
    joinDate: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    joinDate: new Date("2024-01-20"),
    isActive: true,
  },
  {
    id: "5",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "candidate",
    joinDate: new Date("2024-01-25"),
    isActive: false,
  },
]

export function PollProvider({ children }: { children: ReactNode }) {
  const [polls, setPolls] = useState<Poll[]>(initialPolls)
  const [users, setUsers] = useState<User[]>(initialUsers)

  const createPoll = (pollData: Omit<Poll, "id" | "votes" | "createdAt">) => {
    const newPoll: Poll = {
      ...pollData,
      id: Date.now().toString(),
      votes: new Array(pollData.options.length).fill(0),
      createdAt: new Date(),
    }
    setPolls((prev) => [newPoll, ...prev])
  }

  const vote = (pollId: string, optionIndex: number) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          const newVotes = [...poll.votes]
          newVotes[optionIndex] += 1
          return { ...poll, votes: newVotes }
        }
        return poll
      }),
    )
  }

  const updatePoll = (pollId: string, updates: Partial<Poll>) => {
    setPolls((prev) => prev.map((poll) => (poll.id === pollId ? { ...poll, ...updates } : poll)))
  }

  const deletePoll = (pollId: string) => {
    setPolls((prev) => prev.filter((poll) => poll.id !== pollId))
  }

  const createUser = (userData: Omit<User, "id" | "joinDate">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date(),
    }
    setUsers((prev) => [newUser, ...prev])
  }

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, ...updates } : user)))
  }

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  return (
    <PollContext.Provider
      value={{ polls, users, createPoll, vote, updatePoll, deletePoll, createUser, updateUser, deleteUser }}
    >
      {children}
    </PollContext.Provider>
  )
}

export function usePolls() {
  const context = useContext(PollContext)
  if (context === undefined) {
    throw new Error("usePolls must be used within a PollProvider")
  }
  return context
}
