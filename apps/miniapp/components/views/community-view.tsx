"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Heart, MessageCircle, Share2, Award, TrendingUp, Plus, ChevronLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCommunity, type UserPost, type TopContributor } from "@/lib/community-context"

type ViewMode = "feed" | "leaderboard" | "badges" | "upload" | "post-detail"

export function CommunityView() {
  const [viewMode, setViewMode] = useState<ViewMode>("feed")
  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null)
  const { posts, topContributors, userBadges, followUser, likePost, sharePost, uploadPost } = useCommunity()
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY
    const diff = endY - startY.current

    if (diff > 100 && !refreshing) {
      setRefreshing(true)
      setTimeout(() => setRefreshing(false), 1500)

      if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("soft")
      }
    }
  }

  const handlePostClick = (post: UserPost) => {
    setSelectedPost(post)
    setViewMode("post-detail")
  }

  const handleBack = () => {
    setViewMode("feed")
    setSelectedPost(null)
  }

  return (
    <div
      className="h-full overflow-y-auto bg-gradient-to-b from-background to-muted"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header with navigation */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3">
          {viewMode === "feed" ? (
            <>
              <h1 className="text-xl font-bold text-balance mb-3">Сообщество мастеров</h1>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 h-9 bg-transparent"
                  onClick={() => setViewMode("feed")}
                >
                  <TrendingUp className="h-4 w-4 mr-1.5" />
                  Лента
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 h-9 bg-transparent"
                  onClick={() => setViewMode("leaderboard")}
                >
                  <Award className="h-4 w-4 mr-1.5" />
                  Топ авторов
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 h-9 bg-transparent"
                  onClick={() => setViewMode("badges")}
                >
                  Достижения
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-shrink-0 h-9 ml-auto"
                  onClick={() => setViewMode("upload")}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Загрузить
                </Button>
              </div>
            </>
          ) : (
            <Button variant="ghost" size="sm" className="mb-2" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Назад
            </Button>
          )}
        </div>

        {refreshing && (
          <div className="absolute top-full left-0 right-0 flex justify-center py-2">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Content based on view mode */}
      {viewMode === "feed" && (
        <FeedView posts={posts} onPostClick={handlePostClick} onLike={likePost} onShare={sharePost} />
      )}
      {viewMode === "leaderboard" && <LeaderboardView contributors={topContributors} onFollow={followUser} />}
      {viewMode === "badges" && <BadgesView badges={userBadges} />}
      {viewMode === "upload" && <UploadView onUpload={uploadPost} onBack={handleBack} />}
      {viewMode === "post-detail" && selectedPost && (
        <PostDetailView post={selectedPost} onLike={likePost} onShare={sharePost} />
      )}
    </div>
  )
}

