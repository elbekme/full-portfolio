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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("url", values.url);
      formData.append("description", values.description);
      formData.append("photo", selectedFile as File);
      if (selected === null) {
        await request.post("portfolios", values);
        toast.success('Success add portfolio!');
      } else {
        await request.put(`portfolios/${selected}`, values);
        toast.success('Success update portfolio!');
      }
      getPortfolios();
      controlModal(false);
      form.resetFields();
      setSelectedFile(null);

    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios, user]);

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const deletePortfolio = async (id: string): Promise<void> => {
    await request.delete(`portfolios/${id}`);
    getPortfolios();
    toast.success('Success delete portfolio!');
  };

  const editPortfolio = async (id: string): Promise<void> => {
    const { data } = await request.get(`portfolios/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
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
        <div className="card">
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
              name="photo"
              rules={[
                {
                  required: true,
                  message: "Please select an image!",
                },
              ]}
            >
              <Input type="file" accept="image/" onChange={handleFileChange} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
};

export default PortfolioPage;