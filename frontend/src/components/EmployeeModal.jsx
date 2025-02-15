import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';

const EmployeeModal = ({ open, handleClose, inputFields, handleCpfMask }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorMessages, setErrorMessages] = useState('');
    const [empresas, setEmpresas] = useState([]);

    const [formData, setFormData] = useState({
        
    });

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/empresas");
                setEmpresas(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmpresas();
    }, []);

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
                            
                            <Grid2 item="true" xs={6} key={index}>
                                <div className="input-container">
                                    
                                {field.type === 'select' ? (
                                        <select
                                            required
                                            name={field.nome}
                                            className={field.label}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedInput(index)}
                                            onBlur={() => setFocusedInput(null)}
                                            style={{
                                                width: "250px",
                                                height: "40px",
                                                padding: "10px",
                                                border: focusedInput === index ? "2px solid #515ea6" : "1px solid #ccc",
                                                borderRadius: "5px",
                                                transition: "border-color 0.3s ease",
                                                fontSize: "14px",
                                                outline: "none",
                                            }}
                                        >
                                            
                                            {/* Adicione opções aqui, por exemplo: */}
                                            <option value=""  selected disabled>{field.label}</option>
                                            {empresas.map((empresa) => (
                                                <option key={empresa.id} value={empresa.id}>
                                                    {empresa.nome}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            required
                                            name={field.nome}
                                            className={field.label}
                                            placeholder={field.label}
                                            {...(field.type === 'text' ? { maxLength: field.length || 255 } : {})}
                                            {...(field.type === 'number' ? { max: Math.pow(10, field.length || 10) - 1 } : {})}
                                            onKeyUp={field.label === 'CPF' ? handleCpfMask : undefined}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedInput(index)}
                                            onBlur={() => setFocusedInput(null)}
                                            style={{
                                                width: "250px",
                                                height: "40px",
                                                padding: "10px",
                                                border: focusedInput === index ? "2px solid #515ea6" : "1px solid #ccc",
                                                borderRadius: "5px",
                                                transition: "border-color 0.3s ease",
                                                fontSize: "14px",
                                                outline: "none",
                                            }}
                                        />
                                    )}
                                    
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
