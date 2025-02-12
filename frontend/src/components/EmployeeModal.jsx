import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid2 } from '@mui/material';
import { useState } from 'react';

const EmployeeModal = ({ open, handleClose, inputFields }) => {
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Cadastro</DialogTitle>
            <DialogContent>
                <Grid2 container spacing={2}>
                    {inputFields.map((field, index) => (
                        <Grid2 item xs={6} key={index}>
                        <div className="input-container">
                            
                            <input
                                type={field.type || 'text'}
                                required
                                className="input-field"
                                placeholder={field.label}
                                onFocus={() => setFocusedInput(index)}
                                onBlur={() => setFocusedInput(null)}
                                style={{
                                    width: "250px",
                                    height: "40px",
                                    padding: "10px",
                                    border: focusedInput === index? "2px solid #515ea6" : "1px solid #ccc",
                                    borderRadius: "5px",
                                    transition: "border-color 0.3s ease",
                                    fontSize: "14px",
                                    outline: "none",
                                }}
                            />
                            
                        </div>
                    </Grid2>
                    ))}
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="primary" sx={{backgroundColor: "#515EA6"}}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeModal;
