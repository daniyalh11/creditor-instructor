
import { useState } from 'react';

export type DialogType = string;

export function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('');
  const [dialogData, setDialogData] = useState<any>(null);

  const openDialog = (type: DialogType, data?: any) => {
    setDialogType(type);
    setDialogData(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogData(null);
  };

  const toggleDialog = (type: DialogType, data?: any) => {
    if (isDialogOpen && dialogType === type) {
      closeDialog();
    } else {
      openDialog(type, data);
    }
  };

  return {
    isDialogOpen,
    dialogType,
    dialogData,
    openDialog,
    closeDialog,
    toggleDialog
  };
}
