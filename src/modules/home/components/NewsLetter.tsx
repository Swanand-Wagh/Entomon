import { NewsLetterForm } from './NewsLetterForm';

export const Newsletter = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-950">
    <div className="container px-4 md:px-6 text-center space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">Stay Updated with Our Newsletter</h2>
      <p className="max-w-xl mx-auto text-primary-foreground">
        Subscribe to our newsletter to receive the latest news, updates, and exclusive content from the Entomon
        Institute.
      </p>

      <NewsLetterForm />
    </div>
  </section>
);
