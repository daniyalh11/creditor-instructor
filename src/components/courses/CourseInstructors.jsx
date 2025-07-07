import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Mail, MoreHorizontal } from 'lucide-react';
import { AddCoInstructorsDialog } from './AddCoInstructorsDialog';

const CourseInstructors = () => {
  const { courseId } = useParams();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Mock instructor data
  const instructors = [
    {
      id: '1',
      name: 'Instructor, Demo',
      avatar: '/placeholder.svg',
      isOwner: true,
      lastVisited: '1 minute ago'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Instructors</h1>
        <Button 
          onClick={() => setAddDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <Card className="p-4">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="default" className="bg-blue-500 text-white rounded-full px-4 py-1">
            Active 1
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Message
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Owner?</TableHead>
              <TableHead>Last visited</TableHead>
              <TableHead>More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={instructor.avatar} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-blue-600 font-medium">{instructor.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {instructor.isOwner && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </TableCell>
                <TableCell className="text-gray-600">
                  {instructor.lastVisited}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AddCoInstructorsDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        courseId={courseId || ''}
      />
    </div>
  );
};

export default CourseInstructors;