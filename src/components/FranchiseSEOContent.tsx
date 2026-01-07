'use client';

/**
 * FranchiseSEOContent.tsx
 * 
 * Semantic Content Injection Module for Wings Institute Franchise Page
 * B2B Focus: Targets entrepreneurs, investors, and education center owners
 * 
 * SEO Strategy: Business ROI, Unit Economics, Brand Equity messaging
 * Target Markets: Gujarat, Rajasthan, Maharashtra Tier-2/3 cities
 */

import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';

// --- FAQ DATA FOR SCHEMA.ORG ---
const franchiseFaqData = [
  {
    question: "What is the ROI period for a Wings Institute franchise?",
    answer: "Based on our existing franchise partners' performance, franchisees typically achieve healthy returns within an attractive timeframe. This depends on factors like location (Tier-2 cities perform exceptionally well), local marketing efforts, and batch sizes. Specific ROI projections are discussed during our confidential franchise discovery session based on your target market."
  },
  {
    question: "Do I need prior experience in aviation or education to own a Wings franchise?",
    answer: "No prior experience in aviation or education is required. Wings Institute provides comprehensive operational support including: Train-the-Trainer programmes where we certify your faculty at our Vadodara headquarters, complete curriculum and teaching materials, marketing templates and brand guidelines, centralised placement support, and ongoing business coaching. Many of our successful franchisees come from diverse backgrounds including retail, real estate, and IT."
  },
  {
    question: "What is the total investment required to start a Wings Institute franchise?",
    answer: "Wings Institute offers a competitive, asset-light franchise model with investment requirements significantly lower than industry competitors. The exact investment depends on your city tier, infrastructure requirements, and scope. We discuss complete financial details including franchise fee, setup costs, and working capital requirements during our confidential discovery meeting with serious investors."
  },
  {
    question: "What space requirements are needed for a Wings Institute franchise center?",
    answer: "The minimum space requirement is 1,500 - 2,000 sq.ft. in a commercial area with good visibility and accessibility. The layout should accommodate: 2-3 smart classrooms (30-40 students capacity each), a grooming/mock interview room, reception and counselling area, and administrative office. We provide detailed floor plans and interior design guidelines as part of the franchise package."
  },
  {
    question: "How does Wings Institute franchise compare to other aviation academies?",
    answer: "Wings Institute offers significant advantages: 1) Competitive Investment: Our asset-light model requires significantly lower capital than traditional education franchises, 2) Owned Infrastructure: We operate our own Centers of Excellence with verifiable assets like the A330 mock cabin, not just aggregated partnerships, 3) Legacy: Established 2008 with 17+ years of proven placement track record, 4) Curriculum Ownership: We develop and continuously update our own curriculum including AI tools and VR simulations, 5) Attractive Revenue Model: Our franchisee-friendly terms are discussed during discovery sessions."
  },
  {
    question: "What ongoing support does Wings Institute provide to franchisees?",
    answer: "Our support ecosystem includes: Monthly curriculum updates with latest industry trends, quarterly Train-the-Trainer sessions at Vadodara HQ, centralised student placement support (we handle job placements, you focus on admissions), digital marketing templates and social media content, access to our proprietary AI Career Navigator and Interview Coach tools, annual franchise conference and networking, and dedicated franchise relationship manager."
  },
  {
    question: "What are the franchise terms and revenue sharing model?",
    answer: "Wings Institute offers a franchisee-friendly revenue model that is significantly more attractive than industry standards. Our terms include brand usage, curriculum access, placement support, marketing support, and ongoing training with no hidden fees. Complete financial terms are discussed confidentially with qualified franchise applicants during our discovery process."
  },
  {
    question: "Which cities are ideal for a Wings Institute franchise?",
    answer: "We are actively expanding in Tier-2 and Tier-3 cities across Gujarat (Rajkot, Surat, Bhavnagar, Jamnagar, Junagadh), Rajasthan (Jaipur, Udaipur, Jodhpur, Kota), Maharashtra (Nashik, Nagpur, Aurangabad, Kolhapur), and Madhya Pradesh (Indore, Bhopal, Gwalior). These cities have growing aspirational youth populations but limited access to quality aviation/hospitality training, creating strong demand."
  },
  {
    question: "How long does it take to launch a Wings Institute franchise?",
    answer: "From signing the franchise agreement to launching your first batch, the typical timeline is 60-90 days. This includes: site approval and setup (30 days), faculty recruitment and training (30 days), marketing launch and student enrolment (30 days). Our launch support team guides you through each phase with clear milestones and checklists."
  },
  {
    question: "What courses can a Wings franchise offer?",
    answer: "Franchisees can offer all five core programmes: Air Hostess & Cabin Crew Training, Airport Management & Ground Staff, Hotel Management Diploma, Culinary Arts Certificate, and Travel & Tourism Management. Additionally, you can offer our Personality Development (Makeover) programme as a standalone or add-on course. Each programme comes with complete curriculum, assessment frameworks, and certification guidelines."
  }
];

