import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/common/components/ui/badge';
import { BlogFormValues } from '@/common/schemas/blogSchema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card';

type BlogListProps = {
  blogs: BlogFormValues[];
};

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog.slug} className="flex flex-col overflow-hidden">
          <div className="relative w-full pt-[56.25%]">
            <Image
              src={
                blog.coverImage && blog.coverImage.trim() ? blog.coverImage : '/placeholder.svg?height=400&width=600'
              }
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <CardHeader>
            <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-2 flex flex-wrap gap-2">
              {blog.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            {/* <p className="text-sm text-muted-foreground">Created: {new Date(blog.createdAt).toDateString()}</p>
            <p className="text-sm text-muted-foreground">Updated: {new Date(blog.updatedAt).toDateString()}</p> */}
          </CardContent>

          <CardFooter className="mt-auto">
            <Link href={`/blogs/${blog.slug}`} className="text-primary hover:underline">
              Read more
            </Link>
            <Badge variant={blog.isPaid ? 'destructive' : 'default'} className="ml-auto">
              {blog.isPaid ? 'Paid' : 'Free'}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
