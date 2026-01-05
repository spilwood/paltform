import { Badge, Button, Card, CardContent, Separator } from "@spilwood/ui";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Share2,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Статья не найдена" };

  return {
    title: `${post.title} | Блог Spilwood`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author || "Spilwood"],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Get previous and next posts for navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-7xl px-4 py-8">
          <Breadcrumbs
            items={[{ label: "Блог", href: "/blog" }, { label: post.title }]}
          />

          <header className="mx-auto mt-8 max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-sm font-medium"
            >
              {post.category}
            </Badge>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} мин чтения
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />~
                {Math.round(post.content.length / 1500)} страниц
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-3 py-1 text-xs font-normal"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={600}
              className="h-[400px] w-full object-cover md:h-[600px]"
              priority
            />
          </div>

          <div
            className="prose prose-lg mx-auto mt-16 max-w-4xl 
              prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:mb-6 prose-h2:mt-16 prose-h2:border-b prose-h2:pb-3 prose-h2:text-3xl prose-h2:md:text-4xl
              prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-xl prose-h3:md:text-2xl
              prose-p:mb-6 prose-p:text-pretty prose-p:leading-relaxed prose-p:text-foreground/90
              prose-a:font-medium prose-a:text-primary prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline
              prose-strong:font-semibold prose-strong:text-foreground
              prose-em:italic prose-em:text-foreground/80
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-3 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:not-italic
              prose-code:rounded prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-zinc-950 prose-pre:text-zinc-50
              prose-ul:my-6 prose-ul:space-y-3
              prose-ol:my-6 prose-ol:space-y-3
              prose-li:text-foreground/90 prose-li:marker:text-primary
              prose-img:my-10 prose-img:rounded-xl prose-img:shadow-lg
              prose-figcaption:mt-3 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:italic prose-figcaption:text-muted-foreground
              prose-table:my-10 prose-table:border prose-table:border-border
              prose-thead:bg-muted/50 prose-thead:font-semibold
              prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left
              prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3
              prose-tr:border-b prose-tr:border-border
              [&_.lead]:text-xl [&_.lead]:font-medium [&_.lead]:leading-relaxed [&_.lead]:text-foreground [&_.lead]:md:text-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mx-auto mt-20 max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 shadow-sm">
              {/* Decorative elements */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

              <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-primary" />
                    <p className="text-xl font-semibold">Понравилась статья?</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Поделитесь с друзьями в социальных сетях
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    className="shadow-md transition-all hover:scale-105 hover:shadow-lg"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Поделиться
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="transition-all hover:scale-105 bg-transparent"
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <nav className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-2">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group">
                  <Card className="h-full overflow-hidden border shadow-sm transition-all hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <ChevronLeft className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Предыдущая статья
                        </p>
                        <p className="mt-1 line-clamp-2 font-medium leading-snug transition-colors group-hover:text-primary">
                          {prevPost.title}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group">
                  <Card className="h-full overflow-hidden border shadow-sm transition-all hover:shadow-md">
                    <CardContent className="flex items-center justify-end gap-4 p-6 text-right">
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Следующая статья
                        </p>
                        <p className="mt-1 line-clamp-2 font-medium leading-snug transition-colors group-hover:text-primary">
                          {nextPost.title}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </nav>
        </article>

        <Separator className="my-16" />

        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Читайте также
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Похожие статьи, которые могут вас заинтересовать
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}

        <section className="relative overflow-hidden border-t bg-gradient-to-br from-muted/50 via-muted/30 to-background py-20">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
          <div className="relative mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Готовы начать свой проект?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              В нашем каталоге вы найдёте качественные спилы для любых
              творческих идей
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/spily">Перейти в каталог</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/kontakty">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
