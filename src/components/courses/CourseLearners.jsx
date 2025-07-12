import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { AddLearnerModal } from './AddLearnerModal';

import { useParams } from 'react-router-dom';

/**
 * @typedef {object} Learner
 * @property {string} id - A unique identifier or initials for the learner.
 * @property {string} name - The full name of the learner.
 * @property {string} email - The email address of the learner.
 * @property {string} role - The role of the user in the course (e.g., 'Learner', 'Instructor').
 * @property {number} progress - The completion progress percentage.
 * @property {string} status - The current status of the learner (e.g., 'Active', 'Pending').
 * @property {string} enrolled - The date the learner was enrolled.
 */

const CourseLearners = () => {
  const { courseId } = useParams();
  const [isAddLearnerOpen, setIsAddLearnerOpen] = useState(false);
  const [isEditLearnerOpen, setIsEditLearnerOpen] = useState(false);
  const [currentLearner, setCurrentLearner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLearners, setSelectedLearners] = useState([]);
  const [learners, setLearners] = useState([
    {
      id: 'JS',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Learner',
      progress: 75,
      status: 'Active',
      enrolled: '2024-01-15'
    },
    {
      id: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Instructor',
      progress: 60,
      status: 'Active',
      enrolled: '2024-01-16'
    },
    {
      id: 'MW',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      role: 'Learner',
      progress: 85,
      status: 'Active',
      enrolled: '2024-01-17'
    },
    {
      id: 'ED',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'Admin',
      progress: 40,
      status: 'Pending',
      enrolled: '2024-01-19'
    }
  ]);

  const stats = {
    totalParticipants: learners.length,
    active: learners.filter(l => l.status === 'Active').length,
    pending: learners.filter(l => l.status === 'Pending').length,
    avgProgress: learners.reduce((acc, curr) => acc + curr.progress, 0) / learners.length
  };

  const filteredLearners = learners.filter(learner =>
    learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditLearner = (learner) => {
    setCurrentLearner(learner);
    setIsEditLearnerOpen(true);
  };

  const handleUpdateLearner = (updatedLearner) => {
    setLearners(learners.map(learner => 
      learner.id === updatedLearner.id ? updatedLearner : learner
    ));
    setIsEditLearnerOpen(false);
  };

  /**
   * Returns the appropriate color classes for a given role.
   * @param {string} role - The user's role.
   * @returns {string} Tailwind CSS color classes.
   */
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'learner':
        return 'bg-blue-100 text-blue-800';
      case 'instructor':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Returns the appropriate color classes for a given status.
   * @param {string} status - The user's status.
   * @returns {string} Tailwind CSS color classes.
   */
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Learners</h1>
          <p className="text-gray-600">Manage course participants and their roles</p>
        </div>
        <Button 
          onClick={() => setIsAddLearnerOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Learner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{Math.round(stats.avgProgress)}%</div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Course Participants Table */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Course Participants</h2>
          </div>

          <div className="space-y-3">
            {filteredLearners.map((learner) => (
              <div key={learner.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded font-medium text-sm">
                  {learner.id}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{learner.name}</span>
                    <Badge className={`text-xs ${getRoleColor(learner.role)}`}>
                      {learner.role}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{learner.email}</div>
                  <div className="text-xs text-gray-500">Enrolled: {learner.enrolled}</div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-blue-600">{learner.progress}%</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
                
                <div>
                  <Badge className={`text-xs ${getStatusColor(learner.status)}`}>
                    {learner.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleEditLearner(learner)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddLearnerModal 
        open={isAddLearnerOpen}
        onOpenChange={setIsAddLearnerOpen}
        courseId={courseId || ''}
      />
      
      {currentLearner && (
        <EditLearnerModal
          open={isEditLearnerOpen}
          onOpenChange={setIsEditLearnerOpen}
          learner={currentLearner}
          onSave={handleUpdateLearner}
        />
      )}
    </div>
  );
};

const EditLearnerModal = ({ open, onOpenChange, learner, onSave }) => {
  const [formData, setFormData] = useState({ ...learner });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Learner</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <Input name="role" value={formData.role} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Progress (%)</label>
            <Input type="number" name="progress" value={formData.progress} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <Input name="status" value={formData.status} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseLearners;