import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid2 } from '@mui/material';
import { useState } from 'react';

const EmployeeModal = ({ open, handleClose, inputFields }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorMessages, setErrorMessages] = useState('');

    const [formData, setFormData] = useState({
        
    });

    const handleCpfMask = (e) => {
        let value = e.target.value;
        
        // Remove all non-digits
        value = value.replace(/\D/g, '');
        
        // Apply CPF mask
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        
        // Limit to 14 characters (including dots and dash)
        value = value.substring(0, 14);
        
        // Update the input value
        e.target.value = value;
    };

    const handleInputChange = (e) => {
        setFormData((dataForm) => ({ 
            ...dataForm, 
            [e.target.name]: e.target.value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        //usando a biblioteca Axios para fazer uma requisição POST para o backend
        try {
            await axios.post("http://localhost:8000/funcionarios/cadastro", formData);
            handleClose();
            window.location.reload();
        }
        catch (error) {
            console.error(error.detail);
            handleClose();
        }
        
        
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
            <DialogTitle>Cadastro</DialogTitle>
            <form action="" onSubmit={handleSubmit} >
                <DialogContent>
                    <Grid2 container spacing={2} sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    
                        {inputFields.map((field, index) => (
                            <Grid2 item xs={6} key={index}>
                                <div className="input-container">
                                    
                                    <input
                                        type={field.type || 'text'}
                                        required
                                        name={field.nome}
                                        className={field.label}
                                        placeholder={field.label}
                                        maxLength={field.length || 255}
                                        onKeyUp={field.label === 'CPF' ? handleCpfMask : undefined}
                                        onChange={handleInputChange}
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
                    <Button onClick={handleClose} sx={{ color: "#515EA6" }}>Cancelar</Button>
                    <Button variant="contained"  type='submit' sx={{backgroundColor: "#515EA6"}}>Salvar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EmployeeModal;
