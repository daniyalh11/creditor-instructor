import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Calendar as CalendarIcon, Search, Filter, Download, Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CourseAttendance = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const students = [
    {
      id: 'JS',
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'JS',
      attendance: {
        present: 8,
        absent: 2,
        late: 1,
        percentage: 80
      }
    },
    {
      id: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'SJ',
      attendance: {
        present: 10,
        absent: 0,
        late: 1,
        percentage: 95
      }
    },
    {
      id: 'MW',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      avatar: 'MW',
      attendance: {
        present: 7,
        absent: 3,
        late: 1,
        percentage: 70
      }
    },
    {
      id: 'ED',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      avatar: 'ED',
      attendance: {
        present: 9,
        absent: 1,
        late: 1,
        percentage: 85
      }
    }
  ];

  const attendanceSessions = [
    {
      id: 1,
      date: '2024-01-15',
      topic: 'Introduction to React',
      totalStudents: 4,
      present: 3,
      absent: 1,
      late: 0
    },
    {
      id: 2,
      date: '2024-01-17',
      topic: 'Component Lifecycle',
      totalStudents: 4,
      present: 4,
      absent: 0,
      late: 0
    },
    {
      id: 3,
      date: '2024-01-19',
      topic: 'State Management',
      totalStudents: 4,
      present: 2,
      absent: 1,
      late: 1
    }
  ];

  const dailyAttendance = [
    { studentId: 'JS', status: 'present', time: '09:00 AM', notes: '' },
    { studentId: 'SJ', status: 'present', time: '09:05 AM', notes: '' },
    { studentId: 'MW', status: 'late', time: '09:15 AM', notes: 'Traffic delay' },
    { studentId: 'ED', status: 'absent', time: '', notes: 'Sick leave' }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceStatus = (studentId) => {
    const attendance = dailyAttendance.find(a => a.studentId === studentId);
    return attendance?.status || 'absent';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStudentSelect = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Take Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{students.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Avg Attendance</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{attendanceSessions.length}</div>
                <div className="text-sm text-gray-600">Sessions Recorded</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Frequent Absences</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details" className="px-6 py-2">Daily Attendance</TabsTrigger>
          <TabsTrigger value="summary" className="px-6 py-2">Summary</TabsTrigger>
          <TabsTrigger value="sessions" className="px-6 py-2">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daily Attendance - {format(selectedDate, 'PPP')}</CardTitle>
                <div className="flex items-center gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const status = getAttendanceStatus(student.id);
                    const attendance = dailyAttendance.find(a => a.studentId === student.id);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={() => handleStudentSelect(student.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(status)}
                            <Badge className={`${getStatusColor(status)} text-xs`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{attendance?.time || '-'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{attendance?.notes || '-'}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Attendance %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-xs">
                            {student.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{student.attendance.present}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{student.attendance.absent}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-600 font-medium">{student.attendance.late}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${student.attendance.percentage >= 80 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {student.attendance.percentage}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <span className="font-medium">{format(new Date(session.date), 'PPP')}</span>
                      </TableCell>
                      <TableCell>{session.topic}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{session.totalStudents}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{session.present}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{session.absent}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-600 font-medium">{session.late}</span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseAttendance;