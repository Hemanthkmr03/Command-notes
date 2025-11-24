import CommandCard from '../../components/CommandCard/CommandCard';
import './CommandsPage.scss'
import { useEffect, useState } from 'react';
import { DATA_ENDPOINT } from '../../constant.ts'
import AddCommandDialog from '../../components/AddCommandDialog/AddCommandDialog.js';
import ExpandableActionButton from '../../components/Expandable Action Button/ExpandableActionButton.js';
import { useSnackbar } from '../../context/SnackbarContext.js';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.tsx';

interface CommandsPageProps {
  showEditMode: boolean;
  setShowEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Command {
  id: string;
  name: string;
}


const CommandsPage: React.FC<CommandsPageProps> = ({ showEditMode, setShowEditMode }) => {
  const [commandsList, setCommandList] = useState<Command[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { showSnackbar } = useSnackbar();




  const fetchData = async () => {
    try {
      const res = await fetch(`${DATA_ENDPOINT}.json`);
      const data = await res.json()

      const formattedData = data ? Object.keys(data).map((key) => (
        {
          id: key,
          name: data[key].name,
        })) : [];
      setCommandList(formattedData);

    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const askDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${DATA_ENDPOINT}/${id}.json`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete command,");

      setCommandList(prev => prev.filter(cmd => cmd.id !== id))
      showSnackbar("Command deleted.", "success")

    } catch (error) {
      console.log("Failed to delete command.");
      showSnackbar("Failed to deleted command.", "error")
    }
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await handleDelete(deleteId)
    }
    setConfirmOpen(false);
    setDeleteId(null);
  }

  const onCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null)
  }

  const handleEdit = async (id: string, name: string) => {
    setEditingCommand({ id, name });
    setOpenAddDialog(true)

  }


  return (
    <div className='command-container-wrapper'>
      <CommandCard
        commandsList={commandsList}
        showEditMode={showEditMode}
        onDelete={askDelete}
        onEdit={handleEdit}
      />
      <AddCommandDialog
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        refreshData={fetchData}
        editingCommand={editingCommand}
        setEditingCommand={setEditingCommand}
      />
      <ExpandableActionButton
        showEditMode={showEditMode}
        setShowEditMode={setShowEditMode}
        setOpenAddDialog={setOpenAddDialog}
      />
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={onCancel}
      />
    </div>
  )
}

export default CommandsPage