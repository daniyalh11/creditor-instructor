import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { X, User, Users, FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const mockUsers = [
  { id: 'JD', name: 'John Doe', email: 'john.doe@example.com' },
  { id: 'JS', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 'BW', name: 'Bob Wilson', email: 'bob.wilson@example.com' },
  { id: 'AB', name: 'Alice Brown', email: 'alice.brown@example.com' },
];

export const AddLearnerModal = ({ open, onOpenChange, onAddLearner, courseId }) => {
  const [activeTab, setActiveTab] = useState('single');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Learner');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSingleUserSelect = (userId) => {
    setSelectedUsers([userId]); // Set only the selected user
  };

  const handleAddLearner = () => {
    setIsSubmitting(true);
    
    try {
      if (activeTab === 'single' && selectedUsers.length > 0) {
        const user = mockUsers.find(u => u.id === selectedUsers[0]);
        if (user) {
          onAddLearner({
            id: user.id,
            name: user.name,
            email: user.email,
            role: selectedRole
          });
        }
      } else if (activeTab === 'multiple' && selectedUsers.length > 0) {
        // Handle multiple users
        const usersToAdd = mockUsers.filter(u => selectedUsers.includes(u.id));
        usersToAdd.forEach(user => {
          onAddLearner({
            id: user.id,
            name: user.name,
            email: user.email,
            role: selectedRole
          });
        });
      } else if (activeTab === 'csv' && csvData.trim()) {
        // Simple CSV parsing (for demo purposes)
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const userData = {};
          
          headers.forEach((header, index) => {
            userData[header.toLowerCase()] = values[index];
          });
          
          if (userData.name && userData.email) {
            onAddLearner({
              id: userData.id || `user-${i}-${Date.now()}`,
              name: userData.name,
              email: userData.email,
              role: userData.role || selectedRole
            });
          }
        }
      }
      
      // Reset form
      setSelectedUsers([]);
      setCsvData('');
      setSelectedRole('Learner');
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding learners:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto" hideCloseButton>
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Add Learners</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="single" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Single User
            </TabsTrigger>
            <TabsTrigger value="multiple" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Multiple Users
            </TabsTrigger>
            <TabsTrigger value="csv" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              CSV Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search Users</label>
                <Input
                  placeholder="Search for users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id}
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${selectedUsers.includes(user.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleSingleUserSelect(user.id)}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${selectedUsers.includes(user.id) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                    {selectedUsers.includes(user.id) && (
                      <div className="text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Learner">Learner</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddLearner}
                disabled={selectedUsers.length === 0 || isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? 'Adding...' : 'Add Learner'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="multiple" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Multiple Users</label>
                <Input
                  placeholder="Search for users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                
                <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium">Select All ({filteredUsers.length})</span>
                  </div>
                  
                  <div className="space-y-2">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleUserSelect(user.id)}
                        />
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user.id}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Default Role for All Selected Users</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Learner">Learner</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddLearner}
                disabled={(activeTab === 'single' && selectedUsers.length === 0) || 
                         (activeTab === 'multiple' && selectedUsers.length === 0) ||
                         isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? 'Adding...' : 
                 activeTab === 'single' ? 'Add Learner' : 
                 activeTab === 'multiple' ? `Add ${selectedUsers.length} Learners` : 'Add'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">CSV Format</label>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                  <div>Name,Email,Role</div>
                  <div>John Smith,john.smith@example.com,Learner</div>
                  <div>Jane Doe,jane.doe@example.com,Instructor</div>
                  <div>Bob Wilson,bob.wilson@example.com,Learner</div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Upload a CSV file with the following format:
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Paste CSV Data</label>
                <Textarea
                  placeholder="Paste your CSV data here..."
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Default Role (if not specified in CSV)</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Learner">Learner</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddLearner}
                disabled={(activeTab === 'single' && selectedUsers.length === 0) || 
                         (activeTab === 'multiple' && selectedUsers.length === 0) ||
                         isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? 'Adding...' : 
                 activeTab === 'single' ? 'Add Learner' : 
                 activeTab === 'multiple' ? `Add ${selectedUsers.length} Learners` : 'Add'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};