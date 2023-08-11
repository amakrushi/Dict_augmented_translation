import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function Popup(props: any) {
  const [openDialog, setOpenDialog] = useState(props?.postResponseContent ? true : false);

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Translations</DialogTitle>
        <DialogContent>
        {props?.postResponseContent?.map((line: any, index: number) => (
            <DialogContentText key={index}>
              {line[0]} - {line[2]}
            </DialogContentText>
          ))}
        </DialogContent>
      </Dialog>
  )
}

export default Popup