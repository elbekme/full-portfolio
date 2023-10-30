import React, { useEffect, Fragment } from "react";
import { Form, Input, Modal, } from "antd";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { toast } from 'react-toastify';
import Pagination from "@material-ui/lab/Pagination";

import SkillCard from "../components/card/SkillCard";
import request from "../server/index";
import useSkill from "../store/skill";
import Skill from "../types/skill";
import "./skills.css";

const SkillsPage: React.FC = () => {
  const {
    user,
    skills,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    search,
    setSearch,
    getSkills,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useSkill();

  const [form] = Form.useForm();


  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("skills", values);
        toast.success('Success add skill!');
      } else {
        await request.put(`skills/${selected}`, values);
        toast.success('Succes update skill!');
      }
      getSkills();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const deleteSkill = async (id: string): Promise<void> => {
    await request.delete(`skills/${id}`);
    getSkills();
    toast.success('Delete skill!');
  };

  const editSkill = async (id: string): Promise<void> => {
    const { data } = await request.get(`skills/${id}`);
    form.setFieldsValue(data);
    console.log(id);
    controlModal(true);
    setSelected(id);
  };

  return (<Fragment>
        <div>
      <Typography variant="h3" align="center" gutterBottom>
        Skills {total}
      </Typography>
      <Grid container justify="flex-end" spacing={1} alignItems="center">
        <Grid item xs={6} sm={4} md={3}>
          <TextField
            label="Search skills"
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
            Add Skill
          </Button>
        </Grid>
      </Grid>
      <br />
      <div className="card">
        {loading ? (
          <div className="loader"></div>
        ) : (
          skills.map((skill: Skill) => (
            <SkillCard key={skill._id} skill={skill} deleteSkill={deleteSkill} editSkill={editSkill}/>
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
        title="Skill data"
        maskClosable={false}
        confirmLoading={modalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => controlModal(false)}
      >
        <Form
          name="skill"
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
          <Form.Item<Skill>
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
          <Form.Item<Skill>
            label="Percent"
            name="percent"
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

export default SkillsPage;