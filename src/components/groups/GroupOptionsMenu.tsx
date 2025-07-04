
import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface GroupOptionsMenuProps {
  groupId: number;
  groupName: string;
}

export const GroupOptionsMenu = ({ groupId, groupName }: GroupOptionsMenuProps) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/groups/manage/${groupId}`);
    toast({
      title: "Edit Group",
      description: `Opening edit page for ${groupName}`,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${groupName}"?`)) {
      toast({
        title: "Group Deleted",
        description: `${groupName} has been deleted successfully.`,
      });
    }
  };

  const handleManageMembers = () => {
    navigate(`/groups/view/${groupId}/members`);
    toast({
      title: "Manage Members",
      description: `Opening member management for ${groupName}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleUpdate}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Group
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleManageMembers}>
          <Users className="mr-2 h-4 w-4" />
          Manage Members
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
