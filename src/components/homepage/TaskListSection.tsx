
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function TaskListSection() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review course materials', completed: false, deadline: 'Today', priority: 'high' },
    { id: 2, title: 'Grade assignments', completed: true, deadline: 'Yesterday', priority: 'medium' },
    { id: 3, title: 'Prepare quiz questions', completed: false, deadline: 'Tomorrow', priority: 'high' },
    { id: 4, title: 'Update course syllabus', completed: false, deadline: 'In 2 days', priority: 'medium' },
    { id: 5, title: 'Schedule office hours', completed: false, deadline: 'Next week', priority: 'low' },
  ]);

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast.success(task.completed ? `Task unmarked: ${task.title}` : `Task completed: ${task.title}`);
    }
  };

  const handleAddTask = () => {
    navigate('/tasks');
  };

  const handleViewAllTasks = () => {
    navigate('/tasks');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4 bg-slate-50 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold flex items-center text-slate-700">
          <Calendar className="mr-2 h-5 w-5 text-slate-600" />
          Tasks
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleAddTask}
          className="h-8 w-8 p-0 rounded-full hover:bg-slate-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add task</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 max-h-[320px] overflow-y-auto">
        {tasks.length > 0 ? (
          <ul className="space-y-2 mt-4">
            {tasks.slice(0, 3).map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  task.completed 
                    ? 'bg-gray-50 text-gray-500' 
                    : 'bg-white hover:bg-slate-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <CheckCircle
                    className={`h-4 w-4 flex-shrink-0 cursor-pointer transition-colors ${
                      task.completed ? 'text-green-600' : 'text-gray-300 hover:text-slate-500'
                    }`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-slate-700'}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs py-1 px-2 rounded-md border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {task.deadline}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-24 text-gray-500">
            <p className="text-sm">No tasks yet</p>
          </div>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 hover:bg-slate-50 transition-colors border-gray-200"
          onClick={handleViewAllTasks}
        >
          View All Tasks
        </Button>
      </CardContent>
    </Card>
  );
}
