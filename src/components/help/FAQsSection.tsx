
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqCategories = [
  {
    title: 'General Information',
    icon: '💡',
    faqs: [
      {
        question: 'How do I enroll in a course?',
        answer: 'You can enroll in a course by navigating to the course catalog, selecting your desired course, and clicking on the "Enroll" button. Payment options will be presented if the course requires payment.'
      },
      {
        question: 'How do I track my progress?',
        answer: 'Navigate to your dashboard to view your course progress, completed modules, and upcoming assignments.'
      },
      {
        question: 'How do I join a study group?',
        answer: 'Go to the Groups section and browse available study groups or create your own by clicking "Create Group".'
      }
    ]
  },
  {
    title: 'Courses & Learning',
    icon: '📚',
    faqs: [
      {
        question: 'How do I create a new course?',
        answer: 'Navigate to the Courses section and click "Add Course". Fill in the course details, add modules and content, then publish when ready.'
      },
      {
        question: 'How do I add assessments to my course?',
        answer: 'In the course builder, go to the module where you want to add an assessment and select from various assessment types like quizzes, assignments, or projects.'
      },
      {
        question: 'How do I manage course enrollments?',
        answer: 'Go to your course administration panel to view enrolled students, manage access, and send invitations.'
      }
    ]
  },
  {
    title: 'Technical Support',
    icon: '⚙️',
    faqs: [
      {
        question: 'What browsers are supported?',
        answer: 'Our platform supports all modern browsers including Chrome, Firefox, Safari, and Edge. Make sure your browser is up to date for the best experience.'
      },
      {
        question: 'How do I upload large files?',
        answer: 'Large files can be uploaded through the Resources section. Files up to 100MB are supported for most content types.'
      },
      {
        question: 'Why am I experiencing slow loading times?',
        answer: 'Slow loading can be caused by internet connection issues, browser cache, or server load. Try clearing your browser cache or contact support if issues persist.'
      }
    ]
  },
  {
    title: 'Billing & Payments',
    icon: '💳',
    faqs: [
      {
        question: 'How do I update my payment information?',
        answer: 'Go to Account Settings > Billing to update your payment methods and billing information.'
      },
      {
        question: 'Can I get a refund for a course?',
        answer: 'Refund policies vary by course. Please check the course details or contact support for specific refund requests.'
      },
      {
        question: 'How do I download my invoice?',
        answer: 'Visit your Account Settings > Billing > Invoice History to download past invoices.'
      }
    ]
  }
];

export const FAQsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['General Information']);
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFAQ = (question: string) => {
    setExpandedFAQs(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-2">Find answers to common questions about our platform</p>
        </div>
        <Button variant="outline">View All FAQs</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.title);
          return (
            <Card key={category.title} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category.title)}
              >
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.title}</span>
                    <span className="text-sm text-gray-500">({category.faqs.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {isExpanded ? 'Hide' : 'Show'}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.faqs.map((faq) => {
                      const isFAQExpanded = expandedFAQs.includes(faq.question);
                      return (
                        <div key={faq.question} className="border-l-2 border-gray-100 pl-4">
                          <button
                            onClick={() => toggleFAQ(faq.question)}
                            className="w-full text-left py-3 flex items-center justify-between hover:bg-gray-50 rounded px-2 transition-colors"
                          >
                            <h4 className="font-medium text-gray-900">{faq.question}</h4>
                            {isFAQExpanded ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                          {isFAQExpanded && (
                            <div className="px-2 pb-3">
                              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
