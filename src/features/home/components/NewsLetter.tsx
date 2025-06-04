import { Check, Mail } from 'lucide-react';
import Link from 'next/link';
import { NewsLetterForm } from './NewsLetterForm';

export const Newsletter = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                  <Mail className="h-4 w-4" />
                  Stay Connected
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                  Join Our Research
                  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
                    Community
                  </span>
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Get exclusive access to research updates, field expedition announcements,
                  and educational content delivered directly to your inbox. Be the first to know
                  about our latest discoveries and opportunities.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Exclusive research updates and findings</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Early access to field expedition registration</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Educational resources and learning materials</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Networking opportunities with fellow researchers</span>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="relative">
              <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-gray-400">
                      Join 1,000+ researchers and enthusiasts
                    </p>
                  </div>

                  <NewsLetterForm />

                  <p className="text-xs text-gray-400 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-40 animate-pulse" />
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Follow us on social media for daily updates</p>
            <div className="flex justify-center gap-6">
              <Link
                href="https://www.instagram.com/entomon_institute"
                target="_blank"
                className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-gray-400 hover:text-white hover:bg-green-600/20 hover:border-green-400/30 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.828 14.394 3.338 13.244 3.338 11.946s.49-2.448 1.297-3.323c1.297-1.297 2.448-1.787 3.814-1.787s2.448.49 3.323 1.297c1.297 1.297 1.787 2.448 1.787 3.814s-.49 2.448-1.297 3.323c-1.297 1.297-2.448 1.787-3.814 1.787zm7.83-10.605c-.293 0-.588-.098-.784-.294-.294-.294-.294-.686 0-.98l.588-.588c.294-.294.686-.294.98 0 .294.294.294.686 0 .98l-.588.588c-.196.196-.49.294-.784.294z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-gray-400 hover:text-white hover:bg-green-600/20 hover:border-green-400/30 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-gray-400 hover:text-white hover:bg-green-600/20 hover:border-green-400/30 transition-all"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
