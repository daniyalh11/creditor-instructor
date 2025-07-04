
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface QuizAnalyticsTabProps {
  quiz: any;
}

const scoreDistributionData = [
  { range: '90-100', count: 8, percentage: 18 },
  { range: '80-89', count: 12, percentage: 27 },
  { range: '70-79', count: 15, percentage: 33 },
  { range: '60-69', count: 7, percentage: 16 },
  { range: '50-59', count: 3, percentage: 6 }
];

const statusData = [
  { name: 'Completed', value: 32, color: '#10B981' },
  { name: 'In Progress', value: 8, color: '#F59E0B' },
  { name: 'Not Attempted', value: 5, color: '#6B7280' }
];

export const QuizAnalyticsTab = ({ quiz }: QuizAnalyticsTabProps) => {
  // Analytics data
  const totalAttempts = 85;
  const totalQuestions = quiz.questions || 10;
  const passedParticipants = 68;
  const failedParticipants = 17;
  const averageScore = 78;
  const highestScore = 95;
  const lowestScore = 52;
  const maxScore = quiz.maxScore || 100;
  const minScore = quiz.minScore || 0;
  const timeEstimate = quiz.timeLimit || 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quiz Analytics</h3>
          <p className="text-sm text-gray-600">Comprehensive analysis of quiz performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="h-5 w-5 text-blue-600">📊</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{totalAttempts}</p>
                <p className="text-sm text-gray-600">Total Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="h-5 w-5 text-purple-600">❓</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{totalQuestions}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="h-5 w-5 text-green-600">✅</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{passedParticipants}</p>
                <p className="text-sm text-gray-600">Passed Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="h-5 w-5 text-red-600">❌</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{failedParticipants}</p>
                <p className="text-sm text-gray-600">Failed Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="h-5 w-5 text-blue-600">📈</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{averageScore}%</p>
                <p className="text-sm text-gray-600">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="h-5 w-5 text-green-600">🏆</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{highestScore}%</p>
                <p className="text-sm text-gray-600">Highest Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="h-5 w-5 text-red-600">📉</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{lowestScore}%</p>
                <p className="text-sm text-gray-600">Lowest Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <div className="h-5 w-5 text-orange-600">🎯</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{maxScore}</p>
                <p className="text-sm text-gray-600">Max Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <div className="h-5 w-5 text-gray-600">📏</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{minScore}</p>
                <p className="text-sm text-gray-600">Min Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <div className="h-5 w-5 text-indigo-600">⏱️</div>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">{timeEstimate} min</p>
                <p className="text-sm text-gray-600">Time Estimate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Submission Status */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
