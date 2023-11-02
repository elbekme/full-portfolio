import React, { useEffect, Fragment, ChangeEvent } from "react";
import { Form, Input, Modal } from "antd";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from 'react-toastify';

import ExperienceCard from "../components/card/ExperienceCard";
import request from "../server/index";
import Experience from "../types/experience";
import "./skills.css";
import useExperience from "../store/experience";

const ExperiencePage: React.FC = () => {
  const {
    user,
    experiences,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    search,
    setSearch,
    getExperiences,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useExperience();

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("experiences", values);
        toast.success('Success add experience!');
      } else {
        await request.put(`experiences/${selected}`, values);
        toast.success('Success update experience!');
      }
      getExperiences();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    getExperiences();
  }, [getExperiences, user]);

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
};

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const deleteExperience = async (id: string): Promise<void> => {
    await request.delete(`experiences/${id}`);
    getExperiences();
    toast.success('Success delete experience!');
  };

  const editExperience = async (id: string): Promise<void> => {
    const { data } = await request.get(`experiences/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  return (
    <Fragment>
      <div>
        <Typography variant="h3" align="center" gutterBottom>
          Experiences {total}
        </Typography>
        <Grid container justify="flex-end" spacing={1} alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <TextField
              label="Search experiences"
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
              Add Experience
            </Button>
          </Grid>
        </Grid>
        <br />
        <div className="component-card">
          {loading ? (
            <div className="loader"></div>
          ) : (
            experiences.map((experience: Experience) => (
              <ExperienceCard
                key={experience._id}
                experience={experience}
                deleteExperience={deleteExperience}
                editExperience={editExperience}
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
          title="Experience data"
          maskClosable={false}
          confirmLoading={modalLoading}
          okText={selected === null ? "Add experience" : "Save experience"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => controlModal(false)}
        >
          <Form
            name="experience"
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
              label="Work name"
              name="workName"
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
              label="Company name"
              name="companyName"
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

export default ExperiencePage;