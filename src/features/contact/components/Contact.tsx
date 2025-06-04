import { ArrowRight, Bug, Calendar, Clock, Mail, MapPin, Phone, Users } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Pune, Maharashtra', 'India'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@entomon.in', 'research@entomon.in'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109'],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Info Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          {/* Main Contact Section */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                  Let's Start a
                  <span className="text-green-600"> Conversation</span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're interested in our research programs, have questions about invertebrate zoology,
                  or want to explore collaboration opportunities, we're here to help.
                </p>
              </div>

              {/* Contact Form Card */}
              <div className="rounded-3xl bg-white shadow-lg border border-gray-200 p-8">
                <ContactForm />
              </div>
            </div>

            {/* Map */}
            <div className="space-y-8">
              {/* Map Container */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.545380241757!2d73.8121384!3d18.4589395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295c5d3977475%3A0x566c76909bb238be!2sEntomon%20Institute%20of%20Invertebrate%20Zoology!5e0!3m2!1sen!2sus!4v1744087407144!5m2!1sen!2sus"
                  width="100%"
                  height="500"
                  tabIndex={0}
                  allowFullScreen
                  aria-hidden="false"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="w-full h-[500px]"
                />
              </div>

              {/* Decorative elements */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
                <Users className="h-4 w-4" />
                Join Our Community
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                Ready to Explore
                <span className="text-green-600"> Invertebrate Science?</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Join us in our mission to advance invertebrate zoology through research, education, and conservation.
                Discover opportunities that match your interests and expertise.
              </p>
            </div>

            {/* CTA Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Programs CTA */}
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                <div className="p-8 space-y-6">
                  <div className="inline-flex items-center justify-center rounded-xl bg-green-600 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      Explore Our Programs
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Discover field expeditions, workshops, and research opportunities designed for all experience levels.
                    </p>
                  </div>

                  <a
                    href="/events"
                    className="group/link inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    View Programs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-green-500/5 to-green-600/5" />
              </div>

              {/* About CTA */}
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                <div className="p-8 space-y-6">
                  <div className="inline-flex items-center justify-center rounded-xl bg-gray-700 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      Learn About Us
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Discover our story, mission, and the expert team behind Entomon Institute's success.
                    </p>
                  </div>

                  <a
                    href="/about"
                    className="group/link inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  >
                    Our Story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-gray-500/5 to-gray-600/5" />
              </div>

              {/* Resources CTA */}
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                <div className="p-8 space-y-6">
                  <div className="inline-flex items-center justify-center rounded-xl bg-green-600 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Bug className="h-6 w-6 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      Research Resources
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Access our library of research papers, guides, and educational materials on invertebrate zoology.
                    </p>
                  </div>

                  <a
                    href="/blogs"
                    className="group/link inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    Browse Resources
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-green-500/5 to-green-600/5" />
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16 space-y-6">
              <p className="text-lg text-gray-600">
                Still have questions? Our team is here to help you find the perfect opportunity.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-green-600 font-medium">
                <Mail className="h-4 w-4" />
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
