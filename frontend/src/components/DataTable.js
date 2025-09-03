import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography,
  TablePagination, TextField, Box, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const DataTable = ({ data, title, entityType }) => {
  // État pour la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // État pour le filtre de recherche
  const [searchTerm, setSearchTerm] = useState('');
  
  // Déterminer les noms de propriétés en fonction du type d'entité
  const getIdProperty = () => {
    switch (entityType) {
      case 'offer': return 'offer_id';
      case 'affiliate': return 'affiliate_id';
      case 'advertiser': return 'advertiser_id';
      default: return 'id';
    }
  };

  const getNameProperty = () => {
    switch (entityType) {
      case 'offer': return 'offer_name';
      case 'affiliate': return 'affiliate_name';
      case 'advertiser': return 'advertiser_name';
      default: return 'name';
    }
  };

  // Formater les valeurs monétaires
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(row => {
    const searchValue = searchTerm.toLowerCase();
    const nameProperty = getNameProperty();
    const idProperty = getIdProperty();
    
    return (
      row[nameProperty]?.toLowerCase().includes(searchValue) ||
      String(row[idProperty]).toLowerCase().includes(searchValue)
    );
  });
  
  // Gérer le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Gérer le changement du nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Gérer le changement du terme de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Revenir à la première page lors d'une nouvelle recherche
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      
      {/* Champ de recherche */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher par nom ou ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Payout</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row[getIdProperty()]}>
                  <TableCell>{row[getIdProperty()]}</TableCell>
                  <TableCell>{row[getNameProperty()]}</TableCell>
                  <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.payout)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.profit)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
      />
    </Paper>
  );
};

export default DataTable;