import React, { useEffect, Fragment, ChangeEvent, ReactElement  } from "react";
import { Form, Input, Modal } from "antd";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from 'react-toastify';

import request from "../server/index";
import useEducation from "../store/education";
import Education from "../types/education";
import EducationCard from "../components/card/EducationCard";
import "./skills.css";

const EducationPage: React.FC = () => {
  const {
    user,
    educations,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    search,
    setSearch,
    getEducations,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useEducation();
  // const lineBreak: JSX.Element = <br/>;
  const lineBreak: ReactElement<any, any> = <br />;

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("education", values);
        toast.success('Success add education!');
      } else {
        await request.put(`education/${selected}`, values);
        toast.success('Success update education!');
      }
      getEducations();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    getEducations();
  }, [getEducations, user]);

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const deleteEducation = async (id: string): Promise<void> => {
    await request.delete(`education/${id}`);
    getEducations();
    toast.success('Success delete education!');
  };

  const editEducation = async (id: string): Promise<void> => {
    const { data } = await request.get(`education/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  return (
    <Fragment>
      <div>
        <Typography variant="h3" align="center" gutterBottom>
        Educations {total}
        </Typography>
        <Grid container justify="flex-end" spacing={1} alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <TextField
              label="Search educations"
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
              Add Education
            </Button>
          </Grid>
        </Grid>
        {lineBreak}
        <div className="card">
          {loading ? (
            <div className="loader"></div>
          ) : (
            educations.map((education: Education) => (
              <EducationCard
                key={education._id}
                education={education}
                deleteEducation={deleteEducation}
                editEducation={editEducation}
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
          title="Education data"
          maskClosable={false}
          confirmLoading={modalLoading}
          okText={selected === null ? "Add education" : "Save education"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => controlModal(false)}
        >
          <Form
            name="education"
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
              label="Level"
              name="level"
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
              label="Start date"
              name="startDate"
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
              label="End date"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
};

export default EducationPage;