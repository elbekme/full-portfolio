/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from 'react-toastify';

import useAccount from '../../store/account';
import request from '../../server/index';
import "../skills.css";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AccountPage: React.FC = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState<null | File>(null);





  const{
      account,
      // loading,
      getAccount,
    } = useAccount();

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  console.log(account);
  
  const [AccForm, setAccForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    address: '',
    birthday: '',
    email: '',
    facebook: '',
    github: '',
    info: '',
    instagram: '',
    phoneNumber: '',
    telegram: '',
    youtube: '',
    photo: '',
  });

  useEffect(() => {
    updateFormData();
  }, [account]);

  const updateFormData = () => {
    setAccForm((prevFormData) => ({
      ...prevFormData,
      ...account,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAccForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await request.post('auth/upload', formData);

      if (response.data) {
        setAccForm((prevFormData) => ({ ...prevFormData, photo: response.data }));
      }

      await request.put('auth/updatedetails', AccForm);

      getAccount();

      setAccForm((prevFormData) => ({ ...prevFormData, success: true }));
      toast.success('Success!');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", flexWrap: 'wrap', gap: '10px' }}>
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput onChange={handleChange}  value={AccForm.firstName}  name="firstName" placeholder="First name" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.lastName} name="lastName" placeholder="Last name" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.username} name="username" placeholder="Username" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.address} name="address" placeholder="Address" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.birthday} name="birthday" placeholder="Birthday" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.email} name="email" placeholder="Email address" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.facebook} name="facebook" placeholder="Facebook" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.github} name="github" placeholder="Git hub" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.instagram} name="instagram" placeholder="Instagram" />
      </FormControl>


      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.telegram} name="telegram" placeholder="Telegram" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.youtube} name="youtube" placeholder="You Tube" />
      </FormControl>

      <FormControl  sx={{ width: '25ch' }}>
        <OutlinedInput type='text' onChange={handleChange} value={AccForm.phoneNumber} name="phoneNumber" placeholder="Phone number" />
      </FormControl>

      <FormControl  sx={{ width: '100%' }}>
      <TextareaAutosize
          minRows={4}
          placeholder="Info"
          name="info"
          onChange={handleChange}
        />
      </FormControl>

      {/* <Button onChange={handleFileChange} component="label"  variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
        <VisuallyHiddenInput type="file" />
        </Button>

        <Button onClick={handleSubmit} component="label"  variant="contained" style={{width:"100%"}}>Submit</Button> */}
        <form className='account-form' onSubmit={handleSubmit}>
        <Button
          component="label"
          variant="contained"
          style={{ marginTop: "5px", width:'100%'}}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>

        <Button type="submit" variant="contained" style={{ width: '100%', marginTop: "5px" }} >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AccountPage;