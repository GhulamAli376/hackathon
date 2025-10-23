import * as React from 'react';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Divider,
  MenuItem,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../../utilis';
import apiEndPoint from '../../constant/apiEndPoint';
import { toast } from 'react-toastify';

const categories = [
  'Desi Cuisine ',
  'Fast Food',
  'Turkish',
  'Pakistani',
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'Thai',
  'Other',
];

export default function AddRestaurant({ open, setOpen, isRefresh, setIsRefresh }) {
  const handleClose = () => setOpen(false);
  const [imageLogo, setImageLogo] = React.useState();
  const isMobile = useMediaQuery('(max-width:480px)');
  const isTablet = useMediaQuery('(max-width:768px)');

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      restaurantName: '',
      details: '',
      contactNumber: '',
      address: '',
      email: '',
      category: '',
    },
  });

  const onSubmit = async (obj) => {
    try {
      let imageUrl;
      if (imageLogo) {
        const formData = new FormData();
        formData.append('image', imageLogo);
        const response = await axios.post(`${BASE_URL}${apiEndPoint.imageLogo}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        imageUrl = response.data.url;
      }

      const updatedObj = {
        ...obj,
        imageUrl: imageUrl || null,
      };

      const response = await axios.post(`${BASE_URL}${apiEndPoint.createRestaurant}`, updatedObj, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      alert(response.data.message);
      handleClose();
      reset({});
      setIsRefresh(!isRefresh);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : isTablet ? '70%' : 400,
            maxWidth: '100%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          {/* Header */}
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6" fontWeight="bold">
              Create Restaurant
            </Typography>
            <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Stack>
          <Divider sx={{ mb: 2 }} />

          {/* Form Fields */}
          <Stack spacing={2}>
            <Controller
              control={control}
              name="restaurantName"
              render={({ field }) => (
                <TextField label="Restaurant Name" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="details"
              render={({ field }) => (
                <TextField
                  label="Details"
                  fullWidth
                  multiline
                  minRows={2}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="contactNumber"
              render={({ field }) => (
                <TextField label="Contact Number" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField label="Address" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField label="Email" type="email" fullWidth {...field} />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <TextField label="Category" fullWidth select {...field}>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              control={control}
              name="logo"
              render={({ field }) => (
                <Button variant="outlined" component="label">
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      setImageLogo(e.target.files[0]);
                    }}
                  />
                </Button>
              )}
            />
            {imageLogo && (
              <Typography color="text.secondary" variant="body2">
                Selected File: {imageLogo.name}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{ height: 48 }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