// --- SCHEMA.ORG GENERATION ---
const generateFranchiseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://wingsinstitute.com/franchise/#service",
    "name": "Wings Institute Franchise Opportunity",
    "description": "Education franchise opportunity in aviation, hospitality, and culinary training. Asset-light model with 17+ years brand legacy. Ideal for entrepreneurs in Tier-2/3 cities of Gujarat, Rajasthan, and Maharashtra.",
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://wingsinstitute.com/#organization",
      "name": "Wings Institute Air Hostess & Hotel Management",
      "foundingDate": "2008"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Gujarat",
        "containedInPlace": { "@type": "Country", "name": "India" }
      },
      {
        "@type": "State", 
        "name": "Rajasthan",
        "containedInPlace": { "@type": "Country", "name": "India" }
      },
      {
        "@type": "State",
        "name": "Maharashtra", 
        "containedInPlace": { "@type": "Country", "name": "India" }
      },
      {
        "@type": "State",
        "name": "Madhya Pradesh",
        "containedInPlace": { "@type": "Country", "name": "India" }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wings Institute Franchise Models",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Wings Institute Standard Franchise",
          "description": "Complete franchise package with all 5 course verticals, training support, and placement assistance. Investment details discussed with qualified applicants.",
          "eligibleRegion": {
            "@type": "Country",
            "name": "India"
          }
        }
      ]
    },
    "potentialAction": {
      "@type": "Action",
      "name": "Apply for Franchise",
      "target": "https://wingsinstitute.com/franchise"
    }
  };
};

