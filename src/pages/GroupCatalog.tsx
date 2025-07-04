
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { GroupOptionsMenu } from '@/components/groups/GroupOptionsMenu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { GroupJoinAccessDialog } from '@/components/groups/GroupJoinAccessDialog';
import { useToast } from "@/hooks/use-toast";

const GroupCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{id: string, name: string} | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Updated groups with eye-catching, relevant images
  const groups = [
    { 
      id: 2, 
      name: 'Customer Service Excellence', 
      members: 313, 
      type: 'Study group', 
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format', 
      enrolled: true, 
      accessRequired: false 
    },
    { 
      id: 3, 
      name: 'Education Counselor', 
      members: 313, 
      type: 'Study group', 
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop&auto=format', 
      enrolled: false, 
      accessRequired: true 
    },
    { 
      id: 5, 
      name: 'IT Management & Strategy', 
      members: 156, 
      type: 'Interest group', 
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&auto=format', 
      enrolled: true, 
      accessRequired: false 
    },
    { 
      id: 6, 
      name: 'Risk Analysis', 
      members: 89, 
      type: 'Business group', 
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&auto=format', 
      enrolled: false, 
      accessRequired: true 
    },
    { 
      id: 7, 
      name: 'Sales & Marketing', 
      members: 120, 
      type: 'Business group', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format', 
      enrolled: false, 
      accessRequired: true 
    },
    { 
      id: 8, 
      name: 'Management & Leadership', 
      members: 65, 
      type: 'Interest group', 
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format', 
      enrolled: false, 
      accessRequired: true 
    },
    { 
      id: 9, 
      name: 'Human Resources', 
      members: 42, 
      type: 'Department group', 
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop&auto=format', 
      enrolled: false, 
      accessRequired: true 
    },
    { 
      id: 10, 
      name: 'Finance & Accounting', 
      members: 78, 
      type: 'Department group', 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format', 
      enrolled: false, 
      accessRequired: true 
    },
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewGroup = (id: number) => {
    navigate(`/groups/view/${id}/about`);
  };
  
  const handleMyGroupsClick = () => {
    navigate('/groups');
  };

  const handleJoinRequest = (groupId: number, groupName: string) => {
    setSelectedGroup({ id: groupId.toString(), name: groupName });
    setAccessDialogOpen(true);
  };

  const handleDirectJoin = (groupId: number, groupName: string) => {
    toast({
      title: "Joined group successfully!",
      description: `You have been added to ${groupName}.`,
      duration: 3000,
    });
    navigate(`/groups/view/${groupId}/news`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Group Catalog" 
        description="Discover and join groups based on your interests and career goals"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleMyGroupsClick}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            My Groups
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search groups..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="interest">Interest groups</SelectItem>
              <SelectItem value="study">Study groups</SelectItem>
              <SelectItem value="business">Business groups</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All scopes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All scopes</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex gap-1 items-center">
            <Filter className="h-4 w-4" /> More filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="h-40 overflow-hidden relative">
              <img 
                src={group.image} 
                alt={group.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <Badge variant={group.enrolled ? "secondary" : "outline"} className={
                  group.enrolled 
                    ? "bg-green-100 text-green-700 border-green-200" 
                    : group.accessRequired 
                      ? "bg-orange-100 text-orange-700 border-orange-200" 
                      : "bg-blue-100 text-blue-700 border-blue-200"
                }>
                  {group.enrolled ? "Enrolled" : group.accessRequired ? "Access Required" : "Open"}
                </Badge>
                {group.enrolled && (
                  <div className="bg-white/90 rounded-md">
                    <GroupOptionsMenu groupId={group.id} groupName={group.name} />
                  </div>
                )}
              </div>
            </div>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                {group.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{group.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium">{group.members}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  {group.enrolled ? (
                    <Button 
                      variant="default" 
                      className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors"
                      onClick={() => navigate(`/groups/view/${group.id}/news`)}
                    >
                      Open
                    </Button>
                  ) : (
                    group.accessRequired ? (
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewGroup(group.id)}
                        >
                          View Info
                        </Button>
                        <Button 
                          variant="default"
                          className="flex-1 bg-orange-500 hover:bg-orange-600"
                          onClick={() => handleJoinRequest(group.id, group.name)}
                        >
                          Access Code
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewGroup(group.id)}
                        >
                          View Info
                        </Button>
                        <Button 
                          variant="default"
                          className="flex-1 bg-blue-500 hover:bg-blue-600"
                          onClick={() => handleDirectJoin(group.id, group.name)}
                        >
                          Join
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Access Code Dialog */}
      {selectedGroup && (
        <GroupJoinAccessDialog
          groupId={selectedGroup.id}
          groupName={selectedGroup.name}
          open={accessDialogOpen}
          onOpenChange={setAccessDialogOpen}
        />
      )}
    </div>
  );
};

export default GroupCatalog;
