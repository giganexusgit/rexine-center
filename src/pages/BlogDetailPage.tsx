import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Share2, 
  ChevronDown, 
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';
export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex !== -1 && currentIndex < BLOG_POSTS.length - 1 
    ? BLOG_POSTS[currentIndex + 1] 
    : BLOG_POSTS[0]; // Loops back to the first post if at the end

// Scroll progress setup
useEffect(() => {
  let animationFrameId: number | null = null;

  const updateScrollProgress = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (totalHeight <= 0) {
      setScrollProgress(0);
      return;
    }

    const progress = (window.scrollY / totalHeight) * 100;

    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  const handleScroll = () => {
    if (animationFrameId !== null) return;

    animationFrameId = requestAnimationFrame(() => {
      updateScrollProgress();
      animationFrameId = null;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Set initial value
  updateScrollProgress();

  return () => {
    window.removeEventListener('scroll', handleScroll);

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}, []);
  if (!post) {
    return (

      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-gray-900">Article Not Found</h1>
          <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-[#C67C4E] text-white font-medium hover:bg-[#b06c42] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }
  

  return (
    <>
      <SEO 
        title={`${post.title} | Rexine Centre Blog`}
        description={post.excerpt || SEO_DATA.blogDetail.description}
        keywords={[...(SEO_DATA.blogDetail.keywords || []), post.title]}
      />
      <div className="min-h-screen bg-gray-50/50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
  className="h-full bg-[#C67C4E]"
  style={{ width: `${scrollProgress}%` }}
/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-[#C67C4E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Knowledge Base
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 shadow-xs transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Grid Layout: Content Left, Sticky TOC Right */}
        {/* Main Grid Layout: On mobile/tablet, TOC can appear first using flex-col-reverse or order classes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Main Blog Article (Span 8) */}
          <article className="lg:col-span-8 order-2 lg:order-1 bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-10">
            {/* Header Metadata */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                <span className="inline-flex items-center gap-1.5 text-[#C67C4E]">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime || '5 min read'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-[1.2]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-4 text-lg text-gray-600 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Hero Image */}
            {post.image && (
              <div className="rounded-xl overflow-hidden mb-10 bg-gray-100 border border-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[300px] sm:h-[420px] object-cover"
                />
              </div>
            )}

            {/* Content Body */}
            <div className="space-y-12">
              {post.sections?.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>

                  {section.image && (
                    <div className="rounded-xl overflow-hidden my-6 bg-gray-100 border border-gray-100">
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="w-full h-[260px] sm:h-[360px] object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed">
                    {section.paragraphs.map((para, pIndex) => (
                      <p key={pIndex}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-16 pt-10 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-6 bg-[#C67C4E] rounded-full"></span>
                  <h3 className="font-serif text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                  {post.faqs.map((faq: { question: string; answer: string }, index: number) => {
                    const isOpen = openFaq === index;
                    return (
                      <div 
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 bg-white"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-gray-900 hover:bg-gray-50/50 transition-colors"
                        >
                          <span className="flex items-center gap-3 text-base">
                            <CheckCircle2 className="w-5 h-5 text-[#C67C4E] shrink-0" />
                            {faq.question}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 mt-1 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Next Blog Navigation CTA */}
            {nextPost && (
              <div className="mt-16 pt-8 border-t border-gray-100">
                <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C67C4E] bg-white/10 px-3 py-1 rounded-full">
                      Next Article
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold mt-3 text-white max-w-lg leading-snug">
                      {nextPost.title}
                    </h4>
                  </div>
                  <Link
                    to={`/resources/${nextPost.slug}`}
                    className="inline-flex items-center gap-2 bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-6 py-3 rounded-xl font-medium transition-colors shrink-0 shadow-sm"
                  >
                    <span>Read Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </article>

          {/* RIGHT COLUMN / MOBILE TOP: Table of Contents & Quick Widget (Span 4) */}
          <aside className="lg:col-span-4 order-1 lg:order-2 space-y-6 lg:sticky lg:top-24">
            
            {/* Table of Contents Card */}
            {post.tocItems && post.tocItems.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
                  <Bookmark className="w-4 h-4 text-[#C67C4E]" />
                  <h3 className="font-serif font-bold text-gray-900 text-base">Table of Contents</h3>
                </div>
                <nav className="space-y-1">
                  {post.tocItems.map((item: { id: string; label: string }) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(item.id);
                        const el = document.getElementById(item.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`block text-sm py-2 px-3 rounded-lg transition-colors font-medium ${
                        activeSection === item.id 
                          ? 'bg-[#C67C4E]/10 text-[#C67C4E]' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Consultation Box */}
            <div className="bg-gradient-to-br from-[#C67C4E]/10 to-amber-50 rounded-2xl border border-[#C67C4E]/20 p-6 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C67C4E] bg-white px-3 py-1 rounded-full shadow-xs">
                B2B Sourcing Support
              </span>
              <h4 className="font-serif text-lg font-bold text-gray-900 mt-4">
                Need Custom Material Specs?
              </h4>
              <p className="text-sm text-gray-600 mt-2 mb-5">
                Request sample packs, technical data compliance sheets, or custom color matching for your project.
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C67C4E] hover:bg-[#b06a3d] text-white py-2.5 px-4 rounded-xl text-sm font-medium transition-colors shadow-xs"
              >
                Request Sample Pack
              </Link>
            </div>

          </aside>

        </div>
      </div>
    </div>
    </>
  );
};