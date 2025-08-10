"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vote, Shield, Users, BarChart3, CheckCircle, Star, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LearnMoreModal from "@/components/learn-more-modal"

export default function HomePage() {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
                Smart Vote
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setIsLearnMoreOpen(true)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Learn More
              </Button>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-sm">
                🗳️ Democracy Made Digital
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
                Smart Vote
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                A secure, transparent, and user-friendly platform for democratic participation. Cast your vote with
                confidence in elections that matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 text-lg"
                  >
                    Start Voting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsLearnMoreOpen(true)}
                  className="border-gray-200 bg-white/50 backdrop-blur-sm px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-red-100 rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Digital+Voting+Platform"
                  alt="Smart Vote Digital Voting Platform"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Vote className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose Smart Vote?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of democratic participation with our comprehensive voting platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Transparent",
                description: "Advanced encryption and blockchain technology ensure your vote is secure and verifiable",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Users,
                title: "Democratic Participation",
                description: "Engage in meaningful elections with proportional voting power and candidate selection",
                color: "from-red-500 to-red-600",
              },
              {
                icon: BarChart3,
                title: "Real-time Results",
                description:
                  "Watch election results unfold in real-time with interactive charts and comprehensive analytics",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Vote,
                title: "Multiple Election Types",
                description: "Support for presidential elections, local polls, and community voting initiatives",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: CheckCircle,
                title: "Verified Candidates",
                description: "Comprehensive candidate profiles with verified information and policy positions",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Star,
                title: "User-Friendly Interface",
                description:
                  "Intuitive design that makes voting accessible to everyone, regardless of technical expertise",
                color: "from-pink-500 to-pink-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to participate in democratic elections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register & Verify",
                description: "Create your account and verify your identity to ensure election integrity",
                image: "/placeholder.svg?height=200&width=300&text=User+Registration",
              },
              {
                step: "02",
                title: "Explore Elections",
                description: "Browse active elections, learn about candidates, and review their policy positions",
                image: "/placeholder.svg?height=200&width=300&text=Browse+Elections",
              },
              {
                step: "03",
                title: "Cast Your Vote",
                description: "Allocate your voting power among candidates and submit your secure ballot",
                image: "/placeholder.svg?height=200&width=300&text=Cast+Vote",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg bg-white">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 via-blue-600 to-red-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Make Your Voice Heard?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of citizens who are already participating in secure, transparent elections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Start Voting Today
                  <Vote className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsLearnMoreOpen(true)}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Smart Vote</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering democratic participation through secure, transparent, and accessible digital voting
                technology.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link href="/elections">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                    Elections
                  </Button>
                </Link>
                <Link href="/candidates">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                    Candidates
                  </Button>
                </Link>
                <Link href="/results">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                    Results
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-0 h-auto justify-start"
                  onClick={() => setIsLearnMoreOpen(true)}
                >
                  Help Center
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-0 h-auto justify-start"
                  onClick={() => setIsLearnMoreOpen(true)}
                >
                  Contact Us
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-0 h-auto justify-start"
                  onClick={() => setIsLearnMoreOpen(true)}
                >
                  Security
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Smart Vote. All rights reserved. Built for democratic participation.</p>
          </div>
        </div>
      </footer>

      {/* Learn More Modal */}
      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />
    </div>
  )
}
