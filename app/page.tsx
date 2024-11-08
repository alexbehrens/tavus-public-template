'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

// Add interfaces
interface ConversationResponse {
  conversation_id: string;
  conversation_name: string;
  status: string;
  conversation_url: string;
  replica_id: string;
  persona_id: string;
  created_at: string;
}

const TAVUS_API_KEY = process.env.TAVUS_API_KEY
const REPLICA_IDS = {
  Alice: 'r52da2535a',
  Brian: 'rae3207700',
  Greg: 'r6c3cc3111'
} as const;

const PERSONA_IDS = {
  Doctor: 'p9a95912',
  Therapist: 'paaea3abc543',
  Mechanic: 'pc19054d5335',
  PersonalTrainer: 'r393c989e2',
  Tutor: 'pe60182d358b'
} as const;

// Add languages array
const languages = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Español' },
  { value: 'french', label: 'Français' },
  { value: 'german', label: 'Deutsch' },
  { value: 'italian', label: 'Italiano' },
  { value: 'portuguese', label: 'Português' },
  { value: 'japanese', label: '日本語' },
  { value: 'korean', label: '한국어' },
  { value: 'mandarin', label: '中文' },
  { value: 'hindi', label: 'हिन्दी' },
];

// Add these color mappings near the top with other constants
const AVATAR_COLORS = {
  Alice: 'blue',
  Brian: 'purple',
  Greg: 'orange'
} as const;

const USECASE_COLORS = {
  Doctor: 'green',
  Therapist: 'blue',
  Mechanic: 'red',
  'Personal Trainer': 'orange',
  Tutor: 'indigo'
} as const;

// Add these color mapping functions
const getAvatarColorClasses = (avatar: string) => {
  const colorMap = {
    Alice: 'bg-blue-100 text-blue-500 text-blue-700',
    Brian: 'bg-purple-100 text-purple-500 text-purple-700',
    Greg: 'bg-orange-100 text-orange-500 text-orange-700'
  };
  return colorMap[avatar as keyof typeof colorMap] || 'bg-pink-100 text-pink-500 text-pink-700';
};

const getUseCaseColorClasses = (useCase: string) => {
  const colorMap = {
    Doctor: 'bg-green-100 text-green-500 text-green-700',
    Therapist: 'bg-blue-100 text-blue-500 text-blue-700',
    Mechanic: 'bg-red-100 text-red-500 text-red-700',
    'Personal Trainer': 'bg-orange-100 text-orange-500 text-orange-700',
    Tutor: 'bg-indigo-100 text-indigo-500 text-indigo-700'
  };
  return colorMap[useCase as keyof typeof colorMap] || 'bg-pink-100 text-pink-500 text-pink-700';
};

// Replace the TavusAPI implementation
const TavusAPI = {
  createVideoCall: async (avatar: string, useCase: string, language: string, name: string) => {
    try {
      const response = await axios.post('/api/tavus', {
        replica_id: REPLICA_IDS[avatar as keyof typeof REPLICA_IDS],
        persona_id: PERSONA_IDS[useCase as keyof typeof PERSONA_IDS],
        conversation_name: `${name}'s conversation with ${avatar} as ${useCase}`,
        conversational_context: `This is a conversation in ${language} between the user${name} and you, ${avatar}, who is acting as a ${useCase}. Start by saying "Hello ${name}!" first.`
      });
//change conversational context to be API based?
//convert csv to text?
      return { 
        id: response.data.conversation_id, 
        url: response.data.conversation_url 
      };
    } catch (error: any) {
      console.error('Full error response:', error.response?.data);
      throw error;
    }
  }
};

