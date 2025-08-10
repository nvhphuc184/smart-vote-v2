"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Vote,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Lock,
  Eye,
  Zap,
  Globe,
  Award,
  Smartphone,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LearnMoreModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Vote className="h-12 w-12 mr-3 text-blue-600" />
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
                Smart Vote Platform
              </DialogTitle>
            </div>
            <DialogDescription className="text-lg">
              Discover how Smart Vote is revolutionizing democratic participation through secure, transparent digital
              voting
            </DialogDescription>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Features</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Demo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Vote className="h-5 w-5" />
                      <span>What is Smart Vote?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Smart Vote is a comprehensive digital voting platform designed to modernize democratic
                      participation. Our system combines cutting-edge security technology with user-friendly interfaces
                      to create a transparent, accessible, and trustworthy voting experience.
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Secure blockchain-based voting</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Real-time result tracking</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Proportional vote allocation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Comprehensive candidate profiles</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Platform Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-4">
                      <Image
                        src="/placeholder.svg?height=300&width=500&text=Smart+Vote+Dashboard"
                        alt="Smart Vote Platform Preview"
                        width={500}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Supported Elections:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline" className="justify-center">
                          Presidential
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          Local
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          Community
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          Corporate
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Statistics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Active Users", value: "50K+", icon: Users },
                    { label: "Elections Held", value: "1,200+", icon: Vote },
                    { label: "Votes Cast", value: "2.5M+", icon: CheckCircle },
                    { label: "Countries", value: "25+", icon: Globe },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <stat.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Advanced Security",
                  description:
                    "End-to-end encryption, blockchain verification, and multi-factor authentication ensure your vote is protected.",
                  features: ["256-bit encryption", "Blockchain ledger", "Biometric verification", "Audit trails"],
                  image: "/placeholder.svg?height=200&width=300&text=Security+Features",
                },
                {
                  icon: Users,
                  title: "Democratic Features",
                  description:
                    "Proportional voting, candidate comparison tools, and transparent result tracking enhance democratic participation.",
                  features: ["Vote allocation", "Candidate profiles", "Policy comparison", "Real-time results"],
                  image: "/placeholder.svg?height=200&width=300&text=Democratic+Tools",
                },
                {
                  icon: BarChart3,
                  title: "Analytics & Insights",
                  description:
                    "Comprehensive analytics provide insights into voting patterns, turnout, and demographic trends.",
                  features: ["Live dashboards", "Turnout tracking", "Geographic analysis", "Trend reports"],
                  image: "/placeholder.svg?height=200&width=300&text=Analytics+Dashboard",
                },
                {
                  icon: Smartphone,
                  title: "Accessibility",
                  description:
                    "Mobile-responsive design and accessibility features ensure everyone can participate in democracy.",
                  features: ["Mobile optimized", "Screen reader support", "Multiple languages", "Offline capability"],
                  image: "/placeholder.svg?height=200&width=300&text=Mobile+Interface",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden shadow-md mb-4">
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Security Architecture</span>
                </CardTitle>
                <CardDescription>
                  Multi-layered security approach ensuring election integrity and voter privacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Encryption</h4>
                    <p className="text-sm text-gray-600">
                      Military-grade AES-256 encryption protects all data transmission and storage
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Transparency</h4>
                    <p className="text-sm text-gray-600">
                      Blockchain-based ledger provides immutable audit trail for all voting activities
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Verification</h4>
                    <p className="text-sm text-gray-600">
                      Multi-factor authentication and biometric verification ensure voter identity
                    </p>
                  </div>
                </div>

                <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=500&text=Security+Architecture"
                    alt="Security Architecture Diagram"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Security Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "ISO 27001", desc: "Information Security" },
                    { name: "SOC 2 Type II", desc: "Security Controls" },
                    { name: "GDPR Compliant", desc: "Data Protection" },
                    { name: "EAC Certified", desc: "Election Standards" },
                  ].map((cert, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h5 className="font-semibold text-sm">{cert.name}</h5>
                      <p className="text-xs text-gray-600">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Try Smart Vote</span>
                </CardTitle>
                <CardDescription>Experience the platform with our interactive demo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Voter Experience</h4>
                      <p className="text-sm text-gray-600 mb-4">Experience voting from a citizen's perspective</p>
                      <Badge className="bg-blue-100 text-blue-800">User Role</Badge>
                    </div>
                    <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <Vote className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Candidate Portal</h4>
                      <p className="text-sm text-gray-600 mb-4">See how candidates manage their campaigns</p>
                      <Badge className="bg-green-100 text-green-800">Candidate Role</Badge>
                    </div>
                    <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Admin Dashboard</h4>
                      <p className="text-sm text-gray-600 mb-4">Explore election management tools</p>
                      <Badge className="bg-purple-100 text-purple-800">Admin Role</Badge>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Demo Features Include:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Live election participation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Candidate profile exploration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Real-time result tracking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Administrative controls</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-6">
                      <Image
                        src="/placeholder.svg?height=300&width=500&text=Interactive+Demo+Preview"
                        alt="Interactive Demo Preview"
                        width={500}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Link href="/auth">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                      >
                        Start Demo Experience
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
