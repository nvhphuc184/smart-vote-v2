"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Palette, Globe, Save, Moon, Sun, Monitor, Mail, Smartphone, Lock, Eye } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Navigation from "@/components/navigation"
import { toast } from "sonner"

export default function SettingsPage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("en")

  const [profileSettings, setProfileSettings] = useState({
    displayName: user?.name || "",
    email: user?.email || "",
    bio: "Passionate about democratic participation",
    location: "New York, USA",
    website: "https://example.com",
    publicProfile: true,
    showEmail: false,
    showLocation: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    pollReminders: true,
    resultUpdates: true,
    weeklyDigest: false,
    marketingEmails: false,
    soundEnabled: true,
    desktopNotifications: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    voteHistory: "private",
    dataSharing: "essential",
    analyticsOptOut: false,
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30",
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: "medium",
    compactMode: false,
    animations: true,
    highContrast: false,
    colorScheme: "blue",
  })

  const handleSave = async (section: string) => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    toast.success(`${section} settings saved successfully!`)
  }

  const handleReset = (section: string) => {
    toast.success(`${section} settings reset to defaults!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-xl text-gray-600">Customize your Smart Vote experience</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Theme</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your public profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={profileSettings.displayName}
                          onChange={(e) => setProfileSettings({ ...profileSettings, displayName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileSettings.email}
                          onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileSettings.bio}
                        onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                        placeholder="Tell others about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileSettings.location}
                          onChange={(e) => setProfileSettings({ ...profileSettings, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileSettings.website}
                          onChange={(e) => setProfileSettings({ ...profileSettings, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy Controls</h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Public Profile</Label>
                          <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                        </div>
                        <Switch
                          checked={profileSettings.publicProfile}
                          onCheckedChange={(checked) =>
                            setProfileSettings({ ...profileSettings, publicProfile: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Email</Label>
                          <p className="text-sm text-gray-600">Display your email on your public profile</p>
                        </div>
                        <Switch
                          checked={profileSettings.showEmail}
                          onCheckedChange={(checked) => setProfileSettings({ ...profileSettings, showEmail: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Location</Label>
                          <p className="text-sm text-gray-600">Display your location on your public profile</p>
                        </div>
                        <Switch
                          checked={profileSettings.showLocation}
                          onCheckedChange={(checked) =>
                            setProfileSettings({ ...profileSettings, showLocation: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => handleReset("Profile")}>
                        Reset
                      </Button>
                      <Button
                        onClick={() => handleSave("Profile")}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified about activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Notifications
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Poll Reminders</Label>
                            <p className="text-sm text-gray-600">Get reminded about upcoming poll deadlines</p>
                          </div>
                          <Switch
                            checked={notificationSettings.pollReminders}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, pollReminders: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Result Updates</Label>
                            <p className="text-sm text-gray-600">Be notified when poll results are available</p>
                          </div>
                          <Switch
                            checked={notificationSettings.resultUpdates}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, resultUpdates: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Weekly Digest</Label>
                            <p className="text-sm text-gray-600">Receive a weekly summary of activity</p>
                          </div>
                          <Switch
                            checked={notificationSettings.weeklyDigest}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, weeklyDigest: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Smartphone className="h-5 w-5 mr-2" />
                        Push Notifications
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Desktop Notifications</Label>
                            <p className="text-sm text-gray-600">Show notifications on your desktop</p>
                          </div>
                          <Switch
                            checked={notificationSettings.desktopNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, desktopNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Sound Enabled</Label>
                            <p className="text-sm text-gray-600">Play sound with notifications</p>
                          </div>
                          <Switch
                            checked={notificationSettings.soundEnabled}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, soundEnabled: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => handleReset("Notification")}>
                        Reset
                      </Button>
                      <Button
                        onClick={() => handleSave("Notification")}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Control your privacy and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Eye className="h-5 w-5 mr-2" />
                        Visibility Settings
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="space-y-2">
                          <Label>Profile Visibility</Label>
                          <Select
                            value={privacySettings.profileVisibility}
                            onValueChange={(value) =>
                              setPrivacySettings({ ...privacySettings, profileVisibility: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public - Anyone can see</SelectItem>
                              <SelectItem value="users">Users Only - Registered users can see</SelectItem>
                              <SelectItem value="private">Private - Only you can see</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Vote History</Label>
                          <Select
                            value={privacySettings.voteHistory}
                            onValueChange={(value) => setPrivacySettings({ ...privacySettings, voteHistory: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public - Anyone can see</SelectItem>
                              <SelectItem value="private">Private - Only you can see</SelectItem>
                              <SelectItem value="anonymous">Anonymous - Completely hidden</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Lock className="h-5 w-5 mr-2" />
                        Security Settings
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                          </div>
                          <Switch
                            checked={privacySettings.twoFactorAuth}
                            onCheckedChange={(checked) =>
                              setPrivacySettings({ ...privacySettings, twoFactorAuth: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Login Alerts</Label>
                            <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                          </div>
                          <Switch
                            checked={privacySettings.loginAlerts}
                            onCheckedChange={(checked) =>
                              setPrivacySettings({ ...privacySettings, loginAlerts: checked })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Session Timeout</Label>
                          <Select
                            value={privacySettings.sessionTimeout}
                            onValueChange={(value) => setPrivacySettings({ ...privacySettings, sessionTimeout: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="240">4 hours</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Data & Analytics
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="space-y-2">
                          <Label>Data Sharing</Label>
                          <Select
                            value={privacySettings.dataSharing}
                            onValueChange={(value) => setPrivacySettings({ ...privacySettings, dataSharing: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full">Full - Help improve Smart Vote</SelectItem>
                              <SelectItem value="essential">Essential Only - Required functionality</SelectItem>
                              <SelectItem value="none">None - No data sharing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Analytics Opt-out</Label>
                            <p className="text-sm text-gray-600">Opt out of usage analytics and tracking</p>
                          </div>
                          <Switch
                            checked={privacySettings.analyticsOptOut}
                            onCheckedChange={(checked) =>
                              setPrivacySettings({ ...privacySettings, analyticsOptOut: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => handleReset("Privacy")}>
                        Reset
                      </Button>
                      <Button
                        onClick={() => handleSave("Privacy")}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance & Theme</CardTitle>
                    <CardDescription>Customize how Smart Vote looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <Palette className="h-5 w-5 mr-2" />
                        Theme Settings
                      </h3>

                      <div className="space-y-4 pl-7">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <Select
                            value={appearanceSettings.theme}
                            onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, theme: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">
                                <div className="flex items-center">
                                  <Sun className="h-4 w-4 mr-2" />
                                  Light
                                </div>
                              </SelectItem>
                              <SelectItem value="dark">
                                <div className="flex items-center">
                                  <Moon className="h-4 w-4 mr-2" />
                                  Dark
                                </div>
                              </SelectItem>
                              <SelectItem value="system">
                                <div className="flex items-center">
                                  <Monitor className="h-4 w-4 mr-2" />
                                  System
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Color Scheme</Label>
                          <Select
                            value={appearanceSettings.colorScheme}
                            onValueChange={(value) =>
                              setAppearanceSettings({ ...appearanceSettings, colorScheme: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="blue">Blue (Default)</SelectItem>
                              <SelectItem value="purple">Purple</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="orange">Orange</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Font Size</Label>
                          <Select
                            value={appearanceSettings.fontSize}
                            onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, fontSize: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                              <SelectItem value="extra-large">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Interface Options</h3>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Compact Mode</Label>
                            <p className="text-sm text-gray-600">Use a more compact layout to fit more content</p>
                          </div>
                          <Switch
                            checked={appearanceSettings.compactMode}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings({ ...appearanceSettings, compactMode: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Animations</Label>
                            <p className="text-sm text-gray-600">Enable smooth animations and transitions</p>
                          </div>
                          <Switch
                            checked={appearanceSettings.animations}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings({ ...appearanceSettings, animations: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>High Contrast</Label>
                            <p className="text-sm text-gray-600">Increase contrast for better accessibility</p>
                          </div>
                          <Switch
                            checked={appearanceSettings.highContrast}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings({ ...appearanceSettings, highContrast: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => handleReset("Appearance")}>
                        Reset
                      </Button>
                      <Button
                        onClick={() => handleSave("Appearance")}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