function FeedView({
  posts,
  onPostClick,
  onLike,
  onShare,
}: {
  posts: UserPost[]
  onPostClick: (post: UserPost) => void
  onLike: (postId: string) => void
  onShare: (postId: string) => void
}) {
  return (
    <div className="px-4 py-4 space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all">
          {/* User header */}
          <div className="p-3 flex items-center gap-3 border-b">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
              {post.userName[0]}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{post.userName}</p>
              <p className="text-xs text-muted-foreground">{post.userLevel}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {new Date(post.date).toLocaleDateString("ru")}
            </Badge>
          </div>

          {/* Image gallery */}
          <div className="relative aspect-square bg-muted cursor-pointer" onClick={() => onPostClick(post)}>
            <img src={post.images[0] || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            {post.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                +{post.images.length - 1}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-lg text-balance">{post.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${post.isLiked ? "text-primary" : ""}`}
                onClick={() => onLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => onPostClick(post)}>
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => onShare(post.id)}>
                <Share2 className="h-4 w-4" />
                {post.shares}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function LeaderboardView({
  contributors,
  onFollow,
}: {
  contributors: TopContributor[]
  onFollow: (userId: string) => void
}) {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Зал славы</h2>
        <p className="text-sm text-muted-foreground">Самые активные мастера сообщества</p>
      </div>

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-2 mb-8">
        {contributors.slice(0, 3).map((contributor, index) => (
          <div
            key={contributor.id}
            className={`flex flex-col items-center ${index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3"}`}
          >
            <div className="relative mb-2">
              <div
                className={`rounded-full bg-gradient-to-br ${
                  index === 0
                    ? "from-amber-400 to-amber-600 h-20 w-20"
                    : index === 1
                      ? "from-slate-300 to-slate-500 h-16 w-16"
                      : "from-orange-400 to-orange-600 h-16 w-16"
                } flex items-center justify-center text-white font-bold text-xl`}
              >
                {contributor.name[0]}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 rounded-full ${
                  index === 0 ? "bg-amber-500 h-7 w-7" : "bg-slate-400 h-6 w-6"
                } flex items-center justify-center text-white font-bold text-xs border-2 border-background`}
              >
                {index + 1}
              </div>
            </div>
            <p className={`font-bold text-center ${index === 0 ? "text-base" : "text-sm"}`}>
              {contributor.name.split(" ")[0]}
            </p>
            <p className="text-xs text-muted-foreground">{contributor.likes} ❤️</p>
          </div>
        ))}
      </div>

      {/* Full list */}
      <div className="space-y-3">
        {contributors.map((contributor, index) => (
          <Card key={contributor.id} className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-muted-foreground w-8 text-center">#{index + 1}</div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                {contributor.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{contributor.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{contributor.projects} проектов</span>
                  <span>•</span>
                  <span>{contributor.followers} подписчиков</span>
                </div>
              </div>
              <Button
                size="sm"
                variant={contributor.isFollowing ? "outline" : "default"}
                onClick={() => onFollow(contributor.id)}
                className="flex-shrink-0"
              >
                {contributor.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mt-3">
              {contributor.badges.map((badge) => (
                <div key={badge} className="text-xl">
                  {badge === "master" && "🏆"}
                  {badge === "popular" && "🔥"}
                  {badge === "helpful" && "💬"}
                  {badge === "creative" && "🎨"}
                  {badge === "early" && "🌟"}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BadgesView({ badges }: { badges: any[] }) {
  const earned = badges.filter((b) => b.earned)
  const locked = badges.filter((b) => !b.earned)

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Достижения</h2>
        <p className="text-sm text-muted-foreground">
          Заработано {earned.length} из {badges.length}
        </p>
      </div>

      {/* Earned badges */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Получено</h3>
        <div className="grid grid-cols-2 gap-3">
          {earned.map((badge) => (
            <Card key={badge.id} className="p-4 border-2 border-primary/20 bg-primary/5">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
              {badge.earnedDate && (
                <p className="text-xs text-primary font-medium">
                  {new Date(badge.earnedDate).toLocaleDateString("ru")}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Locked badges */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Заблокировано</h3>
        <div className="grid grid-cols-2 gap-3">
          {locked.map((badge) => (
            <Card key={badge.id} className="p-4 opacity-50 grayscale">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function UploadView({ onUpload, onBack }: { onUpload: any; onBack: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = () => {
    if (title && description) {
      onUpload(
        title,
        description,
        ["/wood-craft-project.jpg"],
        tags.split(",").map((t) => t.trim()),
      )
      onBack()

      if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
      }
    }
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Поделитесь работой</h2>
        <p className="text-sm text-muted-foreground">Покажите свой проект сообществу</p>
      </div>

      <div className="space-y-4">
        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
          <div className="text-center space-y-2">
            <Plus className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Добавить фото</p>
          </div>
        </div>

        <Input placeholder="Название проекта" value={title} onChange={(e) => setTitle(e.target.value)} />

        <Textarea
          placeholder="Расскажите о вашей работе..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <Input
          placeholder="Теги через запятую (береза, декор, панно)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Button onClick={handleSubmit} className="w-full h-12" disabled={!title || !description}>
          <Send className="h-4 w-4 mr-2" />
          Опубликовать
        </Button>
      </div>
    </div>
  )
}

function PostDetailView({ post, onLike, onShare }: { post: UserPost; onLike: any; onShare: any }) {
  const [comment, setComment] = useState("")

  return (
    <div className="space-y-4 pb-6">
      {/* Image gallery */}
      <div className="relative aspect-square bg-muted">
        <img src={post.images[0] || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="px-4 space-y-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
            {post.userName[0]}
          </div>
          <div className="flex-1">
            <p className="font-semibold">{post.userName}</p>
            <p className="text-sm text-muted-foreground">{post.userLevel}</p>
          </div>
          <Button size="sm">Подписаться</Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-balance">{post.title}</h2>
          <p className="text-sm text-muted-foreground">{post.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${post.isLiked ? "text-primary" : ""}`}
            onClick={() => onLike(post.id)}
          >
            <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => onShare(post.id)}>
            <Share2 className="h-4 w-4" />
            {post.shares}
          </Button>
        </div>

        {/* Comment section */}
        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold">Комментарии ({post.comments})</h3>
          <div className="flex gap-2">
            <Input placeholder="Добавить комментарий..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button size="icon" disabled={!comment}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
