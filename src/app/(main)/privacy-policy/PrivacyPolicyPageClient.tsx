'use client';

import React from 'react';

export function PrivacyPolicyPageClient() {
  return (
    <div className="min-h-screen pt-3 pb-20 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="glass-panel p-8 md:p-12 rounded-[32px] text-zinc-600 dark:text-zinc-300 space-y-6 leading-relaxed">
          <p><strong>Last Updated: November 2025</strong></p>
          
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white pt-4">1. Introduction</h2>
          <p>Wings Institute (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or apply for our courses.</p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white pt-4">2. Information We Collect</h2>
          <p>We collect information that you voluntarily provide when you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fill out an application or inquiry form.</li>
            <li>Contact us via phone, email, or WhatsApp.</li>
            <li>Use our AI training tools.</li>
          </ul>
          <p>This may include your name, contact details, educational qualification, and audio recordings (specifically for the PA Simulator and Interview Coach tools).</p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white pt-4">3. Use of Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process your admission application.</li>
            <li>Provide academic counseling and career guidance.</li>
            <li>Improve our AI tools and training modules.</li>
            <li>Send you updates about course batches and placement drives.</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white pt-4">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data. Your audio recordings used in AI tools are processed for analysis and are not shared with third parties for marketing purposes.</p>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white pt-4">5. Contact Us</h2>
          <p>If you have questions about this policy, please contact us at <strong>info@wingsinstitute.com</strong>.</p>
        </div>
      </div>
    </div>
  );
}

