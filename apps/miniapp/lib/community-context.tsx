"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface UserPost {
  id: string
  userId: string
  userName: string
  userAvatar: string
  userLevel: string
  images: string[]
  title: string
  description: string
  likes: number
  comments: number
  shares: number
  date: string
  isLiked: boolean
  tags: string[]
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  text: string
  date: string
  likes: number
}

export interface TopContributor {
  id: string
  name: string
  avatar: string
  level: string
  badges: string[]
  projects: number
  likes: number
  followers: number
  isFollowing: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
}

interface CommunityContextType {
  posts: UserPost[]
  topContributors: TopContributor[]
  userBadges: Badge[]
  followUser: (userId: string) => void
  likePost: (postId: string) => void
  sharePost: (postId: string) => void
  addComment: (postId: string, text: string) => void
  uploadPost: (title: string, description: string, images: string[], tags: string[]) => void
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined)

const mockPosts: UserPost[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Анна Мастерова",
    userAvatar: "/woman-craftsperson.jpg",
    userLevel: "Мастер",
    images: ["/birch-wood-slice-wall-art.jpg", "/wood-slice-decoration.jpg"],
    title: "Панно из березовых спилов",
    description: "Создала декоративное панно из 15 спилов разного размера. Покрыла маслом и воском.",
    likes: 247,
    comments: 23,
    shares: 12,
    date: "2024-01-15",
    isLiked: false,
    tags: ["береза", "декор", "панно"],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Иван Столяров",
    userAvatar: "/man-woodworker.jpg",
    userLevel: "Эксперт",
    images: ["/wood-coffee-table-with-wood-slices.jpg"],
    title: "Журнальный столик",
    description: "Столешница из 30 сосновых спилов, залитых эпоксидной смолой. 2 недели работы!",
    likes: 512,
    comments: 45,
    shares: 34,
    date: "2024-01-14",
    isLiked: true,
    tags: ["сосна", "эпоксидка", "мебель"],
  },
  {
    id: "3",
    userId: "user3",
    userName: "Мария Дизайнова",
    userAvatar: "/woman-designer.png",
    userLevel: "Новичок",
    images: ["/wood-slice-coasters-set.jpg"],
    title: "Набор подставок",
    description: "Мой первый проект! 6 подставок из дуба с выжиганием. Спасибо Spilwood за качество!",
    likes: 89,
    comments: 12,
    shares: 5,
    date: "2024-01-13",
    isLiked: false,
    tags: ["дуб", "подставки", "выжигание"],
  },
]

const mockTopContributors: TopContributor[] = [
  {
    id: "user2",
    name: "Иван Столяров",
    avatar: "/man-woodworker.jpg",
    level: "Эксперт",
    badges: ["master", "popular", "helpful"],
    projects: 47,
    likes: 8234,
    followers: 1205,
    isFollowing: false,
  },
  {
    id: "user1",
    name: "Анна Мастерова",
    avatar: "/woman-craftsperson.jpg",
    level: "Мастер",
    badges: ["master", "creative"],
    projects: 32,
    likes: 5678,
    followers: 876,
    isFollowing: true,
  },
  {
    id: "user4",
    name: "Петр Краснодеревщик",
    avatar: "/man-carpenter.jpg",
    level: "Эксперт",
    badges: ["master", "helpful", "early"],
    projects: 29,
    likes: 4521,
    followers: 654,
    isFollowing: false,
  },
]

const mockBadges: Badge[] = [
  {
    id: "first-project",
    name: "Первый проект",
    description: "Опубликовали свою первую работу",
    icon: "🌟",
    earned: true,
    earnedDate: "2024-01-10",
  },
  {
    id: "popular",
    name: "Популярный",
    description: "Получили 100+ лайков на проект",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-12",
  },
  {
    id: "master",
    name: "Мастер",
    description: "Опубликовали 10+ проектов",
    icon: "🏆",
    earned: false,
  },
  {
    id: "helpful",
    name: "Помощник",
    description: "Оставили 50+ комментариев",
    icon: "💬",
    earned: false,
  },
  {
    id: "creative",
    name: "Креативный",
    description: "Использовали 3+ вида древесины",
    icon: "🎨",
    earned: true,
    earnedDate: "2024-01-14",
  },
]

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<UserPost[]>(mockPosts)
  const [topContributors, setTopContributors] = useState<TopContributor[]>(mockTopContributors)
  const [userBadges, setUserBadges] = useState<Badge[]>(mockBadges)

  const followUser = (userId: string) => {
    setTopContributors((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)),
    )

    if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
    }
  }

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )

    if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
    }
  }

  const sharePost = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (post && typeof window !== "undefined" && window.Telegram?.WebApp) {
      const shareUrl = `https://t.me/share/url?url=spilwood.app/post/${postId}&text=${encodeURIComponent(post.title)}`
      window.Telegram.WebApp.openTelegramLink(shareUrl)
    }
  }

  const addComment = (postId: string, text: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)))
  }

  const uploadPost = (title: string, description: string, images: string[], tags: string[]) => {
    const newPost: UserPost = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "Вы",
      userAvatar: "/diverse-user-avatars.png",
      userLevel: "Новичок",
      images,
      title,
      description,
      likes: 0,
      comments: 0,
      shares: 0,
      date: new Date().toISOString().split("T")[0],
      isLiked: false,
      tags,
    }
    setPosts((prev) => [newPost, ...prev])
  }

  return (
    <CommunityContext.Provider
      value={{
        posts,
        topContributors,
        userBadges,
        followUser,
        likePost,
        sharePost,
        addComment,
        uploadPost,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  const context = useContext(CommunityContext)
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider")
  }
  return context
}