// Add these animation variants near other constants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Add this new component near the top of the file
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[40vh] w-[1px] bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"
          style={{
            left: `${15 + i * 20}%`,
            animation: `moveVertical ${8 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-[40vw] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
          style={{
            top: `${15 + i * 20}%`,
            animation: `moveHorizontal ${8 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes moveVertical {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(100%); }
        }
        @keyframes moveHorizontal {
          0%, 100% { transform: translateX(-50%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// Create a new Layout component at the top level
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500 rounded-full filter blur-xl animate-pulse"></div>
          <img 
            src="/tavus.png" 
            alt="Tavus Logo" 
            className="w-24 relative"
          />
        </div>
      </div>
      
      {children}
    </div>
  )
}

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [selectedUseCase, setSelectedUseCase] = useState('')
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [videoCallUrl, setVideoCallUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAvatarSubmit = async (avatar: string, useCase: string, language: string, name: string) => {
    setIsLoading(true)
    setSelectedAvatar(avatar)
    setSelectedUseCase(useCase)
    try {
      const response = await TavusAPI.createVideoCall(avatar, useCase, language, name)
      setVideoCallUrl(response.url)
      setShowVideoCall(true)
    } catch (error) {
      console.error('Error creating video call:', error)
      alert('Failed to create video call. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="welcome"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="relative z-10"
          >
            <div className="min-h-screen">
              <WelcomeScreen onStart={() => setIsStarted(true)} />
            </div>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            key="loading"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="relative z-10"
          >
            <div className="min-h-screen">
              <LoadingScreenWithoutLogo />
            </div>
          </motion.div>
        ) : !showVideoCall ? (
          <motion.div
            key="avatar"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="relative z-10"
          >
            <div className="min-h-screen">
              <AvatarSelectionWithoutLogo onSubmit={handleAvatarSubmit} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="relative z-10"
          >
            <div className="min-h-screen">
              <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative w-full max-w-[90%] lg:max-w-[800px]">
                  <div className="absolute inset-0 bg-pink-500/30 rounded-3xl filter blur-3xl"></div>
                  <Card className="relative w-full shadow-2xl bg-white/90 backdrop-blur-sm border border-gray-200/50">
                    <CardHeader className="space-y-1 pb-6">
                      <CardTitle className="text-2xl font-bold text-center text-gray-900">
                        Video Call
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_30px_rgb(236,72,153,0.3)]">
                        <iframe 
                          src={videoCallUrl} 
                          className="w-full h-full" 
                          allow="camera; microphone"
                        />
                      </div>
                      
                      <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent my-6" />

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 font-medium">Avatar:</span>
                          <div className={`px-5 py-2 rounded-full shadow-sm border ${getAvatarColorClasses(selectedAvatar)} transition-all hover:scale-105`}>
                            <span className={`text-${AVATAR_COLORS[selectedAvatar as keyof typeof AVATAR_COLORS]}-700 font-semibold`}>
                              {selectedAvatar}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 font-medium">Use Case:</span>
                          <div className={`px-5 py-2 rounded-full shadow-sm border ${getUseCaseColorClasses(selectedUseCase)} transition-all hover:scale-105`}>
                            <span className={`text-${USECASE_COLORS[selectedUseCase as keyof typeof USECASE_COLORS]}-700 font-semibold`}>
                              {selectedUseCase}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md shadow-[0_8px_40px_-12px_rgba(236,72,153,0.5)] border border-gray-100 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <div className="h-4" />
            <div className="flex flex-col items-center justify-center mb-4">
              <img src="/tavus2.png" alt="Tavus Logo" className="w-32" />
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-pink-200 to-transparent mt-4" />
            </div>
            <div className="h-2" />
            
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Phoenix 2.0
            </CardTitle>
            <p className="text-sm text-center text-gray-500 font-medium mb-4">
              Next JS Template
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={onStart}
              className="w-full bg-pink-500 hover:bg-pink-600 rounded-full py-2 text-base font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const avatars = ['Alice', 'Brian', 'Greg']
const useCases = ['Doctor', 'Therapist', 'Mechanic', 'Personal Trainer', 'Tutor']

function AvatarSelectionWithoutLogo({ onSubmit }: { onSubmit: (avatar: string, useCase: string, language: string, name: string) => void }) {
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [selectedUseCase, setSelectedUseCase] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('english')
  const [userName, setUserName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAvatar && selectedUseCase && userName.trim()) {
      onSubmit(selectedAvatar, selectedUseCase, selectedLanguage, userName)
    } else {
      alert('Please fill in all fields')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md shadow-[0_8px_40px_-12px_rgba(236,72,153,0.5)] border border-gray-100 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Create Your Video Call
            </CardTitle>
            <p className="text-center text-gray-500 font-medium">Select your preferences below</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-full bg-gray-50 border-gray-200 px-6 py-5 focus:ring-pink-500 focus:border-pink-500 transition-all"
                />
                <div className="absolute inset-0 rounded-full bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>

              <div className="relative group">
                <Select onValueChange={setSelectedAvatar}>
                  <SelectTrigger className="w-full rounded-full bg-gray-50 border-gray-200 px-6 py-5 focus:ring-pink-500 focus:border-pink-500 transition-all hover:bg-pink-50">
                    <SelectValue placeholder="Select Avatar" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-gray-200 shadow-lg">
                    {avatars.map((avatar) => (
                      <SelectItem 
                        key={avatar} 
                        value={avatar}
                        className="focus:bg-pink-50 focus:text-pink-900 cursor-pointer"
                      >
                        {avatar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative group">
                <Select onValueChange={setSelectedUseCase}>
                  <SelectTrigger className="w-full rounded-full bg-gray-50 border-gray-200 px-6 py-5 focus:ring-pink-500 focus:border-pink-500 transition-all hover:bg-pink-50">
                    <SelectValue placeholder="Select Use Case" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-gray-200 shadow-lg">
                    {useCases.map((useCase) => (
                      <SelectItem 
                        key={useCase} 
                        value={useCase}
                        className="focus:bg-pink-50 focus:text-pink-900 cursor-pointer"
                      >
                        {useCase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative group">
                <Select defaultValue="english" onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full rounded-full bg-gray-50 border-gray-200 px-6 py-5 focus:ring-pink-500 focus:border-pink-500 transition-all hover:bg-pink-50">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-gray-200 shadow-lg">
                    {languages.map((lang) => (
                      <SelectItem 
                        key={lang.value} 
                        value={lang.value}
                        className="focus:bg-pink-50 focus:text-pink-900 cursor-pointer"
                      >
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600 rounded-full py-6 text-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 mt-6"
              >
                Start Video Call
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingScreenWithoutLogo() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md shadow-[0_8px_40px_-12px_rgba(236,72,153,0.5)] border border-gray-100 bg-white/90 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <div className="relative">
              <div className="w-16 h-16 bg-pink-500 rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-16 h-16 bg-pink-500 rounded-full relative"></div>
            </div>
            <p className="mt-8 text-lg font-semibold text-gray-700">
              Creating your video call...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}