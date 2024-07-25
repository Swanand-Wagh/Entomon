import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';

export const Newsletter = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
    <div className="container px-4 md:px-6 text-center space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">Stay Updated with Our Newsletter</h2>
      <p className="max-w-xl mx-auto text-primary-foreground">
        Subscribe to our newsletter to receive the latest news, updates, and exclusive content from the Entomon
        Institute.
      </p>
      <form className="max-w-md mx-auto flex gap-2">
        <Input type="email" placeholder="Enter your email" className="flex-1" />
        <Button type="submit" variant="secondary">
          Subscribe
        </Button>
      </form>
    </div>
  </section>
);
