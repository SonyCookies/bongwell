'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { db } from '@/app/lib/firebase-config'
import { useAuth } from '@/app/contexts/AuthContext'
import Image from 'next/image'
import { Heart, MessageCircle, Droplet, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: Timestamp
}

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  likeCount: number
  commentCount: number
  likes: string[]
  comments?: Comment[]
}

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [comment, setComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProject = async () => {
      if (typeof id !== 'string') return
      const docRef = doc(db, 'projects', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const projectData = { id: docSnap.id, ...docSnap.data() } as Project
        setProject(projectData)
        setIsLiked(projectData.likes?.includes(user?.uid || '') || false)
      }
    }
    fetchProject()
  }, [id, user])

  const handleLike = async () => {
    if (!project || !user) return

    const projectRef = doc(db, 'projects', project.id)
    const newLikeCount = isLiked ? project.likeCount - 1 : project.likeCount + 1
    const newLikes = isLiked
      ? (project.likes || []).filter(uid => uid !== user.uid)
      : [...(project.likes || []), user.uid]

    await updateDoc(projectRef, {
      likeCount: newLikeCount,
      likes: newLikes
    })

    setProject(prev => prev ? { ...prev, likeCount: newLikeCount, likes: newLikes } : null)
    setIsLiked(!isLiked)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project || !user || !comment.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      content: comment.trim(),
      createdAt: Timestamp.now()
    }

    const projectRef = doc(db, 'projects', project.id)
    await updateDoc(projectRef, {
      comments: arrayUnion(newComment),
      commentCount: (project.commentCount || 0) + 1
    })

    setProject(prev => {
      if (!prev) return null
      return {
        ...prev,
        comments: [...(prev.comments || []), newComment],
        commentCount: (prev.commentCount || 0) + 1
      }
    })
    setComment('')
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handlePrevImage = () => {
    if (selectedImageIndex === null || !project) return
    setSelectedImageIndex((selectedImageIndex - 1 + project.images.length) % project.images.length)
  }

  const handleNextImage = () => {
    if (selectedImageIndex === null || !project) return
    setSelectedImageIndex((selectedImageIndex + 1) % project.images.length)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#008080] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#00a5b5] to-[#001830]">
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{project.title}</h1>
          </motion.div>
        </div>

        {/* CSS for wave animation */}
        <style jsx>{`
          .waves {
            position: absolute;
            width: 100%;
            height: 100px;
            min-height: 100px;
            max-height: 150px;
            bottom: 0;
          }
          .parallax > use {
            animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
          }
          .parallax > use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
          }
          .parallax > use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
          }
          .parallax > use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
          }
          .parallax > use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
          }
          @keyframes move-forever {
            0% {
              transform: translate3d(-90px,0,0);
            }
            100% { 
              transform: translate3d(85px,0,0);
            }
          }
        `}</style>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Project Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#008080]">Project Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={image}
                    alt={`Project image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <p className="text-lg text-gray-700">{project.description}</p>
          </motion.div>

          {/* Interaction Section */}
          <div className="border-t border-b py-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${isLiked ? 'text-[#008080]' : 'text-gray-500'} transition-colors duration-200`}
                  disabled={!user}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-lg">{project.likeCount || 0}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-500">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-lg">{project.commentCount || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-[#008080]">Comments</h2>
            
            {user ? (
              <form onSubmit={handleComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200"
                  placeholder="Share your thoughts..."
                  rows={3}
                />
                <button 
                  type="submit" 
                  className="mt-2 px-6 py-3 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors duration-200"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
                <p className="text-gray-600">Please log in to comment.</p>
              </div>
            )}

            <div className="space-y-6">
              {project.comments && project.comments.length > 0 ? (
                project.comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-[#008080]">{comment.userName}</span>
                      <span className="text-sm text-gray-500 ml-4">
                        {comment.createdAt.toDate().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[selectedImageIndex]}
                alt={`Enlarged project image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              />
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

