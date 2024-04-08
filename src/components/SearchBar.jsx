import { useState} from 'react';
import { TextField, Menu, MenuItem, Box,InputAdornment,Button, Paper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
// import { useHistory } from 'react-router-dom';

const SearchBar = ({onSearch}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const options = ['Search by Pokemon Number', 'Search by Pokemon name'];
    const [searchType, setSearchType] = useState('');
    // const [searchTerm, setSearchTerm] = useState('');
  
    const [query, setQuery] = useState('');
  
    const handleMenueClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    
  const handleOptionClick = (option) => {
    setSearchType(option);
    handleMenuClose();
  };
  

  const handleSearch = () => {
    onSearch(searchType, query);

  };

  return (
    <Box sx={{m:4,width: '50%'}}>
        <Paper>
          <TextField
            variant="outlined"
            placeholder={searchType || 'Search'}
            onChange={(e)=>setQuery(e.target.value)}
            InputProps={{
               startAdornment: (
                   <InputAdornment position="start">
                     <Button onClick={handleMenueClick}>
                       <ArrowDropDownIcon />
                     </Button>
                  </InputAdornment>
                ),
              endAdornment: (
                 <InputAdornment position="end">
                   <Button onClick={handleSearch}>
                      <SearchIcon />
                   </Button>
                 </InputAdornment>
                ),
          }}
          sx={{width:'100%'}}
      />
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
    </Box>
  );
};

export default SearchBar