import React from 'react'

const a = () => {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <span>By {post.author}</span>
          <span>
            {post.updatedAt
              ? `Updated ${format(post.updatedAt, 'MMMM d, yyyy')}`
              : `Published ${format(post.createdAt!, 'MMMM d, yyyy')}`}
          </span>
        </div>
        <div className="mb-4 flex gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        {post.isPaid && (
          <Badge variant="destructive" className="mb-4">
            Premium Content
          </Badge>
        )}
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </header>
      <div className="prose mb-12 max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Comments isAuthenticated={isAuthenticated} />
    </article>
  );
}

export default a