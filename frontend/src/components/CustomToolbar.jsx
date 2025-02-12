import { IconButton, Tooltip } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';


const CustomToolbar = ({ selectedCount, onDelete }) => {
  return (
    <GridToolbarContainer>
      {selectedCount > 0 && (
        <>
          <Tooltip title="Excluir">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
