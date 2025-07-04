import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, FileText, Video, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const guideCategories = [
  { name: 'All Guides', count: 21 },
  { name: 'Getting Started', count: 8 },
  { name: 'Courses & Learning', count: 12 },
  { name: 'Account Settings', count: 5 },
  { name: 'Billing & Payments', count: 6 },
  { name: 'Technical Support', count: 7 }
];

const popularGuides = [
  {
    type: 'article',
    title: 'Account Setup and Profile Customization',
    description: 'Learn how to set up your account and customize your profile settings.',
    category: 'Getting Started',
    readTime: '5 min read',
    icon: FileText
  },
  {
    type: 'video',
    title: 'Navigating the Learning Dashboard',
    description: 'A complete tour of all dashboard features and how to use them effectively.',
    category: 'Getting Started',
    readTime: '8 min read',
    icon: Video
  },
  {
    type: 'article',
    title: 'Course Enrollment and Progress Tracking',
    description: 'Step-by-step guide to enrolling in courses and tracking your learning progress.',
    category: 'Courses & Learning',
    readTime: '6 min read',
    icon: FileText
  },
  {
    type: 'article',
    title: 'Creating and Managing Courses',
    description: 'Complete guide for instructors on how to create, structure, and manage courses.',
    category: 'Courses & Learning',
    readTime: '12 min read',
    icon: FileText
  },
  {
    type: 'video',
    title: 'Setting Up Group Discussions',
    description: 'Learn how to create study groups and facilitate meaningful discussions.',
    category: 'Courses & Learning',
    readTime: '10 min read',
    icon: Video
  },
  {
    type: 'article',
    title: 'Managing Your Billing Information',
    description: 'Learn how to update payment methods and manage billing preferences.',
    category: 'Billing & Payments',
    readTime: '7 min read',
    icon: FileText
  },
  {
    type: 'article',
    title: 'Creating Assessments and Quizzes',
    description: 'Comprehensive guide to building various types of assessments for your courses.',
    category: 'Courses & Learning',
    readTime: '15 min read',
    icon: FileText
  },
  {
    type: 'article',
    title: 'Accessibility Features for All Users',
    description: 'Discover the accessibility features available throughout the platform.',
    category: 'Technical Support',
    readTime: '10 min read',
    icon: FileText
  }
];

export const UserGuidesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Guides');
  const [selectedTab, setSelectedTab] = useState('Popular Guides');
  const navigate = useNavigate();

  const filteredGuides = popularGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Guides' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSupportClick = () => {
    navigate('/help?section=contact');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Guides</h1>
        <p className="text-gray-600 mt-2">Explore our comprehensive guides to help you make the most of our platform.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search guides and tutorials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {guideCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.name
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        {['Popular Guides', 'Recently Added', 'Quick Tips'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`pb-2 px-1 font-medium transition-colors ${
              selectedTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGuides.map((guide, index) => {
          const IconComponent = guide.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    guide.type === 'video' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <IconComponent className={`h-5 w-5 ${
                      guide.type === 'video' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        {guide.type}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{guide.category}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Can't find what you're looking for?</h3>
              <p className="text-gray-600">Our support team is always ready to help with any questions you might have.</p>
            </div>
            <Button variant="default" onClick={handleContactSupportClick}>
              Contact Support <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
