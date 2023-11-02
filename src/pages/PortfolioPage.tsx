import React, { useEffect, Fragment, ChangeEvent, useState } from "react";
import { Form, Input, Modal } from "antd";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { toast } from 'react-toastify';
import Pagination from "@material-ui/lab/Pagination";
import request from "../server/index";
import usePortfolio from "../store/portfolio";
import Portfolio from "../types/portfolio";
import PortfolioCard from "../components/card/PortfolioCard";

const PortfolioPage: React.FC = () => {
  const {
    user,
    portfolios,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    search,
    setSearch,
    getPortfolios,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = usePortfolio();

  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  
  useEffect(() => {
    getPortfolios();
  }, [getPortfolios, user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  
  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();

      if (selectedFile) {
        const formData = new FormData();
        
        formData.append('file', selectedFile);
        const response = await request.post('upload', formData);
        values.photo = response.data;

        if (selected === null) {
          await request.post("portfolios", values);
          toast.success('Success add portfolio!');
                    
        } 
        else {
          await request.put(`portfolios/${selected}`, values);
          toast.success('Success update portfolio!');
        }
        if(selected){
          await request.put(`portfolis/${selected}`, values);
        }

      }
      getPortfolios();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const deletePortfolio = async (id: string): Promise<void> => {
    await request.delete(`portfolios/${id}`);
    getPortfolios();
    toast.success('Success delete porfolio!');
  };

  // const editPortfolio = async (id: string): Promise<void> => {
  //   const { data } = await request.get(`portfolios/${id}`);
  //   form.setFieldsValue(data);
  //   console.log(id);
  //   controlModal(true);
  //   setSelected(id);
  // };
  
  const editPortfolio = async (id: string): Promise<void> => {
    console.log('Edit portfolio:', id);
  
    try {
      const { data } = await request.get(`portfolios/${id}`);
      console.log('Retrieved portfolio data:', data);
      
      form.setFieldsValue(data);
      // console.log('Form fields:', form.getFieldsValue());
  
      controlModal(true);
      setSelected(id);
    } catch (error) {
      console.error('Error retrieving portfolio:', error);
    }
  };



  return (
    <Fragment>
      <div>
        <Typography variant="h3" align="center" gutterBottom>
        Portfolios {total}
        </Typography>
        <Grid container justify="flex-end" spacing={1} alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <TextField
              label="Search portfolios"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              fullWidth
              className="search"
            />
          </Grid>
          <Grid item xs={6} sm={2} md={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => showModal(form)}
              fullWidth
            >
              Add portfolio
            </Button>
          </Grid>
        </Grid>
        <br />
        <div className="component-card">
          {loading ? (
            <div className="loader"></div>
          ) : (
            portfolios.map((portfolio: Portfolio) => (
              <PortfolioCard
                key={portfolio._id}
                portfolio={portfolio}
                deletePortfolio={deletePortfolio}
                editPortfolio={editPortfolio}
              />
            ))
          )}
        </div>
        <br />
        <Pagination
          count={Math.ceil(total / 10)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />

        <Modal
          title="Portfolio data"
          maskClosable={false}
          confirmLoading={modalLoading}
          okText={selected === null ? "Add portfolio" : "Save portfolio"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => controlModal(false)}
        >
          <Form
            name="portfolio"
            autoComplete="off"
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
              position: "relative",
              height: "auto",
              boxShadow: "none",
              zIndex:1,
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Url"
              name="url"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Photo"
              >
              <input type="file" style={{width:'100px'}} onChange={handleFileChange}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
};

export default PortfolioPage;