const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": franchiseFaqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// --- MAIN COMPONENT ---
export const FranchiseSEOContent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Inject Schema.org JSON-LD on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Franchise Service Schema
    const franchiseScriptId = 'franchise-service-schema';
    const existingFranchiseScript = document.getElementById(franchiseScriptId);
    if (existingFranchiseScript) existingFranchiseScript.remove();

    const franchiseScript = document.createElement('script');
    franchiseScript.id = franchiseScriptId;
    franchiseScript.type = 'application/ld+json';
    franchiseScript.textContent = JSON.stringify(generateFranchiseSchema());
    document.head.appendChild(franchiseScript);

    // FAQ Schema
    const faqScriptId = 'franchise-faq-schema';
    const existingFaqScript = document.getElementById(faqScriptId);
    if (existingFaqScript) existingFaqScript.remove();

    const faqScript = document.createElement('script');
    faqScript.id = faqScriptId;
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(generateFAQSchema());
    document.head.appendChild(faqScript);

    return () => {
      const franchiseScriptToRemove = document.getElementById(franchiseScriptId);
      const faqScriptToRemove = document.getElementById(faqScriptId);
      if (franchiseScriptToRemove) franchiseScriptToRemove.remove();
      if (faqScriptToRemove) faqScriptToRemove.remove();
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-zinc-950 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Accordion Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30 hover:shadow-lg transition-all duration-300 group"
          aria-expanded={isExpanded}
          aria-controls="franchise-seo-content"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Icons.Briefcase className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                Complete Franchise Partnership Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Brand Legacy, Support Ecosystem & Business Opportunity for Entrepreneurs
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-amber-200 dark:border-amber-800/30 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <Icons.ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
        </button>

        {/* Expandable Content - Always in DOM for SEO */}
        <div
          id="franchise-seo-content"
          className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100 mt-8 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ contentVisibility: isExpanded ? 'visible' : 'auto' }}
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-amber-500 prose-h2:pl-4 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline">

            {/* ==================== SECTION 1: THE BUSINESS CASE ==================== */}
            <h2 id="business-case">Partner with Gujarat's Oldest Aviation & Hospitality Brand</h2>
            
            <p>
              <strong>Established in 2008</strong>, Wings Institute is not a new entrant seeking validation—it's a <strong>proven business model</strong> with 17+ years of operational excellence. When you partner with Wings, you're not "starting an institute from scratch." You're <strong>inheriting a legacy brand</strong> with established credibility, verified placement records, and a curriculum refined through thousands of successful graduates.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/30 my-8 not-prose">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Icons.Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Why Wings? The Competitive Advantage</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                    Unlike competitors who operate as <strong>"aggregators"</strong>—franchising brand names without real infrastructure—Wings Institute runs its own <strong>Centers of Excellence</strong> with verifiable physical assets. Our headquarters in Vadodara houses Gujarat's only <strong>Airbus A330 Mock Cabin</strong>, commercial kitchens, and fine-dine training facilities. Your students benefit from immersive training visits, giving your franchise a tangible USP that no PowerPoint-based competitor can match.
                  </p>
                </div>
              </div>
            </div>

            <h3>The Wings Franchise Proposition</h3>

            <ul>
              <li><strong>Brand Equity:</strong> 17+ years of brand recognition in Gujarat, with alumni at Qatar Airways, Emirates, IndiGo, Taj Hotels, and more</li>
              <li><strong>Curriculum Ownership:</strong> We develop, own, and continuously update our curriculum—no third-party dependencies</li>
              <li><strong>Placement Infrastructure:</strong> Centralised placement cell handles student jobs; you focus on admissions and training</li>
              <li><strong>Technology Edge:</strong> Proprietary AI Career Navigator, Interview Coach, and PA Simulator tools included</li>
              <li><strong>Lower Capital Risk:</strong> Asset-light model with competitive investment requirements—discuss details in our discovery session</li>
            </ul>

            {/* ==================== SECTION 2: FRANCHISE MODEL ==================== */}
            <h2 id="model">The Asset-Light Franchise Model</h2>

            <p>
              The Wings franchise model is designed for <strong>operational efficiency</strong>. While traditional education franchises require massive upfront investment in infrastructure, our "Hub and Spoke" model centralises expensive assets at headquarters while franchisees operate lean, high-margin training centers. Complete financial details are shared with qualified franchise applicants during our confidential discovery process.
            </p>

            {/* Franchise Overview Table */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <caption className="text-left text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">
                  Wings Institute Franchise: Key Parameters
                </caption>
                <thead>
                  <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                    <th className="px-5 py-4 text-left font-bold text-sm uppercase tracking-wider">Parameter</th>
                    <th className="px-5 py-4 text-left font-bold text-sm uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900">
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">Area Required</td>
                    <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">1,500 - 2,000 Sq.ft. (Commercial)</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">Investment Model</td>
                    <td className="px-5 py-4 text-amber-600 dark:text-amber-400 font-bold">Asset-Light • Competitive Terms</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">Financial Details</td>
                    <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">Discussed During Discovery Session</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">Revenue Model</td>
                    <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">Franchisee-Friendly Terms (Below Industry Standard)</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">Launch Timeline</td>
                    <td className="px-5 py-4 text-emerald-600 dark:text-emerald-400 font-bold">60-90 Days from Agreement</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-5 py-4 font-semibold text-zinc-900 dark:text-white">Support Included</td>
                    <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">Recruitment, Train-the-Trainer, Marketing Collateral, Placement Support</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Comparison Table */}
            <h3>Wings vs. Competition: Why We Stand Out</h3>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-white">
                    <th className="px-4 py-4 text-left font-bold text-sm uppercase tracking-wider">Factor</th>
                    <th className="px-4 py-4 text-center font-bold text-sm uppercase tracking-wider bg-amber-600">Wings Institute</th>
                    <th className="px-4 py-4 text-center font-bold text-sm uppercase tracking-wider">Typical Competitors</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 text-sm">
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Investment Model</td>
                    <td className="px-4 py-3 text-center text-amber-600 font-bold bg-amber-50 dark:bg-amber-950/20">Asset-Light Model</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">Heavy Infrastructure Required</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Revenue Terms</td>
                    <td className="px-4 py-3 text-center text-amber-600 font-bold bg-amber-50 dark:bg-amber-950/20">Below Industry Standard</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">Higher Revenue Share</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Own Infrastructure</td>
                    <td className="px-4 py-3 text-center bg-amber-50 dark:bg-amber-950/20"><span className="text-emerald-600">✓ A330 Mock Cabin</span></td>
                    <td className="px-4 py-3 text-center text-zinc-400">Partnerships Only / Limited</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Brand Legacy</td>
                    <td className="px-4 py-3 text-center text-amber-600 font-bold bg-amber-50 dark:bg-amber-950/20">Since 2008 (17 yrs)</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">Varies</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">AI/Tech Tools</td>
                    <td className="px-4 py-3 text-center bg-amber-50 dark:bg-amber-950/20"><span className="text-emerald-600">✓ Proprietary Suite</span></td>
                    <td className="px-4 py-3 text-center text-zinc-400">Basic / Third-party</td>
                  </tr>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Placement Support</td>
                    <td className="px-4 py-3 text-center bg-amber-50 dark:bg-amber-950/20"><span className="text-emerald-600">✓ Centralised Cell</span></td>
                    <td className="px-4 py-3 text-center text-zinc-400">Franchisee Managed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ==================== SECTION 3: MARKET OPPORTUNITY ==================== */}
            <h2 id="market">The Boom in Indian Aviation Training</h2>

            <p>
              India's aviation sector is experiencing <strong>unprecedented growth</strong>. With IndiGo, Air India, and Akasa Air collectively ordering over <strong>1,100+ aircraft</strong> in the next decade, the demand for trained cabin crew, ground staff, and hospitality professionals is exploding. This isn't speculation—it's confirmed order books.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
                <div className="text-4xl font-black text-amber-600 mb-2">1,100+</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Aircraft on Order</div>
                <div className="text-xs text-zinc-500 mt-1">IndiGo, Air India, Akasa</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
                <div className="text-4xl font-black text-emerald-600 mb-2">50,000+</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Cabin Crew Required</div>
                <div className="text-xs text-zinc-500 mt-1">Per Year by 2030</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">₹35 Lakh Cr</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Tourism Sector by 2030</div>
                <div className="text-xs text-zinc-500 mt-1">10% of India's GDP</div>
              </div>
            </div>

            <h3>The Tier-2/3 City Opportunity</h3>

            <p>
              Here's the strategic insight: <strong>major cities are saturated</strong>. Mumbai, Delhi, and Bangalore have dozens of aviation academies competing for students. But cities like <strong>Rajkot, Surat, Bhavnagar, Udaipur, Nashik, and Indore</strong> have massive aspirational youth populations with limited access to quality training.
            </p>

            <p>
              A Wings franchise in these cities captures students who would otherwise travel to metro cities—or worse, join substandard local institutes. You're not competing with Frankfinn in Mumbai; you're offering <strong>metro-quality training in their hometown</strong>.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30 my-8">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <Icons.TrendingUp className="w-5 h-5 text-blue-600" />
                Target Markets: Where Wings is Expanding
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Gujarat</div>
                  <div className="text-zinc-600 dark:text-zinc-400">Rajkot, Surat, Bhavnagar, Jamnagar, Junagadh</div>
                </div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Rajasthan</div>
                  <div className="text-zinc-600 dark:text-zinc-400">Jaipur, Udaipur, Jodhpur, Kota</div>
                </div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Maharashtra</div>
                  <div className="text-zinc-600 dark:text-zinc-400">Nashik, Nagpur, Aurangabad, Kolhapur</div>
                </div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white">Madhya Pradesh</div>
                  <div className="text-zinc-600 dark:text-zinc-400">Indore, Bhopal, Gwalior, Jabalpur</div>
                </div>
              </div>
            </div>

            {/* ==================== SECTION 4: SUPPORT ECOSYSTEM ==================== */}
            <h2 id="support">Operational Handholding: You're Never Alone</h2>

            <p>
              The number one reason education franchises fail is <strong>lack of operational support</strong> after the initial launch. At Wings, we've built a comprehensive support ecosystem that ensures your success:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              
              {/* Curriculum Support */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Icons.BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Curriculum Updates</h4>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  Monthly curriculum updates reflecting latest industry trends. Integration of <strong>AI tools</strong> (Career Navigator, Interview Coach), <strong>VR simulations</strong>, and emerging airline requirements. Your students always learn what's current.
                </p>
              </div>

              {/* Faculty Training */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Icons.GraduationCap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Train-the-Trainer</h4>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  Quarterly certification programmes at Vadodara HQ. Your faculty trains on our <strong>A330 mock cabin</strong>, learns grooming standards from industry veterans, and receives teaching methodology certification.
                </p>
              </div>

              {/* Placement Support */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Icons.Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Centralised Placements</h4>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  <strong>We handle placements. You focus on admissions.</strong> Our centralised placement cell manages relationships with IndiGo, Vistara, Air India, Taj Hotels, Marriott, and 50+ hiring partners. Franchise students get equal placement priority.
                </p>
              </div>

              {/* Marketing Support */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                    <Icons.Globe className="w-5 h-5 text-pink-600" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Marketing Arsenal</h4>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  Complete marketing toolkit: <strong>Social media templates</strong>, newspaper ad designs, banner creatives, video content, lead generation landing pages, and WhatsApp marketing scripts. Launch with professional branding from Day 1.
                </p>
              </div>
            </div>

            {/* ==================== SECTION 5: FAQ SCHEMA ==================== */}
            <h2 id="faq">Franchise Queries: Frequently Asked Questions</h2>
            
            <div className="space-y-4 my-8 not-prose">
              {franchiseFaqData.map((faq, idx) => (
                <details 
                  key={idx} 
                  open
                  className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="font-semibold text-zinc-900 dark:text-white pr-4 text-sm md:text-base">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                      <Icons.ChevronDown className="w-4 h-4 text-zinc-500" />
                    </div>
                  </summary>
                  <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 rounded-2xl text-white text-center my-12 not-prose">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Your Aviation Training Business?</h3>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                Join Gujarat's oldest aviation brand with 17+ years of proven placements. Schedule a confidential discovery call to discuss partnership terms with our Franchise Development team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#franchise-form"
                  className="px-8 py-4 bg-white text-amber-600 rounded-full font-bold hover:bg-amber-50 transition-colors flex items-center gap-2"
                >
                  Apply for Franchise <Icons.ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="tel:+918758754444" 
                  className="px-8 py-4 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-400 transition-colors flex items-center gap-2"
                >
                  <Icons.Phone className="w-4 h-4" /> +91-8758754444
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Noscript Fallback */}
        <noscript>
          <div className="prose prose-lg max-w-none mt-8">
            <h2>Wings Institute Franchise Opportunity</h2>
            <p>Partner with Gujarat's oldest aviation and hospitality training brand. Established 2008, Wings Institute offers an asset-light franchise model with comprehensive support including curriculum, training, and centralised placements.</p>
            
            <h2>Franchise Overview</h2>
            <p>Area: 1,500-2,000 sq.ft. | Model: Asset-Light | Launch Timeline: 60-90 Days | Financial terms discussed with qualified applicants.</p>
            
            <h2>Support Included</h2>
            <p>Train-the-Trainer programmes, monthly curriculum updates, marketing collateral, centralised placement support, and access to AI-powered learning tools.</p>
            
            <p>Contact: +91-8758754444 | Email: info@wingsinstitute.com</p>
          </div>
        </noscript>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          #franchise-seo-content {
            max-height: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FranchiseSEOContent;

