"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Calendar,
  Award,
  FileText,
  Play,
  ImageIcon,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react"
import { usePolitical } from "@/contexts/political-context"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

export default function CandidateProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const { candidates, followCandidate } = usePolitical()
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const candidate = candidates.find((c) => c.id === id)

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-600">Candidate not found</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleFollow = () => {
    followCandidate(candidate.id)
    setIsFollowing(true)
    toast.success(`You are now following ${candidate.name}!`)
  }

  const handleContact = () => {
    toast.success("Contact form opened! (Demo functionality)")
  }

  const handleShare = () => {
    toast.success("Profile shared! (Demo functionality)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={candidate.bannerImage || "/placeholder.svg"}
          alt={`${candidate.name} campaign banner`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/elections">
            <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="bg-white/90 backdrop-blur-sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleContact} className="bg-white/90 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>

        {/* Candidate Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end space-x-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={candidate.profileImage || "/placeholder.svg"}
                alt={candidate.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-2">{candidate.name}</h1>
              <p className="text-xl mb-2" style={{ color: candidate.partyColor }}>
                {candidate.party}
              </p>
              <p className="text-lg italic opacity-90">"{candidate.slogan}"</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{candidate.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{candidate.totalVotes.toLocaleString()} votes</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={handleFollow}
                disabled={isFollowing}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
              >
                <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" onClick={handleContact} className="bg-white/90 backdrop-blur-sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-2">
              <ImageIcon className="h-4 w-4" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger value="supporters" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Supporters</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Updates</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Biography */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Biography</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{candidate.biography}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Political Program */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Political Program & Policies</CardTitle>
                      <CardDescription>Key policy positions and campaign promises</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {candidate.policies.map((policy, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: candidate.partyColor }}
                            />
                            <span className="text-gray-700">{policy}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Achievements */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Key Achievements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {candidate.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <Award className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Campaign Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Followers</span>
                        <span className="font-bold text-blue-600">{candidate.followers.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Votes</span>
                        <span className="font-bold text-green-600">{candidate.totalVotes.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Endorsements</span>
                        <span className="font-bold text-purple-600">{candidate.endorsements.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact Information */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Contact Campaign</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleContact}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleContact}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Campaign
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleContact}>
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleContact}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Find Events
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Call to Action */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="border-0 shadow-lg" style={{ borderTop: `4px solid ${candidate.partyColor}` }}>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-bold mb-2">Support {candidate.name}</h3>
                      <p className="text-gray-600 mb-4">Join the campaign and make your voice heard</p>
                      <Link href="/elections">
                        <Button className="w-full mb-2" style={{ backgroundColor: candidate.partyColor }}>
                          Vote Now
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full bg-transparent" onClick={handleContact}>
                        Volunteer
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <div className="space-y-6">
              {/* Campaign Images */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>Campaign Gallery</span>
                    </CardTitle>
                    <CardDescription>Photos from campaign events and rallies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {candidate.mediaGallery.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Campaign image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Campaign Videos */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Campaign Videos</span>
                    </CardTitle>
                    <CardDescription>Speeches, interviews, and campaign messages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {candidate.mediaGallery.videos.map((video, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                        >
                          <Image
                            src={video || "/placeholder.svg"}
                            alt={`Campaign video ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="h-8 w-8 text-gray-800 ml-1" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Supporters Tab */}
          <TabsContent value="supporters">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Endorsements & Supporters</span>
                  </CardTitle>
                  <CardDescription>Key endorsements from community leaders and organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.endorsements.map((endorsement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-4 pl-6 py-4"
                        style={{ borderColor: candidate.partyColor }}
                      >
                        <blockquote className="text-lg italic text-gray-700 mb-3">"{endorsement.quote}"</blockquote>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{endorsement.name}</p>
                            <p className="text-sm text-gray-600">{endorsement.title}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Updates Tab */}
          <TabsContent value="updates">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Campaign Updates</span>
                  </CardTitle>
                  <CardDescription>Latest news and announcements from the campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.updates.map((update, index) => (
                      <motion.div
                        key={update.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className="capitalize"
                              style={{ borderColor: candidate.partyColor, color: candidate.partyColor }}
                            >
                              {update.type}
                            </Badge>
                            <span className="text-sm text-gray-500">{update.date.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                        <p className="text-gray-700">{update.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
